import { redirect } from "next/navigation";

import { getAdminSessionUser } from "@/lib/admin-auth";
import { getOwnerEmail } from "@/lib/admin-users";

import { StaffManager } from "./staff-manager";

export default async function AdminStaffPage() {
  const user = await getAdminSessionUser();
  if (!user) redirect("/admin/login");
  if (user.role !== "owner") redirect("/admin");
  return <StaffManager accountEmail={user.email} primaryOwnerEmail={getOwnerEmail()} />;
}
