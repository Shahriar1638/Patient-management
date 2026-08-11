import { HeartPulse } from "lucide-react"

import { NotificationsMenu } from "@/components/layout/notifications-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-border bg-background px-4 md:border-b-0 md:bg-transparent md:px-8">
      <div className="flex flex-col">
        <span className="flex items-center gap-2 font-heading text-xl font-semibold md:hidden">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <HeartPulse className="size-4" />
          </span>
          MedCare
        </span>
        <span className="hidden font-heading text-2xl font-semibold text-foreground md:inline-block">
          Good morning, Alex.
        </span>
      </div>
      <div className="flex items-center gap-4">
        <NotificationsMenu />
        <Avatar className="hidden size-8 bg-primary text-primary-foreground md:flex">
          <AvatarFallback className="font-body-md font-medium">A</AvatarFallback>
        </Avatar>
        <span className="flex md:hidden size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <span className="font-body-md font-medium">A</span>
        </span>
      </div>
    </header>
  )
}