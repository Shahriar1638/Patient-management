import {
  SheetFooter,
  SheetHeader,
  SheetSectionTitle,
} from "@/components/documents/sheet-shared"
import queue from "@/data/queue.json"
import patients from "@/data/patients.json"

const patient = patients[0]

// Static bar widths so the barcode renders identically on server & client.
const barcodeBars = [
  3, 1, 2, 1, 3, 2, 1, 1, 4, 1, 2, 3, 1, 2, 1, 3, 1, 2, 3, 1, 2, 1, 4, 1, 1, 3,
  2, 1, 3, 1,
]

export function SerialTicketSheet() {
  return (
    <div className="flex min-h-[260mm] flex-col gap-6 p-6 sm:p-9">
      <SheetHeader recordNo={`TKT-${String(queue.serial).padStart(4, "0")}`} />

      <div className="flex flex-col gap-6 rounded-xl border-2 border-dashed border-neutral-300 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
              Outpatient Department
            </p>
            <p className="font-heading text-headline-lg font-semibold text-foreground">
              Serial Ticket
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {patient.firstName} {patient.lastName}
            </p>
          </div>
          <div className="text-right">
            <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
              Your Serial No.
            </p>
            <p className="font-heading text-display-hero italic text-primary">
              #{queue.serial}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
          <div className="flex flex-col gap-0.5">
            <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
              Doctor
            </p>
            <p className="text-sm font-semibold text-foreground">
              {queue.doctorName}
            </p>
            <p className="text-sm text-muted-foreground">{queue.specialty}</p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
              Date
            </p>
            <p className="text-sm font-semibold text-foreground">
              {queue.date}
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
              Time
            </p>
            <p className="text-sm font-semibold text-foreground">
              {queue.time}
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
              Location
            </p>
            <p className="text-sm font-semibold text-foreground">
              {queue.room}
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
              Current Serving
            </p>
            <p className="text-sm font-semibold text-foreground">
              #{queue.serving}
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
              Estimated Wait
            </p>
            <p className="text-sm font-semibold text-foreground">
              ~{queue.estimatedWaitMin} mins
            </p>
          </div>
        </div>

        <div className="mt-auto border-t border-dashed border-neutral-300 pt-6">
          <SheetSectionTitle>Keep this ticket with you</SheetSectionTitle>
          <p className="mt-3 text-sm text-muted-foreground">
            Present this ticket at the reception desk of {queue.room} before
            your appointment time. The current serving counter is displayed on
            the clinic screen.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <div className="flex h-10 items-stretch gap-[2px]">
              {barcodeBars.map((width, index) => (
                <span
                  key={index}
                  className="bg-foreground"
                  style={{ width: `${width}px` }}
                />
              ))}
            </div>
            <p className="text-xs font-mono text-muted-foreground">
              {queue.doctorName.replace(/\s/g, "").toUpperCase()}-
              {String(queue.serial).padStart(4, "0")}
            </p>
          </div>
        </div>
      </div>

      <SheetFooter />
    </div>
  )
}
