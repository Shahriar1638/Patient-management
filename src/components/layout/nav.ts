import {
  CalendarDays,
  FolderOpen,
  LayoutDashboard,
  Pill,
  Settings,
} from "lucide-react"

export const navItems = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Book Appointment", href: "/appointments", icon: CalendarDays },
  { title: "Medical Records", href: "/records", icon: FolderOpen },
  { title: "Medicine Inventory", href: "/inventory", icon: Pill },
]

export const settingsItem = {
  title: "Settings",
  icon: Settings,
  disabled: true,
}