/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getNewsArticle, newsArticles } from "@/data/news";
import { SiteFooter, SiteHeader } from "@/app/site-chrome";

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);

  if (!article) {
    return {
      title: "Tin tức Face Wash Fox",
    };
  }

  return {
    title: `${article.title} | Face Wash Fox`,
    description: article.intro,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const article = getNewsArticle(slug);

  if (!article) notFound();

  return (
    <main className="news-detail-page">
      <SiteHeader />

      <article>
        <header className="news-detail-hero">
          <div className="news-detail-hero-image" aria-hidden="true">
            <img src={article.image} alt="" />
          </div>
          <div className="news-detail-hero-overlay" aria-hidden="true" />
          <div className="news-detail-hero-copy">
            <Link href="/#news">Tin tức</Link>
            <p>
              {article.category} · {article.date}
            </p>
            <h1>{article.title}</h1>
            <span>{article.intro}</span>
          </div>
        </header>

        <section className="news-detail-article">
          <img className="news-detail-mark" src="/logo/logo.png" alt="" />
          <div className="news-detail-divider" aria-hidden="true">
            <span />
            <i />
            <span />
          </div>
          <h2>{article.title}</h2>
          <div className="news-detail-divider" aria-hidden="true">
            <span />
            <i />
            <span />
          </div>

          <div className="news-detail-content">
            {article.sections.map((section, index) => (
              <section key={`${section.heading ?? "section"}-${index}`}>
                {section.heading ? <h3>{section.heading}</h3> : null}
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items ? (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {section.images?.length ? (
                  <div className="news-detail-inline-gallery">
                    {section.images.map((image, imageIndex) => (
                      <figure key={image}>
                        <img
                          src={image}
                          alt={`Hình ảnh minh họa ${index + 1}.${imageIndex + 1}`}
                        />
                      </figure>
                    ))}
                  </div>
                ) : null}
              </section>
            ))}
          </div>
        </section>

      </article>

      <SiteFooter />
    </main>
  );
}
