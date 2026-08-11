"use client"

import { useState } from "react"
import { ChevronRight, Download } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import queue from "@/data/queue.json"

export function HeroTracker() {
  const [open, setOpen] = useState(false)

  return (
    <Card className="relative col-span-1 row-span-2 overflow-hidden border-0 bg-primary p-8 text-primary-foreground ring-0 md:col-span-8 md:p-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />
      <div className="relative z-10 flex h-full flex-col justify-between gap-12">
        <div>
          <div className="mb-10 flex items-start justify-between gap-4">
            <span className="text-label-caps uppercase tracking-widest text-primary-foreground/80">
              Live Serial Tracker
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-primary-foreground/80 hover:bg-white/10 hover:text-primary-foreground"
                onClick={() =>
                  toast.success(
                    `Serial ticket #${queue.serial} is ready to print.`
                  )
                }
              >
                <Download data-icon="inline-start" />
                Serial Ticket
              </Button>
              <Badge
                variant="outline"
                className="border-white/30 bg-white/10 text-primary-foreground"
              >
                Waiting
              </Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-label-caps uppercase tracking-widest text-primary-foreground/70">
              Your Serial Number
            </span>
            <p className="font-heading text-display-hero italic text-primary-foreground">
              #{queue.serial}
            </p>
          </div>
          <Collapsible open={open} onOpenChange={setOpen} className="mt-8">
            <CollapsibleTrigger className="inline-flex items-center gap-2 border-b border-white/20 pb-2 text-body-md font-medium text-primary-foreground/90 hover:text-primary-foreground">
              <ChevronRight
                className={cn(
                  "size-4 transition-transform",
                  open && "rotate-90"
                )}
              />
              View Details
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-6 border-t border-white/20 pt-4">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-label-caps uppercase tracking-widest text-primary-foreground/70">
                    Doctor
                  </p>
                  <p className="font-medium text-primary-foreground">
                    {queue.doctorName}
                  </p>
                  <p className="mt-1 text-body-md text-primary-foreground/80">
                    {queue.specialty}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-label-caps uppercase tracking-widest text-primary-foreground/70">
                    Schedule &amp; Location
                  </p>
                  <p className="font-medium text-primary-foreground">
                    {queue.date}, {queue.time}
                  </p>
                  <p className="mt-1 text-body-md text-primary-foreground/80">
                    {queue.room}
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div className="flex items-end justify-between border-t border-white/20 pt-8">
          <div>
            <p className="text-label-caps uppercase tracking-widest text-primary-foreground/70">
              Current Serving
            </p>
            <p className="mt-2 font-heading text-headline-lg text-primary-foreground">
              #{queue.serving}
            </p>
          </div>
          <div className="text-right">
            <p className="text-label-caps uppercase tracking-widest text-primary-foreground/70">
              Estimated Wait Time
            </p>
            <p className="mt-2 font-heading text-headline-md italic text-primary-foreground">
              ~{queue.estimatedWaitMin} mins
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}