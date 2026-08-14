import Link from "next/link"
import {
  ArrowLeft,
  Award,
  CalendarClock,
  Clock3,
  DoorOpen,
  GraduationCap,
  Star,
  Stethoscope,
  Timer,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { BookingForm } from "@/components/doctors/booking-form"
import { getInitials } from "@/lib/utils"
import type { Doctor } from "@/lib/types"

export function DoctorDetails({ doctor }: { doctor: Doctor }) {
  return (
    <div className="flex flex-col gap-12">
      {/* Profile hero — full-bleed */}
      <section className="relative left-1/2 -ml-[50vw] flex min-h-[520px] w-screen flex-col overflow-hidden bg-primary text-primary-foreground">
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute top-0 right-0 h-full w-1/3 -skew-x-12 translate-x-1/4 bg-white/5" />
        <div className="pointer-events-none absolute bottom-0 left-0 size-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

        {/* Back navigation */}
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 pt-6 md:px-8">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to all doctors
          </Link>
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-1 items-center">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-12 px-4 py-10 md:flex-row md:px-8">
            {/* Circular photo */}
            <div className="size-56 shrink-0 overflow-hidden rounded-full border-8 border-white/10 shadow-2xl md:size-72">
              <Avatar className="size-full rounded-full">
                {doctor.image && (
                  <AvatarImage
                    src={doctor.image}
                    alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
                  />
                )}
                <AvatarFallback className="rounded-full bg-white/10 font-heading text-5xl font-semibold text-primary-foreground">
                  {getInitials(doctor.firstName, doctor.lastName)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Identity + logistics */}
            <div className="flex w-full flex-1 flex-col items-start justify-between gap-8 md:flex-row">
              {/* Left: identity */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">
                    {doctor.specialty}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2 py-1 text-xs font-bold text-white">
                    <Star className="size-3 fill-current" />
                    {doctor.rating}
                  </span>
                </div>
                <h1 className="font-heading text-5xl leading-tight font-bold md:text-7xl">
                  Dr. {doctor.firstName} {doctor.lastName}
                </h1>
                <p className="text-lg font-medium text-primary-foreground/90 md:text-xl">
                  {doctor.title} • {doctor.clinic}
                </p>
              </div>

              {/* Right: logistics + fee */}
              <div className="flex w-full flex-col gap-4 md:w-auto md:items-end">
                {/* Fee card (highlighted) */}
                <div className="relative w-full overflow-hidden rounded-2xl bg-white p-6 text-center shadow-2xl md:min-w-[220px] md:text-right">
                  <div className="pointer-events-none absolute top-0 right-0 size-16 rounded-bl-full bg-primary/5" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Consultation Fee
                  </p>
                  <p className="font-heading text-5xl font-bold text-primary dark:text-primary-foreground">
                    ${doctor.fee}
                  </p>
                  <Button asChild size="lg" className="mt-6 w-full rounded-xl md:hidden">
                    <Link href="#booking">Book Now</Link>
                  </Button>
                </div>

                {/* Timings (highlighted) */}
                <div className="flex w-full items-center gap-3 rounded-xl bg-amber-400 p-4 text-amber-950 md:min-w-[220px]">
                  <Clock3 className="size-5 shrink-0" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Timings
                    </span>
                    <span className="text-sm font-bold">{doctor.timings}</span>
                  </div>
                </div>

                {/* Secondary logistics */}
                <div className="grid w-full grid-cols-2 gap-3 md:min-w-[220px]">
                  <div className="flex items-center gap-2 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                    <CalendarClock className="size-4 shrink-0 text-primary-foreground/60" />
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider text-primary-foreground/60">
                        Days
                      </span>
                      <span className="text-xs font-medium">{doctor.days}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                    <Timer className="size-4 shrink-0 text-primary-foreground/60" />
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider text-primary-foreground/60">
                        Turn Time
                      </span>
                      <span className="text-xs font-medium">
                        {doctor.estimatedTurnTime}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center gap-2 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                    <DoorOpen className="size-4 shrink-0 text-primary-foreground/60" />
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider text-primary-foreground/60">
                        Chamber
                      </span>
                      <span className="text-xs font-medium">{doctor.room}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two column layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left column: booking form */}
        <div className="lg:col-span-5">
          <div id="booking" className="scroll-mt-24 lg:sticky lg:top-24">
            <BookingForm doctor={doctor} />
          </div>
        </div>

        {/* Right column: doctor info */}
        <div className="flex flex-col gap-8 lg:col-span-7">
          {/* About */}
          <Card className="rounded-xl p-6 md:p-8">
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
              <Stethoscope className="size-6 text-primary" />
              About the Doctor
            </CardTitle>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {doctor.description}
            </p>
          </Card>

          {/* Qualifications */}
          <Card className="rounded-xl p-6 md:p-8">
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
              <GraduationCap className="size-6 text-primary" />
              Qualifications
            </CardTitle>
            <ul className="mt-4 flex flex-col gap-3">
              {doctor.qualifications.map((qualification) => (
                <li
                  key={qualification}
                  className="flex items-center gap-3 rounded-lg bg-muted p-4"
                >
                  <Award className="size-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium">{qualification}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}