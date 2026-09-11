"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";

import { useLanguage } from "@/i18n/language-context";

import ConsultationBookingForm from "./consultation-booking-form";

type ConsultationBookingModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ConsultationBookingModal({
  open,
  onClose,
}: ConsultationBookingModalProps) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
      document.getElementById("consult-booking-name")?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="consultation-booking-dialog"
      aria-labelledby="consultation-booking-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <div className="consultation-booking-dialog-inner">
        <button
          type="button"
          className="consultation-booking-dialog-close"
          onClick={onClose}
          aria-label={t("b2b.booking.close")}
        >
          <X strokeWidth={2.4} aria-hidden="true" />
        </button>

        <header className="consultation-booking-dialog-copy">
          <h2 id="consultation-booking-title">{t("svc.bookTitle")}</h2>
          <p>{t("svc.bookLead")}</p>
        </header>

        <ConsultationBookingForm idPrefix="consult" />
      </div>
    </dialog>
  );
}
