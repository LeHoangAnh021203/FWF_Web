import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_OTP_COOKIE, ADMIN_SESSION_COOKIE } from "@/lib/admin-path";
import {
  canAccessAdmin,
  getAdminUserByEmail,
  type AdminUser,
  type AdminUserRole,
} from "@/lib/admin-users";

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;
const OTP_TTL_SECONDS = 10 * 60;

type SessionPayload = {
  email: string;
  role: AdminUserRole;
  exp: number;
};

type OtpPayload = {
  email: string;
  hash: string;
  exp: number;
};

const loginAttempts = new Map<string, number[]>();

function getSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET?.trim() || null;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function hmacSign(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return toBase64Url(new Uint8Array(signature));
}

async function sha256Bytes(value: string): Promise<Uint8Array> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return new Uint8Array(digest);
}

async function signPayload(payload: object, secret: string): Promise<string> {
  const encoded = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const signature = await hmacSign(encoded, secret);
  return `${encoded}.${signature}`;
}

async function readSignedPayload<T>(token: string | undefined | null, secret: string): Promise<T | null> {
  if (!token) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;
  const expected = await hmacSign(encoded, secret);
  if (!timingSafeEqual(fromBase64Url(signature), fromBase64Url(expected))) return null;
  try {
    return JSON.parse(new TextDecoder().decode(fromBase64Url(encoded))) as T;
  } catch {
    return null;
  }
}

export async function createSessionToken(email: string, role: AdminUserRole): Promise<string> {
  const secret = getSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  const payload: SessionPayload = {
    email: email.toLowerCase(),
    role,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  return signPayload(payload, secret);
}

export async function createOtpToken(email: string, otp: string): Promise<string> {
  const secret = getSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  const hash = toBase64Url(await sha256Bytes(`${secret}:${email.toLowerCase()}:${otp}`));
  const payload: OtpPayload = {
    email: email.toLowerCase(),
    hash,
    exp: Math.floor(Date.now() / 1000) + OTP_TTL_SECONDS,
  };
  return signPayload(payload, secret);
}

export async function verifyOtpToken(token: string | undefined | null, email: string, otp: string): Promise<boolean> {
  const secret = getSecret();
  if (!secret) return false;
  const payload = await readSignedPayload<OtpPayload>(token, secret);
  if (!payload) return false;
  if (payload.email !== email.toLowerCase()) return false;
  if (typeof payload.exp !== "number" || payload.exp <= Math.floor(Date.now() / 1000)) return false;
  const hash = toBase64Url(await sha256Bytes(`${secret}:${email.toLowerCase()}:${otp}`));
  return timingSafeEqual(fromBase64Url(payload.hash), fromBase64Url(hash));
}

async function readSession(token: string | undefined | null): Promise<SessionPayload | null> {
  const secret = getSecret();
  if (!secret) return null;
  const payload = await readSignedPayload<SessionPayload>(token, secret);
  if (!payload?.email || (payload.role !== "owner" && payload.role !== "staff")) return null;
  if (typeof payload.exp !== "number" || payload.exp <= Math.floor(Date.now() / 1000)) return null;
  return payload;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  return Boolean(await readSession(token));
}

export function hasSessionCookie(token: string | undefined | null): boolean {
  return Boolean(token && token.includes("."));
}

export function allowLoginAttempt(key: string, limit = 8): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const recent = (loginAttempts.get(key) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) {
    loginAttempts.set(key, recent);
    return false;
  }
  recent.push(now);
  loginAttempts.set(key, recent);
  return true;
}

function cookieBase() {
  return {
    httpOnly: true as const,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };
}

export function applySessionCookie(response: NextResponse, token: string): void {
  response.cookies.set({
    ...cookieBase(),
    name: ADMIN_SESSION_COOKIE,
    value: token,
    maxAge: SESSION_TTL_SECONDS,
  });
}

export function applyOtpCookie(response: NextResponse, token: string): void {
  response.cookies.set({
    ...cookieBase(),
    name: ADMIN_OTP_COOKIE,
    value: token,
    maxAge: OTP_TTL_SECONDS,
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set({
    ...cookieBase(),
    name: ADMIN_SESSION_COOKIE,
    value: "",
    maxAge: 0,
  });
}

export function clearOtpCookie(response: NextResponse): void {
  response.cookies.set({
    ...cookieBase(),
    name: ADMIN_OTP_COOKIE,
    value: "",
    maxAge: 0,
  });
}

export async function getAdminSessionUser(): Promise<AdminUser | null> {
  const jar = await cookies();
  const session = await readSession(jar.get(ADMIN_SESSION_COOKIE)?.value);
  if (!session) return null;
  const user = await getAdminUserByEmail(session.email);
  return canAccessAdmin(user) ? user : null;
}

export async function requireAdmin(): Promise<boolean> {
  return Boolean(await getAdminSessionUser());
}

export async function requireOwner(): Promise<AdminUser | null> {
  const user = await getAdminSessionUser();
  return user?.role === "owner" ? user : null;
}

export function generateOtpCode(): string {
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  return String(bytes[0] % 1_000_000).padStart(6, "0");
}
