"use client"

import { CheckCircle2, MessageSquareText } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function SmsSentDialog({
  open,
  onOpenChange,
  serial,
  phone,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  serial?: number
  phone?: string
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto"
        style={{ maxWidth: "min(26rem, calc(100vw - 2rem))" }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-heading text-headline-md">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MessageSquareText className="size-5" />
            </span>
            SMS Sent
          </DialogTitle>
          <DialogDescription className="text-body-md">
            Your serial code has been sent to your phone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-3 rounded-xl bg-muted px-4 py-3">
          <CheckCircle2 className="size-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-semibold">
              Serial #{serial ?? "—"}
              {phone ? ` sent to ${phone}` : " sent"}
            </p>
            <p className="text-sm text-muted-foreground">
              Keep this message handy — show it at the reception desk.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            size="lg"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
