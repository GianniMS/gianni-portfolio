'use client'

import { useEffect } from 'react'
import { useProgress } from '@react-three/drei'

// Covers the hero from the very first paint (it's server rendered), so nothing half-loaded ever shows
export default function HomeLoader({ loaded, done }: { loaded: boolean; done: boolean }) {
  const { progress } = useProgress()

  // Lets anything animating further down the page hold off until it can actually be seen
  useEffect(() => {
    document.documentElement.toggleAttribute('data-loading', !done)
    return () => document.documentElement.removeAttribute('data-loading')
  }, [done])

  return (
    <div
      role="status"
      aria-label="Loading"
      aria-hidden={done}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-700 ease-out ${
        done ? 'pointer-events-none opacity-0' : ''
      }`}
    >
      <span className="relative h-px w-28 overflow-hidden bg-foreground/10">
        <span
          className="absolute inset-y-0 left-0 bg-foreground transition-[width] duration-500 ease-out"
          style={{ width: `${loaded ? 100 : progress}%` }}
        />
      </span>
    </div>
  )
}
