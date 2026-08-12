import type { Doctor } from "@/lib/types"

export type TimeSlot = {
  time: string
  booked: boolean
}

/**
 * Simple deterministic string hash so booked slots & serials are stable
 * across server/client renders (no hydration mismatch, no randomness).
 */
function hashCode(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function toISODate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function format12h(hour: number, minute: number): string {
  const period = hour >= 12 ? "PM" : "AM"
  const h12 = hour % 12 === 0 ? 12 : hour % 12
  return `${h12}:${String(minute).padStart(2, "0")} ${period}`
}

function parseSlotTime(value: string): number {
  const [hour, minute] = value.split(":").map(Number)
  return hour * 60 + minute
}

export function formatBookingDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function weekdayName(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long" })
}

/**
 * Raw 15-minute slots between the doctor's open and close times, with
 * per-slot booking decided deterministically. No day-level override here —
 * that lives in generateTimeSlots so the "fully booked" check can reuse this.
 */
function buildRawSlots(doctor: Doctor, date: Date): TimeSlot[] {
  const start = parseSlotTime(doctor.slotStart)
  let end = parseSlotTime(doctor.slotEnd)
  if (end <= start) end += 24 * 60 // overnight shift (e.g. 7 PM – 1 AM)

  const iso = toISODate(date)
  const slots: TimeSlot[] = []

  for (let minutes = start; minutes < end; minutes += 15) {
    const time = format12h(Math.floor((minutes % 1440) / 60), minutes % 60)
    const booked = hashCode(`${doctor.id}|${iso}|${time}`) % 4 === 0
    slots.push({ time, booked })
  }

  return slots
}

/**
 * A day is fully booked when every generated slot on it is taken.
 * The deterministic "sold-out" marker keeps the mock interesting; either way
 * the check is derived from the real slots, so the calendar and the slot grid
 * can never disagree.
 */
export function isDayFullyBooked(doctor: Doctor, date: Date): boolean {
  if (hashCode(`${doctor.id}|${toISODate(date)}|full`) % 7 === 0) return true
  const slots = buildRawSlots(doctor, date)
  return slots.length > 0 && slots.every((slot) => slot.booked)
}

/** 15-minute slots for a date — every slot is marked booked on a full day. */
export function generateTimeSlots(doctor: Doctor, date: Date): TimeSlot[] {
  const slots = buildRawSlots(doctor, date)
  if (isDayFullyBooked(doctor, date)) {
    return slots.map((slot) => ({ ...slot, booked: true }))
  }
  return slots
}

/** Doctor is on duty on this weekday. */
export function isWorkingDay(doctor: Doctor, date: Date): boolean {
  return doctor.availability.includes(weekdayName(date))
}

/**
 * Can the patient book this date?
 * - no past dates
 * - doctor must be on duty that weekday
 * - day must not be fully booked
 */
export function isDateBookable(doctor: Doctor, date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(date)
  target.setHours(0, 0, 0, 0)

  if (target < today) return false
  if (!isWorkingDay(doctor, date)) return false
  if (isDayFullyBooked(doctor, date)) return false
  return true
}

/** Deterministic serial number for a booking, offset from the live queue. */
export function nextSerialNumber(doctor: Doctor, date: Date, time: string): number {
  return 16 + (hashCode(`${doctor.id}|${toISODate(date)}|${time}`) % 28)
}
