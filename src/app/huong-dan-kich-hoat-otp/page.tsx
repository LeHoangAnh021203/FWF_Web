import type { Metadata } from "next";

import { SiteFooter, SiteHeader } from "../site-chrome";

const PAGE_URL = "https://facewashfox.com/huong-dan-kich-hoat-otp";
const VIDEO_SRC = "/video/huong-dan-kich-hoat-otp.mp4";
const POSTER_SRC = "/video/huong-dan-kich-hoat-otp-poster.jpg";

export const metadata: Metadata = {
  title: "Hướng dẫn kích hoạt OTP | Face Wash Fox",
  description:
    "Video hướng dẫn kích hoạt OTP trên Mini App Face Wash Fox trong Zalo: tìm kiếm Face Wash Fox, mở Mini App và hoàn tất xác thực.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Hướng dẫn kích hoạt OTP | Face Wash Fox",
    description:
      "Video hướng dẫn kích hoạt OTP trên Mini App Face Wash Fox trong Zalo.",
    url: PAGE_URL,
    type: "website",
    images: [
      {
        url: `https://facewashfox.com${POSTER_SRC}`,
        width: 1080,
        height: 2338,
        alt: "Hướng dẫn mở Zalo và tìm kiếm Face Wash Fox để kích hoạt OTP",
      },
    ],
  },
};

export default function HuongDanKichHoatOtpPage() {
  return (
    <main className="min-h-screen bg-[#f7e0c7]">
      <SiteHeader />
      <section className="px-4 pb-10 pt-[88px] md:px-8 md:pb-14 md:pt-28">
        <div className="mx-auto mb-6 max-w-[780px] text-center md:mb-8">
          <h1 className="page-section-title uppercase text-[#f05b2a]">
            Hướng dẫn kích hoạt OTP
          </h1>
          <p className="page-section-lead mt-2 font-medium text-[#4a3428]">
            Xem video để kích hoạt OTP trên Mini App Face Wash Fox trong Zalo
          </p>
        </div>

        <div className="mx-auto w-full max-w-[320px] md:max-w-[360px]">
          <video
            className="block h-auto w-full rounded-xl bg-black shadow-[0_10px_28px_rgba(80,40,10,0.12)]"
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            controls
            playsInline
            preload="metadata"
            aria-label="Video hướng dẫn kích hoạt OTP trên Mini App Face Wash Fox"
          />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
