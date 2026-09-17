import { NextResponse, type NextRequest } from "next/server";

import { hasSessionCookie } from "@/lib/admin-auth";
import { getAdminOrigin, getRequestHost, isAdminHost, isLocalHost } from "@/lib/admin-host";
import { ADMIN_SESSION_COOKIE, isAdminPathname } from "@/lib/admin-path";

function withNoIndex(response: NextResponse): NextResponse {
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export function proxy(request: NextRequest) {
  const host = getRequestHost(request.headers.get("host"));
  const { pathname, search } = request.nextUrl;
  const local = isLocalHost(host);
  const session = hasSessionCookie(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);

  if (pathname.startsWith("/api/admin") && pathname !== "/api/admin/login" && !session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (isAdminHost(host)) {
    if (pathname === "/") {
      return withNoIndex(NextResponse.redirect(new URL(`/admin${search}`, request.url)));
    }

    if (isAdminPathname(pathname) && pathname !== "/admin/login" && !session) {
      const login = request.nextUrl.clone();
      login.pathname = "/admin/login";
      login.search = `?next=${encodeURIComponent(pathname + search)}`;
      return withNoIndex(NextResponse.redirect(login));
    }

    if (isAdminPathname(pathname) || pathname.startsWith("/api/admin")) {
      return withNoIndex(NextResponse.next());
    }
  }

  if (!local && isAdminPathname(pathname)) {
    const destination = new URL(`${getAdminOrigin()}${pathname}${search}`);
    return NextResponse.redirect(destination);
  }

  if (local && isAdminPathname(pathname) && pathname !== "/admin/login" && !session) {
    const login = request.nextUrl.clone();
    login.pathname = "/admin/login";
    login.search = `?next=${encodeURIComponent(pathname + search)}`;
    return withNoIndex(NextResponse.redirect(login));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
