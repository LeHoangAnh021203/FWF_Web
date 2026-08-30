"use client";

import { Maximize2, Minimize2 } from "lucide-react";
import { useEffect, useState } from "react";

import { useLanguage } from "@/i18n/language-context";

const STORE_MAP_URL =
  process.env.NEXT_PUBLIC_STORE_MAP_URL?.trim() ||
  "https://cuahang.facewashfox.com/";

export default function StoreMapSection() {
  const { t } = useLanguage();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("store-map-fullscreen-open", isFullscreen);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsFullscreen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("store-map-fullscreen-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen]);

  return (
    <section id="cua-hang" className="store-map-section">
      <div
        className={`store-map-shell ${
          isFullscreen ? "store-map-shell--fullscreen" : ""
        }`}
      >
        <button
          type="button"
          className="store-map-fullscreen-toggle"
          onClick={() => setIsFullscreen((current) => !current)}
          aria-label={
            isFullscreen ? t("home.map.collapse") : t("home.map.expand")
          }
          title={isFullscreen ? t("home.map.collapse") : t("home.map.expand")}
        >
          {isFullscreen ? (
            <Minimize2 aria-hidden="true" />
          ) : (
            <Maximize2 aria-hidden="true" />
          )}
        </button>

        {!isLoaded ? (
          <div className="store-map-loading" aria-hidden="true">
            <span />
            <p>{t("home.map.loading")}</p>
          </div>
        ) : null}

        <iframe
          title={t("home.map.title")}
          src={STORE_MAP_URL}
          className="store-map-iframe"
          allow="geolocation; clipboard-write"
          referrerPolicy="no-referrer-when-downgrade"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </section>
  );
}
