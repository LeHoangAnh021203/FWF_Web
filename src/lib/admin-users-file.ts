import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import type { AdminUser, AdminUserRole, AdminUserStatus } from "@/lib/admin-users";
import { isOwnerEmail } from "@/lib/admin-users";

type StoreFile = {
  users: AdminUser[];
};

const FILE_PATH = path.join(process.cwd(), "data", "local-admin-users.json");

let writeQueue: Promise<void> = Promise.resolve();

async function readStore(): Promise<StoreFile> {
  try {
    const raw = await readFile(FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as StoreFile;
    return { users: Array.isArray(parsed.users) ? parsed.users : [] };
  } catch {
    return { users: [] };
  }
}

async function writeStore(store: StoreFile): Promise<void> {
  writeQueue = writeQueue.then(async () => {
    await mkdir(path.dirname(FILE_PATH), { recursive: true });
    await writeFile(FILE_PATH, `${JSON.stringify(store, null, 2)}\n`);
  });
  await writeQueue;
}

function sortUsers(users: AdminUser[]): AdminUser[] {
  const rank = { pending: 0, approved: 1, rejected: 2 };
  return [...users].sort((a, b) => {
    const byStatus = rank[a.status] - rank[b.status];
    if (byStatus !== 0) return byStatus;
    return b.createdAt.localeCompare(a.createdAt);
  });
}

export async function fileGetUserByEmail(email: string): Promise<AdminUser | null> {
  const store = await readStore();
  const user = store.users.find((item) => item.email === email) ?? null;
  if (!user) return null;
  return { ...user, modules: Array.isArray(user.modules) ? user.modules : [] };
}

export async function fileListUsers(): Promise<AdminUser[]> {
  const store = await readStore();
  return sortUsers(
    store.users.map((user) => ({
      ...user,
      modules: Array.isArray(user.modules) ? user.modules : [],
    })),
  );
}

export async function fileUpsertUser(user: AdminUser): Promise<AdminUser> {
  const store = await readStore();
  const index = store.users.findIndex((item) => item.email === user.email);
  const normalized: AdminUser = {
    ...user,
    modules: Array.isArray(user.modules) ? user.modules : [],
  };
  if (index === -1) {
    store.users.push(normalized);
  } else {
    store.users[index] = { ...store.users[index], ...normalized, id: store.users[index].id };
  }
  await writeStore(store);
  return store.users.find((item) => item.email === user.email) ?? normalized;
}

export async function fileUpdateUser(
  id: string,
  patch: { email?: string; role?: AdminUserRole; status?: AdminUserStatus; modules?: string[] },
  now: string,
): Promise<AdminUser> {
  const store = await readStore();
  const index = store.users.findIndex((item) => item.id === id);
  if (index === -1) throw new Error("Không tìm thấy tài khoản.");
  const current = store.users[index];
  if (isOwnerEmail(current.email)) throw new Error("Không thể sửa tài khoản quản trị chính.");
  if (patch.email && patch.email !== current.email) {
    if (store.users.some((item) => item.email === patch.email && item.id !== id)) {
      throw new Error("Email này đã có trong danh sách.");
    }
    if (isOwnerEmail(patch.email)) throw new Error("Không thể đổi thành email quản trị chính.");
  }
  const nextRole: AdminUserRole =
    patch.role === "owner" || patch.role === "staff" ? patch.role : current.role;
  const nextStatus: AdminUserStatus =
    nextRole === "owner" ? "approved" : (patch.status ?? current.status);
  let modules: string[];
  if (nextRole === "owner") {
    modules = [];
  } else if (patch.modules) {
    modules = patch.modules;
  } else if (nextStatus === "rejected") {
    modules = [];
  } else if (current.role === "owner") {
    modules = [];
  } else {
    modules = Array.isArray(current.modules) ? current.modules : [];
  }
  if (nextRole === "staff" && nextStatus === "approved" && modules.length === 0) {
    throw new Error("Chọn ít nhất một trang được truy cập.");
  }
  store.users[index] = {
    ...current,
    ...(patch.email ? { email: patch.email } : {}),
    role: nextRole,
    status: nextStatus,
    modules,
    updatedAt: now,
  };
  await writeStore(store);
  return store.users[index];
}

export async function fileDeleteUser(id: string): Promise<void> {
  const store = await readStore();
  const target = store.users.find((item) => item.id === id);
  if (!target) throw new Error("Không tìm thấy tài khoản.");
  if (isOwnerEmail(target.email)) throw new Error("Không thể xóa tài khoản quản trị chính.");
  store.users = store.users.filter((item) => item.id !== id);
  await writeStore(store);
}

export async function fileTouchLogin(email: string, now: string): Promise<void> {
  const store = await readStore();
  const index = store.users.findIndex((item) => item.email === email);
  if (index === -1) return;
  store.users[index] = {
    ...store.users[index],
    lastLoginAt: now,
    updatedAt: now,
  };
  await writeStore(store);
}
