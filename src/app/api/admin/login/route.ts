import { NextResponse } from "next/server";

import {
  allowLoginAttempt,
  applySessionCookie,
  createSessionToken,
  passwordsMatch,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allowLoginAttempt(ip)) {
    return NextResponse.json({ error: "Too many login attempts. Try again later." }, { status: 429 });
  }

  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json({ error: "Admin login is not configured." }, { status: 503 });
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = body.password?.trim() ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (!(await passwordsMatch(password))) {
    return NextResponse.json({ error: "Sai mật khẩu." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  applySessionCookie(response, await createSessionToken());
  return response;
}
