import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import type { LocalizedNewsFields } from "@/components/b2b/fox-news-copy";
import type { FoxNewsItem } from "@/components/b2b/home-data";
import { foxNewsSources } from "@/components/b2b/fox-news-locales";
import {
  DEFAULT_NEWS_CATEGORIES,
  categoryLabel,
  getNewsCategoryId,
  type NewsCategory,
} from "@/data/news-categories";
import { formatNewsDate, toNewsDateIso } from "@/i18n/format-news-date";
import { languageOptions, type SiteLanguage } from "@/i18n/dictionaries";
import type {
  AdminPost,
  AdminPostListItem,
  NewsWritePayload,
  PostStatus,
  TranslationSource,
} from "@/lib/news-store";
import { slugifyVi } from "@/lib/slugify";

type StoredTranslation = {
  source: TranslationSource;
  locale: LocalizedNewsFields;
};

export type StoredPost = {
  id: string;
  slug: string;
  categoryId: AdminPost["categoryId"];
  publishedAt: string;
  coverImage: string;
  sponsored: boolean;
  status: PostStatus;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  translations: Partial<Record<SiteLanguage, StoredTranslation>>;
};

type StoreFile = {
  categories: NewsCategory[];
  posts: StoredPost[];
};

const FILE_PATH = path.join(process.cwd(), "data", "local-news.json");
const LANGUAGES = languageOptions.map((item) => item.id);

let writeQueue: Promise<void> = Promise.resolve();

function emptyMeta(): Record<SiteLanguage, TranslationSource | "missing"> {
  return Object.fromEntries(LANGUAGES.map((language) => [language, "missing"])) as Record<
    SiteLanguage,
    TranslationSource | "missing"
  >;
}

function toListItem(post: StoredPost): AdminPostListItem {
  return {
    id: post.id,
    slug: post.slug,
    categoryId: post.categoryId,
    publishedAt: post.publishedAt,
    coverImage: post.coverImage,
    sponsored: post.sponsored,
    status: post.status,
    sortOrder: post.sortOrder,
    title: post.translations.vi?.locale.title ?? "",
    excerpt: post.translations.vi?.locale.excerpt ?? "",
    updatedAt: post.updatedAt,
  };
}

function toAdminPost(post: StoredPost): AdminPost {
  const translationMeta = emptyMeta();
  for (const language of LANGUAGES) {
    const item = post.translations[language];
    if (item) translationMeta[language] = item.source;
  }
  return {
    id: post.id,
    slug: post.slug,
    categoryId: post.categoryId,
    publishedAt: post.publishedAt,
    coverImage: post.coverImage,
    sponsored: post.sponsored,
    status: post.status,
    vi: post.translations.vi?.locale ?? {
      title: "",
      excerpt: "",
      intro: "",
      lead: "",
      paragraphs: [],
      bullets: [],
      quote: "",
      cta: "",
    },
    translationMeta,
  };
}

function toFoxNewsItem(post: StoredPost, language: SiteLanguage): FoxNewsItem {
  const locale =
    post.translations[language]?.locale ??
    post.translations.vi?.locale ??
    post.translations.en?.locale;
  return {
    slug: post.slug,
    date: formatNewsDate(post.publishedAt, language),
    dateIso: toNewsDateIso(post.publishedAt),
    image: post.coverImage,
    sponsored: post.sponsored,
    categoryId: post.categoryId,
    title: locale?.title ?? "",
    excerpt: locale?.excerpt,
    article: locale
      ? {
          intro: locale.intro,
          lead: locale.lead,
          paragraphs: locale.paragraphs,
          bullets: locale.bullets,
          quote: locale.quote,
          cta: locale.cta,
        }
      : undefined,
  };
}

function seedPosts(): StoredPost[] {
  const now = new Date().toISOString();
  const posts = foxNewsSources.map((source) => ({
    id: `local-${source.slug}`,
    slug: source.slug,
    categoryId: getNewsCategoryId(source.slug),
    publishedAt: source.date,
    coverImage: source.image,
    sponsored: Boolean(source.sponsored),
    status: "published" as const,
    sortOrder: 0,
    createdAt: now,
    updatedAt: now,
    translations: Object.fromEntries(
      LANGUAGES.map((language) => [
        language,
        { source: "manual" as const, locale: source.locales[language] },
      ]),
    ),
  }));
  applyDefaultSortOrders(posts);
  return posts;
}

function applyDefaultSortOrders(posts: StoredPost[]) {
  const grouped = new Map<string, StoredPost[]>();
  for (const post of posts) {
    const list = grouped.get(post.categoryId) ?? [];
    list.push(post);
    grouped.set(post.categoryId, list);
  }
  for (const list of grouped.values()) {
    list
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || b.createdAt.localeCompare(a.createdAt))
      .forEach((post, index) => {
        post.sortOrder = index;
      });
  }
}

function normalizeStore(parsed: Partial<StoreFile> | null | undefined): StoreFile {
  const posts = Array.isArray(parsed?.posts) ? parsed.posts : [];
  const categories =
    Array.isArray(parsed?.categories) && parsed.categories.length > 0
      ? [...parsed.categories]
          .map((category, index) => ({
            id: category.id,
            sortOrder: Number.isFinite(category.sortOrder) ? category.sortOrder : index,
            labels: category.labels ?? { vi: category.id },
          }))
          .sort((a, b) => a.sortOrder - b.sortOrder)
      : DEFAULT_NEWS_CATEGORIES.map((category) => ({ ...category, labels: { ...category.labels } }));

  const normalizedPosts = posts.map((post) => ({
    ...post,
    sortOrder: typeof post.sortOrder === "number" ? post.sortOrder : Number.NaN,
  }));
  if (normalizedPosts.some((post) => Number.isNaN(post.sortOrder))) {
    applyDefaultSortOrders(normalizedPosts);
  }

  return { categories, posts: normalizedPosts };
}

async function readStore(): Promise<StoreFile> {
  try {
    const raw = await readFile(FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<StoreFile>;
    if (Array.isArray(parsed.posts) && parsed.posts.length > 0) {
      const normalized = normalizeStore(parsed);
      if (!Array.isArray(parsed.categories) || parsed.posts.some((post) => typeof post.sortOrder !== "number")) {
        await persist(normalized);
      }
      return normalized;
    }
  } catch {
    // First run: seed from the hardcoded Fox News articles.
  }
  const seeded = normalizeStore({ categories: DEFAULT_NEWS_CATEGORIES, posts: seedPosts() });
  await persist(seeded);
  return seeded;
}

async function persist(store: StoreFile): Promise<void> {
  await mkdir(path.dirname(FILE_PATH), { recursive: true });
  await writeFile(FILE_PATH, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

async function mutate<T>(fn: (store: StoreFile) => T | Promise<T>): Promise<T> {
  const run = writeQueue.then(async () => {
    const store = await readStore();
    const result = await fn(store);
    await persist(store);
    return result;
  });
  writeQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function uniqueSlug(store: StoreFile, base: string, excludeId?: string): string {
  const normalized = slugifyVi(base) || `bai-viet-${Date.now()}`;
  let candidate = normalized;
  let n = 2;
  while (store.posts.some((post) => post.slug === candidate && post.id !== excludeId)) {
    candidate = `${normalized}-${n}`;
    n += 1;
  }
  return candidate;
}

export async function fileListAdminPosts(): Promise<AdminPostListItem[]> {
  const store = await readStore();
  return [...store.posts]
    .sort((a, b) => a.sortOrder - b.sortOrder || b.publishedAt.localeCompare(a.publishedAt))
    .map(toListItem);
}

export async function fileGetAdminPost(id: string): Promise<AdminPost | null> {
  const store = await readStore();
  const post = store.posts.find((item) => item.id === id);
  return post ? toAdminPost(post) : null;
}

export async function fileCreateAdminPost(payload: NewsWritePayload): Promise<AdminPost> {
  return mutate((store) => {
    const now = new Date().toISOString();
    const sortOrder =
      Math.max(-1, ...store.posts.filter((item) => item.categoryId === payload.categoryId).map((item) => item.sortOrder)) +
      1;
    const post: StoredPost = {
      id: crypto.randomUUID(),
      slug: uniqueSlug(store, payload.slug || payload.vi.title),
      categoryId: payload.categoryId,
      publishedAt: payload.publishedAt,
      coverImage: payload.coverImage,
      sponsored: payload.sponsored,
      status: payload.status,
      sortOrder,
      createdAt: now,
      updatedAt: now,
      translations: {
        vi: { source: "manual", locale: payload.vi },
      },
    };
    store.posts.unshift(post);
    return toAdminPost(post);
  });
}

export async function fileUpdateAdminPost(id: string, payload: NewsWritePayload): Promise<AdminPost> {
  return mutate((store) => {
    const post = store.posts.find((item) => item.id === id);
    if (!post) throw new Error("Post not found");
    post.slug = uniqueSlug(store, payload.slug || payload.vi.title, id);
    if (post.categoryId !== payload.categoryId) {
      post.categoryId = payload.categoryId;
      post.sortOrder =
        Math.max(-1, ...store.posts.filter((item) => item.categoryId === payload.categoryId && item.id !== id).map((item) => item.sortOrder)) +
        1;
    }
    post.publishedAt = payload.publishedAt;
    post.coverImage = payload.coverImage;
    post.sponsored = payload.sponsored;
    post.status = payload.status;
    post.updatedAt = new Date().toISOString();
    post.translations.vi = { source: "manual", locale: payload.vi };
    return toAdminPost(post);
  });
}

export async function fileUpdateAdminPostStatus(id: string, status: PostStatus): Promise<AdminPost | null> {
  return mutate((store) => {
    const post = store.posts.find((item) => item.id === id);
    if (!post) return null;
    post.status = status;
    post.updatedAt = new Date().toISOString();
    return toAdminPost(post);
  });
}

export async function fileDeleteAdminPost(id: string): Promise<boolean> {
  return mutate((store) => {
    const next = store.posts.filter((item) => item.id !== id);
    const deleted = next.length !== store.posts.length;
    store.posts = next;
    return deleted;
  });
}

export async function fileUpsertTranslation(
  postId: string,
  language: SiteLanguage,
  locale: LocalizedNewsFields,
  source: TranslationSource,
): Promise<void> {
  await mutate((store) => {
    const post = store.posts.find((item) => item.id === postId);
    if (!post) throw new Error("Post not found");
    post.translations[language] = { source, locale };
    post.updatedAt = new Date().toISOString();
  });
}

export async function fileGetTranslationSource(
  postId: string,
  language: SiteLanguage,
): Promise<TranslationSource | "missing"> {
  const store = await readStore();
  return store.posts.find((item) => item.id === postId)?.translations[language]?.source ?? "missing";
}

export async function fileGetPublishedNews(language: SiteLanguage): Promise<FoxNewsItem[]> {
  const store = await readStore();
  return store.posts
    .filter((post) => post.status === "published")
    .sort((a, b) => a.sortOrder - b.sortOrder || b.publishedAt.localeCompare(a.publishedAt) || b.createdAt.localeCompare(a.createdAt))
    .map((post) => toFoxNewsItem(post, language));
}

export async function fileGetPublishedNewsBySlug(
  slug: string,
  language: SiteLanguage,
): Promise<FoxNewsItem | null> {
  const store = await readStore();
  const post = store.posts.find((item) => item.slug === slug && item.status === "published");
  return post ? toFoxNewsItem(post, language) : null;
}

export async function fileListNewsCategories(): Promise<NewsCategory[]> {
  const store = await readStore();
  return [...store.categories].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function fileGetPublishedCategories(language: SiteLanguage): Promise<Array<{ id: string; label: string }>> {
  const store = await readStore();
  const used = new Set(
    store.posts.filter((post) => post.status === "published").map((post) => post.categoryId),
  );
  return [...store.categories]
    .filter((category) => used.has(category.id))
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((category) => ({
      id: category.id,
      label: categoryLabel(category, language),
    }));
}

function uniqueCategoryId(store: StoreFile, name: string, excludeId?: string): string {
  const normalized = slugifyVi(name) || `chu-de-${Date.now()}`;
  let candidate = normalized;
  let n = 2;
  while (store.categories.some((category) => category.id === candidate && category.id !== excludeId)) {
    candidate = `${normalized}-${n}`;
    n += 1;
  }
  return candidate;
}

export async function fileCreateNewsCategory(labels: NewsCategory["labels"]): Promise<NewsCategory> {
  return mutate((store) => {
    const vi = labels.vi?.trim() || "";
    const category: NewsCategory = {
      id: uniqueCategoryId(store, vi),
      sortOrder: store.categories.length === 0 ? 0 : Math.max(...store.categories.map((item) => item.sortOrder)) + 1,
      labels,
    };
    store.categories.push(category);
    return category;
  });
}

export async function fileUpdateNewsCategory(id: string, labels: NewsCategory["labels"]): Promise<NewsCategory | null> {
  return mutate((store) => {
    const category = store.categories.find((item) => item.id === id);
    if (!category) return null;
    category.labels = { ...category.labels, ...labels };
    return category;
  });
}

export async function fileDeleteNewsCategory(id: string): Promise<"missing" | "in-use" | "ok"> {
  return mutate((store) => {
    if (!store.categories.some((category) => category.id === id)) return "missing";
    if (store.posts.some((post) => post.categoryId === id)) return "in-use";
    store.categories = store.categories.filter((category) => category.id !== id);
    store.categories.forEach((category, index) => {
      category.sortOrder = index;
    });
    return "ok";
  });
}

export async function fileReorderAdminPosts(
  updates: Array<{ id: string; categoryId: string; sortOrder: number }>,
): Promise<void> {
  await mutate((store) => {
    for (const update of updates) {
      const post = store.posts.find((item) => item.id === update.id);
      if (!post) continue;
      post.categoryId = update.categoryId;
      post.sortOrder = update.sortOrder;
      post.updatedAt = new Date().toISOString();
    }
  });
}
