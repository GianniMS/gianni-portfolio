'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const linkClass = (href: string) =>
    pathname === href ? 'underline' : ''

  return (
    <>
      <nav className="hidden md:flex absolute top-6 right-6 gap-2 text-sm">
        <Link href="/" className={linkClass('/')}>Home</Link>
        <span>|</span>
        <Link href="/cv" className={linkClass('/cv')}>CV</Link>
      </nav>

      <div className="md:hidden absolute top-6 right-6">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="text-foreground text-xl leading-none"
        >
          &#9776;
        </button>

        {open && (
          <div className="fixed inset-0 bg-background z-50 flex flex-col items-end p-6 gap-6 text-lg">
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-xl">
              &#x2715;
            </button>
            <Link href="/" onClick={() => setOpen(false)} className={linkClass('/')}>Home</Link>
            <Link href="/cv" onClick={() => setOpen(false)} className={linkClass('/cv')}>CV</Link>
          </div>
        )}
      </div>
    </>
  )
}
