import Link from "next/link"
import { ArrowLeft, HeartPulse, TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ErrorPage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-10 overflow-hidden bg-background px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(15,110,106,0.08),transparent_55%)]" />
      <Link
        href="/"
        className="relative z-10 flex items-center gap-3 transition-opacity hover:opacity-80"
      >
        <span className="flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <HeartPulse className="size-5" />
        </span>
        <span className="font-heading text-2xl font-semibold text-foreground">
          MedCare
        </span>
      </Link>
      <div className="relative z-10 flex max-w-md flex-col items-center gap-6 text-center">
        <span className="flex size-14 items-center justify-center rounded-xl border border-border bg-card text-primary">
          <TriangleAlert className="size-7" />
        </span>
        <p className="font-heading text-display-hero italic text-primary">
          404
        </p>
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-headline-lg font-semibold">
            Page not found
          </h1>
          <p className="text-body-md text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or may have
            been moved. Check the address or head back to your dashboard.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft data-icon="inline-start" />
              Back to Dashboard
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/login">Go to Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
