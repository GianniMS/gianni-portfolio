import Link from 'next/link'
import { Fragment } from 'react'
import { getCV } from '@/lib/content'
import MobileMenu from '@/components/layout/MobileMenu'
import NavLink, { navLinkClass } from '@/components/layout/NavLink'

const LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/experience', label: 'Experience' },
  { href: '/about', label: 'About Me' },
  { href: '/contact', label: 'Contact' },
]

export default async function Navbar() {
  const cvPath = (await getCV())?.cvPdfPath

  return (
    <header id="site-header" className="flex items-center justify-between px-2.5 pt-2.5 text-base md:items-start md:px-5 md:pt-5">
      <Link href="/">Gianni Mendonça Semedo</Link>
      <MobileMenu links={LINKS} cvPath={cvPath || undefined} />
      <nav className="hidden md:block">
        {LINKS.map((link, i) => (
          <Fragment key={link.href}>
            {i > 0 && ' | '}
            <NavLink href={link.href}>{link.label}</NavLink>
          </Fragment>
        ))}
        {cvPath && (
          <>
            {' | '}
            <a href={cvPath} download className={navLinkClass}>
              Download CV
            </a>
          </>
        )}
      </nav>
    </header>
  )
}
