import { NextResponse } from "next/server";

import { languageOptions, type SiteLanguage } from "@/i18n/dictionaries";
import { getPublishedCategories, getPublishedNews } from "@/lib/news-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LANGS = new Set(languageOptions.map((item) => item.id));

function parseLang(value: string | null): SiteLanguage {
  return LANGS.has(value as SiteLanguage) ? (value as SiteLanguage) : "vi";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const language = parseLang(searchParams.get("lang"));
  const items = await getPublishedNews(language);
  const categories = await getPublishedCategories(language);
  return NextResponse.json(
    { items, categories },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
