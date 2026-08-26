"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import { useLanguage } from "@/i18n/language-context";

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
  const { t } = useLanguage();
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
    <section className="cookie-policy-banner" aria-label={t("cookie.title")}>
      <button
        aria-label={t("cookie.close")}
        className="cookie-close"
        onClick={() => saveChoice("closed")}
        type="button"
      >
        x
      </button>
      <div className="cookie-policy-content">
        <h2>{t("cookie.title")}</h2>
        <p>
          {t("cookie.body")}{" "}
          <Link href="/cookie-policy">{t("cookie.link")}</Link>.
        </p>
        <div className="cookie-actions">
          <button onClick={() => saveChoice("declined")} type="button">
            {t("cookie.decline")}
          </button>
          <button onClick={() => saveChoice("accepted")} type="button">
            {t("cookie.accept")}
          </button>
        </div>
      </div>
    </section>
  );
}
