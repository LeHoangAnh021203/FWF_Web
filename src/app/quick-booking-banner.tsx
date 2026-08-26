"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Loader2, Phone, User } from "lucide-react";
import Image from "next/image";
import { FormEvent, PointerEvent, useEffect, useRef, useState } from "react";

import { useLanguage } from "@/i18n/language-context";

type SubmitState = "idle" | "loading" | "success" | "error";

const VN_PHONE = /^(0[35789])[0-9]{8}$/;

const labelMotion = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function QuickBookingBanner() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!expanded) return;

    const timer = window.setTimeout(
      () => nameRef.current?.focus(),
      prefersReducedMotion ? 0 : 720,
    );

    return () => window.clearTimeout(timer);
  }, [expanded, prefersReducedMotion]);

  const updateGlow = (event: PointerEvent<HTMLFormElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--glow-x",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--glow-y",
      `${event.clientY - rect.top}px`,
    );
  };

  const resetStatus = () => {
    if (submitState !== "idle" && submitState !== "loading") {
      setSubmitState("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!expanded) {
      setSubmitState("idle");
      setErrorMessage("");
      setExpanded(true);
      return;
    }

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

    setSubmitState("loading");

    try {
      // Preview success UX locally — no real booking is sent.
      const simulateSuccess = process.env.NODE_ENV !== "production";

      if (simulateSuccess) {
        await new Promise((resolve) => window.setTimeout(resolve, 700));
      } else {
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
      }

      setFullName("");
      setPhone("");
      setExpanded(false);
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(
        error instanceof Error ? error.message : t("booking.genericError"),
      );
    }
  };

  const ctaKey =
    submitState === "loading"
      ? "loading"
      : submitState === "success" && !expanded
        ? "success"
        : "idle";

  return (
    <section
      id="dat-lich"
      className="quick-booking-section"
      aria-labelledby="quick-booking-heading"
    >
      <div className="quick-booking-stage">
        <div className="quick-booking-banner">
          <div className="quick-booking-rings" aria-hidden="true" />

          <div className="quick-booking-copy">
            <h2 id="quick-booking-heading">{t("booking.title")}</h2>
            <p>{t("booking.subtitle")}</p>
          </div>

          <div className="quick-booking-form-wrap">
            <div className="quick-booking-form-shell">
              <div className="quick-booking-fox-sleep" aria-hidden="true">
                <Image
                  src="/quick-booking/fox-sleep.png"
                  alt=""
                  width={720}
                  height={426}
                  sizes="96px"
                />
              </div>
              <motion.form
            className={`quick-booking-form ${expanded ? "is-expanded" : "is-collapsed"}${submitState === "error" ? " is-error" : ""}`}
            onSubmit={handleSubmit}
            onPointerMove={updateGlow}
            onPointerEnter={updateGlow}
            animate={
              submitState === "error" && expanded && !prefersReducedMotion
                ? { x: [0, -7, 7, -5, 5, 0] }
                : { x: 0 }
            }
            transition={{ duration: prefersReducedMotion ? 0 : 0.42, ease: "easeOut" }}
          >
            <div className="quick-booking-fields" aria-hidden={!expanded}>
              <div className="quick-booking-fields-inner">
                <label className="quick-booking-field" htmlFor="quick-booking-name">
                  <span className="sr-only">{t("booking.nameLabel")}</span>
                  <User aria-hidden="true" />
                  <input
                    ref={nameRef}
                    id="quick-booking-name"
                    name="fullName"
                    type="text"
                    placeholder={t("booking.namePlaceholder")}
                    value={fullName}
                    tabIndex={expanded ? 0 : -1}
                    onChange={(event) => {
                      setFullName(event.target.value);
                      resetStatus();
                    }}
                    autoComplete="name"
                  />
                </label>

                <label className="quick-booking-field" htmlFor="quick-booking-phone">
                  <span className="sr-only">{t("booking.phoneLabel")}</span>
                  <Phone aria-hidden="true" />
                  <input
                    id="quick-booking-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    placeholder={t("booking.phonePlaceholder")}
                    value={phone}
                    tabIndex={expanded ? 0 : -1}
                    onChange={(event) => {
                      setPhone(event.target.value);
                      resetStatus();
                    }}
                    autoComplete="tel"
                  />
                </label>
              </div>
            </div>

            <motion.button
              type="submit"
              className={`quick-booking-cta is-${ctaKey}`}
              disabled={submitState === "loading"}
              aria-expanded={expanded}
              whileHover={
                submitState === "loading"
                  ? undefined
                  : { scale: prefersReducedMotion ? 1 : 1.03 }
              }
              whileTap={
                submitState === "loading"
                  ? undefined
                  : { scale: prefersReducedMotion ? 1 : 0.97 }
              }
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
            >
              <span className="quick-booking-cta-sheen" aria-hidden="true" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={ctaKey}
                  className="quick-booking-cta-label"
                  initial={prefersReducedMotion ? false : labelMotion.initial}
                  animate={labelMotion.animate}
                  exit={prefersReducedMotion ? undefined : labelMotion.exit}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  {submitState === "loading" ? (
                    <>
                      <Loader2 className="quick-booking-spinner" aria-hidden="true" />
                      {t("booking.sending")}
                    </>
                  ) : submitState === "success" && !expanded ? (
                    <>
                      <Check aria-hidden="true" />
                      {t("booking.success")}
                    </>
                  ) : (
                    t("booking.ctaCollapsed")
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </motion.form>
            </div>

          {submitState === "success" && !expanded ? (
            <p className="quick-booking-status is-success" role="status">
              {t("booking.success")}
            </p>
          ) : null}
          {submitState === "error" && expanded ? (
            <p className="quick-booking-status is-error" role="alert">
              {errorMessage}
            </p>
          ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
