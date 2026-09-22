"use client";

import { Check, CircleCheck, CircleX, Pencil, Plus, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { getAssignableAdminModules } from "@/lib/admin-modules";
import type { AdminUser, AdminUserRole, AdminUserStatus } from "@/lib/admin-users";

import { AdminConfirm, AdminNotice } from "../admin-notice";
import { AdminShell } from "../admin-shell";

const ASSIGNABLE_MODULES = getAssignableAdminModules();

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
  role: AdminUserRole;
  status: AdminUserStatus;
  modules: string[];
  step?: "form" | "otp";
  otpDigits?: string[];
};

const OTP_LENGTH = 6;
const emptyOtpDigits = () => Array.from({ length: OTP_LENGTH }, () => "");

type AccessDialog = {
  user: AdminUser;
  role: AdminUserRole;
  modules: string[];
};

export function StaffManager({
  accountEmail,
  primaryOwnerEmail,
}: {
  accountEmail: string;
  primaryOwnerEmail: string;
}) {
  const [items, setItems] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [dialogBusy, setDialogBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeAutoClose, setNoticeAutoClose] = useState<number | undefined>(3500);
  const [dialog, setDialog] = useState<StaffDialog | null>(null);
  const [accessDialog, setAccessDialog] = useState<AccessDialog | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

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

  useEffect(() => {
    if (dialog?.mode !== "create" || dialog.step !== "otp") return;
    const timer = window.setTimeout(() => otpRefs.current[0]?.focus(), 40);
    return () => window.clearTimeout(timer);
  }, [dialog?.mode, dialog?.step]);

  const toggleModule = (moduleId: string, selected: string[], onChange: (next: string[]) => void) => {
    onChange(
      selected.includes(moduleId) ? selected.filter((id) => id !== moduleId) : [...selected, moduleId],
    );
  };

  const sendInviteOtp = async () => {
    if (!dialog || dialog.mode !== "create") return;
    if (dialog.role === "staff" && dialog.modules.length === 0) {
      setError("Chọn ít nhất một trang được truy cập.");
      return;
    }
    if (!dialog.email.trim()) {
      setError("Nhập email nhân sự.");
      return;
    }
    setDialogBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/staff/invite-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: dialog.email }),
      });
      const data = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) throw new Error(data.error || "Không gửi được mã OTP.");
      setDialog({ ...dialog, step: "otp", otpDigits: emptyOtpDigits() });
      setMessage("");
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : "Không gửi được mã OTP.");
    } finally {
      setDialogBusy(false);
    }
  };

  const saveStaff = async () => {
    if (!dialog) return;
    if (dialog.role === "staff" && dialog.status === "approved" && dialog.modules.length === 0) {
      setError("Chọn ít nhất một trang được truy cập.");
      return;
    }
    setDialogBusy(true);
    setError("");
    try {
      if (dialog.mode === "create") {
        const otp = (dialog.otpDigits ?? []).join("");
        if (otp.length !== OTP_LENGTH) {
          setError("Vui lòng nhập đủ 6 số OTP đã gửi vào email.");
          setDialogBusy(false);
          return;
        }
        const response = await fetch("/api/admin/staff", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: dialog.email,
            otp,
            role: dialog.role,
            status: "approved",
            modules: dialog.role === "owner" ? [] : dialog.modules,
          }),
        });
        const data = (await response.json()) as {
          user?: AdminUser;
          error?: string;
          message?: string;
          warning?: string;
        };
        if (!response.ok || !data.user) throw new Error(data.error || "Không thêm được nhân sự.");
        setItems((current) => [data.user!, ...current.filter((item) => item.id !== data.user!.id)]);
        setNoticeTitle("Đã thêm nhân sự");
        setNoticeAutoClose(3500);
        setMessage(data.warning || data.message || `Đã thêm ${data.user.email}.`);
      } else if (dialog.id) {
        const response = await fetch(`/api/admin/staff/${dialog.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: dialog.email,
            role: dialog.role,
            status: dialog.role === "owner" ? "approved" : dialog.status,
            modules: dialog.role === "owner" ? [] : dialog.modules,
          }),
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

  const approveWithAccess = async () => {
    if (!accessDialog) return;
    if (accessDialog.role === "staff" && accessDialog.modules.length === 0) {
      setError("Chọn ít nhất một trang được truy cập.");
      return;
    }
    setBusyId(accessDialog.user.id);
    setDialogBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/staff/${accessDialog.user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "approved",
          role: accessDialog.role,
          modules: accessDialog.role === "owner" ? [] : accessDialog.modules,
        }),
      });
      const data = (await response.json()) as { user?: AdminUser; error?: string };
      if (!response.ok || !data.user) throw new Error(data.error || "Không duyệt được tài khoản.");
      setItems((current) =>
        current.map((item) => (item.id === data.user!.id ? { ...item, ...data.user! } : item)),
      );
      setAccessDialog(null);
      setNoticeTitle("Đã duyệt");
      setNoticeAutoClose(undefined);
      setMessage(`Đã duyệt ${data.user.email}.`);
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : "Không duyệt được tài khoản.");
    } finally {
      setBusyId(null);
      setDialogBusy(false);
    }
  };

  const setStatus = async (user: AdminUser, status: "rejected") => {
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
      setNoticeTitle("Đã từ chối");
      setNoticeAutoClose(undefined);
      setMessage(`Đã từ chối ${data.user.email}.`);
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : "Không cập nhật được trạng thái.");
    } finally {
      setBusyId(null);
    }
  };

  const removeStaff = async () => {
    if (!deleteTarget) return;
    const user = deleteTarget;
    setBusyId(user.id);
    setError("");
    try {
      const response = await fetch(`/api/admin/staff/${user.id}`, { method: "DELETE" });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Không xóa được nhân sự.");
      setItems((current) => current.filter((item) => item.id !== user.id));
      setDeleteTarget(null);
      setNoticeTitle("Đã xóa");
      setNoticeAutoClose(3500);
      setMessage(`Đã xóa ${user.email}.`);
    } catch (deleteError) {
      setDeleteTarget(null);
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
          onClick={() =>
            setDialog({
              mode: "create",
              email: "",
              role: "staff",
              status: "approved",
              modules: ["tin-tuc"],
              step: "form",
              otpDigits: emptyOtpDigits(),
            })
          }
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
        Thêm email để đăng nhập OTP. <strong>Admin</strong> toàn quyền; <strong>Nhân sự</strong> chỉ
        vào các trang được cấp lúc duyệt hoặc khi sửa.
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
                const locked = user.email.toLowerCase() === primaryOwnerEmail.toLowerCase();
                const busy = busyId === user.id;
                return (
                  <tr key={user.id} className="border-t border-[#eadfd5]">
                    <td className="px-4 py-3 font-semibold">{user.email}</td>
                    <td className="px-4 py-3">{user.role === "owner" ? "Admin" : "Nhân sự"}</td>
                    <td className="px-4 py-3 text-center">
                      {user.status === "approved" ? (
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
                            onClick={() =>
                              setAccessDialog({
                                user,
                                role: "staff",
                                modules: user.modules?.length ? user.modules : ["tin-tuc"],
                              })
                            }
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
                                role: user.role,
                                status: user.status,
                                modules: user.modules?.length ? user.modules : ["tin-tuc"],
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
                            onClick={() => setDeleteTarget(user)}
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

      {accessDialog ? (
        <div className="admin-news-hub-dialog" role="dialog" aria-modal="true" aria-labelledby="access-dialog-title">
          <form
            className="admin-news-hub-dialog-card !max-w-md"
            onSubmit={(event) => {
              event.preventDefault();
              void approveWithAccess();
            }}
          >
            <h2 id="access-dialog-title">Duyệt quyền truy cập</h2>
            <p className="mb-3 text-sm text-[#5f5a57]">
              Quyền cho <strong>{accessDialog.user.email}</strong>
            </p>
            <label className="mb-3">
              <span>Quyền</span>
              <select
                value={accessDialog.role}
                onChange={(event) =>
                  setAccessDialog({
                    ...accessDialog,
                    role: event.target.value as AdminUserRole,
                  })
                }
                className="w-full rounded-2xl border border-[#eadfd5] px-3 py-3 outline-none"
              >
                <option value="staff">Nhân sự</option>
                <option value="owner">Admin</option>
              </select>
            </label>
            {accessDialog.role === "staff" ? (
              <div className="grid grid-cols-2 gap-1.5">
                {ASSIGNABLE_MODULES.map((module) => {
                  const checked = accessDialog.modules.includes(module.id);
                  return (
                    <label
                      key={module.id}
                      className={`admin-module-check${checked ? " is-checked" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          toggleModule(module.id, accessDialog.modules, (modules) =>
                            setAccessDialog({ ...accessDialog, modules }),
                          )
                        }
                      />
                      <span>
                        {module.title}
                        {module.status === "soon" ? " · sớm" : ""}
                      </span>
                    </label>
                  );
                })}
              </div>
            ) : null}
            <div className="admin-news-hub-dialog-actions">
              <button type="button" onClick={() => setAccessDialog(null)}>
                Hủy
              </button>
              <button
                type="submit"
                disabled={
                  dialogBusy ||
                  (accessDialog.role === "staff" && accessDialog.modules.length === 0)
                }
              >
                {dialogBusy ? "Đang duyệt..." : "Duyệt tài khoản"}
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {dialog ? (
        <div className="admin-news-hub-dialog" role="dialog" aria-modal="true" aria-labelledby="staff-dialog-title">
          <form
            className="admin-news-hub-dialog-card !max-w-md"
            onSubmit={(event) => {
              event.preventDefault();
              if (dialog.mode === "create" && dialog.step !== "otp") {
                void sendInviteOtp();
                return;
              }
              void saveStaff();
            }}
          >
            <h2 id="staff-dialog-title">
              {dialog.mode === "create"
                ? dialog.step === "otp"
                  ? "Nhập mã OTP"
                  : "Thêm nhân sự"
                : "Sửa quyền"}
            </h2>

            {dialog.mode === "create" && dialog.step === "otp" ? (
              <>
                <p className="mb-4 text-sm leading-6 text-[#5f5a57]">
                  Đã gửi mã 6 số tới <strong>{dialog.email}</strong>. Nhập đúng OTP để tạo tài khoản.
                </p>
                <div className="flex justify-center gap-2" role="group" aria-label="Mã OTP">
                  {(dialog.otpDigits ?? emptyOtpDigits()).map((digit, index) => (
                    <input
                      key={`invite-otp-${index}`}
                      ref={(node) => {
                        otpRefs.current[index] = node;
                      }}
                      type="text"
                      inputMode="numeric"
                      autoComplete={index === 0 ? "one-time-code" : "off"}
                      maxLength={1}
                      value={digit}
                      aria-label={`Số OTP thứ ${index + 1}`}
                      className="h-12 w-10 rounded-xl border border-[#eadfd5] text-center text-lg font-bold text-[#171412] outline-none focus:border-[#ee6730]"
                      onChange={(event) => {
                        const value = event.target.value.replace(/\D/g, "");
                        const digits = [...(dialog.otpDigits ?? emptyOtpDigits())];
                        if (value.length > 1) {
                          const pasted = value.slice(0, OTP_LENGTH - index).split("");
                          pasted.forEach((char, offset) => {
                            digits[index + offset] = char;
                          });
                          setDialog({ ...dialog, otpDigits: digits });
                          const focusIndex = Math.min(index + pasted.length, OTP_LENGTH - 1);
                          otpRefs.current[focusIndex]?.focus();
                          return;
                        }
                        digits[index] = value.slice(-1);
                        setDialog({ ...dialog, otpDigits: digits });
                        if (value && index < OTP_LENGTH - 1) otpRefs.current[index + 1]?.focus();
                      }}
                      onKeyDown={(event) => {
                        const digits = dialog.otpDigits ?? emptyOtpDigits();
                        if (event.key === "Backspace" && !digits[index] && index > 0) {
                          otpRefs.current[index - 1]?.focus();
                        }
                        if (event.key === "ArrowLeft" && index > 0) {
                          event.preventDefault();
                          otpRefs.current[index - 1]?.focus();
                        }
                        if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
                          event.preventDefault();
                          otpRefs.current[index + 1]?.focus();
                        }
                      }}
                      onPaste={(event) => {
                        event.preventDefault();
                        const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
                        if (!pasted) return;
                        const digits = emptyOtpDigits();
                        pasted.split("").forEach((char, offset) => {
                          digits[offset] = char;
                        });
                        setDialog({ ...dialog, otpDigits: digits });
                        otpRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
                      }}
                    />
                  ))}
                </div>
                <div className="admin-news-hub-dialog-actions !justify-between">
                  <button
                    type="button"
                    disabled={dialogBusy}
                    onClick={() => setDialog({ ...dialog, step: "form", otpDigits: emptyOtpDigits() })}
                  >
                    Quay lại
                  </button>
                  <div className="flex gap-2">
                    <button type="button" disabled={dialogBusy} onClick={() => void sendInviteOtp()}>
                      Gửi lại
                    </button>
                    <button
                      type="submit"
                      disabled={dialogBusy || (dialog.otpDigits ?? []).join("").length !== OTP_LENGTH}
                    >
                      {dialogBusy ? "Đang tạo..." : "Tạo nhân sự"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
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
                  <span>Quyền</span>
                  <select
                    value={dialog.role === "owner" ? "owner" : "staff"}
                    onChange={(event) =>
                      setDialog({ ...dialog, role: event.target.value as AdminUserRole })
                    }
                    className="w-full rounded-2xl border border-[#eadfd5] px-3 py-3 outline-none"
                  >
                    <option value="staff">Nhân sự</option>
                    <option value="owner">Admin</option>
                  </select>
                </label>
                {dialog.mode === "edit" && dialog.role !== "owner" ? (
                  <label className="mt-4">
                    <span>Trạng thái</span>
                    <select
                      value={dialog.status}
                      onChange={(event) =>
                        setDialog({ ...dialog, status: event.target.value as AdminUserStatus })
                      }
                      className="w-full rounded-2xl border border-[#eadfd5] px-3 py-3 outline-none"
                    >
                      <option value="approved">Đã duyệt</option>
                      <option value="pending">Chờ duyệt</option>
                      <option value="rejected">Từ chối</option>
                    </select>
                  </label>
                ) : null}
                {dialog.role === "owner" ? null : (
                  <div className="mt-4">
                    <p className="mb-2 text-sm font-semibold">Trang được truy cập</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {ASSIGNABLE_MODULES.map((module) => {
                        const checked = dialog.modules.includes(module.id);
                        return (
                          <label
                            key={module.id}
                            className={`admin-module-check${checked ? " is-checked" : ""}`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                toggleModule(module.id, dialog.modules, (modules) =>
                                  setDialog({ ...dialog, modules }),
                                )
                              }
                            />
                            <span>{module.title}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className="admin-news-hub-dialog-actions">
                  <button type="button" onClick={() => setDialog(null)}>
                    Hủy
                  </button>
                  <button type="submit" disabled={dialogBusy}>
                    {dialogBusy
                      ? dialog.mode === "create"
                        ? "Đang gửi..."
                        : "Đang lưu..."
                      : dialog.mode === "create"
                        ? "Gửi mã OTP"
                        : "Lưu"}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      ) : null}

      {deleteTarget ? (
        <AdminConfirm
          title="Xóa nhân sự?"
          message={`Bạn sắp xóa “${deleteTarget.email}”. Tài khoản sẽ không đăng nhập admin được nữa.`}
          confirmLabel="Xóa nhân sự"
          cancelLabel="Hủy"
          tone="danger"
          busy={busyId === deleteTarget.id}
          onCancel={() => {
            if (busyId !== deleteTarget.id) setDeleteTarget(null);
          }}
          onConfirm={() => void removeStaff()}
        />
      ) : null}
    </AdminShell>
  );
}
