'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import CollisionText from '@/components/image/CollisionText'
import { useCursor } from '@/context/CursorContext'
import { Rect, intersect } from '@/lib/collision'
import { BEAT } from '@/lib/motion'
import { CVData } from '@/types'

const INTRO = 'For project inquiries, collaborations or anything else, reach me here.'

function contactLinks(data: CVData) {
  return [
    { label: data.email, href: data.email ? `mailto:${data.email}` : '', external: false },
    { label: 'LinkedIn', href: data.socials.linkedin, external: true },
    { label: 'Instagram', href: data.socials.instagram, external: true },
  ].filter((link) => link.href)
}

// The global cursor sits at z-8, below this panel, so it renders its own square
// here instead: above the blue surface, below the text overlays at z-9.
function CursorSquare({ panel }: { panel: Rect | null }) {
  const { cursorRect } = useCursor()
  if (!panel || !cursorRect) return null

  const hit = intersect(cursorRect, panel)
  if (!hit) return null

  return (
    <div
      aria-hidden
      className="absolute bg-background pointer-events-none"
      style={{
        top: hit.top - panel.top,
        left: hit.left - panel.left,
        width: hit.right - hit.left,
        height: hit.bottom - hit.top,
        zIndex: 5,
      }}
    />
  )
}

export function ContactModal({ data, onClose }: { data: CVData; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [panel, setPanel] = useState<Rect | null>(null)

  useEffect(() => {
    const measure = () => {
      if (!ref.current) return
      const r = ref.current.getBoundingClientRect()
      if (r.width === 0 && r.height === 0) return setPanel(null)
      setPanel({ top: r.top, left: r.left, bottom: r.bottom, right: r.right })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: BEAT, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        if (!ref.current) return
        const r = ref.current.getBoundingClientRect()
        setPanel({ top: r.top, left: r.left, bottom: r.bottom, right: r.right })
      }}
      className="hidden md:block fixed bottom-6 right-6 z-40 h-[38rem] max-h-[calc(100vh-3rem)] w-80 overflow-hidden bg-blue text-background p-6"
    >
      <CursorSquare panel={panel} />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close contact"
        className="block w-fit cursor-pointer text-xl leading-none mb-6"
      >
        <CollisionText imageCollision={false} cursorColor="var(--color-foreground)">
          ×
        </CollisionText>
      </button>

      <p className="text-sm leading-relaxed mb-6">
        <CollisionText imageCollision={false} cursorColor="var(--color-foreground)">
          {INTRO}
        </CollisionText>
      </p>

      <p className="font-bold text-lg leading-tight mb-5">
        <CollisionText imageCollision={false} cursorColor="var(--color-foreground)">
          {data.name}
        </CollisionText>
      </p>

      <ul className="flex flex-col gap-2">
        {contactLinks(data).map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="text-sm underline"
            >
              <CollisionText imageCollision={false} cursorColor="var(--color-foreground)">
                {link.label}
              </CollisionText>
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function ContactPanel({ data }: { data: CVData }) {
  return (
    <div className="relative z-20 flex flex-col max-w-md">
      <p className="text-base leading-relaxed mb-8">
        <CollisionText imageCollision={false} cursorColor="var(--color-blue)">
          {INTRO}
        </CollisionText>
      </p>

      <p className="font-bold text-2xl leading-tight mb-6">
        <CollisionText imageCollision={false} cursorColor="var(--color-blue)">
          {data.name}
        </CollisionText>
      </p>

      <ul className="flex flex-col gap-3">
        {contactLinks(data).map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="text-lg font-bold underline w-fit"
            >
              <CollisionText imageCollision={false} cursorColor="var(--color-blue)">
                {link.label}
              </CollisionText>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
