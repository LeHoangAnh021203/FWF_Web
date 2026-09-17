"use client";

import {
  Bell,
  Building2,
  HelpCircle,
  Home,
  MapPin,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { ADMIN_MODULES, type AdminModule } from "@/lib/admin-modules";

import { AdminShell } from "./admin-shell";

const MODULE_ICONS: Record<string, LucideIcon> = {
  "tin-tuc": Bell,
  "trang-chu": Home,
  "dich-vu": Sparkles,
  "ve-chung-toi": Users,
  faq: HelpCircle,
  b2b: Building2,
  "cua-hang": MapPin,
  "ung-dung": Smartphone,
};

function ModuleCard({ module }: { module: AdminModule }) {
  const Icon = MODULE_ICONS[module.id] ?? Bell;
  const ready = module.status === "ready";

  return (
    <Link href={module.href} className="admin-module-card">
      <span className="admin-module-card-top">
        <span className={`admin-module-card-icon${ready ? " is-ready" : ""}`}>
          <Icon aria-hidden="true" strokeWidth={2.2} />
        </span>
        <span className={`admin-module-card-status${ready ? " is-ready" : ""}`}>
          {ready ? "Đang dùng" : "Sắp mở"}
        </span>
      </span>
      <h2>{module.title}</h2>
      <p>{module.description}</p>
    </Link>
  );
}

export function AdminHome() {
  return (
    <AdminShell title="Chọn mục cần chỉnh sửa" siteHref="/" backHref={null}>
      <p className="mb-6 max-w-2xl text-sm leading-6 text-[#5f5a57]">
        Tin tức là mục đang mở để chỉnh. Các mục khác sẽ lần lượt mở trên cùng trang quản trị này.
      </p>
      <div className="admin-module-grid">
        {ADMIN_MODULES.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </AdminShell>
  );
}
