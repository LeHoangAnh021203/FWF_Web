import type { Metadata } from "next";

import ScrollEffects from "../scroll-effects";
import { SiteFooter, SiteHeader } from "../site-chrome";
import AboutStory from "./about-story";

export const metadata: Metadata = {
  title: "Về chúng tôi | Face Wash Fox",
  description:
    "Câu chuyện dịch vụ Face Wash Fox — chuỗi cửa hàng rửa mặt công nghệ, kết hợp Hydra Facial và quy trình chăm sóc da tối ưu.",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <ScrollEffects />
      <SiteHeader />
      <AboutStory />
      <SiteFooter />
    </main>
  );
}
