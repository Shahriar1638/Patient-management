import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { labIconByType } from "@/lib/lab-reports"
import records from "@/data/records.json"

const readyReports = records.labResults.filter((item) => item.status === "ready")

export function ReadyReports() {
  return (
    <Card className="col-span-1 md:col-span-12">
      <CardContent className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
              Ready Reports
            </p>
            <Badge variant="secondary">{readyReports.length} new</Badge>
          </div>
          <Button asChild variant="link" className="h-auto p-0">
            <Link href="/records">View All</Link>
          </Button>
        </div>
        {readyReports.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {readyReports.map((report) => {
              const Icon = labIconByType[report.type]
              return (
                <Link
                  key={report.orderId}
                  href="/records"
                  className="group flex items-center gap-4 rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/40 hover:bg-muted"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-primary">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">
                      {report.title}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">
                      {report.orderId} · {report.date}
                    </span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              )
            })}
          </div>
        ) : (
          <p className="rounded-lg border border-border bg-muted px-4 py-6 text-center text-sm text-muted-foreground">
            No new reports are ready yet.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
