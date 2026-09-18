export const ADMIN_SESSION_COOKIE = "fwf_admin";
export const ADMIN_OTP_COOKIE = "fwf_admin_otp";

const PUBLIC_ADMIN_APIS = new Set([
  "/api/admin/login",
  "/api/admin/auth/request-otp",
  "/api/admin/auth/verify-otp",
]);

export function isAdminPathname(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export function isPublicAdminApi(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return PUBLIC_ADMIN_APIS.has(pathname);
}
