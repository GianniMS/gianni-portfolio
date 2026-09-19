import { ReactNode } from 'react'
import DashboardNav from '@/components/dashboard/DashboardNav'

// Every dashboard page renders the current document; nothing here may be
// served from the full route cache.
export const dynamic = 'force-dynamic'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardNav />
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  )
}
