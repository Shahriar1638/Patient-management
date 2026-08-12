import {
  SheetFooter,
  SheetHeader,
  SheetSectionTitle,
} from "@/components/documents/sheet-shared"
import type { Booking } from "@/lib/types"

// Static bar widths so the barcode renders identically on server & client.
const barcodeBars = [
  3, 1, 2, 1, 3, 2, 1, 1, 4, 1, 2, 3, 1, 2, 1, 3, 1, 2, 3, 1, 2, 1, 4, 1, 1, 3,
  2, 1, 3, 1,
]

export function SerialTicketSheet({ booking }: { booking: Booking }) {
  return (
    <div className="flex min-h-[260mm] flex-col gap-6 p-6 sm:p-9">
      <SheetHeader recordNo={`TKT-${String(booking.serial).padStart(4, "0")}`} />

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
              {booking.patientName}
            </p>
          </div>
          <div className="text-right">
            <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
              Your Serial No.
            </p>
            <p className="font-heading text-display-hero italic text-primary">
              #{booking.serial}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
          <div className="flex flex-col gap-0.5">
            <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
              Doctor
            </p>
            <p className="text-sm font-semibold text-foreground">
              {booking.doctorName}
            </p>
            <p className="text-sm text-muted-foreground">{booking.specialty}</p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
              Date
            </p>
            <p className="text-sm font-semibold text-foreground">
              {booking.dateLong}
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
              Time
            </p>
            <p className="text-sm font-semibold text-foreground">
              {booking.time}
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
              Location
            </p>
            <p className="text-sm font-semibold text-foreground">
              {booking.room} — {booking.clinic}
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
              Consultation Fee
            </p>
            <p className="text-sm font-semibold text-foreground">
              ${booking.fee}.00
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
              Estimated Wait
            </p>
            <p className="text-sm font-semibold text-foreground">
              {booking.estimatedTurnTime}
            </p>
          </div>
        </div>

        <div className="mt-auto border-t border-dashed border-neutral-300 pt-6">
          <SheetSectionTitle>Keep this ticket with you</SheetSectionTitle>
          <p className="mt-3 text-sm text-muted-foreground">
            Present this ticket at the reception desk of {booking.room} before
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
              {booking.doctorName.replace(/\s/g, "").toUpperCase()}-
              {String(booking.serial).padStart(4, "0")}
            </p>
          </div>
        </div>
      </div>

      <SheetFooter />
    </div>
  )
}
