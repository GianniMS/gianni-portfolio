'use client'

import { useEffect, useRef, type ComponentProps } from 'react'

// A section counts as on screen once its top has climbed this far up the viewport, and off
// again once its bottom has too, so the swap happens mid-screen in both directions
const EDGE = 0.4

// Flags the whole page (data-<flag> on <html>) while this section holds the screen, so anything
// can restyle itself for it: `dark` eases the page to its dark theme (AKQA style), `footer` moves
// the header and command bar into their end-of-page positions
export default function FlagSection({ flag, ...props }: { flag: 'dark' | 'footer' } & ComponentProps<'section'>) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const root = document.documentElement
    const name = `data-${flag}`
    const update = () => {
      const { top, bottom } = el.getBoundingClientRect()
      root.toggleAttribute(name, top < innerHeight * (1 - EDGE) && bottom > innerHeight * (1 - EDGE))
    }
    update()
    addEventListener('scroll', update, { passive: true })
    addEventListener('resize', update)
    return () => {
      removeEventListener('scroll', update)
      removeEventListener('resize', update)
      root.removeAttribute(name)
    }
  }, [flag])

  return <section ref={ref} {...props} />
}
