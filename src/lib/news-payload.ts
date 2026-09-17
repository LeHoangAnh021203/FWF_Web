import type { LocalizedNewsFields } from "@/components/b2b/fox-news-copy";
import { isNewsCategoryId } from "@/data/news-categories";
import type { SiteLanguage } from "@/i18n/dictionaries";
import type { NewsWritePayload } from "@/lib/news-store";
import { getAdminPost, getTranslationSource, parsePostStatus, upsertTranslation } from "@/lib/news-store";
import { revalidatePublicNews } from "@/lib/revalidate-news";
import { translateNewsFields, translationTargets } from "@/lib/translate-news";

export function parseNewsPayload(body: unknown): NewsWritePayload | null {
  if (!body || typeof body !== "object") return null;
  const value = body as Record<string, unknown>;
  const vi = value.vi;
  if (!vi || typeof vi !== "object") return null;
  if (!isNewsCategoryId(String(value.categoryId ?? ""))) return null;

  const locale = vi as Record<string, unknown>;
  return {
    slug: typeof value.slug === "string" ? value.slug : "",
    categoryId: value.categoryId as NewsWritePayload["categoryId"],
    publishedAt: String(value.publishedAt ?? "").slice(0, 10),
    coverImage: String(value.coverImage ?? ""),
    sponsored: Boolean(value.sponsored),
    status: parsePostStatus(value.status),
    vi: {
      title: String(locale.title ?? ""),
      excerpt: String(locale.excerpt ?? ""),
      intro: String(locale.intro ?? ""),
      lead: String(locale.lead ?? ""),
      paragraphs: Array.isArray(locale.paragraphs)
        ? (locale.paragraphs as LocalizedNewsFields["paragraphs"])
        : [],
      bullets: Array.isArray(locale.bullets) ? (locale.bullets as string[]) : [],
      quote: String(locale.quote ?? ""),
      cta: String(locale.cta ?? ""),
    },
  };
}

export function wantsTranslation(body: unknown): boolean {
  return Boolean(body && typeof body === "object" && (body as { translate?: boolean }).translate);
}

export async function translatePostLocales(
  postId: string,
  force = false,
  languages?: Array<Exclude<SiteLanguage, "vi">>,
): Promise<string[]> {
  const post = await getAdminPost(postId);
  if (!post) throw new Error("Post not found");

  const skipped: string[] = [];
  const targets = languages?.length ? languages : translationTargets();
  for (const language of targets) {
    const current = await getTranslationSource(postId, language);
    if (!force && current === "manual") {
      skipped.push(language);
      continue;
    }
    const locale = await translateNewsFields(post.vi, language);
    await upsertTranslation(postId, language, locale, "auto");
    revalidatePublicNews();
  }
  return skipped;
}
