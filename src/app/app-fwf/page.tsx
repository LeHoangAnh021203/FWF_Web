import type { Metadata } from "next";
import Image from "next/image";

import { SiteFooter, SiteHeader } from "../site-chrome";

const APP_STORE_URL = "https://apps.apple.com/us/app/face-wash-fox/id6469272056";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=vn.facewashfox";

export const metadata: Metadata = {
  title: "Tải app Face Wash Fox",
  description:
    "Tải ứng dụng Face Wash Fox trên App Store (iOS) hoặc Google Play (Android) để đặt lịch và chăm sóc da dễ dàng hơn.",
  alternates: {
    canonical: "https://facewashfox.com/app-fwf",
  },
};

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="app-fwf-store-icon">
      <path d="M16.365 1.43c0 1.14-.42 2.2-1.18 3.01-.8.86-2.12 1.52-3.23 1.43-.13-1.1.4-2.26 1.16-3.05.8-.86 2.18-1.5 3.25-1.39zM20.9 17.48c-.58 1.33-.86 1.92-1.61 3.1-1.04 1.59-2.5 3.57-4.32 3.59-1.61.03-2.03-1.05-4.22-1.04-2.2.01-2.66 1.07-4.27 1.04-1.82-.03-3.21-1.8-4.25-3.39-2.9-4.42-3.21-9.62-1.42-12.36 1.27-1.95 3.28-3.09 5.17-3.09 1.92 0 3.13 1.07 4.72 1.07 1.54 0 2.48-1.08 4.7-1.08 1.68 0 3.46.92 4.72 2.5-4.15 2.28-3.48 8.22.78 9.66z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="app-fwf-store-icon">
      <path d="M3.6 2.7c-.3.2-.5.6-.5 1.1v16.4c0 .5.2.9.5 1.1l9.7-9.3L3.6 2.7zm11.1 6.2L5.7 2.3l11.2 6.5-2.2.1zm.7 6.5 2.2.1L5.7 21.7l9.7-6.3zM16.5 9.7l3.5 2c.7.4.7 1.1 0 1.5l-3.5 2-2.5-2.4 2.5-3.1z" />
    </svg>
  );
}

export default function AppFwfPage() {
  return (
    <main className="app-fwf-page min-h-screen bg-[radial-gradient(circle_at_top,#ffe0c4_0%,#fff7ef_42%,#ffffff_100%)]">
      <SiteHeader />
      <section className="mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-xl flex-col items-center justify-center px-5 pb-10 pt-24 text-center md:min-h-[calc(100svh-5rem)] md:pt-28">


        <h1 className="mt-2 text-[clamp(1.6rem,5.5vw,2.75rem)] font-extrabold leading-tight text-[#1f1f1f] md:mt-3">
          Tải ứng dụng
        </h1>
        <p className="mt-2 max-w-md text-[0.95rem] font-medium leading-relaxed text-[#5c4a3d] md:mt-3 md:text-lg">
          Chọn nền tảng của bạn để tải app <br></br> Face Wash Fox và đặt lịch chăm sóc da <br></br> dễ dàng hơn.
        </p>

        <div className="app-fwf-store-links mt-6 flex w-full max-w-xl flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:justify-center">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="app-fwf-store-btn"
          >
            <AppleIcon />
            <span className="app-fwf-store-btn-copy">
              <span className="app-fwf-store-btn-eyebrow">Tải trên</span>
              <span className="app-fwf-store-btn-label">App Store</span>
            </span>
          </a>

          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="app-fwf-store-btn"
          >
            <PlayIcon />
            <span className="app-fwf-store-btn-copy">
              <span className="app-fwf-store-btn-eyebrow">Tải trên</span>
              <span className="app-fwf-store-btn-label">Google Play</span>
            </span>
          </a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
