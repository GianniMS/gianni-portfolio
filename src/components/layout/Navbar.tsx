'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useHover } from '@/context/HoverContext'
import { PORTRAIT_HOVER_SLUG } from '@/components/image/PreviewImage'
import CollisionText from '@/components/image/CollisionText'
import { useSocials } from '@/context/SocialsContext'
import { useContact } from '@/context/ContactContext'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { setHoveredSlug } = useHover()
  const socialLinks = useSocials()
  const { open: contactOpen, setOpen: setContactOpen } = useContact()
  const onContactPage = pathname === '/contact'

  const isActive = (href: string) => pathname === href

  // the desktop overlay leaves the pathname alone, so Home/CV would stay active
  const activeOpacity = (href: string) =>
    !contactOpen && isActive(href) ? 'opacity-100' : 'opacity-60'


  const close = () => setOpen(false)

  // nav links must close the overlay even when they point at the current route,
  // where the pathname never changes for ContactOverlay to react to
  const leaveContact = () => {
    close()
    setContactOpen(false)
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-20 h-15 flex items-center justify-between px-6 pointer-events-none">
        <Link
          href="/"
          className={`pointer-events-auto font-title font-bold text-lg md:text-3xl tracking-tight ${
            onContactPage ? 'text-background md:text-blue' : 'text-blue'
          }`}
          onClick={leaveContact}
          onMouseEnter={() => setHoveredSlug(PORTRAIT_HOVER_SLUG)}
          onMouseLeave={() => setHoveredSlug(null)}
        >
          <CollisionText imageCollision={false}>Gianni Mendonca Semedo</CollisionText>
        </Link>

        <nav className="pointer-events-auto hidden md:flex gap-4 text-sm font-bold">
          <Link href="/" onClick={leaveContact} className={activeOpacity('/')}>
            <CollisionText imageCollision={false}>Home</CollisionText>
          </Link>
          <Link href="/cv" onClick={leaveContact} className={activeOpacity('/cv')}>
            <CollisionText imageCollision={false}>CV</CollisionText>
          </Link>
          <button
            type="button"
            onClick={() => setContactOpen(!contactOpen)}
            className={`cursor-pointer ${
              contactOpen || onContactPage ? 'opacity-100' : 'opacity-60'
            }`}
          >
            <CollisionText imageCollision={false}>Contact</CollisionText>
          </button>
        </nav>
      </div>

      <div className="fixed top-0 right-0 z-50 h-15 flex items-center px-6 md:hidden pointer-events-none">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="pointer-events-auto relative w-6 h-2.5"
        >
          <motion.span
            className={`absolute left-0 top-0 w-6 h-0.5 ${
              onContactPage && !open ? 'bg-background' : 'bg-foreground'
            }`}
            animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className={`absolute left-0 top-[8px] w-6 h-0.5 ${
              onContactPage && !open ? 'bg-background' : 'bg-foreground'
            }`}
            animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background z-40 flex flex-col px-6 pt-24 pb-12 md:hidden"
          >
            <div className="flex flex-col items-start gap-6">
              <Link
                href="/"
                onClick={leaveContact}
                className={`text-3xl font-bold leading-none ${activeOpacity('/')}`}
              >
                <CollisionText imageCollision={false}>Home</CollisionText>
              </Link>
              <Link
                href="/cv"
                onClick={leaveContact}
                className={`text-3xl font-bold leading-none ${activeOpacity('/cv')}`}
              >
                <CollisionText imageCollision={false}>CV</CollisionText>
              </Link>
              <Link
                href="/contact"
                onClick={close}
                className={`text-3xl font-bold leading-none ${activeOpacity('/contact')}`}
              >
                <CollisionText imageCollision={false}>Contact</CollisionText>
              </Link>
            </div>

            <div className="mt-auto flex flex-col items-start gap-3 text-3xl font-bold leading-none">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  onClick={close}
                >
                  <CollisionText imageCollision={false}>{link.label}</CollisionText>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
