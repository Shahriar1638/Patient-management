"use client"

import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { A4DocumentDialog } from "@/components/documents/a4-document-dialog"
import { PatientInfoSheet } from "@/components/documents/patient-info-sheet"

export function ProfileDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-xl gap-0 overflow-hidden p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>My Profile</DialogTitle>
          <DialogDescription>Patient health record report.</DialogDescription>
        </DialogHeader>

        {/* A4 paper sheet — capped so the footer below stays visible on short viewports */}
        <div className="aspect-[210/297] max-h-[calc(92vh-6rem)] overflow-y-auto bg-white text-foreground shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <PatientInfoSheet />
        </div>

        <DialogFooter className="rounded-b-xl">
          <A4DocumentDialog
            title="Patient Information Report"
            description="Your full patient health record, ready to print on A4."
            trigger={
              <Button variant="outline" className="w-full sm:w-auto">
                <Download data-icon="inline-start" />
                Download Patient Info as PDF
              </Button>
            }
          >
            <PatientInfoSheet />
          </A4DocumentDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
