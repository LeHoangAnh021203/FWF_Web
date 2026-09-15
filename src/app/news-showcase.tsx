"use client";

import { NewsCardTrack } from "@/components/news-card-track";

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
  const items = posts.slice(0, 10);

  return (
    <section
      id="news"
      className="home-news-section overflow-hidden bg-white"
    >
      <div className="page-wide-shell">
        <NewsCardTrack items={items}>
          <h2 className="home-section-title">Fox News</h2>
        </NewsCardTrack>
      </div>
    </section>
  );
}
