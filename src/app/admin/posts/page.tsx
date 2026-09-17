"use client";

/* eslint-disable @next/next/no-img-element */

import { ChevronLeft, ChevronRight, GripVertical, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { categoryLabel, type NewsCategory } from "@/data/news-categories";
import { formatNewsDate } from "@/i18n/format-news-date";
import type { AdminPostListItem, PostStatus } from "@/lib/news-store";

import { AdminNotice } from "../admin-notice";
import { AdminShell } from "../admin-shell";

function statusLabel(status: PostStatus) {
  if (status === "published") return "Đã đăng";
  if (status === "hidden") return "Đang ẩn";
  return "Nháp";
}

function AdminNewsCard({
  item,
  categoryLabelText,
  busy,
  dragging,
  dropTarget,
  canMoveLeft,
  canMoveRight,
  onHide,
  onShow,
  onRemove,
  onMoveLeft,
  onMoveRight,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: {
  item: AdminPostListItem;
  categoryLabelText: string;
  busy: boolean;
  dragging: boolean;
  dropTarget: boolean;
  canMoveLeft: boolean;
  canMoveRight: boolean;
  onHide: () => void;
  onShow: () => void;
  onRemove: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onDragStart: (event: React.DragEvent<HTMLButtonElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLElement>) => void;
  onDrop: (event: React.DragEvent<HTMLElement>) => void;
  onDragEnd: () => void;
}) {
  const hidden = item.status === "hidden";

  return (
    <article
      className={`news-hub-card admin-news-hub-card${hidden ? " is-hidden" : ""}${item.status === "draft" ? " is-draft" : ""}${dragging ? " is-dragging" : ""}${dropTarget ? " is-drop-target" : ""}`}
      onDragOver={(event) => {
        event.stopPropagation();
        onDragOver(event);
      }}
      onDrop={(event) => {
        event.stopPropagation();
        onDrop(event);
      }}
    >
      <div className="news-hub-card-media">
        {item.coverImage ? (
          <img src={item.coverImage} alt={item.title} />
        ) : (
          <span className="admin-news-hub-card-placeholder">Chưa có ảnh bìa</span>
        )}
        <span className={`admin-news-hub-status is-${item.status}`}>{statusLabel(item.status)}</span>
        {item.sponsored ? <span className="news-hub-card-ad">QC</span> : null}
        <button
          type="button"
          className="admin-news-hub-grip"
          draggable
          aria-label="Kéo để đổi vị trí"
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <GripVertical aria-hidden="true" strokeWidth={2.2} />
        </button>
      </div>
      <div className="news-hub-card-body">
        <span className="news-hub-card-cat">{categoryLabelText}</span>
        <time dateTime={item.publishedAt}>{formatNewsDate(item.publishedAt, "vi")}</time>
        <h3>{item.title || item.slug}</h3>
        {item.excerpt ? <p>{item.excerpt}</p> : null}
      </div>
      <div className="admin-news-hub-actions">
        <button type="button" disabled={!canMoveLeft || busy} onClick={onMoveLeft} aria-label="Chuyển trái">
          <ChevronLeft aria-hidden="true" strokeWidth={2.4} />
        </button>
        <button type="button" disabled={!canMoveRight || busy} onClick={onMoveRight} aria-label="Chuyển phải">
          <ChevronRight aria-hidden="true" strokeWidth={2.4} />
        </button>
        <Link href={`/admin/posts/${item.id}`}>Sửa</Link>
        {hidden ? (
          <button type="button" disabled={busy} onClick={onShow}>
            {busy ? "Đang hiện..." : "Hiện lại"}
          </button>
        ) : item.status === "published" ? (
          <button type="button" disabled={busy} onClick={onHide}>
            {busy ? "Đang ẩn..." : "Tạm ẩn"}
          </button>
        ) : null}
        <button type="button" className="is-danger" disabled={busy} onClick={onRemove}>
          Xóa
        </button>
      </div>
    </article>
  );
}

function CategoryTrack({
  categoryId,
  items,
  categoryLabelText,
  busyId,
  dragId,
  drop,
  onHide,
  onShow,
  onRemove,
  onMove,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: {
  categoryId: string;
  items: AdminPostListItem[];
  categoryLabelText: string;
  busyId: string | null;
  dragId: string | null;
  drop: { categoryId: string; index: number } | null;
  onHide: (item: AdminPostListItem) => void;
  onShow: (item: AdminPostListItem) => void;
  onRemove: (item: AdminPostListItem) => void;
  onMove: (item: AdminPostListItem, delta: number) => void;
  onDragStart: (item: AdminPostListItem, event: React.DragEvent<HTMLButtonElement>) => void;
  onDragOver: (categoryId: string, index: number, event: React.DragEvent<HTMLElement>) => void;
  onDrop: (categoryId: string, index: number, event: React.DragEvent<HTMLElement>) => void;
  onDragEnd: () => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(items.length > 3);
  const showNav = items.length > 3;

  const updateNav = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    setCanPrev(scroller.scrollLeft > 12);
    setCanNext(maxScroll > 12 && scroller.scrollLeft < maxScroll - 12);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    updateNav();
    const frame = window.requestAnimationFrame(updateNav);
    scroller.addEventListener("scroll", updateNav, { passive: true });
    window.addEventListener("resize", updateNav);
    const resizeObserver = new ResizeObserver(() => updateNav());
    resizeObserver.observe(scroller);
    return () => {
      window.cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", updateNav);
      window.removeEventListener("resize", updateNav);
      resizeObserver.disconnect();
    };
  }, [items.length, updateNav]);

  const scrollByPage = useCallback((direction: -1 | 1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>(".news-hub-card");
    const step = card ? card.offsetWidth + 36 : scroller.clientWidth * 0.8;
    scroller.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  return (
    <div className="news-hub-track-wrap">
      {showNav ? (
        <div className="news-hub-track-nav">
          <button
            type="button"
            aria-label="Bài trước"
            disabled={!canPrev}
            onClick={() => scrollByPage(-1)}
            className={canPrev ? "is-enabled" : undefined}
          >
            <ChevronLeft aria-hidden="true" strokeWidth={2.4} />
          </button>
          <button
            type="button"
            aria-label="Bài sau"
            disabled={!canNext}
            onClick={() => scrollByPage(1)}
            className={canNext ? "is-enabled" : undefined}
          >
            <ChevronRight aria-hidden="true" strokeWidth={2.4} />
          </button>
        </div>
      ) : null}
      <div
        ref={scrollerRef}
        className="news-hub-track"
        onDragOver={(event) => onDragOver(categoryId, items.length, event)}
        onDrop={(event) => onDrop(categoryId, items.length, event)}
      >
        {items.map((item, index) => (
          <AdminNewsCard
            key={item.id}
            item={item}
            categoryLabelText={categoryLabelText}
            busy={busyId === item.id}
            dragging={dragId === item.id}
            dropTarget={drop?.categoryId === categoryId && drop.index === index}
            canMoveLeft={index > 0}
            canMoveRight={index < items.length - 1}
            onHide={() => onHide(item)}
            onShow={() => onShow(item)}
            onRemove={() => onRemove(item)}
            onMoveLeft={() => onMove(item, -1)}
            onMoveRight={() => onMove(item, 1)}
            onDragStart={(event) => onDragStart(item, event)}
            onDragOver={(event) => onDragOver(categoryId, index, event)}
            onDrop={(event) => onDrop(categoryId, index, event)}
            onDragEnd={onDragEnd}
          />
        ))}
        {items.length === 0 ? (
          <div
            className={`admin-news-hub-empty-drop${drop?.categoryId === categoryId ? " is-drop-target" : ""}`}
            onDragOver={(event) => onDragOver(categoryId, 0, event)}
            onDrop={(event) => onDrop(categoryId, 0, event)}
          >
            Kéo bài vào đây hoặc thêm bài mới
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function AdminPostsPage() {
  const [items, setItems] = useState<AdminPostListItem[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [drop, setDrop] = useState<{ categoryId: string; index: number } | null>(null);
  const [dialog, setDialog] = useState<{ mode: "create" | "edit"; id?: string; name: string } | null>(null);
  const [dialogBusy, setDialogBusy] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/admin/posts", { signal: controller.signal })
      .then(async (response) => {
        const data = (await response.json()) as {
          items?: AdminPostListItem[];
          categories?: NewsCategory[];
          error?: string;
        };
        if (!response.ok) throw new Error(data.error || "Không tải được danh sách bài.");
        setItems(data.items ?? []);
        setCategories(data.categories ?? []);
        setError("");
        setLoading(false);
      })
      .catch((loadError: unknown) => {
        if (loadError instanceof DOMException && loadError.name === "AbortError") return;
        setError(loadError instanceof Error ? loadError.message : "Không kết nối được máy chủ.");
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  const grouped = useMemo(
    () =>
      [...categories]
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((category) => ({
          ...category,
          title: categoryLabel(category, "vi"),
          items: items
            .filter((item) => item.categoryId === category.id)
            .sort((a, b) => a.sortOrder - b.sortOrder),
        })),
    [categories, items],
  );

  const persistOrder = async (nextItems: AdminPostListItem[]) => {
    const response = await fetch("/api/admin/posts/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: nextItems.map((item) => ({
          id: item.id,
          categoryId: item.categoryId,
          sortOrder: item.sortOrder,
        })),
      }),
    });
    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      throw new Error(data.error || "Không lưu được thứ tự bài.");
    }
  };

  const moveTo = async (postId: string, categoryId: string, index: number, mode: "at" | "before") => {
    const current = items.find((item) => item.id === postId);
    if (!current) return;

    const destAll = items.filter((item) => item.categoryId === categoryId);
    let target = index;
    if (mode === "before" && current.categoryId === categoryId) {
      const fromIndex = destAll.findIndex((item) => item.id === postId);
      if (fromIndex !== -1 && fromIndex < target) target -= 1;
    }

    const without = items.filter((item) => item.id !== postId);
    const dest = without.filter((item) => item.categoryId === categoryId);
    const rest = without.filter((item) => item.categoryId !== categoryId);
    const nextIndex = Math.max(0, Math.min(target, dest.length));
    dest.splice(nextIndex, 0, { ...current, categoryId });
    const orderedDest = dest.map((item, sortOrder) => ({ ...item, categoryId, sortOrder }));
    const reindexedSource =
      current.categoryId === categoryId
        ? []
        : rest
            .filter((item) => item.categoryId === current.categoryId)
            .map((item, sortOrder) => ({ ...item, sortOrder }));
    const otherRest = rest.filter((item) => item.categoryId !== current.categoryId);
    const nextItems = [...otherRest, ...reindexedSource, ...orderedDest];
    setItems(nextItems);
    try {
      await persistOrder([...reindexedSource, ...orderedDest]);
    } catch (moveError) {
      setItems(items);
      setError(moveError instanceof Error ? moveError.message : "Không đổi được vị trí bài.");
    }
  };

  const patchStatus = async (item: AdminPostListItem, status: PostStatus) => {
    setBusyId(item.id);
    setError("");
    try {
      const response = await fetch(`/api/admin/posts/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error || "Không đổi được trạng thái bài.");
        return;
      }
      setItems((current) => current.map((post) => (post.id === item.id ? { ...post, status } : post)));
    } catch {
      setError("Không kết nối được máy chủ.");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (item: AdminPostListItem) => {
    if (!window.confirm(`Xóa bài “${item.title}”?`)) return;
    setBusyId(item.id);
    setError("");
    try {
      const response = await fetch(`/api/admin/posts/${item.id}`, { method: "DELETE" });
      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setError(data.error || "Không xóa được bài.");
        return;
      }
      setItems((current) => current.filter((post) => post.id !== item.id));
    } catch {
      setError("Không kết nối được máy chủ.");
    } finally {
      setBusyId(null);
    }
  };

  const saveCategory = async () => {
    if (!dialog) return;
    const name = dialog.name.trim();
    if (!name) {
      setError("Nhập tên chủ đề.");
      return;
    }
    setDialogBusy(true);
    setError("");
    try {
      if (dialog.mode === "create") {
        const response = await fetch("/api/admin/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });
        const data = (await response.json()) as { category?: NewsCategory; error?: string };
        if (!response.ok || !data.category) throw new Error(data.error || "Không tạo được chủ đề.");
        setCategories((current) => [...current, data.category as NewsCategory]);
      } else if (dialog.id) {
        const response = await fetch(`/api/admin/categories/${dialog.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });
        const data = (await response.json()) as { category?: NewsCategory; error?: string };
        if (!response.ok || !data.category) throw new Error(data.error || "Không sửa được chủ đề.");
        setCategories((current) =>
          current.map((category) => (category.id === dialog.id ? (data.category as NewsCategory) : category)),
        );
      }
      setDialog(null);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Không lưu được chủ đề.");
    } finally {
      setDialogBusy(false);
    }
  };

  const removeCategory = async (category: NewsCategory) => {
    if (!window.confirm(`Xóa chủ đề “${categoryLabel(category, "vi")}”?`)) return;
    setError("");
    try {
      const response = await fetch(`/api/admin/categories/${category.id}`, { method: "DELETE" });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error || "Không xóa được chủ đề.");
        return;
      }
      setCategories((current) => current.filter((item) => item.id !== category.id));
    } catch {
      setError("Không kết nối được máy chủ.");
    }
  };

  return (
    <AdminShell
      wide
      title="Tin tức"
      siteHref="/tin-tuc"
      action={
        <button
          type="button"
          onClick={() => setDialog({ mode: "create", name: "" })}
          className="rounded-full border border-[#eadfd5] bg-white px-4 py-2 text-sm font-semibold hover:bg-[#fff4ea]"
        >
          Thêm chủ đề
        </button>
      }
    >
      {error ? <AdminNotice tone="error" message={error} onClose={() => setError("")} /> : null}

      {loading ? (
        <p className="rounded-[24px] border border-[#eadfd5] bg-white px-4 py-10 text-center text-sm text-[#5f5a57]">
          Đang tải...
        </p>
      ) : (
        <div className="news-hub admin-news-hub">
          <div className="news-hub-topics" aria-label="Chủ đề">
            <div className="news-hub-topics-inner">
              <p>Chủ đề</p>
              <nav className="news-hub-topic-list">
                {grouped.map((category) => (
                  <a key={category.id} href={`#admin-${category.id}`}>
                    {category.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="news-hub-content">
            <div className="news-hub-content-inner">
              {grouped.length === 0 ? (
                <p className="news-hub-empty">Chưa có chủ đề. Hãy thêm chủ đề trước.</p>
              ) : (
                grouped.map((category) => {
                  const hiddenCount = category.items.filter((item) => item.status === "hidden").length;
                  return (
                    <section
                      key={category.id}
                      id={`admin-${category.id}`}
                      className="news-hub-category"
                      aria-labelledby={`admin-${category.id}-title`}
                    >
                      <div className="news-hub-section-head admin-news-hub-section-head">
                        <div>
                          <div className="admin-news-hub-title-row">
                            <h2 id={`admin-${category.id}-title`}>{category.title}</h2>
                            <button
                              type="button"
                              className="admin-news-hub-rename"
                              aria-label={`Sửa tên chủ đề ${category.title}`}
                              onClick={() => setDialog({ mode: "edit", id: category.id, name: category.title })}
                            >
                              <Pencil aria-hidden="true" strokeWidth={2.2} />
                            </button>
                          </div>
                          <p>
                            {category.items.length} bài viết
                            {hiddenCount > 0 ? ` · ${hiddenCount} đang ẩn` : ""}
                          </p>
                        </div>
                        <div className="admin-news-hub-topic-actions">
                          <Link href={`/admin/posts/new?category=${category.id}`} className="is-primary">
                            <Plus aria-hidden="true" strokeWidth={2.4} />
                            Thêm bài
                          </Link>
                          <button type="button" className="is-danger" onClick={() => void removeCategory(category)}>
                            <Trash2 aria-hidden="true" strokeWidth={2.2} />
                            Xóa
                          </button>
                        </div>
                      </div>
                      <CategoryTrack
                        categoryId={category.id}
                        items={category.items}
                        categoryLabelText={category.title}
                        busyId={busyId}
                        dragId={dragId}
                        drop={drop}
                        onHide={(item) => void patchStatus(item, "hidden")}
                        onShow={(item) => void patchStatus(item, "published")}
                        onRemove={(item) => void remove(item)}
                        onMove={(item, delta) => {
                          const index = category.items.findIndex((post) => post.id === item.id);
                          void moveTo(item.id, category.id, index + delta, "at");
                        }}
                        onDragStart={(item, event) => {
                          event.dataTransfer.setData("text/plain", item.id);
                          event.dataTransfer.effectAllowed = "move";
                          setDragId(item.id);
                        }}
                        onDragOver={(categoryId, index, event) => {
                          event.preventDefault();
                          event.dataTransfer.dropEffect = "move";
                          setDrop({ categoryId, index });
                        }}
                        onDrop={(categoryId, index, event) => {
                          event.preventDefault();
                          const postId = event.dataTransfer.getData("text/plain") || dragId;
                          setDragId(null);
                          setDrop(null);
                          if (postId) void moveTo(postId, categoryId, index, "before");
                        }}
                        onDragEnd={() => {
                          setDragId(null);
                          setDrop(null);
                        }}
                      />
                    </section>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {dialog ? (
        <div className="admin-news-hub-dialog" role="dialog" aria-modal="true" aria-labelledby="category-dialog-title">
          <form
            className="admin-news-hub-dialog-card"
            onSubmit={(event) => {
              event.preventDefault();
              void saveCategory();
            }}
          >
            <h2 id="category-dialog-title">{dialog.mode === "create" ? "Thêm chủ đề" : "Sửa chủ đề"}</h2>
            <label>
              <span>Tên chủ đề</span>
              <input
                autoFocus
                value={dialog.name}
                onChange={(event) => setDialog({ ...dialog, name: event.target.value })}
                placeholder="Ví dụ: Câu chuyện thương hiệu"
              />
            </label>
            <div className="admin-news-hub-dialog-actions">
              <button type="button" onClick={() => setDialog(null)}>
                Hủy
              </button>
              <button type="submit" disabled={dialogBusy}>
                {dialogBusy ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </AdminShell>
  );
}
