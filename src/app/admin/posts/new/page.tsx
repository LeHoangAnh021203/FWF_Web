import { PostForm } from "../post-form";

type NewPostPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function NewPostPage({ searchParams }: NewPostPageProps) {
  const { category } = await searchParams;
  return <PostForm presetCategoryId={category} />;
}
