import { AppointmentsView } from "@/components/appointments/appointments-view"
import doctors from "@/data/doctors.json"

export default function AppointmentsPage() {
  return (
    <>
      <div className="mt-2 flex flex-col gap-2 md:mt-4">
        <h1 className="font-heading text-headline-lg-mobile font-semibold md:text-headline-lg">
          Book an Appointment
        </h1>
        <p className="text-body-md text-muted-foreground">
          Find and book trusted medical professionals.
        </p>
      </div>
      <AppointmentsView doctors={doctors} />
    </>
  )
}