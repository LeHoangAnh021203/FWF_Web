import { NextResponse } from "next/server";

import { requireModule } from "@/lib/admin-auth";
import { revalidatePublicNews } from "@/lib/revalidate-news";
import { deleteNewsCategory, updateNewsCategory } from "@/lib/news-store";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, context: RouteContext) {
  if (!(await requireModule("tin-tuc"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const name = body && typeof body === "object" ? String((body as { name?: unknown }).name ?? "").trim() : "";
  if (!name) return NextResponse.json({ error: "Nhập tên chủ đề." }, { status: 400 });

  try {
    const category = await updateNewsCategory(id, name);
    if (!category) return NextResponse.json({ error: "Không tìm thấy chủ đề." }, { status: 404 });
    revalidatePublicNews();
    return NextResponse.json({ category });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Không sửa được chủ đề." },
      { status: 400 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await requireModule("tin-tuc"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const result = await deleteNewsCategory(id);
  if (result === "missing") return NextResponse.json({ error: "Không tìm thấy chủ đề." }, { status: 404 });
  if (result === "in-use") {
    return NextResponse.json(
      { error: "Chủ đề còn bài viết. Hãy chuyển hoặc xóa bài trước khi xóa chủ đề." },
      { status: 409 },
    );
  }
  revalidatePublicNews();
  return NextResponse.json({ ok: true });
}
