import { NextResponse } from "next/server";

import { languageOptions, type SiteLanguage } from "@/i18n/dictionaries";
import { getPublishedNewsBySlug } from "@/lib/news-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LANGS = new Set(languageOptions.map((item) => item.id));

type RouteContext = {
  params: Promise<{ slug: string }>;
};

function parseLang(value: string | null): SiteLanguage {
  return LANGS.has(value as SiteLanguage) ? (value as SiteLanguage) : "vi";
}

export async function GET(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const language = parseLang(new URL(request.url).searchParams.get("lang"));
  const item = await getPublishedNewsBySlug(slug, language);
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(
    { item },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
