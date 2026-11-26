'use client'

import { Children, createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { deckLabels } from '@/data/introduction'
import type { Lang, Localized } from '@/types'

const NEXT = ['ArrowDown', 'ArrowRight', 'PageDown', ' ']
const PREV = ['ArrowUp', 'ArrowLeft', 'PageUp']
const LANGS: Lang[] = ['nl', 'en']

const LangContext = createContext<Lang>('nl')

// Reads the deck's current language, so slides can stay server components that just place these
export function T({ text }: { text: Localized }) {
  const lang = useContext(LangContext)
  // Keyed on the language, so a switch fades the new words in instead of swapping them hard
  return (
    <span key={lang} className="animate-fade-in">
      {text[lang]}
    </span>
  )
}

export function SlideFrame({ children }: { children: ReactNode }) {
  return (
    <section className="flex min-h-svh snap-start flex-col justify-center px-5 pt-14 pb-24 md:px-[6vw] md:py-24">
      {children}
    </section>
  )
}

const BUTTON = 'grid size-8 place-items-center rounded-full transition-opacity hover:bg-background/15 disabled:opacity-30'

// Full-screen slides that snap as you scroll or swipe; arrows, space and page keys step through
// them like a presentation
export default function Deck({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [lang, setLang] = useState<Lang>('nl')
  // The deck waits behind a Start button, so the cover melts in when the presentation begins
  const [started, setStarted] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  // iPhone Safari has no Fullscreen API, so the button would do nothing there
  const [canFullscreen, setCanFullscreen] = useState(false)
  const total = Children.count(children)

  const goTo = useCallback(
    (index: number) => {
      ref.current?.children[Math.max(0, Math.min(total - 1, index))]?.scrollIntoView({ behavior: 'smooth' })
    },
    [total],
  )

  // Read from the scroll position rather than an IntersectionObserver: its first report after a reload
  // could land on the wrong slide, and a slide taller than two screens never reaches its threshold
  useEffect(() => {
    const root = ref.current
    if (!root || !started) return
    let frame = 0
    const update = () => {
      frame = 0
      const middle = root.scrollTop + root.clientHeight / 2
      const slides = Array.from(root.children) as HTMLElement[]
      const index = slides.findLastIndex((slide) => slide.offsetTop <= middle)
      setCurrent(Math.max(0, index))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    root.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      root.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [total, started])

  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement))
    onChange()
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  useEffect(() => {
    if (!started) return
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target =
        NEXT.includes(e.key) ? current + 1
        : PREV.includes(e.key) ? current - 1
        : e.key === 'Home' ? 0
        : e.key === 'End' ? total - 1
        : null
      if (target === null) return
      e.preventDefault()
      goTo(target)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, goTo, total, started])

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else document.documentElement.requestFullscreen?.()
  }

  if (!started) {
    return (
      <div className="grid h-svh place-items-center">
        <button
          type="button"
          onClick={() => {
            setCanFullscreen(Boolean(document.fullscreenEnabled))
            setStarted(true)
          }}
          className="pulse-underline font-caslon text-4xl md:text-6xl"
        >
          Start
        </button>
      </div>
    )
  }

  return (
    <LangContext.Provider value={lang}>
      <div lang={lang} className="relative">
        {/* Proximity on phones, so a slide taller than the screen can still be read to its end */}
        <div ref={ref} className="h-svh snap-y snap-proximity overflow-y-auto overscroll-none md:snap-mandatory">
          {children}
        </div>

        <div className="pointer-events-none fixed inset-x-0 top-0 h-0.5 animate-fade-in bg-foreground/10 [animation-delay:1200ms]">
          <div
            className="h-full bg-foreground transition-[width] duration-500 ease-out"
            style={{ width: `${((current + 1) / total) * 100}%` }}
          />
        </div>

        <nav
          aria-label="Slides"
          className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] flex animate-fade-in [animation-delay:1200ms] items-center gap-1 rounded-full bg-foreground p-1 font-sf text-xs text-background md:right-8 md:bottom-8"
        >
          <div role="group" aria-label={deckLabels.language[lang]} className="relative grid grid-cols-2">
            {/* One pill that slides under the chosen language */}
            <span
              aria-hidden
              className={`absolute inset-y-0 left-0 w-1/2 rounded-full bg-background transition-transform duration-300 ease-out ${lang === 'en' ? 'translate-x-full' : ''}`}
            />
            {LANGS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setLang(option)}
                aria-pressed={lang === option}
                className={`relative h-8 w-9 rounded-full uppercase transition-colors duration-300 ${lang === option ? 'text-foreground' : 'hover:bg-background/15'}`}
              >
                {option}
              </button>
            ))}
          </div>
          <span className="mx-1 h-4 w-px bg-background/25" />
          <button
            type="button"
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            aria-label={deckLabels.prev[lang]}
            className={BUTTON}
          >
            ↑
          </button>
          <span className="w-14 text-center tabular-nums" aria-live="polite">
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={() => goTo(current + 1)}
            disabled={current === total - 1}
            aria-label={deckLabels.next[lang]}
            className={BUTTON}
          >
            ↓
          </button>
          {canFullscreen && (
            <>
              <span className="mx-1 h-4 w-px bg-background/25" />
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={(fullscreen ? deckLabels.exitFullscreen : deckLabels.fullscreen)[lang]}
                className={`${BUTTON} grid-cols-1 grid-rows-1`}
              >
                {/* Corners pointing out to enter, pointing in to leave; the two cross-fade */}
                {[false, true].map((exit) => (
                  <svg
                    key={String(exit)}
                    viewBox="0 0 16 16"
                    className={`col-start-1 row-start-1 size-3.5 transition duration-300 ${exit === fullscreen ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden
                  >
                    <path d={exit ? 'M6 2v4H2M10 2v4h4M14 10h-4v4M2 10h4v4' : 'M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4'} />
                  </svg>
                ))}
              </button>
            </>
          )}
        </nav>
      </div>
    </LangContext.Provider>
  )
}
