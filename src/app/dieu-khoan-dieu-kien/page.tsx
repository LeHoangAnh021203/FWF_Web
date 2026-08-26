import type { Metadata } from "next";

import { SiteFooter, SiteHeader } from "../site-chrome";
import { TermsContent } from "./terms-content";

export const metadata: Metadata = {
  title: "Điều khoản & Điều kiện Face Wash Fox",
  description:
    "Điều khoản sử dụng website, đặt lịch, dịch vụ, voucher, thanh toán và bảo mật thông tin tại Face Wash Fox.",
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
