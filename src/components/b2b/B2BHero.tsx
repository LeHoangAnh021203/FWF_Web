"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/b2b/ui/button";
import { useLanguage } from "@/i18n/language-context";

export function B2BHero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,216,122,0.28),transparent_28%),linear-gradient(180deg,#fffdf8_0%,#fff6ea_54%,#fffdf8_100%)]">
      <div className="container relative z-10 mx-auto px-4 pb-16 pt-24 md:pt-32">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <p className="mb-4 text-sm font-bold uppercase text-orange-300 md:text-base">
            {t("b2b.intro")}
          </p>
          <p className="mx-auto mb-6 inline-flex max-w-full items-center gap-3 rounded-full border border-orange-200 bg-white/90 px-4 py-3 text-[11px] font-bold text-orange-500 shadow-[0_20px_40px_-28px_rgba(234,88,12,0.45)] backdrop-blur-sm sm:px-6 sm:text-sm md:px-8 md:py-4 md:text-base">
            <span className="hero-status-dot h-2.5 w-2.5 rounded-full bg-orange-500 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5" />
            <span className="truncate">{t("b2b.badge")}</span>
          </p>
          <h1 className="mb-6 text-2xl font-bold text-[#0097b2] sm:text-3xl md:text-4xl lg:text-3xl">
            {t("b2b.heroTitle1")} <br />
            {t("b2b.heroTitle2")}
          </h1>
          <p className="mb-8 text-base leading-8 text-stone-700 sm:text-[18px]">
            <span className="font-semibold text-orange-400">{t("b2b.heroBodyBrand")}</span>
            {t("b2b.heroBodyAfter")}
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="min-h-12 rounded-[32px] bg-orange-500 px-6 font-bold text-white hover:bg-orange-600 sm:px-8"
            >
              <Link href="#fox-swat">
                {t("b2b.ctaExplore")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              type="button"
              size="lg"
              variant="outline"
              className="min-h-12 rounded-[32px] border-2 border-stone-200 bg-white px-6 font-bold text-slate-800 shadow-[0_18px_35px_-24px_rgba(15,23,42,0.22)] hover:border-orange-500 hover:bg-white hover:text-orange-500 sm:px-8"
            >
              <Link href="#booking">{t("b2b.ctaBook")}</Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[minmax(340px,660px)_minmax(0,1fr)] lg:gap-16">
          <div className="relative order-2 mx-auto w-full max-w-[620px] sm:max-w-[400px] lg:order-1 lg:max-w-[460px]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.96)_0%,rgba(255,237,213,0.7)_42%,rgba(251,146,60,0.2)_68%,transparent_100%)] blur-3xl" />
            <Image
              src="/logo_FWF/Cao.png"
              alt="Face Wash Fox mascot"
              width={1920}
              height={1920}
              priority
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 42vw, 460px"
              className="relative z-10 h-auto w-full object-contain brightness-[1.08] contrast-[1.04] saturate-[1.08] drop-shadow-[0_30px_40px_rgba(249,115,22,0.18)] drop-shadow-[0_0_38px_rgba(255,237,213,0.65)]"
            />
          </div>

          <div className="order-1 lg:order-2">
            <div className="rounded-[38px] bg-[linear-gradient(180deg,#ffd24a_0%,#ffbf00_100%)] p-3 shadow-[0_28px_70px_-30px_rgba(234,179,8,0.8)] sm:p-4 md:rounded-[42px] md:p-5">
              <div className="rounded-[30px] bg-black p-2 md:rounded-[34px] md:p-3">
                <div className="relative mx-auto aspect-[4/5] w-full overflow-hidden rounded-[24px] bg-black md:rounded-[28px]">
                  <video
                    src="/video/B2B_2.mp4"
                    className="h-full w-full object-cover"
                    preload="metadata"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-8 text-center">
        <ChevronDown className="mx-auto h-6 w-6 animate-bounce text-orange-500" />
      </div>
    </section>
  );
}
