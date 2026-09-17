import type { ArticleBlock, LocalizedNewsFields } from "@/components/b2b/fox-news-copy";
import type { FoxNewsItem } from "@/components/b2b/home-data";
import {
  getLocalizedFoxNews,
  getFoxNewsItemBySlug as getStaticNewsBySlug,
} from "@/components/b2b/home-data";
import {
  NEWS_CATEGORY_IDS,
  categoryLabel,
  isNewsCategoryId,
  type NewsCategory,
  type NewsCategoryId,
} from "@/data/news-categories";
import { formatNewsDate, toNewsDateIso } from "@/i18n/format-news-date";
import { languageOptions, type SiteLanguage } from "@/i18n/dictionaries";
import { ensureNewsSchema, getSql, isDatabaseConfigured } from "@/lib/db";
import {
  fileCreateAdminPost,
  fileCreateNewsCategory,
  fileDeleteAdminPost,
  fileDeleteNewsCategory,
  fileGetAdminPost,
  fileGetPublishedCategories,
  fileGetPublishedNews,
  fileGetPublishedNewsBySlug,
  fileGetTranslationSource,
  fileListAdminPosts,
  fileListNewsCategories,
  fileReorderAdminPosts,
  fileUpdateAdminPost,
  fileUpdateAdminPostStatus,
  fileUpdateNewsCategory,
  fileUpsertTranslation,
} from "@/lib/news-file-store";
import { slugifyVi } from "@/lib/slugify";
import { translateCategoryLabels } from "@/lib/translate-news";

export type PostStatus = "draft" | "published" | "hidden";
export type TranslationSource = "auto" | "manual";

export function parsePostStatus(value: unknown): PostStatus {
  if (value === "published" || value === "hidden" || value === "draft") return value;
  return "draft";
}

export type AdminPostListItem = {
  id: string;
  slug: string;
  categoryId: NewsCategoryId;
  publishedAt: string;
  coverImage: string;
  sponsored: boolean;
  status: PostStatus;
  sortOrder: number;
  title: string;
  excerpt: string;
  updatedAt: string;
};

export type AdminPost = {
  id: string;
  slug: string;
  categoryId: NewsCategoryId;
  publishedAt: string;
  coverImage: string;
  sponsored: boolean;
  status: PostStatus;
  vi: LocalizedNewsFields;
  translationMeta: Record<SiteLanguage, TranslationSource | "missing">;
};

export type NewsWritePayload = {
  slug?: string;
  categoryId: NewsCategoryId;
  publishedAt: string;
  coverImage: string;
  sponsored: boolean;
  status: PostStatus;
  vi: LocalizedNewsFields;
};

type PostRow = {
  id: string;
  slug: string;
  category_id: string;
  published_at: string;
  cover_image: string;
  sponsored: boolean;
  status: PostStatus;
  created_at?: string;
  updated_at?: string;
  sort_order?: number;
  title?: string;
  excerpt?: string;
  intro?: string;
  lead?: string;
  paragraphs?: ArticleBlock[] | string;
  bullets?: string[] | string;
  quote?: string;
  cta?: string;
  language?: string;
  source?: TranslationSource;
};

const LANGUAGES = languageOptions.map((item) => item.id);

function dateOnly(value: unknown): string {
  return String(value ?? "").slice(0, 10);
}

function parseJson<T>(value: T | string | null | undefined, fallback: T): T {
  if (value == null) return fallback;
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }
  return value;
}

function asCategoryId(value: string): NewsCategoryId {
  return isNewsCategoryId(value) ? value : NEWS_CATEGORY_IDS[0];
}

function emptyLocale(): LocalizedNewsFields {
  return {
    title: "",
    excerpt: "",
    intro: "",
    lead: "",
    paragraphs: [],
    bullets: [],
    quote: "",
    cta: "",
  };
}

function localeFromRow(row: PostRow | undefined): LocalizedNewsFields {
  if (!row) return emptyLocale();
  return {
    title: row.title ?? "",
    excerpt: row.excerpt ?? "",
    intro: row.intro ?? "",
    lead: row.lead ?? "",
    paragraphs: parseJson<ArticleBlock[]>(row.paragraphs, []),
    bullets: parseJson<string[]>(row.bullets, []),
    quote: row.quote ?? "",
    cta: row.cta ?? "",
  };
}

function toFoxNewsItem(row: PostRow, language: SiteLanguage): FoxNewsItem {
  const locale = localeFromRow(row);
  const publishedAt = dateOnly(row.published_at);
  return {
    slug: row.slug,
    date: formatNewsDate(publishedAt, language),
    dateIso: toNewsDateIso(publishedAt),
    image: row.cover_image,
    sponsored: Boolean(row.sponsored),
    categoryId: asCategoryId(row.category_id),
    title: locale.title,
    excerpt: locale.excerpt,
    article: {
      intro: locale.intro,
      lead: locale.lead,
      paragraphs: locale.paragraphs,
      bullets: locale.bullets,
      quote: locale.quote,
      cta: locale.cta,
    },
  };
}

async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const db = getSql();
  const normalized = slugifyVi(base) || `bai-viet-${Date.now()}`;
  let candidate = normalized;
  let n = 2;
  while (true) {
    const rows = excludeId
      ? await db`SELECT id FROM posts WHERE slug = ${candidate} AND id <> ${excludeId} LIMIT 1`
      : await db`SELECT id FROM posts WHERE slug = ${candidate} LIMIT 1`;
    if (rows.length === 0) return candidate;
    candidate = `${normalized}-${n}`;
    n += 1;
  }
}

export async function getPublishedNews(language: SiteLanguage): Promise<FoxNewsItem[]> {
  if (!isDatabaseConfigured()) {
    try {
      return await fileGetPublishedNews(language);
    } catch (error) {
      console.error("[news-store] local file store failed", error);
      return getLocalizedFoxNews(language);
    }
  }

  try {
    await ensureNewsSchema();
    const db = getSql();
    const rows = (await db`
      SELECT
        p.id, p.slug, p.category_id, p.published_at, p.cover_image, p.sponsored, p.status,
        COALESCE(t.title, vi.title) AS title,
        COALESCE(t.excerpt, vi.excerpt) AS excerpt,
        COALESCE(t.intro, vi.intro) AS intro,
        COALESCE(t.lead, vi.lead) AS lead,
        COALESCE(t.paragraphs, vi.paragraphs) AS paragraphs,
        COALESCE(t.bullets, vi.bullets) AS bullets,
        COALESCE(t.quote, vi.quote) AS quote,
        COALESCE(t.cta, vi.cta) AS cta
      FROM posts p
      JOIN post_translations vi ON vi.post_id = p.id AND vi.language = 'vi'
      LEFT JOIN post_translations t ON t.post_id = p.id AND t.language = ${language}
      WHERE p.status = 'published'
      ORDER BY p.sort_order ASC, p.published_at DESC, p.created_at DESC
    `) as PostRow[];

    return rows.map((row) => toFoxNewsItem(row, language));
  } catch (error) {
    console.error("[news-store] getPublishedNews failed", error);
    return getLocalizedFoxNews(language);
  }
}

export async function getPublishedNewsBySlug(
  slug: string,
  language: SiteLanguage = "vi",
): Promise<FoxNewsItem | null> {
  if (!isDatabaseConfigured()) {
    try {
      return await fileGetPublishedNewsBySlug(slug, language);
    } catch (error) {
      console.error("[news-store] local file store failed", error);
      return getStaticNewsBySlug(slug, language) ?? null;
    }
  }

  try {
    await ensureNewsSchema();
    const db = getSql();
    const rows = (await db`
      SELECT
        p.id, p.slug, p.category_id, p.published_at, p.cover_image, p.sponsored, p.status,
        COALESCE(t.title, vi.title) AS title,
        COALESCE(t.excerpt, vi.excerpt) AS excerpt,
        COALESCE(t.intro, vi.intro) AS intro,
        COALESCE(t.lead, vi.lead) AS lead,
        COALESCE(t.paragraphs, vi.paragraphs) AS paragraphs,
        COALESCE(t.bullets, vi.bullets) AS bullets,
        COALESCE(t.quote, vi.quote) AS quote,
        COALESCE(t.cta, vi.cta) AS cta
      FROM posts p
      JOIN post_translations vi ON vi.post_id = p.id AND vi.language = 'vi'
      LEFT JOIN post_translations t ON t.post_id = p.id AND t.language = ${language}
      WHERE p.slug = ${slug} AND p.status = 'published'
      LIMIT 1
    `) as PostRow[];

    if (rows[0]) return toFoxNewsItem(rows[0], language);
    return null;
  } catch (error) {
    console.error("[news-store] getPublishedNewsBySlug failed", error);
    return getStaticNewsBySlug(slug, language) ?? null;
  }
}

export async function newsSlugExists(slug: string): Promise<boolean> {
  if (!isDatabaseConfigured()) {
    return Boolean(await fileGetPublishedNewsBySlug(slug, "vi"));
  }

  try {
    await ensureNewsSchema();
    const db = getSql();
    const rows = await db`
      SELECT 1 FROM posts WHERE slug = ${slug} AND status = 'published' LIMIT 1
    `;
    return rows.length > 0;
  } catch (error) {
    console.error("[news-store] newsSlugExists failed", error);
    return Boolean(getStaticNewsBySlug(slug, "vi"));
  }
}

export async function listAdminPosts(): Promise<AdminPostListItem[]> {
  if (!isDatabaseConfigured()) return fileListAdminPosts();
  await ensureNewsSchema();
  const db = getSql();
  const rows = (await db`
    SELECT
      p.id, p.slug, p.category_id, p.published_at, p.cover_image, p.sponsored, p.status, p.updated_at, p.sort_order,
      COALESCE(vi.title, '') AS title,
      COALESCE(vi.excerpt, '') AS excerpt
    FROM posts p
    LEFT JOIN post_translations vi ON vi.post_id = p.id AND vi.language = 'vi'
    ORDER BY p.sort_order ASC, p.published_at DESC
  `) as PostRow[];

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    categoryId: asCategoryId(row.category_id),
    publishedAt: dateOnly(row.published_at),
    coverImage: row.cover_image,
    sponsored: Boolean(row.sponsored),
    status: parsePostStatus(row.status),
    sortOrder: Number(row.sort_order ?? 0),
    title: row.title ?? "",
    excerpt: row.excerpt ?? "",
    updatedAt: String(row.updated_at ?? ""),
  }));
}

export async function getAdminPost(id: string): Promise<AdminPost | null> {
  if (!isDatabaseConfigured()) return fileGetAdminPost(id);
  await ensureNewsSchema();
  const db = getSql();
  const posts = (await db`SELECT * FROM posts WHERE id = ${id} LIMIT 1`) as PostRow[];
  const post = posts[0];
  if (!post) return null;

  const translations = (await db`
    SELECT language, title, excerpt, intro, lead, paragraphs, bullets, quote, cta, source
    FROM post_translations
    WHERE post_id = ${id}
  `) as PostRow[];

  const translationMeta = Object.fromEntries(
    LANGUAGES.map((language) => [language, "missing" as const]),
  ) as Record<SiteLanguage, TranslationSource | "missing">;

  let vi = emptyLocale();
  for (const row of translations) {
    const language = row.language as SiteLanguage;
    if (!LANGUAGES.includes(language)) continue;
    translationMeta[language] = row.source === "auto" ? "auto" : "manual";
    if (language === "vi") vi = localeFromRow(row);
  }

  return {
    id: post.id,
    slug: post.slug,
    categoryId: asCategoryId(post.category_id),
    publishedAt: dateOnly(post.published_at),
    coverImage: post.cover_image,
    sponsored: Boolean(post.sponsored),
    status: parsePostStatus(post.status),
    vi,
    translationMeta,
  };
}

export async function createAdminPost(payload: NewsWritePayload): Promise<AdminPost> {
  if (!isDatabaseConfigured()) return fileCreateAdminPost(payload);
  await ensureNewsSchema();
  const db = getSql();
  const slug = await uniqueSlug(payload.slug || payload.vi.title);
  const maxRows = (await db`
    SELECT COALESCE(MAX(sort_order), -1) AS max_sort
    FROM posts
    WHERE category_id = ${payload.categoryId}
  `) as Array<{ max_sort: number }>;
  const sortOrder = Number(maxRows[0]?.max_sort ?? -1) + 1;
  const rows = (await db`
    INSERT INTO posts (slug, category_id, published_at, cover_image, sponsored, status, sort_order)
    VALUES (
      ${slug},
      ${payload.categoryId},
      ${payload.publishedAt},
      ${payload.coverImage},
      ${payload.sponsored},
      ${payload.status},
      ${sortOrder}
    )
    RETURNING id
  `) as Array<{ id: string }>;

  const id = rows[0]?.id;
  if (!id) throw new Error("Could not create post");

  await upsertTranslation(id, "vi", payload.vi, "manual");
  const created = await getAdminPost(id);
  if (!created) throw new Error("Could not load created post");
  return created;
}

export async function updateAdminPost(id: string, payload: NewsWritePayload): Promise<AdminPost> {
  if (!isDatabaseConfigured()) return fileUpdateAdminPost(id, payload);
  await ensureNewsSchema();
  const db = getSql();
  const slug = await uniqueSlug(payload.slug || payload.vi.title, id);

  const updated = await db`
    UPDATE posts
    SET
      slug = ${slug},
      category_id = ${payload.categoryId},
      published_at = ${payload.publishedAt},
      cover_image = ${payload.coverImage},
      sponsored = ${payload.sponsored},
      status = ${payload.status},
      updated_at = now()
    WHERE id = ${id}
    RETURNING id
  `;
  if (updated.length === 0) throw new Error("Post not found");

  await upsertTranslation(id, "vi", payload.vi, "manual");
  const post = await getAdminPost(id);
  if (!post) throw new Error("Post not found");
  return post;
}

export async function updateAdminPostStatus(id: string, status: PostStatus): Promise<AdminPost | null> {
  if (!isDatabaseConfigured()) return fileUpdateAdminPostStatus(id, status);
  await ensureNewsSchema();
  const db = getSql();
  const updated = await db`
    UPDATE posts
    SET status = ${status}, updated_at = now()
    WHERE id = ${id}
    RETURNING id
  `;
  if (updated.length === 0) return null;
  return getAdminPost(id);
}

export async function deleteAdminPost(id: string): Promise<boolean> {
  if (!isDatabaseConfigured()) return fileDeleteAdminPost(id);
  await ensureNewsSchema();
  const db = getSql();
  const rows = await db`DELETE FROM posts WHERE id = ${id} RETURNING id`;
  return rows.length > 0;
}

export async function upsertTranslation(
  postId: string,
  language: SiteLanguage,
  locale: LocalizedNewsFields,
  source: TranslationSource,
): Promise<void> {
  if (!isDatabaseConfigured()) {
    await fileUpsertTranslation(postId, language, locale, source);
    return;
  }
  const db = getSql();
  await db`
    INSERT INTO post_translations (
      post_id, language, title, excerpt, intro, lead, paragraphs, bullets, quote, cta, source
    )
    VALUES (
      ${postId},
      ${language},
      ${locale.title},
      ${locale.excerpt},
      ${locale.intro},
      ${locale.lead},
      ${JSON.stringify(locale.paragraphs)}::jsonb,
      ${JSON.stringify(locale.bullets)}::jsonb,
      ${locale.quote},
      ${locale.cta},
      ${source}
    )
    ON CONFLICT (post_id, language)
    DO UPDATE SET
      title = EXCLUDED.title,
      excerpt = EXCLUDED.excerpt,
      intro = EXCLUDED.intro,
      lead = EXCLUDED.lead,
      paragraphs = EXCLUDED.paragraphs,
      bullets = EXCLUDED.bullets,
      quote = EXCLUDED.quote,
      cta = EXCLUDED.cta,
      source = EXCLUDED.source
  `;
}

export async function getTranslationSource(
  postId: string,
  language: SiteLanguage,
): Promise<TranslationSource | "missing"> {
  if (!isDatabaseConfigured()) return fileGetTranslationSource(postId, language);
  const db = getSql();
  const rows = (await db`
    SELECT source FROM post_translations WHERE post_id = ${postId} AND language = ${language} LIMIT 1
  `) as Array<{ source: TranslationSource }>;
  return rows[0]?.source ?? "missing";
}

export type PublicNewsCategory = {
  id: string;
  label: string;
};

export async function listNewsCategories(): Promise<NewsCategory[]> {
  if (!isDatabaseConfigured()) return fileListNewsCategories();
  await ensureNewsSchema();
  const db = getSql();
  const rows = (await db`
    SELECT id, sort_order, labels
    FROM news_categories
    ORDER BY sort_order ASC
  `) as Array<{ id: string; sort_order: number; labels: NewsCategory["labels"] | string }>;
  return rows.map((row) => ({
    id: row.id,
    sortOrder: Number(row.sort_order ?? 0),
    labels: parseJson<NewsCategory["labels"]>(row.labels, { vi: row.id }),
  }));
}

export async function getPublishedCategories(language: SiteLanguage): Promise<PublicNewsCategory[]> {
  if (!isDatabaseConfigured()) {
    try {
      return await fileGetPublishedCategories(language);
    } catch (error) {
      console.error("[news-store] local categories failed", error);
      return [];
    }
  }
  try {
    const [categories, posts] = await Promise.all([listNewsCategories(), getPublishedNews(language)]);
    const used = new Set(posts.map((post) => post.categoryId));
    return categories
      .filter((category) => used.has(category.id))
      .map((category) => ({
        id: category.id,
        label: categoryLabel(category, language),
      }));
  } catch (error) {
    console.error("[news-store] getPublishedCategories failed", error);
    return [];
  }
}

export async function createNewsCategory(viName: string): Promise<NewsCategory> {
  const name = viName.trim();
  if (!name) throw new Error("Thiếu tên chủ đề.");
  const labels = await translateCategoryLabels(name);
  if (!isDatabaseConfigured()) return fileCreateNewsCategory(labels);
  await ensureNewsSchema();
  const db = getSql();
  const base = slugifyVi(name) || `chu-de-${Date.now()}`;
  let id = base;
  let n = 2;
  while (true) {
    const existing = await db`SELECT id FROM news_categories WHERE id = ${id} LIMIT 1`;
    if (existing.length === 0) break;
    id = `${base}-${n}`;
    n += 1;
  }
  const maxRows = (await db`SELECT COALESCE(MAX(sort_order), -1) AS max_sort FROM news_categories`) as Array<{
    max_sort: number;
  }>;
  const sortOrder = Number(maxRows[0]?.max_sort ?? -1) + 1;
  await db`
    INSERT INTO news_categories (id, sort_order, labels)
    VALUES (${id}, ${sortOrder}, ${JSON.stringify(labels)}::jsonb)
  `;
  return { id, sortOrder, labels };
}

export async function updateNewsCategory(id: string, viName: string): Promise<NewsCategory | null> {
  const name = viName.trim();
  if (!name) throw new Error("Thiếu tên chủ đề.");
  const labels = await translateCategoryLabels(name);
  if (!isDatabaseConfigured()) return fileUpdateNewsCategory(id, labels);
  await ensureNewsSchema();
  const db = getSql();
  const updated = await db`
    UPDATE news_categories
    SET labels = ${JSON.stringify(labels)}::jsonb
    WHERE id = ${id}
    RETURNING id
  `;
  if (updated.length === 0) return null;
  const categories = await listNewsCategories();
  return categories.find((category) => category.id === id) ?? null;
}

export async function deleteNewsCategory(id: string): Promise<"missing" | "in-use" | "ok"> {
  if (!isDatabaseConfigured()) return fileDeleteNewsCategory(id);
  await ensureNewsSchema();
  const db = getSql();
  const existing = await db`SELECT id FROM news_categories WHERE id = ${id} LIMIT 1`;
  if (existing.length === 0) return "missing";
  const used = await db`SELECT id FROM posts WHERE category_id = ${id} LIMIT 1`;
  if (used.length > 0) return "in-use";
  await db`DELETE FROM news_categories WHERE id = ${id}`;
  return "ok";
}

export async function reorderAdminPosts(
  updates: Array<{ id: string; categoryId: string; sortOrder: number }>,
): Promise<void> {
  if (!isDatabaseConfigured()) {
    await fileReorderAdminPosts(updates);
    return;
  }
  await ensureNewsSchema();
  const db = getSql();
  for (const update of updates) {
    await db`
      UPDATE posts
      SET category_id = ${update.categoryId}, sort_order = ${update.sortOrder}, updated_at = now()
      WHERE id = ${update.id}
    `;
  }
}
