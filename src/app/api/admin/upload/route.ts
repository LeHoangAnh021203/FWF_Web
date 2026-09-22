import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

import { requireModule } from "@/lib/admin-auth";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

function extensionFor(file: File): string {
  const fromName = path.extname(file.name).toLowerCase();
  if (ALLOWED_EXT.has(fromName)) return fromName;
  const fromType = file.type.replace("image/", ".");
  if (ALLOWED_EXT.has(fromType)) return fromType;
  return ".png";
}

async function saveLocalImage(file: File): Promise<string> {
  const name = `${Date.now()}-${randomBytes(4).toString("hex")}${extensionFor(file)}`;
  const dir = path.join(process.cwd(), "public", "uploads", "news");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/news/${name}`;
}

export async function POST(request: Request) {
  if (!(await requireModule("tin-tuc"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Thiếu file ảnh." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Chỉ nhận file ảnh." }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Ảnh tối đa 8MB." }, { status: 400 });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  const canUseBlob = Boolean(token || process.env.BLOB_STORE_ID);
  if (canUseBlob) {
    const blob = await put(`news/${Date.now()}-${file.name.replace(/[^\w.\-]+/g, "-")}`, file, {
      access: "public",
      ...(token ? { token } : {}),
    });
    return NextResponse.json({ url: blob.url });
  }

  const url = await saveLocalImage(file);
  return NextResponse.json({ url });
}
