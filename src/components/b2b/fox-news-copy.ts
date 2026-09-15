import type { SiteLanguage } from "@/i18n/dictionaries";

export type ArticleBlock =
  | { type: "paragraph"; content: string }
  | { type: "image"; src: string; alt: string };

export type LocalizedNewsFields = {
  title: string;
  excerpt: string;
  intro: string;
  lead: string;
  paragraphs: ArticleBlock[];
  bullets: string[];
  quote: string;
  cta: string;
};

export type NewsCopy = {
  title: string;
  excerpt: string;
  intro: string;
  lead: string;
  cta: string;
  texts: string[];
  alts: string[];
};

export function applyNewsCopy(
  slug: string,
  vi: LocalizedNewsFields,
  copy: NewsCopy,
): LocalizedNewsFields {
  const paragraphCount = vi.paragraphs.filter((block) => block.type === "paragraph").length;
  const imageCount = vi.paragraphs.filter((block) => block.type === "image").length;

  if (copy.texts.length !== paragraphCount) {
    throw new Error(
      `[fox-news] ${slug}: expected ${paragraphCount} paragraph texts, got ${copy.texts.length}`,
    );
  }
  if (copy.alts.length !== imageCount) {
    throw new Error(
      `[fox-news] ${slug}: expected ${imageCount} image alts, got ${copy.alts.length}`,
    );
  }

  let textIndex = 0;
  let altIndex = 0;

  return {
    title: copy.title,
    excerpt: copy.excerpt,
    intro: copy.intro,
    lead: copy.lead,
    cta: copy.cta,
    quote: vi.quote,
    bullets: vi.bullets,
    paragraphs: vi.paragraphs.map((block) => {
      if (block.type === "paragraph") {
        return { type: "paragraph", content: copy.texts[textIndex++] };
      }
      return { type: "image", src: block.src, alt: copy.alts[altIndex++] };
    }),
  };
}

export function buildLocales(
  slug: string,
  vi: LocalizedNewsFields,
  translations: Partial<Record<Exclude<SiteLanguage, "vi">, NewsCopy>>,
): Record<SiteLanguage, LocalizedNewsFields> {
  const apply = (language: Exclude<SiteLanguage, "vi">) => {
    const copy = translations[language];
    return copy ? applyNewsCopy(`${slug}:${language}`, vi, copy) : vi;
  };

  return {
    vi,
    en: apply("en"),
    zh: apply("zh"),
    ja: apply("ja"),
    ko: apply("ko"),
    th: apply("th"),
  };
}
