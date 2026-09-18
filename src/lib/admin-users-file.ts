import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import type { AdminUser, AdminUserRole, AdminUserStatus } from "@/lib/admin-users";

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
  return store.users.find((user) => user.email === email) ?? null;
}

export async function fileListUsers(): Promise<AdminUser[]> {
  const store = await readStore();
  return sortUsers(store.users);
}

export async function fileUpsertUser(user: AdminUser): Promise<AdminUser> {
  const store = await readStore();
  const index = store.users.findIndex((item) => item.email === user.email);
  if (index === -1) {
    store.users.push(user);
  } else {
    store.users[index] = { ...store.users[index], ...user, id: store.users[index].id };
  }
  await writeStore(store);
  return store.users.find((item) => item.email === user.email) ?? user;
}

export async function fileUpdateUser(
  id: string,
  patch: { email?: string; role?: AdminUserRole; status?: AdminUserStatus },
  now: string,
): Promise<AdminUser> {
  const store = await readStore();
  const index = store.users.findIndex((item) => item.id === id);
  if (index === -1) throw new Error("Không tìm thấy tài khoản.");
  const current = store.users[index];
  if (current.role === "owner") throw new Error("Không thể sửa tài khoản quản trị chính.");
  if (patch.email && patch.email !== current.email) {
    if (store.users.some((item) => item.email === patch.email && item.id !== id)) {
      throw new Error("Email này đã có trong danh sách.");
    }
  }
  store.users[index] = {
    ...current,
    ...(patch.email ? { email: patch.email } : {}),
    ...(patch.role ? { role: patch.role } : {}),
    ...(patch.status ? { status: patch.status } : {}),
    updatedAt: now,
  };
  await writeStore(store);
  return store.users[index];
}

export async function fileDeleteUser(id: string): Promise<void> {
  const store = await readStore();
  const target = store.users.find((item) => item.id === id);
  if (!target) throw new Error("Không tìm thấy tài khoản.");
  if (target.role === "owner") throw new Error("Không thể xóa tài khoản quản trị chính.");
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
