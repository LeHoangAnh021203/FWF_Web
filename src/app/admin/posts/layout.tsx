import { redirect } from "next/navigation";

import { getAdminSessionUser } from "@/lib/admin-auth";
import { userCanAccessModule } from "@/lib/admin-modules";

export default async function AdminPostsLayout({ children }: { children: React.ReactNode }) {
  const user = await getAdminSessionUser();
  if (!user) redirect("/admin/login");
  if (!userCanAccessModule(user, "tin-tuc")) redirect("/admin");
  return children;
}
