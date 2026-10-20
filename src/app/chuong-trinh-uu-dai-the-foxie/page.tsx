import type { Metadata } from "next";

import { SiteFooter, SiteHeader } from "../site-chrome";

const POSTER_SRC = "/bang-gia-the-foxie/quyen-loi-the-08-2026.jpg";

export const metadata: Metadata = {
  title: "Chương trình ưu đãi thẻ Foxie | Face Wash Fox",
  description:
    "Quyền lợi thẻ thành viên Foxie: dùng toàn bộ dịch vụ với giá thẻ Foxie, chia sẻ với bạn bè và người thân.",
  alternates: {
    canonical: "https://facewashfox.com/chuong-trinh-uu-dai-the-foxie",
  },
};

export default function ChuongTrinhUuDaiTheFoxiePage() {
  return (
    <main className="bang-gia-foxie-page min-h-screen bg-[#f7e0c7]">
      <SiteHeader />
      <section className="px-4 pb-10 pt-[88px] md:px-8 md:pb-14 md:pt-28">
        <h1 className="sr-only">Chương trình ưu đãi thẻ Foxie</h1>
        <div className="mx-auto w-full max-w-[320px] md:max-w-[360px] lg:max-w-[780px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={POSTER_SRC}
            alt="Quyền lợi thẻ Foxie: bảng voucher và ưu đãi thành viên Face Wash Fox"
            className="block h-auto w-full bg-[#f6eadc]"
          />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
