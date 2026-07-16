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
    const step = 360 / services.length;
    const isMobile = window.innerWidth <= 640;
    const radius = isMobile ? 165 : 250;
    const zDepth = isMobile ? 70 : 110;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const rawAngle = rotationRef.current + index * step;
      const angle = ((((rawAngle + 180) % 360) + 360) % 360) - 180;
      const distance = Math.abs(angle);
      const radians = (angle * Math.PI) / 180;
      const frontness = (Math.cos(radians) + 1) / 2;
      const x = Math.sin(radians) * radius;
      const z = Math.cos(radians) * zDepth;
      const rotateY = Math.max(-34, Math.min(34, -angle * 0.38));
      const scale = 0.74 + frontness * 0.28;
      const opacity = distance > 126 ? 0.06 : 0.18 + frontness * 0.82;
      const blur = distance > 126 ? 8 : (1 - frontness) * 5;

      card.style.setProperty("--service-x", `${x}px`);
      card.style.setProperty("--service-z", `${z}px`);
      card.style.setProperty("--service-rotate", `${rotateY}deg`);
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

    renderCarousel();
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
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
    if (event.target instanceof Element && event.target.closest(".service-carousel-card")) {
      return;
    }

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
