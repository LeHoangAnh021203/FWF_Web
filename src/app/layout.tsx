import type { Metadata } from "next";
import localFont from "next/font/local";

import CookiePolicyBanner from "./cookie-policy-banner";
import { VerticalMenu } from "./site-chrome";
import "./globals.css";

const svnPoppins = localFont({
  src: [
    {
      path: "../fonts/svn-poppins/SVN-Poppins-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/svn-poppins/SVN-Poppins-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../fonts/svn-poppins/SVN-Poppins-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/svn-poppins/SVN-Poppins-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../fonts/svn-poppins/SVN-Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/svn-poppins/SVN-Poppins-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/svn-poppins/SVN-Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/svn-poppins/SVN-Poppins-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/svn-poppins/SVN-Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/svn-poppins/SVN-Poppins-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/svn-poppins/SVN-Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/svn-poppins/SVN-Poppins-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/svn-poppins/SVN-Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/svn-poppins/SVN-Poppins-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/svn-poppins/SVN-Poppins-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/svn-poppins/SVN-Poppins-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../fonts/svn-poppins/SVN-Poppins-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/svn-poppins/SVN-Poppins-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-poppins",
  display: "swap",
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "Face Wash Fox - Chuỗi cửa hàng rửa mặt công nghệ",
  description:
    "Face Wash Fox là chuỗi cửa hàng rửa mặt công nghệ, chăm sóc da chuyên nghiệp lần đầu xuất hiện tại Việt Nam.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={svnPoppins.variable}>
      <body className={`${svnPoppins.className} antialiased`}>
        <VerticalMenu />
        {children}
        <CookiePolicyBanner />
      </body>
    </html>
  );
}
