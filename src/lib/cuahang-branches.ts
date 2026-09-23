import { unstable_cache } from "next/cache";

import { branches as fallbackBranches, type Branch } from "@/data/branches";

export type { Branch };

const DEFAULT_CUAHANG_API = "https://cuahang.facewashfox.com/api/branches";

type CuahangBranchesResponse = {
  success?: boolean;
  count?: number;
  data?: unknown;
};

function getCuahangBranchesUrl(publishedOnly: boolean): string {
  const base = (process.env.CUAHANG_BRANCHES_URL?.trim() || DEFAULT_CUAHANG_API).replace(/\/$/, "");
  const url = new URL(base.includes("://") ? base : `https://${base}`);
  if (publishedOnly) url.searchParams.set("published", "true");
  return url.toString();
}

function normalizeBranch(raw: Record<string, unknown>): Branch | null {
  const id = Number(raw.id);
  const lat = Number(raw.lat);
  const lng = Number(raw.lng);
  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const address = typeof raw.address === "string" ? raw.address.trim() : "";
  const city = typeof raw.city === "string" ? raw.city.trim() : "";
  if (!Number.isFinite(id) || !name || !address || !city) return null;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  const services = Array.isArray(raw.services)
    ? raw.services.filter((item): item is string => typeof item === "string")
    : ["Tư vấn", "Rửa mặt", "Mỹ phẩm"];

  return {
    id,
    name,
    address,
    phone: typeof raw.phone === "string" && raw.phone.trim() ? raw.phone.trim() : "0889 866 666",
    services: services.length ? services : ["Tư vấn", "Rửa mặt", "Mỹ phẩm"],
    lat,
    lng,
    hours: typeof raw.hours === "string" && raw.hours.trim() ? raw.hours.trim() : "10:00 - 22:00",
    ...(typeof raw.bookingUrl === "string" ? { bookingUrl: raw.bookingUrl } : {}),
    ...(typeof raw.mapsUrl === "string" ? { mapsUrl: raw.mapsUrl } : {}),
    city,
    ...(typeof raw.publishAt === "string" && raw.publishAt.trim()
      ? { publishAt: raw.publishAt.trim() }
      : {}),
  };
}

function parseCuahangPayload(payload: unknown): Branch[] {
  const body = payload as CuahangBranchesResponse;
  if (!body || body.success !== true || !Array.isArray(body.data)) {
    throw new Error("Response API chi nhánh cuahang không hợp lệ.");
  }

  const items = body.data
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      return normalizeBranch(item as Record<string, unknown>);
    })
    .filter((item): item is Branch => Boolean(item));

  if (items.length < 1) {
    throw new Error("API cuahang trả về danh sách rỗng.");
  }

  return items;
}

async function fetchCuahangBranchesUncached(publishedOnly: boolean): Promise<Branch[]> {
  const endpoint = getCuahangBranchesUrl(publishedOnly);
  const response = await fetch(endpoint, {
    headers: { Accept: "application/json" },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Không tải được API cuahang (${response.status}) từ ${endpoint}.`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("API cuahang chưa trả JSON (có thể chưa deploy).");
  }

  return parseCuahangPayload(await response.json());
}

const getCachedPublishedBranches = unstable_cache(
  async () => fetchCuahangBranchesUncached(true),
  ["cuahang-branches-api-published-v1"],
  { revalidate: 3600 },
);

const getCachedAllBranches = unstable_cache(
  async () => fetchCuahangBranchesUncached(false),
  ["cuahang-branches-api-all-v1"],
  { revalidate: 3600 },
);

/**
 * Live list from https://cuahang.facewashfox.com/api/branches
 * Default: published=true (chỉ chi nhánh đã mở / tới ngày publishAt).
 */
export async function getBranches(options?: {
  publishedOnly?: boolean;
}): Promise<{
  items: Branch[];
  source: "cuahang" | "fallback";
}> {
  const publishedOnly = options?.publishedOnly !== false;
  try {
    const items = publishedOnly
      ? await getCachedPublishedBranches()
      : await getCachedAllBranches();
    return { items, source: "cuahang" };
  } catch (error) {
    console.error("[branches] sync from cuahang API failed, using local fallback", error);
    return { items: fallbackBranches, source: "fallback" };
  }
}

export function getFallbackBranches(): Branch[] {
  return fallbackBranches;
}
