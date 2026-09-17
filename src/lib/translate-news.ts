import type { ArticleBlock, LocalizedNewsFields } from "@/components/b2b/fox-news-copy";
import type { SiteLanguage } from "@/i18n/dictionaries";

const TARGET_LANGUAGES: Array<Exclude<SiteLanguage, "vi">> = ["en", "zh", "ja", "ko", "th"];

const LANGUAGE_LABELS: Record<Exclude<SiteLanguage, "vi">, string> = {
  en: "English",
  zh: "Simplified Chinese",
  ja: "Japanese",
  ko: "Korean",
  th: "Thai",
};

function extractJsonObject(text: string): string {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Translation response was not JSON");
  }
  return text.slice(start, end + 1);
}

function sanitizeTranslated(
  original: LocalizedNewsFields,
  translated: LocalizedNewsFields,
): LocalizedNewsFields {
  const paragraphs: ArticleBlock[] = original.paragraphs.map((block, index) => {
    const next = translated.paragraphs[index];
    if (block.type === "image") {
      return {
        type: "image",
        src: block.src,
        alt: next?.type === "image" ? next.alt || block.alt : block.alt,
      };
    }
    return {
      type: "paragraph",
      content: next?.type === "paragraph" ? next.content : block.content,
    };
  });

  return {
    title: translated.title || original.title,
    excerpt: translated.excerpt || original.excerpt,
    intro: translated.intro || original.intro,
    lead: translated.lead || original.lead,
    paragraphs,
    bullets: original.bullets.map((item, index) => translated.bullets[index] || item),
    quote: translated.quote || original.quote,
    cta: translated.cta || original.cta,
  };
}

export async function translateNewsFields(
  vi: LocalizedNewsFields,
  language: Exclude<SiteLanguage, "vi">,
): Promise<LocalizedNewsFields> {
  const apiKey = process.env.TRANSLATE_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("TRANSLATE_API_KEY is not set");
  }

  const base = (process.env.TRANSLATE_API_BASE || "https://api.openai.com/v1").replace(/\/$/, "");
  const model = process.env.TRANSLATE_MODEL || "gpt-4o-mini";

  const response = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "You translate Face Wash Fox marketing blog posts. Keep brand names, store names, URLs, prices, and image src values unchanged. Translate image alt text. Reply with a single JSON object using keys title, excerpt, intro, lead, paragraphs, bullets, quote, cta.",
        },
        {
          role: "user",
          content: `Translate this Vietnamese article into ${LANGUAGE_LABELS[language]}. Keep the paragraphs array the same length and the same block types (paragraph | image).\n\n${JSON.stringify(vi)}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Translation API failed (${response.status}): ${detail.slice(0, 400)}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Translation API returned an empty response");

  const parsed = JSON.parse(extractJsonObject(content)) as LocalizedNewsFields;
  return sanitizeTranslated(vi, parsed);
}

export function translationTargets(): Array<Exclude<SiteLanguage, "vi">> {
  return TARGET_LANGUAGES;
}

export async function translateShortLabel(
  vi: string,
  language: Exclude<SiteLanguage, "vi">,
): Promise<string> {
  const apiKey = process.env.TRANSLATE_API_KEY?.trim();
  if (!apiKey) return vi;

  const base = (process.env.TRANSLATE_API_BASE || "https://api.openai.com/v1").replace(/\/$/, "");
  const model = process.env.TRANSLATE_MODEL || "gpt-4o-mini";

  const response = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.1,
      messages: [
        {
          role: "system",
          content:
            "You translate short Face Wash Fox website category names. Reply with the translated phrase only, no quotes.",
        },
        {
          role: "user",
          content: `Translate this Vietnamese category name into ${LANGUAGE_LABELS[language]}:\n${vi}`,
        },
      ],
    }),
  });

  if (!response.ok) return vi;
  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content?.trim();
  return content || vi;
}

export async function translateCategoryLabels(
  vi: string,
): Promise<Record<SiteLanguage, string>> {
  const labels = { vi, en: vi, zh: vi, ja: vi, ko: vi, th: vi } as Record<SiteLanguage, string>;
  await Promise.all(
    TARGET_LANGUAGES.map(async (language) => {
      labels[language] = await translateShortLabel(vi, language);
    }),
  );
  return labels;
}
