import { NextResponse } from "next/server";

import { languageOptions, type SiteLanguage } from "@/i18n/dictionaries";
import { getPublishedNewsBySlug, getRelatedPublishedNews } from "@/lib/news-store";

export const runtime = "nodejs";
export const revalidate = 60;

const LANGS = new Set(languageOptions.map((item) => item.id));

type RouteContext = {
  params: Promise<{ slug: string }>;
};

function parseLang(value: string | null): SiteLanguage {
  return LANGS.has(value as SiteLanguage) ? (value as SiteLanguage) : "vi";
}

export async function GET(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const { searchParams } = new URL(request.url);
  const language = parseLang(searchParams.get("lang"));
  const relatedCount = Number(searchParams.get("related") || 0);

  const item = await getPublishedNewsBySlug(slug, language);
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const related =
    relatedCount > 0
      ? await getRelatedPublishedNews(slug, language, relatedCount)
      : undefined;

  return NextResponse.json(
    related ? { item, related } : { item },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    },
  );
}
