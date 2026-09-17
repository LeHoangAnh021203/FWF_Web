import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { getAdminModule } from "@/lib/admin-modules";

import { AdminShell } from "../../admin-shell";

type AdminModulePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AdminModuleSoonPage({ params }: AdminModulePageProps) {
  const { slug } = await params;
  const module = getAdminModule(slug);
  if (!module) notFound();
  if (module.status === "ready") redirect(module.href);

  return (
    <AdminShell title={module.title} siteHref="/">
      <div className="rounded-[28px] border border-[#eadfd5] bg-white px-6 py-10 sm:px-8">
        <p className="inline-flex rounded-full bg-[#fff4ea] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#ee6730]">
          Sắp mở
        </p>
        <h2 className="mt-4 text-2xl font-bold">{module.title}</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#5f5a57]">{module.description}</p>
        <p className="mt-6 max-w-xl text-sm leading-6 text-[#5f5a57]">
          Mục này sẽ chỉnh được như Tin tức. Hiện tại hãy vào Tin tức để đăng, ẩn, sắp xếp bài và quản lý chủ đề.
        </p>
        <Link
          href="/admin/posts"
          className="mt-8 inline-flex rounded-full bg-[#ee6730] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#ea5814]"
        >
          Mở Tin tức
        </Link>
      </div>
    </AdminShell>
  );
}
