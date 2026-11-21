# Gianni Portfolio

## Stack
- Next.js 16 (App Router), TypeScript strict, Tailwind CSS, ESLint

## After every change
Run ESLint before reporting work as done:
```bash
yarn eslint src --ext .ts,.tsx
```

## Package manager
Yarn (classic v1), not npm. Use `yarn add`/`yarn install`; don't reintroduce `package-lock.json`.

## Theme — never deviate from these values

| Token | Value |
|---|---|
| `background` / inverted text | `#fffefc` |
| `foreground` text | `#000000` |
| `spray` (SprayText on the home portrait) | `#e85ed9` |
| `slate-light` → `slate-dark` (`bg-placeholder` gradient, shown wherever an image is missing) | `#444e55` → `#21272b` |

Font: `font-sans` → Helvetica Neue (system font, never self-hosted), falling back to Helvetica / Arial.
Command bar: `font-sf` → SF Pro via the Apple system stack (can't be served on the web), falling back to Helvetica Neue.
Spray text: `font-painterz` → Painterz (next/font/local, src/app/fonts; free for personal use only).
Wordmark: `font-caslon` → Libre Caslon Text Regular (next/font/google) for the site header name (SiteHeader: full name at the top, folds to "GMS" on scroll).

## Styling rules
- Tailwind utility classes only. No CSS modules, no styled-components.
- Only `globals.css` for: `@font-face`, CSS custom properties, Tailwind base/components/utilities.
- Theme tokens live in `tailwind.config.ts` and `globals.css` — use the tokens, not raw hex values in markup.

## Structure
```
src/
  app/
    (site)/      # public: /, work, work/[slug] (project or job), cv
  components/
    layout/      # NavLink (navLinkClass), SiteFooter (TextureWordmark + legal links), FaviconGleam (pulses light round the tab icon's rim), FlagSection (flags <html> with data-dark / data-footer while in view; `footer:` variant), CommandBar (sticky bottom search over lib/search.ts, menu opens nav above; `gleam` rim in globals.css)
    home/        # HomeHero (clock + intro stages: loader → header/nav (.intro-chrome) → devices fly in + ScrollCue → carousel) → MockupCarousel + devices (3D GLB mockups) + ScrollCue; SprayText + GooReveal (on useSprayTrigger; goo filter in lib/goo.ts)
    list/        # ItemList: ListPageTitle, ListSection, ItemRow (Work + CV lists)
    work/        # project page: DeviceRender (3D device per panel, screenshots from item.screens), BackLink
  data/          # all site content: items.ts, cv.ts, home.ts, work.ts (edit these to change content); categories.ts, itemDates.ts
  lib/           # content.ts (reads src/data), metadata.ts, search.ts (command bar search), logos.ts, goo.ts
  types/         # index.ts (PortfolioItem + shared types)
public/
  images/        # screens/ (device screenshots), brands/ (logos), about.jpg, white-texture.jpg
```

## Data types
Portfolio data uses the `PortfolioItem` discriminated union from `src/types/index.ts`. Never add ad-hoc fields outside this type.

## Code style
- No comments unless the WHY is non-obvious.
- No unused variables, imports, or dead code.
- Prefer editing existing files over creating new ones.
- Mobile-first Tailwind (`md:` breakpoint for desktop-only behaviour).
