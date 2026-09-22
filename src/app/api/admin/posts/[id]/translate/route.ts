import { NextResponse } from "next/server";

import { requireModule } from "@/lib/admin-auth";
import type { SiteLanguage } from "@/i18n/dictionaries";
import { translatePostLocales } from "@/lib/news-payload";
import { revalidatePublicNews } from "@/lib/revalidate-news";
import { getAdminPost } from "@/lib/news-store";
import { translationTargets } from "@/lib/translate-news";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

type TranslateLanguage = Exclude<SiteLanguage, "vi">;

function parseTranslateBody(body: unknown): { force: boolean; languages?: TranslateLanguage[] } {
  if (!body || typeof body !== "object") return { force: false };
  const value = body as { force?: boolean; language?: unknown };
  const targets = new Set(translationTargets());
  const language =
    typeof value.language === "string" && targets.has(value.language as TranslateLanguage)
      ? (value.language as TranslateLanguage)
      : undefined;
  return {
    force: Boolean(value.force),
    languages: language ? [language] : undefined,
  };
}

export async function POST(request: Request, context: RouteContext) {
  if (!(await requireModule("tin-tuc"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const post = await getAdminPost(id);
  if (!post) return NextResponse.json({ error: "Không tìm thấy bài viết." }, { status: 404 });

  let parsed = { force: false } as { force: boolean; languages?: TranslateLanguage[] };
  try {
    parsed = parseTranslateBody(await request.json());
  } catch {
    parsed = { force: false };
  }

  try {
    const skipped = await translatePostLocales(id, parsed.force, parsed.languages);
    revalidatePublicNews();
    return NextResponse.json({ post: await getAdminPost(id), skipped, language: parsed.languages?.[0] ?? null });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Không dịch được bài viết." },
      { status: 502 },
    );
  }
}
