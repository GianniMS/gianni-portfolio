'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useHover } from '@/context/HoverContext'
import { PORTRAIT_HOVER_SLUG } from '@/components/image/PreviewImage'
import CollisionText from '@/components/image/CollisionText'
import CollisionBar from '@/components/image/CollisionBar'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { setHoveredSlug } = useHover()

  const isActive = (href: string) => pathname === href

  const close = () => setOpen(false)

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-20 h-15 flex items-center justify-between px-6 pointer-events-none">
        <Link
          href="/"
          className="pointer-events-auto font-title text-blue text-2xl md:text-4xl tracking-wide"
          onClick={close}
          onMouseEnter={() => setHoveredSlug(PORTRAIT_HOVER_SLUG)}
          onMouseLeave={() => setHoveredSlug(null)}
        >
          <CollisionText>GIANNI</CollisionText>
        </Link>

        <nav className="pointer-events-auto hidden md:flex gap-2 text-sm">
          <Link href="/"><CollisionText underline={isActive('/')}>Home</CollisionText></Link>
          <CollisionText>|</CollisionText>
          <Link href="/cv"><CollisionText underline={isActive('/cv')}>CV</CollisionText></Link>
        </nav>
      </div>

      <div className="fixed top-0 right-0 z-50 h-15 flex items-center px-6 md:hidden pointer-events-none">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="pointer-events-auto relative w-6 h-2.5"
        >
          <CollisionBar
            className="absolute left-0 top-0 w-6 h-0.5"
            animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
          />
          <CollisionBar
            className="absolute left-0 top-[8px] w-6 h-0.5"
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
            className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8 text-lg md:hidden"
          >
            <Link href="/" onClick={close}><CollisionText underline={isActive('/')} imageCollision={false}>Home</CollisionText></Link>
            <Link href="/cv" onClick={close}><CollisionText underline={isActive('/cv')} imageCollision={false}>CV</CollisionText></Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
