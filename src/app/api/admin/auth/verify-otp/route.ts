import { NextResponse } from "next/server";

import {
  allowLoginAttempt,
  applySessionCookie,
  clearOtpCookie,
  createSessionToken,
  verifyOtpToken,
} from "@/lib/admin-auth";
import { getAdminOrigin } from "@/lib/admin-host";
import { sendPendingAccessEmails } from "@/lib/admin-mail";
import { ADMIN_OTP_COOKIE } from "@/lib/admin-path";
import {
  canAccessAdmin,
  getOwnerEmail,
  isValidAdminEmail,
  markAdminLogin,
  normalizeAdminEmail,
  upsertVerifiedAdminUser,
} from "@/lib/admin-users";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!allowLoginAttempt(`verify-ip:${ip}`, 12)) {
      return NextResponse.json({ error: "Bạn thử quá nhiều lần. Thử lại sau." }, { status: 429 });
    }

    if (!process.env.ADMIN_SESSION_SECRET) {
      return NextResponse.json({ error: "Admin login is not configured." }, { status: 503 });
    }

    let email = "";
    let otp = "";
    try {
      const body = (await request.json()) as { email?: string; otp?: string };
      email = normalizeAdminEmail(body.email ?? "");
      otp = String(body.otp ?? "").replace(/\D/g, "");
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    if (!isValidAdminEmail(email) || otp.length !== 6) {
      return NextResponse.json({ error: "Email hoặc mã OTP không hợp lệ." }, { status: 400 });
    }

    const rawCookie = request.headers
      .get("cookie")
      ?.split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(`${ADMIN_OTP_COOKIE}=`))
      ?.slice(ADMIN_OTP_COOKIE.length + 1);
    let otpCookie = rawCookie;
    try {
      if (rawCookie) otpCookie = decodeURIComponent(rawCookie);
    } catch {
      otpCookie = rawCookie;
    }
    const valid = await verifyOtpToken(otpCookie, email, otp);
    if (!valid) {
      return NextResponse.json({ error: "Mã OTP không đúng hoặc đã hết hạn." }, { status: 401 });
    }

    const { user, created } = await upsertVerifiedAdminUser(email);
    if (!canAccessAdmin(user)) {
      if (created && user.status === "pending") {
        await sendPendingAccessEmails({
          applicantEmail: user.email,
          adminEmail: getOwnerEmail(),
          reviewUrl: `${getAdminOrigin()}/admin/nhan-su`,
        }).catch((error) => {
          console.error("[admin-mail] pending notice failed", error);
        });
      }
      const response = NextResponse.json(
        {
          pending: user.status === "pending",
          error:
            user.status === "rejected"
              ? "Tài khoản chưa được cấp quyền. Liên hệ itdept@facewashfox.com để được hỗ trợ."
              : "Tài khoản đã được nhận và đang chờ admin duyệt. Bạn cũng có thể liên hệ itdept@facewashfox.com để được cấp tài khoản.",
        },
        { status: 403 },
      );
      clearOtpCookie(response);
      return response;
    }

    await markAdminLogin(user.email);
    const response = NextResponse.json({ ok: true });
    applySessionCookie(response, await createSessionToken(user.email, user.role));
    clearOtpCookie(response);
    return response;
  } catch (error) {
    console.error("[admin-auth] verify-otp failed", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error && error.message
            ? error.message
            : "Không xác nhận được OTP. Thử lại sau.",
      },
      { status: 500 },
    );
  }
}
