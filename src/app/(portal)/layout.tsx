import { AppSidebar } from "@/components/layout/app-sidebar"
import { TopBar } from "@/components/layout/top-bar"
import { BottomNav } from "@/components/layout/bottom-nav"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full flex-col">
        <TopBar />
        <div className="flex flex-1">
          <AppSidebar />
          <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 md:px-8 pb-24 md:pb-12">
            <div className="flex flex-col gap-8 py-6 md:py-8">{children}</div>
          </main>
        </div>
      </div>
      <BottomNav />
    </SidebarProvider>
  )
}
