export const NEWS_CATEGORY_IDS = [
  "hoat-dong-su-kien",
  "kien-thuc-lam-dep",
  "chuong-trinh-khuyen-mai",
] as const;

export type NewsCategoryId = (typeof NEWS_CATEGORY_IDS)[number];

export type NewsCategory = {
  id: NewsCategoryId;
  labelKey: string;
};

export const NEWS_CATEGORIES: NewsCategory[] = [
  { id: "hoat-dong-su-kien", labelKey: "news.cat.events" },
  { id: "kien-thuc-lam-dep", labelKey: "news.cat.beauty" },
  { id: "chuong-trinh-khuyen-mai", labelKey: "news.cat.promo" },
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
  return NEWS_CATEGORY_IDS.includes(value as NewsCategoryId);
}

export function getNewsCategoryId(slug: string): NewsCategoryId {
  return newsCategoryBySlug[slug] ?? "hoat-dong-su-kien";
}

export function getNewsCategory(id: NewsCategoryId): NewsCategory {
  return NEWS_CATEGORIES.find((category) => category.id === id) ?? NEWS_CATEGORIES[0];
}
