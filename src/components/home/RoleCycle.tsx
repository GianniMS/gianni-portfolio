'use client'

import { useEffect, useState } from 'react'

const ROLES = ['Developer', 'Designer', 'Analyst', 'Strategist']
const HOLD_MS = 4000
const FADE_MS = 800

// Cycles through the roles once the tiles have faded in, each held 4s before a 0.8s crossfade
export default function RoleCycle({
  startAfterMs,
  className = 'text-[clamp(2.5rem,7vw,6rem)]',
}: {
  startAfterMs: number
  className?: string
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const next = () => setIndex((i) => (i + 1) % ROLES.length)
    let interval: ReturnType<typeof setInterval> | undefined
    const start = setTimeout(() => {
      next()
      interval = setInterval(next, HOLD_MS + FADE_MS)
    }, startAfterMs)
    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [startAfterMs])

  return (
    <p className={`${className} leading-none tracking-tight`}>
      <span className="sr-only">{ROLES.join(', ')}</span>
      {/* Every role shares one grid cell, so the line never changes size as they swap */}
      <span aria-hidden className="grid justify-items-end md:justify-items-start">
        {ROLES.map((role, i) => (
          <span
            key={role}
            className={`col-start-1 row-start-1 transition-opacity duration-800 motion-reduce:transition-none ${i === index ? 'opacity-100' : 'opacity-0'}`}
          >
            {role}
          </span>
        ))}
      </span>
    </p>
  )
}
