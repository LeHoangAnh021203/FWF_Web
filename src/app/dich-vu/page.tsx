import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../site-chrome";
import { ArtGallerySlider } from "./art-gallery-slider";
import ComboIndepth from "./combo-indepth";
import ComboLove from "./combo-love";
import ServiceSection from "./service-section";
import ServiceStandard from "./service-standard";
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
      <ComboIndepth />
      <ComboLove />
      <div
        id="art-gallery-slider"
        className="h-[100svh] w-full max-w-[100vw] overflow-hidden bg-black"
      >
        <ArtGallerySlider />
      </div>
      <VoucherSection />
      <ServiceStandard />
      <SiteFooter />
    </main>
  );
}

