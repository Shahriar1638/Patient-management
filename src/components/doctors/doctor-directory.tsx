"use client"

import { useMemo, useState } from "react"
import { Search, SlidersHorizontal, Star } from "lucide-react"

import { DoctorCard } from "@/components/doctors/doctor-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { Doctor } from "@/lib/types"

const specialties = [
  "Cardiology",
  "Endocrinology",
  "General Practice",
  "Pulmonology",
  "Dermatology",
]

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "fee-asc", label: "Fee: Low to High" },
  { value: "fee-desc", label: "Fee: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "name", label: "Name A–Z" },
]

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export function DoctorDirectory({ doctors }: { doctors: Doctor[] }) {
  const [search, setSearch] = useState("")
  const [specialty, setSpecialty] = useState("all")
  const [day, setDay] = useState("all")
  const [sort, setSort] = useState("recommended")

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    const result = doctors.filter((doctor) => {
      if (
        query &&
        !`${doctor.firstName} ${doctor.lastName} ${doctor.clinic} ${doctor.specialty}`
          .toLowerCase()
          .includes(query)
      ) {
        return false
      }
      if (specialty !== "all" && doctor.specialty !== specialty) return false
      if (day !== "all" && !doctor.availability.includes(day)) return false
      return true
    })

    switch (sort) {
      case "fee-asc":
        return [...result].sort((a, b) => a.fee - b.fee)
      case "fee-desc":
        return [...result].sort((a, b) => b.fee - a.fee)
      case "rating":
        return [...result].sort((a, b) => b.rating - a.rating)
      case "name":
        return [...result].sort((a, b) =>
          a.lastName.localeCompare(b.lastName)
        )
      default:
        return result
    }
  }, [doctors, search, specialty, day, sort])

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <Field className="gap-2 lg:col-span-5">
              <FieldLabel className="text-label-caps uppercase tracking-widest">
                Search
              </FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
                <InputGroupInput
                  placeholder="Doctor name, clinic, or specialty..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </InputGroup>
            </Field>
            <Field className="gap-2 lg:col-span-3">
              <FieldLabel className="text-label-caps uppercase tracking-widest">
                Specialty
              </FieldLabel>
              <Select value={specialty} onValueChange={setSpecialty}>
                <SelectTrigger className="h-11 text-body-md">
                  <SelectValue placeholder="All Specialties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Specialties</SelectItem>
                    {specialties.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field className="gap-2 lg:col-span-2">
              <FieldLabel className="text-label-caps uppercase tracking-widest">
                Sort by
              </FieldLabel>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="h-11 text-body-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field className="gap-2 lg:col-span-2">
              <FieldLabel className="text-label-caps uppercase tracking-widest">
                Available On
              </FieldLabel>
              <ToggleGroup
                type="single"
                value={day}
                onValueChange={(value) => setDay(value ?? "all")}
                className="flex w-fit flex-wrap gap-2"
              >
                <ToggleGroupItem
                  value="all"
                  className="h-11 w-10 rounded-lg border text-label-caps data-active:border-primary data-active:bg-primary data-active:text-primary-foreground"
                >
                  Any
                </ToggleGroupItem>
                {days.map((item) => (
                  <ToggleGroupItem
                    key={item}
                    value={item}
                    className="h-11 w-10 rounded-lg border text-label-caps data-active:border-primary data-active:bg-primary data-active:text-primary-foreground"
                  >
                    {item.slice(0, 3)}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </Field>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between gap-4">
        <p className="flex items-center gap-2 text-body-md text-muted-foreground">
          <SlidersHorizontal className="size-4" />
          {filtered.length} doctor{filtered.length === 1 ? "" : "s"} found
        </p>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <Star className="size-8 text-muted-foreground/40" />
            <p className="font-heading text-headline-md font-semibold">
              No doctors match your filters
            </p>
            <p className="max-w-sm text-body-md text-muted-foreground">
              Try widening your search or clearing the day and specialty
              filters.
            </p>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => {
                setSearch("")
                setSpecialty("all")
                setDay("all")
                setSort("recommended")
              }}
            >
              Reset Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
