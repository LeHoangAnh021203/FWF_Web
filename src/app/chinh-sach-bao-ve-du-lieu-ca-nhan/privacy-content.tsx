"use client";

import Link from "next/link";

import { useLanguage } from "@/i18n/language-context";

const SECTION_COUNT = 9;

export function PrivacyContent() {
  const { t } = useLanguage();

  return (
    <>
      <section className="terms-hero">
        <div>
          <h1>{t("privacy.title")}</h1>
          <span>{t("privacy.updated")}</span>
        </div>
        <p>{t("privacy.intro")}</p>
      </section>

      <section className="terms-content" aria-label={t("privacy.contentAria")}>
        {Array.from({ length: SECTION_COUNT }, (_, index) => {
          const section = index + 1;
          return (
            <article key={section}>
              <h2>{t(`privacy.s${section}.title`)}</h2>
              <p>{t(`privacy.s${section}.body`)}</p>
            </article>
          );
        })}
      </section>

      <section className="terms-contact">
        <div>
          <p>{t("privacy.contact.need")}</p>
          <h2>{t("privacy.contact.title")}</h2>
        </div>
        <div>
          <a href="tel:0889866666">0889 866 666</a>
          <a href="mailto:info@facewashfox.com">info@facewashfox.com</a>
          <Link href="/dieu-khoan-dieu-kien">{t("footer.terms")}</Link>
        </div>
      </section>
    </>
  );
}
