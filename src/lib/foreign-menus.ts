export const FOREIGN_MENU_LANGS = ["zh", "ja", "ko", "hi", "ru"] as const;

export type ForeignMenuLang = (typeof FOREIGN_MENU_LANGS)[number];

export const foreignMenus: Record<
  ForeignMenuLang,
  { file: string; label: string; native: string; flagSrc: string }
> = {
  zh: { file: "zh.pdf", label: "中文", native: "中文", flagSrc: "/flags/cn.svg" },
  ja: { file: "ja.pdf", label: "日本語", native: "日本語", flagSrc: "/flags/jp.svg" },
  ko: { file: "ko.pdf", label: "한국어", native: "한국어", flagSrc: "/flags/kr.svg" },
  hi: { file: "hi.pdf", label: "हिन्दी", native: "हिन्दी", flagSrc: "/flags/in.svg" },
  ru: { file: "ru.pdf", label: "Русский", native: "Русский", flagSrc: "/flags/ru.svg" },
};

export function isForeignMenuLang(value: string | null | undefined): value is ForeignMenuLang {
  return Boolean(value && value in foreignMenus);
}

export function parseForeignMenuLang(
  query: string | null,
  acceptLanguage: string | null,
): ForeignMenuLang | null {
  if (isForeignMenuLang(query)) return query;

  if (!acceptLanguage) return null;

  for (const part of acceptLanguage.split(",")) {
    const tag = part.split(";")[0]?.trim().toLowerCase() ?? "";
    if (tag.startsWith("zh")) return "zh";
    if (tag.startsWith("ja")) return "ja";
    if (tag.startsWith("ko")) return "ko";
    if (tag.startsWith("hi")) return "hi";
    if (tag.startsWith("ru")) return "ru";
  }

  return null;
}
