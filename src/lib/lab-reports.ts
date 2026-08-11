import { FlaskConical, HeartPulse, ScanLine } from "lucide-react"

export const labIconByType: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  lab: FlaskConical,
  imaging: ScanLine,
  cardio: HeartPulse,
}

export const labStatusLabel: Record<string, string> = {
  ready: "Ready",
  pending: "Pending",
}
