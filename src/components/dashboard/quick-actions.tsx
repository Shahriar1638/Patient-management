"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarPlus, FileText, UserRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProfileDialog } from "@/components/dashboard/profile-dialog"

export function QuickActions() {
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <Card className="col-span-1 md:col-span-4">
      <CardContent className="flex flex-col gap-4">
        <p className="text-label-caps uppercase tracking-widest text-muted-foreground">
          Quick Actions
        </p>
        <Button asChild size="lg" className="h-12 w-full">
          <Link href="/appointments">
            <CalendarPlus data-icon="inline-start" />
            Book Appointment
          </Link>
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="h-12 w-full"
          onClick={() => setProfileOpen(true)}
        >
          <UserRound data-icon="inline-start" />
          My Profile
        </Button>
        <Button asChild variant="link" className="h-auto w-fit px-0">
          <Link href="/records">
            <FileText data-icon="inline-start" />
            View Records
          </Link>
        </Button>
      </CardContent>
      <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
    </Card>
  )
}
