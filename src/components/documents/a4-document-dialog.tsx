"use client"

import {
  cloneElement,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
  type ReactNode,
} from "react"
import { Download } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

/**
 * Interactive A4 document flow: clicking the trigger opens a preview
 * dialog showing the sheet, and "Download PDF" opens the browser print
 * dialog (A4 via @page CSS) where the user can "Save as PDF".
 */
export function A4DocumentDialog({
  trigger,
  title,
  description,
  children,
}: {
  trigger: ReactElement<{ onClick?: (event: ReactMouseEvent) => void }>
  title: string
  description?: string
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)

  const triggerProps = trigger.props as
    | { onClick?: (event: ReactMouseEvent) => void }
    | undefined

  const triggerElement = cloneElement(trigger, {
    onClick: (event: ReactMouseEvent) => {
      triggerProps?.onClick?.(event)
      setOpen(true)
    },
  })

  function handleDownload() {
    // Show guidance only after the print dialog closes, so it's actually seen.
    const mediaQuery = window.matchMedia("print")
    const onPrintChange = () => {
      toast.success(
        "Your document is ready — choose “Save as PDF” to export."
      )
      mediaQuery.removeEventListener("change", onPrintChange)
    }
    mediaQuery.addEventListener("change", onPrintChange)
    window.setTimeout(() => window.print(), 150)
  }

  return (
    <>
      {triggerElement}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="print-reset max-h-[92vh] max-w-3xl gap-0 overflow-hidden p-0">
          <DialogHeader className="border-b border-border px-6 py-5">
            <DialogTitle className="font-heading text-headline-md">
              {title}
            </DialogTitle>
            <DialogDescription>
              {description ??
                "A4 preview — click “Download PDF” and choose “Save as PDF” to export."}
            </DialogDescription>
          </DialogHeader>
          <div
            className="print-reset overflow-y-auto bg-muted/50 p-4 sm:p-6"
            style={{ maxHeight: "calc(92vh - 11rem)" }}
          >
            <div
              id="a4-print-root"
              className="mx-auto w-full max-w-[200mm] bg-white text-foreground shadow-[0_4px_20px_rgba(0,0,0,0.04)] ring-1 ring-border"
            >
              {children}
            </div>
          </div>
          <DialogFooter className="m-0 px-6 py-4 sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              A4 · Ready to print
            </p>
            <Button size="lg" onClick={handleDownload}>
              <Download data-icon="inline-start" />
              Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
