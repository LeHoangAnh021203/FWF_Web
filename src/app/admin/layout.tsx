import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Face Wash Fox",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#fff7f0] text-[#171412]">{children}</div>;
}
