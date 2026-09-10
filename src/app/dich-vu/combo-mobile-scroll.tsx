"use client";

import { useRef, useCallback } from "react";

export function useComboMobileScroll() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>("[data-combo-card]");
    const gap = 12;
    const amount = card ? card.offsetWidth + gap : Math.round(track.clientWidth * 0.86);
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }, []);

  return { trackRef, scrollByCard };
}

/** Cancels asymmetric #combo-love mobile padding so children can center to the screen. */
const mobileBleedClassName =
  "-ml-4 w-[calc(100%+1rem+4.75rem)] max-w-none md:ml-0 md:w-auto";

export function ComboMobileNav({
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
}: {
  onPrev: () => void;
  onNext: () => void;
  prevLabel: string;
  nextLabel: string;
}) {
  return (
    <div className={`combo-mobile-nav mt-3 flex items-center justify-center gap-2 md:hidden ${mobileBleedClassName}`}>
      <button
        type="button"
        onClick={onPrev}
        aria-label={prevLabel}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f05b2a] text-white shadow-[0_4px_10px_rgba(240,91,42,0.3)] transition hover:bg-[#e04f22] active:scale-95"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label={nextLabel}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f05b2a] text-white shadow-[0_4px_10px_rgba(240,91,42,0.3)] transition hover:bg-[#e04f22] active:scale-95"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

export const comboMobileTrackClassName =
  `${mobileBleedClassName} flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0`;

export const comboMobileCardClassName =
  "relative flex min-h-[190px] w-[min(86vw,340px)] shrink-0 snap-center flex-col justify-between rounded-[22px] border border-[#f0e4d8] bg-white px-4 pb-4 pt-5 shadow-[0_10px_28px_rgba(244,116,29,0.12)] md:min-h-[210px] md:w-auto md:min-w-0 md:shrink md:rounded-[26px] md:px-5 md:pb-5 md:pt-6";
