import type { Metadata } from "next";
import { Suspense } from "react";

import { ForeignMenuViewer } from "./menu-viewer";

export const metadata: Metadata = {
  title: "Menu | Face Wash Fox",
  description: "Face Wash Fox international price list by language.",
  robots: { index: false, follow: false },
};

export default function MenuNuocNgoaiPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[#fff8f2]" />}>
      <ForeignMenuViewer />
    </Suspense>
  );
}
