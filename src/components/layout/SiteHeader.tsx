'use client'

import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import { easeInOut, GOO_AMP, GOO_OFFSET, gooMatrix } from '@/lib/goo'

const NAME = 'Gianni Mendonça Semedo'
const DURATION_MS = 1200
// The goo's blur peaks mid-way, so the letters run together while they move
const BLUR = 2.5

// Initials stay put; everything else collapses into them
const CHARS = [...NAME].map((char, i) => ({ char, keep: i === 0 || NAME[i - 1] === ' ' }))

// One line of type that morphs: at the top of the page it reads the full name; from the first
// scroll every letter but the initials narrows away and the initials close up into GMS, the
// whole word melting as it goes. It fades out at the end of the page.
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const filter = `goo-${useId().replace(/[^\w-]/g, '')}`
  const link = useRef<HTMLAnchorElement>(null)
  const chars = useRef<(HTMLSpanElement | null)[]>([])
  const blur = useRef<SVGFEGaussianBlurElement>(null)
  const alpha = useRef<SVGFEColorMatrixElement>(null)
  // 0 is the full name, 1 is GMS; kept across renders so a reversal carries on from where it is
  const progress = useRef(0)
  // Each letter's natural width in em
  const widths = useRef<number[]>([])

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 10)
    update()
    addEventListener('scroll', update, { passive: true })
    return () => removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    const el = link.current
    if (!el) return

    // Measured whenever the name is fully open, so the webfont and the current screen size count
    if (progress.current === 0) {
      const size = parseFloat(getComputedStyle(el).fontSize)
      widths.current = chars.current.map((span) => (span ? span.getBoundingClientRect().width / size : 0))
    }

    const draw = (p: number) => {
      const e = easeInOut(p)
      const wave = Math.sin(Math.PI * p)
      const melt = Math.min(1, wave * 3)
      el.style.setProperty('--morph', String(e))
      el.style.filter = p > 0 && p < 1 ? `url(#${filter})` : ''
      blur.current?.setAttribute('stdDeviation', String(BLUR * wave))
      alpha.current?.setAttribute('values', gooMatrix(1 + (GOO_AMP - 1) * melt, GOO_OFFSET * melt))
      CHARS.forEach(({ keep }, i) => {
        const span = chars.current[i]
        if (!span || keep) return
        span.style.width = p === 0 ? '' : `${widths.current[i] * (1 - e)}em`
        span.style.opacity = String(1 - e)
      })
    }

    const target = scrolled ? 1 : 0
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      progress.current = target
      draw(target)
      return
    }

    let frame = 0
    let last = performance.now()
    const step = (now: number) => {
      const delta = (now - last) / DURATION_MS
      last = now
      const p = progress.current
      progress.current = target > p ? Math.min(target, p + delta) : Math.max(target, p - delta)
      draw(progress.current)
      if (progress.current !== target) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [scrolled, filter])

  return (
    <header className="intro-chrome pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center p-4 transition-opacity duration-400 ease-linear footer:opacity-0 md:p-5 footer:[&>*]:pointer-events-none">
      <svg aria-hidden className="absolute size-0 overflow-hidden">
        <filter id={filter} x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
          <feGaussianBlur ref={blur} in="SourceGraphic" stdDeviation="0" result="blur" />
          <feColorMatrix ref={alpha} in="blur" type="matrix" values={gooMatrix(1, 0)} />
        </filter>
      </svg>
      {/* On phones the full name is sized to the screen and GMS to the usual size, so the size
          travels with the morph too */}
      <Link
        ref={link}
        href="/"
        aria-label="Gianni Mendonça Semedo, home"
        className="pointer-events-auto font-caslon text-[calc((1-var(--morph,0))*6.5vw+var(--morph,0)*2.25rem)] leading-none tracking-[-0.1em] whitespace-nowrap md:text-5xl"
      >
        {CHARS.map(({ char }, i) => (
          <span
            key={i}
            ref={(span) => {
              chars.current[i] = span
            }}
            aria-hidden
            className="inline-block"
          >
            {char === ' ' ? ' ' : char}
          </span>
        ))}
      </Link>
    </header>
  )
}
