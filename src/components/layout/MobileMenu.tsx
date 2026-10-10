'use client'

import { useEffect, useState } from 'react'
import NavLink, { navLinkClass } from '@/components/layout/NavLink'

type NavLink = { href: string; label: string }

export default function MobileMenu({ links, cvPath }: { links: NavLink[]; cvPath?: string }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="relative z-50 flex h-6 w-[50px] flex-col justify-center gap-[5px]"
      >
        <span
          className={`h-0.5 w-full bg-foreground transition-transform duration-800 ${open ? 'translate-y-[3.5px] rotate-45 scale-x-[0.6]' : ''}`}
        />
        <span
          className={`h-0.5 w-full bg-foreground transition-transform duration-800 ${open ? '-translate-y-[3.5px] -rotate-45 scale-x-[0.6]' : ''}`}
        />
      </button>
      <nav
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col items-end gap-2 bg-background px-3.5 pt-20 text-right transition-opacity duration-800 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        inert={!open}
      >
        {links.map((link) => (
          <NavLink key={link.href} href={link.href} onClick={close}>
            {link.label}
          </NavLink>
        ))}
        {cvPath && (
          <a href={cvPath} download onClick={close} className={navLinkClass}>
            Download CV
          </a>
        )}
      </nav>
    </div>
  )
}
