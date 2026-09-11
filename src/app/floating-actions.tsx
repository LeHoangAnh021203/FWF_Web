"use client";

import { ChevronUp, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useLanguage } from "@/i18n/language-context";

import ConsultationBookingModal from "./consultation-booking-modal";

const ZALO_OA_HREF = "https://zalo.me/352472932154112250";
const ZALO_OA_ICON =
  "https://img.icons8.com/?size=96&id=0m71tmRjlxEe&format=png";
const HOTLINE = "0889866666";

export default function FloatingActions() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [showTop, setShowTop] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const update = () => setShowTop(window.scrollY > 280);
    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => window.removeEventListener("scroll", update);
  }, []);

  if (
    pathname === "/cua-hang" ||
    pathname === "/bang-gia-the-foxie-update-thang-08-2026"
  ) {
    return null;
  }

  const usePageBooking = pathname === "/b2b";
  const bookingHref = "#booking";

  return (
    <>
      <nav className="floating-actions" aria-label="Thao tác nhanh">
        {usePageBooking ? (
          <a
            className="floating-actions-btn floating-actions-book"
            href={bookingHref}
            aria-label={t("float.bookNow")}
          >
            <span>
              {t("float.bookLine1")}
              <br />
              {t("float.bookLine2")}
            </span>
          </a>
        ) : (
          <button
            type="button"
            className="floating-actions-btn floating-actions-book"
            aria-label={t("float.bookNow")}
            aria-haspopup="dialog"
            aria-expanded={bookingOpen}
            onClick={() => setBookingOpen(true)}
          >
            <span>
              {t("float.bookLine1")}
              <br />
              {t("float.bookLine2")}
            </span>
          </button>
        )}
        <a
          className="floating-actions-btn floating-actions-zalo"
          href={ZALO_OA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("float.zalo")}
        >
          <img src={ZALO_OA_ICON} alt="" />
        </a>
        <a
          className="floating-actions-btn"
          href={`tel:${HOTLINE}`}
          aria-label={t("float.hotline")}
        >
          <Phone strokeWidth={2.4} aria-hidden="true" />
        </a>
        <button
          type="button"
          className={`floating-actions-btn floating-actions-top${showTop ? " is-visible" : ""}`}
          aria-label={t("float.backTop")}
          tabIndex={showTop ? 0 : -1}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ChevronUp strokeWidth={2.6} aria-hidden="true" />
        </button>
      </nav>
      {usePageBooking ? null : (
        <ConsultationBookingModal
          open={bookingOpen}
          onClose={() => setBookingOpen(false)}
        />
      )}
    </>
  );
}
