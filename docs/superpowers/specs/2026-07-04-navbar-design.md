# Navbar Redesign

## Goal
Universal fixed navbar on every page: logo left, menu right, active-route underline, animated mobile menu, content-scroll fade under the bar.

## Components touched
- `src/components/layout/Navbar.tsx` — rewrite
- `src/components/layout/PageShell.tsx` — add top padding + fade layer
- `src/app/page.tsx` — remove duplicate "GIANNI" logo text (now owned by Navbar)

## Navbar structure
- `fixed top-0 left-0 right-0 z-50`, full width, `bg-background`, fixed height (`h-20`).
- Left: `GIANNI`, `font-title text-blue`, wrapped in `Link href="/"`.
- Right desktop (`md:flex`): `Home | CV` text links.
- Right mobile: hamburger button, hidden `md:hidden`.

## Active state
- `pathname === '/'` → underline Home.
- `pathname === '/cv'` → underline CV.
- Any other route (detail pages) → neither underlined. Links remain visible/clickable everywhere.

## Mobile menu
- Hamburger = 3 bars, animated via Framer Motion into an X on open (top bar rotate 45° + translate to center, bottom bar rotate -45° + translate to center, middle bar fade/scale out). True morph, not icon swap.
- Full-screen overlay menu fades in/out (`AnimatePresence`/`opacity`), shows Home/CV, closes on link click or X tap.

## Layout offset
- `PageShell` content wrapper gets `pt-20` (matches navbar height) so content starts below the fixed navbar on every page.

## Scroll fade
- Fixed gradient band directly below the navbar bar: `bg-gradient-to-b from-background to-transparent`, `pointer-events-none`, `z-40`, spanning roughly one navbar-height of extra room.
- Content scrolls up underneath and visually fades before disappearing under the solid bar. Pure CSS, no scroll listener.

## Out of scope
- No changes to LocationTime, ItemList, detail page content, or data files.
