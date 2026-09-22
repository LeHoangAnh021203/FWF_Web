import postgres, { type Sql } from "postgres";

import { foxNewsSources } from "@/components/b2b/fox-news-locales";
import { DEFAULT_NEWS_CATEGORIES, getNewsCategoryId } from "@/data/news-categories";
import type { SiteLanguage } from "@/i18n/dictionaries";

let sql: Sql | null = null;
let ready: Promise<void> | null = null;

export function isDatabaseConfigured(): boolean {
  return Boolean(getDatabaseUrl());
}

function getDatabaseUrl(): string | null {
  const url =
    process.env.DATABASE_URL?.trim() ||
    process.env.DATABASE_PUBLIC_URL?.trim() ||
    null;
  return url || null;
}

export function getSql(): Sql {
  const url = getDatabaseUrl();
  if (!url) throw new Error("DATABASE_URL is not set");
  if (!sql) {
    sql = postgres(url, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 30,
      prepare: false,
      ssl: url.includes("localhost") || url.includes("127.0.0.1") ? false : "require",
    });
  }
  return sql;
}

export async function ensureNewsSchema(): Promise<void> {
  if (!isDatabaseConfigured()) return;
  if (!ready) {
    ready = initializeNewsSchema().catch((error) => {
      ready = null;
      throw error;
    });
  }
  await ready;
}

async function initializeNewsSchema(): Promise<void> {
  const db = getSql();
  await db`CREATE EXTENSION IF NOT EXISTS pgcrypto`;

  await db`
    CREATE TABLE IF NOT EXISTS posts (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      slug text UNIQUE NOT NULL,
      category_id text NOT NULL,
      published_at date NOT NULL,
      cover_image text NOT NULL,
      sponsored boolean NOT NULL DEFAULT false,
      status text NOT NULL DEFAULT 'draft',
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),
      CONSTRAINT posts_status_check CHECK (status IN ('draft', 'published', 'hidden'))
    )
  `;

  await db`
    CREATE TABLE IF NOT EXISTS post_translations (
      post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
      language text NOT NULL,
      title text NOT NULL,
      excerpt text NOT NULL DEFAULT '',
      intro text NOT NULL DEFAULT '',
      lead text NOT NULL DEFAULT '',
      paragraphs jsonb NOT NULL DEFAULT '[]'::jsonb,
      bullets jsonb NOT NULL DEFAULT '[]'::jsonb,
      quote text NOT NULL DEFAULT '',
      cta text NOT NULL DEFAULT '',
      source text NOT NULL DEFAULT 'manual',
      PRIMARY KEY (post_id, language),
      CONSTRAINT post_translations_source_check CHECK (source IN ('auto', 'manual'))
    )
  `;

  await db`CREATE INDEX IF NOT EXISTS posts_status_published_at_idx ON posts (status, published_at DESC)`;
  await db`ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_status_check`;
  await db`
    ALTER TABLE posts
    ADD CONSTRAINT posts_status_check CHECK (status IN ('draft', 'published', 'hidden'))
  `;
  await db`ALTER TABLE posts ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0`;
  await db`
    CREATE TABLE IF NOT EXISTS news_categories (
      id text PRIMARY KEY,
      sort_order integer NOT NULL DEFAULT 0,
      labels jsonb NOT NULL DEFAULT '{}'::jsonb
    )
  `;

  for (const category of DEFAULT_NEWS_CATEGORIES) {
    await db`
      INSERT INTO news_categories (id, sort_order, labels)
      VALUES (${category.id}, ${category.sortOrder}, ${db.json(category.labels)})
      ON CONFLICT (id) DO NOTHING
    `;
  }

  for (const source of foxNewsSources) {
    await db`
      INSERT INTO posts (slug, category_id, published_at, cover_image, sponsored, status)
      VALUES (
        ${source.slug},
        ${getNewsCategoryId(source.slug)},
        ${source.date},
        ${source.image},
        ${Boolean(source.sponsored)},
        'published'
      )
      ON CONFLICT (slug) DO NOTHING
    `;

    const rows = await db`SELECT id FROM posts WHERE slug = ${source.slug} LIMIT 1`;
    const postId = rows[0]?.id as string | undefined;
    if (!postId) continue;

    for (const language of Object.keys(source.locales) as SiteLanguage[]) {
      const locale = source.locales[language];
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
          ${db.json(locale.paragraphs)},
          ${db.json(locale.bullets)},
          ${locale.quote},
          ${locale.cta},
          'manual'
        )
        ON CONFLICT (post_id, language) DO NOTHING
      `;
    }
  }
}

let adminReady: Promise<void> | null = null;

export async function ensureAdminSchema(): Promise<void> {
  if (!isDatabaseConfigured()) return;
  if (!adminReady) {
    adminReady = initializeAdminSchema().catch((error) => {
      adminReady = null;
      throw error;
    });
  }
  await adminReady;
}

async function initializeAdminSchema(): Promise<void> {
  const db = getSql();
  await db`CREATE EXTENSION IF NOT EXISTS pgcrypto`;
  await db`
    CREATE TABLE IF NOT EXISTS admin_users (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      email text UNIQUE NOT NULL,
      role text NOT NULL DEFAULT 'staff',
      status text NOT NULL DEFAULT 'pending',
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),
      last_login_at timestamptz,
      CONSTRAINT admin_users_role_check CHECK (role IN ('owner', 'staff')),
      CONSTRAINT admin_users_status_check CHECK (status IN ('pending', 'approved', 'rejected'))
    )
  `;
}
