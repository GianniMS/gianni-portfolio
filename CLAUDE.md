# Gianni Portfolio

## Stack
- Next.js 15 (App Router), TypeScript strict, Tailwind CSS, Framer Motion, ESLint

## After every change
Run ESLint before reporting work as done:
```bash
npx eslint src --ext .ts,.tsx
```

## Theme — never deviate from these values

| Token | Value |
|---|---|
| Background / inverted text | `#fefffd` |
| Foreground text | `#1a1a1a` |
| Blue (headings, links, accents) | `#0E3AFF` |

Fonts:
- `font-title` → AKIRA (self-hosted, `/public/fonts/AKIRA.woff2`) — logo only
- `font-body` → Helvetica Neue system stack — everything else

## Styling rules
- Tailwind utility classes only. No CSS modules, no styled-components.
- Only `globals.css` for: `@font-face`, CSS custom properties, Tailwind base/components/utilities.
- Theme tokens live in `tailwind.config.ts` and `globals.css` — use the tokens, not raw hex values in markup.

## Structure
```
src/
  app/           # Next.js routes
  components/
    layout/      # PageShell, Navbar, LocationTime
    list/        # ItemList, ListSection, ListItem
    image/       # HeroImage, PreviewImage, CollisionText
    panels/      # ProjectPanel, CVPanel
  data/          # items.ts, cv.ts
  types/         # index.ts (PortfolioItem + shared types)
public/
  fonts/         # AKIRA.woff2
  images/        # portrait.jpg, projects/, press/, awards/
```

## Data types
All item data uses the `PortfolioItem` discriminated union from `src/types/index.ts`. Never add ad-hoc fields outside this type.

## Code style
- No comments unless the WHY is non-obvious.
- No unused variables, imports, or dead code.
- Prefer editing existing files over creating new ones.
- Mobile-first Tailwind (`md:` breakpoint for desktop-only behaviour).
