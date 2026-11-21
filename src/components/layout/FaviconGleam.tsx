'use client'

import { useEffect } from 'react'

const SIZE = 64
const RADIUS = 14
const RIM = 3
// One pulse per side: the light swells in, glides along the side and fades out before the next
const SIDE_MS = 1400
// How far the light reaches along the rim either side of its centre; wide and soft, so each
// frame's step is small next to it and the light reads as gliding
const GLOW = 34
const COLOR = '255, 254, 252'

// Clockwise, each from one corner to the next
const SIDES: [number, number, number, number][] = [
  [RADIUS, RIM / 2, SIZE - RADIUS, RIM / 2],
  [SIZE - RIM / 2, RADIUS, SIZE - RIM / 2, SIZE - RADIUS],
  [SIZE - RADIUS, SIZE - RIM / 2, RADIUS, SIZE - RIM / 2],
  [RIM / 2, SIZE - RADIUS, RIM / 2, RADIUS],
]

// The tab icon: a black square whose rim lights up like the command bar's, a pulse of light
// running along one side at a time. Chrome and Safari show SVG favicons as a still image, so it is
// drawn on a canvas and swapped into the tab icon.
export default function FaviconGleam() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = SIZE
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Browsers hold on to the icon they picked from the page's own links, so those are set aside and
    // one link of our own is updated instead. Next streams its icon links in after hydration (and
    // React may restore them), so they're set aside again on every frame; they come back on unmount.
    const icon = document.createElement('link')
    icon.rel = 'icon'
    icon.type = 'image/png'
    document.head.appendChild(icon)
    const statics = new Set<HTMLLinkElement>()
    const setAside = () =>
      document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]').forEach((link) => {
        if (link === icon) return
        link.rel = 'icon-static'
        statics.add(link)
      })

    const rim = () => {
      ctx.beginPath()
      ctx.roundRect(RIM / 2, RIM / 2, SIZE - RIM, SIZE - RIM, RADIUS - RIM / 2)
    }

    const draw = (now: number) => {
      const side = Math.floor(now / SIDE_MS) % SIDES.length
      const p = (now % SIDE_MS) / SIDE_MS
      const [x1, y1, x2, y2] = SIDES[side]
      // Even speed along the side (easing made the middle rush), with a soft swell in and out
      const x = x1 + (x2 - x1) * p
      const y = y1 + (y2 - y1) * p
      const strength = Math.sin(Math.PI * p) ** 2

      ctx.clearRect(0, 0, SIZE, SIZE)
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.roundRect(0, 0, SIZE, SIZE, RADIUS)
      ctx.fill()
      ctx.lineWidth = RIM
      ctx.strokeStyle = `rgba(${COLOR}, 0.16)`
      rim()
      ctx.stroke()
      const light = ctx.createRadialGradient(x, y, 0, x, y, GLOW)
      light.addColorStop(0, `rgba(${COLOR}, ${strength})`)
      light.addColorStop(1, `rgba(${COLOR}, 0)`)
      ctx.strokeStyle = light
      rim()
      ctx.stroke()

      setAside()
      icon.href = canvas.toDataURL('image/png')
    }

    // Every display frame
    let frame = 0
    const loop = (now: number) => {
      draw(now)
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(frame)
      icon.remove()
      statics.forEach((link) => (link.rel = 'icon'))
    }
  }, [])

  return null
}
