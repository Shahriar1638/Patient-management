import { CalendarClock, DoorOpen, MapPin, Star } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { getInitials } from "@/lib/utils"
import type { Doctor } from "@/lib/types"

export function DoctorCard({
  doctor,
  onBook,
}: {
  doctor: Doctor
  onBook: () => void
}) {
  return (
    <Card className="flex flex-col">
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="size-24 rounded-xl text-lg">
              <AvatarFallback className="rounded-xl bg-muted font-semibold">
                {getInitials(doctor.firstName, doctor.lastName)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-heading text-headline-md font-semibold">
                Dr. {doctor.lastName}
              </p>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                {doctor.specialty}
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {doctor.title}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="gap-1 rounded-lg">
            <Star className="fill-current text-primary" />
            {doctor.rating}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4" />
          {doctor.clinic}
        </div>
        <div className="grid grid-cols-2 gap-4 rounded-xl bg-muted p-4">
          <div className="flex flex-col gap-1">
            <p className="text-label-caps uppercase text-muted-foreground">
              Next Available
            </p>
            <p className="flex items-center gap-1.5 text-sm font-bold">
              <CalendarClock className="size-4 text-primary" />
              {doctor.nextAvailable}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-label-caps uppercase text-muted-foreground">
              Consultation Fee
            </p>
            <p className="text-sm font-bold">${doctor.fee}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-label-caps uppercase text-muted-foreground">
              Chamber
            </p>
            <p className="flex items-center gap-1.5 text-sm font-bold">
              <DoorOpen className="size-4 text-primary" />
              {doctor.room}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-label-caps uppercase text-muted-foreground">
              Visiting Hours
            </p>
            <p className="text-sm font-bold">
              {doctor.availability.join(" · ")}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto gap-3 border-0 bg-transparent">
        <Button
          variant="outline"
          size="lg"
          className="h-11 flex-1 text-xs font-bold uppercase tracking-widest"
        >
          View Profile
        </Button>
        <Button
          size="lg"
          className="h-11 flex-1 text-xs font-bold uppercase tracking-widest"
          onClick={onBook}
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  )
}