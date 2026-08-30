"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

export type NewsCard = {
  slug: string;
  date: string;
  title: string;
  image: string;
};

type NewsCardTrackProps = {
  items: NewsCard[];
  badge: string;
  children: ReactNode;
};

export function NewsCardTrack({ items, badge, children }: NewsCardTrackProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    startScroll: 0,
    moved: false,
    dragging: false,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

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
    scroller.addEventListener("scroll", updateNav, { passive: true });
    window.addEventListener("resize", updateNav);
    return () => {
      scroller.removeEventListener("scroll", updateNav);
      window.removeEventListener("resize", updateNav);
    };
  }, [items.length, updateNav]);

  const scrollByPage = useCallback((direction: -1 | 1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollBy({ left: direction * scroller.clientWidth, behavior: "smooth" });
  }, []);

  const navButtonClass = (enabled: boolean) =>
    `flex h-7 w-7 items-center justify-center rounded-full text-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition ${
      enabled ? "bg-[#ea5814] hover:bg-[#d14c0f]" : "cursor-default bg-[#c8c8c8]"
    }`;

  return (
    <div>
      <div className="mb-5 text-center md:mb-6">{children}</div>
      {items.length > 3 ? (
        <div className="mb-4 flex justify-end gap-1.5 md:mb-5">
          <button
            type="button"
            aria-label="Bài trước"
            disabled={!canPrev}
            onClick={() => scrollByPage(-1)}
            className={navButtonClass(canPrev)}
          >
            <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Bài sau"
            disabled={!canNext}
            onClick={() => scrollByPage(1)}
            className={navButtonClass(canNext)}
          >
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </div>
      ) : null}

      <div
        ref={scrollerRef}
        className="flex flex-nowrap cursor-grab touch-pan-x snap-x snap-mandatory gap-8 overflow-x-auto overflow-y-hidden pb-2 [scrollbar-width:none] active:cursor-grabbing [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden xl:gap-11"
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
          <Link
            key={item.slug}
            href={`/tin-tuc/${item.slug}`}
            draggable={false}
            onClick={(event) => {
              if (dragRef.current.moved) {
                event.preventDefault();
                dragRef.current.moved = false;
              }
            }}
            className="group flex w-[min(82vw,420px)] shrink-0 snap-start flex-col text-left transition-transform duration-300 hover:-translate-y-1 md:w-[calc((100%-2rem)/2)] xl:w-[calc((100%-5.5rem)/3)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 82vw, (max-width: 1280px) 50vw, 33vw"
                className="pointer-events-none object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>

            <div className="flex flex-1 flex-col pt-5">
              <div className="mb-4 flex min-h-[56px] flex-wrap items-center gap-3">
                <p className="text-[1.05rem] font-medium text-orange-400 md:text-[1.15rem]">
                  {item.date}
                </p>
                <span className="inline-flex min-w-[132px] items-center justify-center rounded-full border border-[#f0c437] bg-[repeating-linear-gradient(45deg,rgba(240,196,55,0.18)_0,rgba(240,196,55,0.18)_11px,rgba(255,220,90,0.42)_11px,rgba(255,220,90,0.42)_22px)] px-7 py-1 text-[1.05rem] font-medium italic text-black md:text-[1.2rem]">
                  {badge}
                </span>
              </div>
              <h3 className="max-w-full text-2xl font-extrabold leading-[1.04] text-[#ff6a3d] md:min-h-[120px] md:text-[22px]">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
