"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";

import { useLanguage } from "@/i18n/language-context";

type City = {
  name: string;
  text: string;
  image?: string;
  imageAlt?: string;
};

type Point = { x: number; y: number };

function buildCurvedPath(
  points: Point[],
  options?: { maxBulge?: number; minBulge?: number },
) {
  if (points.length < 2) return "";

  const maxBulge = options?.maxBulge ?? 88;
  const minBulge = options?.minBulge ?? 48;
  let d = `M ${points[0].x} ${points[0].y}`;

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const midY = (previous.y + current.y) / 2;
    const distanceY = Math.abs(current.y - previous.y);
    const bulge =
      (index % 2 === 0 ? 1 : -1) *
      Math.min(maxBulge, Math.max(minBulge, distanceY * 0.28));

    d += ` C ${previous.x + bulge} ${midY}, ${current.x + bulge} ${midY}, ${current.x} ${current.y}`;
  }

  return d;
}

export default function CityTimeline({ cities }: { cities: readonly City[] }) {
  const { t } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);
  const [pathD, setPathD] = useState("");
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const [visibleIds, setVisibleIds] = useState<Record<string, boolean>>({});
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let pathDrawFrame: number | null = null;

    const updatePathDraw = () => {
      pathDrawFrame = null;
      const rect = root.getBoundingClientRect();
      const viewHeight = window.innerHeight || 1;
      const start = viewHeight * 0.88;
      const end = viewHeight * 0.12;
      const progress = Math.min(
        1,
        Math.max(0, (start - rect.top) / (rect.height + start - end)),
      );
      const eased = 1 - Math.pow(1 - progress, 1.55);
      root.style.setProperty("--timeline-draw", `${(eased * 100).toFixed(2)}%`);
    };

    const schedulePathDraw = () => {
      if (pathDrawFrame !== null) return;
      pathDrawFrame = requestAnimationFrame(updatePathDraw);
    };

    const updateCurve = () => {
      const markers = Array.from(
        root.querySelectorAll<HTMLElement>(".city-timeline-marker"),
      );
      if (markers.length < 2) return;

      const rootRect = root.getBoundingClientRect();
      const width = Math.max(Math.round(rootRect.width), 1);
      const height = Math.max(Math.round(rootRect.height), 1);
      const isCompact = width < 720;
      const maxBulge = isCompact ? 28 : 88;
      const minBulge = isCompact ? 16 : 48;

      const points = markers.map((marker) => {
        const rect = marker.getBoundingClientRect();
        return {
          x: rect.left - rootRect.left + rect.width / 2,
          y: rect.top - rootRect.top + rect.height / 2,
        };
      });

      const leadIn = {
        x: points[0].x,
        y: Math.max(8, points[0].y - 28),
      };
      const leadOut = {
        x: points[points.length - 1].x,
        y: Math.min(height - 8, points[points.length - 1].y + 40),
      };

      setSvgSize({ width, height });
      setPathD(
        buildCurvedPath([leadIn, ...points, leadOut], { maxBulge, minBulge }),
      );
      updatePathDraw();
    };

    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target as HTMLElement;
          const cityName = target.dataset.city;
          if (cityName) {
            setVisibleIds((current) =>
              current[cityName] ? current : { ...current, [cityName]: true },
            );
          }
          if (target.classList.contains("city-timeline-cta")) {
            setCtaVisible(true);
          }

          itemObserver.unobserve(target);
          requestAnimationFrame(updateCurve);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.2,
      },
    );

    root
      .querySelectorAll<HTMLElement>(".city-timeline-item, .city-timeline-cta")
      .forEach((item) => itemObserver.observe(item));

    const frame = requestAnimationFrame(updateCurve);
    const delayed = window.setTimeout(updateCurve, 160);
    updatePathDraw();

    window.addEventListener("scroll", schedulePathDraw, { passive: true });
    window.addEventListener("resize", updateCurve);

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateCurve);
    });
    resizeObserver.observe(root);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(delayed);
      if (pathDrawFrame !== null) {
        cancelAnimationFrame(pathDrawFrame);
      }
      itemObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedulePathDraw);
      window.removeEventListener("resize", updateCurve);
    };
  }, [cities]);

  return (
    <div
      className="city-timeline"
      ref={rootRef}
      aria-label="Khu vực có cửa hàng Face Wash Fox"
    >
      {svgSize.width > 0 && pathD ? (
        <svg
          className="city-timeline-curve"
          width={svgSize.width}
          height={svgSize.height}
          viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
          aria-hidden="true"
        >
          <path d={pathD} fill="none" />
        </svg>
      ) : null}

      <ol className="city-timeline-list">
        {cities.map((city, index) => {
          const isVisible = Boolean(visibleIds[city.name]);

          return (
            <li
              className={`city-timeline-item ${index % 2 === 0 ? "is-left" : "is-right"} ${isVisible ? "is-visible" : "is-pending"}`}
              data-city={city.name}
              key={city.name}
              style={
                {
                  "--reveal-delay": `${(index % 3) * 70}ms`,
                } as CSSProperties
              }
            >
              <div className="city-timeline-copy">
                <h3>{city.name}</h3>
                <p>{city.text}</p>
              </div>
              <span className="city-timeline-marker" aria-hidden="true">
                <Image src="/logo/fwf-symbol.png" alt="" width={34} height={34} />
              </span>
              <div
                className={`city-timeline-spacer ${city.image ? "has-media" : ""}`}
                aria-hidden={city.image ? undefined : "true"}
              >
                {city.image ? (
                  <figure className="city-timeline-media">
                    <Image
                      src={city.image}
                      alt={city.imageAlt ?? ""}
                      fill
                      sizes="(max-width: 720px) calc(100vw - 68px), 340px"
                      className="city-timeline-media-image"
                    />
                  </figure>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>

      <div
        className={`city-timeline-cta ${ctaVisible ? "is-visible" : "is-pending"}`}
      >
        <a className="store-find-btn" href="/cua-hang">
          {t("home.findStore")}
        </a>
      </div>
    </div>
  );
}
