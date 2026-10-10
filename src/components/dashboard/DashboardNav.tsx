'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import { CATEGORIES, CATEGORY_LABELS } from '@/data/categories'
import { logout } from '@/app/dashboard/actions'
import { linkClass } from './styles'

const LINKS = [
  { href: '/dashboard/home', label: 'Home' },
  { href: '/dashboard/products', label: 'Products' },
  ...CATEGORIES.map((category) => ({
    href: `/dashboard/items/${category}`,
    label: CATEGORY_LABELS[category],
  })),
  { href: '/dashboard/cv', label: 'Pages' },
]

export default function DashboardNav() {
  const pathname = usePathname()

  return (
    <header className="flex flex-col gap-2 px-2.5 pt-2.5 md:flex-row md:justify-between md:px-5 md:pt-5">
      <Link href="/dashboard" className={linkClass}>
        Dashboard
      </Link>
      <nav>
        {LINKS.map((link, i) => (
          <Fragment key={link.href}>
            {i > 0 && ' | '}
            <Link
              href={link.href}
              aria-current={pathname.startsWith(link.href) ? 'page' : undefined}
              className={`${linkClass} aria-[current=page]:decoration-current`}
            >
              {link.label}
            </Link>
          </Fragment>
        ))}
        {' | '}
        <Link href="/" className={linkClass}>
          View site
        </Link>
        {' | '}
        <form action={logout} className="inline">
          <button type="submit" className={linkClass}>
            Log out
          </button>
        </form>
      </nav>
    </header>
  )
}
