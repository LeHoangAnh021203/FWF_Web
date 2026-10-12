"use client";

import { Download, Globe, Share2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useLanguage } from "@/i18n/language-context";
import {
  FOREIGN_MENU_LANGS,
  foreignMenus,
  isForeignMenuLang,
  parseForeignMenuLang,
  type ForeignMenuLang,
} from "@/lib/foreign-menus";

const STORAGE_KEY = "fwf-foreign-menu-lang";

const socialItems = [
  {
    label: "Zalo",
    href: "https://zalo.me/facewashfox",
    src: "https://img.icons8.com/?size=100&id=0m71tmRjlxEe&format=png&color=000000",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/facewashfox",
    src: "https://img.icons8.com/?size=100&id=118497&format=png&color=000000",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@facewashfox",
    src: "https://img.icons8.com/?size=100&id=19318&format=png&color=000000",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@facewashfox",
    src: "https://img.icons8.com/?size=100&id=118638&format=png&color=000000",
  },
  {
    label: "Email",
    href: "mailto:info@facewashfox.com",
    src: "https://img.icons8.com/?size=100&id=P7UIlhbpWzZm&format=png&color=000000",
  },
] as const;

export function ForeignMenuViewer() {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryLang = searchParams.get("lang");
  const railRef = useRef<HTMLElement | null>(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);

  const [lang, setLang] = useState<ForeignMenuLang>(() =>
    isForeignMenuLang(queryLang) ? queryLang : "zh",
  );

  useEffect(() => {
    if (isForeignMenuLang(queryLang)) {
      setLang(queryLang);
      window.localStorage.setItem(STORAGE_KEY, queryLang);
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    const detected = parseForeignMenuLang(stored, navigator.language);
    const next = detected ?? "zh";
    setLang(next);
    router.replace(`${pathname}?lang=${next}`);
  }, [pathname, queryLang, router]);

  useEffect(() => {
    if (!languageOpen && !socialOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!railRef.current?.contains(event.target as Node)) {
        setLanguageOpen(false);
        setSocialOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLanguageOpen(false);
        setSocialOpen(false);
      }
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [languageOpen, socialOpen]);

  const pdfSrc = useMemo(
    () =>
      `/menu-nuoc-ngoai/${foreignMenus[lang].file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`,
    [lang],
  );

  const selectLang = (next: ForeignMenuLang) => {
    setLang(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    router.replace(`${pathname}?lang=${next}`);
  };

  return (
    <main className="foreign-menu-page">
      <aside className="foreign-menu-rail">
        <nav ref={railRef} aria-label={t("nav.quickNav")} className="mono-vertical-menu">
          <div
            className={`mono-social-popover mono-language-popover${languageOpen ? " is-open" : ""}`}
          >
            <button
              type="button"
              aria-label={t("nav.language")}
              aria-expanded={languageOpen}
              title={t("nav.language")}
              onClick={() => {
                setLanguageOpen((open) => !open);
                setSocialOpen(false);
              }}
              className="mono-social-trigger"
            >
              <Globe aria-hidden="true" />
              <span>{t("nav.language")}</span>
            </button>

            <div
              className="mono-social-list mono-language-list"
              role="tablist"
              aria-label={t("nav.language")}
            >
              {FOREIGN_MENU_LANGS.map((id) => {
                const option = foreignMenus[id];
                const isActive = lang === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={option.label}
                    title={option.label}
                    className={`mono-language-chip${isActive ? " is-active" : ""}`}
                    onClick={() => selectLang(id)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={option.flagSrc}
                      alt=""
                      aria-hidden="true"
                      className="mono-language-chip-flag"
                    />
                    <span className="mono-language-chip-label">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <a href="/app-fwf/" aria-label={t("nav.downloadApp")} title={t("nav.downloadApp")}>
            <Download aria-hidden="true" />
            <span>{t("nav.downloadApp")}</span>
          </a>

          <i aria-hidden="true" />
          <div className={`mono-social-popover ${socialOpen ? "is-open" : ""}`}>
            <button
              type="button"
              aria-label={t("nav.openSocial")}
              aria-expanded={socialOpen}
              onClick={() => {
                setSocialOpen((open) => !open);
                setLanguageOpen(false);
              }}
              className="mono-social-trigger"
            >
              <Share2 aria-hidden="true" />
              <span>{t("nav.social")}</span>
            </button>
            <div className="mono-social-list">
              {socialItems.map(({ label, href, src }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="mono-vertical-social"
                  onClick={() => setSocialOpen(false)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" aria-hidden="true" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>
      </aside>

      <section className="foreign-menu-stage">
        <iframe
          key={lang}
          title={foreignMenus[lang].native}
          src={pdfSrc}
          className="block h-[calc(100dvh+56px)] w-[calc(100%+40px)] -translate-x-5 -translate-y-14 border-0 bg-[#ee6730]"
        />
      </section>
    </main>
  );
}
