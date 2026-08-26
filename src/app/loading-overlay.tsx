"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";

import { useLanguage } from "@/i18n/language-context";

export default function LoadingOverlay() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const startedAt = Date.now();
    let timeoutId: ReturnType<typeof setTimeout>;
    const fallbackTimeoutId = setTimeout(() => setIsVisible(false), 2600);

    const hide = () => {
      const remaining = Math.max(0, 2200 - (Date.now() - startedAt));
      timeoutId = setTimeout(() => setIsVisible(false), remaining);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
    }

    return () => {
      window.removeEventListener("load", hide);
      clearTimeout(timeoutId);
      clearTimeout(fallbackTimeoutId);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="loading-overlay" role="status" aria-live="polite">
      <div className="loading-card">
        <div className="loading-logo-wrap" aria-hidden="true">
          <div className="loading-logo-ring">
            <img src="/logo/logo.png" alt="" />
          </div>
        </div>
        <div className="loading-copy">
          <p>Face Wash Fox</p>
          <h2>{t("home.loading.intro")}</h2>
          <div>
            <span>{t("home.loading.status")}</span>
            <i aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
