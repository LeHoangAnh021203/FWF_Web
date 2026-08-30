"use client";

/* eslint-disable @next/next/no-img-element */

import type { CSSProperties, PointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type Testimonial = {
  name: string;
  quote: string;
  image: string;
};

type FeedbackCarouselProps = {
  testimonials: Testimonial[];
};

type CardStyle = CSSProperties & {
  "--feedback-angle": string;
  "--feedback-y": string;
  "--feedback-opacity": string;
  "--feedback-scale": string;
};

const Y_OFFSETS = [-16, 14, -10, 16, -6] as const;
const MOBILE_BREAKPOINT = 980;

function cardPose(index: number, count: number, rotation = 0) {
  const step = 360 / count;
  const rawAngle = rotation + index * step;
  const angle = ((((rawAngle + 180) % 360) + 360) % 360) - 180;
  const frontness = (Math.cos((angle * Math.PI) / 180) + 1) / 2;

  return {
    rawAngle,
    y: Y_OFFSETS[index % Y_OFFSETS.length],
    opacity: 0.35 + frontness * 0.65,
    scale: 0.88 + frontness * 0.14,
    zIndex: Math.round(frontness * 100),
    distance: Math.abs(angle),
  };
}

function cardStyle(index: number, count: number, rotation = 0): CardStyle {
  const pose = cardPose(index, count, rotation);

  return {
    "--feedback-angle": `${pose.rawAngle}deg`,
    "--feedback-y": `${pose.y}px`,
    "--feedback-opacity": String(pose.opacity),
    "--feedback-scale": String(pose.scale),
    zIndex: pose.zIndex,
  };
}

export default function FeedbackCarousel({ testimonials }: FeedbackCarouselProps) {
  const count = testimonials.length;
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
    if (!count) return;

    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    const radius = isMobile ? 128 : 240;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const pose = cardPose(index, count, rotationRef.current);
      const style = cardStyle(index, count, rotationRef.current);

      card.style.setProperty("--feedback-angle", style["--feedback-angle"]);
      card.style.setProperty("--feedback-y", style["--feedback-y"]);
      card.style.setProperty("--feedback-radius", `${radius}px`);
      card.style.setProperty("--feedback-opacity", style["--feedback-opacity"]);
      card.style.setProperty("--feedback-scale", style["--feedback-scale"]);
      card.style.zIndex = String(pose.zIndex);

      if (pose.distance < closestDistance) {
        closestDistance = pose.distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndexRef.current) {
      activeIndexRef.current = closestIndex;
      setActiveIndex(closestIndex);
    }
  }, [count]);

  const setRotation = useCallback(
    (rotation: number) => {
      rotationRef.current = rotation;
      renderCarousel();
    },
    [renderCarousel],
  );

  useEffect(() => {
    const stopLoop = () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      lastTimeRef.current = null;
      stageRef.current?.classList.remove("is-live");
    };

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

    const startLoop = () => {
      if (frameRef.current !== null) return;
      stageRef.current?.classList.add("is-live");
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
    if (stageRef.current) {
      visibilityObserver.observe(stageRef.current);
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
            style={cardStyle(index, count)}
            aria-hidden={index !== activeIndex}
          >
            <div className="stars" aria-hidden="true">
              ★★★★★
            </div>
            <p>{item.quote}</p>
            <div className="testimonial-person">
              <img src={item.image} alt="" width={42} height={42} />
              <h3>{item.name}</h3>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
