"use client";

/* eslint-disable @next/next/no-img-element */

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Bell,
  Gift,
  Handshake,
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

const navItems = [
  { label: "Cửa hàng", href: "/cua-hang", Icon: Store, mobileColumn: 0 },
  { label: "Dịch vụ", href: "/dich-vu", Icon: Sparkles, mobileColumn: 0 },
  { label: "Giới thiệu", href: "#story", Icon: Users, mobileColumn: 0 },
  { label: "Liên hệ", href: "#home-contact-info", Icon: Phone, mobileColumn: 1 },
  { label: "Khuyến mãi", href: "#news", Icon: Gift, mobileColumn: 1 },
  { label: "B2B", href: "/b2b", Icon: Users, mobileColumn: 1 },
] as const;

const desktopNavItems = [
  { label: "Fox Menu", href: "#hero" },
  { label: "Dịch vụ", href: "/dich-vu" },
  { label: "News", href: "/#news" },
  { label: "FAQ", href: "/faq" },
] as const;

const desktopMapItem = { label: "Fox Map", href: "/cua-hang" } as const;
const desktopContactItem = {
  label: "Liên Hệ Ngay",
  href: "#home-contact-info",
} as const;

const hotline = "0889866666";
const displayHotline = "0889 866 666";

const verticalNavItems = [
  { label: "Dịch vụ", href: "/dich-vu", Icon: Sparkles },
  { label: "B2B", href: "/b2b", Icon: Handshake },
  { label: "Cửa hàng", href: "/cua-hang", Icon: Store },
  { label: "Tin tức", href: "/#news", Icon: Bell },
] as const;


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

const footerColumns: Array<[string, Array<[string, string]>]> = [
  [
    "Tổng quan",
    [
      ["Trang chủ", "#hero"],
      ["Về chúng tôi", "/ve-chung-toi/"],
      ["Liên hệ", "/lien-he/"],
    ],
  ],
  [
    "Liên kết",
    [
      ["Dịch vụ", "/dich-vu/"],
      ["Tin tức", "/tin-tuc/"],
      ["Cửa hàng", "/cua-hang/"],
    ],
  ],
  [
    "Chính sách & Điều khoản",
    [
      ["FAQ", "/faq/"],
      ["Điều khoản & Điều kiện", "https://facewashfox.com/dieu-khoan-dieu-kien/"],
      ["Tìm cửa hàng", "/cua-hang/"],
    ],
  ],
];

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
  const pathname = usePathname();
  const [socialOpen, setSocialOpen] = useState(false);

  return (
    <nav aria-label="Điều hướng nhanh" className="mono-vertical-menu">
      {verticalNavItems.map(({ label, href, Icon }) => {
        const isActive = !href.includes("#") && pathname.startsWith(href);

        return (
          <a
            key={label}
            href={href}
            aria-label={label}
            title={label}
            className={isActive ? "is-active" : undefined}
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </a>
        );
      })}
      <i aria-hidden="true" />
      <div className={`mono-social-popover ${socialOpen ? "is-open" : ""}`}>
        <button
          type="button"
          aria-label="Mở liên kết mạng xã hội"
          aria-expanded={socialOpen}
          onClick={() => setSocialOpen((open) => !open)}
          className="mono-social-trigger"
        >
          <Share2 aria-hidden="true" />
          <span>Social</span>
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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const solidAtTopPages = ["/b2b", "/cua-hang", "/cookie-policy", "/dich-vu", "/tin-tuc"];
  const solidHeader =
    scrolled ||
    solidAtTopPages.includes(pathname) ||
    pathname.startsWith("/tin-tuc");
  const mobileColumns = [0, 1].map((column) =>
    navItems.filter((item) => item.mobileColumn === column),
  );

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
            <a href={resolveHomeAnchor(href, home)} key={label}>
              <span>{label}</span>
            </a>
          ))}
        </nav>
        <div className="mono-header-actions">
          <a className="mono-header-pill mono-header-pill--ghost" href={desktopMapItem.href}>
            {desktopMapItem.label}
          </a>
          <a
            className="mono-header-pill mono-header-pill--cta"
            href={resolveHomeAnchor(desktopContactItem.href, home)}
          >
            {desktopContactItem.label}
          </a>
          <button
            type="button"
            className="mono-menu-trigger"
            aria-label="Mở menu"
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
              aria-label="Đóng menu"
              className="mono-mobile-close"
              onClick={() => setMenuOpen(false)}
            >
              <X aria-hidden="true" />
            </button>
          </div>

          <div className="mono-mobile-menu-body">
            <div>
              <div className="mono-mobile-kicker">
                <span>Face Wash Fox</span>
                <span aria-hidden="true">↓</span>
              </div>
              <div className="mono-mobile-language">
                <span className="is-active">VI</span>
                <span>EN</span>
              </div>
              <div className="mono-mobile-link-grid">
                {mobileColumns.map((column, index) => (
                  <nav key={index} aria-label={`Mobile navigation ${index + 1}`}>
                    {column.map(({ label, href }) => (
                      <a
                        key={label}
                        href={resolveHomeAnchor(href, home)}
                        onClick={() => setMenuOpen(false)}
                      >
                        {label}
                      </a>
                    ))}
                  </nav>
                ))}
              </div>
            </div>

            <aside className="mono-mobile-aside">
              <a href={`tel:${hotline}`} onClick={() => setMenuOpen(false)}>
                <Phone aria-hidden="true" />
                {displayHotline}
              </a>
              <a href="mailto:info@facewashfox.com" onClick={() => setMenuOpen(false)}>
                <Mail aria-hidden="true" />
                info@facewashfox.com
              </a>
              <a href="/cua-hang" onClick={() => setMenuOpen(false)}>
                <MapPin aria-hidden="true" />
                Tìm cửa hàng gần bạn
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
  return (
    <footer className="mono-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <strong>DA ĐẸP BẮT ĐẦU TỪ VIỆC RỬA MẶT</strong>
          <p>
            Face Wash Fox - Chuỗi cửa hàng rửa mặt công nghệ lần đầu tiên xuất
            hiện tại Việt Nam.
          </p>
        </div>

        <div className="footer-link-columns">
          {footerColumns.map(([title, links]) => (
            <div key={title}>
              <h3>{title}</h3>
              <ul>
                {links.map(([label, href]) => (
                  <li key={label}>
                    <a href={resolveHomeAnchor(href, home)}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <address className="footer-contact">
          <h3>Liên hệ</h3>
          <a href={`tel:${hotline}`}>
            <Phone aria-hidden="true" />
            {displayHotline}
          </a>
          <p>
            <MapPin aria-hidden="true" />
            Lầu 2, Số 2 Song Hành, Phường Bình Trưng, TP Hồ Chí Minh
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
