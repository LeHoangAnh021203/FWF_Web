"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { AdminNotice } from "../admin-notice";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [error, setError] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [noticeTone, setNoticeTone] = useState<"error" | "success">("error");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  const nextPath = () => {
    const next = searchParams.get("next") || "/admin";
    return next.startsWith("/admin") && next !== "/admin/login" ? next : "/admin";
  };

  const sendOtp = async () => {
    setPending(true);
    setError("");
    setErrorTitle("");
    setNoticeTone("error");
    setMessage("");
    try {
      const response = await fetch("/api/admin/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) {
        setError(data.error || "Không gửi được mã OTP.");
        return;
      }
      setStep("otp");
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
    setPending(true);
    setError("");
    setErrorTitle("");
    setNoticeTone("error");
    setMessage("");
    try {
      const response = await fetch("/api/admin/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = (await response.json()) as { error?: string; pending?: boolean };
      if (!response.ok) {
        setError(
          data.error ||
            (data.pending
              ? "Tài khoản đã được nhận và đang chờ admin duyệt. Bạn cũng có thể liên hệ itdept@facewashfox.com để được cấp tài khoản."
              : "Không đăng nhập được."),
        );
        setErrorTitle(data.pending ? "Đã nhận tài khoản" : "");
        setNoticeTone(data.pending ? "success" : "error");
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

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      {error ? (
        <AdminNotice
          tone={noticeTone}
          title={errorTitle || undefined}
          message={error}
          onClose={() => {
            setError("");
            setErrorTitle("");
            setNoticeTone("error");
          }}
        />
      ) : null}
      <form
        onSubmit={step === "email" ? requestOtp : verifyOtp}
        autoComplete="off"
        className="w-full max-w-md rounded-[28px] border border-[#eadfd5] bg-white p-8 shadow-[0_18px_50px_rgba(234,88,20,0.12)]"
      >
        <img src="/logo/fwf-orange.png" alt="Face Wash Fox" className="h-10 w-auto" />
        <h1 className="mt-6 text-2xl font-bold text-[#171412]">Trang quản trị</h1>
        <p className="mt-2 text-sm text-[#5f5a57]">
          Đăng nhập bằng email. Mã OTP sẽ được gửi tới hộp thư.
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
          <>
            <label className="mt-4 block text-sm font-semibold" htmlFor="admin-otp">
              Mã OTP
            </label>
            <input
              id="admin-otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
              className="mt-2 w-full rounded-2xl border border-[#eadfd5] bg-[#fffaf6] px-4 py-3 tracking-[0.4em] outline-none ring-[#ee6730] focus:ring-2"
              required
            />
          </>
        ) : null}

        {message && !error ? <p className="mt-3 text-sm text-emerald-700">{message}</p> : null}

        <button
          type="submit"
          disabled={pending}
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
                setOtp("");
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
