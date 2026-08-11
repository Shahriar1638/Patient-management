"use client"

import {
  cloneElement,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
  type ReactNode,
} from "react"
import { Download, Maximize2, Minus, Plus } from "lucide-react"
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

const MIN_ZOOM = 0.5
const MAX_ZOOM = 2.5

/**
 * Interactive A4 document flow: clicking the trigger opens a preview
 * dialog showing the sheet auto-scaled to fit (like a print preview),
 * and "Download PDF" opens the browser print dialog (A4 via @page CSS)
 * where the user can "Save as PDF".
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
  const [zoom, setZoom] = useState(1)
  const [fit, setFit] = useState({ scale: 1, width: 794, height: 1123 })

  const previewRef = useRef<HTMLDivElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)

  // Auto-fit the sheet to the preview area (never upscale past 100%).
  useLayoutEffect(() => {
    const preview = previewRef.current
    const sheet = sheetRef.current
    if (!preview || !sheet) return

    const compute = () => {
      const p = preview.getBoundingClientRect()
      const s = sheet.getBoundingClientRect()
      if (p.width === 0 || p.height === 0 || s.width === 0 || s.height === 0) {
        return
      }
      setFit({
        scale: Math.min(p.width / s.width, p.height / s.height, 1),
        width: s.width,
        height: s.height,
      })
    }

    compute()
    const observer = new ResizeObserver(compute)
    observer.observe(preview)
    observer.observe(sheet)
    return () => observer.disconnect()
  }, [open])

  const scale = Math.min(Math.max(fit.scale * zoom, 0.1), 4)

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
        {/* Inline maxWidth: overrides shadcn's sm:max-w-sm default (384px) which
            tailwind-merge won't drop and would otherwise squeeze the preview. */}
        <DialogContent
          className="print-reset flex h-[min(88vh,900px)] flex-col gap-0 overflow-hidden p-0"
          style={{ maxWidth: "min(1100px, calc(100vw - 2rem))" }}
        >
          <DialogHeader className="border-b border-border px-6 py-5">
            <DialogTitle className="font-heading text-headline-md">
              {title}
            </DialogTitle>
            <DialogDescription>
              {description ??
                "A4 preview — click “Download PDF” and choose “Save as PDF” to export."}
            </DialogDescription>
          </DialogHeader>

          {/* Print-preview viewport: sheet is scaled to fit, centered on a desk */}
          <div
            ref={previewRef}
            className="print-reset flex min-h-0 flex-1 overflow-auto bg-muted/60"
          >
            <div
              className="print-reset m-auto shrink-0"
              style={{ width: fit.width * scale, height: fit.height * scale }}
            >
              <div
                className="print-reset h-full w-full"
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
              >
                <div
                  ref={sheetRef}
                  id="a4-print-root"
                  className="w-[210mm] bg-white text-foreground shadow-[0_4px_20px_rgba(0,0,0,0.04)] ring-1 ring-border"
                >
                  {children}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="m-0 gap-3 px-6 py-4 sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">A4 · Ready to print</p>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Fit to screen"
                onClick={() => setZoom(1)}
              >
                <Maximize2 />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Zoom out"
                disabled={zoom <= MIN_ZOOM}
                onClick={() =>
                  setZoom((value) =>
                    Math.max(MIN_ZOOM, Number((value - 0.1).toFixed(2)))
                  )
                }
              >
                <Minus />
              </Button>
              <span className="w-14 text-center text-sm tabular-nums text-muted-foreground">
                {Math.round(fit.scale * zoom * 100)}%
              </span>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Zoom in"
                disabled={zoom >= MAX_ZOOM}
                onClick={() =>
                  setZoom((value) =>
                    Math.min(MAX_ZOOM, Number((value + 0.1).toFixed(2)))
                  )
                }
              >
                <Plus />
              </Button>
              <Button size="lg" onClick={handleDownload}>
                <Download data-icon="inline-start" />
                Download PDF
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
