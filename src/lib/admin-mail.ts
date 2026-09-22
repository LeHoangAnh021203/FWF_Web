import nodemailer from "nodemailer";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function smtpConfig() {
  const host = process.env.EMAIL_HOST?.trim();
  const port = Number(process.env.EMAIL_PORT || 587);
  const user = process.env.EMAIL_USER?.trim();
  const pass = (process.env.EMAIL_PASSWORD || process.env.EMAIL_PASS || "").replace(/\s/g, "");
  const from = process.env.EMAIL_FROM?.trim() || (user ? `Face Wash Fox <${user}>` : "");
  return { host, port, user, pass, from };
}

export function createMailTransporter() {
  const { host, port, user, pass } = smtpConfig();
  if (!host || !user || !pass) return null;
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

async function sendMail(options: {
  to: string;
  subject: string;
  text: string;
  html: string;
}): Promise<{ ok: boolean; error?: string }> {
  const { host, user, pass, from } = smtpConfig();
  const transporter = createMailTransporter();
  if (!host || !user || !pass || !from || !transporter) {
    return { ok: false, error: "Chưa cấu hình gửi email." };
  }

  try {
    await transporter.sendMail({ from, ...options });
    return { ok: true };
  } catch (error) {
    console.error("[admin-mail] send failed", error instanceof Error ? error.message : error);
    return { ok: false, error: "Không gửi được email." };
  }
}

export async function sendAdminOtpEmail(to: string, otp: string): Promise<{ ok: boolean; error?: string }> {
  if (process.env.NODE_ENV !== "production") {
    console.info(`[admin-otp] sending to ${to}`);
  }

  const result = await sendMail({
    to,
    subject: "Mã đăng nhập trang quản trị Face Wash Fox",
    text: `Mã OTP của bạn là ${otp}. Mã có hiệu lực trong 10 phút. Nếu bạn không yêu cầu đăng nhập, hãy bỏ qua email này.`,
    html: `
      <p>Xin chào,</p>
      <p>Mã đăng nhập trang quản trị Face Wash Fox:</p>
      <p style="font-size:28px;letter-spacing:8px;font-weight:700">${escapeHtml(otp)}</p>
      <p>Mã có hiệu lực trong 10 phút. Nếu bạn không yêu cầu đăng nhập, hãy bỏ qua email này.</p>
    `,
  });

  if (result.ok) return result;
  return {
    ok: false,
    error: result.error === "Chưa cấu hình gửi email."
      ? "Chưa cấu hình gửi email OTP."
      : "Không gửi được mã OTP. Kiểm tra cấu hình email SMTP.",
  };
}

export async function sendPendingAccessEmails(params: {
  applicantEmail: string;
  adminEmail: string;
  reviewUrl: string;
}): Promise<void> {
  const { applicantEmail, adminEmail, reviewUrl } = params;

  await Promise.allSettled([
    sendMail({
      to: applicantEmail,
      subject: "Đã nhận yêu cầu truy cập trang quản trị Face Wash Fox",
      text: [
        "Tài khoản đăng nhập trang quản trị Face Wash Fox của bạn đã được nhận và đang chờ admin duyệt.",
        "",
        "Bạn cũng có thể liên hệ itdept@facewashfox.com để được cấp tài khoản.",
      ].join("\n"),
      html: `
        <p>Xin chào,</p>
        <p>Tài khoản đăng nhập trang quản trị Face Wash Fox của bạn <strong>đã được nhận</strong> và đang <strong>chờ admin duyệt</strong>.</p>
        <p>Bạn cũng có thể liên hệ <a href="mailto:itdept@facewashfox.com">itdept@facewashfox.com</a> để được cấp tài khoản.</p>
      `,
    }),
    sendMail({
      to: adminEmail,
      subject: `Duyệt tài khoản admin mới: ${applicantEmail}`,
      text: [
        `Có tài khoản mới chờ duyệt: ${applicantEmail}`,
        "",
        `Mở Quản lý nhân sự để duyệt: ${reviewUrl}`,
      ].join("\n"),
      html: `
        <p>Có tài khoản mới chờ duyệt:</p>
        <p><strong>${escapeHtml(applicantEmail)}</strong></p>
        <p><a href="${escapeHtml(reviewUrl)}">Mở Quản lý nhân sự để duyệt</a></p>
      `,
    }),
  ]);
}

export async function sendAccessDecisionEmail(params: {
  applicantEmail: string;
  status: "approved" | "rejected";
  loginUrl: string;
}): Promise<{ ok: boolean; error?: string }> {
  const { applicantEmail, status, loginUrl } = params;
  const approved = status === "approved";

  return sendMail({
    to: applicantEmail,
    subject: approved
      ? "Tài khoản admin Face Wash Fox đã được duyệt"
      : "Tài khoản admin Face Wash Fox đã bị từ chối",
    text: approved
      ? [
          "Tài khoản đăng nhập trang quản trị Face Wash Fox của bạn đã được duyệt.",
          "",
          `Đăng nhập tại: ${loginUrl}`,
        ].join("\n")
      : [
          "Yêu cầu truy cập trang quản trị Face Wash Fox của bạn đã bị từ chối.",
          "",
          "Bạn có thể liên hệ itdept@facewashfox.com nếu cần hỗ trợ thêm.",
        ].join("\n"),
    html: approved
      ? `
        <p>Xin chào,</p>
        <p>Tài khoản đăng nhập trang quản trị Face Wash Fox của bạn <strong>đã được duyệt</strong>.</p>
        <p><a href="${escapeHtml(loginUrl)}">Đăng nhập trang quản trị</a></p>
      `
      : `
        <p>Xin chào,</p>
        <p>Yêu cầu truy cập trang quản trị Face Wash Fox của bạn <strong>đã bị từ chối</strong>.</p>
        <p>Bạn có thể liên hệ <a href="mailto:itdept@facewashfox.com">itdept@facewashfox.com</a> nếu cần hỗ trợ thêm.</p>
      `,
  });
}
