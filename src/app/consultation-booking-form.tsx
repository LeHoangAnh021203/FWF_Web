"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";

import { PrivacyConsent } from "@/components/privacy-consent";
import { branches } from "@/data/branches";
import { useLanguage } from "@/i18n/language-context";

import { CONSULT_BOOKING_SOURCE_FAB } from "./open-consultation-booking";

type BranchDistance = {
  id: number;
  distanceKm: number;
};

type ConsultationBookingFormProps = {
  idPrefix?: string;
  submitLabel?: string;
  active?: boolean;
  source?: string;
};

function toRad(value: number) {
  return (value * Math.PI) / 180;
}

function getDistanceKm(
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number,
) {
  const earthRadiusKm = 6371;
  const dLat = toRad(toLat - fromLat);
  const dLng = toRad(toLng - fromLng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(fromLat)) *
      Math.cos(toRad(toLat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

export default function ConsultationBookingForm({
  idPrefix = "consult",
  submitLabel,
  active = false,
  source = CONSULT_BOOKING_SOURCE_FAB,
}: ConsultationBookingFormProps) {
  const { t } = useLanguage();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState(0);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [distanceByBranchId, setDistanceByBranchId] = useState<
    Record<number, number>
  >({});

  const nameId = `${idPrefix}-booking-name`;
  const phoneId = `${idPrefix}-booking-phone`;
  const emailId = `${idPrefix}-booking-email`;
  const branchId = `${idPrefix}-booking-branch`;
  const noteId = `${idPrefix}-booking-note`;
  const consentId = `${idPrefix}-booking-consent`;

  const nearestBranch = useMemo(() => {
    const distances: BranchDistance[] = Object.entries(distanceByBranchId).map(
      ([id, distanceKm]) => ({
        id: Number(id),
        distanceKm,
      }),
    );

    distances.sort((a, b) => a.distanceKm - b.distanceKm);
    return distances[0];
  }, [distanceByBranchId]);

  const selectedBranch = useMemo(
    () => branches.find((branch) => branch.id === selectedBranchId) ?? null,
    [selectedBranchId],
  );

  const requestedForOpenRef = useRef(false);

  const listedBranches = useMemo(() => {
    if (Object.keys(distanceByBranchId).length === 0) {
      return branches;
    }

    return [...branches].sort(
      (left, right) =>
        (distanceByBranchId[left.id] ?? Number.POSITIVE_INFINITY) -
        (distanceByBranchId[right.id] ?? Number.POSITIVE_INFINITY),
    );
  }, [distanceByBranchId]);

  const nearestBranchName = nearestBranch
    ? (branches.find((branch) => branch.id === nearestBranch.id)?.name ?? "")
    : "";

  const handleDetectNearestBranch = useCallback(() => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setLocationError(t("svc.book.locUnsupported"));
      return;
    }

    setIsLocating(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const nextDistances = branches.reduce<Record<number, number>>(
          (acc, branch) => {
            acc[branch.id] = getDistanceKm(
              latitude,
              longitude,
              branch.lat,
              branch.lng,
            );
            return acc;
          },
          {},
        );

        const nearest = Object.entries(nextDistances).sort(
          (a, b) => a[1] - b[1],
        )[0];

        setDistanceByBranchId(nextDistances);
        if (nearest) {
          setSelectedBranchId(Number(nearest[0]));
        }
        setIsLocating(false);
      },
      (error) => {
        const errorMessageByCode: Record<number, string> = {
          1: t("svc.book.locDenied"),
          2: t("svc.book.locUnavailable"),
          3: t("svc.book.locTimeout"),
        };
        setLocationError(
          errorMessageByCode[error.code] ?? t("svc.book.locFail"),
        );
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  }, [t]);

  useEffect(() => {
    if (!active) {
      requestedForOpenRef.current = false;
      return;
    }

    if (requestedForOpenRef.current) {
      return;
    }

    requestedForOpenRef.current = true;
    handleDetectNearestBranch();
  }, [active, handleDetectNearestBranch]);

  const handleSubmitBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    if (!fullName.trim()) {
      setSubmitError(t("svc.book.errName"));
      return;
    }

    if (!phone.trim()) {
      setSubmitError(t("svc.book.errPhone"));
      return;
    }

    if (!selectedBranch) {
      setSubmitError(t("svc.book.errBranch"));
      return;
    }

    if (!privacyConsent) {
      setSubmitError(t("consent.required"));
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: "booking",
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          note: [source, note.trim()].filter(Boolean).join(" — "),
          branchId: selectedBranch.id,
          branchName: selectedBranch.name,
          branchAddress: selectedBranch.address,
          branchCity: selectedBranch.city,
          branchMapsUrl: selectedBranch.mapsUrl,
          nearestDistanceKm:
            typeof nearestBranch?.distanceKm === "number"
              ? Number(nearestBranch.distanceKm.toFixed(1))
              : null,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error ?? t("svc.book.errSubmit"));
      }

      setSubmitSuccess(t("svc.book.success"));
      setFullName("");
      setPhone("");
      setEmail("");
      setNote("");
      setPrivacyConsent(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t("svc.book.errGeneric");
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="consultation-booking-form" onSubmit={handleSubmitBooking}>
      <div className="consultation-booking-row">
        <div>
          <label htmlFor={nameId} className="consultation-booking-label">
            {t("svc.name")}
          </label>
          <input
            id={nameId}
            type="text"
            autoComplete="name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder={t("svc.namePh")}
            required
            className="consultation-booking-field"
          />
        </div>

        <div>
          <label htmlFor={phoneId} className="consultation-booking-label">
            {t("svc.phone")}
          </label>
          <input
            id={phoneId}
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder={t("svc.phonePh")}
            required
            className="consultation-booking-field"
          />
        </div>
      </div>

      <div>
        <label htmlFor={emailId} className="consultation-booking-label">
          {t("svc.book.email")}
        </label>
        <input
          id={emailId}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t("svc.book.emailPh")}
          className="consultation-booking-field"
        />
      </div>

      <div>
        <label htmlFor={branchId} className="consultation-booking-label">
          {t("svc.branchNearest")}
        </label>
        {isLocating ? (
          <p className="consultation-booking-locate-ask">{t("svc.book.locating")}</p>
        ) : null}
        <select
          id={branchId}
          className="consultation-booking-field"
          value={selectedBranchId || ""}
          onChange={(event) => setSelectedBranchId(Number(event.target.value) || 0)}
          required
        >
          <option value="">{t("svc.book.branchPlaceholder")}</option>
          {listedBranches.map((branch) => {
            const distance = distanceByBranchId[branch.id];
            return (
              <option key={branch.id} value={branch.id}>
                {branch.name}
                {typeof distance === "number" ? ` — ${distance.toFixed(1)} km` : ""}
              </option>
            );
          })}
        </select>
        {locationError ? (
          <p className="consultation-booking-hint is-error">{locationError}</p>
        ) : null}
        {nearestBranch ? (
          <p className="consultation-booking-hint is-success">
            {t("svc.book.nearestHint")
              .replace("{name}", nearestBranchName)
              .replace("{km}", nearestBranch.distanceKm.toFixed(1))}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={noteId} className="consultation-booking-label">
          {t("svc.book.note")}
        </label>
        <textarea
          id={noteId}
          rows={2}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder={t("svc.book.notePh")}
          className="consultation-booking-field consultation-booking-field--area"
        />
      </div>

      <PrivacyConsent
        id={consentId}
        checked={privacyConsent}
        onChange={setPrivacyConsent}
        className="consultation-booking-consent"
      />

      {submitError ? (
        <p className="consultation-booking-hint is-error" role="alert">
          {submitError}
        </p>
      ) : null}
      {submitSuccess ? (
        <p className="consultation-booking-hint is-success" role="status">
          {submitSuccess}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="consultation-booking-submit"
      >
        {isSubmitting ? t("svc.sending") : (submitLabel ?? t("svc.submitConsult"))}
      </button>
    </form>
  );
}
