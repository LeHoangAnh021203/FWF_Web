"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import type { AdminPost } from "@/lib/news-store";

import { AdminShell } from "../../admin-shell";
import { PostForm } from "../post-form";

export default function EditPostPage() {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<AdminPost | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/admin/posts/${params.id}`)
      .then(async (response) => {
        const data = (await response.json()) as { post?: AdminPost; error?: string };
        if (!response.ok) throw new Error(data.error || "Không tải được bài.");
        if (!cancelled) setPost(data.post ?? null);
      })
      .catch((loadError: Error) => {
        if (!cancelled) setError(loadError.message);
      });
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  if (error) {
    return (
      <AdminShell title="Sửa bài viết">
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      </AdminShell>
    );
  }

  if (!post) {
    return (
      <AdminShell title="Sửa bài viết">
        <p className="text-sm text-[#5f5a57]">Đang tải...</p>
      </AdminShell>
    );
  }

  return <PostForm post={post} />;
}
