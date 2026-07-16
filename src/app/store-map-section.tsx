"use client";

import dynamic from "next/dynamic";
import { Maximize2, Minimize2 } from "lucide-react";
import { useEffect, useState } from "react";

const BranchMap = dynamic(() => import("../components/BranchMap"), {
  ssr: false,
  loading: () => (
    <div className="store-map-loading">
      <span />
      <p>Đang tải bản đồ cửa hàng...</p>
    </div>
  ),
});

export default function StoreMapSection() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("store-map-fullscreen-open", isFullscreen);
    window.setTimeout(() => window.dispatchEvent(new Event("resize")), 80);
    window.setTimeout(() => window.dispatchEvent(new Event("resize")), 320);

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
            isFullscreen
              ? "Thu nhỏ bản đồ khỏi toàn màn hình"
              : "Phóng to bản đồ toàn màn hình"
          }
          title={
            isFullscreen
              ? "Thu nhỏ bản đồ khỏi toàn màn hình"
              : "Phóng to bản đồ toàn màn hình"
          }
        >
          {isFullscreen ? (
            <Minimize2 aria-hidden="true" />
          ) : (
            <Maximize2 aria-hidden="true" />
          )}
        </button>
        <BranchMap />
      </div>
    </section>
  );
}
