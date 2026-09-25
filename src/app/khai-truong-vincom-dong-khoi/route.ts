import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";

const PAGE_URL = "https://facewashfox.com/khai-truong-vincom-dong-khoi";

export async function GET() {
  const html = await readFile(
    join(process.cwd(), "public", "khai-truong-vincom-dong-khoi.html"),
    "utf8",
  );

  const pageHtml = html
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${PAGE_URL}" />`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${PAGE_URL}" />`,
    );

  return new Response(pageHtml, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300, must-revalidate",
    },
  });
}
