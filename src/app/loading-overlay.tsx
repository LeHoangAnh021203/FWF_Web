"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";

const introText =
  "Face Wash Fox (Cáo Rửa Mặt) là chuỗi cửa hàng rửa mặt công nghệ, chăm sóc da chuyên nghiệp lần đầu xuất hiện tại Việt Nam";

export default function LoadingOverlay() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const startedAt = Date.now();
    let timeoutId: ReturnType<typeof setTimeout>;
    const fallbackTimeoutId = setTimeout(() => setIsVisible(false), 2600);

    const hide = () => {
      const remaining = Math.max(0, 2200 - (Date.now() - startedAt));
      timeoutId = setTimeout(() => setIsVisible(false), remaining);
    };

    document.body.classList.add("is-loading");

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
    }

    return () => {
      window.removeEventListener("load", hide);
      clearTimeout(timeoutId);
      clearTimeout(fallbackTimeoutId);
      document.body.classList.remove("is-loading");
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      document.body.classList.remove("is-loading");
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="loading-overlay" role="status" aria-live="polite">
      <div className="loading-card">
        <div className="loading-logo-wrap" aria-hidden="true">
          <div className="loading-logo-ring">
            <img
              src="/logo/logo.png"
              alt=""
            />
          </div>
        </div>
        <div className="loading-copy">
          <p>Face Wash Fox</p>
          <h2>{introText}</h2>
          <div>
            <span>Đang tải</span>
            <i aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
