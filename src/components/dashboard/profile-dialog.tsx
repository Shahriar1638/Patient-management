"use client"

import { Download, HeartPulse } from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getInitials } from "@/lib/utils"
import doctors from "@/data/doctors.json"
import patients from "@/data/patients.json"

const patient = patients[0]
const primaryDoctor = doctors.find((doc) => doc.id === patient.primaryDoctorId)

const genderLabel: Record<string, string> = {
  female: "Female",
  male: "Male",
  other: "Other",
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-b border-border pb-1.5 text-label-caps uppercase tracking-widest text-primary">
      {children}
    </p>
  )
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  )
}

export function ProfileDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const issued = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-xl gap-0 overflow-hidden p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>My Profile</DialogTitle>
          <DialogDescription>Patient health record report.</DialogDescription>
        </DialogHeader>

        {/* A4 paper sheet — capped so the footer below stays visible on short viewports */}
        <div className="aspect-[210/297] max-h-[calc(92vh-6rem)] overflow-y-auto bg-white text-foreground shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <div className="flex min-h-full flex-col gap-6 p-6 sm:p-9">
            {/* Document header */}
            <header className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <HeartPulse className="size-5" />
                </span>
                <div>
                  <p className="font-heading text-lg font-bold text-foreground">
                    MedCare Health
                  </p>
                  <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
                    Patient Health Record
                  </p>
                </div>
              </div>
              <div className="pr-8 text-right">
                <p className="text-sm font-semibold text-foreground">
                  Record No. {patient.id.toUpperCase()}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Issued: {issued}
                </p>
              </div>
            </header>

            {/* Identity */}
            <div className="flex items-center gap-4 rounded-lg border border-border p-4">
              <Avatar size="lg" className="size-14 rounded-xl">
                <AvatarFallback className="rounded-xl bg-primary/10 text-base font-bold text-primary">
                  {getInitials(patient.firstName, patient.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="font-heading text-xl font-bold text-foreground">
                  {patient.firstName} {patient.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  Patient since {formatDate(patient.createdAt.slice(0, 10))}
                </p>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>

            {/* Personal information */}
            <section className="flex flex-col gap-3">
              <SectionTitle>Personal Information</SectionTitle>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                <InfoItem
                  label="Date of Birth"
                  value={formatDate(patient.dob)}
                />
                <InfoItem
                  label="Gender"
                  value={genderLabel[patient.gender] ?? patient.gender}
                />
                <InfoItem label="Blood Type" value={patient.bloodType} />
                <InfoItem
                  label="Height"
                  value={`${patient.heightCm} cm`}
                />
                <InfoItem label="Weight" value={`${patient.weightKg} kg`} />
                <InfoItem label="Phone" value={patient.phone} />
                <InfoItem label="Email" value={patient.email} />
                <InfoItem label="Insurance" value={patient.insuranceProvider} />
                <InfoItem label="Member ID" value={patient.insuranceId} />
              </div>
            </section>

            {/* Medical */}
            <section className="flex flex-col gap-3">
              <SectionTitle>Medical Information</SectionTitle>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                <InfoItem
                  label="Allergies"
                  value={
                    patient.allergies.length > 0
                      ? patient.allergies.join(", ")
                      : "None"
                  }
                />
                <InfoItem
                  label="Primary Doctor"
                  value={
                    primaryDoctor
                      ? `Dr. ${primaryDoctor.lastName}`
                      : "—"
                  }
                />
                <InfoItem
                  label="Specialty"
                  value={primaryDoctor ? primaryDoctor.specialty : "—"}
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Address
                </p>
                <p className="text-sm font-medium text-foreground">
                  {patient.address}
                </p>
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-auto flex items-end justify-between border-t border-border pt-3">
              <p className="text-xs text-muted-foreground">
                Generated by MedCare Health Portal
              </p>
              <p className="text-xs text-muted-foreground">Page 1 of 1</p>
            </footer>
          </div>
        </div>

        <DialogFooter className="rounded-b-xl">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() =>
              toast.success("Patient info PDF download started.")
            }
          >
            <Download data-icon="inline-start" />
            Download Patient Info as PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
