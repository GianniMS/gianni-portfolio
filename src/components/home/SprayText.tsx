'use client'

import { useId, useRef } from 'react'
import useSprayTrigger from '@/lib/useSprayTrigger'

// By default drawn in a 200 × 300 box, the photo's 2:3 shape; the words are sized to it like the reference
const BOX = { width: 200, height: 300, fontSize: 54 }
// Painterz puts its baseline three quarters down a 1em line
const BASELINE = 0.75

// The words are sprayed on as one piece, revealed in one sweep, whenever half of them come on
// screen. Scrolling back up past them runs the sweep in reverse; carrying on down keeps them.
// Painterz draws its capitals clean and its lowercase letters dripping, so the words come in
// alternating case to get the drips. `delay` (ms) holds the sweep back, e.g. until text under it has arrived;
// `duration` (ms) slows or speeds it.
export default function SprayText({
  words,
  box = BOX,
  delay,
  duration,
}: {
  words: string[]
  box?: typeof BOX
  delay?: number
  duration?: number
}) {
  const ref = useRef<SVGSVGElement>(null)
  // useId can contain characters that break a url(#…) reference
  const mask = `spray-${useId().replace(/[^\w-]/g, '')}`
  const spray = useSprayTrigger(ref)
  const { width: WIDTH, height: HEIGHT, fontSize: FONT_SIZE } = box

  const gap = (HEIGHT - words.length * FONT_SIZE) / (words.length + 1)

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      data-spray={spray}
      role="img"
      aria-label={words.map((w) => w.toLowerCase()).join(', ')}
      className="pointer-events-none absolute inset-0 size-full overflow-visible text-spray"
    >
      <mask id={mask} maskUnits="userSpaceOnUse" x={-WIDTH / 2} y={-HEIGHT / 5} width={WIDTH * 2} height={HEIGHT * 1.4}>
        {/* A tilted band, starting above the words and ending past them */}
        <rect
          x={-WIDTH}
          y={-545}
          width={WIDTH * 3}
          height={500}
          className="spray-sweep"
          style={{
            animationDelay: delay ? `${delay}ms` : undefined,
            animationDuration: duration ? `${duration}ms` : undefined,
          }}
        />
      </mask>
      <g mask={`url(#${mask})`} fill="currentColor" textAnchor="middle" fontSize={FONT_SIZE} className="font-painterz">
        {words.map((word, i) => (
          <text key={word} x={WIDTH / 2} y={gap + i * (FONT_SIZE + gap) + FONT_SIZE * BASELINE}>
            {word}
          </text>
        ))}
      </g>
    </svg>
  )
}
