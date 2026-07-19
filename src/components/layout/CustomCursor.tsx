'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { motion } from 'framer-motion'
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

const SIZE = 16
const EASE = 0.15
const HOVER_SCALE = 2.0

function subscribeToPointerQuery(callback: () => void) {
  const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

function getPointerQuerySnapshot() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

function getPointerQueryServerSnapshot() {
  return false
}

export default function CustomCursor() {
  const { heroBounds, previewBounds } = useImageBounds()
  const { setCursorState } = useCursor()
  const boundsRef = useRef({ heroBounds, previewBounds })
  const isPointerRef = useRef(false)

  const enabled = useSyncExternalStore(
    subscribeToPointerQuery,
    getPointerQuerySnapshot,
    getPointerQueryServerSnapshot
  )
  const [overlay, setOverlay] = useState<{ color: string; clipPath: string } | null>(null)
  const [isPointer, setIsPointer] = useState(false)

  const elRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef({ x: -100, y: -100 })
  const displayRef = useRef({ x: -100, y: -100 })

  useEffect(() => {
    boundsRef.current = { heroBounds, previewBounds }
  }, [heroBounds, previewBounds])

  useEffect(() => {
    if (!enabled) return

    const half = SIZE / 2

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      const target = document.elementFromPoint(e.clientX, e.clientY)
      const pointer = !!target && getComputedStyle(target).cursor === 'pointer'
      isPointerRef.current = pointer
      setIsPointer(pointer)
    }
    window.addEventListener('mousemove', onMove)

    let frame: number
    const tick = () => {
      const target = targetRef.current
      const display = displayRef.current
      display.x += (target.x - display.x) * EASE
      display.y += (target.y - display.y) * EASE

      if (elRef.current) {
        elRef.current.style.transform = `translate(${display.x - half}px, ${display.y - half}px)`
      }

      const effectiveHalf = isPointerRef.current ? half * HOVER_SCALE : half
      const cursorRect: Rect = {
        top: display.y - effectiveHalf,
        left: display.x - effectiveHalf,
        bottom: display.y + effectiveHalf,
        right: display.x + effectiveHalf,
      }

      const { heroBounds, previewBounds } = boundsRef.current
      const heroHit = heroBounds && intersect(cursorRect, heroBounds)
      const previewHit = previewBounds && intersect(cursorRect, previewBounds)
      const hit = previewHit || heroHit

      if (!hit) {
        setOverlay(null)
        setCursorState(cursorRect, null)
      } else {
        const activeBounds = previewHit ? previewBounds! : heroBounds!
        const selector = previewHit ? 'img[data-preview]' : 'img[data-hero]'
        const imgEl = Array.from(document.querySelectorAll<HTMLImageElement>(selector)).find(
          (el) => el.offsetParent !== null
        )

        if (!imgEl || !imgEl.complete) {
          setOverlay(null)
          setCursorState(cursorRect, null)
        } else {
          const luminance = sampleLuminance(imgEl, activeBounds, activeBounds)
          const isLight = luminance > 0.5
          const color = isLight ? 'var(--color-foreground)' : 'var(--color-background)'
          const w = cursorRect.right - cursorRect.left
          const h = cursorRect.bottom - cursorRect.top
          const topPct = ((hit.top - cursorRect.top) / h) * 100
          const rightPct = ((cursorRect.right - hit.right) / w) * 100
          const bottomPct = ((cursorRect.bottom - hit.bottom) / h) * 100
          const leftPct = ((hit.left - cursorRect.left) / w) * 100
          const clipPath = `inset(${topPct}% ${rightPct}% ${bottomPct}% ${leftPct}%)`
          setOverlay({ color, clipPath })
          setCursorState(cursorRect, { rect: hit, color: isLight ? 'black' : 'white' })
        }
      }

      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [enabled, setCursorState])

  if (!enabled) return null

  return (
    <div ref={elRef} className="fixed top-0 left-0 z-[8] pointer-events-none" style={{ width: SIZE, height: SIZE }}>
      <motion.div
        className="absolute inset-0 bg-blue"
        animate={{ scale: isPointer ? 2.0 : 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
      />
      {overlay && (
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: overlay.color, clipPath: overlay.clipPath }}
          animate={{ scale: isPointer ? 2.0 : 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        />
      )}
    </div>
  )
}
