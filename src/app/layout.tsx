import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import CookiePolicyBanner from "./cookie-policy-banner";
import { VerticalMenu } from "./site-chrome";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

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
    <html lang="vi" className={poppins.variable}>
      <body className={`${poppins.className} antialiased`}>
        <VerticalMenu />
        {children}
        <CookiePolicyBanner />
      </body>
    </html>
  );
}
