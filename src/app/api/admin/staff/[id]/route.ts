import { NextResponse } from "next/server";

import { requireOwner } from "@/lib/admin-auth";
import {
  deleteAdminUser,
  isOwnerEmail,
  listAdminUsers,
  updateAdminUser,
  type AdminUserStatus,
} from "@/lib/admin-users";

export const runtime = "nodejs";

type StaffPatch = {
  email?: string;
  status?: AdminUserStatus;
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

  const users = await listAdminUsers();
  const target = users.find((user) => user.id === id);
  if (!target) {
    return NextResponse.json({ error: "Không tìm thấy tài khoản." }, { status: 404 });
  }
  if (isOwnerEmail(target.email) || target.role === "owner") {
    return NextResponse.json({ error: "Không thể sửa tài khoản quản trị chính." }, { status: 400 });
  }

  try {
    const user = await updateAdminUser(id, {
      ...(body.email ? { email: body.email } : {}),
      ...(body.status ? { status: body.status } : {}),
      role: "staff",
    });
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
