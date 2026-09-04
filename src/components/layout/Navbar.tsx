'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useHover } from '@/context/HoverContext'
import { PORTRAIT_HOVER_SLUG } from '@/components/image/PreviewImage'
import CollisionText from '@/components/image/CollisionText'
import { SocialLinks } from '@/types'

export default function Navbar({ email, socials }: { email: string; socials: SocialLinks }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { setHoveredSlug } = useHover()

  const isActive = (href: string) => pathname === href

  const close = () => setOpen(false)

  const socialLinks = [
    { label: 'Mail', href: email ? `mailto:${email}` : '' },
    { label: 'LinkedIn', href: socials.linkedin },
    { label: 'Instagram', href: socials.instagram },
  ].filter((link) => link.href)

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-20 h-15 flex items-center justify-between px-6 pointer-events-none">
        <Link
          href="/"
          className="pointer-events-auto font-title font-bold text-blue text-lg md:text-3xl tracking-tight"
          onClick={close}
          onMouseEnter={() => setHoveredSlug(PORTRAIT_HOVER_SLUG)}
          onMouseLeave={() => setHoveredSlug(null)}
        >
          <CollisionText imageCollision={false}>Gianni Mendonca Semedo</CollisionText>
        </Link>

        <nav className="pointer-events-auto hidden md:flex gap-2 text-sm">
          <Link href="/"><CollisionText underline={isActive('/')} imageCollision={false}>Home</CollisionText></Link>
          <CollisionText imageCollision={false}>|</CollisionText>
          <Link href="/cv"><CollisionText underline={isActive('/cv')} imageCollision={false}>CV</CollisionText></Link>
        </nav>
      </div>

      <div className="fixed top-0 right-0 z-50 h-15 flex items-center px-6 md:hidden pointer-events-none">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="pointer-events-auto relative w-6 h-2.5"
        >
          <motion.span
            className="absolute left-0 top-0 w-6 h-0.5 bg-foreground"
            animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="absolute left-0 top-[8px] w-6 h-0.5 bg-foreground"
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
              <Link href="/" onClick={close} className="text-3xl font-bold leading-none">
                <CollisionText underline={isActive('/')} imageCollision={false}>Home</CollisionText>
              </Link>
              <Link href="/cv" onClick={close} className="text-3xl font-bold leading-none">
                <CollisionText underline={isActive('/cv')} imageCollision={false}>CV</CollisionText>
              </Link>
            </div>

            <div className="mt-auto flex flex-col items-start gap-3 text-sm font-bold">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
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
