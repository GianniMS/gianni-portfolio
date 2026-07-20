'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useImageBounds } from '@/context/ImageBoundsContext'
import { Rect, intersect, sampleLuminance, findVisibleImage } from '@/lib/collision'

export default function CollisionBar({
  className,
  animate,
}: {
  className: string
  animate: { rotate: number; y: number }
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const { heroBounds, previewBounds } = useImageBounds()
  const [overlay, setOverlay] = useState<{ color: string; clipPath: string } | null>(null)

  useEffect(() => {
    const update = () => {
      if (!ref.current) return

      const r = ref.current.getBoundingClientRect()
      const barRect: Rect = { top: r.top, left: r.left, bottom: r.bottom, right: r.right }

      const heroHit = heroBounds && intersect(barRect, heroBounds)
      const previewHit = previewBounds && intersect(barRect, previewBounds)
      const hit = previewHit || heroHit

      if (!hit) {
        setOverlay(null)
        return
      }

      const clipPath = `inset(${hit.top - barRect.top}px ${barRect.right - hit.right}px ${barRect.bottom - hit.bottom}px ${hit.left - barRect.left}px)`
      const activeBounds = previewHit ? previewBounds! : heroBounds!
      const selector = previewHit ? 'img[data-preview]' : 'img[data-hero]'
      const imgEl = findVisibleImage(selector)

      if (!imgEl) {
        setOverlay(null)
        return
      }

      if (!imgEl.complete) {
        imgEl.addEventListener('load', update, { once: true })
        return
      }

      const luminance = sampleLuminance(imgEl, hit, activeBounds)
      const color = luminance > 0.5 ? 'var(--color-blue)' : 'var(--color-background)'

      setOverlay({ color, clipPath })
    }

    const onScrollOrResize = () => {
      update()
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScrollOrResize, true)
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [heroBounds, previewBounds])

  return (
    <motion.span ref={ref} className={`${className} bg-foreground`} animate={animate}>
      {overlay && (
        <span
          aria-hidden
          className="absolute inset-0"
          style={{ backgroundColor: overlay.color, clipPath: overlay.clipPath }}
        />
      )}
    </motion.span>
  )
}
