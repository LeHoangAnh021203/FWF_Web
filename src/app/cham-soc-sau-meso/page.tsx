import type { Metadata } from "next";

import { SiteFooter, SiteHeader } from "../site-chrome";

const PAGES = [
  {
    src: "/cham-soc-sau-meso/page-1.jpg",
    alt: "Tư vấn sau các liệu trình MESO không xâm lấn: lưu ý không rửa mặt 5–6 tiếng, không tẩy tế bào chết, không tác động lên da, không dùng quá nhiều mỹ phẩm; tối hôm đó chỉ làm sạch và dưỡng ẩm",
  },
  {
    src: "/cham-soc-sau-meso/page-2.jpg",
    alt: "Sáng hôm sau sau MESO: làm sạch, dưỡng ẩm, chống nắng, skincare như hằng ngày; chế độ sinh hoạt uống nhiều nước, che chắn, hạn chế đồ ngọt, bổ sung vitamin, xịt khoáng HA, trang điểm nhẹ",
  },
] as const;

export const metadata: Metadata = {
  title: "Chăm sóc sau MESO | Face Wash Fox",
  description:
    "Hướng dẫn tư vấn sau các liệu trình MESO không xâm lấn tại Face Wash Fox: lưu ý ngay sau liệu trình, chăm sóc tối hôm đó và sáng hôm sau.",
  alternates: {
    canonical: "https://facewashfox.com/cham-soc-sau-meso",
  },
};

export default function ChamSocSauMesoPage() {
  return (
    <main className="cham-soc-sau-meso-page min-h-screen bg-[#f4bfd4]">
      <SiteHeader />
      <section className="px-4 pb-10 pt-[88px] md:px-8 md:pb-14 md:pt-28">
        <div className="mx-auto mb-6 max-w-[780px] text-center md:mb-8">
          <h1 className="page-section-title uppercase text-[#f05b2a]">
            Chăm sóc sau MESO
          </h1>
          <p className="page-section-lead mt-2 font-medium text-[#4a3428]">
            Tư vấn sau các liệu trình MESO không xâm lấn tại Face Wash Fox
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-[320px] flex-col gap-4 md:max-w-[360px] md:gap-5 lg:max-w-[780px]">
          {PAGES.map((page) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={page.src}
              src={page.src}
              alt={page.alt}
              className="block h-auto w-full rounded-xl bg-[#f8cde0] shadow-[0_10px_28px_rgba(80,40,10,0.12)]"
            />
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
