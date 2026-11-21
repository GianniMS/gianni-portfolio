'use client'

import { useEffect, useId, useLayoutEffect, useRef, type ReactNode } from 'react'
import { easeOut, GOO_AMP, GOO_OFFSET, gooMatrix } from '@/lib/goo'
import useSprayTrigger from '@/lib/useSprayTrigger'

const DURATION_MS = 1200
// Heavy enough that the type starts as nothing and hardens out of the haze
const BLUR = 20
// The last part of the reveal eases the hardening curve away, leaving plain crisp type
const SETTLE = 0.35
const TRIGGER_LINE = 0.25
// A beat before melting in, so it follows the spray rather than racing it; going back out is immediate
const DELAY_MS = 400

// Melts its content in once its top is a quarter of the way up the screen (wherever the text sits,
// beside the photo or below it on phones), and back out, the same effect in reverse, when
// scrolled back up under that line
export default function GooReveal({
  children,
  className,
  play = 'scroll',
}: {
  children: ReactNode
  className?: string
  // 'load' melts in as soon as the page shows, once, instead of following the scroll
  play?: 'scroll' | 'load'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const blur = useRef<SVGFEGaussianBlurElement>(null)
  const alpha = useRef<SVGFEColorMatrixElement>(null)
  // 0 is gone, 1 is fully in; kept across renders so turning round mid-way carries on from there
  const progress = useRef(0)
  const filter = `goo-reveal-${useId().replace(/[^\w-]/g, '')}`
  // Triggered by the heading rather than the whole block, so a block stretched taller than its text
  // (the one beside the photo) fires when its text arrives, the same as any other
  const trigger = useRef<Element | null>(null)
  useLayoutEffect(() => {
    trigger.current = ref.current?.querySelector('h1, h2, h3') ?? ref.current
  }, [])
  const scrolled = useSprayTrigger(trigger, TRIGGER_LINE)
  const state = play === 'load' ? 'on' : scrolled

  useEffect(() => {
    const el = ref.current
    if (!el || state === 'idle') return
    const target = state === 'on' ? 1 : 0

    const draw = (p: number) => {
      const q = Math.max(0, (p - (1 - SETTLE)) / SETTLE)
      el.style.opacity = p === 0 ? '0' : '1'
      el.style.filter = p === 0 || p === 1 ? '' : `url(#${filter})`
      blur.current?.setAttribute('stdDeviation', String(BLUR * (1 - easeOut(p))))
      alpha.current?.setAttribute('values', gooMatrix(GOO_AMP + (1 - GOO_AMP) * q, GOO_OFFSET * (1 - q)))
    }

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      progress.current = target
      draw(target)
      return
    }

    let frame = 0
    let timer = 0
    let last = 0
    const step = (now: number) => {
      const delta = last ? (now - last) / DURATION_MS : 0
      last = now
      const p = progress.current
      progress.current = target > p ? Math.min(target, p + delta) : Math.max(target, p - delta)
      draw(progress.current)
      if (progress.current !== target) frame = requestAnimationFrame(step)
    }
    const begin = () => {
      timer = window.setTimeout(() => (frame = requestAnimationFrame(step)), target === 1 ? DELAY_MS : 0)
    }

    // Like the spray, it holds off while the home loader still covers the page
    const root = document.documentElement
    if (!root.hasAttribute('data-loading')) {
      begin()
      return () => {
        clearTimeout(timer)
        cancelAnimationFrame(frame)
      }
    }
    const observer = new MutationObserver(() => {
      if (root.hasAttribute('data-loading')) return
      observer.disconnect()
      begin()
    })
    observer.observe(root, { attributeFilter: ['data-loading'] })
    return () => {
      observer.disconnect()
      clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [state, filter])

  return (
    <div ref={ref} style={{ opacity: 0 }} className={className}>
      <svg aria-hidden className="absolute size-0 overflow-hidden">
        {/* Tall, because content may hang below the box (the paragraph under the title) */}
        <filter id={filter} x="-25%" y="-25%" width="150%" height="200%" colorInterpolationFilters="sRGB">
          <feGaussianBlur ref={blur} in="SourceGraphic" stdDeviation={BLUR} result="blur" />
          <feColorMatrix ref={alpha} in="blur" type="matrix" values={gooMatrix(GOO_AMP, GOO_OFFSET)} />
        </filter>
      </svg>
      {children}
    </div>
  )
}
