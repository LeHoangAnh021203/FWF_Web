import type { SiteLanguage } from "@/i18n/dictionaries";

const DATE_LOCALES: Record<SiteLanguage, string> = {
  vi: "vi-VN",
  en: "en-GB",
  zh: "zh-CN",
  ja: "ja-JP",
  ko: "ko-KR",
  th: "th-TH-u-ca-gregory",
};

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

export function parseNewsDate(value: string): Date | null {
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (iso) {
    return new Date(Date.UTC(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]), 12));
  }

  const parsed = Date.parse(`${value} UTC`);
  if (Number.isNaN(parsed)) return null;
  return new Date(parsed);
}

export function toNewsDateIso(value: string): string {
  const date = parseNewsDate(value);
  if (!date) return value;
  return date.toISOString().slice(0, 10);
}

export function formatNewsDate(value: string, language: SiteLanguage): string {
  const date = parseNewsDate(value);
  if (!date) return value;

  return new Intl.DateTimeFormat(DATE_LOCALES[language], DATE_FORMAT).format(date);
}
