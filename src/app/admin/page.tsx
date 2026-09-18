import { redirect } from "next/navigation";

import { getAdminSessionUser } from "@/lib/admin-auth";

import { AdminHome } from "./admin-home";

export default async function AdminIndexPage() {
  const user = await getAdminSessionUser();
  if (!user) redirect("/admin/login");
  return <AdminHome user={user} />;
}
