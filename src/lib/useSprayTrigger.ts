'use client'

import { useEffect, useState, type RefObject } from 'react'

export type SprayState = 'idle' | 'on' | 'off'

// 'on' once half of the element is on screen, or, given `line`, once its top has risen past that
// fraction of the screen from the bottom; scrolling back up under it turns it 'off' (so it can play
// its reveal in reverse), carrying on down past it leaves it on. 'idle' until first seen.
export default function useSprayTrigger(ref: RefObject<Element | null>, line?: number) {
  const [state, setState] = useState<SprayState>('idle')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) =>
        setState((was) => {
          if (entry.isIntersecting || (was === 'on' && entry.boundingClientRect.top < 0)) return 'on'
          return was === 'idle' ? 'idle' : 'off'
        }),
      line === undefined ? { threshold: 0.5 } : { rootMargin: `0px 0px -${line * 100}% 0px` }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, line])

  return state
}
