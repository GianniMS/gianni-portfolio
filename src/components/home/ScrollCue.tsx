'use client'

import { useEffect, useState } from 'react'

// A quiet hint at the right edge of the hero that there's more below: "Scroll" set sideways over a
// thin line with a dash running down it each time the carousel steps (keyed on its position, so it
// restarts in time with the slide). It shows once the loader has gone and leaves at the first scroll.
export default function ScrollCue({ show, step }: { show: boolean; step: number }) {
  const [scrolled, setScrolled] = useState(false)
  // The intro's first appearance only; once the page has been scrolled it comes and goes at once
  const [intro, setIntro] = useState(true)

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 10)
      if (window.scrollY > 10) setIntro(false)
    }
    update()
    addEventListener('scroll', update, { passive: true })
    return () => removeEventListener('scroll', update)
  }, [])

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute right-3 bottom-24 z-20 flex flex-col items-center gap-3 font-sf transition-opacity duration-700 md:right-[3vw] md:bottom-12 ${
        show && !scrolled ? 'opacity-100' : 'opacity-0'
      } ${
        // On a phone it waits until the one device in view is nearly in place (it lands at about 1.3s),
        // so its fade finishes as the device settles; on desktop it comes in as the row starts flying
        show && intro ? 'max-md:delay-[900ms]' : ''
      }`}
    >
      <span className="text-[10px] tracking-[0.3em] uppercase [writing-mode:vertical-rl]">Scroll</span>
      <span className="relative h-12 w-px overflow-hidden bg-foreground/15">
        <span key={step} className="absolute top-0 left-0 h-5 w-px animate-scroll-cue bg-foreground motion-reduce:animate-none" />
      </span>
    </div>
  )
}
