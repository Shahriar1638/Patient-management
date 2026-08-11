import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  SheetFooter,
  SheetHeader,
  SheetSectionTitle,
} from "@/components/documents/sheet-shared"
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

export function PatientInfoSheet() {
  return (
    <div className="flex flex-col gap-6 p-6 sm:p-9">
      <SheetHeader recordNo={patient.id.toUpperCase()} />

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
        <SheetSectionTitle>Personal Information</SheetSectionTitle>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
          <InfoItem label="Date of Birth" value={formatDate(patient.dob)} />
          <InfoItem
            label="Gender"
            value={genderLabel[patient.gender] ?? patient.gender}
          />
          <InfoItem label="Blood Type" value={patient.bloodType} />
          <InfoItem label="Height" value={`${patient.heightCm} cm`} />
          <InfoItem label="Weight" value={`${patient.weightKg} kg`} />
          <InfoItem label="Phone" value={patient.phone} />
          <InfoItem label="Email" value={patient.email} />
          <InfoItem label="Insurance" value={patient.insuranceProvider} />
          <InfoItem label="Member ID" value={patient.insuranceId} />
        </div>
      </section>

      {/* Medical */}
      <section className="flex flex-col gap-3">
        <SheetSectionTitle>Medical Information</SheetSectionTitle>
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
            value={primaryDoctor ? `Dr. ${primaryDoctor.lastName}` : "—"}
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

      <SheetFooter />
    </div>
  )
}
