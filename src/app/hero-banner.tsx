"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const slides = [
  {
    id: 1,
    pc: "/banners/home/banner-01-pc.png",
    mobile: "/banners/home/banner-01-mobile.png",
    href: "/cua-hang",
    alt: "Rửa mặt công nghệ — Tìm chi nhánh Face Wash Fox",
  },
  {
    id: 2,
    pc: "/banners/home/banner-02-pc.png",
    mobile: "/banners/home/banner-02-mobile.png",
    href: "/#dat-lich",
    alt: "Mỗi làn da một phác đồ riêng — Đặt lịch soi da",
  },
  {
    id: 3,
    pc: "/banners/home/banner-03-pc.png",
    mobile: "/banners/home/banner-03-mobile.png",
    href: "/dich-vu",
    alt: "Không chỉ là rửa mặt — Xem quy trình chuẩn hóa",
  },
  {
    id: 4,
    pc: "/banners/home/banner-04-pc.png",
    mobile: "/banners/home/banner-04-mobile.png",
    href: "/bang-gia-the-foxie-update-thang-08-2026",
    alt: "Giá niêm yết rõ ràng — Xem bảng giá",
  },
] as const;

const AUTO_MS = 2000;
const SWIPE_PX = 40;

export default function HeroBanner() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pointerStartX = useRef<number | null>(null);
  const swipedRef = useRef(false);

  const goTo = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  const goNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const goPrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(goNext, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [paused, goNext]);

  const onPointerDown = (clientX: number) => {
    pointerStartX.current = clientX;
    swipedRef.current = false;
    setPaused(true);
  };

  const onPointerUp = (clientX: number) => {
    if (pointerStartX.current === null) return;

    const delta = clientX - pointerStartX.current;
    pointerStartX.current = null;

    if (Math.abs(delta) >= SWIPE_PX) {
      swipedRef.current = true;
      if (delta < 0) goNext();
      else goPrev();
    }

    window.setTimeout(() => setPaused(false), AUTO_MS);
  };

  return (
    <div
      className="hero-frame hero-banner"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
      onTouchStart={(event) => onPointerDown(event.touches[0]?.clientX ?? 0)}
      onTouchEnd={(event) => onPointerUp(event.changedTouches[0]?.clientX ?? 0)}
      onMouseDown={(event) => {
        if (event.button === 0) onPointerDown(event.clientX);
      }}
      onMouseUp={(event) => onPointerUp(event.clientX)}
    >
      <div className="hero-banner-track" aria-live="polite">
        {slides.map((slide, slideIndex) => {
          const isActive = slideIndex === index;

          return (
            <Link
              key={slide.id}
              href={slide.href}
              className={`hero-banner-slide${isActive ? " is-active" : ""}`}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              draggable={false}
              onClick={(event) => {
                if (swipedRef.current) {
                  event.preventDefault();
                  swipedRef.current = false;
                }
              }}
            >
              <picture>
                <source media="(max-width: 768px)" srcSet={slide.mobile} />
                <img
                  className="hero-banner-image"
                  src={slide.pc}
                  alt={slide.alt}
                  width={1400}
                  height={645}
                  fetchPriority={slideIndex === 0 ? "high" : "auto"}
                  decoding={slideIndex === 0 ? "sync" : "async"}
                  draggable={false}
                />
              </picture>
            </Link>
          );
        })}
      </div>

      <div className="hero-banner-dots" role="tablist" aria-label="Hero banners">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={slideIndex === index}
            aria-label={`Banner ${slideIndex + 1}`}
            className={`hero-banner-dot${slideIndex === index ? " is-active" : ""}`}
            onClick={() => goTo(slideIndex)}
          />
        ))}
      </div>
    </div>
  );
}
