'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CATEGORIES, CATEGORY_LABELS } from '@/data/categories'
import { logout } from '@/app/dashboard/actions'
import { buttonCompact, buttonSecondary } from './styles'

export default function DashboardNav() {
  const pathname = usePathname()

  const links = [
    { href: '/dashboard', label: 'Overview' },
    ...CATEGORIES.map((category) => ({
      href: `/dashboard/items/${category}`,
      label: CATEGORY_LABELS[category],
    })),
    { href: '/dashboard/cv', label: 'CV page' },
  ]

  return (
    <header className="border-b border-foreground/10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-6 py-4">
        <Link href="/dashboard" className="text-blue text-lg font-bold tracking-tight">
          Dashboard
        </Link>

        <nav className="flex flex-wrap items-center gap-4 text-sm font-bold">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? 'opacity-100' : 'opacity-60'}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Link href="/" className={`${buttonSecondary} ${buttonCompact}`}>
            View site
          </Link>
          <form action={logout}>
            <button type="submit" className={`${buttonSecondary} ${buttonCompact}`}>
              Log out
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
