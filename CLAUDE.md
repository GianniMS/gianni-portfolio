# Gianni Portfolio

## Stack
- Next.js 15 (App Router), TypeScript strict, Tailwind CSS, Framer Motion, ESLint

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
| Background / inverted text | `#fefffd` |
| Foreground text | `#1a1a1a` |
| Blue (headings, links, accents) | `#0E3AFF` |

Fonts:
- `font-title` → SF Pro Display system stack — GIANNI wordmark and display headings
- `font-body` → SF Pro Text system stack — everything else

SF Pro is never self-hosted (Apple licenses it for Apple platforms only). Both tokens
resolve to real SF Pro on Apple devices and fall back to Segoe UI / Roboto elsewhere.

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
  images/        # portrait.jpg, projects/, press/, awards/
```

## Data types
All item data uses the `PortfolioItem` discriminated union from `src/types/index.ts`. Never add ad-hoc fields outside this type.

## Code style
- No comments unless the WHY is non-obvious.
- No unused variables, imports, or dead code.
- Prefer editing existing files over creating new ones.
- Mobile-first Tailwind (`md:` breakpoint for desktop-only behaviour).
