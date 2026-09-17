import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/admin-auth";
import { parseNewsPayload, translatePostLocales, wantsTranslation } from "@/lib/news-payload";
import { revalidatePublicNews } from "@/lib/revalidate-news";
import { deleteAdminPost, getAdminPost, parsePostStatus, updateAdminPost, updateAdminPostStatus } from "@/lib/news-store";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const post = await getAdminPost(id);
  if (!post) return NextResponse.json({ error: "Không tìm thấy bài viết." }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PUT(request: Request, context: RouteContext) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
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

  try {
    await updateAdminPost(id, payload);
  } catch {
    return NextResponse.json({ error: "Không tìm thấy bài viết." }, { status: 404 });
  }

  if (wantsTranslation(body)) {
    try {
      await translatePostLocales(id);
    } catch (error) {
      revalidatePublicNews();
      return NextResponse.json({
        post: await getAdminPost(id),
        warning: error instanceof Error ? error.message : "Không dịch được các ngôn ngữ khác.",
      });
    }
  }

  revalidatePublicNews();
  return NextResponse.json({ post: await getAdminPost(id) });
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const requested =
    body && typeof body === "object" ? (body as { status?: unknown }).status : undefined;
  if (requested !== "draft" && requested !== "published" && requested !== "hidden") {
    return NextResponse.json({ error: "Trạng thái không hợp lệ." }, { status: 400 });
  }

  const post = await updateAdminPostStatus(id, parsePostStatus(requested));
  if (!post) return NextResponse.json({ error: "Không tìm thấy bài viết." }, { status: 404 });
  revalidatePublicNews();
  return NextResponse.json({ post });
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const deleted = await deleteAdminPost(id);
  if (!deleted) return NextResponse.json({ error: "Không tìm thấy bài viết." }, { status: 404 });
  revalidatePublicNews();
  return NextResponse.json({ ok: true });
}
