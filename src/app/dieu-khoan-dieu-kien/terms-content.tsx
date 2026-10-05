"use client";

import { languageOptions, type SiteLanguage } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/language-context";

import document from "./terms-document.json";
import en from "./terms-en.json";
import zh from "./terms-zh.json";
import ja from "./terms-ja.json";
import ko from "./terms-ko.json";
import th from "./terms-th.json";
import styles from "./terms-content.module.css";

// Each translation follows the DOCX paragraph order; structure stays in the source.
const translations: Record<Exclude<SiteLanguage, "vi">, string[]> = { en, zh, ja, ko, th };

export function TermsContent() {
  const { language } = useLanguage();
  const paragraphs = language === "vi" ? document : document.map((paragraph, index) => ({
    ...paragraph,
    text: translations[language][index] ?? paragraph.text,
  }));
  const title = paragraphs.filter((paragraph) => paragraph.kind === "title");
  const body = paragraphs.filter((paragraph) => paragraph.kind !== "title");
  const htmlLang = languageOptions.find((option) => option.id === language)?.htmlLang ?? "vi";

  return (
    <article className={styles.document} lang={htmlLang}>
      <h1 className={styles.title}>
        {title.map((paragraph, index) => (
          <span key={index}>{paragraph.text}</span>
        ))}
      </h1>
      {body.map((paragraph, index) => {
        const Tag = paragraph.kind === "h2" ? "h2"
          : paragraph.kind === "h3" ? "h3"
          : paragraph.kind === "h4" ? "h4" : "p";

        return (
          <Tag key={index} className={paragraph.marker ? styles.numbered : undefined}>
            {paragraph.marker && <span className={styles.marker}>{paragraph.marker}{" "}</span>}
            <span>{paragraph.text}</span>
          </Tag>
        );
      })}
    </article>
  );
}
