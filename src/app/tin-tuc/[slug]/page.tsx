import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  foxNewsItems,
  getFoxNewsItemBySlug,
} from "@/components/b2b/home-data";
import { SiteFooter, SiteHeader } from "@/app/site-chrome";
import { NewsArticleView } from "./news-article-view";

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return foxNewsItems.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getFoxNewsItemBySlug(slug);

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
  const article = getFoxNewsItemBySlug(slug);

  if (!article?.article) notFound();

  return (
    <main className="min-h-screen bg-white text-[#171412]">
      <SiteHeader />
      <NewsArticleView slug={slug} />
      <SiteFooter />
    </main>
  );
}
