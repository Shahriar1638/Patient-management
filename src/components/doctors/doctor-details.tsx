import Link from "next/link"
import {
  ArrowLeft,
  Award,
  CalendarClock,
  Clock3,
  DoorOpen,
  GraduationCap,
  MapPin,
  Stethoscope,
  Timer,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookingForm } from "@/components/doctors/booking-form"
import { getInitials } from "@/lib/utils"
import type { Doctor } from "@/lib/types"

export function DoctorDetails({ doctor }: { doctor: Doctor }) {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/"
        className="flex w-fit items-center gap-1.5 text-body-md text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Back to all doctors
      </Link>

      {/* Header card */}
      <Card>
        <CardContent className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="size-24 rounded-xl text-lg">
              <AvatarFallback className="rounded-xl bg-muted font-semibold">
                {getInitials(doctor.firstName, doctor.lastName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-heading text-headline-lg-mobile font-semibold md:text-headline-lg">
                Dr. {doctor.firstName} {doctor.lastName}
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-primary">
                <Stethoscope className="size-4" />
                {doctor.specialty}
              </p>
              <p className="mt-1 text-body-md text-muted-foreground">
                {doctor.title}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="gap-1 rounded-lg">
                  <span className="text-primary">★</span> {doctor.rating}
                </Badge>
                <Badge variant="secondary" className="gap-1 rounded-lg">
                  <MapPin className="text-primary" />
                  {doctor.clinic}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-muted p-4 md:flex-col md:items-end">
            <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
              Consultation Fee
            </p>
            <p className="font-heading text-headline-lg font-semibold text-foreground">
              ${doctor.fee}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Booking form */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <BookingForm doctor={doctor} />
          </div>
        </div>

        {/* Info columns */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          {/* Timings & availability */}
          <Card>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-border p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Clock3 className="size-5" />
                </span>
                <div>
                  <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
                    Timings
                  </p>
                  <p className="mt-1 font-semibold">{doctor.timings}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarClock className="size-5" />
                </span>
                <div>
                  <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
                    Visiting Days
                  </p>
                  <p className="mt-1 font-semibold">{doctor.days}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Timer className="size-5" />
                </span>
                <div>
                  <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
                    Estimated Turn Time
                  </p>
                  <p className="mt-1 font-semibold">
                    {doctor.estimatedTurnTime} per patient
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <DoorOpen className="size-5" />
                </span>
                <div>
                  <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
                    Chamber
                  </p>
                  <p className="mt-1 font-semibold">{doctor.room}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading text-headline-md">
                <Stethoscope className="size-5 text-primary" />
                About the Doctor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-body-md leading-relaxed text-muted-foreground">
                {doctor.description}
              </p>
            </CardContent>
          </Card>

          {/* Qualifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading text-headline-md">
                <GraduationCap className="size-5 text-primary" />
                Qualifications
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {doctor.qualifications.map((qualification) => (
                <div
                  key={qualification}
                  className="flex items-start gap-3 rounded-lg bg-muted px-4 py-3"
                >
                  <Award className="mt-0.5 size-4 shrink-0 text-primary" />
                  <p className="text-body-md">{qualification}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
