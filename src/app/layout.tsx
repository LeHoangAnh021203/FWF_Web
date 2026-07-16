import type { Metadata } from "next";
import CookiePolicyBanner from "./cookie-policy-banner";
import { VerticalMenu } from "./site-chrome";
import "./globals.css";

export const metadata: Metadata = {
  title: "Face Wash Fox - Chuỗi cửa hàng rửa mặt công nghệ",
  description:
    "Face Wash Fox là chuỗi cửa hàng rửa mặt công nghệ, chăm sóc da chuyên nghiệp lần đầu xuất hiện tại Việt Nam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <VerticalMenu />
        {children}
        <CookiePolicyBanner />
      </body>
    </html>
  );
}
