import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/admin-auth";
import { revalidatePublicNews } from "@/lib/revalidate-news";
import { createNewsCategory, listNewsCategories } from "@/lib/news-store";

export const runtime = "nodejs";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ items: await listNewsCategories() });
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const name = body && typeof body === "object" ? String((body as { name?: unknown }).name ?? "").trim() : "";
  if (!name) return NextResponse.json({ error: "Nhập tên chủ đề." }, { status: 400 });

  try {
    const category = await createNewsCategory(name);
    revalidatePublicNews();
    return NextResponse.json({ category });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Không tạo được chủ đề." },
      { status: 400 },
    );
  }
}
