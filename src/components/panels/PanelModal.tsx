'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import CollisionText from '@/components/image/CollisionText'
import { useCursor } from '@/context/CursorContext'
import { Rect, intersect } from '@/lib/collision'
import { BEAT } from '@/lib/motion'

// Text on the blue surface: the cursor's second layer has to redraw in the
// foreground colour, since the default background colour is the text colour here.
export function ModalText({
  children,
  underline = false,
}: {
  children: ReactNode
  underline?: boolean
}) {
  return (
    <CollisionText
      imageCollision={false}
      cursorColor="var(--color-foreground)"
      underline={underline}
    >
      {children}
    </CollisionText>
  )
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

export default function PanelModal({
  onClose,
  label,
  children,
}: {
  onClose: () => void
  label: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [panel, setPanel] = useState<Rect | null>(null)

  const measure = () => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    if (r.width === 0 && r.height === 0) return setPanel(null)
    setPanel({ top: r.top, left: r.left, bottom: r.bottom, right: r.right })
  }

  useEffect(() => {
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
      onAnimationComplete={measure}
      className="hidden md:flex flex-col fixed bottom-6 right-6 z-40 h-[38rem] max-h-[calc(100vh-3rem)] w-80 overflow-hidden bg-blue text-background p-6"
    >
      <CursorSquare panel={panel} />

      <button
        type="button"
        onClick={onClose}
        aria-label={label}
        className="block w-fit shrink-0 cursor-pointer text-xl leading-none mb-6"
      >
        <ModalText>×</ModalText>
      </button>

      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
    </motion.div>
  )
}
