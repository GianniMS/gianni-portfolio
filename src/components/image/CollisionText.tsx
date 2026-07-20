'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { useImageBounds } from '@/context/ImageBoundsContext'
import { useCursor } from '@/context/CursorContext'
import { Rect, intersect, findVisibleImage } from '@/lib/collision'

export default function CollisionText({
  children,
  crossColor,
  underline = false,
  imageCollision = true,
  listCollision = false,
}: {
  children: ReactNode
  crossColor?: string
  underline?: boolean
  imageCollision?: boolean
  listCollision?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const { heroBounds, previewBounds, listBounds } = useImageBounds()
  const { cursorRect, cursorImageHit } = useCursor()
  const [overlay, setOverlay] = useState<{ color: string; clipPath: string } | null>(null)
  const [cursorBlueOverlay, setCursorBlueOverlay] = useState<{ color: string; clipPath: string } | null>(null)
  const [cursorImageOverlay, setCursorImageOverlay] = useState<{ color: string; clipPath: string } | null>(null)

  useEffect(() => {
    const update = () => {
      if (!ref.current) return

      if (!imageCollision && !listCollision) {
        setOverlay(null)
        return
      }

      const r = ref.current.getBoundingClientRect()
      const textRect: Rect = { top: r.top, left: r.left, bottom: r.bottom, right: r.right }

      const heroHit = imageCollision && heroBounds && intersect(textRect, heroBounds)
      const previewHit = imageCollision && previewBounds && intersect(textRect, previewBounds)
      const listHit = listCollision && listBounds && intersect(textRect, listBounds)
      const hit = previewHit || heroHit || listHit

      if (!hit) {
        setOverlay(null)
        return
      }

      const clipPath = `inset(${hit.top - textRect.top}px ${textRect.right - hit.right}px ${textRect.bottom - hit.bottom}px ${hit.left - textRect.left}px)`

      if (crossColor) {
        setOverlay({ color: crossColor, clipPath })
        return
      }

      if (!heroHit && !previewHit) {
        setOverlay(null)
        return
      }

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

      setOverlay({ color: 'var(--color-background)', clipPath })
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
  }, [heroBounds, previewBounds, listBounds, crossColor, imageCollision, listCollision])

  useEffect(() => {
    if (!ref.current || !cursorRect) {
      setCursorBlueOverlay(null)
      setCursorImageOverlay(null)
      return
    }

    const r = ref.current.getBoundingClientRect()
    const textRect: Rect = { top: r.top, left: r.left, bottom: r.bottom, right: r.right }
    const hit = intersect(textRect, cursorRect)

    if (!hit) {
      setCursorBlueOverlay(null)
      setCursorImageOverlay(null)
      return
    }

    const clipPath = `inset(${hit.top - textRect.top}px ${textRect.right - hit.right}px ${textRect.bottom - hit.bottom}px ${hit.left - textRect.left}px)`
    setCursorBlueOverlay({ color: 'var(--color-background)', clipPath })

    const imageHit = cursorImageHit && intersect(textRect, cursorImageHit.rect)
    if (!imageHit) {
      setCursorImageOverlay(null)
      return
    }

    const imageClipPath = `inset(${imageHit.top - textRect.top}px ${textRect.right - imageHit.right}px ${textRect.bottom - imageHit.bottom}px ${imageHit.left - textRect.left}px)`
    const imageColor = cursorImageHit.color === 'white' ? 'var(--color-foreground)' : 'var(--color-background)'
    setCursorImageOverlay({ color: imageColor, clipPath: imageClipPath })
  }, [cursorRect, cursorImageHit])

  const textDecoration = underline ? 'underline' : undefined

  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-block', textDecoration }}>
      {children}
      {overlay && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            color: overlay.color,
            clipPath: overlay.clipPath,
            pointerEvents: 'none',
            textDecoration,
          }}
        >
          {children}
        </span>
      )}
      {cursorBlueOverlay && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 9,
            color: cursorBlueOverlay.color,
            clipPath: cursorBlueOverlay.clipPath,
            pointerEvents: 'none',
            textDecoration,
          }}
        >
          {children}
        </span>
      )}
      {cursorImageOverlay && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 9,
            color: cursorImageOverlay.color,
            clipPath: cursorImageOverlay.clipPath,
            pointerEvents: 'none',
            textDecoration,
          }}
        >
          {children}
        </span>
      )}
    </span>
  )
}
