"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type TextareaHTMLAttributes } from "react";
import { ArrowDown, ArrowUp, ImagePlus, Trash2, Type } from "lucide-react";

import type { ArticleBlock, LocalizedNewsFields } from "@/components/b2b/fox-news-copy";
import { categoryLabel, DEFAULT_NEWS_CATEGORIES, type NewsCategory, type NewsCategoryId } from "@/data/news-categories";
import { formatNewsDate } from "@/i18n/format-news-date";
import { useLanguage } from "@/i18n/language-context";
import type { AdminPost, PostStatus } from "@/lib/news-store";
import { slugifyVi } from "@/lib/slugify";

import { AdminNotice } from "../admin-notice";

type PostFormProps = {
  post?: AdminPost;
  presetCategoryId?: string;
};

type FormState = {
  slug: string;
  categoryId: NewsCategoryId;
  publishedAt: string;
  coverImage: string;
  sponsored: boolean;
  status: PostStatus;
  vi: LocalizedNewsFields;
};

const CATEGORY_FALLBACK = DEFAULT_NEWS_CATEGORIES;

type TranslateLang = "en" | "zh" | "ja" | "ko" | "th";

const TRANSLATE_LANGS: TranslateLang[] = ["en", "zh", "ja", "ko", "th"];

const TRANSLATE_LABEL: Record<TranslateLang, string> = {
  en: "English",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  th: "ไทย",
};

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function SaveProgressOverlay({
  percent,
  label,
  done,
}: {
  percent: number;
  label: string;
  done: boolean;
}) {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[#171412]/55 px-4 backdrop-blur-[2px]" role="dialog" aria-live="polite" aria-label="Tiến trình lưu bài viết">
      <div className="w-full max-w-sm rounded-[28px] bg-white p-8 text-center shadow-2xl">
        <div
          className="mx-auto grid h-32 w-32 place-items-center rounded-full"
          style={{
            background: `conic-gradient(#ee6730 ${clamped}%, #f3e7dc ${clamped}%)`,
          }}
        >
          <div className="grid h-[108px] w-[108px] place-items-center rounded-full bg-white">
            <p className="text-3xl font-bold tabular-nums text-[#171412]">{clamped}%</p>
          </div>
        </div>
        <p className="mt-5 text-base font-semibold text-[#171412]">
          {done ? "Hoàn thành" : "Đang lưu bài viết"}
        </p>
        <p className="mt-2 text-sm leading-6 text-[#6b7280]">{label}</p>
      </div>
    </div>
  );
}

const emptyLocale = (): LocalizedNewsFields => ({
  title: "",
  excerpt: "",
  intro: "",
  lead: "",
  paragraphs: [{ type: "paragraph", content: "" }],
  bullets: [],
  quote: "",
  cta: "",
});

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

async function uploadImage(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const response = await fetch("/api/admin/upload", { method: "POST", body });
  const data = (await response.json()) as { url?: string; error?: string };
  if (!response.ok || !data.url) {
    throw new Error(data.error || "Không upload được ảnh.");
  }
  return data.url;
}

function AutoTextarea({
  className = "",
  value,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(el.scrollHeight, 32)}px`;
  }, [value]);

  return (
    <textarea
      {...props}
      ref={ref}
      rows={1}
      value={value}
      className={`w-full resize-none overflow-hidden bg-transparent outline-none placeholder:text-[#d1d5db] ${className}`}
    />
  );
}

function ImageFrame({
  src,
  alt,
  onPick,
  label,
}: {
  src: string;
  alt: string;
  onPick: (file: File) => void;
  label: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="group relative block w-full overflow-hidden rounded-[28px] bg-[#fff7ed] md:rounded-[36px]"
    >
      <span className="relative block aspect-[16/10]">
        {src ? (
          <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-sm font-medium text-[#9ca3af]">
            {label}
          </span>
        )}
        <span className="absolute inset-0 grid place-items-center bg-black/0 text-sm font-semibold text-white opacity-0 transition group-hover:bg-black/35 group-hover:opacity-100">
          Đổi ảnh
        </span>
      </span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onPick(file);
          event.target.value = "";
        }}
      />
    </button>
  );
}

export function PostForm({ post, presetCategoryId }: PostFormProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [slugLocked, setSlugLocked] = useState(Boolean(post));
  const [pending, setPending] = useState<"save" | "translate" | "retranslate" | null>(null);
  const [progress, setProgress] = useState<{ percent: number; label: string; done: boolean } | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<NewsCategory[]>(CATEGORY_FALLBACK);
  const [form, setForm] = useState<FormState>(() =>
    post
      ? {
          slug: post.slug,
          categoryId: post.categoryId,
          publishedAt: post.publishedAt,
          coverImage: post.coverImage,
          sponsored: post.sponsored,
          status: post.status,
          vi: {
            ...post.vi,
            paragraphs: post.vi.paragraphs.length ? post.vi.paragraphs : [{ type: "paragraph", content: "" }],
          },
        }
      : {
          slug: "",
          categoryId: presetCategoryId || CATEGORY_FALLBACK[0].id,
          publishedAt: todayIso(),
          coverImage: "",
          sponsored: false,
          status: "draft",
          vi: emptyLocale(),
        },
  );

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/admin/categories", { signal: controller.signal })
      .then(async (response) => {
        const data = (await response.json()) as { items?: NewsCategory[] };
        const nextCategories = data.items ?? [];
        if (!response.ok || nextCategories.length === 0) return;
        setCategories(nextCategories);
        setForm((current) => {
          if (nextCategories.some((category) => category.id === current.categoryId)) return current;
          return { ...current, categoryId: nextCategories[0].id };
        });
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  const translationSummary = useMemo(() => {
    if (!post) return "";
    return Object.entries(post.translationMeta)
      .filter(([language]) => language !== "vi")
      .map(([language, source]) => `${language.toUpperCase()}: ${source === "missing" ? "chưa có" : source}`)
      .join(" · ");
  }, [post]);

  const displayDate = formatNewsDate(form.publishedAt, "vi");

  const setVi = (patch: Partial<LocalizedNewsFields>) => {
    setForm((current) => ({ ...current, vi: { ...current.vi, ...patch } }));
  };

  const setBlock = (index: number, block: ArticleBlock) => {
    setForm((current) => {
      const paragraphs = current.vi.paragraphs.slice();
      paragraphs[index] = block;
      return { ...current, vi: { ...current.vi, paragraphs } };
    });
  };

  const moveBlock = (index: number, direction: -1 | 1) => {
    setForm((current) => {
      const next = index + direction;
      if (next < 0 || next >= current.vi.paragraphs.length) return current;
      const paragraphs = current.vi.paragraphs.slice();
      const [item] = paragraphs.splice(index, 1);
      paragraphs.splice(next, 0, item);
      return { ...current, vi: { ...current.vi, paragraphs } };
    });
  };

  const removeBlock = (index: number) => {
    setForm((current) => ({
      ...current,
      vi: {
        ...current.vi,
        paragraphs: current.vi.paragraphs.filter((_, itemIndex) => itemIndex !== index),
      },
    }));
  };

  const addBlock = (type: ArticleBlock["type"], at?: number) => {
    setForm((current) => {
      const nextBlock: ArticleBlock =
        type === "image" ? { type: "image", src: "", alt: "" } : { type: "paragraph", content: "" };
      const paragraphs = current.vi.paragraphs.slice();
      const index = at == null ? paragraphs.length : at + 1;
      paragraphs.splice(index, 0, nextBlock);
      return { ...current, vi: { ...current.vi, paragraphs } };
    });
  };

  const payload = () => ({
    ...form,
    translate: false,
    vi: {
      ...form.vi,
      paragraphs: form.vi.paragraphs.filter((block) =>
        block.type === "paragraph" ? block.content.trim() : block.src.trim(),
      ),
      bullets: form.vi.bullets.map((item) => item.trim()).filter(Boolean),
    },
  });

  const persistVietnamese = async (status?: PostStatus): Promise<AdminPost | null> => {
    const body = { ...payload(), status: status ?? form.status, translate: false };
    const response = await fetch(post ? `/api/admin/posts/${post.id}` : "/api/admin/posts", {
      method: post ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await response.json()) as { post?: AdminPost; error?: string; warning?: string };
    if (!response.ok) {
      setError(data.error || "Không lưu được bài.");
      return null;
    }
    return data.post ?? post ?? null;
  };

  const translateOne = async (id: string, language: TranslateLang, force: boolean) => {
    const response = await fetch(`/api/admin/posts/${id}/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language, force }),
    });
    const data = (await response.json()) as { error?: string; skipped?: string[] };
    if (!response.ok) {
      throw new Error(data.error || `Không dịch được ${TRANSLATE_LABEL[language]}.`);
    }
    return data.skipped ?? [];
  };

  const confirmPublicLive = async (languages: string[]) => {
    await Promise.all(
      languages.map((language) => fetch(`/api/news?lang=${language}`, { cache: "no-store" })),
    ).catch(() => undefined);
  };

  const save = async (
    options: { translate?: boolean; status?: PostStatus; forceTranslate?: boolean; asRetranslate?: boolean } = {},
  ) => {
    const withTranslate = Boolean(options.translate);
    const mode = options.asRetranslate ? "retranslate" : withTranslate ? "translate" : "save";
    setPending(mode);
    setError("");
    setMessage("");
    setProgress({ percent: 6, label: "Đang lưu bản tiếng Việt…", done: false });

    try {
      const saved = await persistVietnamese(options.status);
      if (!saved) {
        setProgress(null);
        return null;
      }

      const notes: string[] = [];
      if (withTranslate) {
        setProgress({
          percent: 22,
          label: "Đã lưu tiếng Việt. Bắt đầu dịch các ngôn ngữ khác…",
          done: false,
        });
        for (let index = 0; index < TRANSLATE_LANGS.length; index += 1) {
          const language = TRANSLATE_LANGS[index];
          const base = 22 + index * 14;
          setProgress({
            percent: base + 4,
            label: `Đang dịch ${TRANSLATE_LABEL[language]} và cập nhật giao diện khách…`,
            done: false,
          });
          try {
            const skipped = await translateOne(saved.id, language, Boolean(options.forceTranslate));
            if (skipped.includes(language)) {
              notes.push(`Bỏ qua ${TRANSLATE_LABEL[language]} (bản sửa tay)`);
            }
          } catch (translateError) {
            notes.push(
              translateError instanceof Error
                ? translateError.message
                : `Không dịch được ${TRANSLATE_LABEL[language]}.`,
            );
          }
          setProgress({
            percent: base + 14,
            label: `Đã xử lý ${TRANSLATE_LABEL[language]} trên giao diện khách`,
            done: false,
          });
        }
      } else {
        setProgress({ percent: 82, label: "Đang cập nhật giao diện khách hàng…", done: false });
      }

      setProgress({ percent: 96, label: "Đang xác nhận giao diện khách hàng đã cập nhật…", done: false });
      await confirmPublicLive(withTranslate ? ["vi", ...TRANSLATE_LANGS] : ["vi"]);
      setProgress({
        percent: 100,
        label: "Hoàn thành — giao diện khách hàng đã cập nhật",
        done: true,
      });
      await wait(1100);

      const extra = notes.length ? ` ${notes.join(". ")}.` : "";
      setMessage(
        withTranslate
          ? `Đã lưu và cập nhật giao diện khách hàng.${extra}`
          : "Đã lưu. Giao diện khách hàng đã cập nhật.",
      );

      if (!post) {
        router.replace(`/admin/posts/${saved.id}`);
        router.refresh();
      }
      return saved;
    } catch {
      setError("Không kết nối được máy chủ.");
      return null;
    } finally {
      setPending(null);
      setProgress(null);
    }
  };

  const retranslate = async () => {
    await save({ translate: true, asRetranslate: true });
  };

  const onUpload = async (file: File, apply: (url: string) => void) => {
    try {
      apply(await uploadImage(file));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Không upload được ảnh.");
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-white text-[#171412]">
      {progress ? (
        <SaveProgressOverlay percent={progress.percent} label={progress.label} done={progress.done} />
      ) : null}
      {error ? <AdminNotice tone="error" message={error} onClose={() => setError("")} /> : null}
      {!error && message ? (
        <AdminNotice tone="success" message={message} onClose={() => setMessage("")} autoCloseMs={4000} />
      ) : null}
      <header className="sticky top-0 z-30 border-b border-[#eadfd5] bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 md:px-8">
          <div className="flex items-center gap-3">
            <Link href="/admin">
              <img src="/logo/fwf-orange.png" alt="Face Wash Fox" className="h-8 w-auto" />
            </Link>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Link href="/admin/posts" className="admin-back-link">
                ← Quay về
              </Link>
              <p className="text-sm font-semibold text-[#5f5a57]">
                {post ? "Sửa bài viết" : "Thêm bài viết"}
                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                    form.status === "published"
                      ? "bg-[#fff4ea] text-[#ee6730]"
                      : form.status === "hidden"
                        ? "bg-stone-100 text-stone-600"
                        : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {form.status === "published" ? "Đã đăng" : form.status === "hidden" ? "Đang ẩn" : "Nháp"}
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={Boolean(pending)}
              onClick={() => void save()}
              className="rounded-full bg-[#171412] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {pending === "save" ? `${progress?.percent ?? 0}%` : "Lưu"}
            </button>
            <button
              type="button"
              disabled={Boolean(pending)}
              onClick={() => void save({ status: "published", translate: true })}
              className="rounded-full bg-[#ee6730] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {pending === "translate" ? `${progress?.percent ?? 0}%` : "Lưu, đăng và dịch"}
            </button>
            {post ? (
              <button
                type="button"
                disabled={Boolean(pending)}
                onClick={() => void retranslate()}
                className="rounded-full border border-[#eadfd5] px-4 py-2 text-sm font-semibold disabled:opacity-60"
              >
                {pending === "retranslate" ? `${progress?.percent ?? 0}%` : "Dịch lại"}
              </button>
            ) : null}
            <button type="button" onClick={() => void logout()} className="text-sm font-semibold text-[#5f5a57]">
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-10 sm:px-6 md:px-8 md:pb-24 md:pt-12">
        <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] font-medium text-[#9ca3af] md:mb-10 md:text-base">
          <Link href="/admin" className="transition-colors hover:text-[#ff6a3d]">
            Trang chủ
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/admin/posts" className="transition-colors hover:text-[#ff6a3d]">
            Tin tức
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#ff6a3d]">{form.vi.title || "Tiêu đề bài viết"}</span>
        </nav>

        <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] xl:gap-12">
          <article className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <label className="relative cursor-pointer">
                <time dateTime={form.publishedAt} className="text-base font-medium text-[#9ca3af] md:text-lg">
                  {displayDate}
                </time>
                <input
                  type="date"
                  value={form.publishedAt}
                  onChange={(event) => setForm((current) => ({ ...current, publishedAt: event.target.value }))}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
              </label>
              <button
                type="button"
                onClick={() => setForm((current) => ({ ...current, sponsored: !current.sponsored }))}
                className="inline-flex min-w-[92px] items-center justify-center rounded-full border border-[#f0c437] bg-[repeating-linear-gradient(45deg,rgba(240,196,55,0.18)_0,rgba(240,196,55,0.18)_11px,rgba(255,220,90,0.42)_11px,rgba(255,220,90,0.42)_22px)] px-5 py-1 text-[15px] font-medium italic text-black"
              >
                {form.sponsored ? t("home.news.adLabel") : t("home.news.badge")}
              </button>
            </div>

            <AutoTextarea
              value={form.vi.title}
              placeholder="Nhập tiêu đề bài viết"
              onChange={(event) => {
                const title = event.target.value;
                setForm((current) => ({
                  ...current,
                  slug: slugLocked ? current.slug : slugifyVi(title),
                  vi: { ...current.vi, title },
                }));
              }}
              className="page-section-title text-[#111827]"
            />

            <AutoTextarea
              value={form.vi.intro}
              placeholder="Intro cam — câu mở bài nổi bật"
              onChange={(event) => setVi({ intro: event.target.value })}
              className="mt-6 text-lg font-semibold leading-snug text-[#ff6a3d] md:mt-8 md:text-[1.35rem]"
            />

            <AutoTextarea
              value={form.vi.lead}
              placeholder="Đoạn lead dẫn vào nội dung"
              onChange={(event) => setVi({ lead: event.target.value })}
              className="mt-4 text-base leading-relaxed text-[#4b5563] md:text-lg md:leading-8"
            />

            <div className="mt-8 md:mt-10">
              <ImageFrame
                src={form.coverImage}
                alt={form.vi.title}
                label="Thêm ảnh bìa"
                onPick={(file) => void onUpload(file, (url) => setForm((current) => ({ ...current, coverImage: url })))}
              />
            </div>

            <div className="mt-8 space-y-6 text-base leading-relaxed text-[#374151] md:mt-10 md:space-y-7 md:text-lg md:leading-8">
              {form.vi.paragraphs.map((block, index) => (
                <div key={`${block.type}-${index}`} className="group/block relative">
                  <div className="absolute -right-1 -top-3 z-10 hidden gap-1 rounded-full border border-[#eadfd5] bg-white p-1 shadow-sm group-hover/block:flex">
                    <button type="button" className="rounded-full p-1 hover:bg-[#fff4ea]" onClick={() => moveBlock(index, -1)}>
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button type="button" className="rounded-full p-1 hover:bg-[#fff4ea]" onClick={() => moveBlock(index, 1)}>
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                    <button type="button" className="rounded-full p-1 hover:bg-[#fff4ea]" onClick={() => addBlock("paragraph", index)}>
                      <Type className="h-3.5 w-3.5" />
                    </button>
                    <button type="button" className="rounded-full p-1 hover:bg-[#fff4ea]" onClick={() => addBlock("image", index)}>
                      <ImagePlus className="h-3.5 w-3.5" />
                    </button>
                    <button type="button" className="rounded-full p-1 text-red-600 hover:bg-red-50" onClick={() => removeBlock(index)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {block.type === "paragraph" ? (
                    <AutoTextarea
                      value={block.content}
                      placeholder="Viết đoạn văn..."
                      onChange={(event) => setBlock(index, { type: "paragraph", content: event.target.value })}
                      className="text-base leading-relaxed text-[#374151] md:text-lg md:leading-8"
                    />
                  ) : (
                    <div className="space-y-2">
                      <ImageFrame
                        src={block.src}
                        alt={block.alt}
                        label="Thêm ảnh trong bài"
                        onPick={(file) =>
                          void onUpload(file, (url) => setBlock(index, { ...block, src: url }))
                        }
                      />
                      <AutoTextarea
                        value={block.alt}
                        placeholder="Chú thích ảnh (alt)"
                        onChange={(event) => setBlock(index, { ...block, alt: event.target.value })}
                        className="text-center text-sm italic text-[#9ca3af]"
                      />
                    </div>
                  )}
                </div>
              ))}

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => addBlock("paragraph")}
                  className="rounded-full border border-dashed border-[#eadfd5] px-4 py-2 text-sm font-semibold text-[#5f5a57]"
                >
                  + Đoạn văn
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("image")}
                  className="rounded-full border border-dashed border-[#eadfd5] px-4 py-2 text-sm font-semibold text-[#5f5a57]"
                >
                  + Ảnh
                </button>
              </div>

              <ul className="space-y-3 pl-5">
                {(form.vi.bullets.length ? form.vi.bullets : [""]).map((item, index) => (
                  <li key={`bullet-${index}`} className="list-disc marker:text-[#ff6a3d]">
                    <AutoTextarea
                      value={item}
                      placeholder="Ý bullet"
                      onChange={(event) => {
                        const bullets = (form.vi.bullets.length ? form.vi.bullets : [""]).slice();
                        bullets[index] = event.target.value;
                        if (index === bullets.length - 1 && event.target.value.trim()) bullets.push("");
                        setVi({ bullets });
                      }}
                      className="text-base leading-relaxed text-[#374151] md:text-lg md:leading-8"
                    />
                  </li>
                ))}
              </ul>

              <blockquote className="border-l-4 border-[#ff6a3d] bg-[#fff7ed] px-5 py-4 md:px-6 md:py-5">
                <AutoTextarea
                  value={form.vi.quote}
                  placeholder="Trích dẫn nổi bật"
                  onChange={(event) => setVi({ quote: event.target.value })}
                  className="text-[1.05rem] font-medium italic leading-relaxed text-[#1f2937] md:text-xl"
                />
              </blockquote>

              <AutoTextarea
                value={form.vi.cta}
                placeholder="CTA / nguồn bài viết"
                onChange={(event) => setVi({ cta: event.target.value })}
                className="font-semibold text-[#111827]"
              />
            </div>
          </article>

          <aside className="xl:sticky xl:top-24">
            <div className="rounded-[32px] bg-[#f5f5f5] p-6 sm:p-7 md:rounded-[40px] md:p-8">
              <h2 className="mb-6 text-xl font-semibold text-[#111827] md:mb-8 md:text-[1.5rem]">
                {t("home.news.recent")}
              </h2>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-[#9ca3af]">Thẻ bài trên trang Tin tức</p>
              <div className="overflow-hidden rounded-[18px] bg-white">
                <div className="relative aspect-[16/10] bg-[#fff7ed]">
                  {form.coverImage ? (
                    <img src={form.coverImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  ) : null}
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <time className="text-sm font-medium text-[#9ca3af]">{displayDate}</time>
                    <span className="inline-flex items-center justify-center rounded-full border border-[#f0c437] bg-[repeating-linear-gradient(45deg,rgba(240,196,55,0.18)_0,rgba(240,196,55,0.18)_11px,rgba(255,220,90,0.42)_11px,rgba(255,220,90,0.42)_22px)] px-3.5 py-0.5 text-sm font-medium italic text-black">
                      {t("home.news.badge")}
                    </span>
                  </div>
                  <p className="mt-2 text-base font-semibold leading-snug text-[#111827] md:text-lg">
                    {form.vi.title || "Tiêu đề thẻ bài"}
                  </p>
                  <AutoTextarea
                    value={form.vi.excerpt}
                    placeholder="Tóm tắt hiện trên thẻ tin..."
                    onChange={(event) => setVi({ excerpt: event.target.value })}
                    className="mt-2 text-sm leading-relaxed text-[#6b7280] md:text-[15px]"
                  />
                </div>
              </div>

              <div className="mt-8 space-y-4 border-t border-[#e5e7eb] pt-6 text-sm">
                <label className="block">
                  <span className="mb-1.5 block font-semibold">Chuyên mục</span>
                  <select
                    value={form.categoryId}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, categoryId: event.target.value as NewsCategoryId }))
                    }
                    className="w-full rounded-2xl border-0 bg-white px-3 py-2.5 outline-none"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {categoryLabel(category, "vi")}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block font-semibold">Trạng thái</span>
                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, status: event.target.value as PostStatus }))
                    }
                    className="w-full rounded-2xl border-0 bg-white px-3 py-2.5 outline-none"
                  >
                    <option value="draft">Nháp</option>
                    <option value="published">Đã đăng</option>
                    <option value="hidden">Tạm ẩn</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block font-semibold">Slug URL</span>
                  <input
                    value={form.slug}
                    onChange={(event) => {
                      setSlugLocked(true);
                      setForm((current) => ({ ...current, slug: event.target.value }));
                    }}
                    className="w-full rounded-2xl border-0 bg-white px-3 py-2.5 font-mono text-xs outline-none"
                  />
                </label>
                {translationSummary ? <p className="text-xs text-[#6b7280]">{translationSummary}</p> : null}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
