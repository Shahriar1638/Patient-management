import Link from "next/link"
import { ArrowRight, LogIn, TriangleAlert, UserPlus } from "lucide-react"

const pages = [
  {
    title: "Sign In",
    description:
      "Authentication form for returning patients — email, password, and remember me.",
    href: "/login",
    icon: LogIn,
  },
  {
    title: "Create Account",
    description:
      "Sign-up form with full name, email, password, and terms acceptance.",
    href: "/signup",
    icon: UserPlus,
  },
  {
    title: "Error Page",
    description:
      "404-style screen shown when a page can't be found or something breaks.",
    href: "/error",
    icon: TriangleAlert,
  },
]

export default function PagesPage() {
  return (
    <>
      <div className="mt-2 flex flex-col gap-2 md:mt-4">
        <h1 className="font-heading text-headline-lg-mobile font-semibold md:text-headline-lg">
          Pages
        </h1>
        <p className="text-body-md text-muted-foreground">
          A directory of the standalone pages in this app — authentication and
          error screens.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="group flex flex-col gap-5 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40 hover:bg-muted"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex size-12 items-center justify-center rounded-lg border border-border bg-muted text-primary transition-colors group-hover:border-primary/40">
                <page.icon className="size-6" />
              </span>
              <code className="rounded-md border border-border bg-muted px-2 py-1 font-[family-name:var(--font-geist-mono)] text-xs text-muted-foreground">
                {page.href}
              </code>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-heading text-lg font-semibold">{page.title}</p>
              <p className="text-sm text-muted-foreground">
                {page.description}
              </p>
            </div>
            <span className="mt-auto flex items-center gap-2 text-label-caps uppercase tracking-widest text-primary">
              Open page
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </>
  )
}
