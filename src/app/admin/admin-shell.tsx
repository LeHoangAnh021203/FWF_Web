"use client";

/* eslint-disable @next/next/no-img-element */

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminShell({
  title,
  action,
  children,
  wide = false,
  siteHref = "/",
  backHref = "/admin",
  backLabel = "Quay về",
  accountEmail,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  wide?: boolean;
  siteHref?: string;
  backHref?: string | null;
  backLabel?: string;
  accountEmail?: string;
}) {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className={`mx-auto min-h-screen w-full px-4 py-6 sm:px-6 ${wide ? "max-w-[1240px]" : "max-w-6xl"}`}>
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin">
            <img src="/logo/fwf-orange.png" alt="Face Wash Fox" className="h-9 w-auto" />
          </Link>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ee6730]">Admin</p>
            {accountEmail ? <p className="text-[11px] font-medium text-[#9ca3af]">{accountEmail}</p> : null}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {backHref ? (
                <Link href={backHref} className="admin-back-link">
                  <ChevronLeft aria-hidden="true" strokeWidth={2.4} />
                  {backLabel}
                </Link>
              ) : null}
              <h1 className="text-xl font-bold sm:text-2xl">{title}</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {action}
          <Link
            href={siteHref}
            className="rounded-full border border-[#eadfd5] px-4 py-2 text-sm font-semibold text-[#5f5a57] hover:bg-white"
          >
            Xem site
          </Link>
          <button
            type="button"
            onClick={logout}
            className="rounded-full bg-[#171412] px-4 py-2 text-sm font-semibold text-white"
          >
            Đăng xuất
          </button>
        </div>
      </header>
      {children}
    </div>
  );
}
