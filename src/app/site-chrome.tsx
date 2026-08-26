"use client";

/* eslint-disable @next/next/no-img-element */

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Gift,
  Globe,
  Mail,
  MapPin,
  Menu,
  Phone,
  Share2,
  Sparkles,
  Store,
  Users,
  X,
} from "lucide-react";

import { languageOptions } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/language-context";

const navItemConfigs = [
  { key: "nav.stores", href: "/cua-hang", Icon: Store },
  { key: "nav.services", href: "/dich-vu", Icon: Sparkles },
  { key: "nav.about", href: "#story", Icon: Users },
  { key: "nav.contact", href: "#home-contact-info", Icon: Phone },
  { key: "nav.promo", href: "#news", Icon: Gift },
  { key: "nav.news", href: "/#news", Icon: Bell },
  { key: "nav.b2b", href: "/b2b", Icon: Users },
  { key: "nav.faq", href: "/faq", Icon: Bell },
] as const;

const desktopNavItemConfigs = [
  { key: "nav.services", href: "/dich-vu" },
  { key: "nav.b2b", href: "/b2b" },
  { key: "nav.stores", href: "/cua-hang" },
  { key: "nav.news", href: "/#news" },
  { key: "nav.faq", href: "/faq" },
] as const;

const hotline = "0889866666";
const displayHotline = "0889 866 666";

const desktopMapHref = "/cua-hang";
const desktopContactHref = `tel:${hotline}`;

const verticalSocialItems = [
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

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/facewashfox",
    src: "https://img.icons8.com/?size=100&id=118497&format=png&color=000000",
    footerSrc: "https://cdn.simpleicons.org/facebook/white",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@facewashfox",
    src: "https://img.icons8.com/?size=100&id=19318&format=png&color=000000",
    footerSrc: "https://cdn.simpleicons.org/youtube/white",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/facewashfox",
    src: "https://img.icons8.com/?size=100&id=32323&format=png&color=000000",
    footerSrc: "https://cdn.simpleicons.org/instagram/white",
  },
  {
    label: "Tik tok",
    href: "https://www.tiktok.com/@facewashfox",
    src: "https://img.icons8.com/?size=100&id=118638&format=png&color=000000",
    footerSrc: "https://cdn.simpleicons.org/tiktok/white",
  },
  {
    label: "Zalo",
    href: "https://zalo.me/facewashfox",
    src: "https://img.icons8.com/?size=100&id=0m71tmRjlxEe&format=png&color=000000",
    footerSrc: "https://cdn.simpleicons.org/zalo/white",
  },
];

const footerColumnConfigs = [
  {
    titleKey: "footer.overview",
    links: [
      { labelKey: "nav.home", href: "/#hero" },
      { labelKey: "footer.aboutUs", href: "/#story" },
      { labelKey: "footer.contact", href: "/#home-contact-info" },
    ],
  },
  {
    titleKey: "footer.links",
    links: [
      { labelKey: "nav.services", href: "/dich-vu" },
      { labelKey: "footer.news", href: "/#news" },
      { labelKey: "nav.stores", href: "/cua-hang" },
    ],
  },
  {
    titleKey: "footer.policy",
    links: [
      { labelKey: "nav.faq", href: "/faq" },
      { labelKey: "footer.terms", href: "/dieu-khoan-dieu-kien" },
    ],
  },
] as const;

const resolveHomeAnchor = (href: string, home: boolean) => {
  if (!href.startsWith("#")) return href;
  return home ? href : `/${href}`;
};

export function SocialLinks({ footer = false }: { footer?: boolean }) {
  return (
    <div className={`social-row ${footer ? "is-footer-social" : ""}`}>
      {socials.map(({ label, href, src }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
          <span aria-hidden="true">
            <img src={src} alt="" />
          </span>
        </a>
      ))}
    </div>
  );
}

export function VerticalMenu() {
  const { language, setLanguage, t } = useLanguage();
  const [socialOpen, setSocialOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!languageOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!languageRef.current?.contains(event.target as Node)) {
        setLanguageOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLanguageOpen(false);
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [languageOpen]);

  return (
    <nav aria-label={t("nav.quickNav")} className="mono-vertical-menu">
      <div
        ref={languageRef}
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

        <div className="mono-social-list mono-language-list" role="tablist" aria-label={t("nav.language")}>
          {languageOptions.map((option) => {
            const isActive = language === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={option.label}
                title={option.label}
                className={`mono-language-chip${isActive ? " is-active" : ""}`}
                onClick={() => {
                  setLanguage(option.id);
                }}
              >
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
          {verticalSocialItems.map(({ label, href, src }) => (
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
              <img src={src} alt="" aria-hidden="true" />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function SiteHeader({ home = false }: { home?: boolean }) {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const solidAtTopPages = ["/b2b", "/cua-hang", "/cookie-policy", "/dich-vu", "/tin-tuc", "/faq"];
  const solidHeader =
    scrolled ||
    solidAtTopPages.includes(pathname) ||
    pathname.startsWith("/tin-tuc");

  const desktopNavItems = desktopNavItemConfigs.map(({ key, href }) => ({
    label: t(key),
    href,
  }));
  const navItems = navItemConfigs.map(({ key, href }) => ({
    label: t(key),
    href,
  }));

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 24);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const brandHref = home ? "#hero" : "/";

  return (
    <header
      className={`mono-header ${solidHeader ? "is-solid" : "is-transparent"}`}
    >
      <div className="mono-nav-shell">
        <a className="mono-brand" href={brandHref}>
          <img src="/logo/fwf-orange.png" alt="Face Wash Fox" />
        </a>
        <nav className="mono-nav-main" aria-label="Main navigation">
          {desktopNavItems.map(({ label, href }) => (
            <a href={resolveHomeAnchor(href, home)} key={href}>
              <span>{label}</span>
            </a>
          ))}
        </nav>
        <div className="mono-header-actions">
          <a className="mono-header-pill mono-header-pill--ghost" href={desktopMapHref}>
            {t("nav.map")}
          </a>
          <a
            className="mono-header-pill mono-header-pill--cta"
            href={desktopContactHref}
          >
            {t("nav.contactCta")}
          </a>
          <button
            type="button"
            className="mono-menu-trigger"
            aria-label={t("nav.openMenu")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu aria-hidden="true" />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="mono-mobile-menu" role="dialog" aria-modal="true">
          <div className="mono-mobile-menu-head">
            <a className="mono-mobile-brand" href={brandHref} onClick={() => setMenuOpen(false)}>
              <img src="/logo/fwf-orange.png" alt="Face Wash Fox" />
            </a>
            <button
              type="button"
              aria-label={t("nav.closeMenu")}
              className="mono-mobile-close"
              onClick={() => setMenuOpen(false)}
            >
              <X aria-hidden="true" />
            </button>
          </div>

          <div className="mono-mobile-menu-body">
            <div className="mono-mobile-main">
              <div className="mono-mobile-language" aria-label={t("nav.language")}>
                {languageOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={language === option.id ? "is-active" : undefined}
                    aria-pressed={language === option.id}
                    aria-label={option.label}
                    title={option.label}
                    onClick={() => setLanguage(option.id)}
                  >
                    <img src={option.flagSrc} alt="" aria-hidden="true" />
                    <span>{option.short}</span>
                  </button>
                ))}
              </div>
              <nav className="mono-mobile-links" aria-label={t("nav.mobileNav")}>
                {navItems.map(({ label, href }) => (
                  <a
                    key={href}
                    href={resolveHomeAnchor(href, home)}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            <aside className="mono-mobile-aside">
              <a href={`tel:${hotline}`} onClick={() => setMenuOpen(false)}>
                <Phone aria-hidden="true" />
                <span>{displayHotline}</span>
              </a>
              <a href="mailto:info@facewashfox.com" onClick={() => setMenuOpen(false)}>
                <Mail aria-hidden="true" />
                <span>info@facewashfox.com</span>
              </a>
              <a href="/cua-hang" onClick={() => setMenuOpen(false)}>
                <MapPin aria-hidden="true" />
                <span>{t("nav.findStore")}</span>
              </a>
              <SocialLinks />
            </aside>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter({ home = false }: { home?: boolean }) {
  const { t } = useLanguage();

  return (
    <footer className="mono-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <strong>{t("footer.tagline")}</strong>
          <p>{t("footer.about")}</p>
        </div>

        <div className="footer-link-columns">
          {footerColumnConfigs.map(({ titleKey, links }) => (
            <div key={titleKey}>
              <h3>{t(titleKey)}</h3>
              <ul>
                {links.map(({ labelKey, href }) => (
                  <li key={labelKey}>
                    <a href={resolveHomeAnchor(href, home)}>{t(labelKey)}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <address id="home-contact-info" className="footer-contact">
          <h3>{t("footer.contact")}</h3>
          <a href={`tel:${hotline}`}>
            <Phone aria-hidden="true" />
            {displayHotline}
          </a>
          <p>
            <MapPin aria-hidden="true" />
            {t("footer.address")}
          </p>
          <div className="footer-follow">
            <SocialLinks footer />
          </div>
        </address>
      </div>
      <img
        className="footer-fox"
        src="/footer-icons.png"
        alt="Face Wash Fox icons"
      />
      <div className="footer-bottom">
        <p className="footer-bottom-email">
          <Mail aria-hidden="true" />
          <a href="mailto:info@facewashfox.com">info@facewashfox.com</a>
        </p>
        <p className="footer-copyright">© 2026 Face Wash Fox</p>
      </div>
    </footer>
  );
}
