import type { Metadata } from "next";

import { SiteFooter, SiteHeader } from "../site-chrome";
import { PrivacyContent } from "./privacy-content";

export const metadata: Metadata = {
  title: "Chính sách bảo vệ dữ liệu cá nhân | Face Wash Fox",
  description:
    "Mục đích xử lý, thời gian lưu, bên nhận dữ liệu, quyền của chủ thể dữ liệu và cách liên hệ Công ty Cổ phần FB Network.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="terms-page">
      <SiteHeader />
      <PrivacyContent />
      <SiteFooter />
    </main>
  );
}
