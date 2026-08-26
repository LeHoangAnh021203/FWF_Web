"use client";

import {
  useCallback,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import { branches } from "@/data/branches";
import { useLanguage } from "@/i18n/language-context";
import { serviceImages } from "./service-images";

const centerImage = serviceImages.standardsCenter;

const leftStandards = [
  {
    titleKey: "svc.std1.title",
    subKey: "svc.std1.sub",
    icon: serviceImages.quyTrinh,
    color: "from-cyan-400/20 to-cyan-500/10",
  },
  {
    titleKey: "svc.std2.title",
    subKey: "svc.std2.sub",
    icon: serviceImages.caoCap,
    color: "from-lime-400/20 to-lime-500/10",
  },
  {
    titleKey: "svc.std3.title",
    subKey: "svc.std3.sub",
    icon: serviceImages.thietBi,
    color: "from-pink-300/20 to-pink-400/10",
  },
  {
    titleKey: "svc.std4.title",
    subKey: "svc.std4.sub",
    icon: serviceImages.thongTin,
    color: "from-orange-300/20 to-orange-400/10",
  },
] as const;

const rightStandards = [
  {
    titleKey: "svc.std5.title",
    subKey: "svc.std5.sub",
    icon: serviceImages.nhanVien,
    color: "from-sky-400/20 to-sky-500/10",
  },
  {
    titleKey: "svc.std6.title",
    subKey: "svc.std6.sub",
    icon: serviceImages.giaCa,
    color: "from-amber-300/20 to-amber-400/10",
  },
  {
    titleKey: "svc.std7.title",
    subKey: "svc.std7.sub",
    icon: serviceImages.nhanh,
    color: "from-yellow-300/20 to-yellow-400/10",
  },
  {
    titleKey: "svc.std8.title",
    subKey: "svc.std8.sub",
    icon: serviceImages.chatLuong,
    color: "from-violet-300/20 to-violet-400/10",
  },
] as const;

type StandardItem = {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
};

type BranchDistance = {
  id: number;
  distanceKm: number;
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

function StandardRow({
  item,
  reverse = false,
}: {
  item: StandardItem;
  reverse?: boolean;
}) {
  return (
    <article
      className={`flex ${
        reverse ? "justify-start lg:justify-end" : "justify-start lg:justify-end"
      }`}
    >
      <img
        src={item.icon}
        alt={`${item.title} ${item.subtitle}`.trim()}
        className="h-auto w-full max-w-full object-contain lg:max-w-[320px]"
      />
    </article>
  );
}

export default function ServiceStandard() {
  const { t } = useLanguage();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  const [selectedBranchId, setSelectedBranchId] = useState<number>(
    branches[0]?.id ?? 0,
  );
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState("");

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [distanceByBranchId, setDistanceByBranchId] = useState<
    Record<number, number>
  >({});

  const nearestBranch = useMemo(() => {
    const distances: BranchDistance[] = Object.entries(
      distanceByBranchId,
    ).map(([id, distanceKm]) => ({
      id: Number(id),
      distanceKm,
    }));

    distances.sort((a, b) => a.distanceKm - b.distanceKm);
    return distances[0];
  }, [distanceByBranchId]);

  const selectedBranch = useMemo(() => {
    return branches.find((branch) => branch.id === selectedBranchId) ?? null;
  }, [selectedBranchId]);

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
          note: note.trim(),
          branchId: selectedBranch.id,
          branchName: selectedBranch.name,
          branchAddress: selectedBranch.address,
          branchCity: selectedBranch.city,
          branchMapsUrl: selectedBranch.mapsUrl,
          nearestDistanceKm: typeof nearestBranch?.distanceKm === "number"
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
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t("svc.book.errGeneric");
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="tieu-chuan-dich-vu"
      className="w-full overflow-x-hidden bg-[#f3f3f3] px-4 py-10 sm:py-14 md:px-8 md:py-20"
    >
      <div className="mx-auto max-w-[1600px]">
        <header className="mx-auto mb-8 max-w-[1200px] text-center md:mb-16">
          <h2 className="text-[clamp(1.75rem,7vw,4rem)] font-extrabold uppercase text-[#121212]">
            {t("svc.standardTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-[42rem] text-[clamp(0.95rem,3.6vw,1.6rem)] leading-relaxed text-[#6a6a6a] md:mt-4">
            {t("svc.standardLead")}
          </p>
        </header>

        <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-[1fr_minmax(280px,620px)_1fr] lg:gap-10">
          <div className="order-2 grid grid-cols-2 gap-3 sm:gap-5 lg:order-1 lg:grid-cols-1 lg:gap-12">
            {leftStandards.map((item) => (
              <StandardRow
                key={item.icon}
                item={{
                  title: t(item.titleKey),
                  subtitle: t(item.subKey),
                  icon: item.icon,
                  color: item.color,
                }}
              />
            ))}
          </div>

          <div className="order-1 flex items-center justify-center lg:order-2">
            <img
              src={centerImage}
              alt={t("svc.standardTitle")}
              className="h-auto w-full max-w-[420px] object-contain lg:max-w-[620px]"
            />
          </div>

          <div className="order-3 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-1 lg:gap-12">
            {rightStandards.map((item) => (
              <StandardRow
                key={item.icon}
                item={{
                  title: t(item.titleKey),
                  subtitle: t(item.subKey),
                  icon: item.icon,
                  color: item.color,
                }}
                reverse
              />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 w-full max-w-[920px] rounded-[22px] bg-[#f4eef5] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:rounded-[28px] sm:p-6 md:mt-16 md:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#f04b9a] to-[#7c3aed] text-white sm:h-24 sm:w-24">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-8 w-8 sm:h-11 sm:w-11"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M16 3v4M8 3v4M3 10h18" />
            </svg>
          </div>

          <h3 className="mt-5 text-center text-[clamp(1.5rem,6vw,3.3rem)] font-extrabold text-[#0f172a] sm:mt-6">
            {t("svc.bookTitle")}
          </h3>
          <p className="mt-2 text-center text-[clamp(0.95rem,3.8vw,1.8rem)] text-[#4b5563]">
            {t("svc.bookLead")}
          </p>

          <form
            className="mt-6 space-y-5 sm:mt-8 sm:space-y-6 md:mt-10"
            onSubmit={handleSubmitBooking}
          >
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="booking-name"
                  className="mb-2 block text-sm font-semibold text-[#374151] sm:text-[1.05rem]"
                >
                  {t("svc.name")}
                </label>
                <input
                  id="booking-name"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder={t("svc.namePh")}
                  required
                  className="h-12 w-full rounded-[14px] border border-[#c7cdd5] bg-[#f1dce9] px-4 text-base text-[#111827] outline-none placeholder:text-[#8b96a5] focus:border-[#a855f7]/50 sm:h-14 sm:px-5 sm:text-[1.05rem] md:text-[1.15rem]"
                />
              </div>

              <div>
                <label
                  htmlFor="booking-phone"
                  className="mb-2 block text-sm font-semibold text-[#374151] sm:text-[1.05rem]"
                >
                  {t("svc.phone")}
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder={t("svc.phonePh")}
                  required
                  className="h-12 w-full rounded-[14px] border border-[#c7cdd5] bg-[#f1dce9] px-4 text-base text-[#111827] outline-none placeholder:text-[#8b96a5] focus:border-[#a855f7]/50 sm:h-14 sm:px-5 sm:text-[1.05rem] md:text-[1.15rem]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="booking-email"
                className="mb-2 block text-sm font-semibold text-[#374151] sm:text-[1.05rem]"
              >
                {t("svc.book.email")}
              </label>
              <input
                id="booking-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t("svc.book.emailPh")}
                className="h-12 w-full rounded-[14px] border border-[#c7cdd5] bg-[#f1dce9] px-4 text-base text-[#111827] outline-none placeholder:text-[#8b96a5] focus:border-[#a855f7]/50 sm:h-14 sm:px-5 sm:text-[1.05rem] md:text-[1.15rem]"
              />
            </div>

            <div>
              <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <label
                  htmlFor="booking-branch"
                  className="text-sm font-semibold text-[#374151] sm:text-[1.05rem]"
                >
                  {t("svc.branch")}
                </label>
                <button
                  type="button"
                  onClick={handleDetectNearestBranch}
                  className="self-start text-sm text-[#0369a1] underline underline-offset-2 sm:text-[1.05rem]"
                >
                  {isLocating ? t("svc.book.locating") : t("svc.book.locate")}
                </button>
              </div>
              <select
                id="booking-branch"
                className="h-12 w-full rounded-[14px] border border-[#c7cdd5] bg-[#f1dce9] px-4 text-base text-[#111827] outline-none focus:border-[#a855f7]/50 sm:h-14 sm:px-5 sm:text-[1.05rem] md:text-[1.15rem]"
                value={selectedBranchId}
                onChange={(event) => setSelectedBranchId(Number(event.target.value))}
              >
                {branches.map((branch) => {
                  const distance = distanceByBranchId[branch.id];
                  return (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                      {typeof distance === "number"
                        ? ` — ${distance.toFixed(1)} km`
                        : ""}
                    </option>
                  );
                })}
              </select>
              {locationError ? (
                <p className="mt-2 text-[0.95rem] text-[#dc2626]">
                  {locationError}
                </p>
              ) : null}
              {nearestBranch ? (
                <p className="mt-2 text-[0.95rem] text-[#0f766e]">
                  {t("svc.book.nearestHint").replace(
                    "{km}",
                    nearestBranch.distanceKm.toFixed(1),
                  )}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="booking-note"
                className="mb-2 block text-sm font-semibold text-[#374151] sm:text-[1.05rem]"
              >
                {t("svc.book.note")}
              </label>
              <textarea
                id="booking-note"
                rows={4}
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder={t("svc.book.notePh")}
                className="w-full rounded-[14px] border border-[#c7cdd5] bg-[#f1dce9] px-4 py-3 text-base text-[#111827] outline-none placeholder:text-[#8b96a5] focus:border-[#a855f7]/50 sm:px-5 sm:py-4 sm:text-[1.05rem] md:text-[1.15rem]"
              />
            </div>

            {submitError ? (
              <p className="text-sm text-[#dc2626] sm:text-[0.95rem]">{submitError}</p>
            ) : null}
            {submitSuccess ? (
              <p className="text-sm text-[#0f766e] sm:text-[0.95rem]">
                {submitSuccess}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-[14px] bg-gradient-to-r from-[#f04b9a] to-[#7c3aed] px-4 text-[clamp(1rem,4vw,1.65rem)] font-extrabold text-white transition-opacity hover:opacity-90 sm:h-16 sm:px-8"
            >
              {isSubmitting ? t("svc.sending") : t("svc.submit")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
