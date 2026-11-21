'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { cv } from '@/data/cv'
import { search, type SearchResult } from '@/lib/search'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/cv', label: 'CV' },
  { href: '/work', label: 'Work' },
]

const CONTACT = [
  { href: `mailto:${cv.email}`, label: cv.email },
  { href: cv.socials.linkedin, label: 'LinkedIn' },
  { href: cv.socials.instagram, label: 'Instagram' },
]

const CHIP = 'shrink-0 rounded-full px-4 py-2 text-sm transition-colors duration-300 hover:bg-background/16'

const EASE = 'ease-[cubic-bezier(0.2,0.65,0.3,1)]'
// Overshoots a touch, so the two lines settle into the cross like a spring
const SPRING = 'ease-[cubic-bezier(0.34,1.56,0.64,1)]'

const outside = (href: string) => /^(https?:|mailto:)/.test(href) || href.endsWith('.pdf')

// The menu opens a panel of links above the bar; typing in the search swaps them for results from
// the site's own content (lib/search), picked by click or by arrow keys and Enter
export default function CommandBar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  // Contact swaps the search line for ways to get in touch
  const [contact, setContact] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const results = useMemo(() => search(query), [query])
  const searching = query.trim() !== ''
  // The panel shows the links when the menu is open, or the results while there's a query
  const panel = open || searching

  const close = () => {
    setOpen(false)
    setContact(false)
    setQuery('')
  }

  const go = (result: SearchResult) => {
    close()
    inputRef.current?.blur()
    if (outside(result.href)) window.open(result.href, result.href.startsWith('mailto:') ? '_self' : '_blank')
    else router.push(result.href)
  }

  const onSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      const step = e.key === 'ArrowDown' ? 1 : -1
      setSelected((i) => (results.length ? (i + step + results.length) % results.length : 0))
    } else if (e.key === 'Enter' && results[selected]) {
      e.preventDefault()
      go(results[selected])
    }
  }

  // On the contact section at the end of the home page the menu opens by itself, and closes
  // again on the way back up
  useEffect(() => {
    const root = document.documentElement
    const observer = new MutationObserver(() => setOpen(root.hasAttribute('data-footer')))
    observer.observe(root, { attributeFilter: ['data-footer'] })
    return () => observer.disconnect()
  }, [])

  // A fixed bar stays behind the on-screen keyboard (the layout viewport doesn't shrink on iOS),
  // so the visual viewport's lost height lifts it and caps the results above the keyboard
  useEffect(() => {
    const vv = window.visualViewport
    const bar = barRef.current
    if (!vv || !bar) return
    const sync = () => {
      bar.style.setProperty('--kb', `${Math.max(0, window.innerHeight - vv.height - vv.offsetTop)}px`)
      bar.style.setProperty('--vvh', `${vv.height}px`)
    }
    sync()
    vv.addEventListener('resize', sync)
    vv.addEventListener('scroll', sync)
    return () => {
      vv.removeEventListener('resize', sync)
      vv.removeEventListener('scroll', sync)
    }
  }, [])

  useEffect(() => {
    if (!panel) return
    const dismiss = () => {
      setOpen(false)
      setContact(false)
      setQuery('')
    }
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && dismiss()
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && dismiss()
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [panel])

  return (
    <aside
      ref={barRef}
      aria-label="Command bar"
      className="intro-chrome fixed inset-x-0 bottom-[calc(1rem+var(--kb,0px))] z-40 flex justify-center px-8 transition-transform duration-400 ease-linear footer:-translate-y-[12svh] md:bottom-6 md:px-2.5"
    >
      <div
        ref={ref}
        className="gleam w-full max-w-104 rounded-[28px] font-sf transition-[max-width] duration-400 ease-linear footer:max-w-2xl bg-foreground/85 text-background shadow-lg backdrop-blur-xl"
      >
        <div
          id="command-menu"
          inert={!panel}
          className={`grid transition-[grid-template-rows,opacity] duration-500 ${EASE} ${
            panel ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            {searching ? (
              results.length ? (
                <ul id="command-results" role="listbox" aria-label="Results" className="flex max-h-[calc(var(--vvh,100svh)-7rem)] flex-col overflow-y-auto overscroll-contain p-2">
                  {results.map((result, i) => (
                    <li
                      key={`${result.kind}-${result.href}-${result.title}`}
                      id={`command-result-${i}`}
                      role="option"
                      aria-selected={i === selected}
                      onPointerEnter={() => setSelected(i)}
                      onClick={() => go(result)}
                      className="flex animate-chip-in cursor-pointer items-baseline justify-between gap-4 rounded-2xl px-3 py-2.5 text-sm select-none pointer-fine:aria-selected:bg-background/10 active:bg-background/10"
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      <span className="truncate">{result.title}</span>
                      <span className="shrink-0 text-xs text-background/50">{result.kind}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="animate-chip-in px-5 py-4 text-sm text-background/60">
                  Nothing for &ldquo;{query.trim()}&rdquo;. Try design, Next.js or contact.
                </p>
              )
            ) : (
              <nav aria-label="Main" className="flex flex-wrap gap-2 p-4">
                {LINKS.map(({ href, label }) => {
                  const active = pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={close}
                      aria-current={active ? 'page' : undefined}
                      className={`${CHIP} ${active ? 'gleam bg-background/14' : 'bg-background/8'}`}
                    >
                      {label}
                    </Link>
                  )
                })}
                <button
                  type="button"
                  onClick={() => setContact((c) => !c)}
                  aria-pressed={contact}
                  aria-controls="command-line"
                  className={`${CHIP} ${contact ? 'gleam bg-background/14' : 'bg-background/8'}`}
                >
                  Contact
                </button>
              </nav>
            )}
            <div className="mx-4 h-px bg-background/10" />
          </div>
        </div>

        <div
          id="command-line"
          // Closed it's the pill; open it takes the height of a row of buttons with the links row's
          // 16px padding (36 + 2 × 16), so swapping search for contact buttons doesn't make it jump
          className={`flex items-center gap-3 pr-4 ${open ? 'min-h-17' : 'min-h-14'} ${
            open && contact ? 'py-4 pl-4' : 'pl-5'
          }`}
        >
          {/* Only while the menu is open, so closing it always brings the search back */}
          {open && contact && !searching ? (
            <ul aria-label="Contact" className="flex min-w-0 flex-1 flex-wrap gap-2">
              {CONTACT.map(({ href, label }, i) => (
                <li key={label} className="animate-chip-in" style={{ animationDelay: `${i * 70}ms` }}>
                  <a
                    href={href}
                    {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                    className={`${CHIP} block bg-background/8`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <label className="min-w-0 flex-1 animate-chip-in">
              <span className="sr-only">Search the site</span>
              <input
                ref={inputRef}
                type="search"
                role="combobox"
                placeholder="Looking for something?"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelected(0)
                }}
                onKeyDown={onSearchKey}
                aria-expanded={searching}
                aria-controls="command-results"
                aria-activedescendant={searching && results.length ? `command-result-${selected}` : undefined}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                enterKeyHint="search"
                // 16px on touch screens, below that iOS zooms the page in on focus
                className="w-full bg-transparent text-base placeholder:text-background/50 focus:outline-none md:text-sm [&::-webkit-search-cancel-button]:appearance-none"
              />
            </label>
          )}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="command-menu"
            className="grid size-6 shrink-0 place-items-center rounded-full transition-opacity duration-150 hover:opacity-80 active:scale-[0.97]"
          >
            <span aria-hidden className="relative block size-4">
              <span
                className={`absolute top-1/2 left-0 -mt-px h-px w-4 rounded-full bg-current transition-transform duration-500 ${SPRING} ${
                  open ? 'rotate-45' : '-translate-y-[3.5px]'
                }`}
              />
              <span
                className={`absolute top-1/2 left-0 -mt-px h-px w-4 rounded-full bg-current transition-transform duration-500 ${SPRING} ${
                  open ? '-rotate-45' : 'translate-y-[3.5px]'
                }`}
              />
            </span>
          </button>
        </div>
      </div>
    </aside>
  )
}
