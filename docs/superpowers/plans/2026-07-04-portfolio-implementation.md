# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Next.js 15 portfolio site with shared-element image transitions, text–image collision detection, and responsive design across Home, CV, and Detail routes.

**Architecture:** All pages share a `PageShell` that renders a left-side `ItemList` and a right-side content area. A single `PortfolioItem` discriminated union type drives both the list and detail pages. Hover state and image bounding boxes are passed down via React context so `CollisionText` can invert color without prop-drilling.

**Tech Stack:** Next.js 15 (App Router), TypeScript strict, Tailwind CSS v4, Framer Motion, ESLint (eslint-config-next)

---

## File Map

```
src/
  app/
    layout.tsx                        # Root HTML shell, ImageBoundsProvider
    template.tsx                      # Client — AnimatePresence wrapper for page transitions
    page.tsx                          # Home route
    globals.css                       # @font-face, @theme tokens, base resets
    cv/
      page.tsx
    projects/
      [slug]/page.tsx
    press/
      [slug]/page.tsx
    awards/
      [slug]/page.tsx
  components/
    layout/
      PageShell.tsx                   # Padding, positions Navbar + LocationTime
      Navbar.tsx                      # Desktop links / mobile hamburger
      LocationTime.tsx                # Static location + live clock + optional back button
    list/
      ItemList.tsx                    # Groups items by category, manages hoveredSlug state
      ListSection.tsx                 # Section heading + maps ListItem
      ListItem.tsx                    # One row — routes internally or opens href
    image/
      HeroImage.tsx                   # motion.div + next/image, layoutId="hero"
      PreviewImage.tsx                # AnimatePresence fade, desktop only
      CollisionText.tsx               # getBoundingClientRect vs image bounds → color swap
    panels/
      ProjectPanel.tsx                # Title, date, description
      CVPanel.tsx                     # Name, DOB, bio, download, mailto
  context/
    ImageBoundsContext.tsx            # Provides heroBounds + previewBounds to CollisionText
    HoverContext.tsx                  # Provides hoveredSlug + setHoveredSlug
  types/
    index.ts                          # PortfolioItem, CVData
  data/
    items.ts                          # portfolioItems: PortfolioItem[]
    cv.ts                             # cvData: CVData
public/
  fonts/
    AKIRA.woff2                       # Drop in manually
  images/
    portrait.jpg
    projects/
    press/
    awards/
  cv/
    gianni-cv.pdf                     # Drop in manually
```

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: all project scaffolding files

- [ ] **Step 1: Run create-next-app in the portfolio directory**

```bash
cd /Users/giannims/Documents/ZZP/gianni-portfolio
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --yes
```

Expected: project files created, existing `CLAUDE.md` and `docs/` preserved.

- [ ] **Step 2: Install Framer Motion**

```bash
npm install framer-motion
```

- [ ] **Step 3: Verify ESLint runs clean**

```bash
npx eslint src --ext .ts,.tsx
```

Expected: no errors (only the generated placeholder files exist).

- [ ] **Step 4: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 15 project with Tailwind, ESLint, Framer Motion"
```

---

## Task 2: Configure theme — fonts, colors, CSS variables

**Files:**
- Modify: `src/app/globals.css`
- Create: `public/fonts/` (placeholder — AKIRA.woff2 dropped in manually)

- [ ] **Step 1: Replace globals.css with theme configuration**

```css
/* src/app/globals.css */
@import "tailwindcss";

@font-face {
  font-family: "AKIRA";
  src: url("/fonts/AKIRA.woff2") format("woff2");
  font-weight: normal;
  font-display: swap;
}

@theme {
  --color-background: #fefffd;
  --color-foreground: #1a1a1a;
  --color-blue: #0E3AFF;

  --font-title: "AKIRA", sans-serif;
  --font-body: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-body);
}
```

- [ ] **Step 2: Create font placeholder directory**

```bash
mkdir -p public/fonts public/images/projects public/images/press public/images/awards public/cv
```

- [ ] **Step 3: Run ESLint**

```bash
npx eslint src --ext .ts,.tsx
```

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css public/
git commit -m "feat: configure theme colors, fonts and CSS variables"
```

---

## Task 3: Define types

**Files:**
- Create: `src/types/index.ts`

- [ ] **Step 1: Write types**

```typescript
// src/types/index.ts

export type PortfolioItem = {
  title: string
  year: number
  category: 'project' | 'press' | 'award'
} & (
  | { link: 'external'; href: string }
  | {
      link: 'internal'
      slug: string
      date: string
      description: string
      image: string
    }
)

export type CVData = {
  name: string
  dob: string
  bio: string[]
  cvPdfPath: string
  email: string
}
```

- [ ] **Step 2: Run ESLint**

```bash
npx eslint src --ext .ts,.tsx
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add PortfolioItem and CVData types"
```

---

## Task 4: Create data files

**Files:**
- Create: `src/data/items.ts`
- Create: `src/data/cv.ts`

- [ ] **Step 1: Write items.ts with placeholder data**

```typescript
// src/data/items.ts
import { PortfolioItem } from '@/types'

export const portfolioItems: PortfolioItem[] = [
  {
    title: 'SoundCheckd',
    year: 2026,
    category: 'project',
    link: 'internal',
    slug: 'soundcheckd',
    date: '2026-01-15',
    description: 'A music discovery platform for independent artists. Built to connect listeners with emerging talent.',
    image: 'images/projects/soundcheckd.jpg',
  },
  {
    title: 'SoundCheckd Dashboard',
    year: 2026,
    category: 'project',
    link: 'internal',
    slug: 'soundcheckd-dashboard',
    date: '2026-03-01',
    description: 'Analytics and management dashboard for the SoundCheckd platform.',
    image: 'images/projects/soundcheckd-dashboard.jpg',
  },
  {
    title: 'Spreadsheet Validator (Private)',
    year: 2026,
    category: 'project',
    link: 'internal',
    slug: 'spreadsheet-validator',
    date: '2026-02-10',
    description: 'Internal tool for validating large spreadsheet datasets.',
    image: 'images/projects/spreadsheet-validator.jpg',
  },
  {
    title: 'Source',
    year: 2026,
    category: 'press',
    link: 'external',
    href: 'https://example.com',
  },
  {
    title: 'Another Source',
    year: 2026,
    category: 'press',
    link: 'external',
    href: 'https://example.com',
  },
  {
    title: 'Award',
    year: 2026,
    category: 'award',
    link: 'external',
    href: 'https://example.com',
  },
  {
    title: 'Another Award',
    year: 2026,
    category: 'award',
    link: 'external',
    href: 'https://example.com',
  },
]
```

- [ ] **Step 2: Write cv.ts**

```typescript
// src/data/cv.ts
import { CVData } from '@/types'

export const cvData: CVData = {
  name: 'Gianni Mendonça Semedo',
  dob: '25-07-2002',
  bio: [
    'I am a full-stack developer who builds intuitive and user-friendly digital products. I gained experience at Jem-id, Louvels.dev and Outlier.ai. Where I focussed on designing and developing business tools, dashboards and AI implementations.',
    'I also work with UX/UI design and user research. In this area, I focus on identifying and translating user needs into clear user stories and actionable requirements.',
    'What interests me most is shaping ideas from the ground up. In doing so, my strategic thinking and knowledge of digital marketing come into play.',
  ],
  cvPdfPath: '/cv/gianni-cv.pdf',
  email: 'giannims2002@gmail.com',
}
```

- [ ] **Step 3: Run ESLint**

```bash
npx eslint src --ext .ts,.tsx
```

- [ ] **Step 4: Commit**

```bash
git add src/data/
git commit -m "feat: add placeholder portfolio and CV data"
```

---

## Task 5: Context providers — ImageBounds and Hover

**Files:**
- Create: `src/context/ImageBoundsContext.tsx`
- Create: `src/context/HoverContext.tsx`

- [ ] **Step 1: Write ImageBoundsContext**

```tsx
// src/context/ImageBoundsContext.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Rect = { top: number; left: number; bottom: number; right: number }

type ImageBoundsContextType = {
  heroBounds: Rect | null
  previewBounds: Rect | null
  setHeroBounds: (bounds: Rect | null) => void
  setPreviewBounds: (bounds: Rect | null) => void
}

const ImageBoundsContext = createContext<ImageBoundsContextType | null>(null)

export function ImageBoundsProvider({ children }: { children: ReactNode }) {
  const [heroBounds, setHeroBounds] = useState<Rect | null>(null)
  const [previewBounds, setPreviewBounds] = useState<Rect | null>(null)

  return (
    <ImageBoundsContext.Provider value={{ heroBounds, previewBounds, setHeroBounds, setPreviewBounds }}>
      {children}
    </ImageBoundsContext.Provider>
  )
}

export function useImageBounds() {
  const ctx = useContext(ImageBoundsContext)
  if (!ctx) throw new Error('useImageBounds must be used within ImageBoundsProvider')
  return ctx
}
```

- [ ] **Step 2: Write HoverContext**

```tsx
// src/context/HoverContext.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type HoverContextType = {
  hoveredSlug: string | null
  setHoveredSlug: (slug: string | null) => void
}

const HoverContext = createContext<HoverContextType | null>(null)

export function HoverProvider({ children }: { children: ReactNode }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)

  return (
    <HoverContext.Provider value={{ hoveredSlug, setHoveredSlug }}>
      {children}
    </HoverContext.Provider>
  )
}

export function useHover() {
  const ctx = useContext(HoverContext)
  if (!ctx) throw new Error('useHover must be used within HoverProvider')
  return ctx
}
```

- [ ] **Step 3: Run ESLint**

```bash
npx eslint src --ext .ts,.tsx
```

- [ ] **Step 4: Commit**

```bash
git add src/context/
git commit -m "feat: add ImageBounds and Hover context providers"
```

---

## Task 6: Layout components — PageShell, Navbar, LocationTime

**Files:**
- Create: `src/components/layout/PageShell.tsx`
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/LocationTime.tsx`

- [ ] **Step 1: Write LocationTime**

```tsx
// src/components/layout/LocationTime.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function LocationTime({ showBack = false }: { showBack?: boolean }) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('nl-NL', { hour12: false }))
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="fixed bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
      {showBack ? (
        <Link href="/" className="text-foreground text-sm pointer-events-auto md:hidden">
          ←
        </Link>
      ) : (
        <div />
      )}
      <div className="text-right text-sm pointer-events-auto">
        <p>Rotterdam, The Netherlands</p>
        <p>{time}</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Write Navbar**

```tsx
// src/components/layout/Navbar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const linkClass = (href: string) =>
    pathname === href ? 'underline' : ''

  return (
    <>
      {/* Desktop */}
      <nav className="hidden md:flex absolute top-6 right-6 gap-2 text-sm">
        <Link href="/" className={linkClass('/')}>Home</Link>
        <span>|</span>
        <Link href="/cv" className={linkClass('/cv')}>CV</Link>
      </nav>

      {/* Mobile */}
      <div className="md:hidden absolute top-6 right-6">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="text-foreground text-xl leading-none"
        >
          &#9776;
        </button>

        {open && (
          <div className="fixed inset-0 bg-background z-50 flex flex-col items-end p-6 gap-6 text-lg">
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-xl">
              &#x2715;
            </button>
            <Link href="/" onClick={() => setOpen(false)} className={linkClass('/')}>Home</Link>
            <Link href="/cv" onClick={() => setOpen(false)} className={linkClass('/cv')}>CV</Link>
          </div>
        )}
      </div>
    </>
  )
}
```

- [ ] **Step 3: Write PageShell**

```tsx
// src/components/layout/PageShell.tsx
import Navbar from './Navbar'
import LocationTime from './LocationTime'
import { ReactNode } from 'react'

export default function PageShell({
  children,
  showBack = false,
}: {
  children: ReactNode
  showBack?: boolean
}) {
  return (
    <div className="relative min-h-screen bg-background text-foreground font-body px-6 pt-6 pb-20">
      <Navbar />
      {children}
      <LocationTime showBack={showBack} />
    </div>
  )
}
```

- [ ] **Step 4: Run ESLint**

```bash
npx eslint src --ext .ts,.tsx
```

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/
git commit -m "feat: add PageShell, Navbar, LocationTime layout components"
```

---

## Task 7: List components — ListItem, ListSection, ItemList

**Files:**
- Create: `src/components/list/ListItem.tsx`
- Create: `src/components/list/ListSection.tsx`
- Create: `src/components/list/ItemList.tsx`

- [ ] **Step 1: Write ListItem**

```tsx
// src/components/list/ListItem.tsx
'use client'

import Link from 'next/link'
import { PortfolioItem } from '@/types'
import { useHover } from '@/context/HoverContext'

export default function ListItem({ item }: { item: PortfolioItem }) {
  const { setHoveredSlug } = useHover()

  const rowClass = 'flex justify-between text-sm py-0.5 w-full'

  if (item.link === 'external') {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={rowClass}>
        <span>{item.title}</span>
        <span>{item.year}</span>
      </a>
    )
  }

  const href = `/${item.category === 'project' ? 'projects' : item.category}/${item.slug}`

  return (
    <Link
      href={href}
      className={rowClass}
      onMouseEnter={() => setHoveredSlug(item.slug)}
      onMouseLeave={() => setHoveredSlug(null)}
    >
      <span>{item.title}</span>
      <span>{item.year}</span>
    </Link>
  )
}
```

- [ ] **Step 2: Write ListSection**

```tsx
// src/components/list/ListSection.tsx
import { PortfolioItem } from '@/types'
import ListItem from './ListItem'

const LABELS: Record<PortfolioItem['category'], string> = {
  project: 'Projects',
  press: 'Press',
  award: 'Awards',
}

export default function ListSection({
  category,
  items,
}: {
  category: PortfolioItem['category']
  items: PortfolioItem[]
}) {
  return (
    <div className="mb-2">
      <p className="text-blue font-bold text-sm mb-1">{LABELS[category]}</p>
      {items.map((item) => (
        <ListItem key={item.title} item={item} />
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Write ItemList**

```tsx
// src/components/list/ItemList.tsx
import { PortfolioItem } from '@/types'
import ListSection from './ListSection'

export default function ItemList({ items }: { items: PortfolioItem[] }) {
  const byCategory = (cat: PortfolioItem['category']) =>
    items.filter((i) => i.category === cat)

  return (
    <div className="w-48 md:w-56 shrink-0">
      <ListSection category="project" items={byCategory('project')} />
      <ListSection category="press" items={byCategory('press')} />
      <ListSection category="award" items={byCategory('award')} />
    </div>
  )
}
```

- [ ] **Step 4: Run ESLint**

```bash
npx eslint src --ext .ts,.tsx
```

- [ ] **Step 5: Commit**

```bash
git add src/components/list/
git commit -m "feat: add ItemList, ListSection, ListItem components"
```

---

## Task 8: Image components — HeroImage and PreviewImage

**Files:**
- Create: `src/components/image/HeroImage.tsx`
- Create: `src/components/image/PreviewImage.tsx`

- [ ] **Step 1: Write HeroImage**

```tsx
// src/components/image/HeroImage.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { useImageBounds } from '@/context/ImageBoundsContext'

export default function HeroImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { setHeroBounds } = useImageBounds()

  useEffect(() => {
    const update = () => {
      if (!ref.current) return
      const r = ref.current.getBoundingClientRect()
      setHeroBounds({ top: r.top, left: r.left, bottom: r.bottom, right: r.right })
    }
    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update)
    }
  }, [setHeroBounds])

  return (
    <motion.div
      ref={ref}
      layoutId="hero"
      className="relative w-[420px] h-[490px] shrink-0"
    >
      <Image src={`/${src}`} alt={alt} fill className="object-cover" />
    </motion.div>
  )
}
```

- [ ] **Step 2: Write PreviewImage**

```tsx
// src/components/image/PreviewImage.tsx
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { useHover } from '@/context/HoverContext'
import { useImageBounds } from '@/context/ImageBoundsContext'
import { PortfolioItem } from '@/types'

export default function PreviewImage({ items }: { items: PortfolioItem[] }) {
  const { hoveredSlug } = useHover()
  const { setPreviewBounds } = useImageBounds()
  const ref = useRef<HTMLDivElement>(null)

  const hovered = items.find(
    (i) => i.link === 'internal' && i.slug === hoveredSlug
  ) as Extract<PortfolioItem, { link: 'internal' }> | undefined

  useEffect(() => {
    const update = () => {
      if (!ref.current || !hovered) {
        setPreviewBounds(null)
        return
      }
      const r = ref.current.getBoundingClientRect()
      setPreviewBounds({ top: r.top, left: r.left, bottom: r.bottom, right: r.right })
    }
    update()
  }, [hovered, setPreviewBounds])

  return (
    <div className="hidden md:block absolute inset-0 pointer-events-none">
      <AnimatePresence>
        {hovered && (
          <motion.div
            ref={ref}
            key={hovered.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[15%] left-[12%] w-[460px] h-[530px] z-10"
          >
            <Image
              src={`/${hovered.image}`}
              alt={hovered.title}
              fill
              className="object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 3: Run ESLint**

```bash
npx eslint src --ext .ts,.tsx
```

- [ ] **Step 4: Commit**

```bash
git add src/components/image/HeroImage.tsx src/components/image/PreviewImage.tsx
git commit -m "feat: add HeroImage and PreviewImage with Framer Motion"
```

---

## Task 9: CollisionText

**Files:**
- Create: `src/components/image/CollisionText.tsx`

- [ ] **Step 1: Write CollisionText**

```tsx
// src/components/image/CollisionText.tsx
'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { useImageBounds } from '@/context/ImageBoundsContext'

function overlaps(
  a: { top: number; left: number; bottom: number; right: number },
  b: { top: number; left: number; bottom: number; right: number }
) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
}

export default function CollisionText({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)
  const { heroBounds, previewBounds } = useImageBounds()
  const [inverted, setInverted] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const rect = { top: r.top, left: r.left, bottom: r.bottom, right: r.right }
    const hitsHero = heroBounds ? overlaps(rect, heroBounds) : false
    const hitsPreview = previewBounds ? overlaps(rect, previewBounds) : false
    setInverted(hitsHero || hitsPreview)
  }, [heroBounds, previewBounds])

  return (
    <span
      ref={ref}
      style={{ color: inverted ? 'var(--color-background)' : 'var(--color-foreground)' }}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 2: Run ESLint**

```bash
npx eslint src --ext .ts,.tsx
```

- [ ] **Step 3: Commit**

```bash
git add src/components/image/CollisionText.tsx
git commit -m "feat: add CollisionText with bounding-rect collision detection"
```

---

## Task 10: Panel components — ProjectPanel and CVPanel

**Files:**
- Create: `src/components/panels/ProjectPanel.tsx`
- Create: `src/components/panels/CVPanel.tsx`

- [ ] **Step 1: Write ProjectPanel**

```tsx
// src/components/panels/ProjectPanel.tsx
import CollisionText from '@/components/image/CollisionText'
import { PortfolioItem } from '@/types'

type InternalItem = Extract<PortfolioItem, { link: 'internal' }>

export default function ProjectPanel({ item }: { item: InternalItem }) {
  return (
    <div className="flex flex-col gap-4 max-w-xs">
      <h1 className="text-blue font-bold font-body text-lg leading-tight">
        <CollisionText>{item.title}</CollisionText>
      </h1>
      <p className="text-sm">
        <CollisionText>{item.date}</CollisionText>
      </p>
      <p className="text-sm leading-relaxed">
        <CollisionText>{item.description}</CollisionText>
      </p>
    </div>
  )
}
```

- [ ] **Step 2: Write CVPanel**

```tsx
// src/components/panels/CVPanel.tsx
import CollisionText from '@/components/image/CollisionText'
import { CVData } from '@/types'

export default function CVPanel({ data }: { data: CVData }) {
  return (
    <div className="flex flex-col gap-4 max-w-xs">
      <h1 className="text-blue font-bold font-body text-lg leading-tight">
        <CollisionText>{data.name}</CollisionText>
      </h1>
      <p className="text-sm">
        <CollisionText>{data.dob}</CollisionText>
      </p>
      {data.bio.map((paragraph, i) => (
        <p key={i} className="text-sm leading-relaxed">
          <CollisionText>{paragraph}</CollisionText>
        </p>
      ))}
      <a href={data.cvPdfPath} download className="text-blue underline text-sm">
        <CollisionText>Download CV</CollisionText>
      </a>
      <p className="text-sm">
        <CollisionText>
          Message me:{' '}
        </CollisionText>
        <a href={`mailto:${data.email}`} className="text-blue underline">
          <CollisionText>{data.email}</CollisionText>
        </a>
      </p>
    </div>
  )
}
```

- [ ] **Step 3: Run ESLint**

```bash
npx eslint src --ext .ts,.tsx
```

- [ ] **Step 4: Commit**

```bash
git add src/components/panels/
git commit -m "feat: add ProjectPanel and CVPanel"
```

---

## Task 11: Root layout and template

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/app/template.tsx`

- [ ] **Step 1: Update root layout to include providers**

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { ImageBoundsProvider } from '@/context/ImageBoundsContext'
import { HoverProvider } from '@/context/HoverContext'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Gianni',
  description: 'Portfolio of Gianni Mendonça Semedo',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ImageBoundsProvider>
          <HoverProvider>
            {children}
          </HoverProvider>
        </ImageBoundsProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Create template.tsx for page transitions**

```tsx
// src/app/template.tsx
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 3: Run ESLint**

```bash
npx eslint src --ext .ts,.tsx
```

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/template.tsx
git commit -m "feat: configure root layout with context providers and page transition template"
```

---

## Task 12: Home page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write Home page**

```tsx
// src/app/page.tsx
import PageShell from '@/components/layout/PageShell'
import ItemList from '@/components/list/ItemList'
import HeroImage from '@/components/image/HeroImage'
import PreviewImage from '@/components/image/PreviewImage'
import { portfolioItems } from '@/data/items'

export default function HomePage() {
  return (
    <PageShell>
      <div className="relative flex gap-8 pt-16">
        {/* Logo */}
        <div className="absolute top-0 left-0">
          <span className="font-title text-blue text-4xl tracking-wide">GIANNI</span>
        </div>

        {/* Left: list */}
        <ItemList items={portfolioItems} />

        {/* Right: hero image area — position relative so PreviewImage can overlay */}
        <div className="relative flex-1 hidden md:block">
          <HeroImage src="images/portrait.jpg" alt="Gianni Mendonça Semedo" />
          <PreviewImage items={portfolioItems} />
        </div>

        {/* Mobile: portrait below list */}
        <div className="md:hidden mt-8 w-full">
          <div className="relative w-full h-64">
            <HeroImage src="images/portrait.jpg" alt="Gianni Mendonça Semedo" />
          </div>
        </div>
      </div>
    </PageShell>
  )
}
```

- [ ] **Step 2: Start dev server and verify the home page loads**

```bash
npm run dev
```

Open `http://localhost:3000`. You should see: GIANNI logo top left, Home | CV nav top right, the item list with Projects/Press/Awards sections, and location + time bottom right. No errors in the browser console.

- [ ] **Step 3: Run ESLint**

```bash
npx eslint src --ext .ts,.tsx
```

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: home page with ItemList and HeroImage"
```

---

## Task 13: CV page

**Files:**
- Create: `src/app/cv/page.tsx`

- [ ] **Step 1: Write CV page**

```tsx
// src/app/cv/page.tsx
import PageShell from '@/components/layout/PageShell'
import ItemList from '@/components/list/ItemList'
import HeroImage from '@/components/image/HeroImage'
import PreviewImage from '@/components/image/PreviewImage'
import CVPanel from '@/components/panels/CVPanel'
import { portfolioItems } from '@/data/items'
import { cvData } from '@/data/cv'

export default function CVPage() {
  return (
    <PageShell>
      <div className="relative flex gap-8 pt-16">
        {/* Logo */}
        <div className="absolute top-0 left-0">
          <span className="font-title text-blue text-4xl tracking-wide">GIANNI</span>
        </div>

        {/* Left: list */}
        <ItemList items={portfolioItems} />

        {/* Right: desktop layout */}
        <div className="hidden md:flex flex-1 gap-8">
          <div className="relative">
            <HeroImage src="images/portrait.jpg" alt="Gianni Mendonça Semedo" />
            <PreviewImage items={portfolioItems} />
          </div>
          <CVPanel data={cvData} />
        </div>

        {/* Right: mobile layout */}
        <div className="md:hidden flex flex-col gap-6 w-full mt-8">
          <div className="relative w-full h-72">
            <HeroImage src="images/portrait.jpg" alt="Gianni Mendonça Semedo" />
          </div>
          <CVPanel data={cvData} />
        </div>
      </div>
    </PageShell>
  )
}
```

- [ ] **Step 2: Verify in browser at http://localhost:3000/cv**

You should see: same list on the left, portrait image, and the CV panel on the right with name, bio, download and email links. No console errors.

- [ ] **Step 3: Run ESLint**

```bash
npx eslint src --ext .ts,.tsx
```

- [ ] **Step 4: Commit**

```bash
git add src/app/cv/page.tsx
git commit -m "feat: CV page with CVPanel"
```

---

## Task 14: Detail pages (projects, press, awards)

**Files:**
- Create: `src/app/projects/[slug]/page.tsx`
- Create: `src/app/press/[slug]/page.tsx`
- Create: `src/app/awards/[slug]/page.tsx`

- [ ] **Step 1: Write projects detail page**

```tsx
// src/app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation'
import PageShell from '@/components/layout/PageShell'
import ItemList from '@/components/list/ItemList'
import HeroImage from '@/components/image/HeroImage'
import PreviewImage from '@/components/image/PreviewImage'
import ProjectPanel from '@/components/panels/ProjectPanel'
import { portfolioItems } from '@/data/items'
import { PortfolioItem } from '@/types'

export function generateStaticParams() {
  return portfolioItems
    .filter((i): i is Extract<PortfolioItem, { link: 'internal'; category: 'project' }> =>
      i.link === 'internal' && i.category === 'project'
    )
    .map((i) => ({ slug: i.slug }))
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = portfolioItems.find(
    (i): i is Extract<PortfolioItem, { link: 'internal' }> =>
      i.link === 'internal' && i.slug === slug
  )
  if (!item) notFound()

  return (
    <PageShell showBack>
      <div className="relative flex gap-8 pt-16">
        {/* Logo */}
        <div className="absolute top-0 left-0">
          <span className="font-title text-blue text-4xl tracking-wide">GIANNI</span>
        </div>

        {/* Left: list */}
        <ItemList items={portfolioItems} />

        {/* Right: desktop layout */}
        <div className="hidden md:flex flex-1 gap-8">
          <div className="relative">
            <HeroImage src={item.image} alt={item.title} />
            <PreviewImage items={portfolioItems} />
          </div>
          <ProjectPanel item={item} />
        </div>

        {/* Right: mobile layout */}
        <div className="md:hidden flex flex-col gap-6 w-full mt-8">
          <div className="relative w-full h-72">
            <HeroImage src={item.image} alt={item.title} />
          </div>
          <ProjectPanel item={item} />
        </div>
      </div>
    </PageShell>
  )
}
```

- [ ] **Step 2: Write press detail page (identical structure, different category filter)**

```tsx
// src/app/press/[slug]/page.tsx
import { notFound } from 'next/navigation'
import PageShell from '@/components/layout/PageShell'
import ItemList from '@/components/list/ItemList'
import HeroImage from '@/components/image/HeroImage'
import PreviewImage from '@/components/image/PreviewImage'
import ProjectPanel from '@/components/panels/ProjectPanel'
import { portfolioItems } from '@/data/items'
import { PortfolioItem } from '@/types'

export function generateStaticParams() {
  return portfolioItems
    .filter((i): i is Extract<PortfolioItem, { link: 'internal'; category: 'press' }> =>
      i.link === 'internal' && i.category === 'press'
    )
    .map((i) => ({ slug: i.slug }))
}

export default async function PressDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = portfolioItems.find(
    (i): i is Extract<PortfolioItem, { link: 'internal' }> =>
      i.link === 'internal' && i.slug === slug
  )
  if (!item) notFound()

  return (
    <PageShell showBack>
      <div className="relative flex gap-8 pt-16">
        <div className="absolute top-0 left-0">
          <span className="font-title text-blue text-4xl tracking-wide">GIANNI</span>
        </div>
        <ItemList items={portfolioItems} />
        <div className="hidden md:flex flex-1 gap-8">
          <div className="relative">
            <HeroImage src={item.image} alt={item.title} />
            <PreviewImage items={portfolioItems} />
          </div>
          <ProjectPanel item={item} />
        </div>
        <div className="md:hidden flex flex-col gap-6 w-full mt-8">
          <div className="relative w-full h-72">
            <HeroImage src={item.image} alt={item.title} />
          </div>
          <ProjectPanel item={item} />
        </div>
      </div>
    </PageShell>
  )
}
```

- [ ] **Step 3: Write awards detail page**

```tsx
// src/app/awards/[slug]/page.tsx
import { notFound } from 'next/navigation'
import PageShell from '@/components/layout/PageShell'
import ItemList from '@/components/list/ItemList'
import HeroImage from '@/components/image/HeroImage'
import PreviewImage from '@/components/image/PreviewImage'
import ProjectPanel from '@/components/panels/ProjectPanel'
import { portfolioItems } from '@/data/items'
import { PortfolioItem } from '@/types'

export function generateStaticParams() {
  return portfolioItems
    .filter((i): i is Extract<PortfolioItem, { link: 'internal'; category: 'award' }> =>
      i.link === 'internal' && i.category === 'award'
    )
    .map((i) => ({ slug: i.slug }))
}

export default async function AwardDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = portfolioItems.find(
    (i): i is Extract<PortfolioItem, { link: 'internal' }> =>
      i.link === 'internal' && i.slug === slug
  )
  if (!item) notFound()

  return (
    <PageShell showBack>
      <div className="relative flex gap-8 pt-16">
        <div className="absolute top-0 left-0">
          <span className="font-title text-blue text-4xl tracking-wide">GIANNI</span>
        </div>
        <ItemList items={portfolioItems} />
        <div className="hidden md:flex flex-1 gap-8">
          <div className="relative">
            <HeroImage src={item.image} alt={item.title} />
            <PreviewImage items={portfolioItems} />
          </div>
          <ProjectPanel item={item} />
        </div>
        <div className="md:hidden flex flex-col gap-6 w-full mt-8">
          <div className="relative w-full h-72">
            <HeroImage src={item.image} alt={item.title} />
          </div>
          <ProjectPanel item={item} />
        </div>
      </div>
    </PageShell>
  )
}
```

- [ ] **Step 4: Verify detail page in browser**

Navigate to `http://localhost:3000/projects/soundcheckd`. You should see the list on the left, the project image (placeholder or missing is fine), and the project panel on the right with title, date, and description.

- [ ] **Step 5: Run ESLint**

```bash
npx eslint src --ext .ts,.tsx
```

- [ ] **Step 6: Commit**

```bash
git add src/app/projects/ src/app/press/ src/app/awards/
git commit -m "feat: detail pages for projects, press and awards"
```

---

## Task 15: next.config.ts — allow local image paths

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Ensure next/image can serve local public images**

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/images/**',
      },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 2: Run ESLint**

```bash
npx eslint src --ext .ts,.tsx
```

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "chore: configure next/image for local public images"
```

---

## Task 16: Final check — mobile layout, back button, overall QA

**Files:** No new files — review and fix as needed.

- [ ] **Step 1: Open dev server and check mobile viewport**

In browser DevTools, switch to a mobile viewport (375px width). Verify:
- Hamburger menu appears top right
- Portrait image appears below the item list on home
- On CV mobile: image stacked above bio
- On Detail mobile: image stacked above panel

- [ ] **Step 2: Verify back button on mobile detail pages**

On a mobile viewport, navigate to a project detail page. The `←` should appear bottom left next to the location/time. Clicking it navigates back to `/`.

- [ ] **Step 3: Verify collision text**

On desktop, hover a project item. Confirm the preview image appears. Confirm that any text rows that visually overlap the preview image switch to white/background color.

- [ ] **Step 4: Run final ESLint**

```bash
npx eslint src --ext .ts,.tsx
```

Expected: zero errors, zero warnings.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete portfolio site infrastructure"
```
