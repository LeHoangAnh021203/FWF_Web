import { NextResponse } from "next/server";

import { allowLoginAttempt, generateOtpCode, rememberOtpChallenge, requireOwner } from "@/lib/admin-auth";
import { sendAdminOtpEmail } from "@/lib/admin-mail";
import {
  getAdminUserByEmail,
  isOwnerEmail,
  isValidAdminEmail,
  normalizeAdminEmail,
} from "@/lib/admin-users";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await requireOwner())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
  if (isOwnerEmail(email)) {
    return NextResponse.json({ error: "Không thể tạo trùng tài khoản quản trị chính." }, { status: 400 });
  }

  if (!allowLoginAttempt(`staff-invite:${email}`, 5)) {
    return NextResponse.json({ error: "Email này đã nhận quá nhiều mã. Thử lại sau 15 phút." }, { status: 429 });
  }

  const existing = await getAdminUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: "Email này đã có trong danh sách." }, { status: 400 });
  }

  const otp = generateOtpCode();
  await rememberOtpChallenge(email, otp);
  const sent = await sendAdminOtpEmail(email, otp);
  if (!sent.ok) {
    return NextResponse.json({ error: sent.error || "Không gửi được mã OTP." }, { status: 503 });
  }

  return NextResponse.json({
    ok: true,
    message: `Đã gửi mã OTP tới ${email}.`,
  });
}
