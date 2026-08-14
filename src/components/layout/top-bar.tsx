"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HeartPulse } from "lucide-react"

import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Blogs", href: "/blogs" },
]

export function TopBar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between gap-4 border-b border-border bg-background px-4 shadow-sm md:px-8">
      <Link href="/" className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <HeartPulse className="size-5" />
        </span>
        <span className="font-heading text-xl font-bold text-primary">
          MedCare
          <span className="hidden md:inline">&nbsp;Portal</span>
        </span>
      </Link>

      <nav className="flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
