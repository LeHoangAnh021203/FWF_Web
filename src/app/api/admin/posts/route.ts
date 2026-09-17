import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/admin-auth";
import { parseNewsPayload, translatePostLocales, wantsTranslation } from "@/lib/news-payload";
import { revalidatePublicNews } from "@/lib/revalidate-news";
import { createAdminPost, getAdminPost, listAdminPosts, listNewsCategories } from "@/lib/news-store";

export const runtime = "nodejs";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ items: await listAdminPosts(), categories: await listNewsCategories() });
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

  const payload = parseNewsPayload(body);
  if (!payload?.vi.title || !payload.coverImage || !payload.publishedAt) {
    return NextResponse.json({ error: "Thiếu tiêu đề, ảnh bìa hoặc ngày đăng." }, { status: 400 });
  }

  const created = await createAdminPost(payload);
  if (wantsTranslation(body)) {
    try {
      await translatePostLocales(created.id);
    } catch (error) {
      revalidatePublicNews();
      return NextResponse.json({
        post: await getAdminPost(created.id),
        warning: error instanceof Error ? error.message : "Không dịch được các ngôn ngữ khác.",
      });
    }
  }

  revalidatePublicNews();
  return NextResponse.json({ post: await getAdminPost(created.id) });
}
