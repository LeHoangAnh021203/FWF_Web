"use client";

/* eslint-disable @next/next/no-img-element */

import type { PointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

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
const SOCIAL_CHANNELS: Array<{ label: string; href: string }> = [
  { label: "Facebook", href: "https://www.facebook.com/facewashfox" },
  { label: "Instagram", href: "https://www.instagram.com/facewashfox" },
  { label: "TikTok", href: "https://www.tiktok.com/@facewashfox" },
  { label: "Zalo", href: "https://zalo.me/facewashfox" },
];

export default function ServiceCarousel({ services }: ServiceCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const rotationRef = useRef(0);
  const activeIndexRef = useRef(0);
  const dragLastXRef = useRef(0);
  const dragTotalRef = useRef(0);
  const isDraggingRef = useRef(false);
  const suppressClickRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const renderCarousel = useCallback(() => {
    const count = services.length;
    if (!count) return;

    const step = 360 / count;
    const isMobile = window.innerWidth <= 900;
    const radius = isMobile ? 190 : 290;
    const yOffsets = [-10, 12, -6, 14, -12, 8];
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const rawAngle = rotationRef.current + index * step;
      const angle = ((((rawAngle + 180) % 360) + 360) % 360) - 180;
      const distance = Math.abs(angle);
      const radians = (angle * Math.PI) / 180;
      const frontness = (Math.cos(radians) + 1) / 2;
      const y = yOffsets[index % yOffsets.length];
      const scale = 0.82 + frontness * 0.2;
      const opacity = distance > 142 ? 0.08 : 0.24 + frontness * 0.76;
      const blur = distance > 142 ? 6 : (1 - frontness) * 3.5;

      card.style.setProperty("--service-angle", `${rawAngle}deg`);
      card.style.setProperty("--service-counter-angle", `${-rawAngle}deg`);
      card.style.setProperty("--service-radius", `${radius}px`);
      card.style.setProperty("--service-y", `${y}px`);
      card.style.setProperty("--service-scale", String(scale));
      card.style.setProperty("--service-hover-scale", String(scale + 0.04));
      card.style.setProperty("--service-opacity", String(opacity));
      card.style.setProperty("--service-blur", `${blur}px`);
      card.style.zIndex = String(Math.round(frontness * 100));

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndexRef.current) {
      activeIndexRef.current = closestIndex;
      setActiveIndex(closestIndex);
    }
  }, [services.length]);

  const setRotation = useCallback((rotation: number) => {
    rotationRef.current = rotation;
    renderCarousel();
  }, [renderCarousel]);

  const updateActiveIndex = () => {
    renderCarousel();
  };

  useEffect(() => {
    const stopLoop = () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      lastTimeRef.current = null;
    };

    const tick = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const deltaSeconds = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!isDraggingRef.current) {
        setRotation(rotationRef.current - deltaSeconds * 12);
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(tick);
    };

    const onResize = () => renderCarousel();
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          renderCarousel();
          startLoop();
        } else {
          stopLoop();
        }
      },
      { rootMargin: "180px 0px", threshold: 0.01 },
    );

    renderCarousel();
    if (carouselRef.current) {
      visibilityObserver.observe(carouselRef.current);
    } else {
      startLoop();
    }
    window.addEventListener("resize", onResize);

    return () => {
      stopLoop();
      visibilityObserver.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [renderCarousel, setRotation]);

  const rotateToIndex = (index: number) => {
    const step = 360 / services.length;
    const target = -index * step;
    const current = rotationRef.current;
    const currentTurns = Math.round((current - target) / 360);

    setRotation(target + currentTurns * 360);
    activeIndexRef.current = index;
    setActiveIndex(index);
  };

  const handleCardClick = (service: Service, index: number) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

    rotateToIndex(index);
    setSelectedService(service);
  };

  const closeModal = useCallback(() => {
    setSelectedService(null);
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (selectedService) return;

    isDraggingRef.current = true;
    dragLastXRef.current = event.clientX;
    dragTotalRef.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const distance = event.clientX - dragLastXRef.current;
    dragLastXRef.current = event.clientX;
    dragTotalRef.current += Math.abs(distance);
    setRotation(rotationRef.current + distance * 0.42);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    suppressClickRef.current = dragTotalRef.current > 8;
    isDraggingRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
    updateActiveIndex();
  };

  useEffect(() => {
    if (!selectedService) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeModal, selectedService]);

  return (
    <div
      ref={carouselRef}
      className={selectedService ? "service-carousel has-modal" : "service-carousel"}
      onPointerCancel={() => {
        isDraggingRef.current = false;
        updateActiveIndex();
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="service-carousel-stage">
        {services.map((service, index) => {
          return (
            <button
              aria-label={`Chọn ${service.name}`}
              className={
                index === activeIndex ? "service-carousel-card is-active" : "service-carousel-card"
              }
              key={service.name}
              onClick={() => handleCardClick(service, index)}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              type="button"
            >
              <span className="service-card-logo" aria-hidden="true">
                <img src="/logo/logo.png" alt="" />
              </span>
              <span className="service-card-image">
                <img src={service.image} alt="" />
              </span>
              <span className="service-card-copy">
                <strong>{service.name}</strong>
                <small>{service.description}</small>
                <em>{service.price}</em>
              </span>
            </button>
          );
        })}
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
            onPointerDown={(event) => event.stopPropagation()}
            role="dialog"
          >
            <button
              aria-label="Đóng chi tiết dịch vụ"
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
                  Hotline: {HOTLINE_NUMBER}
                </a>
                <div className="service-modal-socials" aria-label="Kênh mạng xã hội">
                  {SOCIAL_CHANNELS.map((channel) => (
                    <a
                      href={channel.href}
                      key={channel.label}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {channel.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      ) : null}
    </div>
  );
}
