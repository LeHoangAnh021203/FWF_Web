import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter, SiteHeader } from "@/app/site-chrome";
import { getPublishedNewsBySlug, getRelatedPublishedNews } from "@/lib/news-store";
import { NewsArticleView } from "./news-article-view";

export const revalidate = 60;

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
  const [article, related] = await Promise.all([
    getPublishedNewsBySlug(slug, "vi"),
    getRelatedPublishedNews(slug, "vi", 2),
  ]);
  if (!article) notFound();

  return (
    <main className="min-h-screen bg-white text-[#171412]">
      <SiteHeader />
      <NewsArticleView slug={slug} initialArticle={article} initialRelated={related} />
      <SiteFooter />
    </main>
  );
}
