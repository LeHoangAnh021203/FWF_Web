"use client";

import { ChevronUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useLanguage } from "@/i18n/language-context";

export default function FloatingActions() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [showTop, setShowTop] = useState(false);

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

  const bookingHref =
    pathname === "/" ? "#dat-lich" : pathname === "/b2b" ? "#booking" : "/#dat-lich";

  return (
    <nav className="floating-actions" aria-label="Thao tác nhanh">
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
  );
}
