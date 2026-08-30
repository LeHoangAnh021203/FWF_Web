"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";

const POSTER_WEBP = "/fwf-hero-poster.webp";
const POSTER_JPG = "/fwf-hero-poster.jpg";
const MOBILE_SRC = "/fwf-hero-mobile.mp4";
const DESKTOP_SRC = "/fwf-hero.mp4";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const markReady = () => setIsReady(true);
    const mobile = window.matchMedia("(max-width: 768px)").matches;

    video.src = mobile ? MOBILE_SRC : DESKTOP_SRC;
    video.addEventListener("playing", markReady);
    video.addEventListener("canplay", markReady);
    video.load();
    void video.play().catch(() => undefined);

    return () => {
      video.removeEventListener("playing", markReady);
      video.removeEventListener("canplay", markReady);
    };
  }, []);

  return (
    <div className="hero-frame">
      <picture>
        <source srcSet={POSTER_WEBP} type="image/webp" />
        <img
          className="hero-video hero-poster"
          src={POSTER_JPG}
          alt=""
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <video
        ref={videoRef}
        className={`hero-video${isReady ? " is-ready" : ""}`}
        poster={POSTER_JPG}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      />
    </div>
  );
}
