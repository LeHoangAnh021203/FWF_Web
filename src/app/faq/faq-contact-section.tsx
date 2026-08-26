"use client";

import { FormEvent, useState } from "react";
import { ChevronDown } from "lucide-react";

import { faqCategories } from "@/data/faq";
import { useLanguage } from "@/i18n/language-context";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function FaqContactSection() {
  const { t } = useLanguage();
  const [openCategory, setOpenCategory] = useState("");
  const [openQuestion, setOpenQuestion] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType: "quote",
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          note: message.trim(),
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error || t("faq.fail"));
      }

      setSubmitState("success");
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(
        error instanceof Error ? error.message : t("faq.error"),
      );
    }
  };

  return (
    <section className="faq-shell" aria-labelledby="faq-heading">
      <div className="faq-card">
        <div className="faq-card-left">
          <h1 id="faq-heading">{t("faq.heading")}</h1>
          <p className="faq-card-lead">
            {t("faq.leadBefore")}
            <a href="/dich-vu">{t("faq.leadLink")}</a>
            {t("faq.leadAfter")}
          </p>

          <ul className="faq-category-list">
            {faqCategories.map((category) => {
              const isCategoryOpen = openCategory === category.id;

              return (
                <li
                  key={category.id}
                  className={isCategoryOpen ? "faq-category is-open" : "faq-category"}
                >
                  <button
                    type="button"
                    className="faq-category-trigger"
                    aria-expanded={isCategoryOpen}
                    onClick={() => {
                      setOpenCategory(isCategoryOpen ? "" : category.id);
                      setOpenQuestion("");
                    }}
                  >
                    <span>{t(category.titleKey)}</span>
                    <ChevronDown aria-hidden="true" />
                  </button>

                  <div className="faq-category-panel">
                    <ul className="faq-accordion">
                      {category.items.map((item) => {
                        const id = `${category.id}::${item.qKey}`;
                        const isOpen = openQuestion === id;

                        return (
                          <li key={id} className={isOpen ? "is-open" : undefined}>
                            <button
                              type="button"
                              aria-expanded={isOpen}
                              onClick={() => setOpenQuestion(isOpen ? "" : id)}
                            >
                              <span>{t(item.qKey)}</span>
                              <ChevronDown aria-hidden="true" />
                            </button>
                            <div className="faq-accordion-panel">
                              <p>{t(item.aKey)}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="faq-card-right">
          <h2>{t("faq.contactTitle")}</h2>
          <p>{t("faq.contactLead")}</p>

          <form className="faq-contact-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="faq-name">
              {t("faq.name")}
            </label>
            <input
              id="faq-name"
              name="fullName"
              type="text"
              required
              placeholder={t("faq.name")}
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              autoComplete="name"
            />

            <label className="sr-only" htmlFor="faq-email">
              {t("faq.email")}
            </label>
            <input
              id="faq-email"
              name="email"
              type="email"
              required
              placeholder={t("faq.email")}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />

            <label className="sr-only" htmlFor="faq-phone">
              {t("faq.phone")}
            </label>
            <input
              id="faq-phone"
              name="phone"
              type="tel"
              required
              placeholder={t("faq.phone")}
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              autoComplete="tel"
            />

            <label className="sr-only" htmlFor="faq-message">
              {t("faq.message")}
            </label>
            <textarea
              id="faq-message"
              name="message"
              required
              rows={5}
              placeholder={t("faq.message")}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />

            <button type="submit" disabled={submitState === "loading"}>
              {submitState === "loading" ? t("faq.sending") : t("faq.submit")}
            </button>

            {submitState === "success" ? (
              <p className="faq-form-status is-success" role="status">
                {t("faq.success")}
              </p>
            ) : null}
            {submitState === "error" ? (
              <p className="faq-form-status is-error" role="alert">
                {errorMessage}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
