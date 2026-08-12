import { TopBar } from "@/components/layout/top-bar"

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh w-full flex-col">
      <TopBar />
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 md:px-8 pb-12">
        <div className="flex flex-col gap-8 py-6 md:py-8">{children}</div>
      </main>
    </div>
  )
}
