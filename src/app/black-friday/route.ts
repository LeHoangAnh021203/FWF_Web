import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";

const PAGE_URL = "https://facewashfox.com/black-friday";
const PAGE_TITLE = "Vòng Xoay May Mắn Black Friday | Face Wash Fox";

export async function GET() {
  const html = await readFile(
    join(process.cwd(), "public", "black-friday.html"),
    "utf8",
  );

  const pageHtml = html
    .replace(
      /<title>[^<]*<\/title>/,
      `<title>${PAGE_TITLE}</title>`,
    )
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${PAGE_URL}" />`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${PAGE_URL}" />`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${PAGE_TITLE}" />`,
    );

  return new Response(pageHtml, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300, must-revalidate",
    },
  });
}
