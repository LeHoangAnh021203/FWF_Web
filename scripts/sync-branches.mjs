#!/usr/bin/env node
/**
 * Refresh local fallback snapshot from cuahang API.
 * Usage: node scripts/sync-branches.mjs
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const API =
  process.env.CUAHANG_BRANCHES_URL?.trim() ||
  "https://cuahang.facewashfox.com/api/branches?published=true";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const response = await fetch(API, { headers: { Accept: "application/json" } });
if (!response.ok) {
  throw new Error(`API cuahang lỗi ${response.status}: ${API}`);
}

const json = await response.json();
if (!json?.success || !Array.isArray(json.data)) {
  throw new Error("Response API không hợp lệ.");
}

const cleaned = json.data.map((item) => {
  const out = {
    id: item.id,
    name: String(item.name || "").trim(),
    address: item.address,
    phone: item.phone || "0889 866 666",
    services: Array.isArray(item.services) ? item.services : ["Tư vấn", "Rửa mặt", "Mỹ phẩm"],
    lat: item.lat,
    lng: item.lng,
    hours: item.hours || "10:00 - 22:00",
    city: item.city,
  };
  if (item.bookingUrl) out.bookingUrl = item.bookingUrl;
  if (item.mapsUrl) out.mapsUrl = item.mapsUrl;
  if (item.publishAt) out.publishAt = item.publishAt;
  return out;
});

const file = `export type Branch = {
  id: number;
  name: string;
  address: string;
  phone: string;
  services: string[];
  lat: number;
  lng: number;
  hours: string;
  bookingUrl?: string;
  mapsUrl?: string;
  city: string;
  /** YYYY-MM-DD — chỉ có khi chi nhánh lên lịch mở */
  publishAt?: string;
};

/** Fallback snapshot. Runtime sync: GET https://cuahang.facewashfox.com/api/branches?published=true */
export const branches: Branch[] = ${JSON.stringify(cleaned, null, 2)};
`;

writeFileSync(join(root, "src/data/branches.ts"), file);
console.log(`Synced ${cleaned.length} branches from ${API}`);
