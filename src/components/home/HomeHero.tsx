'use client'

import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import type { Mockup } from '@/types'
import MockupCarousel from '@/components/home/MockupCarousel'
import HomeLoader from '@/components/home/HomeLoader'
import ScrollCue from '@/components/home/ScrollCue'

const HOLD_MS = 4000
// Keeps the loader from flashing by when everything is already cached
const MIN_LOADER_MS = 900
// The intro after the loader: a beat for it to fade, then the name and nav, then the devices fly in
// (with the scroll cue), then the carousel starts its round
const CHROME_AFTER_MS = 500
const DEVICES_AFTER_MS = 1100
const CAROUSEL_AFTER_MS = 2600

type Stage = 'loading' | 'chrome' | 'devices' | 'running'

export default function HomeHero({ mockups }: { mockups: Mockup[] }) {
  const [pos, setPos] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(true)
  const [stage, setStage] = useState<Stage>('loading')
  const onLoad = useCallback(() => setLoaded(true), [])

  useEffect(() => {
    if (!loaded) return
    let cancelled = false
    const minimum = new Promise((resolve) => setTimeout(resolve, Math.max(0, MIN_LOADER_MS - performance.now())))
    Promise.all([document.fonts.ready, minimum]).then(() => !cancelled && setReady(true))
    return () => {
      cancelled = true
    }
  }, [loaded])

  // Holds the header and command bar back (see .intro-chrome) until the intro brings them in
  useLayoutEffect(() => {
    const root = document.documentElement
    root.toggleAttribute('data-intro', stage === 'loading')
    return () => root.removeAttribute('data-intro')
  }, [stage])

  useEffect(() => {
    if (!ready) return
    const timers = [
      setTimeout(() => setStage('chrome'), CHROME_AFTER_MS),
      setTimeout(() => setStage('devices'), DEVICES_AFTER_MS),
      setTimeout(() => setStage('running'), CAROUSEL_AFTER_MS),
    ]
    return () => timers.forEach(clearTimeout)
  }, [ready])

  // A hidden tab stops drawing frames but not timers, so the carousel would pile up steps it never animated
  useEffect(() => {
    const onChange = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])

  // Keyed on pos, so a manual step also restarts the full hold; nothing moves until the intro is over
  useEffect(() => {
    if (stage !== 'running' || !visible) return
    const timer = setTimeout(() => setPos((p) => p + 1), HOLD_MS)
    return () => clearTimeout(timer)
  }, [pos, stage, visible])

  const devicesIn = stage === 'devices' || stage === 'running'

  return (
    <div className="relative flex h-svh flex-col">
      <HomeLoader loaded={loaded} done={ready} />
      <h1 className="sr-only">Gianni Mendonça Semedo</h1>
      <MockupCarousel
        mockups={mockups}
        pos={pos}
        onStep={(step) => setPos((p) => p + step)}
        onLoad={onLoad}
        entered={devicesIn}
      />
      <ScrollCue show={devicesIn} step={pos} />
    </div>
  )
}
