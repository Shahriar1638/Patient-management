"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, CalendarDays, FolderOpen, LayoutDashboard } from "lucide-react"

import { cn } from "@/lib/utils"

const bottomNavItems = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Bookings", href: "/appointments", icon: CalendarDays },
  { title: "Records", href: "/records", icon: FolderOpen },
  { title: "Tracking", href: "/tracking", icon: Activity },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 z-40 flex h-16 w-full items-center justify-around border-t border-border bg-background px-2 md:hidden">
      {bottomNavItems.map((item) => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex w-16 flex-col items-center gap-1 transition-colors",
              active
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span
              className={cn(
                "flex size-6 items-center justify-center rounded-md",
                active && "bg-primary/10"
              )}
            >
              <item.icon className="size-5" />
            </span>
            <span className="text-label-caps">{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}