"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

const COOKIE_CHOICE_KEY = "fwf-cookie-policy-choice";
const COOKIE_CHOICE_EVENT = "fwf-cookie-policy-choice-change";

const subscribeToCookieChoice = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(COOKIE_CHOICE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(COOKIE_CHOICE_EVENT, callback);
  };
};

const getCookieChoiceSnapshot = () => !localStorage.getItem(COOKIE_CHOICE_KEY);

export default function CookiePolicyBanner() {
  const isVisible = useSyncExternalStore(
    subscribeToCookieChoice,
    getCookieChoiceSnapshot,
    () => false,
  );

  const saveChoice = (choice: "accepted" | "declined" | "closed") => {
    localStorage.setItem(COOKIE_CHOICE_KEY, choice);
    window.dispatchEvent(new Event(COOKIE_CHOICE_EVENT));
  };

  if (!isVisible) {
    return null;
  }

  return (
    <section className="cookie-policy-banner" aria-label="Cookie Policy">
      <button
        aria-label="Đóng thông báo Cookie Policy"
        className="cookie-close"
        onClick={() => saveChoice("closed")}
        type="button"
      >
        x
      </button>
      <div className="cookie-policy-content">
        <h2>Cookie Policy</h2>
        <p>
          Face Wash Fox sử dụng cookie để hiểu cách bạn dùng website, cải thiện
          trải nghiệm đặt lịch và tối ưu nội dung dịch vụ. Bạn có thể xem thêm
          tại <Link href="/cookie-policy">Chính sách Cookie</Link>.
        </p>
        <div className="cookie-actions">
          <button onClick={() => saveChoice("declined")} type="button">
            Từ chối
          </button>
          <button onClick={() => saveChoice("accepted")} type="button">
            Đồng ý
          </button>
        </div>
      </div>
    </section>
  );
}
