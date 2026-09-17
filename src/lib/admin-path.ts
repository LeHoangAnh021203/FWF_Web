export const ADMIN_SESSION_COOKIE = "fwf_admin";

export function isAdminPathname(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return pathname === "/admin" || pathname.startsWith("/admin/");
}
