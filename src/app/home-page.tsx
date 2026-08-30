"use client";

/* eslint-disable @next/next/no-img-element */

import { getLocalizedFoxNews } from "@/components/b2b/home-data";
import { useLanguage } from "@/i18n/language-context";

import CityTimeline from "./city-timeline";
import FeedbackCarousel from "./feedback-carousel";
import HeroVideo from "./hero-video";
import LoadingOverlay from "./loading-overlay";
import NewsShowcase from "./news-showcase";
import QuickBookingBanner from "./quick-booking-banner";
import ScrollEffects from "./scroll-effects";
import ServiceCarousel from "./service-carousel";
import { SiteFooter, SiteHeader } from "./site-chrome";

const testimonialImages = [
  "/PR/pr3/pr3_1.jpg",
  "/PR/pr1/pr1_1.PNG",
  "/PR/pr2/pr2_1.JPG",
  "/PR/pr3/pr3_2.jpg",
  "/PR/pr2/pr2_2.JPG",
] as const;

export default function HomePage() {
  const { language, t } = useLanguage();
  const foxNews = getLocalizedFoxNews(language);

  const testimonials = testimonialImages.map((image, index) => {
    const id = index + 1;
    return {
      name: t(`home.feedback.${id}.name`),
      quote: t(`home.feedback.${id}.quote`),
      image,
    };
  });

  const services = [
    {
      name: "Aqua Peel Cleanse",
      description: t("home.service.aqua.desc"),
      price: "299.000 đ",
      image: "/services/aqua-peel-clean.png",
    },
    {
      name: "Lumiglow Cleanse",
      description: t("home.service.lumiglow.desc"),
      price: "519.000 đ",
      image: "/services/lumiglow.png",
    },
    {
      name: "Gymming Cleanse",
      description: t("home.service.gymming.desc"),
      price: "519.000 đ",
      image: "/services/gymming.png",
    },
    {
      name: "Cryo Cleanse",
      description: t("home.service.cryo.desc"),
      price: "519.000 đ",
      image: "/services/cryo.png",
    },
    {
      name: "Deep Cleanse",
      description: t("home.service.deep.desc"),
      price: "489.000 đ",
      image: "/services/deep-cleanse.png",
    },
    {
      name: "Eye-Revive Cleanse",
      description: t("home.service.eye.desc"),
      price: "519.000 đ",
      image: "/services/eye-revive.png",
    },
  ];

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
      image: "/commitments/technology.png",
    },
    {
      title: t("home.commit.price.title"),
      text: t("home.commit.price.text"),
      image: "/commitments/pricing.png",
    },
    {
      title: t("home.commit.time.title"),
      text: t("home.commit.time.text"),
      image: "/commitments/time.png",
    },
    {
      title: t("home.commit.audience.title"),
      text: t("home.commit.audience.text"),
      image: "/commitments/audience.png",
    },
    {
      title: t("home.commit.focus.title"),
      text: t("home.commit.focus.text"),
      image: "/commitments/focus.png",
    },
  ];

  return (
    <main className="mono-page">
      <LoadingOverlay />
      <ScrollEffects />
      <SiteHeader home />

      <section id="hero" className="mono-hero">
        <div className="hero-title" aria-hidden="true">
          <span>F</span>
          <span>W</span>
          <span>F</span>
        </div>
        <HeroVideo />
      </section>

      <QuickBookingBanner />

      <section className="store-section">
        <h2 className="store-title">{t("home.presenceTitle")}</h2>
        <div className="store-stats">
          <article>
            <span>{t("home.presenceChainLabel")}</span>
            <strong>{t("home.presenceChainTitle")}</strong>
            <p>{t("home.presenceChainText")}</p>
          </article>
          <article>
            <span>{t("home.presenceYearLabel")}</span>
            <strong className="stat-number" data-count-to="2023">
              2023
            </strong>
            <p>{t("home.presenceYearText")}</p>
          </article>
          <article>
            <span>{t("home.presenceScaleLabel")}</span>
            <strong className="stat-number" data-count-to="50" data-suffix="+">
              50+
            </strong>
            <p>{t("home.presenceScaleText")}</p>
          </article>
        </div>
        <CityTimeline cities={presenceCities} />
      </section>

      <section id="our-picks" className="models-section">
        <div className="section-heading">
          <h2>{t("home.servicesTitle")}</h2>
          <p>{t("home.servicesSubtitle")}</p>
        </div>
        <ServiceCarousel services={services} />
      </section>

      <section id="story" className="story-section">
        <div className="story-copy">
          <p>&quot;{t("home.storyQuote")}&quot;</p>
          <h2 className="text-12">{t("home.storyTitle")}</h2>
          <p>{t("home.storyBody")}</p>
          <a href="https://facewashfox.com/ve-chung-toi/">{t("home.storyCta")}</a>
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

      <section className="feedback-section">
        <div className="section-heading">
          <h2>{t("home.feedbackTitle")}</h2>
          <p>{t("home.feedbackSubtitle")}</p>
        </div>
        <FeedbackCarousel testimonials={testimonials} />
      </section>

      <section className="commitment-section">
        <h2>{t("home.commitmentIntro")}</h2>
        <div className="commitment-grid">
          {commitments.map((item) => (
            <article key={item.title}>
              <img src={item.image} alt="" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter home />
    </main>
  );
}
