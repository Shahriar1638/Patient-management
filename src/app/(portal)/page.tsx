import { HeroTracker } from "@/components/dashboard/hero-tracker"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { ReadyReports } from "@/components/dashboard/ready-reports"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { ReminderBanner } from "@/components/dashboard/reminder-banner"

export default function DashboardPage() {
  return (
    <>
      <div className="hidden border-b border-border pb-6 md:block">
        <p className="max-w-2xl text-body-lg text-muted-foreground">
          Manage your appointments, view medical records, and track your clinic
          wait times all in one place. Your health, simplified.
        </p>
      </div>
      <ReminderBanner />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <HeroTracker />
        <QuickActions />
        <RecentActivity />
        <ReadyReports />
      </div>
    </>
  )
}