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
      <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 md:px-10 xl:px-12">
        <NewsCardTrack items={items}>
          <h2 className="home-section-title">Fox News</h2>
        </NewsCardTrack>
      </div>
    </section>
  );
}
