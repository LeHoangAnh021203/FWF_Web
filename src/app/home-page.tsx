"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";

import { getLocalizedFoxNews } from "@/components/b2b/home-data";
import { useLanguage } from "@/i18n/language-context";

import CityTimeline from "./city-timeline";
import ConsultationBookingModal from "./consultation-booking-modal";
import ExperienceOffers from "./experience-offers";
import FeedbackCarousel from "./feedback-carousel";
import HeroBanner from "./hero-banner";
import LoadingOverlay from "./loading-overlay";
import NewsShowcase from "./news-showcase";
import {
  CONSULT_BOOKING_SOURCE_OFFERS,
  warmupConsultationLocation,
} from "./open-consultation-booking";
import QuickBookingBanner from "./quick-booking-banner";
import ScrollEffects from "./scroll-effects";
import { SiteFooter, SiteHeader } from "./site-chrome";

export default function HomePage() {
  const { language, t } = useLanguage();
  const foxNews = getLocalizedFoxNews(language);
  const [offersBookingOpen, setOffersBookingOpen] = useState(false);

  const presenceCities = [
    {
      name: t("home.city.hanoi.name"),
      text: t("home.city.hanoi.text"),
      image: "/branch/AEON MALL HÀ ĐÔNG/MT1b.jpg",
      imageAlt: "Chi nhánh Face Wash Fox AEON Mall Hà Đông",
    },
    {
      name: t("home.city.haiphong.name"),
      text: t("home.city.haiphong.text"),
      image: "/branch/AEON MALL HÀ ĐÔNG/S6.jpg",
      imageAlt: "Không gian Face Wash Fox tại AEON Mall Hà Đông",
    },
    {
      name: t("home.city.danang.name"),
      text: t("home.city.danang.text"),
      image: "/branch/Lotte Liễu Giai/V4.jpg",
      imageAlt: "Không gian Face Wash Fox Lotte Liễu Giai",
    },
    {
      name: t("home.city.nhatrang.name"),
      text: t("home.city.nhatrang.text"),
      image: "/branch/Lotte Liễu Giai/V8.jpg",
      imageAlt: "Nội thất Face Wash Fox Lotte Liễu Giai",
    },
    {
      name: t("home.city.hcm.name"),
      text: t("home.city.hcm.text"),
      image: "/Fox Swat/S7B.jpg",
      imageAlt: "Không gian Face Wash Fox tại TP Hồ Chí Minh",
    },
    {
      name: t("home.city.vungtau.name"),
      text: t("home.city.vungtau.text"),
      image: "/branch/AEON MALL HÀ ĐÔNG/S5B.jpg",
      imageAlt: "Không gian Face Wash Fox AEON Mall Hà Đông",
    },
  ];

  const commitments = [
    {
      title: t("home.commit.tech.title"),
      text: t("home.commit.tech.text"),
      image: "/usp/usp-01.webp",
    },
    {
      title: t("home.commit.price.title"),
      text: t("home.commit.price.text"),
      image: "/usp/usp-02.webp",
    },
    {
      title: t("home.commit.time.title"),
      text: t("home.commit.time.text"),
      image: "/usp/usp-03.webp",
    },
    {
      title: t("home.commit.audience.title"),
      text: t("home.commit.audience.text"),
      image: "/usp/usp-04.webp",
    },
    {
      title: t("home.commit.focus.title"),
      text: t("home.commit.focus.text"),
      image: "/usp/usp-05.webp",
    },
  ];

  return (
    <main className="mono-page">
      <LoadingOverlay />
      <ScrollEffects />
      <SiteHeader home />

      <section id="hero" className="mono-hero">
        <HeroBanner />
      </section>

      <QuickBookingBanner />

      <section id="our-picks" className="models-section">
        <div className="section-heading">
          <h2>{t("home.servicesTitle")}</h2>
          <p>{t("home.servicesSubtitle")}</p>
        </div>
        <ExperienceOffers />
        <div className="models-section-cta">
          <button
            type="button"
            className="models-book-cta"
            onClick={() => {
              setOffersBookingOpen(true);
              warmupConsultationLocation();
            }}
          >
            {t("float.bookNow")}
          </button>
        </div>
      </section>

      <section className="commitment-section">
        <div className="section-heading">
          <h2>{t("home.whyTitle")}</h2>
        </div>
        <div className="commitment-grid">
          {commitments.map((item) => (
            <article key={item.title}>
              <img src={item.image} alt="" loading="lazy" decoding="async" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="store-section">
        <h2 className="store-title">{t("home.presenceTitle")}</h2>
        <div className="store-stats">
          <article>
            <span className="store-stat-label">{t("home.presenceChainLabel")}</span>
            <strong className="store-stat-value">{t("home.presenceChainTitle")}</strong>
            <p className="store-stat-note">{t("home.presenceChainText")}</p>
          </article>
          <article>
            <span className="store-stat-label">{t("home.presenceYearLabel")}</span>
            <strong className="store-stat-value stat-number" data-count-to="2023">
              2023
            </strong>
            <p className="store-stat-note">{t("home.presenceYearText")}</p>
          </article>
          <article>
            <span className="store-stat-label">{t("home.presenceScaleLabel")}</span>
            <strong className="store-stat-value">{t("home.presenceScaleValue")}</strong>
            <p className="store-stat-note">{t("home.presenceScaleText")}</p>
          </article>
        </div>
        <CityTimeline cities={presenceCities} />
      </section>

      <section id="story" className="story-section">
        <div className="story-copy">
          <p>&quot;{t("home.storyQuote")}&quot;</p>
          <h2 className="text-12">{t("home.storyTitle")}</h2>
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

      <NewsShowcase posts={foxNews} />

      <section className="feedback-section" id="feedback">
        <div className="feedback-layout">
          <div className="feedback-intro">
            <h2>{t("home.feedbackTitle")}</h2>
            <div className="feedback-mascot">
              <img src="/logo_FWF/Cao.png" alt="" width={720} height={720} />
            </div>
          </div>
          <FeedbackCarousel />
        </div>
      </section>

      <SiteFooter home />
      <ConsultationBookingModal
        idPrefix="offers"
        source={CONSULT_BOOKING_SOURCE_OFFERS}
        open={offersBookingOpen}
        onClose={() => setOffersBookingOpen(false)}
      />
    </main>
  );
}
