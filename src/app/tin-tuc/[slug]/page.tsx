import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter, SiteHeader } from "@/app/site-chrome";
import { getPublishedNewsBySlug, newsSlugExists } from "@/lib/news-store";
import { NewsArticleView } from "./news-article-view";

export const dynamic = "force-dynamic";

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedNewsBySlug(slug, "vi");

  if (!article) {
    return {
      title: "Tin tức Face Wash Fox",
    };
  }

  return {
    title: `${article.title} | Face Wash Fox`,
    description: article.excerpt ?? article.article?.intro ?? article.title,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const exists = await newsSlugExists(slug);
  if (!exists) notFound();

  return (
    <main className="min-h-screen bg-white text-[#171412]">
      <SiteHeader />
      <NewsArticleView slug={slug} />
      <SiteFooter />
    </main>
  );
}
