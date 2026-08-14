import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { BlogCard } from "@/components/blogs/blog-card"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/types"

/**
 * Full-width blog section for a single doctor's profile page, shown after
 * the booking form and doctor info. Cards link to the full article page.
 */
export function BlogList({
  posts,
  doctorId,
  doctorName,
}: {
  posts: BlogPost[]
  doctorId: string
  doctorName: string
}) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            From {doctorName}
          </p>
          <h2 className="mt-1 font-heading text-2xl leading-snug font-semibold">
            Blogs by {doctorName}
          </h2>
        </div>
        <Button asChild variant="outline" size="sm" className="shrink-0">
          <Link href={`/blogs?doctor=${doctorId}`}>
            View all
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
