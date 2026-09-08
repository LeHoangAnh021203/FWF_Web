import type { Metadata } from "next";

import { SiteFooter, SiteHeader } from "../site-chrome";

const PAGES = [
  {
    src: "/cham-soc-da/page-1.jpg",
    alt: "Chăm sóc da mụn: lưu ý sau khi nặn mụn tại Face Wash Fox",
  },
  {
    src: "/cham-soc-da/page-2.jpg",
    alt: "Chế độ sinh hoạt và chăm sóc da mụn",
  },
  {
    src: "/cham-soc-da/page-3.jpg",
    alt: "Hành trình yêu thương làn da sau liệu trình peel, vi điểm không xâm lấn",
  },
  {
    src: "/cham-soc-da/page-4.jpg",
    alt: "Quy trình chăm sóc da đơn giản buổi tối và sáng hôm sau",
  },
  {
    src: "/cham-soc-da/page-5.jpg",
    alt: "Các phản ứng da thường gặp sau liệu trình và cách xử lý",
  },
  {
    src: "/cham-soc-da/page-6.jpg",
    alt: "Tư vấn sau liệu trình điện di dưỡng chất không xâm lấn — lưu ý buổi tối",
  },
  {
    src: "/cham-soc-da/page-7.jpg",
    alt: "Chăm sóc sáng hôm sau và chế độ sinh hoạt dinh dưỡng",
  },
] as const;

export const metadata: Metadata = {
  title: "Chăm sóc da FWF | Face Wash Fox",
  description:
    "Hướng dẫn chăm sóc da mụn và sau liệu trình peel, vi điểm, điện di dưỡng chất không xâm lấn tại Face Wash Fox.",
  alternates: {
    canonical: "https://facewashfox.com/cham-soc-da-fwf",
  },
};

export default function ChamSocDaFwfPage() {
  return (
    <main className="cham-soc-da-page min-h-screen bg-[#f7e0c7]">
      <SiteHeader />
      <section className="px-4 pb-10 pt-[88px] md:px-8 md:pb-14 md:pt-28">
        <div className="mx-auto mb-6 max-w-[780px] text-center md:mb-8">
          <h1 className="text-[clamp(1.5rem,5vw,2.25rem)] font-extrabold uppercase leading-tight text-[#f05b2a]">
            Chăm sóc da FWF
          </h1>
          <p className="mt-2 text-sm font-medium leading-relaxed text-[#4a3428] md:text-base">
            Hướng dẫn chăm sóc da mụn và sau liệu trình tại Face Wash Fox
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-[320px] flex-col gap-4 md:max-w-[360px] md:gap-5 lg:max-w-[780px]">
          {PAGES.map((page) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={page.src}
              src={page.src}
              alt={page.alt}
              className="block h-auto w-full rounded-xl bg-[#f6eadc] shadow-[0_10px_28px_rgba(80,40,10,0.12)]"
            />
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
