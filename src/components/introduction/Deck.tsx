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
  return <>{text[useContext(LangContext)]}</>
}

export function SlideFrame({ children }: { children: ReactNode }) {
  return (
    <section className="flex min-h-svh snap-start flex-col justify-center px-4 py-20 md:px-[6vw] md:py-24">
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
  const total = Children.count(children)

  const goTo = useCallback(
    (index: number) => {
      ref.current?.children[Math.max(0, Math.min(total - 1, index))]?.scrollIntoView({ behavior: 'smooth' })
    },
    [total],
  )

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(Array.from(root.children).indexOf(entry.target))
        }
      },
      { root, threshold: 0.5 },
    )
    Array.from(root.children).forEach((slide) => observer.observe(slide))
    return () => observer.disconnect()
  }, [total])

  useEffect(() => {
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
  }, [current, goTo, total])

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else document.documentElement.requestFullscreen?.()
  }

  return (
    <LangContext.Provider value={lang}>
      <div lang={lang} className="relative">
        {/* Proximity on phones, so a slide taller than the screen can still be read to its end */}
        <div ref={ref} className="h-svh snap-y snap-proximity overflow-y-auto overscroll-none md:snap-mandatory">
          {children}
        </div>

        <div className="pointer-events-none fixed inset-x-0 top-0 h-0.5 bg-foreground/10">
          <div
            className="h-full bg-foreground transition-[width] duration-500 ease-out"
            style={{ width: `${((current + 1) / total) * 100}%` }}
          />
        </div>

        <nav
          aria-label="Slides"
          className="fixed right-4 bottom-4 flex items-center gap-1 rounded-full bg-foreground p-1 font-sf text-xs text-background md:right-8 md:bottom-8"
        >
          <div role="group" aria-label={deckLabels.language[lang]} className="flex">
            {LANGS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setLang(option)}
                aria-pressed={lang === option}
                className={`h-8 rounded-full px-2.5 uppercase transition-colors ${lang === option ? 'bg-background text-foreground' : 'hover:bg-background/15'}`}
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
          <span className="min-w-12 text-center tabular-nums" aria-live="polite">
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
          <span className="mx-1 h-4 w-px bg-background/25" />
          <button type="button" onClick={toggleFullscreen} aria-label={deckLabels.fullscreen[lang]} className={BUTTON}>
            <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" />
            </svg>
          </button>
        </nav>
      </div>
    </LangContext.Provider>
  )
}
