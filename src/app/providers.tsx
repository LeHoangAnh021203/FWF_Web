"use client";

import { LanguageProvider } from "@/i18n/language-context";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
