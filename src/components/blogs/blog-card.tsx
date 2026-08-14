import Link from "next/link"

import type { BlogPost } from "@/lib/types"

function getAuthorInitials(author: string): string {
  const parts = author.replace("Dr. ", "").trim().split(/\s+/)
  const [first, last] = parts
  return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase()
}

export function CategoryPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
      {children}
    </span>
  )
}

export function AuthorAvatar({ author }: { author: string }) {
  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
      {getAuthorInitials(author)}
    </span>
  )
}

/**
 * Blog card used on the blogs directory, doctor profile pages, and the
 * related-posts section. Links to the full article page.
 */
export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blogs/${post.id}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(15,110,106,0.18)]"
    >
      <div className="h-56 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={post.title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <CategoryPill>{post.category}</CategoryPill>
        <h3 className="mt-3 mb-2 font-heading text-xl leading-snug font-semibold transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <AuthorAvatar author={post.author} />
            <span>{post.author}</span>
          </span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  )
}
