"use client";

import { useEffect, useState } from "react";

import { branches as fallbackBranches, type Branch } from "@/data/branches";

export type { Branch };

const CUAHANG_BRANCHES_URL =
  process.env.NEXT_PUBLIC_CUAHANG_BRANCHES_URL?.trim() ||
  "https://cuahang.facewashfox.com/api/branches?published=true";

type BranchesApiResponse = {
  success?: boolean;
  count?: number;
  data?: Branch[];
  // legacy internal shape (proxy)
  items?: Branch[];
  source?: "cuahang" | "fallback";
};

function parseBranchesPayload(payload: BranchesApiResponse): Branch[] | null {
  const raw =
    payload.success === true && Array.isArray(payload.data) && payload.data.length > 0
      ? payload.data
      : Array.isArray(payload.items) && payload.items.length > 0
        ? payload.items
        : null;
  if (!raw) return null;

  const seen = new Set<number>();
  return raw.filter((branch) => {
    if (!branch?.id || seen.has(branch.id)) return false;
    seen.add(branch.id);
    return true;
  });
}

async function fetchJson(url: string, signal: AbortSignal): Promise<BranchesApiResponse> {
  const response = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("Not JSON");
  }
  return (await response.json()) as BranchesApiResponse;
}

export function useBranches(): {
  branches: Branch[];
  loading: boolean;
  source: "cuahang" | "fallback" | "local";
} {
  const [branches, setBranches] = useState<Branch[]>(fallbackBranches);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"cuahang" | "fallback" | "local">("local");

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    (async () => {
      try {
        // 1) Official cuahang API
        const remote = await fetchJson(CUAHANG_BRANCHES_URL, controller.signal);
        const remoteItems = parseBranchesPayload(remote);
        if (remoteItems) {
          if (cancelled) return;
          setBranches(remoteItems);
          setSource("cuahang");
          setLoading(false);
          return;
        }
        throw new Error("Empty cuahang payload");
      } catch {
        try {
          // 2) Same-origin proxy (server fetch, no CORS) until cuahang enables CORS / deploys
          const local = await fetchJson("/api/branches?published=true", controller.signal);
          const localItems = parseBranchesPayload(local);
          if (localItems) {
            if (cancelled) return;
            setBranches(localItems);
            setSource(local.source === "fallback" ? "fallback" : "cuahang");
            setLoading(false);
            return;
          }
        } catch {
          // fall through
        }

        if (cancelled) return;
        setBranches(fallbackBranches);
        setSource("local");
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return { branches, loading, source };
}
