import { NextResponse } from "next/server";

import {
  allowLoginAttempt,
  applyOtpCookie,
  createOtpToken,
  generateOtpCode,
} from "@/lib/admin-auth";
import { sendAdminOtpEmail } from "@/lib/admin-mail";
import { isValidAdminEmail, normalizeAdminEmail } from "@/lib/admin-users";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allowLoginAttempt(`otp-ip:${ip}`, 8)) {
    return NextResponse.json({ error: "Bạn gửi mã quá nhiều lần. Thử lại sau." }, { status: 429 });
  }

  if (!process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json({ error: "Admin login is not configured." }, { status: 503 });
  }

  let email = "";
  try {
    const body = (await request.json()) as { email?: string };
    email = normalizeAdminEmail(body.email ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (!isValidAdminEmail(email)) {
    return NextResponse.json({ error: "Email không hợp lệ." }, { status: 400 });
  }

  if (!allowLoginAttempt(`otp-email:${email}`, 5)) {
    return NextResponse.json({ error: "Email này đã nhận quá nhiều mã. Thử lại sau 15 phút." }, { status: 429 });
  }

  const otp = generateOtpCode();
  const sent = await sendAdminOtpEmail(email, otp);
  if (!sent.ok) {
    return NextResponse.json({ error: sent.error || "Không gửi được mã OTP." }, { status: 503 });
  }

  const response = NextResponse.json({
    ok: true,
    message: `Đã gửi mã OTP tới ${email}.`,
  });
  applyOtpCookie(response, await createOtpToken(email, otp));
  return response;
}
