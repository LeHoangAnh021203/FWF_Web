"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error || "Không đăng nhập được.");
        return;
      }
      const next = searchParams.get("next") || "/admin";
      router.replace(next.startsWith("/admin") && next !== "/admin/login" ? next : "/admin");
      router.refresh();
    } catch {
      setError("Không kết nối được máy chủ.");
    } finally {
      setPending(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-[28px] border border-[#eadfd5] bg-white p-8 shadow-[0_18px_50px_rgba(234,88,20,0.12)]"
      >
        <img src="/logo/fwf-orange.png" alt="Face Wash Fox" className="h-10 w-auto" />
        <h1 className="mt-6 text-2xl font-bold text-[#171412]">Trang quản trị</h1>
        <p className="mt-2 text-sm text-[#5f5a57]">Đăng nhập để chọn mục cần chỉnh trên website Face Wash Fox.</p>

        <label className="mt-6 block text-sm font-semibold" htmlFor="admin-password">
          Mật khẩu
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-[#eadfd5] bg-[#fffaf6] px-4 py-3 outline-none ring-[#ee6730] focus:ring-2"
          required
        />

        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={pending}
          className="mt-6 w-full rounded-full bg-[#ee6730] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ea5814] disabled:opacity-60"
        >
          {pending ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </main>
  );
}
