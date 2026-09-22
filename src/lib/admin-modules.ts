export type AdminModuleStatus = "ready" | "soon";

export type AdminModule = {
  id: string;
  href: string;
  title: string;
  description: string;
  status: AdminModuleStatus;
  ownerOnly?: boolean;
};

export const ADMIN_MODULES: AdminModule[] = [
  {
    id: "tin-tuc",
    href: "/admin/posts",
    title: "Tin tức",
    description: "Chủ đề, bài viết Fox News và thứ tự hiển thị trên trang khách.",
    status: "ready",
  },
  {
    id: "trang-chu",
    href: "/admin/muc/trang-chu",
    title: "Trang chủ",
    description: "Banner, hero và các khối nội dung trang chủ.",
    status: "soon",
  },
  {
    id: "dich-vu",
    href: "/admin/muc/dich-vu",
    title: "Dịch vụ",
    description: "Gói dịch vụ, USP và nội dung trang Dịch vụ.",
    status: "soon",
  },
  {
    id: "ve-chung-toi",
    href: "/admin/muc/ve-chung-toi",
    title: "Về chúng tôi",
    description: "Câu chuyện thương hiệu, đội ngũ và văn hóa doanh nghiệp.",
    status: "soon",
  },
  {
    id: "faq",
    href: "/admin/muc/faq",
    title: "FAQ",
    description: "Câu hỏi thường gặp trên trang khách.",
    status: "soon",
  },
  {
    id: "b2b",
    href: "/admin/muc/b2b",
    title: "B2B",
    description: "Nội dung hợp tác doanh nghiệp và Fox News trên trang B2B.",
    status: "soon",
  },
  {
    id: "cua-hang",
    href: "/admin/muc/cua-hang",
    title: "Cửa hàng",
    description: "Danh sách chi nhánh và Bản đồ Fox.",
    status: "soon",
  },
  {
    id: "ung-dung",
    href: "/admin/muc/ung-dung",
    title: "Ứng dụng",
    description: "Trang App FWF và thông tin tải ứng dụng.",
    status: "soon",
  },
  {
    id: "nhan-su",
    href: "/admin/nhan-su",
    title: "Quản lý nhân sự",
    description: "Duyệt tài khoản đăng nhập admin và thu hồi quyền truy cập.",
    status: "ready",
    ownerOnly: true,
  },
];

export function getAdminModule(id: string): AdminModule | undefined {
  return ADMIN_MODULES.find((module) => module.id === id);
}

/** Modules an owner can assign to staff (excludes nhan-su). */
export function getAssignableAdminModules(): AdminModule[] {
  return ADMIN_MODULES.filter((module) => !module.ownerOnly);
}

export function normalizeAssignedModules(moduleIds: string[] | null | undefined): string[] {
  const allowed = new Set(getAssignableAdminModules().map((module) => module.id));
  const unique = new Set<string>();
  for (const id of moduleIds ?? []) {
    if (allowed.has(id)) unique.add(id);
  }
  return [...unique];
}

export function getAdminModulesForRole(role: "owner" | "staff"): AdminModule[] {
  return ADMIN_MODULES.filter((module) => !module.ownerOnly || role === "owner");
}

export function getAdminModulesForUser(user: {
  role: "owner" | "staff";
  modules?: string[];
}): AdminModule[] {
  if (user.role === "owner") return getAdminModulesForRole("owner");
  const allowed = new Set(normalizeAssignedModules(user.modules));
  return getAssignableAdminModules().filter((module) => allowed.has(module.id));
}

export function userCanAccessModule(
  user: { role: "owner" | "staff"; modules?: string[] } | null | undefined,
  moduleId: string,
): boolean {
  if (!user) return false;
  if (user.role === "owner") return true;
  const module = getAdminModule(moduleId);
  if (!module || module.ownerOnly) return false;
  return normalizeAssignedModules(user.modules).includes(moduleId);
}
