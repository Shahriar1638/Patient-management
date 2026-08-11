import { Badge } from "@/components/ui/badge"
import {
  SheetFooter,
  SheetHeader,
  SheetSectionTitle,
} from "@/components/documents/sheet-shared"
import records from "@/data/records.json"
import patients from "@/data/patients.json"

const patient = patients[0]
type RxRow = (typeof records)["rxRows"][number]

export function DoctorVisitSheet({ row }: { row: RxRow }) {
  return (
    <div className="flex min-h-[260mm] flex-col gap-6 p-6 sm:p-9">
      <SheetHeader recordNo={`VIS-${row.initials}-${row.date.replace(/\s/g, "")}`} />

      <section className="flex flex-col gap-3">
        <SheetSectionTitle>Visit Summary</SheetSectionTitle>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
          <div className="flex flex-col gap-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Patient
            </p>
            <p className="text-sm font-medium text-foreground">
              {patient.firstName} {patient.lastName}
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Date of Visit
            </p>
            <p className="text-sm font-medium text-foreground">{row.date}</p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Doctor
            </p>
            <p className="text-sm font-medium text-foreground">{row.doctor}</p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Specialty
            </p>
            <p className="text-sm font-medium text-foreground">
              {row.specialty}
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
          <div className="flex flex-col gap-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Status
            </p>
            <span className="w-fit">
              <Badge
                variant={row.status === "active" ? "default" : "secondary"}
              >
                {row.status}
              </Badge>
            </span>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <SheetSectionTitle>Diagnosis</SheetSectionTitle>
        <p className="text-body-md text-foreground">{row.diagnosis}</p>
        <p className="text-sm text-muted-foreground">
          The above condition was assessed during your consultation on{" "}
          {row.date}. Please follow the advice provided by {row.doctor} and
          complete any prescribed course of treatment.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <SheetSectionTitle>Physician Notes</SheetSectionTitle>
        <div className="min-h-24 rounded-lg border border-dashed border-neutral-300 p-4" />
        <div className="mt-4 flex items-end justify-between gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-foreground">
              {row.doctor}
            </p>
            <p className="text-xs text-muted-foreground">
              {row.specialty} · MedCare Health
            </p>
          </div>
          <p className="border-t border-neutral-400 px-6 pt-1 text-xs uppercase tracking-widest text-muted-foreground">
            Signature
          </p>
        </div>
      </section>

      <SheetFooter />
    </div>
  )
}
