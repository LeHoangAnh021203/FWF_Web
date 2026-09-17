"use client";

import { useEffect, useRef, useState } from "react";

import type { FoxNewsItem } from "@/components/b2b/home-data";
import type { SiteLanguage } from "@/i18n/dictionaries";
import type { PublicNewsCategory } from "@/lib/news-store";

export function usePublishedNews(
  language: SiteLanguage,
  initialItems: FoxNewsItem[] = [],
  initialCategories: PublicNewsCategory[] = [],
): { items: FoxNewsItem[]; categories: PublicNewsCategory[] } {
  const fallbackItemsRef = useRef(initialItems);
  const fallbackCategoriesRef = useRef(initialCategories);
  const [items, setItems] = useState<FoxNewsItem[]>(initialItems);
  const [categories, setCategories] = useState<PublicNewsCategory[]>(initialCategories);

  useEffect(() => {
    fallbackItemsRef.current = initialItems;
  }, [initialItems]);

  useEffect(() => {
    fallbackCategoriesRef.current = initialCategories;
  }, [initialCategories]);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    fetch(`/api/news?lang=${language}`, { cache: "no-store", signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load news");
        return response.json() as Promise<{ items: FoxNewsItem[]; categories?: PublicNewsCategory[] }>;
      })
      .then((data) => {
        if (cancelled) return;
        setItems(data.items ?? []);
        setCategories(data.categories ?? []);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (!cancelled) {
          setItems(fallbackItemsRef.current);
          setCategories(fallbackCategoriesRef.current);
        }
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [language]);

  return { items, categories };
}
