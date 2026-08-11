"use client"

import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Field, FieldGroup, FieldLabel, FieldSet, FieldLegend } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export type Filters = {
  search: string
  specialty: string
  feeMin: string
  feeMax: string
  availableToday: boolean
  videoConsult: boolean
  day: string
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

export function FilterBar({
  filters,
  onChange,
}: {
  filters: Filters
  onChange: (next: Filters) => void
}) {
  return (
    <Card>
      <CardContent>
        <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <Field className="gap-2 md:col-span-3">
            <FieldLabel className="text-label-caps uppercase tracking-widest">
              Doctor Name or Clinic
            </FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search..."
                value={filters.search}
                onChange={(event) =>
                  onChange({ ...filters, search: event.target.value })
                }
              />
            </InputGroup>
          </Field>
          <Field className="gap-2 md:col-span-2">
            <FieldLabel className="text-label-caps uppercase tracking-widest">
              Specialty
            </FieldLabel>
            <Select
              value={filters.specialty}
              onValueChange={(value) => onChange({ ...filters, specialty: value })}
            >
              <SelectTrigger className="h-11 text-body-md">
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Endocrinology">Endocrinology</SelectItem>
                  <SelectItem value="General Practice">General Practice</SelectItem>
                  <SelectItem value="Pulmonology">Pulmonology</SelectItem>
                  <SelectItem value="Dermatology">Dermatology</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field className="gap-2 md:col-span-2">
            <FieldLabel className="text-label-caps uppercase tracking-widest">
              Location
            </FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <Search className="rotate-45" />
              </InputGroupAddon>
              <InputGroupInput placeholder="City or ZIP" />
            </InputGroup>
          </Field>
          <Field className="gap-2 md:col-span-3">
            <FieldLabel className="text-label-caps uppercase tracking-widest">
              Consultation Fee
            </FieldLabel>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Min"
                className="h-11"
                value={filters.feeMin}
                onChange={(event) =>
                  onChange({ ...filters, feeMin: event.target.value })
                }
              />
              <span className="text-muted-foreground">-</span>
              <Input
                type="number"
                placeholder="Max"
                className="h-11"
                value={filters.feeMax}
                onChange={(event) =>
                  onChange({ ...filters, feeMax: event.target.value })
                }
              />
            </div>
          </Field>
          <div className="flex items-end md:col-span-2 md:col-start-11">
            <Button size="lg" className="h-11 w-full">
              Apply Filters
            </Button>
          </div>
        </FieldGroup>
        <FieldSet className="mt-4 flex flex-col gap-4 border-t border-border pt-4 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <FieldLegend
              variant="label"
              className="text-label-caps uppercase tracking-widest"
            >
              Quick Filters:
            </FieldLegend>
            <Field orientation="horizontal" className="w-fit items-center gap-2">
              <Checkbox
                id="available-today"
                checked={filters.availableToday}
                onCheckedChange={(checked) =>
                  onChange({ ...filters, availableToday: checked === true })
                }
              />
              <FieldLabel htmlFor="available-today" className="text-body-md">
                Available Today
              </FieldLabel>
            </Field>
            <Field orientation="horizontal" className="w-fit items-center gap-2">
              <Checkbox
                id="video-consult"
                checked={filters.videoConsult}
                onCheckedChange={(checked) =>
                  onChange({ ...filters, videoConsult: checked === true })
                }
              />
              <FieldLabel htmlFor="video-consult" className="text-body-md">
                Video Consultation
              </FieldLabel>
            </Field>
          </div>
          <Field className="gap-2 lg:ml-auto">
            <FieldLabel className="text-label-caps uppercase tracking-widest">
              Available On
            </FieldLabel>
            <ToggleGroup
              type="single"
              value={filters.day}
              onValueChange={(value) =>
                onChange({ ...filters, day: value ?? "all" })
              }
              className="flex w-fit flex-wrap gap-2"
            >
              <ToggleGroupItem
                value="all"
                className="h-8 w-10 rounded-lg border text-label-caps data-active:border-primary data-active:bg-primary data-active:text-primary-foreground"
              >
                Any
              </ToggleGroupItem>
              {days.map((day) => (
                <ToggleGroupItem
                  key={day}
                  value={day}
                  className="h-8 w-10 rounded-lg border text-label-caps data-active:border-primary data-active:bg-primary data-active:text-primary-foreground"
                >
                  {day.slice(0, 3)}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </Field>
        </FieldSet>
      </CardContent>
    </Card>
  )
}