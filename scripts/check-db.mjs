#!/usr/bin/env node
/**
 * Quick Railway Postgres connectivity check.
 * Usage:
 *   npm run db:check
 *   DATABASE_URL="postgresql://..." node scripts/check-db.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import postgres from "postgres";

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  const raw = readFileSync(filePath, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env) || !process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(resolve(process.cwd(), ".env.local"));
loadEnvFile(resolve(process.cwd(), ".env"));

const url = process.env.DATABASE_URL?.trim() || process.env.DATABASE_PUBLIC_URL?.trim();
if (!url) {
  console.error("Missing DATABASE_URL (or DATABASE_PUBLIC_URL).");
  console.error("On Railway: Postgres → Variables → copy DATABASE_PUBLIC_URL (not *.railway.internal).");
  process.exit(1);
}

let host = "";
try {
  host = new URL(url).hostname;
} catch {
  console.error("DATABASE_URL is not a valid URL.");
  process.exit(1);
}

if (host.endsWith(".railway.internal")) {
  console.error(`Current host is private: ${host}`);
  console.error("This only works inside Railway. For local + Vercel use DATABASE_PUBLIC_URL instead.");
  console.error("Railway → Postgres service → Variables → DATABASE_PUBLIC_URL → paste into .env.local as DATABASE_URL=");
  process.exit(1);
}

const sql = postgres(url, {
  max: 1,
  connect_timeout: 20,
  prepare: false,
  ssl: host.includes("localhost") || host.includes("127.0.0.1") ? false : "require",
});

try {
  await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;
  const rows = await sql`SELECT current_database() AS db, current_user AS "user", now() AS now`;
  console.log("Connected OK:", rows[0]);
  await sql.end({ timeout: 5 });
  process.exit(0);
} catch (error) {
  console.error("Connection failed:", error instanceof Error ? error.message : error);
  try {
    await sql.end({ timeout: 1 });
  } catch {
    // ignore
  }
  process.exit(1);
}
