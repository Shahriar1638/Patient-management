"use client"

import { Bell, CalendarCheck2, FileCheck2, Pill, TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import notifications from "@/data/notifications.json"

const iconByType: Record<string, React.ComponentType<{ className?: string }>> = {
  "lab-result": FileCheck2,
  prescription: Pill,
  appointment: CalendarCheck2,
  alert: TriangleAlert,
}

export function NotificationsMenu() {
  const unread = notifications.filter((item) => !item.read).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          aria-label="Notifications"
          className="relative rounded-full"
        >
          <Bell />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive ring-2 ring-background" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span className="text-label-caps text-muted-foreground uppercase tracking-widest">
            Notifications
          </span>
          <Badge variant="destructive">{unread} unread</Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {notifications.map((item) => {
            const Icon = iconByType[item.type] ?? Bell
            return (
              <DropdownMenuItem
                key={item.id}
                className="items-start gap-3 py-3"
              >
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-primary">
                  <Icon className="size-4" />
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium">
                      {item.title}
                    </span>
                    {!item.read && (
                      <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                    )}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.message}
                  </span>
                </span>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}