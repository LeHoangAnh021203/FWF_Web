"use client";

import { useEffect } from "react";

export default function ScrollEffects() {
  useEffect(() => {
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>(
        [
          ".store-title",
          ".store-stats article",
          ".section-heading",
          ".service-carousel",
          ".model-card",
          ".story-copy",
          ".story-video",
          ".news-card",
          ".testimonial-card",
          ".commitment-section > p",
          ".commitment-section > h2",
          ".commitment-grid article",
          ".contact-section > div",
          ".mono-footer",
        ].join(","),
      ),
    );

    revealItems.forEach((item, index) => {
      item.classList.add("reveal-item");
      item.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12,
      },
    );

    revealItems.forEach((item) => observer.observe(item));

    const statNumbers = Array.from(
      document.querySelectorAll<HTMLElement>(".stat-number[data-count-to]"),
    );

    const animateNumber = (item: HTMLElement) => {
      const target = Number(item.dataset.countTo);
      const suffix = item.dataset.suffix ?? "";

      if (!Number.isFinite(target)) {
        return;
      }

      const duration = 1100;
      const startTime = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        item.textContent = `${Math.round(target * eased)}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      item.textContent = `0${suffix}`;
      requestAnimationFrame(tick);
    };

    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateNumber(entry.target as HTMLElement);
            statObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -14% 0px",
        threshold: 0.45,
      },
    );

    statNumbers.forEach((item) => statObserver.observe(item));

    let scrollFrame: number | null = null;

    const updateScrollState = () => {
      scrollFrame = null;
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      document.documentElement.style.setProperty("--hero-progress", String(progress));
      document.body.classList.toggle("has-scrolled", window.scrollY > 24);
    };

    const scheduleScrollState = () => {
      if (scrollFrame !== null) return;
      scrollFrame = requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", scheduleScrollState, { passive: true });

    return () => {
      observer.disconnect();
      statObserver.disconnect();
      window.removeEventListener("scroll", scheduleScrollState);
      if (scrollFrame !== null) {
        cancelAnimationFrame(scrollFrame);
      }
      document.documentElement.style.removeProperty("--hero-progress");
      document.body.classList.remove("has-scrolled");
    };
  }, []);

  return null;
}
