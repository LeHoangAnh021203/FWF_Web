"use client";

import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { useEffect, useRef } from "react";

export function AdminNotice({
  tone = "error",
  title,
  message,
  onClose,
  autoCloseMs,
  closeLabel = "Đóng",
  actionLabel,
  onAction,
}: {
  tone?: "error" | "success" | "info";
  title?: string;
  message: string;
  onClose: () => void;
  autoCloseMs?: number;
  closeLabel?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  const heading =
    title ?? (tone === "success" ? "Thành công" : tone === "info" ? "Thông báo" : "Không thực hiện được");
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

  const Icon = tone === "success" ? CheckCircle2 : tone === "info" ? Info : XCircle;
  const toneClass =
    tone === "success" ? "is-success" : tone === "info" ? "is-info" : "is-error";

  return (
    <div
      className="admin-news-hub-dialog admin-alert-dialog z-[110]"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="admin-notice-title"
      aria-describedby="admin-notice-message"
      onClick={onClose}
    >
      <div
        className={`admin-news-hub-dialog-card admin-alert-card ${toneClass}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={`admin-alert-icon ${toneClass}`} aria-hidden="true">
          <Icon size={28} strokeWidth={2.2} />
        </div>
        <p className={`admin-alert-eyebrow ${toneClass}`}>
          {tone === "error" ? "Lỗi" : tone === "success" ? "Đã xong" : "Thông tin"}
        </p>
        <h2 id="admin-notice-title">{heading}</h2>
        <p id="admin-notice-message" role="alert" className="admin-alert-message">
          {message}
        </p>
        <div className="admin-news-hub-dialog-actions">
          {actionLabel && onAction ? (
            <button type="button" onClick={onAction}>
              {actionLabel}
            </button>
          ) : null}
          <button type="button" className="admin-alert-primary" autoFocus onClick={onClose}>
            {closeLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function AdminConfirm({
  title,
  message,
  confirmLabel = "Xác nhận",
  cancelLabel = "Hủy",
  tone = "danger",
  busy = false,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "danger" | "default";
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const onCancelRef = useRef(onCancel);
  onCancelRef.current = onCancel;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy) onCancelRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [busy]);

  return (
    <div
      className="admin-news-hub-dialog admin-alert-dialog z-[120]"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="admin-confirm-title"
      aria-describedby="admin-confirm-message"
      onClick={() => {
        if (!busy) onCancel();
      }}
    >
      <div
        className={`admin-news-hub-dialog-card admin-alert-card ${tone === "danger" ? "is-danger" : "is-info"}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={`admin-alert-icon ${tone === "danger" ? "is-danger" : "is-info"}`}
          aria-hidden="true"
        >
          <AlertTriangle size={28} strokeWidth={2.2} />
        </div>
        <p className={`admin-alert-eyebrow ${tone === "danger" ? "is-danger" : "is-info"}`}>
          {tone === "danger" ? "Xác nhận xóa" : "Xác nhận"}
        </p>
        <h2 id="admin-confirm-title">{title}</h2>
        <p id="admin-confirm-message" className="admin-alert-message">
          {message}
        </p>
        <div className="admin-news-hub-dialog-actions">
          <button type="button" disabled={busy} onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={tone === "danger" ? "admin-alert-danger" : "admin-alert-primary"}
            disabled={busy}
            autoFocus
            onClick={onConfirm}
          >
            {busy ? "Đang xử lý..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
