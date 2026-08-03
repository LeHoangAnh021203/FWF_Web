"use client";

/* eslint-disable @next/next/no-img-element */

import type { PointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type Testimonial = {
  name: string;
  quote: string;
  image: string;
};

type FeedbackCarouselProps = {
  testimonials: Testimonial[];
};

export default function FeedbackCarousel({ testimonials }: FeedbackCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rotationRef = useRef(0);
  const activeIndexRef = useRef(0);
  const dragLastXRef = useRef(0);
  const dragTotalRef = useRef(0);
  const isDraggingRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const renderCarousel = useCallback(() => {
    const count = testimonials.length;
    if (!count) return;

    const step = 360 / count;
    const isMobile = window.innerWidth <= 900;
    const radius = isMobile ? 170 : 240;
    const yOffsets = [-16, 14, -10, 16, -6];
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const rawAngle = rotationRef.current + index * step;
      const angle = ((((rawAngle + 180) % 360) + 360) % 360) - 180;
      const distance = Math.abs(angle);
      const frontness = (Math.cos((angle * Math.PI) / 180) + 1) / 2;
      const y = yOffsets[index % yOffsets.length];

      card.style.setProperty("--feedback-angle", `${rawAngle}deg`);
      card.style.setProperty("--feedback-y", `${y}px`);
      card.style.setProperty("--feedback-radius", `${radius}px`);
      card.style.setProperty("--feedback-opacity", String(0.35 + frontness * 0.65));
      card.style.setProperty("--feedback-scale", String(0.88 + frontness * 0.14));
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
  }, [testimonials.length]);

  const setRotation = useCallback(
    (rotation: number) => {
      rotationRef.current = rotation;
      renderCarousel();
    },
    [renderCarousel],
  );

  useEffect(() => {
    const tick = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const deltaSeconds = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!isDraggingRef.current) {
        setRotation(rotationRef.current - deltaSeconds * 10);
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    const onResize = () => renderCarousel();

    renderCarousel();
    frameRef.current = requestAnimationFrame(tick);
    window.addEventListener("resize", onResize);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("resize", onResize);
    };
  }, [renderCarousel, setRotation]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    dragLastXRef.current = event.clientX;
    dragTotalRef.current = 0;
    stageRef.current?.classList.add("is-dragging");
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const distance = event.clientX - dragLastXRef.current;
    dragLastXRef.current = event.clientX;
    dragTotalRef.current += Math.abs(distance);
    setRotation(rotationRef.current + distance * 0.45);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    stageRef.current?.classList.remove("is-dragging");
    event.currentTarget.releasePointerCapture(event.pointerId);
    renderCarousel();
  };

  return (
    <div
      ref={stageRef}
      className="feedback-stage"
      role="region"
      aria-roledescription="carousel"
      aria-label="Đánh giá khách hàng"
      onPointerCancel={() => {
        isDraggingRef.current = false;
        stageRef.current?.classList.remove("is-dragging");
        renderCarousel();
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="testimonial-track" aria-live="polite">
        {testimonials.map((item, index) => (
          <article
            className={
              index === activeIndex ? "testimonial-card is-active" : "testimonial-card"
            }
            key={item.name}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            aria-hidden={index !== activeIndex}
          >
            <div className="stars" aria-hidden="true">
              ★★★★★
            </div>
            <p>{item.quote}</p>
            <div className="testimonial-person">
              <img src={item.image} alt="" />
              <h3>{item.name}</h3>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
