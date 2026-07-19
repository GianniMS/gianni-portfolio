'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { useImageBounds } from '@/context/ImageBoundsContext'
import { useCursor } from '@/context/CursorContext'

type Rect = { top: number; left: number; bottom: number; right: number }

function intersect(a: Rect, b: Rect): Rect | null {
  const top = Math.max(a.top, b.top)
  const left = Math.max(a.left, b.left)
  const bottom = Math.min(a.bottom, b.bottom)
  const right = Math.min(a.right, b.right)
  if (left >= right || top >= bottom) return null
  return { top, left, bottom, right }
}

function sampleLuminance(imgEl: HTMLImageElement, hitRect: Rect, imgRect: Rect): number {
  try {
    const canvas = document.createElement('canvas')
    const naturalW = imgEl.naturalWidth
    const naturalH = imgEl.naturalHeight
    if (!naturalW || !naturalH) return 0.5

    canvas.width = naturalW
    canvas.height = naturalH
    const ctx = canvas.getContext('2d')
    if (!ctx) return 0.5
    ctx.drawImage(imgEl, 0, 0, naturalW, naturalH)

    const scaleX = naturalW / (imgRect.right - imgRect.left)
    const scaleY = naturalH / (imgRect.bottom - imgRect.top)

    const sx = Math.max(0, (hitRect.left - imgRect.left) * scaleX)
    const sy = Math.max(0, (hitRect.top - imgRect.top) * scaleY)
    const sw = Math.min(naturalW - sx, (hitRect.right - hitRect.left) * scaleX)
    const sh = Math.min(naturalH - sy, (hitRect.bottom - hitRect.top) * scaleY)

    if (sw <= 0 || sh <= 0) return 0.5

    const data = ctx.getImageData(sx, sy, sw, sh).data
    let luminanceSum = 0
    const pixelCount = data.length / 4
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i] / 255
      const g = data[i + 1] / 255
      const b = data[i + 2] / 255
      luminanceSum += 0.2126 * r + 0.7152 * g + 0.0722 * b
    }
    return pixelCount > 0 ? luminanceSum / pixelCount : 0.5
  } catch {
    return 0.5
  }
}

export default function CollisionText({
  children,
  crossColor,
  underline = false,
}: {
  children: ReactNode
  crossColor?: string
  underline?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const { heroBounds, previewBounds } = useImageBounds()
  const { cursorRect, cursorImageHit } = useCursor()
  const [overlay, setOverlay] = useState<{ color: string; clipPath: string } | null>(null)
  const [cursorBlueOverlay, setCursorBlueOverlay] = useState<{ color: string; clipPath: string } | null>(null)
  const [cursorImageOverlay, setCursorImageOverlay] = useState<{ color: string; clipPath: string } | null>(null)

  useEffect(() => {
    const update = () => {
      if (!ref.current) return

      const r = ref.current.getBoundingClientRect()
      const textRect: Rect = { top: r.top, left: r.left, bottom: r.bottom, right: r.right }

      const heroHit = heroBounds && intersect(textRect, heroBounds)
      const previewHit = previewBounds && intersect(textRect, previewBounds)
      const hit = previewHit || heroHit

      if (!hit) {
        setOverlay(null)
        return
      }

      const clipPath = `inset(${hit.top - textRect.top}px ${textRect.right - hit.right}px ${textRect.bottom - hit.bottom}px ${hit.left - textRect.left}px)`

      if (crossColor) {
        setOverlay({ color: crossColor, clipPath })
        return
      }

      const activeBounds = previewHit ? previewBounds! : heroBounds!
      const selector = previewHit ? 'img[data-preview]' : 'img[data-hero]'
      const imgEl = Array.from(document.querySelectorAll<HTMLImageElement>(selector)).find(
        (el) => el.offsetParent !== null
      )

      if (!imgEl) {
        setOverlay(null)
        return
      }

      if (!imgEl.complete) {
        imgEl.addEventListener('load', update, { once: true })
        return
      }

      const luminance = sampleLuminance(imgEl, activeBounds, activeBounds)
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
  }, [heroBounds, previewBounds, crossColor])

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
