"use client";

import Link from "next/link";

import { useLanguage } from "@/i18n/language-context";

const SECTION_ITEM_COUNTS = [2, 3, 3, 3, 3, 3, 3, 2] as const;

export function TermsContent() {
  const { t } = useLanguage();

  return (
    <>
      <section className="terms-hero">
        <div>
          <h1>{t("terms.title")}</h1>
          <span>{t("terms.updated")}</span>
        </div>
        <p>{t("terms.intro")}</p>
      </section>

      <section className="terms-summary" aria-label={t("terms.summaryAria")}>
        <article>
          <span>01</span>
          <h2>{t("terms.sum.1.title")}</h2>
          <p>{t("terms.sum.1.body")}</p>
        </article>
        <article>
          <span>02</span>
          <h2>{t("terms.sum.2.title")}</h2>
          <p>{t("terms.sum.2.body")}</p>
        </article>
        <article>
          <span>03</span>
          <h2>{t("terms.sum.3.title")}</h2>
          <p>{t("terms.sum.3.body")}</p>
        </article>
      </section>

      <section className="terms-content" aria-label={t("terms.contentAria")}>
        {SECTION_ITEM_COUNTS.map((itemCount, sectionIndex) => {
          const section = sectionIndex + 1;
          return (
            <article key={section}>
              <h2>{t(`terms.s${section}.title`)}</h2>
              <ul>
                {Array.from({ length: itemCount }, (_, itemIndex) => {
                  const item = itemIndex + 1;
                  return (
                    <li key={item}>{t(`terms.s${section}.i${item}`)}</li>
                  );
                })}
              </ul>
            </article>
          );
        })}
      </section>

      <section className="terms-contact">
        <div>
          <p>{t("terms.contact.need")}</p>
          <h2>{t("terms.contact.title")}</h2>
        </div>
        <div>
          <a href="tel:0889866666">0889 866 666</a>
          <a href="mailto:info@facewashfox.com">info@facewashfox.com</a>
          <Link href="/cua-hang">{t("terms.contact.findStore")}</Link>
        </div>
      </section>
    </>
  );
}
