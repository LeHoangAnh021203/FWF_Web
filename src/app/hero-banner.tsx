"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { useLanguage } from "@/i18n/language-context";

const slides = [
  {
    id: 1,
    pc: "/banners/home/hero-01-pc.png?v=3",
    mobile: "/banners/home/hero-01-mobile.png?v=3",
    href: "https://cuahang.facewashfox.com/",
    tone: "light",
    wrap: "mobile",
    ctaStyle: "cream",
    titleKeys: ["home.hero.1.title1", "home.hero.1.title2"],
    subtitleKey: "home.hero.1.subtitle",
    ctaKey: "home.hero.1.cta",
    altKey: "home.hero.1.alt",
  },
  {
    id: 2,
    pc: "/banners/home/hero-02-pc.png?v=3",
    mobile: "/banners/home/hero-02-mobile.png?v=3",
    href: "/#dat-lich",
    tone: "light",
    mobileTone: "dark",
    wrap: "always",
    ctaStyle: "cream",
    mobileCtaStyle: "brown",
    titleKeys: ["home.hero.2.title1", "home.hero.2.title2"],
    subtitleKey: "home.hero.2.subtitle",
    ctaKey: "home.hero.2.cta",
    altKey: "home.hero.2.alt",
  },
  {
    id: 3,
    pc: "/banners/home/hero-03-pc.png?v=3",
    mobile: "/banners/home/hero-03-mobile.png?v=3",
    href: "/dich-vu",
    tone: "dark",
    wrap: "mobile",
    ctaStyle: "outline",
    titleKeys: ["home.hero.3.title1", "home.hero.3.title2"],
    subtitleKey: "home.hero.3.subtitle",
    ctaKey: "home.hero.3.cta",
    altKey: "home.hero.3.alt",
  },
  {
    id: 4,
    pc: "/banners/home/hero-04-pc.png?v=3",
    mobile: "/banners/home/hero-04-mobile.png?v=3",
    href: "/bang-gia-the-foxie-update-thang-08-2026",
    tone: "dark",
    wrap: "mobile",
    ctaStyle: "brown",
    titleKeys: ["home.hero.4.title1", "home.hero.4.title2"],
    subtitleKey: "home.hero.4.subtitle",
    ctaKey: "home.hero.4.cta",
    altKey: "home.hero.4.alt",
  },
] as const;

const AUTO_MS = 6000;
const SWIPE_PX = 40;

function isBannerControl(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(".hero-banner-dots"));
}

export default function HeroBanner() {
  const { t } = useLanguage();
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
      onTouchStart={(event) => {
        if (isBannerControl(event.target)) return;
        onPointerDown(event.touches[0]?.clientX ?? 0);
      }}
      onTouchEnd={(event) => {
        if (isBannerControl(event.target)) return;
        onPointerUp(event.changedTouches[0]?.clientX ?? 0);
      }}
      onMouseDown={(event) => {
        if (event.button !== 0 || isBannerControl(event.target)) return;
        onPointerDown(event.clientX);
      }}
      onMouseUp={(event) => {
        if (isBannerControl(event.target)) return;
        onPointerUp(event.clientX);
      }}
    >
      <div className="hero-banner-track" aria-live="polite">
        {slides.map((slide, slideIndex) => {
          const isActive = slideIndex === index;

          return (
            <Link
              key={slide.id}
              href={slide.href}
              className={`hero-banner-slide${isActive ? " is-active" : ""}`}
              data-banner={slide.id}
              data-tone={slide.tone}
              data-mobile-tone={"mobileTone" in slide ? slide.mobileTone : slide.tone}
              data-cta={slide.ctaStyle}
              data-mobile-cta={"mobileCtaStyle" in slide ? slide.mobileCtaStyle : slide.ctaStyle}
              data-wrap={slide.wrap}
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
                  alt={t(slide.altKey)}
                  width={1920}
                  height={884}
                  sizes="100vw"
                  fetchPriority={slideIndex === 0 ? "high" : "auto"}
                  decoding={slideIndex === 0 ? "sync" : "async"}
                  draggable={false}
                />
              </picture>
              <div className="hero-banner-copy">
                <h2 className="hero-banner-title">
                  {slide.titleKeys.map((key, lineIndex) => (
                    <span key={key}>
                      {lineIndex > 0 && slide.wrap === "mobile" ? " " : null}
                      {t(key)}
                    </span>
                  ))}
                </h2>
                <p className="hero-banner-subtitle">{t(slide.subtitleKey)}</p>
                <span className="hero-banner-cta">{t(slide.ctaKey)}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="hero-banner-dots" role="tablist" aria-label={t("home.hero.dots")}>
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={slideIndex === index}
            aria-label={`Banner ${slideIndex + 1}`}
            className={`hero-banner-dot${slideIndex === index ? " is-active" : ""}`}
            onPointerDown={(event) => event.stopPropagation()}
            onMouseDown={(event) => event.stopPropagation()}
            onMouseUp={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              goTo(slideIndex);
            }}
          />
        ))}
      </div>
    </div>
  );
}
