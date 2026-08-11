"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LifeBuoy } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { navItems, settingsItem } from "@/components/layout/nav"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="none" className="hidden md:flex">
      <SidebarContent className="pt-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon data-icon="inline-start" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  disabled
                  className={cn("opacity-100", "text-muted-foreground/60")}
                >
                  <settingsItem.icon data-icon="inline-start" />
                  <span>{settingsItem.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant="outline"
          size="lg"
          className="w-full justify-center gap-2 text-body-md"
        >
          <LifeBuoy data-icon="inline-start" />
          Support
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}