import { DoctorDirectory } from "@/components/doctors/doctor-directory"
import doctors from "@/data/doctors.json"

export default function HomePage() {
  return (
    <>
      <div className="mt-2 flex flex-col gap-2 md:mt-4">
        <h1 className="font-heading text-headline-lg-mobile font-semibold md:text-headline-lg">
          Find a Doctor
        </h1>
        <p className="text-body-md text-muted-foreground">
          Search our doctors, compare timings, and book your serial in minutes.
        </p>
      </div>
      <DoctorDirectory doctors={doctors} />
    </>
  )
}
