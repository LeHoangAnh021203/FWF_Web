"use client";

import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

import { useLanguage } from "@/i18n/language-context";

const FEEDBACK_VIDEOS = [
  {
    src: "/feedback/01-chi-tu-399.mp4",
    poster: "/feedback/01-chi-tu-399.jpg",
  },
  {
    src: "/feedback/02-689.mp4",
    poster: "/feedback/02-689.jpg",
  },
  {
    src: "/feedback/03-399-539-689-999.mp4",
    poster: "/feedback/03-399-539-689-999.jpg",
  },
  {
    src: "/feedback/04-399-689-999.mp4",
    poster: "/feedback/04-399-689-999.jpg",
  },
] as const;

type CardSlot = "active" | "next" | "prev" | "after";

function cardSlot(index: number, activeIndex: number, count: number): CardSlot {
  const offset = (index - activeIndex + count) % count;
  if (offset === 0) return "active";
  if (offset === 1) return "next";
  if (offset === count - 1) return "prev";
  return "after";
}

export default function FeedbackCarousel() {
  const { t } = useLanguage();
  const count = FEEDBACK_VIDEOS.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [inView, setInView] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const dragRef = useRef({ pointerId: -1, startX: 0, dragging: false });
  const reduceMotionRef = useRef(false);
  const activeIndexRef = useRef(0);

  const goPrev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + count) % count);
  }, [count]);

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % count);
  }, [count]);

  activeIndexRef.current = activeIndex;

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.35 },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video || index === activeIndex) return;
      video.pause();
    });

    const video = videoRefs.current[activeIndex];
    if (!video) return;

    video.muted = muted;
    if (!inView || reduceMotionRef.current) {
      video.pause();
      return;
    }

    void video.play().catch(() => undefined);
  }, [activeIndex, inView, muted]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target !== stageRef.current && !stageRef.current?.contains(event.target as Node)) {
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if ((event.target as HTMLElement).closest("button")) {
      dragRef.current = { pointerId: -1, startX: 0, dragging: false };
      return;
    }
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, dragging: false };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag.pointerId !== event.pointerId) return;
    if (Math.abs(event.clientX - drag.startX) > 12) {
      drag.dragging = true;
    }
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag.pointerId !== event.pointerId) return;
    const delta = event.clientX - drag.startX;
    dragRef.current.pointerId = -1;
    if (!drag.dragging || Math.abs(delta) < 48) return;
    if (delta < 0) goNext();
    else goPrev();
  };

  return (
    <div
      ref={stageRef}
      className="feedback-stage"
      role="region"
      aria-roledescription="carousel"
      aria-label={t("home.feedbackRegion")}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        dragRef.current.pointerId = -1;
      }}
    >
      <div className="feedback-video-deck">
        {FEEDBACK_VIDEOS.map((item, index) => {
          const slot = cardSlot(index, activeIndex, count);
          const isActive = slot === "active";

          return (
            <article
              className={`feedback-video-card is-${slot}`}
              key={item.src}
              aria-hidden={!isActive}
              onClick={() => {
                if (dragRef.current.dragging) return;
                if (slot === "next") goNext();
              }}
            >
              <video
                ref={(element) => {
                  videoRefs.current[index] = element;
                }}
                src={item.src}
                poster={item.poster}
                muted={muted}
                playsInline
                preload={isActive ? "auto" : slot === "next" ? "metadata" : "none"}
                onEnded={() => {
                  if (index === activeIndexRef.current) goNext();
                }}
              />
              {isActive ? (
                <div className="feedback-video-tools">
                  <button
                    type="button"
                    className="feedback-video-tool"
                    aria-label={muted ? t("home.feedbackUnmute") : t("home.feedbackMute")}
                    onClick={(event) => {
                      event.stopPropagation();
                      setMuted((value) => !value);
                    }}
                  >
                    {muted ? (
                      <VolumeX aria-hidden="true" strokeWidth={2.2} />
                    ) : (
                      <Volume2 aria-hidden="true" strokeWidth={2.2} />
                    )}
                  </button>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="feedback-nav">
        <button
          type="button"
          aria-label={t("home.feedbackPrev")}
          onClick={(event) => {
            event.stopPropagation();
            goPrev();
          }}
        >
          <ChevronLeft aria-hidden="true" strokeWidth={2.4} />
        </button>
        <button
          type="button"
          aria-label={t("home.feedbackNext")}
          onClick={(event) => {
            event.stopPropagation();
            goNext();
          }}
        >
          <ChevronRight aria-hidden="true" strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}
