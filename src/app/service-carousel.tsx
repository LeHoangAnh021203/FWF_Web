"use client";

/* eslint-disable @next/next/no-img-element */

import { ChevronLeft, ChevronRight } from "lucide-react";
import { PointerEvent, useCallback, useEffect, useRef, useState } from "react";

import { useLanguage } from "@/i18n/language-context";

type Service = {
  name: string;
  description: string;
  price: string;
  image: string;
};

type ServiceCarouselProps = {
  services: Service[];
};

const HOTLINE_NUMBER = "0889866666";
const TRACK_MS = 6000;

export default function ServiceCarousel({ services }: ServiceCarouselProps) {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const count = services.length;
  const current = services[activeIndex];

  const goTo = useCallback(
    (index: number) => {
      if (!count) return;
      setActiveIndex((index + count) % count);
    },
    [count],
  );

  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  const shine = (event: PointerEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--shine-x",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--shine-y",
      `${event.clientY - rect.top}px`,
    );
  };

  useEffect(() => {
    const list = listRef.current;
    const active = list?.querySelector<HTMLElement>(".is-active");
    if (!list || !active) return;

    const top = active.offsetTop - list.clientHeight / 2 + active.offsetHeight / 2;
    list.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth",
    });
  }, [activeIndex]);

  useEffect(() => {
    if (selectedService || count < 2) return;

    const timer = window.setTimeout(() => goTo(activeIndex + 1), TRACK_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, count, goTo, selectedService]);

  const closeModal = useCallback(() => {
    setSelectedService(null);
  }, []);

  useEffect(() => {
    if (!selectedService) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeModal, selectedService]);

  if (!current) return null;

  return (
    <div className={selectedService ? "service-player has-modal" : "service-player"}>
      <div className="service-player-shell">
        <div className="service-player-now">
          <button
            type="button"
            className="service-player-art"
            aria-label={`${t("home.services.viewDetail")} ${current.name}`}
            onClick={() => setSelectedService(current)}
          >
            <img src={current.image} alt="" />
          </button>

          <div className="service-player-meta">
            <p className="service-player-kicker">{t("home.services.selected")}</p>
            <h3>{current.name}</h3>
            <p className="service-player-desc">{current.description}</p>
            <span className="service-player-price">{current.price}</span>

            <div
              className="service-player-progress"
              aria-hidden="true"
            >
              <i
                key={activeIndex}
                className={!selectedService ? "is-running" : undefined}
                style={{
                  animationDuration: `${TRACK_MS}ms`,
                  animationPlayState: selectedService ? "paused" : "running",
                }}
              />
            </div>

            <div className="service-player-controls">
              <button
                type="button"
                className="service-glossy is-nav"
                aria-label={t("home.services.prev")}
                onClick={goPrev}
                onPointerMove={shine}
              >
                <span className="service-glossy-metal" aria-hidden="true" />
                <span className="service-glossy-shine" aria-hidden="true" />
                <span className="service-glossy-label">
                  <ChevronLeft strokeWidth={2.6} />
                </span>
              </button>
              <button
                type="button"
                className="service-glossy is-cta"
                onClick={() => setSelectedService(current)}
                onPointerMove={shine}
              >
                <span className="service-glossy-metal" aria-hidden="true" />
                <span className="service-glossy-shine" aria-hidden="true" />
                <span className="service-glossy-label">{t("home.services.viewDetail")}</span>
              </button>
              <button
                type="button"
                className="service-glossy is-nav"
                aria-label={t("home.services.next")}
                onClick={goNext}
                onPointerMove={shine}
              >
                <span className="service-glossy-metal" aria-hidden="true" />
                <span className="service-glossy-shine" aria-hidden="true" />
                <span className="service-glossy-label">
                  <ChevronRight strokeWidth={2.6} />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="service-player-playlist">
          <div className="service-player-list-head">
            <p>{t("home.services.list")}</p>
            <span>{t("home.services.count").replace("{count}", String(services.length))}</span>
          </div>
          <div className="service-player-list" ref={listRef} aria-label={t("home.services.list")}>
          {services.map((service, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                type="button"
                key={service.name}
                className={isActive ? "service-player-track is-active" : "service-player-track"}
                onClick={() => setActiveIndex(index)}
              >
                <img src={service.image} alt="" />
                <span>
                  <strong>{service.name}</strong>
                  <small>{service.description}</small>
                </span>
                <em>{service.price}</em>
              </button>
            );
          })}
          </div>
        </div>
      </div>

      {selectedService ? (
        <div
          className="service-modal-backdrop"
          role="presentation"
          onClick={closeModal}
        >
          <article
            className="service-modal"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <button
              aria-label={t("home.services.viewDetail")}
              className="service-modal-close"
              onClick={closeModal}
              type="button"
            >
              x
            </button>
            <div className="service-modal-image">
              <img src={selectedService.image} alt="" />
            </div>
            <div className="service-modal-copy">
              <p>{selectedService.price}</p>
              <h3>{selectedService.name}</h3>
              <span>{selectedService.description}</span>
              <div className="service-modal-contact">
                <a className="service-modal-hotline" href={`tel:${HOTLINE_NUMBER}`}>
                  {t("home.services.phone")}: {HOTLINE_NUMBER}
                </a>
                <a
                  className="service-glossy is-cta service-modal-book"
                  href="#dat-lich"
                  onClick={closeModal}
                  onPointerMove={shine}
                >
                  <span className="service-glossy-metal" aria-hidden="true" />
                  <span className="service-glossy-shine" aria-hidden="true" />
                  <span className="service-glossy-label">{t("home.services.book")}</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      ) : null}
    </div>
  );
}
