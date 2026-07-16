/* eslint-disable @next/next/no-img-element */

import { ArrowRight } from "lucide-react";
import Link from "next/link";

type NewsPost = {
  slug: string;
  category: string;
  date: string;
  title: string;
  image: string;
};

type NewsShowcaseProps = {
  posts: NewsPost[];
};

export default function NewsShowcase({ posts }: NewsShowcaseProps) {
  return (
    <section id="news" className="news-section news-showcase-section">
      <div className="news-showcase-shell">
        <aside className="news-showcase-heading">
          <span aria-hidden="true">=</span>
          <h2>Tin tức mới nhất</h2>
          <p>
            Những thông tin mới nhất về các chương trình khuyến mãi và các sự
            kiện nổi bật của Face Wash Fox.
          </p>
        </aside>

        <div className="news-card-track">
          {posts.map((post) => (
            <article className="news-feature-card" key={post.title}>
              <Link className="news-feature-image" href={`/tin-tuc/${post.slug}`}>
                <img src={post.image} alt="" />
              </Link>

              <div className="news-feature-body">
                <time>{post.date}</time>
                <h3 title={post.title}>
                  <Link href={`/tin-tuc/${post.slug}`}>{post.title}</Link>
                </h3>
                <Link className="news-feature-link" href={`/tin-tuc/${post.slug}`}>
                  <span aria-hidden="true">
                    <ArrowRight />
                  </span>
                  Xem thêm
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
