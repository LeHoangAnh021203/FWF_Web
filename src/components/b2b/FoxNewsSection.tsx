"use client";

import { getLocalizedFoxNews } from "@/components/b2b/home-data";
import { NewsCardTrack } from "@/components/news-card-track";
import { useLanguage } from "@/i18n/language-context";

export function FoxNewsSection() {
  const { language, t } = useLanguage();
  const items = getLocalizedFoxNews(language);

  return (
    <section
      id="fox-news"
      className="overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,196,112,0.18),transparent_26%),linear-gradient(180deg,#ffffff_0%,#fffaf3_52%,#ffffff_100%)] py-20 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 md:px-10 xl:px-12">
        <NewsCardTrack items={items} badge={t("b2b.news.badge")}>
          <p className="mb-3 text-xl font-medium uppercase text-orange-400 md:text-[2rem]">
            {t("b2b.news.update")}
          </p>
          <h2 className="text-3xl font-extrabold text-orange-500 drop-shadow-[0_5px_16px_rgba(249,115,22,0.18)] md:bg-gradient-to-b md:from-[#ffb15f] md:via-orange-500 md:to-[#f97316] md:bg-clip-text md:text-5xl md:text-transparent">
            <span className="bg-gradient-to-r from-[#ff6a3d] via-[#ff8a24] to-[#ffca43] bg-clip-text text-transparent">
              Fox news
            </span>
          </h2>
        </NewsCardTrack>
      </div>
    </section>
  );
}
