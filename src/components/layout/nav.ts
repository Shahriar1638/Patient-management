import {
  CalendarDays,
  FolderOpen,
  LayoutDashboard,
  PanelsTopLeft,
  Pill,
  Settings,
} from "lucide-react"

export const navItems = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Book Appointment", href: "/appointments", icon: CalendarDays },
  { title: "Medical Records", href: "/records", icon: FolderOpen },
  { title: "Medicine Inventory", href: "/inventory", icon: Pill },
  { title: "Pages", href: "/pages", icon: PanelsTopLeft },
]

export const settingsItem = {
  title: "Settings",
  icon: Settings,
  disabled: true,
}