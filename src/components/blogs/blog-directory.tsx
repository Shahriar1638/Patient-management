"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

import { AuthorAvatar, BlogCard, CategoryPill } from "@/components/blogs/blog-card"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/types"

const INITIAL_VISIBLE = 6

export function BlogDirectory({
  posts,
  doctorId,
  doctorName,
}: {
  posts: BlogPost[]
  doctorId?: string
  doctorName?: string
}) {
  const [category, setCategory] = useState("all")
  const [visible, setVisible] = useState(INITIAL_VISIBLE)

  const categories = useMemo(
    () => Array.from(new Set(posts.map((post) => post.category))),
    [posts]
  )

  const filtered = useMemo(() => {
    const byDoctor = doctorId
      ? posts.filter((post) => post.doctorId === doctorId)
      : posts
    return category === "all"
      ? byDoctor
      : byDoctor.filter((post) => post.category === category)
  }, [posts, category, doctorId])

  const featured = filtered.find((post) => post.featured) ?? filtered[0]
  const grid = featured ? filtered.filter((post) => post.id !== featured.id) : filtered

  function handleCategoryChange(next: string) {
    setCategory(next)
    setVisible(INITIAL_VISIBLE)
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Blog hero */}
      <section className="relative left-1/2 -mt-6 -ml-[50vw] flex w-screen flex-col overflow-hidden bg-primary text-primary-foreground md:-mt-8">
        <div className="pointer-events-none absolute top-0 right-0 h-full w-1/3 -skew-x-12 translate-x-1/4 bg-white/5" />
        <div className="pointer-events-none absolute bottom-0 left-0 size-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 py-14 md:px-8 md:py-20">
          <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">
            From Our Physicians
          </span>
          <h1 className="mt-4 mb-4 max-w-2xl font-heading text-4xl leading-tight font-bold md:text-6xl">
            Notes on staying well
          </h1>
          <p className="max-w-xl text-lg text-primary-foreground/90">
            Practical, evidence-based reading from the doctors at MedCare —
            written for patients, not textbooks.
          </p>
        </div>
      </section>

      {/* Category filter bar */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => handleCategoryChange("all")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            category === "all"
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
          }`}
        >
          All Articles
        </button>
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => handleCategoryChange(item)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              category === item
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Doctor filter bar */}
      {doctorId && doctorName && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-primary/5 px-4 py-3 ring-1 ring-primary/15">
          <p className="text-sm text-muted-foreground">
            Showing blogs by{" "}
            <span className="font-semibold text-foreground">{doctorName}</span>
          </p>
          <Button asChild variant="outline" size="sm">
            <Link href="/blogs">Show all blogs</Link>
          </Button>
        </div>
      )}

      {/* Featured article */}
      {featured && (
        <Link
          href={`/blogs/${featured.id}`}
          className="group grid grid-cols-1 gap-0 overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(15,110,106,0.18)] md:grid-cols-2"
        >
          <div className="h-64 overflow-hidden md:h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featured.image}
              alt={featured.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-10">
            <div className="mb-4 flex items-center gap-3">
              <CategoryPill>{featured.category}</CategoryPill>
              <span className="text-xs text-muted-foreground">
                {featured.readTime}
              </span>
            </div>
            <h2 className="mb-3 font-heading text-2xl leading-snug font-bold transition-colors group-hover:text-primary md:text-3xl">
              {featured.title}
            </h2>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              {featured.excerpt}
            </p>
            <div className="flex items-center gap-3">
              <AuthorAvatar author={featured.author} />
              <div>
                <p className="text-sm font-medium">{featured.author}</p>
                <p className="text-xs text-muted-foreground">
                  {featured.authorTitle} • {featured.date}
                </p>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Article grid */}
      {grid.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {grid.slice(0, visible).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border px-6 py-16 text-center text-muted-foreground">
          No articles in this category yet.
        </p>
      )}

      {/* Load more */}
      {visible < grid.length && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="px-8 text-sm font-medium"
            onClick={() => setVisible((count) => count + INITIAL_VISIBLE)}
          >
            Load more articles
          </Button>
        </div>
      )}
    </div>
  )
}