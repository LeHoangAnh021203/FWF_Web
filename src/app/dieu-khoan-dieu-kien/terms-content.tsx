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

type Paragraph = {
  kind: string;
  marker: string;
  text: string;
};

type Table = {
  kind: "table";
  rows: string[][][];
};

type Block = Paragraph | Table;

// Each translation is a parallel array to terms-document.json: a string for every
// paragraph/heading and a rows array (row → cell → paragraphs) for every table.
// Structure (kind, marker) always comes from the Vietnamese source.
type Translation = (string | string[][][])[];

const blocks = document as Block[];
const translations: Record<Exclude<SiteLanguage, "vi">, Translation> = { en, zh, ja, ko, th };

function localize(language: SiteLanguage): Block[] {
  if (language === "vi") return blocks;
  const translation = translations[language];

  return blocks.map((block, index) => {
    const value = translation[index];
    if ("rows" in block) {
      return Array.isArray(value) ? { ...block, rows: value } : block;
    }
    return typeof value === "string" ? { ...block, text: value } : block;
  });
}

export function TermsContent() {
  const { language } = useLanguage();
  const localized = localize(language);
  const title = localized.filter((block): block is Paragraph => block.kind === "title");
  const body = localized.filter((block) => block.kind !== "title");
  const htmlLang = languageOptions.find((option) => option.id === language)?.htmlLang ?? "vi";

  return (
    <article className={styles.document} lang={htmlLang}>
      <header className={styles.hero}>
        <h1 className={styles.title}>
          {title.map((paragraph, index) => (
            <span key={index}>{paragraph.text}</span>
          ))}
        </h1>
      </header>
      <div className={styles.body}>
        {body.map((block, index) => {
          if ("rows" in block) {
            const [header, ...rows] = block.rows;

            return (
              <div key={index} className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {header.map((cell, cellIndex) => (
                        <th key={cellIndex} scope="col">
                          {cell.map((text, paragraphIndex) => <p key={paragraphIndex}>{text}</p>)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>
                            {cell.map((text, paragraphIndex) => <p key={paragraphIndex}>{text}</p>)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          const Tag = block.kind === "h2" ? "h2"
            : block.kind === "h3" ? "h3"
            : block.kind === "h4" ? "h4" : "p";

          return (
            <Tag key={index} className={block.marker ? styles.numbered : undefined}>
              {block.marker && <span className={styles.marker}>{block.marker}{" "}</span>}
              <span>{block.text}</span>
            </Tag>
          );
        })}
      </div>
    </article>
  );
}
