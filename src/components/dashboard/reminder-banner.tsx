"use client"

import { useState } from "react"
import { Info, X } from "lucide-react"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function ReminderBanner() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <Alert className="rounded-xl border-border bg-muted text-foreground">
      <Info className="text-primary" />
      <AlertTitle className="text-[15px]">
        Upcoming Appointment Reminder
      </AlertTitle>
      <AlertDescription>
        You will receive an SMS reminder 2 hours before your next appointment
        with Dr. Sarah Jenkins.
      </AlertDescription>
      <AlertAction>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Dismiss reminder"
          onClick={() => setVisible(false)}
        >
          <X />
        </Button>
      </AlertAction>
    </Alert>
  )
}