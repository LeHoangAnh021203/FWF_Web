import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  return NextResponse.json(
    { error: "Đăng nhập bằng email và mã OTP. Gửi mã tại /api/admin/auth/request-otp." },
    { status: 410 },
  );
}
