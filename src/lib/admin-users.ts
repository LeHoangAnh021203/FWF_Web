import { randomUUID } from "node:crypto";

import { ensureAdminSchema, getSql, isDatabaseConfigured } from "@/lib/db";

export type AdminUserRole = "owner" | "staff";
export type AdminUserStatus = "pending" | "approved" | "rejected";

export type AdminUser = {
  id: string;
  email: string;
  role: AdminUserRole;
  status: AdminUserStatus;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
};

type AdminUserRow = {
  id: string;
  email: string;
  role: AdminUserRole;
  status: AdminUserStatus;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
};

const OWNER_EMAIL_DEFAULT = "itdept@facewashfox.com";
const COMPANY_DOMAIN = "@facewashfox.com";

export function getOwnerEmail(): string {
  return (process.env.ADMIN_OWNER_EMAIL?.trim() || OWNER_EMAIL_DEFAULT).toLowerCase();
}

export function isOwnerEmail(email: string): boolean {
  return normalizeAdminEmail(email) === getOwnerEmail();
}

export function normalizeAdminEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function isValidAdminEmail(email: string): boolean {
  const normalized = normalizeAdminEmail(email);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
}

export function isCompanyAdminEmail(email: string): boolean {
  const normalized = normalizeAdminEmail(email);
  return isValidAdminEmail(normalized) && normalized.endsWith(COMPANY_DOMAIN);
}

function mapRow(row: AdminUserRow): AdminUser {
  return {
    id: String(row.id),
    email: normalizeAdminEmail(row.email),
    role: row.role === "owner" ? "owner" : "staff",
    status: row.status === "approved" || row.status === "rejected" ? row.status : "pending",
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    lastLoginAt: row.last_login_at ? String(row.last_login_at) : null,
  };
}

async function withStore<T>(run: {
  db: () => Promise<T>;
  file: () => Promise<T>;
}): Promise<T> {
  if (isDatabaseConfigured()) {
    await ensureAdminSchema();
    return run.db();
  }
  return run.file();
}

export async function getAdminUserByEmail(email: string): Promise<AdminUser | null> {
  const normalized = normalizeAdminEmail(email);
  return withStore({
    db: async () => {
      const rows = (await getSql()`
        SELECT id, email, role, status, created_at, updated_at, last_login_at
        FROM admin_users
        WHERE email = ${normalized}
        LIMIT 1
      `) as AdminUserRow[];
      return rows[0] ? mapRow(rows[0]) : null;
    },
    file: async () => {
      const { fileGetUserByEmail } = await import("@/lib/admin-users-file");
      return fileGetUserByEmail(normalized);
    },
  });
}

export async function listAdminUsers(): Promise<AdminUser[]> {
  return withStore({
    db: async () => {
      const rows = (await getSql()`
        SELECT id, email, role, status, created_at, updated_at, last_login_at
        FROM admin_users
        ORDER BY
          CASE status WHEN 'pending' THEN 0 WHEN 'approved' THEN 1 ELSE 2 END,
          created_at DESC
      `) as AdminUserRow[];
      return rows.map(mapRow);
    },
    file: async () => {
      const { fileListUsers } = await import("@/lib/admin-users-file");
      return fileListUsers();
    },
  });
}

export async function upsertVerifiedAdminUser(
  email: string,
): Promise<{ user: AdminUser; created: boolean }> {
  const normalized = normalizeAdminEmail(email);
  const owner = isOwnerEmail(normalized);
  const existing = await getAdminUserByEmail(normalized);
  const now = new Date().toISOString();

  if (existing) {
    if (owner && (existing.role !== "owner" || existing.status !== "approved")) {
      return { user: await updateAdminUser(existing.id, { role: "owner", status: "approved" }), created: false };
    }
    return { user: existing, created: false };
  }

  const user: AdminUser = {
    id: randomUUID(),
    email: normalized,
    role: owner ? "owner" : "staff",
    status: owner ? "approved" : "pending",
    createdAt: now,
    updatedAt: now,
    lastLoginAt: null,
  };

  const saved = await withStore({
    db: async () => {
      const rows = (await getSql()`
        INSERT INTO admin_users (id, email, role, status, created_at, updated_at)
        VALUES (${user.id}, ${user.email}, ${user.role}, ${user.status}, ${user.createdAt}, ${user.updatedAt})
        ON CONFLICT (email) DO UPDATE SET
          role = EXCLUDED.role,
          status = CASE
            WHEN EXCLUDED.role = 'owner' THEN 'approved'
            ELSE admin_users.status
          END,
          updated_at = EXCLUDED.updated_at
        RETURNING id, email, role, status, created_at, updated_at, last_login_at
      `) as AdminUserRow[];
      return rows[0] ? mapRow(rows[0]) : user;
    },
    file: async () => {
      const { fileUpsertUser } = await import("@/lib/admin-users-file");
      return fileUpsertUser(user);
    },
  });

  return { user: saved, created: saved.id === user.id };
}

export async function createAdminStaff(email: string, status: AdminUserStatus = "approved"): Promise<AdminUser> {
  const normalized = normalizeAdminEmail(email);
  if (!isValidAdminEmail(normalized)) throw new Error("Email không hợp lệ.");
  if (isOwnerEmail(normalized)) throw new Error("Không thể tạo trùng tài khoản quản trị chính.");

  const existing = await getAdminUserByEmail(normalized);
  if (existing) throw new Error("Email này đã có trong danh sách.");

  const now = new Date().toISOString();
  const user: AdminUser = {
    id: randomUUID(),
    email: normalized,
    role: "staff",
    status,
    createdAt: now,
    updatedAt: now,
    lastLoginAt: null,
  };

  return withStore({
    db: async () => {
      const rows = (await getSql()`
        INSERT INTO admin_users (id, email, role, status, created_at, updated_at)
        VALUES (${user.id}, ${user.email}, ${user.role}, ${user.status}, ${user.createdAt}, ${user.updatedAt})
        RETURNING id, email, role, status, created_at, updated_at, last_login_at
      `) as AdminUserRow[];
      return rows[0] ? mapRow(rows[0]) : user;
    },
    file: async () => {
      const { fileUpsertUser } = await import("@/lib/admin-users-file");
      return fileUpsertUser(user);
    },
  });
}

export async function updateAdminUser(
  id: string,
  patch: { email?: string; role?: AdminUserRole; status?: AdminUserStatus },
): Promise<AdminUser> {
  const now = new Date().toISOString();
  const nextEmail = patch.email ? normalizeAdminEmail(patch.email) : undefined;
  if (nextEmail && !isValidAdminEmail(nextEmail)) throw new Error("Email không hợp lệ.");

  return withStore({
    db: async () => {
      const current = (await getSql()`
        SELECT id, email, role, status, created_at, updated_at, last_login_at
        FROM admin_users WHERE id = ${id} LIMIT 1
      `) as AdminUserRow[];
      if (!current[0]) throw new Error("Không tìm thấy tài khoản.");
      if (isOwnerEmail(current[0].email)) throw new Error("Không thể sửa tài khoản quản trị chính.");
      if (nextEmail && nextEmail !== current[0].email) {
        const clash = await getAdminUserByEmail(nextEmail);
        if (clash && clash.id !== id) throw new Error("Email này đã có trong danh sách.");
        if (isOwnerEmail(nextEmail)) throw new Error("Không thể đổi thành email quản trị chính.");
      }
      const nextRole = patch.role ?? current[0].role;
      const nextStatus = patch.status ?? current[0].status;
      const email = nextEmail ?? current[0].email;
      const rows = (await getSql()`
        UPDATE admin_users
        SET email = ${email}, role = ${nextRole}, status = ${nextStatus}, updated_at = ${now}
        WHERE id = ${id}
        RETURNING id, email, role, status, created_at, updated_at, last_login_at
      `) as AdminUserRow[];
      if (!rows[0]) throw new Error("Không tìm thấy tài khoản.");
      return mapRow(rows[0]);
    },
    file: async () => {
      const { fileUpdateUser } = await import("@/lib/admin-users-file");
      return fileUpdateUser(
        id,
        {
          ...(nextEmail ? { email: nextEmail } : {}),
          ...(patch.role ? { role: patch.role } : {}),
          ...(patch.status ? { status: patch.status } : {}),
        },
        now,
      );
    },
  });
}

export async function deleteAdminUser(id: string): Promise<void> {
  await withStore({
    db: async () => {
      const current = (await getSql()`
        SELECT email FROM admin_users WHERE id = ${id} LIMIT 1
      `) as { email: string }[];
      if (!current[0]) throw new Error("Không tìm thấy tài khoản.");
      if (isOwnerEmail(current[0].email)) throw new Error("Không thể xóa tài khoản quản trị chính.");
      await getSql()`DELETE FROM admin_users WHERE id = ${id}`;
    },
    file: async () => {
      const { fileDeleteUser } = await import("@/lib/admin-users-file");
      await fileDeleteUser(id);
    },
  });
}

export async function markAdminLogin(email: string): Promise<void> {
  const normalized = normalizeAdminEmail(email);
  const now = new Date().toISOString();
  await withStore({
    db: async () => {
      await getSql()`
        UPDATE admin_users SET last_login_at = ${now}, updated_at = ${now}
        WHERE email = ${normalized}
      `;
    },
    file: async () => {
      const { fileTouchLogin } = await import("@/lib/admin-users-file");
      await fileTouchLogin(normalized, now);
    },
  });
}

export function canAccessAdmin(user: AdminUser | null | undefined): user is AdminUser {
  return Boolean(user && user.status === "approved");
}
