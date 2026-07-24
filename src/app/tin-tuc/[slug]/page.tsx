import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  foxNewsItems,
  getFoxNewsItemBySlug,
} from "@/components/b2b/home-data";
import { SiteFooter, SiteHeader } from "@/app/site-chrome";

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

  const { article: content } = article;
  const related = foxNewsItems
    .filter((item) => item.slug !== article.slug)
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-white text-[#171412]">
      <SiteHeader />

      <div className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-28 sm:px-6 md:px-8 md:pb-24 md:pt-32">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] font-medium text-[#9ca3af] md:mb-10 md:text-base"
        >
          <Link href="/" className="transition-colors hover:text-[#ff6a3d]">
            Trang chủ
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/#news" className="transition-colors hover:text-[#ff6a3d]">
            Tin tức
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#ff6a3d]">{article.title}</span>
        </nav>

        <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] xl:gap-12">
          <article className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <time className="text-base font-medium text-[#9ca3af] md:text-lg">
                {article.date}
              </time>
              <span className="inline-flex min-w-[92px] items-center justify-center rounded-full border border-[#f0c437] bg-[repeating-linear-gradient(45deg,rgba(240,196,55,0.18)_0,rgba(240,196,55,0.18)_11px,rgba(255,220,90,0.42)_11px,rgba(255,220,90,0.42)_22px)] px-5 py-1 text-[15px] font-medium italic text-black">
                Mới
              </span>
            </div>

            <h1 className="max-w-[22ch] text-[1.85rem] font-semibold leading-[1.18] text-[#111827] sm:text-[2.25rem] md:text-[2.85rem]">
              {article.title}
            </h1>

            {content.intro ? (
              <p className="mt-6 max-w-[48rem] text-lg font-semibold leading-snug text-[#ff6a3d] md:mt-8 md:text-[1.35rem]">
                {content.intro}
              </p>
            ) : null}

            {content.lead ? (
              <p className="mt-4 text-base leading-relaxed text-[#4b5563] md:text-lg md:leading-8">
                {content.lead}
              </p>
            ) : null}

            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[28px] bg-[#fff7ed] md:mt-10 md:rounded-[36px]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 920px"
                className="object-cover"
              />
            </div>

            <div className="mt-8 space-y-6 text-base leading-relaxed text-[#374151] md:mt-10 md:space-y-7 md:text-lg md:leading-8">
              {content.paragraphs.map((block, index) =>
                block.type === "image" ? (
                  <div
                    key={`${block.src}-${index}`}
                    className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-[#fff7ed] md:rounded-[36px]"
                  >
                    <Image
                      src={block.src}
                      alt={block.alt}
                      fill
                      sizes="(max-width: 1280px) 100vw, 920px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <p key={`${block.content.slice(0, 24)}-${index}`}>
                    {block.content}
                  </p>
                ),
              )}

              {content.bullets?.length ? (
                <ul className="space-y-3 pl-5">
                  {content.bullets.map((item) => (
                    <li key={item} className="list-disc marker:text-[#ff6a3d]">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}

              {content.quote ? (
                <blockquote className="border-l-4 border-[#ff6a3d] bg-[#fff7ed] px-5 py-4 text-[1.05rem] font-medium italic leading-relaxed text-[#1f2937] md:px-6 md:py-5 md:text-xl">
                  {content.quote}
                </blockquote>
              ) : null}

              {content.cta ? (
                <p className="font-semibold text-[#111827]">{content.cta}</p>
              ) : null}
            </div>
          </article>

          {related.length ? (
            <aside className="xl:sticky xl:top-28">
              <div className="rounded-[32px] bg-[#f5f5f5] p-6 sm:p-7 md:rounded-[40px] md:p-8">
                <h2 className="mb-6 text-xl font-semibold text-[#111827] md:mb-8 md:text-[1.5rem]">
                  Bài viết gần đây
                </h2>

                <div className="grid gap-7">
                  {related.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/tin-tuc/${item.slug}`}
                      className="group flex flex-col transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-white">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 1280px) 100vw, 360px"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-2.5">
                        <p className="text-sm font-medium text-[#9ca3af]">
                          {item.date}
                        </p>
                        <span className="inline-flex items-center justify-center rounded-full border border-[#f0c437] bg-[repeating-linear-gradient(45deg,rgba(240,196,55,0.18)_0,rgba(240,196,55,0.18)_11px,rgba(255,220,90,0.42)_11px,rgba(255,220,90,0.42)_22px)] px-3.5 py-0.5 text-sm font-medium italic text-black">
                          Mới
                        </span>
                      </div>

                      <h3 className="mt-2 text-base font-semibold leading-snug text-[#111827] group-hover:text-[#ff6a3d] md:text-lg">
                        {item.title}
                      </h3>

                      {item.excerpt ? (
                        <p className="mt-2 text-sm leading-relaxed text-[#6b7280] md:text-[15px]">
                          {item.excerpt}
                        </p>
                      ) : null}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          ) : null}
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
