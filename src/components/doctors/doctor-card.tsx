import Link from "next/link"
import { MapPin, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getInitials } from "@/lib/utils"
import type { Doctor } from "@/lib/types"

const DAY_ABBREVIATIONS: Record<string, string> = {
  Monday: "M",
  Tuesday: "T",
  Wednesday: "W",
  Thursday: "Th",
  Friday: "F",
  Saturday: "S",
  Sunday: "Su",
}

function compactTime(value: string): string {
  const [hour, minute] = value.split(":").map(Number)
  const period = hour >= 12 ? "PM" : "AM"
  const h12 = hour % 12 === 0 ? 12 : hour % 12
  return `${h12}${minute > 0 ? `:${String(minute).padStart(2, "0")}` : ""} ${period}`
}

function compactTimings(doctor: Doctor): string {
  return `${compactTime(doctor.slotStart)}–${compactTime(doctor.slotEnd)}`
}

function compactDays(availability: string[]): string {
  return availability.map((day) => DAY_ABBREVIATIONS[day] ?? day).join("/")
}

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const detailsHref = `/doctors/${doctor.id}`
  const blogsHref = `/blogs?doctor=${doctor.id}`
  const fullName = `Dr. ${doctor.firstName} ${doctor.lastName}`

  return (
    <Card className="flex flex-col gap-0 p-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_36px_-14px_rgba(15,110,106,0.28)] motion-reduce:transform-none motion-reduce:transition-none">
      {/* Photo with identity overlaid on a teal band */}
      <div className="relative">
        <div className="h-52 w-full overflow-hidden bg-muted">
          {doctor.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={doctor.image}
              alt={fullName}
              className="size-full object-cover object-top"
            />
          ) : (
            <div className="flex size-full items-center justify-center font-heading text-3xl font-semibold text-primary">
              {getInitials(doctor.firstName, doctor.lastName)}
            </div>
          )}
        </div>

        {/* Specialty tag — top-left over the photo */}
        <span className="absolute top-3 left-3 flex items-center rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-sm">
          {doctor.specialty}
        </span>

        {/* Identity band — content-width tag with rounded top-right */}
        <div className="absolute bottom-0 left-0 flex flex-col rounded-tr-xl bg-primary py-2 pr-1 pl-5">
          <h3 className="font-heading text-lg leading-snug font-semibold text-primary-foreground">
            Dr. {doctor.lastName}
          </h3>
          <p className="mt-0.5 text-xs text-primary-foreground/80">
            {doctor.title}
          </p>
        </div>

        {/* Rating pill — capsule shape */}
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground shadow-sm">
          <Star className="size-3 fill-current" />
          {doctor.rating}
        </span>
      </div>        {/* Clinic + fee row, stat strip */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="size-3.5 text-primary" />
              {doctor.clinic}
            </span>
            <span className="font-heading text-lg font-bold text-primary">${doctor.fee}</span>
          </div>

          {/* Stat strip — single row with hairline dividers */}
          <div className="mt-1 flex items-stretch overflow-hidden rounded-lg bg-muted/60">
            <div className="flex flex-1 flex-col gap-0.5 border-r border-border px-3 py-2.5">
              <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                Timings
              </span>
              <span className="text-xs font-bold">{compactTimings(doctor)}</span>
            </div>
            <div className="flex flex-1 flex-col gap-0.5 border-r border-border px-3 py-2.5">
              <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                Room
              </span>
              <span className="text-xs font-bold">{doctor.room}</span>
            </div>
            <div className="flex flex-1 flex-col gap-0.5 px-3 py-2.5">
              <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                Days
              </span>
              <span className="text-xs font-bold">
                {compactDays(doctor.availability)}
              </span>
            </div>
          </div>
        </div>

      {/* Footer actions */}
      <div className="flex gap-2 p-4 pt-0">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="h-10 flex-1 text-[11px] font-bold uppercase tracking-widest"
        >
          <Link href={blogsHref}>
            Read {doctor.gender === "female" ? "her" : "his"} blogs
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          className="h-10 flex-1 text-[11px] font-bold uppercase tracking-widest"
        >
          <Link href={detailsHref}>Book appointment</Link>
        </Button>
      </div>
    </Card>
  )
}
