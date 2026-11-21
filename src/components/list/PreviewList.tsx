'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

// How quickly the preview catches up with the cursor each frame; lower trails more softly
const FOLLOW = 0.18

// A list whose rows (marked data-preview with a colour) show a preview that trails the cursor while
// hovered; mouse only, as touch has no hover
export default function PreviewList({ children }: { children: ReactNode }) {
  const preview = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const frame = useRef(0)
  const [fill, setFill] = useState<string | null>(null)
  // What the card last showed, kept while it fades out so it doesn't change look mid-fade
  const [look, setLook] = useState<string | null>(null)

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const follow = () => {
    const el = preview.current
    if (!el) return
    current.current.x += (target.current.x - current.current.x) * FOLLOW
    current.current.y += (target.current.y - current.current.y) * FOLLOW
    el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(0, -100%)`
    const settled =
      Math.abs(target.current.x - current.current.x) < 0.1 && Math.abs(target.current.y - current.current.y) < 0.1
    frame.current = settled ? 0 : requestAnimationFrame(follow)
  }

  return (
    <div
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        const row = (e.target as HTMLElement).closest<HTMLElement>('[data-preview]')
        const colour = row?.dataset.preview ?? null
        setFill(colour)
        if (colour) setLook(colour)
        target.current = { x: e.clientX, y: e.clientY }
        // Arriving fresh, start from the cursor rather than gliding in from wherever it last was
        if (!fill) current.current = { ...target.current }
        if (!frame.current) frame.current = requestAnimationFrame(follow)
      }}
      onPointerLeave={() => setFill(null)}
    >
      {children}
      <div ref={preview} aria-hidden className="pointer-events-none fixed top-0 left-0 z-30 hidden md:block">
        {/* A row asks for a colour, or for "noise": the moving film grain card */}
        <div
          style={{ backgroundColor: look && look !== 'noise' ? look : undefined }}
          className={`aspect-4/3 w-30 origin-bottom-left transition-[opacity,scale] duration-300 ease-[cubic-bezier(0.2,0.65,0.3,1)] ${
            fill ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          } ${look === 'noise' ? 'noise' : ''}`}
        />
      </div>
    </div>
  )
}
