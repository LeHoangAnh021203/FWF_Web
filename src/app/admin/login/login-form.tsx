"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { AdminNotice } from "../admin-notice";

const OTP_LENGTH = 6;

function maskEmail(value: string) {
  const [local = "", domain = ""] = value.split("@");
  if (!local || !domain) return value;
  if (local.length <= 2) return `${local[0] ?? ""}***@${domain}`;
  return `${local.slice(0, 2)}***${local.slice(-1)}@${domain}`;
}

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [digits, setDigits] = useState<string[]>(() => Array.from({ length: OTP_LENGTH }, () => ""));
  const [step, setStep] = useState<"email" | "otp">("email");
  const [error, setError] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [noticeTone, setNoticeTone] = useState<"error" | "success">("error");
  const [accountPending, setAccountPending] = useState(false);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const otp = digits.join("");

  useEffect(() => {
    if (step !== "otp") return;
    const timer = window.setTimeout(() => otpRefs.current[0]?.focus(), 40);
    return () => window.clearTimeout(timer);
  }, [step]);

  const nextPath = () => {
    const next = searchParams.get("next") || "/admin";
    return next.startsWith("/admin") && next !== "/admin/login" ? next : "/admin";
  };

  const resetDigits = () => setDigits(Array.from({ length: OTP_LENGTH }, () => ""));

  const sendOtp = async () => {
    setPending(true);
    setError("");
    setErrorTitle("");
    setNoticeTone("error");
    setAccountPending(false);
    setMessage("");
    try {
      const response = await fetch("/api/admin/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) {
        setError(data.error || "Không gửi được mã OTP.");
        return;
      }
      setStep("otp");
      resetDigits();
      setMessage(data.message || "Đã gửi mã OTP.");
    } catch {
      setError("Không kết nối được máy chủ.");
    } finally {
      setPending(false);
    }
  };

  const requestOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    await sendOtp();
  };

  const verifyOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    if (otp.length !== OTP_LENGTH) {
      setNoticeTone("error");
      setError("Vui lòng nhập đủ 6 số OTP.");
      return;
    }
    setPending(true);
    setError("");
    setErrorTitle("");
    setNoticeTone("error");
    setAccountPending(false);
    setMessage("");
    try {
      const response = await fetch("/api/admin/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email, otp }),
      });
      let data: { error?: string; pending?: boolean } = {};
      try {
        data = (await response.json()) as { error?: string; pending?: boolean };
      } catch {
        setError(
          response.ok
            ? "Máy chủ trả về phản hồi không hợp lệ."
            : `Không đăng nhập được (mã ${response.status}).`,
        );
        return;
      }
      if (!response.ok) {
        setError(
          data.error ||
            (data.pending
              ? "Tài khoản đã được nhận và đang chờ admin duyệt. Bạn cũng có thể liên hệ itdept@facewashfox.com để được cấp tài khoản."
              : "Không đăng nhập được."),
        );
        setErrorTitle(data.pending ? "Đã nhận tài khoản" : "");
        setNoticeTone(data.pending ? "success" : "error");
        setAccountPending(Boolean(data.pending));
        return;
      }
      router.replace(nextPath());
      router.refresh();
    } catch {
      setError("Không kết nối được máy chủ.");
    } finally {
      setPending(false);
    }
  };

  const applyOtpValue = (value: string, startIndex = 0) => {
    const cleaned = value.replace(/\D/g, "").slice(0, OTP_LENGTH - startIndex);
    if (!cleaned) return;
    setDigits((current) => {
      const next = [...current];
      cleaned.split("").forEach((digit, offset) => {
        next[startIndex + offset] = digit;
      });
      return next;
    });
    const focusIndex = Math.min(startIndex + cleaned.length, OTP_LENGTH - 1);
    otpRefs.current[focusIndex]?.focus();
  };

  const onDigitChange = (index: number, raw: string) => {
    if (raw.length > 1) {
      applyOtpValue(raw, index);
      return;
    }
    const digit = raw.replace(/\D/g, "").slice(-1);
    setDigits((current) => {
      const next = [...current];
      next[index] = digit;
      return next;
    });
    if (digit && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const onDigitKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      event.preventDefault();
      setDigits((current) => {
        const next = [...current];
        next[index - 1] = "";
        return next;
      });
      otpRefs.current[index - 1]?.focus();
      return;
    }
    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      otpRefs.current[index - 1]?.focus();
    }
    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      event.preventDefault();
      otpRefs.current[index + 1]?.focus();
    }
  };

  const onDigitPaste = (index: number, event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    applyOtpValue(event.clipboardData.getData("text"), index);
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      {error ? (
        <AdminNotice
          tone={noticeTone}
          title={errorTitle || undefined}
          message={error}
          closeLabel={accountPending ? "Quay về trang đăng nhập" : "Đóng"}
          onClose={() => {
            setError("");
            setErrorTitle("");
            setNoticeTone("error");
            if (accountPending) {
              setAccountPending(false);
              setStep("email");
              resetDigits();
              setMessage("");
            }
          }}
        />
      ) : null}
      <form
        onSubmit={step === "email" ? requestOtp : verifyOtp}
        autoComplete="off"
        className="w-full max-w-md rounded-[28px] border border-[#eadfd5] bg-white p-8 shadow-[0_18px_50px_rgba(234,88,20,0.12)]"
      >
        <img src="/logo/fwf-orange.png" alt="Face Wash Fox" className="h-10 w-auto" />
        <h1 className="mt-6 text-2xl font-bold text-[#171412]">
          {step === "otp" ? "Xác nhận OTP đăng nhập" : "Trang quản trị"}
        </h1>
        <p className="mt-2 text-sm text-[#5f5a57]">
          {step === "otp"
            ? `Chúng tôi đã gửi mã xác minh 6 số tới ${maskEmail(email)}`
            : "Đăng nhập bằng email. Mã OTP sẽ được gửi tới hộp thư."}
        </p>

        <label className="mt-6 block text-sm font-semibold" htmlFor="admin-email">
          Email
        </label>
        <input
          id="admin-email"
          name="admin-email"
          type="email"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Nhập email"
          className="mt-2 w-full rounded-2xl border border-[#eadfd5] bg-[#fffaf6] px-4 py-3 outline-none ring-[#ee6730] placeholder:text-[#d1d5db] focus:ring-2"
          required
          readOnly={step === "otp"}
        />

        {step === "otp" ? (
          <div className="mt-5 rounded-[24px] border border-[#eadfd5] bg-[#fffaf6] px-4 py-5 sm:px-5">
            <p className="text-center text-sm font-semibold text-[#171412]">Mã xác minh</p>
            <div className="mt-4 flex items-center justify-center gap-2 sm:gap-2.5">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(node) => {
                    otpRefs.current[index] = node;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  aria-label={`Số OTP thứ ${index + 1}`}
                  maxLength={1}
                  value={digit}
                  onChange={(event) => onDigitChange(index, event.target.value)}
                  onKeyDown={(event) => onDigitKeyDown(index, event)}
                  onPaste={(event) => onDigitPaste(index, event)}
                  onFocus={(event) => event.currentTarget.select()}
                  className="h-12 w-10 rounded-xl border border-[#d6d3d1] bg-white text-center text-lg font-bold text-[#171412] outline-none transition focus:border-[#ee6730] focus:ring-2 focus:ring-[#ee6730]/30 sm:h-14 sm:w-11"
                  required
                />
              ))}
            </div>
            {message && !error ? (
              <p className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-center text-sm text-emerald-700">
                {message}
              </p>
            ) : null}
          </div>
        ) : message && !error ? (
          <p className="mt-3 text-sm text-emerald-700">{message}</p>
        ) : null}

        <button
          type="submit"
          disabled={pending || (step === "otp" && otp.length !== OTP_LENGTH)}
          className="mt-6 w-full rounded-full bg-[#ee6730] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ea5814] disabled:opacity-60"
        >
          {pending
            ? step === "email"
              ? "Đang gửi mã..."
              : "Đang đăng nhập..."
            : step === "email"
              ? "Gửi mã OTP"
              : "Đăng nhập"}
        </button>

        {step === "otp" ? (
          <div className="mt-3 flex flex-col gap-2">
            <button
              type="button"
              disabled={pending}
              onClick={() => void sendOtp()}
              className="w-full text-sm font-semibold text-[#ee6730]"
            >
              Gửi lại mã
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => {
                setStep("email");
                resetDigits();
                setMessage("");
              }}
              className="w-full text-sm font-semibold text-[#5f5a57]"
            >
              Dùng email khác
            </button>
          </div>
        ) : null}
      </form>
    </main>
  );
}
