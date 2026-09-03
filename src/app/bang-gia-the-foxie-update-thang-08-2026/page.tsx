import type { Metadata } from "next";

import { SiteFooter, SiteHeader } from "../site-chrome";
import FoxieCardBoard from "./foxie-card-board";

export const metadata: Metadata = {
  title: "Bảng giá thẻ Foxie cập nhật tháng 08/2026 | Face Wash Fox",
  description:
    "Quyền lợi thẻ thành viên Foxie tháng 08/2026: dùng toàn bộ dịch vụ với giá thẻ Foxie, chia sẻ với bạn bè và người thân. Bấm vào thẻ để xem voucher và quyền lợi chi tiết.",
  alternates: {
    canonical: "https://facewashfox.com/bang-gia-the-foxie-update-thang-08-2026",
  },
};

export default function BangGiaTheFoxiePage() {
  return (
    <main className="bang-gia-foxie-page min-h-screen bg-[#f7e0c7]">
      <SiteHeader />
      <section className="px-4 pb-16 pt-28 md:px-8 md:pb-20 md:pt-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8 text-center md:mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#ea5814] md:text-base">
              Cập nhật tháng 08/2026
            </p>
            <h1 className="mt-2 text-[clamp(1.75rem,7vw,3.75rem)] font-extrabold uppercase leading-tight text-[#ea5814]">
              Bảng giá thẻ Foxie
            </h1>
            <p className="mx-auto mt-3 max-w-3xl text-sm font-medium leading-relaxed text-[#222] md:mt-4 md:text-xl">
              Đặc quyền dành riêng cho hội viên Face Wash Fox. Sử dụng tất cả dịch vụ
              với giá thẻ Foxie. Thẻ có thể chia sẻ hoặc dùng chung với bạn bè và người
              thân.
            </p>
          </div>
          <FoxieCardBoard />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
