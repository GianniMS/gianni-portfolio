import Link from 'next/link'
import { ReactNode } from 'react'
import { CATEGORIES, CATEGORY_LABELS } from '@/data/categories'
import { logout } from '@/app/dashboard/actions'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <nav className="flex flex-wrap items-center gap-4 px-6 py-4 border-b border-foreground/10">
        <Link href="/dashboard" className="font-bold text-blue">
          Dashboard
        </Link>
        {CATEGORIES.map((category) => (
          <Link key={category} href={`/dashboard/items/${category}`} className="text-sm">
            {CATEGORY_LABELS[category]}
          </Link>
        ))}
        <Link href="/dashboard/cv" className="text-sm">
          CV
        </Link>
        <form action={logout} className="ml-auto">
          <button type="submit" className="text-sm text-foreground/60">
            Log out
          </button>
        </form>
      </nav>
      <main className="px-6 py-8">{children}</main>
    </div>
  )
}
