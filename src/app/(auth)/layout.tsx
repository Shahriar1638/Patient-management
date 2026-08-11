import Link from "next/link"
import { HeartPulse } from "lucide-react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-10 bg-background px-4 py-12">
      <Link href="/" className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <HeartPulse className="size-5" />
        </span>
        <span className="font-heading text-2xl font-semibold text-foreground">
          MedCare
        </span>
      </Link>
      {children}
    </div>
  )
}
