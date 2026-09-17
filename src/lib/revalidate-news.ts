import { revalidatePath } from "next/cache";

export function revalidatePublicNews() {
  revalidatePath("/");
  revalidatePath("/tin-tuc");
  revalidatePath("/tin-tuc/[slug]", "page");
  revalidatePath("/b2b");
  revalidatePath("/api/news");
  revalidatePath("/api/news/[slug]", "page");
}
