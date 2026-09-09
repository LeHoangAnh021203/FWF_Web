import type { Metadata } from "next";
import { Suspense } from "react";

import { SiteFooter, SiteHeader } from "../site-chrome";
import NewsHub from "./news-hub";

export const metadata: Metadata = {
  title: "Tin tức Face Wash Fox",
  description:
    "Tin tức Face Wash Fox chia theo 3 chủ đề: hoạt động sự kiện, kiến thức làm đẹp và chương trình khuyến mãi.",
  alternates: {
    canonical: "https://facewashfox.com/tin-tuc",
  },
};

export default function TinTucPage() {
  return (
    <main className="news-hub-page min-h-screen bg-[#fff8f1] text-[#171412]">
      <SiteHeader />
      <Suspense fallback={<div className="news-hub-banner" style={{ minHeight: 180 }} />}>
        <NewsHub />
      </Suspense>
      <SiteFooter />
    </main>
  );
}
