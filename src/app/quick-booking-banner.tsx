"use client";

import { ArrowRight, Check, Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";

import { useLanguage } from "@/i18n/language-context";
import { PrivacyConsent } from "@/components/privacy-consent";

type SubmitState = "idle" | "loading" | "success" | "error";

const VN_PHONE = /^(0[35789])[0-9]{8}$/;

export default function QuickBookingBanner() {
  const { t } = useLanguage();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const resetStatus = () => {
    if (submitState !== "idle" && submitState !== "loading") {
      setSubmitState("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const name = fullName.trim();
    const phoneNumber = phone.replace(/\s+/g, "");

    if (name.length < 2) {
      setSubmitState("error");
      setErrorMessage(t("booking.nameError"));
      return;
    }

    if (!VN_PHONE.test(phoneNumber)) {
      setSubmitState("error");
      setErrorMessage(t("booking.phoneError"));
      return;
    }

    if (!privacyConsent) {
      setSubmitState("error");
      setErrorMessage(t("consent.required"));
      return;
    }

    setSubmitState("loading");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType: "booking",
          fullName: name,
          phone: phoneNumber,
          note: "Đăng ký nhanh từ banner trang chủ",
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error || t("booking.fail"));
      }

      setFullName("");
      setPhone("");
      setPrivacyConsent(false);
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(
        error instanceof Error ? error.message : t("booking.genericError"),
      );
    }
  };

  const ctaState =
    submitState === "loading"
      ? "loading"
      : submitState === "success"
        ? "success"
        : "idle";

  return (
    <section
      id="dat-lich"
      className="quick-booking-section"
      aria-labelledby="quick-booking-heading"
    >
      <div className="quick-booking-stage">
        <form
          className={`quick-booking-banner${submitState === "error" ? " is-error" : ""}`}
          onSubmit={handleSubmit}
        >
          <div className="quick-booking-copy">
            <h2 id="quick-booking-heading">{t("booking.title")}</h2>
          </div>

          <label
            className="quick-booking-field quick-booking-field--name"
            htmlFor="quick-booking-name"
          >
            <span className="sr-only">{t("booking.nameLabel")}</span>
            <input
              id="quick-booking-name"
              name="fullName"
              type="text"
              placeholder={t("booking.namePlaceholder")}
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value);
                resetStatus();
              }}
              autoComplete="name"
            />
          </label>

          <label
            className="quick-booking-field quick-booking-field--phone"
            htmlFor="quick-booking-phone"
          >
            <span className="sr-only">{t("booking.phoneLabel")}</span>
            <input
              id="quick-booking-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              placeholder={t("booking.phonePlaceholder")}
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
                resetStatus();
              }}
              autoComplete="tel"
            />
          </label>

          <button
            type="submit"
            className={`quick-booking-cta is-${ctaState}`}
            disabled={submitState === "loading"}
          >
            <span className="quick-booking-cta-label">
              {submitState === "loading" ? (
                <>
                  <Loader2 className="quick-booking-spinner" aria-hidden="true" />
                  {t("booking.sending")}
                </>
              ) : submitState === "success" ? (
                <>
                  <Check aria-hidden="true" />
                  {t("booking.success")}
                </>
              ) : (
                t("booking.ctaCollapsed")
              )}
            </span>
            {submitState === "idle" ? (
              <span className="quick-booking-cta-arrow" aria-hidden="true">
                <ArrowRight />
              </span>
            ) : null}
          </button>

          <PrivacyConsent
            id="quick-booking-consent"
            checked={privacyConsent}
            onChange={(checked) => {
              setPrivacyConsent(checked);
              resetStatus();
            }}
            className="quick-booking-consent"
          />

          {submitState === "success" ? (
            <p className="quick-booking-status is-success" role="status">
              {t("booking.success")}
            </p>
          ) : null}
          {submitState === "error" ? (
            <p className="quick-booking-status is-error" role="alert">
              {errorMessage}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
