"use client"

import { useMemo, useState } from "react"
import { CalendarDays, MessageSquareText } from "lucide-react"
import { toast } from "sonner"

import { A4DocumentDialog } from "@/components/documents/a4-document-dialog"
import { SerialTicketSheet } from "@/components/documents/serial-ticket-sheet"
import { SmsSentDialog } from "@/components/doctors/sms-sent-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  formatBookingDate,
  generateTimeSlots,
  isDateBookable,
  nextSerialNumber,
  toISODate,
} from "@/lib/booking"
import type { Booking, Doctor } from "@/lib/types"

export function BookingForm({ doctor }: { doctor: Doctor }) {
  const [fullName, setFullName] = useState("")
  const [patientName, setPatientName] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")

  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string | undefined>(undefined)

  const [booking, setBooking] = useState<Booking | null>(null)
  const [ticketOpen, setTicketOpen] = useState(false)
  const [smsOpen, setSmsOpen] = useState(false)
  const [attempted, setAttempted] = useState(false)

  const slots = useMemo(
    () => (date ? generateTimeSlots(doctor, date) : []),
    [doctor, date]
  )

  function handleDateChange(next: Date | undefined) {
    setDate(next)
    setTime(undefined)
  }

  function handleSubmit() {
    setAttempted(true)
    if (!fullName.trim()) {
      toast.error("Please enter your name.")
      return
    }
    if (!patientName.trim()) {
      toast.error("Please enter the patient's name.")
      return
    }
    if (!phone.trim()) {
      toast.error("Please enter a phone number.")
      return
    }
    if (!date || !isDateBookable(doctor, date)) {
      toast.error("Please pick an available date from the calendar.")
      return
    }
    if (!time) {
      toast.error("Please select a time slot.")
      return
    }

    const next: Booking = {
      doctorId: doctor.id,
      doctorName: `Dr. ${doctor.firstName} ${doctor.lastName}`,
      specialty: doctor.specialty,
      patientName: patientName.trim(),
      date: toISODate(date),
      dateLong: formatBookingDate(date),
      time,
      serial: nextSerialNumber(doctor, date, time),
      fee: doctor.fee,
      room: doctor.room,
      clinic: doctor.clinic,
      estimatedTurnTime: doctor.estimatedTurnTime,
    }

    setBooking(next)
    setTicketOpen(true)
  }

  return (
    <>
      <Card className="border-primary/20">
        <CardHeader className="border-b border-border">
          <CardTitle className="font-heading text-headline-md">
            Book an Appointment
          </CardTitle>
          <p className="text-body-md text-muted-foreground">
            Fill in the details below — you&apos;ll get a serial ticket instantly.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <FieldGroup>
            <Field data-invalid={attempted && !fullName.trim()}>
              <FieldLabel htmlFor="full-name" className="text-label-caps uppercase tracking-widest">
                Your Name
              </FieldLabel>
              <Input
                id="full-name"
                placeholder="e.g. Ayesha Rahman"
                value={fullName}
                aria-invalid={attempted && !fullName.trim()}
                onChange={(event) => setFullName(event.target.value)}
              />
            </Field>

            <Field data-invalid={attempted && !patientName.trim()}>
              <FieldLabel htmlFor="patient-name" className="text-label-caps uppercase tracking-widest">
                Patient Name
              </FieldLabel>
              <Input
                id="patient-name"
                placeholder="Who is the appointment for?"
                value={patientName}
                aria-invalid={attempted && !patientName.trim()}
                onChange={(event) => setPatientName(event.target.value)}
              />
            </Field>

            <Field data-invalid={attempted && !phone.trim()}>
              <FieldLabel htmlFor="phone" className="text-label-caps uppercase tracking-widest">
                Patient Phone Number
              </FieldLabel>
              <Input
                id="phone"
                type="tel"
                placeholder="e.g. +1 555-0100"
                value={phone}
                aria-invalid={attempted && !phone.trim()}
                onChange={(event) => setPhone(event.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="notes" className="text-label-caps uppercase tracking-widest">
                Description <span className="font-normal text-muted-foreground">(optional)</span>
              </FieldLabel>
              <Textarea
                id="notes"
                placeholder="Brief reason for visit, symptoms, or any notes..."
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
            </Field>
          </FieldGroup>

          {/* Date picker */}
          <Field>
            <FieldLabel className="text-label-caps uppercase tracking-widest">
              Choose a Date
            </FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="h-11 w-full justify-start gap-2 text-body-md font-normal"
                >
                  <CalendarDays className="size-4 text-primary" />
                  {date ? formatBookingDate(date) : "Pick a date from the calendar"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateChange}
                  disabled={(candidate) => !isDateBookable(doctor, candidate)}
                  autoFocus={false}
                />
              </PopoverContent>
            </Popover>
            <FieldDescription>
              Past dates, off days, and fully-booked days are disabled.
            </FieldDescription>
          </Field>

          {/* Time slots */}
          <Field>
            <FieldLabel className="text-label-caps uppercase tracking-widest">
              Choose a Time
            </FieldLabel>
            {date ? (
              <ToggleGroup
                type="single"
                value={time}
                onValueChange={(value) => setTime(value)}
                className="grid w-full grid-cols-3 gap-2 sm:grid-cols-4"
              >
                {slots.map((slot) => (
                  <ToggleGroupItem
                    key={slot.time}
                    value={slot.time}
                    disabled={slot.booked}
                    className="h-10 rounded-lg border text-label-caps data-active:border-primary data-active:bg-primary data-active:text-primary-foreground data-disabled:cursor-not-allowed data-disabled:opacity-40 data-disabled:line-through"
                  >
                    {slot.time}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            ) : (
              <p className="rounded-lg border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
                Select a date first to see available time slots.
              </p>
            )}
            <FieldDescription>
              {date && slots.some((slot) => slot.booked)
                ? "Crossed-out slots are already booked."
                : "Slots refresh based on the selected date."}
            </FieldDescription>
          </Field>

          <div className="flex items-center justify-between gap-4 rounded-xl bg-muted px-4 py-3">
            <div>
              <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
                Consultation Fee
              </p>
              <p className="font-heading text-headline-md font-semibold">
                ${doctor.fee}
              </p>
            </div>
            <Button size="lg" onClick={handleSubmit}>
              Confirm Booking
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Serial ticket preview */}
      {booking && (
        <A4DocumentDialog
          open={ticketOpen}
          onOpenChange={setTicketOpen}
          title="Your Serial Ticket"
          description="Your booking is confirmed — download the ticket or send it via SMS."
          footerExtra={
            <Button variant="outline" onClick={() => setSmsOpen(true)}>
              <MessageSquareText data-icon="inline-start" />
              Send via SMS
            </Button>
          }
        >
          <SerialTicketSheet booking={booking} />
        </A4DocumentDialog>
      )}

      <SmsSentDialog
        open={smsOpen}
        onOpenChange={setSmsOpen}
        serial={booking?.serial}
        phone={phone}
      />
    </>
  )
}
