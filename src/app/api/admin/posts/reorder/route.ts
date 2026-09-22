import { NextResponse } from "next/server";

import { requireModule } from "@/lib/admin-auth";
import { isNewsCategoryId } from "@/data/news-categories";
import { revalidatePublicNews } from "@/lib/revalidate-news";
import { reorderAdminPosts } from "@/lib/news-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await requireModule("tin-tuc"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const raw = body && typeof body === "object" ? (body as { items?: unknown }).items : null;
  if (!Array.isArray(raw) || raw.length === 0) {
    return NextResponse.json({ error: "Thiếu thứ tự bài viết." }, { status: 400 });
  }

  const items: Array<{ id: string; categoryId: string; sortOrder: number }> = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== "object") continue;
    const value = entry as { id?: unknown; categoryId?: unknown; sortOrder?: unknown };
    const id = String(value.id ?? "");
    const categoryId = String(value.categoryId ?? "");
    const sortOrder = Number(value.sortOrder);
    if (!id || !isNewsCategoryId(categoryId) || !Number.isFinite(sortOrder)) continue;
    items.push({ id, categoryId, sortOrder });
  }

  if (items.length === 0) {
    return NextResponse.json({ error: "Thứ tự bài viết không hợp lệ." }, { status: 400 });
  }

  await reorderAdminPosts(items);
  revalidatePublicNews();
  return NextResponse.json({ ok: true });
}
