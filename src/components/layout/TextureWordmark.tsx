'use client'

import { useId, useLayoutEffect, useRef, useState } from 'react'

const FONT_SIZE = 100
const TRACKING = -0.1

// Softens the texture a little, in viewBox units (the word is set at FONT_SIZE)
const TEXTURE_BLUR = 0.6

type Box = { x: number; y: number; width: number; height: number }

// The wordmark filled with a photo texture, slightly blurred (the letters' own edges stay sharp, as
// the blur happens before they cut it out).
// The SVG's box is fitted to the letters' ink (measured on a canvas, since an SVG text box includes
// side bearings and the font's ascent and descent), so the word runs exactly edge to edge and its
// lowest point sits exactly on the bottom.
export default function TextureWordmark({
  text,
  texture,
  textureOpacity = 1,
}: {
  text: string
  texture: string
  textureOpacity?: number
}) {
  const ref = useRef<SVGTextElement>(null)
  const [box, setBox] = useState<Box | null>(null)
  const id = useId().replace(/[^\w-]/g, '')

  useLayoutEffect(() => {
    const fit = () => {
      const el = ref.current
      const ctx = document.createElement('canvas').getContext('2d')
      if (!el || !ctx) return
      ctx.font = `${FONT_SIZE}px ${getComputedStyle(el).fontFamily}`
      ctx.letterSpacing = `${FONT_SIZE * TRACKING}px`
      const m = ctx.measureText(text)
      setBox({
        x: -m.actualBoundingBoxLeft,
        y: -m.actualBoundingBoxAscent,
        width: m.actualBoundingBoxLeft + m.actualBoundingBoxRight,
        height: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent,
      })
    }
    fit()
    document.fonts.ready.then(fit)
  }, [text])

  return (
    <svg
      aria-hidden
      viewBox={box ? `${box.x} ${box.y} ${box.width} ${box.height}` : '0 0 100 40'}
      // Without an explicit ratio the SVG stretches to its flex row's height and letterboxes the word
      style={{ aspectRatio: box ? `${box.width} / ${box.height}` : '5 / 2' }}
      className={`block h-auto w-full shrink-0 select-none ${box ? '' : 'opacity-0'}`}
    >
      <defs>
        <clipPath id={`letters-${id}`}>
          <text fontSize={FONT_SIZE} letterSpacing={FONT_SIZE * TRACKING} className="font-caslon">
            {text}
          </text>
        </clipPath>
        <filter id={`soft-${id}`}>
          <feGaussianBlur stdDeviation={TEXTURE_BLUR} />
        </filter>
      </defs>
      {box && (
        // The letters clip a group, so the texture can drift inside them while they stay put
        <g clipPath={`url(#letters-${id})`}>
          <image
            href={texture}
            opacity={textureOpacity}
            // Overhangs the letters well past their edges, so neither the blur nor the drift ever
            // shows an edge of the texture
            x={box.x - box.width * 0.2}
            y={box.y - box.height * 0.2}
            width={box.width * 1.4}
            height={box.height * 1.4}
            preserveAspectRatio="xMidYMid slice"
            filter={`url(#soft-${id})`}
            className="texture-drift"
          />
        </g>
      )}
      <text
        ref={ref}
        // Only here to be measured; the texture is what shows
        fill="none"
        fontSize={FONT_SIZE}
        letterSpacing={FONT_SIZE * TRACKING}
        className="font-caslon"
      >
        {text}
      </text>
    </svg>
  )
}
