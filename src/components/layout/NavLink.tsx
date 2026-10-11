'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export const navLinkClass =
  'underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-800 hover:decoration-current'

export default function NavLink({
  href,
  onClick,
  exact = false,
  children,
}: {
  href: string
  onClick?: () => void
  // Only underline on this exact path, not on pages below it
  exact?: boolean
  children: ReactNode
}) {
  const pathname = usePathname()
  const active =
    pathname === href || (!exact && href !== '/' && pathname.startsWith(`${href}/`))

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`${navLinkClass} aria-[current=page]:decoration-current`}
    >
      {children}
    </Link>
  )
}
