'use client'

import { useId, useRef } from 'react'
import useSprayTrigger from '@/lib/useSprayTrigger'

// Drawn in a 200 × 300 box, the photo's 2:3 shape; the words are sized to it like the reference
const WIDTH = 200
const HEIGHT = 300
const FONT_SIZE = 54
// Painterz puts its baseline three quarters down a 1em line
const BASELINE = 0.75

// The words are sprayed on as one piece, revealed in one sweep, whenever half of them come on
// screen. Scrolling back up past them runs the sweep in reverse; carrying on down keeps them.
// Painterz draws its capitals clean and its lowercase letters dripping, so the words come in
// alternating case to get the drips.
export default function SprayText({ words }: { words: string[] }) {
  const ref = useRef<SVGSVGElement>(null)
  // useId can contain characters that break a url(#…) reference
  const mask = `spray-${useId().replace(/[^\w-]/g, '')}`
  const spray = useSprayTrigger(ref)

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
        <rect x={-200} y={-545} width={600} height={500} className="spray-sweep" />
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
