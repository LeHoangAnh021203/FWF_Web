import { NextResponse } from "next/server";

import { requireOwner } from "@/lib/admin-auth";
import { createAdminStaff, listAdminUsers, type AdminUserStatus } from "@/lib/admin-users";

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

  let email = "";
  let status: AdminUserStatus = "approved";
  try {
    const body = (await request.json()) as { email?: string; status?: AdminUserStatus };
    email = body.email ?? "";
    if (body.status === "pending" || body.status === "approved" || body.status === "rejected") {
      status = body.status;
    }
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  try {
    const user = await createAdminStaff(email, status);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Không thêm được nhân sự." },
      { status: 400 },
    );
  }
}
