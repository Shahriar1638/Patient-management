import { notFound } from "next/navigation"

import { BlogPostPage } from "@/components/blogs/blog-post-page"
import posts from "@/data/blogs.json"
import type { BlogPost } from "@/lib/types"

export function generateStaticParams() {
  return posts.map((post) => ({ id: post.id }))
}

export default async function BlogPostDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = posts.find((item) => item.id === id) as BlogPost | undefined

  if (!post) {
    notFound()
  }

  // Related: same doctor first, then same category, then any other post.
  const related = [
    ...posts.filter((item) => item.id !== id && item.doctorId === post.doctorId),
    ...posts.filter((item) => item.id !== id && item.category === post.category),
    ...posts.filter((item) => item.id !== id),
  ]
  const unique = Array.from(
    new Map(related.map((item) => [item.id, item])).values()
  ).slice(0, 3)

  return <BlogPostPage post={post} related={unique} />
}
