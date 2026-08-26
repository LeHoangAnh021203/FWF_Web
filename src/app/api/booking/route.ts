import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"

const FAQ_NOTIFY_EMAIL = "foxie@facewashfox.com"

type BookingPayload = {
  requestType?: "booking" | "quote"
  fullName?: string
  phone?: string
  email?: string
  note?: string
  branchId?: number
  branchName?: string
  branchAddress?: string
  branchCity?: string
  branchMapsUrl?: string
  nearestDistanceKm?: number | null
}

async function sendFaqNotifyEmail(payload: {
  fullName: string
  phone: string
  email: string
  note: string
}) {
  const host = process.env.EMAIL_HOST
  const port = Number(process.env.EMAIL_PORT || 587)
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD
  const from = process.env.EMAIL_FROM || user
  const to =
    process.env.FAQ_EMAIL_TO?.trim() ||
    process.env.BUSINESS_EMAIL_TO?.split(",")[0]?.trim() ||
    FAQ_NOTIFY_EMAIL

  if (!host || !user || !pass || !from) {
    return { sent: false as const, error: "Email is not configured." }
  }

  const subject = `[FAQ] Tin nhắn từ ${payload.fullName}`
  const text = [
    "Khách hàng gửi liên hệ từ trang FAQ",
    "",
    `Họ và tên: ${payload.fullName}`,
    `Số điện thoại: ${payload.phone}`,
    `Email: ${payload.email || "(không cung cấp)"}`,
    "",
    "Nội dung:",
    payload.note || "(trống)",
  ].join("\n")

  const html = `
    <h2>Tin nhắn từ trang FAQ</h2>
    <p><strong>Họ và tên:</strong> ${escapeHtml(payload.fullName)}</p>
    <p><strong>Số điện thoại:</strong> ${escapeHtml(payload.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email || "(không cung cấp)")}</p>
    <p><strong>Nội dung:</strong></p>
    <p>${escapeHtml(payload.note || "(trống)").replace(/\n/g, "<br />")}</p>
  `

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  await transporter.sendMail({
    from,
    to,
    replyTo: payload.email || undefined,
    subject,
    text,
    html,
  })

  return { sent: true as const, to }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

export async function POST(request: Request) {
  const bookingScriptUrl = process.env.BOOKING_APPS_SCRIPT_URL

  let payload: BookingPayload

  try {
    payload = (await request.json()) as BookingPayload
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 })
  }

  const fullName = payload.fullName?.trim() ?? ""
  const phone = payload.phone?.trim() ?? ""
  const email = payload.email?.trim() ?? ""
  const note = payload.note?.trim() ?? ""
  const isQuote = payload.requestType === "quote"

  if (!fullName || !phone) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
  }

  if (isQuote && (!email || !note)) {
    return NextResponse.json(
      { error: "Missing required fields: email and message." },
      { status: 400 },
    )
  }

  let emailResult: { sent: boolean; to?: string; error?: string } | null = null

  if (isQuote) {
    try {
      emailResult = await sendFaqNotifyEmail({ fullName, phone, email, note })
      if (!emailResult.sent) {
        console.error("FAQ email skipped:", emailResult.error)
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send FAQ email."
      console.error("FAQ email failed:", message)
      emailResult = { sent: false, error: message }
    }
  }

  if (!bookingScriptUrl) {
    if (isQuote && emailResult?.sent) {
      return NextResponse.json({
        ok: true,
        success: true,
        emailSent: true,
        emailTo: emailResult.to,
      })
    }

    return NextResponse.json(
      {
        error: isQuote
          ? emailResult?.error || "Không gửi được email. Vui lòng thử lại."
          : "BOOKING_APPS_SCRIPT_URL is not configured.",
      },
      { status: 500 },
    )
  }

  try {
    const sheetPayload = {
      requestType: isQuote ? "quote" : "booking",
      fullName,
      phone,
      email,
      note,
      branchId: payload.branchId ?? "",
      branchName: payload.branchName ?? "",
      branchAddress: payload.branchAddress ?? "",
      branchCity: payload.branchCity ?? "",
      branchMapsUrl: payload.branchMapsUrl ?? "",
      nearestDistanceKm:
        typeof payload.nearestDistanceKm === "number"
          ? Number(payload.nearestDistanceKm.toFixed(1))
          : "",
    }

    // Apps Script Web App: POST often 302s; following as POST can return HTML/405
    // even after doPost already saved the row. Handle redirect manually.
    const appsScriptResponse = await fetch(bookingScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(sheetPayload),
      redirect: "manual",
      cache: "no-store",
    })

    let responseText = await appsScriptResponse.text()
    let status = appsScriptResponse.status
    const redirectedAfterPost = status >= 300 && status < 400

    if (redirectedAfterPost) {
      const location = appsScriptResponse.headers.get("location")
      if (location) {
        const redirected = await fetch(location, {
          method: "GET",
          redirect: "follow",
          cache: "no-store",
        })
        responseText = await redirected.text()
        status = redirected.status
      }
    }

    const parsed = parseAppsScriptJson(responseText)
    const explicitFail = Boolean(
      parsed && (parsed.ok === false || parsed.success === false),
    )
    const explicitOk = Boolean(
      parsed && (parsed.ok === true || parsed.success === true),
    )
    // Google often 302 after doPost already wrote the row; follow can be HTML/405.
    const sheetSaved =
      explicitOk ||
      redirectedAfterPost ||
      (status === 200 && !explicitFail && !looksLikeHtml(responseText))

    if (!sheetSaved || explicitFail) {
      if (isQuote && emailResult?.sent) {
        return NextResponse.json({
          ok: true,
          success: true,
          emailSent: true,
          emailTo: emailResult.to,
          sheetSaved: false,
          details: responseText.slice(0, 500),
        })
      }

      return NextResponse.json(
        {
          error:
            (typeof parsed?.error === "string" && parsed.error) ||
            "Không ghi được Google Sheet. Vui lòng thử lại.",
          details: responseText.slice(0, 500),
        },
        { status: 502 },
      )
    }

    if (isQuote && !emailResult?.sent) {
      return NextResponse.json(
        {
          error: emailResult?.error || "Không gửi được email tới bộ phận hỗ trợ.",
        },
        { status: 502 },
      )
    }

    return NextResponse.json({
      ok: true,
      success: true,
      ...(parsed ?? {}),
      emailSent: Boolean(emailResult?.sent),
      emailTo: emailResult?.to,
    })
  } catch {
    if (isQuote && emailResult?.sent) {
      return NextResponse.json({
        ok: true,
        success: true,
        emailSent: true,
        emailTo: emailResult.to,
        sheetSaved: false,
      })
    }

    return NextResponse.json({ error: "Failed to reach Apps Script." }, { status: 502 })
  }
}

function parseAppsScriptJson(text: string): Record<string, unknown> | null {
  const trimmed = text.trim()
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return null
  try {
    return JSON.parse(trimmed) as Record<string, unknown>
  } catch {
    return null
  }
}

function looksLikeHtml(text: string) {
  const head = text.trim().slice(0, 32).toLowerCase()
  return head.startsWith("<!doctype") || head.startsWith("<html")
}
