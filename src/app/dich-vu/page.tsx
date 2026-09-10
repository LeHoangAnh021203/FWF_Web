import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../site-chrome";
import ComboSections from "./combo-sections";
import ServiceSection from "./service-section";
import VoucherSection from "./voucher-section";

export const metadata: Metadata = {
  title: "Dịch vụ Face Wash Fox",
  description:
    "Khám phá dịch vụ, combo, bảng giá và đặt lịch tư vấn miễn phí tại Face Wash Fox.",
};

export default function ServicePage() {
  return (
    <main className="service-page">
      <SiteHeader />
      <ServiceSection />
      <ComboSections />
      {/* Temporarily hidden: ArtGallerySlider (Dịch vụ cơ bản) */}
      <VoucherSection />
      <SiteFooter />
    </main>
  );
}
