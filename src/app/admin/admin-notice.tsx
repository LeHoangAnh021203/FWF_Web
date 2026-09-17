"use client";

import { useEffect, useRef } from "react";

export function AdminNotice({
  tone = "error",
  title,
  message,
  onClose,
  autoCloseMs,
}: {
  tone?: "error" | "success";
  title?: string;
  message: string;
  onClose: () => void;
  autoCloseMs?: number;
}) {
  const heading = title ?? (tone === "error" ? "Không thực hiện được" : "Thành công");
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!autoCloseMs) return;
    const timer = window.setTimeout(() => onCloseRef.current(), autoCloseMs);
    return () => window.clearTimeout(timer);
  }, [autoCloseMs, message]);

  return (
    <div
      className="admin-news-hub-dialog z-[110]"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="admin-notice-title"
      aria-describedby="admin-notice-message"
      onClick={onClose}
    >
      <div className="admin-news-hub-dialog-card" onClick={(event) => event.stopPropagation()}>
        <p
          className={`mb-2 text-[11px] font-bold uppercase tracking-[0.16em] ${
            tone === "success" ? "text-emerald-700" : "text-red-600"
          }`}
        >
          {tone === "error" ? "Lỗi" : "Đã xong"}
        </p>
        <h2 id="admin-notice-title">{heading}</h2>
        <p id="admin-notice-message" role="alert" className="text-sm leading-6 text-[#5f5a57]">
          {message}
        </p>
        <div className="admin-news-hub-dialog-actions">
          <button type="submit" autoFocus onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
