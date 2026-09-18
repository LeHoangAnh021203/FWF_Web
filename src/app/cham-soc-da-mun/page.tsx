import type { Metadata } from "next";

import { SiteFooter, SiteHeader } from "../site-chrome";

const PAGES = [
  {
    src: "/cham-soc-da-mun/page-1.jpg",
    alt: "Chăm sóc da mụn: sau khi nặn mụn cần tẩy trang dịu nhẹ, dùng sữa rửa mặt da nhạy cảm, dưỡng ẩm phục hồi, chống nắng, tránh sờ tay lên mặt, không trang điểm và hạn chế xông hơi massage tẩy tế bào chết",
  },
  {
    src: "/cham-soc-da-mun/page-2.jpg",
    alt: "Chế độ sinh hoạt và chăm sóc da mụn: vệ sinh dụng cụ trang điểm, không chạm tay lên mặt, dùng mỹ phẩm đúng tình trạng da, hạn chế đồ ngọt cay nóng và sữa bò, uống nhiều nước, ăn giàu kẽm và vitamin, thay chăn ga gối thường xuyên",
  },
] as const;

export const metadata: Metadata = {
  title: "Chăm sóc da mụn | Face Wash Fox",
  description:
    "Hướng dẫn chăm sóc da mụn tại Face Wash Fox: lưu ý sau khi nặn mụn và chế độ sinh hoạt giúp da phục hồi.",
  alternates: {
    canonical: "https://facewashfox.com/cham-soc-da-mun",
  },
};

export default function ChamSocDaMunPage() {
  return (
    <main className="cham-soc-da-mun-page min-h-screen bg-[#d8eef8]">
      <SiteHeader />
      <section className="px-4 pb-10 pt-[88px] md:px-8 md:pb-14 md:pt-28">
        <div className="mx-auto mb-6 max-w-[780px] text-center md:mb-8">
          <h1 className="page-section-title uppercase text-[#f05b2a]">
            Chăm sóc da mụn
          </h1>
          <p className="page-section-lead mt-2 font-medium text-[#4a3428]">
            Hướng dẫn sau khi nặn mụn và chế độ sinh hoạt tại Face Wash Fox
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-[320px] flex-col gap-4 md:max-w-[360px] md:gap-5 lg:max-w-[780px]">
          {PAGES.map((page) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={page.src}
              src={page.src}
              alt={page.alt}
              className="block h-auto w-full rounded-xl bg-[#cfe8f4] shadow-[0_10px_28px_rgba(40,70,100,0.12)]"
            />
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
