"use client";

import Link from "next/link";

import { useLanguage } from "@/i18n/language-context";

export default function CookiePolicyPage() {
  const { t } = useLanguage();

  return (
    <main className="policy-page">
      <Link href="/">Face Wash Fox</Link>
      <h1>{t("cookiePage.title")}</h1>
      <p>{t("cookiePage.intro")}</p>
      <section>
        <h2>{t("cookiePage.s1.title")}</h2>
        <p>{t("cookiePage.s1.body")}</p>
      </section>
      <section>
        <h2>{t("cookiePage.s2.title")}</h2>
        <p>{t("cookiePage.s2.body")}</p>
      </section>
      <section>
        <h2>{t("cookiePage.s3.title")}</h2>
        <p>{t("cookiePage.s3.body")}</p>
      </section>
    </main>
  );
}
