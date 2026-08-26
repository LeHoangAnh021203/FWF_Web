import type { SiteLanguage } from "@/i18n/dictionaries";

import {
  type ArticleBlock,
  foxNewsSources,
} from "@/components/b2b/fox-news-locales";

export type { ArticleBlock };

export type CaseStudy = {
  id: "cash" | "gift" | "swat";
  eyebrow: string;
  eyebrowClassName: string;
  iconClassName: string;
  dialogBorderClassName: string;
  image: string;
  previewImages?: string[];
  voucherImages?: string[];
  tagCount: number;
  detailCount: number;
};

export type FoxNewsItem = {
  slug: string;
  date: string;
  title: string;
  image: string;
  excerpt?: string;
  href?: string;
  article?: {
    intro?: string;
    lead?: string;
    paragraphs: ArticleBlock[];
    bullets?: string[];
    quote?: string;
    cta?: string;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    id: "cash",
    eyebrow: "FOX CASH",
    eyebrowClassName: "border-lime-300 text-lime-500",
    iconClassName: "text-lime-500",
    dialogBorderClassName: "border-lime-300",
    image: "/Fox Swat/fx3.webp",
    tagCount: 3,
    detailCount: 2,
    voucherImages: [
      "/voucher/voucher 1.png",
      "/voucher/voucher 2.png",
      "/voucher/voucher 3.png",
      "/voucher/voucher 4.png",
      "/voucher/voucher 5.png",
      "/voucher/voucher 6.png",
    ],
  },
  {
    id: "gift",
    eyebrow: "FOX GIFT CARD",
    eyebrowClassName: "border-sky-300 text-sky-500",
    iconClassName: "text-sky-500",
    dialogBorderClassName: "border-sky-300",
    image: "/voucher/voucher 7.png",
    previewImages: [
      "/voucher/voucher 7.png",
      "/voucher/voucher 8.jpg",
      "/voucher/voucher 9.jpg",
    ],
    tagCount: 3,
    detailCount: 2,
    voucherImages: [
      "/voucher/voucher 7.png",
      "/voucher/voucher 8.jpg",
      "/voucher/voucher 9.jpg",
    ],
  },
  {
    id: "swat",
    eyebrow: "FOX SWAT",
    eyebrowClassName: "border-orange-300 text-orange-500",
    iconClassName: "text-orange-500",
    dialogBorderClassName: "border-orange-300",
    image: "/Fox Swat/fx3-office.webp",
    tagCount: 2,
    detailCount: 3,
  },
];

export const faqItems = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
] as const;

export function getLocalizedFoxNews(language: SiteLanguage): FoxNewsItem[] {
  return foxNewsSources.map((source) => {
    const locale =
      source.locales[language] ?? source.locales.en ?? source.locales.vi;
    return {
      slug: source.slug,
      date: source.date,
      image: source.image,
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
  });
}

/** Vietnamese default — used for static params / SEO fallback. */
export const foxNewsItems: FoxNewsItem[] = getLocalizedFoxNews("vi");

export function getFoxNewsItemBySlug(
  slug: string,
  language: SiteLanguage = "vi",
) {
  return getLocalizedFoxNews(language).find((item) => item.slug === slug);
}
