"use client";

import Link from "next/link";

import { useLanguage } from "@/i18n/language-context";

type PrivacyConsentProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

export function PrivacyConsent({
  id,
  checked,
  onChange,
  className = "",
}: PrivacyConsentProps) {
  const { t } = useLanguage();

  return (
    <label htmlFor={id} className={`flex items-start gap-2 text-left ${className}`}>
      <input
        id={id}
        name="privacyConsent"
        type="checkbox"
        required
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-[#ff6a36]"
      />
      <span>
        {t("consent.label")}{" "}
        <Link
          href="/chinh-sach-bao-ve-du-lieu-ca-nhan"
          className="font-semibold underline underline-offset-2"
        >
          {t("consent.privacy")}
        </Link>
        {t("consent.and")}
        <Link
          href="/dieu-khoan-dieu-kien"
          className="font-semibold underline underline-offset-2"
        >
          {t("consent.terms")}
        </Link>
        .
      </span>
    </label>
  );
}
