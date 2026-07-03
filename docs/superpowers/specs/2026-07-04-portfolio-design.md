# Gianni Portfolio — Design Spec

## Overview

A Next.js (App Router) portfolio site with three routes: Home, CV, and Project Detail. All pages share the same left-side list and bottom location/time indicator. The right side changes per route. A shared hero image transitions between pages using Framer Motion shared-element animation. Text that overlaps any visible image inverts its color.

---

## Theme

### Colors

| Token | Hex | Usage |
|---|---|---|
| `background` | `#fefffd` | Page background, inverted text on images |
| `foreground` | `#1a1a1a` | Default text |
| `blue` | `#0E3AFF` | Section headings, links, active nav item, project titles |

### Fonts

| Token | Font | Usage |
|---|---|---|
| `font-title` | AKIRA (self-hosted, local file in `/public/fonts/`) | Logo "GIANNI" top left |
| `font-body` | Helvetica Neue (system font stack) | All other text |

Both defined as CSS variables in `globals.css` and exposed as Tailwind utilities in `tailwind.config.ts`.

---

## Routes

| Route | File |
|---|---|
| `/` | `src/app/page.tsx` |
| `/cv` | `src/app/cv/page.tsx` |
| `/projects/[slug]` | `src/app/projects/[slug]/page.tsx` |
| `/press/[slug]` | `src/app/press/[slug]/page.tsx` |
| `/awards/[slug]` | `src/app/awards/[slug]/page.tsx` |

Press and awards items with `link: 'internal'` render via their own dynamic route using the same `DetailPage` component as projects.

---

## Data Layer

All data lives in `src/data/`.

### `PortfolioItem` type (`src/types/index.ts`)

```ts
type PortfolioItem = {
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
      image: string  // relative path from /public, e.g. "images/projects/soundcheckd.jpg"
    }
)
```

### Files

- `src/data/items.ts` — exports `portfolioItems: PortfolioItem[]`, ordered as they appear in the list
- `src/data/cv.ts` — exports `cvData: { name: string; dob: string; bio: string[]; cvPdfPath: string; email: string }`

### Image storage

```
/public/
  fonts/
    AKIRA.woff2
  images/
    portrait.jpg
    projects/[slug].jpg
    press/[slug].jpg
    awards/[slug].jpg
```

---

## Components

### Layout

**`src/components/layout/PageShell.tsx`**
Wraps every page. Provides consistent padding and positions `Navbar` (top) and `LocationTime` (bottom right). Accepts `children`.

**`src/components/layout/Navbar.tsx`**
- Desktop: "Home | CV" top right. Active route is underlined. Plain `<Link>` elements.
- Mobile: hamburger icon (≡) top right → full-screen overlay with the same links. Toggle via local boolean state.

**`src/components/layout/LocationTime.tsx`**
- Static string: "Rotterdam, The Netherlands"
- Live clock: updates every second via `setInterval` in a `useEffect`. Displays local time `HH:MM:SS`.
- Mobile only: additionally shows a `←` back button bottom left (rendered via a slot or conditional prop).

### List

**`src/components/list/ItemList.tsx`**
Receives `items: PortfolioItem[]` and `hoveredSlug: string | null` + `onHover: (slug: string | null) => void`. Groups items by `category`, renders three `ListSection` components.

**`src/components/list/ListSection.tsx`**
Receives `label`, `items`, `hoveredSlug`, `onHover`. Renders the blue category heading and maps `ListItem`.

**`src/components/list/ListItem.tsx`**
Renders one row: `title` left, `year` right.
- `link: 'external'` → `<a href={href} target="_blank">`
- `link: 'internal'` → `<Link href="/[category]/[slug]">` + fires `onHover` on `mouseenter`/`mouseleave`
- Emits hover state upward; no hover behaviour on mobile.

### Image & Visual FX

**`src/components/image/HeroImage.tsx`**
The primary image rendered on the right side of the page. Accepts `src`, `alt`, and a Framer Motion `layoutId` string. Used on all routes — portrait on Home/CV, project image on Detail.

**`src/components/image/PreviewImage.tsx`**
Desktop only (`hidden md:block`). Appears when `hoveredSlug` is non-null. Renders the hovered project's image, positioned on top of or overlapping the `HeroImage`. On detail pages it renders in the defined overlay zone (top-right quadrant of the HeroImage). Accepts `src` and position props. Uses Framer Motion `AnimatePresence` + `motion.div` for fade in/out.

**`src/components/image/CollisionText.tsx`**
Wraps a text node. Uses `useEffect` + `getBoundingClientRect` to compare its bounding box against the bounding boxes of the `HeroImage` and `PreviewImage` (passed as refs). Sets text color to `background` (`#fefffd`) when overlap is detected, `foreground` (`#1a1a1a`) otherwise. Re-runs on scroll, resize, and whenever the hovered item changes.

### Panels

**`src/components/panels/ProjectPanel.tsx`**
Right-side panel for detail pages. Receives a `PortfolioItem` with `link: 'internal'`. Renders: title (blue, `font-body bold`), date, description paragraphs. All text wrapped in `CollisionText`.

**`src/components/panels/CVPanel.tsx`**
Right-side panel for the CV route. Receives `cvData`. Renders: name (blue), DOB, bio paragraphs, "Download CV" button (triggers PDF via `<a download>`), "Message me: email" mailto link. All text wrapped in `CollisionText`.

---

## Page Compositions

### Home (`/`)
- `PageShell`
  - `Navbar` (active: Home)
  - `ItemList` (all items, hover state managed here)
  - `HeroImage` (portrait, `layoutId="hero"`)
  - `PreviewImage` (shown when a project is hovered)
  - `LocationTime`

### CV (`/cv`)
- `PageShell`
  - `Navbar` (active: CV)
  - `ItemList` (all items, hover state)
  - `HeroImage` (portrait, `layoutId="hero"`)
  - `PreviewImage`
  - `CVPanel`
  - `LocationTime`

### Project/Press/Award Detail (`/[category]/[slug]`)
- `PageShell`
  - `Navbar`
  - `ItemList` (all items, hover state)
  - `HeroImage` (item image, `layoutId="hero"`)
  - `PreviewImage` (overlays HeroImage when another item is hovered)
  - `ProjectPanel`
  - `LocationTime` (with back button on mobile)

---

## Behaviour

### Hover preview (desktop only)
Page-level state: `hoveredSlug: string | null`. `ItemList` bubbles hover events up. `PreviewImage` subscribes to this state and renders the corresponding image. On the detail page, `PreviewImage` renders in the overlay zone on top of `HeroImage`.

### Text–image collision
`CollisionText` components hold refs and measure overlap on every render cycle that could change geometry (hover change, scroll, resize). Switches between `foreground` and `background` color. Applied to: all `ListItem` titles and years, all `ProjectPanel` and `CVPanel` text, the `Navbar` links.

### Shared-element page transition
`HeroImage` carries `layoutId="hero"` and is wrapped in a Framer Motion `motion.img`. When navigating from Home to a detail page (or back), Framer Motion animates the image from its current position/size to the target. `AnimatePresence` wraps page content in `src/app/layout.tsx`.

### Mobile
- No hover/preview behaviour.
- `Navbar` collapses to hamburger → overlay menu.
- CV and Detail pages show `←` back button in `LocationTime` row.
- Image on CV mobile: stacked above text content, full width.
- Image on Detail mobile: stacked above panel, full width.

---

## Libraries

| Library | Purpose |
|---|---|
| `framer-motion` | Shared-element image transition, PreviewImage fade |
| `next` | Framework, App Router, Image optimisation |
| `tailwindcss` | Styling |
| `eslint` + `eslint-config-next` | Linting |

No other runtime dependencies.

---

## Conventions

- All styling via Tailwind utility classes. No separate CSS files except `globals.css` (font-face, CSS variables, base resets).
- TypeScript strict mode.
- No comments unless the reason is non-obvious.
- ESLint runs after every set of changes.
- `src/types/index.ts` is the single source of truth for shared types.
