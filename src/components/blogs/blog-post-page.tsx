import Link from "next/link"
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react"

import {
  AuthorAvatar,
  BlogCard,
  CategoryPill,
} from "@/components/blogs/blog-card"
import { cn } from "@/lib/utils"
import type { BlogPost } from "@/lib/types"

export function BlogPostPage({
  post,
  related,
}: {
  post: BlogPost
  related: BlogPost[]
}) {
  return (
    <div className="flex flex-col gap-10">
      <Link
        href="/blogs"
        className="flex w-fit items-center gap-1.5 text-body-md text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Back to all blogs
      </Link>

      <article className="flex flex-col gap-8">
        {/* Header */}
        <header className="flex flex-col gap-4">
          <CategoryPill>{post.category}</CategoryPill>
          <h1 className="max-w-3xl font-heading text-3xl leading-tight font-bold md:text-5xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <AuthorAvatar author={post.author} />
            <div>
              <p className="text-sm font-medium">{post.author}</p>
              <p className="text-xs text-muted-foreground">
                {post.authorTitle}
              </p>
            </div>
            <span className="hidden text-muted-foreground sm:inline">•</span>
            <span className="hidden items-center gap-1.5 text-sm text-muted-foreground sm:flex">
              <CalendarDays className="size-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock3 className="size-4" />
              {post.readTime}
            </span>
          </div>
        </header>

        {/* Hero image */}
        <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="h-64 w-full object-cover md:h-96"
          />
        </div>

        {/* Body */}
        <div className="flex max-w-3xl flex-col gap-5">
          {post.content.map((paragraph, index) => (
            <p
              key={index}
              className={cn(
                "leading-relaxed text-muted-foreground",
                index === 0 && "text-lg text-foreground"
              )}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Author card */}
        <aside className="flex max-w-3xl items-center gap-4 rounded-xl bg-muted p-5">
          <AuthorAvatar author={post.author} />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Written by
            </p>
            <p className="font-heading text-base font-semibold">
              {post.author}
            </p>
            <p className="text-sm text-muted-foreground">{post.authorTitle}</p>
          </div>
        </aside>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="flex flex-col gap-6 border-t border-border pt-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Keep reading
            </p>
            <h2 className="mt-1 font-heading text-2xl leading-snug font-semibold">
              More articles
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <BlogCard key={item.id} post={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
