import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter, SiteHeader } from "@/app/site-chrome";
import { getPublishedNews, getPublishedNewsBySlug } from "@/lib/news-store";
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
  const [article, allItems] = await Promise.all([
    getPublishedNewsBySlug(slug, "vi"),
    getPublishedNews("vi"),
  ]);
  if (!article) notFound();

  const related = allItems.filter((item) => item.slug !== slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-white text-[#171412]">
      <SiteHeader />
      <NewsArticleView slug={slug} initialArticle={article} initialRelated={related} />
      <SiteFooter />
    </main>
  );
}
