import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../site-chrome";
import StoreMapSection from "../store-map-section";

export const metadata: Metadata = {
  title: "Cửa hàng Face Wash Fox",
  description:
    "Tìm cửa hàng Face Wash Fox gần bạn, xem bản đồ chi nhánh, chỉ đường và đặt lịch.",
};

export default function StorePage() {
  return (
    <main className="store-page">
      <SiteHeader />
      <StoreMapSection />
      <SiteFooter />
    </main>
  );
}
