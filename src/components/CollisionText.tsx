'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { useImageBounds } from '@/context/ImageBoundsContext'

type Rect = { top: number; left: number; bottom: number; right: number }

function rectsOverlap(a: Rect, b: Rect) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
}

function sampleLuminance(imgEl: HTMLImageElement, textRect: Rect, imgRect: Rect): number {
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

    const sx = Math.max(0, (textRect.left - imgRect.left) * scaleX)
    const sy = Math.max(0, (textRect.top - imgRect.top) * scaleY)
    const sw = Math.min(naturalW - sx, (textRect.right - textRect.left) * scaleX)
    const sh = Math.min(naturalH - sy, (textRect.bottom - textRect.top) * scaleY)

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

export default function CollisionText({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)
  const { heroBounds, previewBounds } = useImageBounds()
  const [color, setColor] = useState<string>('var(--color-foreground)')

  useEffect(() => {
    if (!ref.current) return

    const r = ref.current.getBoundingClientRect()
    const textRect: Rect = { top: r.top, left: r.left, bottom: r.bottom, right: r.right }

    const hitsHero = heroBounds && rectsOverlap(textRect, heroBounds)
    const hitsPreview = previewBounds && rectsOverlap(textRect, previewBounds)

    if (!hitsHero && !hitsPreview) {
      setColor('var(--color-foreground)')
      return
    }

    const activeBounds = hitsPreview ? previewBounds : heroBounds!
    const selector = hitsPreview ? 'img[data-preview]' : 'img[data-hero]'
    const imgEl = document.querySelector<HTMLImageElement>(selector)

    if (!imgEl) {
      setColor('var(--color-background)')
      return
    }

    const luminance = sampleLuminance(imgEl, textRect, activeBounds)
    setColor(luminance > 0.5 ? 'var(--color-blue)' : 'var(--color-background)')
  }, [heroBounds, previewBounds])

  return (
    <span ref={ref} style={{ color }}>
      {children}
    </span>
  )
}
