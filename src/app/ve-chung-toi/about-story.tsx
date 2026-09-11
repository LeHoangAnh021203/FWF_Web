"use client";

import { useLanguage } from "@/i18n/language-context";

export default function AboutStory() {
  const { t } = useLanguage();

  return (
    <section id="story" className="story-section" aria-labelledby="about-story-heading">
      <div className="story-copy">
        <p>&quot;{t("home.storyQuote")}&quot;</p>
        <h1 id="about-story-heading">{t("home.storyTitle")}</h1>
        <p>{t("home.storyBody")}</p>
      </div>
      <div className="video-panel story-video">
        <video
          src="/fwf-story.mp4"
          poster="/fwf-story-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={t("home.storyVideo")}
        />
      </div>
    </section>
  );
}
