import type { Metadata } from "next";

import { SiteFooter, SiteHeader } from "../site-chrome";
import { TermsContent } from "./terms-content";

export const metadata: Metadata = {
  title: "Điều khoản & Điều kiện Face Wash Fox",
  description:
    "Điều khoản sử dụng website, đặt lịch, thẻ Foxie, voucher, thanh toán, hoàn hủy và bảo vệ dữ liệu cá nhân tại Face Wash Fox.",
};

export default function TermsPage() {
  return (
    <main className="terms-page">
      <SiteHeader />
      <TermsContent />
      <SiteFooter />
    </main>
  );
}
