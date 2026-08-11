"use client"

import { useMemo, useState } from "react"

import { DoctorCard } from "@/components/appointments/doctor-card"
import { BookingDialog } from "@/components/appointments/booking-dialog"
import { FilterBar, type Filters } from "@/components/appointments/filter-bar"
import type { Doctor } from "@/lib/types"

const defaultFilters: Filters = {
  search: "",
  specialty: "all",
  feeMin: "",
  feeMax: "",
  availableToday: false,
  videoConsult: false,
  day: "all",
}

export function AppointmentsView({
  doctors: allDoctors,
}: {
  doctors: Doctor[]
}) {
  const [filters, setFilters] = useState(defaultFilters)
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null)

  const filtered = useMemo(() => {
    return allDoctors.filter((doctor) => {
      const name = `${doctor.firstName} ${doctor.lastName}`.toLowerCase()
      if (
        filters.search &&
        !name.includes(filters.search.toLowerCase()) &&
        !doctor.clinic.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false
      }
      if (filters.specialty !== "all" && doctor.specialty !== filters.specialty) {
        return false
      }
      const min = Number(filters.feeMin)
      const max = Number(filters.feeMax)
      if (filters.feeMin !== "" && !Number.isNaN(min) && doctor.fee < min) {
        return false
      }
      if (filters.feeMax !== "" && !Number.isNaN(max) && doctor.fee > max) {
        return false
      }
      if (filters.availableToday && !doctor.nextAvailable.startsWith("Today")) {
        return false
      }
      if (filters.videoConsult && !doctor.videoConsult) {
        return false
      }
      if (filters.day !== "all" && !doctor.availability.includes(filters.day)) {
        return false
      }
      return true
    })
  }, [allDoctors, filters])

  return (
    <>
      <FilterBar filters={filters} onChange={setFilters} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filtered.length > 0 ? (
          filtered.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBook={() => setBookingDoctor(doctor)}
            />
          ))
        ) : (
          <p className="col-span-full rounded-xl border border-border bg-card px-6 py-12 text-center text-muted-foreground">
            No doctors match your filters.
          </p>
        )}
      </div>
      {bookingDoctor && (
        <BookingDialog
          open={true}
          onOpenChange={(open) => !open && setBookingDoctor(null)}
          doctor={bookingDoctor}
        />
      )}
    </>
  )
}