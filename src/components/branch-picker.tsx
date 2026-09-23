"use client";

import { ChevronDown, MapPin, Search } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import type { Branch } from "@/data/branches";

type BranchPickerProps = {
  id?: string;
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  branches: Branch[];
  value: number;
  distanceByBranchId?: Record<number, number>;
  required?: boolean;
  disabled?: boolean;
  onChange: (branchId: number) => void;
  className?: string;
};

function formatDistance(km: number | undefined): string | null {
  if (typeof km !== "number" || !Number.isFinite(km) || km < 0 || km > 200) {
    return null;
  }
  return `${km.toFixed(1)} km`;
}

export function BranchPicker({
  id,
  label,
  placeholder = "Chọn chi nhánh",
  searchPlaceholder = "Tìm theo tên hoặc địa chỉ…",
  branches,
  value,
  distanceByBranchId = {},
  required = false,
  disabled = false,
  onChange,
  className = "",
}: BranchPickerProps) {
  const autoId = useId();
  const fieldId = id || autoId;
  const listId = `${fieldId}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selected = useMemo(
    () => branches.find((branch) => branch.id === value) ?? null,
    [branches, value],
  );

  const sorted = useMemo(() => {
    const hasDistance = Object.keys(distanceByBranchId).length > 0;
    if (!hasDistance) return branches;
    return [...branches].sort(
      (left, right) =>
        (distanceByBranchId[left.id] ?? Number.POSITIVE_INFINITY) -
        (distanceByBranchId[right.id] ?? Number.POSITIVE_INFINITY),
    );
  }, [branches, distanceByBranchId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter(
      (branch) =>
        branch.name.toLowerCase().includes(q) ||
        branch.address.toLowerCase().includes(q) ||
        branch.city.toLowerCase().includes(q),
    );
  }, [query, sorted]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    const timer = window.setTimeout(() => searchRef.current?.focus(), 30);
    return () => {
      window.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
    };
  }, [open]);

  const selectedDistance = selected
    ? formatDistance(distanceByBranchId[selected.id])
    : null;

  return (
    <div className={`relative ${className}`.trim()} ref={rootRef}>
      {label ? (
        <label
          htmlFor={fieldId}
          className="mb-[5px] block text-[0.78rem] font-semibold text-[#171412]"
        >
          {label}
          {required && !label.trim().endsWith("*") ? (
            <span aria-hidden="true"> *</span>
          ) : null}
        </label>
      ) : null}

      <button
        id={fieldId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        disabled={disabled}
        onClick={() => {
          if (disabled) return;
          setOpen((current) => !current);
        }}
        className={[
          "flex w-full min-h-12 items-center gap-2.5 rounded-[14px] border px-3 py-2.5 text-left transition",
          "border-[rgba(238,103,48,0.22)] bg-gradient-to-b from-[#fffaf6] to-[#fff8f2]",
          "hover:border-[#ee6730] focus-visible:border-[#ee6730] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[rgba(238,103,48,0.16)]",
          open ? "border-[#ee6730] ring-[3px] ring-[rgba(238,103,48,0.16)]" : "",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        ].join(" ")}
      >
        <span
          className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-[rgba(238,103,48,0.12)] text-[#ea5814]"
          aria-hidden="true"
        >
          <MapPin size={18} strokeWidth={2.2} />
        </span>
        <span className="grid min-w-0 flex-1 gap-0.5">
          {selected ? (
            <>
              <span className="truncate text-[0.92rem] font-bold leading-tight text-[#171412]">
                {selected.name}
              </span>
              <span className="truncate text-[0.75rem] leading-snug text-[#5f5a57]">
                {selected.city}
                {selectedDistance ? ` · ${selectedDistance}` : ""}
              </span>
            </>
          ) : (
            <span className="truncate text-[0.88rem] text-[#5f5a57]">
              {placeholder}
            </span>
          )}
        </span>
        <ChevronDown
          className={`shrink-0 text-[#9a8f88] transition-transform ${open ? "rotate-180" : ""}`}
          size={18}
          strokeWidth={2.2}
          aria-hidden="true"
        />
      </button>

      <select
        className="absolute m-[-1px] h-px w-px overflow-hidden border-0 p-0 whitespace-nowrap [clip:rect(0,0,0,0)]"
        tabIndex={-1}
        aria-hidden="true"
        required={required}
        value={value || ""}
        onChange={(event) => onChange(Number(event.target.value) || 0)}
      >
        <option value="">{placeholder}</option>
        {branches.map((branch) => (
          <option key={branch.id} value={branch.id}>
            {branch.name}
          </option>
        ))}
      </select>

      {open ? (
        <div className="absolute top-[calc(100%+8px)] right-0 left-0 z-50 overflow-hidden rounded-2xl border border-[rgba(238,103,48,0.2)] bg-white shadow-[0_20px_48px_-20px_rgba(14,14,14,0.45)]">
          <div className="flex items-center gap-2 border-b border-[rgba(238,103,48,0.12)] bg-[#fff5ee] px-3 py-2.5 text-[#9a8f88]">
            <Search size={16} strokeWidth={2.2} aria-hidden="true" />
            <input
              ref={searchRef}
              type="search"
              value={query}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full border-0 bg-transparent text-[0.88rem] text-[#171412] outline-none placeholder:text-[#9a8f88]"
            />
          </div>

          <ul
            id={listId}
            role="listbox"
            aria-label={placeholder}
            className="m-0 max-h-[min(320px,48vh)] list-none space-y-1 overflow-auto p-2"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-4 text-center text-[0.85rem] text-[#5f5a57]">
                Không tìm thấy chi nhánh phù hợp.
              </li>
            ) : (
              filtered.map((branch, index) => {
                const distance = formatDistance(distanceByBranchId[branch.id]);
                const active = branch.id === value;
                return (
                  <li
                    key={`${branch.id}-${index}`}
                    role="option"
                    aria-selected={active}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        onChange(branch.id);
                        setOpen(false);
                        setQuery("");
                      }}
                      className={[
                        "grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl px-3 py-2.5 text-left transition",
                        active
                          ? "bg-[rgba(238,103,48,0.12)]"
                          : "hover:bg-[rgba(238,103,48,0.08)] focus-visible:bg-[rgba(238,103,48,0.08)] focus-visible:outline-none",
                      ].join(" ")}
                    >
                      <span className="grid min-w-0 gap-1">
                        <span className="text-[0.9rem] font-bold leading-snug text-[#171412]">
                          {branch.name}
                        </span>
                        <span className="text-[0.75rem] leading-snug text-[#5f5a57]">
                          {branch.address}
                        </span>
                      </span>
                      {distance ? (
                        <span className="inline-flex min-h-[22px] items-center justify-center self-center rounded-full bg-[rgba(238,103,48,0.12)] px-2.5 text-[0.72rem] font-bold whitespace-nowrap text-[#ea5814]">
                          {distance}
                        </span>
                      ) : (
                        <span className="self-center text-center text-[0.72rem] font-semibold whitespace-nowrap text-[#5f5a57]">
                          {branch.city}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
