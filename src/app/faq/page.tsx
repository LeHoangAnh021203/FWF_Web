import type { Metadata } from "next";

import { SiteFooter, SiteHeader } from "../site-chrome";
import FaqContactSection from "./faq-contact-section";

export const metadata: Metadata = {
  title: "FAQ Face Wash Fox",
  description:
    "Câu hỏi thường gặp về dịch vụ rửa mặt công nghệ, giá thẻ Foxie, đặt lịch và hệ thống cửa hàng Face Wash Fox.",
};

export default function FaqPage() {
  return (
    <main className="faq-page">
      <SiteHeader />
      <FaqContactSection />
      <SiteFooter />
    </main>
  );
}
