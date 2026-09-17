"use client";

import { NewsCardTrack } from "@/components/news-card-track";
import { useLanguage } from "@/i18n/language-context";
import { usePublishedNews } from "@/lib/use-published-news";

export function FoxNewsSection() {
  const { language, t } = useLanguage();
  const { items } = usePublishedNews(language);

  return (
    <section
      id="fox-news"
      className="overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,196,112,0.18),transparent_26%),linear-gradient(180deg,#ffffff_0%,#fffaf3_52%,#ffffff_100%)] py-14 md:py-16"
    >
      <div className="page-wide-shell">
        <NewsCardTrack items={items} badge={t("b2b.news.badge")} adLabel={t("home.news.adLabel")}>
          <p className="page-section-lead mb-3 font-bold uppercase text-orange-400">
            {t("b2b.news.update")}
          </p>
          <h2 className="page-section-title text-orange-500">
            <span className="bg-gradient-to-r from-[#ff6a3d] via-[#ff8a24] to-[#ffca43] bg-clip-text text-transparent">
              Fox News
            </span>
          </h2>
        </NewsCardTrack>
      </div>
    </section>
  );
}
