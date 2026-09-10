"use client";

import { NewsCardTrack } from "@/components/news-card-track";
import { useLanguage } from "@/i18n/language-context";

type NewsPost = {
  slug: string;
  date: string;
  title: string;
  image: string;
};

type NewsShowcaseProps = {
  posts: NewsPost[];
};

export default function NewsShowcase({ posts }: NewsShowcaseProps) {
  const { t } = useLanguage();
  const items = posts.slice(0, 10);

  return (
    <section
      id="news"
      className="overflow-hidden bg-white py-10 md:py-12"
    >
      <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 md:px-10 xl:px-12">
        <NewsCardTrack items={items} badge={t("home.news.badge")} adLabel={t("home.news.adLabel")}>
          <p className="mb-1 text-sm font-extrabold uppercase tracking-wide text-[var(--brand-orange-deep)] md:text-base">
            {t("home.news.update")}
          </p>
          <h2 className="home-section-title">Fox news</h2>
        </NewsCardTrack>
      </div>
    </section>
  );
}
