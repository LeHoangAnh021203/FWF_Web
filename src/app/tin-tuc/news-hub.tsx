"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";

import { getLocalizedFoxNews, type FoxNewsItem } from "@/components/b2b/home-data";
import {
  NEWS_CATEGORIES,
  type NewsCategoryId,
} from "@/data/news-categories";
import { useLanguage } from "@/i18n/language-context";

function NewsCard({
  item,
  adLabel,
  categoryLabel,
  onNavigate,
}: {
  item: FoxNewsItem;
  adLabel: string;
  categoryLabel: string;
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <Link
      href={`/tin-tuc/${item.slug}`}
      draggable={false}
      onClick={onNavigate}
      className="news-hub-card group"
    >
      <div className="news-hub-card-media">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 82vw, 33vw"
          className="pointer-events-none object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        {item.sponsored ? <span className="news-hub-card-ad">{adLabel}</span> : null}
      </div>
      <div className="news-hub-card-body">
        <span className="news-hub-card-cat">{categoryLabel}</span>
        <time dateTime={item.date}>{item.date}</time>
        <h3>{item.title}</h3>
        {item.excerpt ? <p>{item.excerpt}</p> : null}
      </div>
    </Link>
  );
}

function CategoryTrack({
  items,
  title,
  adLabel,
  prevLabel,
  nextLabel,
}: {
  items: FoxNewsItem[];
  title: string;
  adLabel: string;
  prevLabel: string;
  nextLabel: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    startScroll: 0,
    moved: false,
    dragging: false,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(items.length > 3);
  const showNav = items.length > 3;

  const updateNav = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    setCanPrev(scroller.scrollLeft > 12);
    setCanNext(maxScroll > 12 && scroller.scrollLeft < maxScroll - 12);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    updateNav();
    const frame = window.requestAnimationFrame(updateNav);
    scroller.addEventListener("scroll", updateNav, { passive: true });
    window.addEventListener("resize", updateNav);

    const resizeObserver = new ResizeObserver(() => updateNav());
    resizeObserver.observe(scroller);
    for (const child of scroller.children) {
      resizeObserver.observe(child);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", updateNav);
      window.removeEventListener("resize", updateNav);
      resizeObserver.disconnect();
    };
  }, [items.length, updateNav]);

  const scrollByPage = useCallback((direction: -1 | 1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>(".news-hub-card");
    const step = card ? card.offsetWidth + 36 : scroller.clientWidth * 0.8;
    scroller.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  return (
    <div className="news-hub-track-wrap">
      {showNav ? (
        <div className="news-hub-track-nav">
          <button
            type="button"
            aria-label={prevLabel}
            disabled={!canPrev}
            onClick={() => scrollByPage(-1)}
            className={canPrev ? "is-enabled" : undefined}
          >
            <ChevronLeft aria-hidden="true" strokeWidth={2.4} />
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            disabled={!canNext}
            onClick={() => scrollByPage(1)}
            className={canNext ? "is-enabled" : undefined}
          >
            <ChevronRight aria-hidden="true" strokeWidth={2.4} />
          </button>
        </div>
      ) : null}

      <div
        ref={scrollerRef}
        className="news-hub-track"
        onPointerDown={(event) => {
          if (event.pointerType === "touch" || event.button !== 0) return;
          const scroller = scrollerRef.current;
          if (!scroller) return;
          dragRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startScroll: scroller.scrollLeft,
            moved: false,
            dragging: false,
          };
        }}
        onPointerMove={(event) => {
          const drag = dragRef.current;
          const scroller = scrollerRef.current;
          if (drag.pointerId !== event.pointerId || !scroller) return;
          const delta = event.clientX - drag.startX;
          if (!drag.dragging) {
            if (Math.abs(delta) < 10) return;
            drag.dragging = true;
            drag.moved = true;
            scroller.setPointerCapture(event.pointerId);
          }
          scroller.scrollLeft = drag.startScroll - delta;
        }}
        onPointerUp={(event) => {
          const drag = dragRef.current;
          const scroller = scrollerRef.current;
          if (drag.pointerId !== event.pointerId) return;
          if (drag.dragging) scroller?.releasePointerCapture(event.pointerId);
          else drag.moved = false;
          window.setTimeout(() => {
            dragRef.current = {
              pointerId: -1,
              startX: 0,
              startScroll: 0,
              moved: false,
              dragging: false,
            };
          }, 0);
        }}
        onPointerCancel={() => {
          dragRef.current = {
            pointerId: -1,
            startX: 0,
            startScroll: 0,
            moved: false,
            dragging: false,
          };
        }}
      >
        {items.map((item) => (
          <NewsCard
            key={item.slug}
            item={item}
            adLabel={adLabel}
            categoryLabel={title}
            onNavigate={(event) => {
              if (dragRef.current.moved) {
                event.preventDefault();
                dragRef.current.moved = false;
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

function CategorySection({
  id,
  title,
  items,
  adLabel,
  emptyLabel,
  countSuffix,
  prevLabel,
  nextLabel,
}: {
  id: NewsCategoryId;
  title: string;
  items: FoxNewsItem[];
  adLabel: string;
  emptyLabel: string;
  countSuffix: string;
  prevLabel: string;
  nextLabel: string;
}) {
  return (
    <section id={id} className="news-hub-category" aria-labelledby={`${id}-title`}>
      <div className="news-hub-section-head">
        <h2 id={`${id}-title`}>{title}</h2>
        <p>
          {items.length} {countSuffix}
        </p>
      </div>

      {items.length > 0 ? (
        <CategoryTrack
          items={items}
          title={title}
          adLabel={adLabel}
          prevLabel={prevLabel}
          nextLabel={nextLabel}
        />
      ) : (
        <p className="news-hub-empty">{emptyLabel}</p>
      )}
    </section>
  );
}

export default function NewsHub() {
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();
  const items = useMemo(() => getLocalizedFoxNews(language), [language]);

  const grouped = useMemo(() => {
    return NEWS_CATEGORIES.map((category) => ({
      ...category,
      title: t(category.labelKey),
      items: items.filter((item) => item.categoryId === category.id),
    }));
  }, [items, t]);

  useEffect(() => {
    const target = searchParams.get("danhMuc");
    if (!target) return;
    const el = document.getElementById(target);
    if (!el) return;
    const timer = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [searchParams]);

  return (
    <div className="news-hub">
      <h1 className="sr-only">{t("news.title")}</h1>
      <div className="news-hub-topics" aria-label={t("news.topicsLabel")}>
        <div className="news-hub-topics-inner">
          <p>{t("news.topicsLabel")}</p>
          <nav className="news-hub-topic-list">
            {NEWS_CATEGORIES.map((category) => (
              <a key={category.id} href={`#${category.id}`}>
                {t(category.labelKey)}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="news-hub-content">
        <div className="news-hub-content-inner">
          {grouped.map((category) => (
            <CategorySection
              key={category.id}
              id={category.id}
              title={category.title}
              items={category.items}
              adLabel={t("home.news.adLabel")}
              emptyLabel={t("news.empty")}
              countSuffix={t("news.countSuffix")}
              prevLabel="Bài trước"
              nextLabel="Bài sau"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
