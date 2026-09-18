"use client";

import { Check, CircleCheck, CircleX, Pencil, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

import type { AdminUser, AdminUserStatus } from "@/lib/admin-users";

import { AdminNotice } from "../admin-notice";
import { AdminShell } from "../admin-shell";

function formatWhen(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

type StaffDialog = {
  mode: "create" | "edit";
  id?: string;
  email: string;
  status: AdminUserStatus;
};

export function StaffManager({ accountEmail }: { accountEmail: string }) {
  const [items, setItems] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [dialogBusy, setDialogBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeAutoClose, setNoticeAutoClose] = useState<number | undefined>(3500);
  const [dialog, setDialog] = useState<StaffDialog | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/staff");
      const data = (await response.json()) as { items?: AdminUser[]; error?: string };
      if (!response.ok) throw new Error(data.error || "Không tải được danh sách nhân sự.");
      setItems(data.items ?? []);
      setError("");
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Không kết nối được máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const saveStaff = async () => {
    if (!dialog) return;
    setDialogBusy(true);
    setError("");
    try {
      if (dialog.mode === "create") {
        const response = await fetch("/api/admin/staff", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: dialog.email, status: dialog.status }),
        });
        const data = (await response.json()) as { user?: AdminUser; error?: string };
        if (!response.ok || !data.user) throw new Error(data.error || "Không thêm được nhân sự.");
        setItems((current) => [data.user!, ...current.filter((item) => item.id !== data.user!.id)]);
        setNoticeTitle("Đã thêm nhân sự");
        setNoticeAutoClose(3500);
        setMessage(`Đã thêm ${data.user.email}.`);
      } else if (dialog.id) {
        const response = await fetch(`/api/admin/staff/${dialog.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: dialog.email, status: dialog.status }),
        });
        const data = (await response.json()) as { user?: AdminUser; error?: string };
        if (!response.ok || !data.user) throw new Error(data.error || "Không sửa được nhân sự.");
        setItems((current) =>
          current.map((item) => (item.id === data.user!.id ? { ...item, ...data.user! } : item)),
        );
        setNoticeTitle("Đã cập nhật");
        setNoticeAutoClose(3500);
        setMessage(`Đã cập nhật ${data.user.email}.`);
      }
      setDialog(null);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Không lưu được nhân sự.");
    } finally {
      setDialogBusy(false);
    }
  };

  const setStatus = async (user: AdminUser, status: Exclude<AdminUserStatus, "pending">) => {
    setBusyId(user.id);
    setError("");
    try {
      const response = await fetch(`/api/admin/staff/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = (await response.json()) as { user?: AdminUser; error?: string };
      if (!response.ok || !data.user) throw new Error(data.error || "Không cập nhật được trạng thái.");
      setItems((current) =>
          current.map((item) => (item.id === data.user!.id ? { ...item, ...data.user! } : item)),
        );
      setNoticeTitle(status === "approved" ? "Đã duyệt" : "Đã từ chối");
      setNoticeAutoClose(undefined);
      setMessage(
        status === "approved" ? `Đã duyệt ${data.user.email}.` : `Đã từ chối ${data.user.email}.`,
      );
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : "Không cập nhật được trạng thái.");
    } finally {
      setBusyId(null);
    }
  };

  const removeStaff = async (user: AdminUser) => {
    if (!window.confirm(`Xóa nhân sự “${user.email}”?`)) return;
    setBusyId(user.id);
    setError("");
    try {
      const response = await fetch(`/api/admin/staff/${user.id}`, { method: "DELETE" });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Không xóa được nhân sự.");
      setItems((current) => current.filter((item) => item.id !== user.id));
      setNoticeTitle("Đã xóa");
      setNoticeAutoClose(3500);
      setMessage(`Đã xóa ${user.email}.`);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Không xóa được nhân sự.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <AdminShell
      title="Quản lý nhân sự"
      accountEmail={accountEmail}
      action={
        <button
          type="button"
          onClick={() => setDialog({ mode: "create", email: "", status: "approved" })}
          className="rounded-full border border-[#eadfd5] bg-white px-4 py-2 text-sm font-semibold hover:bg-[#fff4ea]"
        >
          <span className="inline-flex items-center gap-1.5">
            <Plus aria-hidden="true" size={16} strokeWidth={2.4} />
            Thêm nhân sự
          </span>
        </button>
      }
    >
      {error ? <AdminNotice tone="error" message={error} onClose={() => setError("")} /> : null}
      {message && !error ? (
        <AdminNotice
          tone="success"
          title={noticeTitle || "Thành công"}
          message={message}
          onClose={() => setMessage("")}
          autoCloseMs={noticeAutoClose}
        />
      ) : null}

      <p className="mb-6 max-w-2xl text-sm leading-6 text-[#5f5a57]">
        Thêm email nhân sự để họ đăng nhập bằng OTP. Tài khoản tự đăng ký vẫn chờ duyệt trước khi vào admin.
      </p>

      {loading ? (
        <p className="rounded-[24px] border border-[#eadfd5] bg-white px-4 py-10 text-center text-sm text-[#5f5a57]">
          Đang tải...
        </p>
      ) : items.length === 0 ? (
        <p className="rounded-[24px] border border-[#eadfd5] bg-white px-4 py-10 text-center text-sm text-[#5f5a57]">
          Chưa có tài khoản nào. Bấm Thêm nhân sự để tạo.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-[24px] border border-[#eadfd5] bg-white">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead className="bg-[#fff7f0] text-xs font-bold uppercase tracking-[0.12em] text-[#9ca3af]">
              <tr>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Quyền</th>
                <th className="px-4 py-3 text-center">Trạng thái</th>
                <th className="px-4 py-3">Đăng ký</th>
                <th className="px-4 py-3">Đăng nhập gần nhất</th>
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {items.map((user) => {
                const locked = user.role === "owner";
                const busy = busyId === user.id;
                return (
                  <tr key={user.id} className="border-t border-[#eadfd5]">
                    <td className="px-4 py-3 font-semibold">{user.email}</td>
                    <td className="px-4 py-3">{user.role === "owner" ? "Quản trị IT" : "Nhân sự"}</td>
                    <td className="px-4 py-3 text-center">
                      {locked || user.status === "approved" ? (
                        <span
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"
                          title="Đã duyệt"
                          aria-label="Đã duyệt"
                        >
                          <CircleCheck aria-hidden="true" size={18} strokeWidth={2.4} />
                        </span>
                      ) : user.status === "rejected" ? (
                        <span
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600"
                          title="Từ chối"
                          aria-label="Từ chối"
                        >
                          <CircleX aria-hidden="true" size={18} strokeWidth={2.4} />
                        </span>
                      ) : (
                        <div className="inline-flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            disabled={busy}
                            title="Duyệt"
                            aria-label={`Duyệt ${user.email}`}
                            onClick={() => void setStatus(user, "approved")}
                            className="grid h-8 w-8 place-items-center rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 disabled:opacity-60"
                          >
                            <Check aria-hidden="true" size={16} strokeWidth={2.6} />
                          </button>
                          <button
                            type="button"
                            disabled={busy}
                            title="Từ chối"
                            aria-label={`Từ chối ${user.email}`}
                            onClick={() => void setStatus(user, "rejected")}
                            className="grid h-8 w-8 place-items-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-60"
                          >
                            <X aria-hidden="true" size={16} strokeWidth={2.6} />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[#5f5a57]">{formatWhen(user.createdAt)}</td>
                    <td className="px-4 py-3 text-[#5f5a57]">{formatWhen(user.lastLoginAt)}</td>
                    <td className="px-4 py-3">
                      {locked ? (
                        <p className="text-right text-xs font-semibold text-[#9ca3af]">Tài khoản chính</p>
                      ) : (
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            disabled={busy}
                            aria-label={`Sửa ${user.email}`}
                            onClick={() =>
                              setDialog({
                                mode: "edit",
                                id: user.id,
                                email: user.email,
                                status: user.status,
                              })
                            }
                            className="grid h-8 w-8 place-items-center rounded-full bg-[#fff4ea] text-[#ee6730] disabled:opacity-60"
                          >
                            <Pencil aria-hidden="true" size={14} strokeWidth={2.4} />
                          </button>
                          <button
                            type="button"
                            disabled={busy}
                            aria-label={`Xóa ${user.email}`}
                            onClick={() => void removeStaff(user)}
                            className="grid h-8 w-8 place-items-center rounded-full bg-red-50 text-red-600 disabled:opacity-60"
                          >
                            <Trash2 aria-hidden="true" size={14} strokeWidth={2.4} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {dialog ? (
        <div className="admin-news-hub-dialog" role="dialog" aria-modal="true" aria-labelledby="staff-dialog-title">
          <form
            className="admin-news-hub-dialog-card"
            onSubmit={(event) => {
              event.preventDefault();
              void saveStaff();
            }}
          >
            <h2 id="staff-dialog-title">{dialog.mode === "create" ? "Thêm nhân sự" : "Sửa nhân sự"}</h2>
            <label>
              <span>Email</span>
              <input
                autoFocus
                type="email"
                value={dialog.email}
                onChange={(event) => setDialog({ ...dialog, email: event.target.value })}
                placeholder="Nhập email"
              />
            </label>
            <label className="mt-4">
              <span>Trạng thái</span>
              <select
                value={dialog.status}
                onChange={(event) => setDialog({ ...dialog, status: event.target.value as AdminUserStatus })}
                className="w-full rounded-2xl border border-[#eadfd5] px-3 py-3 outline-none"
              >
                <option value="approved">Đã duyệt</option>
                <option value="pending">Chờ duyệt</option>
                <option value="rejected">Từ chối</option>
              </select>
            </label>
            <div className="admin-news-hub-dialog-actions">
              <button type="button" onClick={() => setDialog(null)}>
                Hủy
              </button>
              <button type="submit" disabled={dialogBusy}>
                {dialogBusy ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </AdminShell>
  );
}
