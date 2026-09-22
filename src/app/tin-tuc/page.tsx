import type { Metadata } from "next";
import { Suspense } from "react";

import { SiteFooter, SiteHeader } from "../site-chrome";
import { getPublishedCategories, getPublishedNews } from "@/lib/news-store";
import NewsHub from "./news-hub";

/** Cache trang tin ~60s; admin lưu bài sẽ revalidatePath ngay. */
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Tin tức Face Wash Fox",
  description:
    "Tin tức Face Wash Fox chia theo 3 chủ đề: hoạt động sự kiện, kiến thức làm đẹp và chương trình khuyến mãi.",
  alternates: {
    canonical: "https://facewashfox.com/tin-tuc",
  },
};

export default async function TinTucPage() {
  const [initialItems, initialCategories] = await Promise.all([
    getPublishedNews("vi"),
    getPublishedCategories("vi"),
  ]);

  return (
    <main className="news-hub-page min-h-screen bg-[#fff8f1] text-[#171412]">
      <SiteHeader />
      <Suspense fallback={<div className="news-hub-banner" style={{ minHeight: 180 }} />}>
        <NewsHub initialItems={initialItems} initialCategories={initialCategories} />
      </Suspense>
      <SiteFooter />
    </main>
  );
}
