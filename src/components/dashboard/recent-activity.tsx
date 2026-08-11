import Link from "next/link"
import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import prescriptions from "@/data/prescriptions.json"

const recent = prescriptions
  .filter((item) => item.status === "active")
  .slice(0, 3)

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function RecentActivity() {
  return (
    <Card className="col-span-1 flex flex-col md:col-span-4">
      <CardHeader className="border-b border-border pb-4">
        <div className="flex w-full items-center justify-between">
          <CardTitle className="text-label-caps uppercase tracking-widest text-muted-foreground">
            Recent Activity
          </CardTitle>
          <Button asChild variant="link" className="h-auto p-0">
            <Link href="/records">View All</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col py-0">
        {recent.map((item, index) => (
          <div key={item.id}>
            <div className="group flex items-center justify-between gap-4 py-4">
              <div className="min-w-0">
                <p className="truncate font-medium">{item.medication}</p>
                <p className="mt-0.5 text-sm text-muted-foreground italic">
                  {formatDate(item.prescribedOn)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Download prescription for ${item.medication}`}
                className="text-muted-foreground group-hover:text-primary"
              >
                <Download />
              </Button>
            </div>
            {index < recent.length - 1 && <Separator />}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}