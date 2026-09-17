import type { SiteLanguage } from "@/i18n/dictionaries";

export type NewsCategoryId = string;

export type NewsCategoryLabels = Partial<Record<SiteLanguage, string>>;

export type NewsCategory = {
  id: string;
  sortOrder: number;
  labels: NewsCategoryLabels;
};

export const NEWS_CATEGORY_IDS = [
  "hoat-dong-su-kien",
  "kien-thuc-lam-dep",
  "chuong-trinh-khuyen-mai",
] as const;

export const DEFAULT_NEWS_CATEGORIES: NewsCategory[] = [
  {
    id: "hoat-dong-su-kien",
    sortOrder: 0,
    labels: {
      vi: "Hoạt động sự kiện",
      en: "Events & activities",
      zh: "活动与事件",
      ja: "イベント・活動",
      ko: "활동·이벤트",
      th: "กิจกรรมและอีเวนต์",
    },
  },
  {
    id: "kien-thuc-lam-dep",
    sortOrder: 1,
    labels: {
      vi: "Kiến thức làm đẹp",
      en: "Beauty knowledge",
      zh: "美肤知识",
      ja: "美容知識",
      ko: "뷰티 지식",
      th: "ความรู้ความงาม",
    },
  },
  {
    id: "chuong-trinh-khuyen-mai",
    sortOrder: 2,
    labels: {
      vi: "Chương trình khuyến mãi",
      en: "Promotions",
      zh: "促销活动",
      ja: "キャンペーン",
      ko: "프로모션",
      th: "โปรโมชัน",
    },
  },
];

/** Maps existing Fox News slugs into the 3 hub categories. */
const newsCategoryBySlug: Record<string, NewsCategoryId> = {
  "face-wash-fox-hanh-trinh-tu-y-tuong-den-thuong-hieu-tien-phong":
    "hoat-dong-su-kien",
  "face-wash-fox-va-hanh-trinh-kien-tao-van-hoa-doanh-nghiep":
    "hoat-dong-su-kien",
  "nhung-bac-thang-tao-nen-ky-tich-doi-ngu-sang-lap-face-wash-fox":
    "hoat-dong-su-kien",
  "bi-mat-bieu-tuong-logo-face-wash-fox": "hoat-dong-su-kien",
  "tiktoker-anh-mat-vuong-tro-thanh-dai-su-thuong-hieu-cua-face-wash-fox":
    "hoat-dong-su-kien",
  "mot-ngay-cua-anh-mat-vuong-tai-face-wash-fox-hau-truong":
    "hoat-dong-su-kien",
  "mot-ngay-cua-anh-mat-vuong-tai-face-wash-fox": "hoat-dong-su-kien",

  "nam-gioi-viet-cham-soc-da-dep-trai-khong-phai-chuyen-ngai-ngung":
    "kien-thuc-lam-dep",
  "face-wash-fox-tien-phong-trong-linh-vuc-cham-soc-da-cong-nghe-cao":
    "kien-thuc-lam-dep",
  "anh-mat-vuong-tung-khong-nghi-co-mot-ngay-minh-noi-ve-cham-da":
    "kien-thuc-lam-dep",

  "gift-voucher-da-sach-sau-rang-ro-ngay-tu-lan-dau":
    "chuong-trinh-khuyen-mai",
};

export function isNewsCategoryId(value: string | null | undefined): value is NewsCategoryId {
  return Boolean(value && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) && value.length <= 90);
}

export function getNewsCategoryId(slug: string): NewsCategoryId {
  return newsCategoryBySlug[slug] ?? "hoat-dong-su-kien";
}

export function getNewsCategory(id: NewsCategoryId): NewsCategory {
  return DEFAULT_NEWS_CATEGORIES.find((category) => category.id === id) ?? DEFAULT_NEWS_CATEGORIES[0];
}

export function categoryLabel(category: NewsCategory, language: SiteLanguage): string {
  return category.labels[language]?.trim() || category.labels.vi?.trim() || category.id;
}

/** @deprecated Use DEFAULT_NEWS_CATEGORIES. Kept for older imports. */
export const NEWS_CATEGORIES = DEFAULT_NEWS_CATEGORIES;
