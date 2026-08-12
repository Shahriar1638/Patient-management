import Link from "next/link"
import { HeartPulse } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"
import patients from "@/data/patients.json"

const patient = patients[0]

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between gap-4 border-b border-border bg-background px-4 shadow-sm md:px-8">
      <Link href="/" className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <HeartPulse className="size-5" />
        </span>
        <span className="font-heading text-xl font-bold text-primary">
          MedCare
          <span className="hidden md:inline">&nbsp;Portal</span>
        </span>
      </Link>
      <div className="flex items-center gap-3 md:gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
            Welcome back,
          </p>
          <p className="text-body-md font-semibold text-foreground">
            {patient.firstName} {patient.lastName}
          </p>
        </div>
        <Avatar className="size-10 rounded-full border border-border">
          <AvatarFallback className="bg-primary text-body-md font-semibold text-primary-foreground">
            {getInitials(patient.firstName, patient.lastName)}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
