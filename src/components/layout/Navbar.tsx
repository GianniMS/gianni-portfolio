import Link from 'next/link'
import { Fragment } from 'react'

const LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/experience', label: 'Experience' },
  { href: '/about', label: 'About Me' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <header className="flex flex-col gap-1 px-5 pt-5 text-2xl md:flex-row md:justify-between">
      <Link href="/">Gianni Mendonça Semedo</Link>
      <nav>
        {LINKS.map((link, i) => (
          <Fragment key={link.href}>
            {i > 0 && ' | '}
            <Link href={link.href}>{link.label}</Link>
          </Fragment>
        ))}
      </nav>
    </header>
  )
}
