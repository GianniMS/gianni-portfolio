'use client'

import { Children, ReactNode, useCallback, useEffect, useRef, useState } from 'react'

const NEXT = ['ArrowDown', 'ArrowRight', 'PageDown', ' ']
const PREV = ['ArrowUp', 'ArrowLeft', 'PageUp']

// Full-screen slides that snap as you scroll or swipe; arrows, space and page keys step through
// them like a presentation, and F toggles full screen for presenting from a laptop
export default function Deck({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const total = Children.count(children)

  const goTo = useCallback(
    (index: number) => {
      const slide = ref.current?.children[Math.max(0, Math.min(total - 1, index))]
      slide?.scrollIntoView({ behavior: 'smooth' })
    },
    [total],
  )

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(Array.from(root.children).indexOf(entry.target))
        }
      },
      { root, threshold: 0.5 },
    )
    Array.from(root.children).forEach((slide) => observer.observe(slide))
    return () => observer.disconnect()
  }, [total])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (NEXT.includes(e.key)) {
        e.preventDefault()
        goTo(current + 1)
      } else if (PREV.includes(e.key)) {
        e.preventDefault()
        goTo(current - 1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        goTo(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goTo(total - 1)
      } else if (e.key === 'f') {
        if (document.fullscreenElement) document.exitFullscreen()
        else document.documentElement.requestFullscreen?.()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, goTo, total])

  return (
    <div className="relative">
      {/* Proximity on phones, so a slide taller than the screen can still be read to its end */}
      <div
        ref={ref}
        className="h-svh snap-y snap-proximity overflow-y-auto overscroll-none md:snap-mandatory"
      >
        {children}
      </div>

      <div className="pointer-events-none fixed inset-x-0 top-0 h-0.5 bg-foreground/10">
        <div
          className="h-full bg-foreground transition-[width] duration-500 ease-out"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>

      <nav
        aria-label="Slides"
        className="fixed right-4 bottom-4 flex items-center gap-1 rounded-full bg-foreground px-1 py-1 font-sf text-xs text-background md:right-8 md:bottom-8"
      >
        <button
          type="button"
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          aria-label="Vorige slide"
          className="grid size-8 place-items-center rounded-full transition-opacity hover:bg-background/15 disabled:opacity-30"
        >
          ↑
        </button>
        <span className="min-w-12 text-center tabular-nums" aria-live="polite">
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <button
          type="button"
          onClick={() => goTo(current + 1)}
          disabled={current === total - 1}
          aria-label="Volgende slide"
          className="grid size-8 place-items-center rounded-full transition-opacity hover:bg-background/15 disabled:opacity-30"
        >
          ↓
        </button>
      </nav>
    </div>
  )
}
