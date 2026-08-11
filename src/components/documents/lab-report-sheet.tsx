import { Badge } from "@/components/ui/badge"
import {
  SheetFooter,
  SheetHeader,
  SheetSectionTitle,
} from "@/components/documents/sheet-shared"
import { labStatusLabel } from "@/lib/lab-reports"
import records from "@/data/records.json"
import patients from "@/data/patients.json"

const patient = patients[0]
type LabResult = (typeof records)["labResults"][number]

export function LabReportSheet({ lab }: { lab: LabResult }) {
  return (
    <div className="flex min-h-[260mm] flex-col gap-6 p-6 sm:p-9">
      <SheetHeader recordNo={lab.orderId} />

      <section className="flex flex-col gap-3">
        <SheetSectionTitle>Laboratory Result</SheetSectionTitle>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
          <div className="flex flex-col gap-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Test
            </p>
            <p className="text-sm font-medium text-foreground">{lab.title}</p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Order ID
            </p>
            <p className="text-sm font-medium text-foreground">
              {lab.orderId}
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Date of Test
            </p>
            <p className="text-sm font-medium text-foreground">{lab.date}</p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Status
            </p>
            <span className="w-fit">
              <Badge variant={lab.status === "ready" ? "default" : "secondary"}>
                {labStatusLabel[lab.status]}
              </Badge>
            </span>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <SheetSectionTitle>Clinical Notes</SheetSectionTitle>
        <p className="text-body-md text-foreground">{lab.description}</p>
      </section>

      <section className="flex flex-col gap-3">
        <SheetSectionTitle>Patient Details</SheetSectionTitle>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
          <div className="flex flex-col gap-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Name
            </p>
            <p className="text-sm font-medium text-foreground">
              {patient.firstName} {patient.lastName}
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              DOB
            </p>
            <p className="text-sm font-medium text-foreground">{patient.dob}</p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Blood Type
            </p>
            <p className="text-sm font-medium text-foreground">
              {patient.bloodType}
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Member ID
            </p>
            <p className="text-sm font-medium text-foreground">
              {patient.insuranceId}
            </p>
          </div>
        </div>
      </section>

      <div className="mt-auto rounded-lg border border-neutral-300 bg-neutral-50 p-4">
        <p className="text-xs text-muted-foreground">
          This report was generated electronically and verified by the MedCare
          laboratory information system. For clinical questions, please consult
          your physician.
        </p>
      </div>

      <SheetFooter />
    </div>
  )
}
