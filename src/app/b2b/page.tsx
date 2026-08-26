/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import Image from "next/image";

import { B2BHero } from "@/components/b2b/B2BHero";
import { BookingSection } from "@/components/b2b/BookingSection";
import { FaqSection } from "@/components/b2b/FaqSection";
import { FoxNewsSection } from "@/components/b2b/FoxNewsSection";
import { FoxSwatSection } from "@/components/b2b/FoxSwatSection";
import { WhyChooseSection } from "@/components/b2b/WhyChooseSection";
import { SiteFooter, SiteHeader } from "../site-chrome";
import "./styles/animation.css";

export const metadata: Metadata = {
  title: "B2B Face Wash Fox",
  description:
    "Giải pháp phúc lợi, voucher và trải nghiệm chăm sóc da tại văn phòng dành cho doanh nghiệp.",
};

export default function B2BPage() {
  return (
    <main id="top">
      <SiteHeader />

      <div className="relative w-full overflow-hidden bg-white pt-[112px] md:pt-[136px]">
        <Image
          src="/logo_FWF/banner3.png"
          alt="Banner Face Wash Fox"
          width={1920}
          height={1080}
          priority
          quality={100}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>

      <B2BHero />
      <FoxSwatSection />
      <WhyChooseSection />
      <BookingSection />
      <FaqSection />
      <FoxNewsSection />

      <SiteFooter />
    </main>
  );
}
