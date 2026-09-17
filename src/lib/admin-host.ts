const ADMIN_HOSTS = new Set(["admin.facewashfox.com", "admin.localhost"]);

export function getRequestHost(hostHeader: string | null): string {
  return (hostHeader ?? "").split(":")[0]?.toLowerCase() ?? "";
}

export function isAdminHost(host: string): boolean {
  return ADMIN_HOSTS.has(host) || host.startsWith("admin.");
}

export function isLocalHost(host: string): boolean {
  return host === "localhost" || host === "127.0.0.1" || host.endsWith(".local");
}

export function getAdminOrigin(): string {
  return process.env.ADMIN_ORIGIN?.replace(/\/$/, "") || "https://admin.facewashfox.com";
}
