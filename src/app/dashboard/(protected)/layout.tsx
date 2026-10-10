import { ReactNode } from 'react'
import DashboardNav from '@/components/dashboard/DashboardNav'

// Every dashboard page renders the current document; nothing here may be
// served from the full route cache.
export const dynamic = 'force-dynamic'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <DashboardNav />
      <main className="mx-auto max-w-5xl px-2.5 pb-20 pt-16 md:px-5 md:pt-24">{children}</main>
    </div>
  )
}
