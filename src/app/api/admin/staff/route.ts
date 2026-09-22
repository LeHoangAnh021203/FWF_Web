import { NextResponse } from "next/server";

import { requireOwner, verifyAndConsumeOtpChallenge } from "@/lib/admin-auth";
import { getAdminOrigin } from "@/lib/admin-host";
import { sendAccessDecisionEmail, sendPendingAccessEmails } from "@/lib/admin-mail";
import {
  createAdminStaff,
  getOwnerEmail,
  listAdminUsers,
  normalizeAdminEmail,
  type AdminUserRole,
  type AdminUserStatus,
} from "@/lib/admin-users";

export const runtime = "nodejs";

export async function GET() {
  if (!(await requireOwner())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ items: await listAdminUsers() });
}

export async function POST(request: Request) {
  if (!(await requireOwner())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json({ error: "Admin login is not configured." }, { status: 503 });
  }

  let email = "";
  let otp = "";
  let status: AdminUserStatus = "approved";
  let modules: string[] = ["tin-tuc"];
  let role: AdminUserRole = "staff";
  try {
    const body = (await request.json()) as {
      email?: string;
      otp?: string;
      status?: AdminUserStatus;
      modules?: string[];
      role?: AdminUserRole;
    };
    email = normalizeAdminEmail(body.email ?? "");
    otp = String(body.otp ?? "").replace(/\D/g, "");
    if (body.status === "pending" || body.status === "approved" || body.status === "rejected") {
      status = body.status;
    }
    if (Array.isArray(body.modules)) modules = body.modules;
    if (body.role === "owner" || body.role === "staff") role = body.role;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (otp.length !== 6) {
    return NextResponse.json({ error: "Vui lòng nhập đủ 6 số OTP đã gửi vào email." }, { status: 400 });
  }

  const otpOk = await verifyAndConsumeOtpChallenge(email, otp);
  if (!otpOk) {
    return NextResponse.json({ error: "Mã OTP không đúng hoặc đã hết hạn." }, { status: 401 });
  }

  try {
    const user = await createAdminStaff(email, status, modules, role);
    const loginUrl = `${getAdminOrigin()}/admin/login`;

    if (user.status === "approved") {
      const decisionResult = await sendAccessDecisionEmail({
        applicantEmail: user.email,
        status: "approved",
        loginUrl,
      });

      return NextResponse.json({
        user,
        message: decisionResult.ok
          ? `Đã thêm ${user.email}. Đã gửi email hướng dẫn đăng nhập.`
          : `Đã thêm ${user.email}. Chưa gửi được email duyệt — kiểm tra SMTP.`,
        warning: decisionResult.ok ? undefined : "Chưa gửi được email duyệt. Kiểm tra SMTP.",
      });
    }

    if (user.status === "pending") {
      await sendPendingAccessEmails({
        applicantEmail: user.email,
        adminEmail: getOwnerEmail(),
        reviewUrl: `${getAdminOrigin()}/admin/nhan-su`,
      }).catch((error) => {
        console.error("[admin-mail] pending notice failed", error);
      });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Không thêm được nhân sự." },
      { status: 400 },
    );
  }
}
