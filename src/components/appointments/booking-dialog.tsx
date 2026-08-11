"use client"

import { useState } from "react"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import type { Doctor } from "@/lib/types"
import slots from "@/data/slots.json"

export function BookingDialog({
  open,
  onOpenChange,
  doctor,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  doctor: Doctor
}) {
  const [date, setDate] = useState(slots.dates[0]?.date ?? "")
  const [slot, setSlot] = useState<string | undefined>(undefined)

  const morning = slots.slots.filter((item) => item.period === "morning")
  const afternoon = slots.slots.filter((item) => item.period === "afternoon")

  const selectedDate = slots.dates.find((item) => item.date === date)
  const summary = slot
    ? `${selectedDate?.day} ${selectedDate?.date} ${selectedDate?.month}, ${slot}`
    : "No slot selected"

  function confirmBooking() {
    if (!slot) {
      toast.error("Please select a time slot first.")
      return
    }
    toast.success(
      `Appointment booked with Dr. ${doctor.lastName} on ${summary}.`
    )
    setSlot(undefined)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-headline-md">
            Select Appointment Slot
          </DialogTitle>
          <DialogDescription>
            Choose an available date and time with Dr. {doctor.lastName}.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
              Available Dates
            </p>
            <ToggleGroup
              type="single"
              value={date}
              onValueChange={(value) => {
                if (value) {
                  setDate(value)
                  setSlot(undefined)
                }
              }}
              className="flex w-fit gap-3"
            >
              {slots.dates.map((item) => (
                <ToggleGroupItem
                  key={item.date}
                  value={item.date}
                  className="h-auto w-20 flex-col gap-0.5 rounded-lg border px-2 py-2 data-active:border-primary data-active:bg-primary data-active:text-primary-foreground"
                >
                  <span className="text-xs font-normal opacity-70">
                    {item.day}
                  </span>
                  <span className="font-heading text-base font-bold">
                    {item.date}
                  </span>
                  <span className="text-xs font-normal opacity-70">
                    {item.month}
                  </span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
              Morning Slots
            </p>
            <ToggleGroup
              type="single"
              value={slot}
              onValueChange={(value) => setSlot(value)}
              className="grid w-fit grid-cols-3 gap-3 sm:grid-cols-4"
            >
              {morning.map((item) => (
                <ToggleGroupItem
                  key={item.time}
                  value={item.time}
                  disabled={item.booked}
                  className="w-24 rounded-lg border text-label-caps data-active:border-primary data-active:bg-primary data-active:text-primary-foreground"
                >
                  {item.time}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
              Afternoon Slots
            </p>
            <ToggleGroup
              type="single"
              value={slot}
              onValueChange={(value) => setSlot(value)}
              className="grid w-fit grid-cols-3 gap-3 sm:grid-cols-4"
            >
              {afternoon.map((item) => (
                <ToggleGroupItem
                  key={item.time}
                  value={item.time}
                  disabled={item.booked}
                  className="w-24 rounded-lg border text-label-caps data-active:border-primary data-active:bg-primary data-active:text-primary-foreground"
                >
                  {item.time}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
        <DialogFooter className="flex-col items-stretch justify-between gap-4 border-t pt-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-label-caps uppercase text-muted-foreground">
              Selected Slot
            </p>
            <p className="font-medium">{summary}</p>
          </div>
          <Button size="lg" onClick={confirmBooking}>
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}