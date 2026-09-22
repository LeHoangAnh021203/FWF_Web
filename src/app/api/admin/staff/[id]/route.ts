import { NextResponse } from "next/server";

import { requireOwner } from "@/lib/admin-auth";
import { getAdminOrigin } from "@/lib/admin-host";
import { sendAccessDecisionEmail } from "@/lib/admin-mail";
import {
  deleteAdminUser,
  isOwnerEmail,
  listAdminUsers,
  updateAdminUser,
  type AdminUserRole,
  type AdminUserStatus,
} from "@/lib/admin-users";

export const runtime = "nodejs";

type StaffPatch = {
  email?: string;
  status?: AdminUserStatus;
  modules?: string[];
  role?: AdminUserRole;
};

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await requireOwner())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  let body: StaffPatch;
  try {
    body = (await request.json()) as StaffPatch;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (body.status && body.status !== "approved" && body.status !== "rejected" && body.status !== "pending") {
    return NextResponse.json({ error: "Trạng thái không hợp lệ." }, { status: 400 });
  }
  if (body.role && body.role !== "owner" && body.role !== "staff") {
    return NextResponse.json({ error: "Quyền không hợp lệ." }, { status: 400 });
  }

  const users = await listAdminUsers();
  const target = users.find((user) => user.id === id);
  if (!target) {
    return NextResponse.json({ error: "Không tìm thấy tài khoản." }, { status: 404 });
  }
  if (isOwnerEmail(target.email)) {
    return NextResponse.json({ error: "Không thể sửa tài khoản quản trị chính." }, { status: 400 });
  }

  try {
    const previousStatus = target.status;
    const user = await updateAdminUser(id, {
      ...(body.email ? { email: body.email } : {}),
      ...(body.status ? { status: body.status } : {}),
      ...(body.modules ? { modules: body.modules } : {}),
      ...(body.role ? { role: body.role } : {}),
    });

    if (
      body.status &&
      body.status !== previousStatus &&
      (body.status === "approved" || body.status === "rejected")
    ) {
      await sendAccessDecisionEmail({
        applicantEmail: user.email,
        status: body.status,
        loginUrl: `${getAdminOrigin()}/admin/login`,
      }).catch((error) => {
        console.error("[admin-mail] decision notice failed", error);
      });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Không cập nhật được tài khoản." },
      { status: 400 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await requireOwner())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  try {
    await deleteAdminUser(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Không xóa được tài khoản." },
      { status: 400 },
    );
  }
}
