import { NextResponse } from "next/server";

import { getBranches, getFallbackBranches } from "@/lib/cuahang-branches";

export const runtime = "nodejs";
export const revalidate = 3600;

/**
 * Same-origin proxy to cuahang API (avoids browser CORS).
 * Response shape matches cuahang:
 * { success, count, data: Branch[] }
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const publishedOnly = searchParams.get("published") !== "false";
  const city = searchParams.get("city")?.trim() || "";

  try {
    const { items, source } = await getBranches({ publishedOnly });
    const data = city ? items.filter((branch) => branch.city === city) : items;

    return NextResponse.json(
      {
        success: true,
        count: data.length,
        data,
        source,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    console.error("[api/branches]", error);
    let data = getFallbackBranches();
    if (city) data = data.filter((branch) => branch.city === city);
    return NextResponse.json(
      {
        success: true,
        count: data.length,
        data,
        source: "fallback",
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600",
        },
      },
    );
  }
}
