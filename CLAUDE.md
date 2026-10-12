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
| `slate-light` → `slate-dark` (`bg-placeholder` gradient, shown wherever an image is missing) | `#444e55` → `#21272b` |

Font: `font-sans` → Helvetica Neue (system font, never self-hosted), falling back to Helvetica / Arial.

## Styling rules
- Tailwind utility classes only. No CSS modules, no styled-components.
- Only `globals.css` for: `@font-face`, CSS custom properties, Tailwind base/components/utilities.
- Theme tokens live in `tailwind.config.ts` and `globals.css` — use the tokens, not raw hex values in markup.

## Structure
```
src/
  app/
    (site)/      # public: /, products, [slug] (a product) + [slug]/{support,privacy,terms}, experience, experience/[slug], about, contact
    dashboard/   # protected CMS: Home, Products, Projects, Experience, Certificates, Pages
  components/
    layout/      # Navbar, MobileMenu, NavLink, BackToTop, ReadingShell (title + reading column)
    home/        # TileStrip
    stage/       # Stage + StageLayout (shared page layout), StageIndex (Experience/Products list)
    product/     # ProductDocView, productDocs
    dashboard/
  data/          # products.ts (seed until the first save), categories.ts, itemDates.ts
  lib/           # content.ts (blob-backed items, CV, products, home), home.ts, images.ts, text.ts, auth.ts
  types/         # index.ts (PortfolioItem, Product + shared types)
public/
  images/        # portrait.jpg, projects/, press/, awards/
```

## Data types
Portfolio data uses the `PortfolioItem` discriminated union; products use `Product`. Both from `src/types/index.ts`. Never add ad-hoc fields outside this type.

## Code style
- No comments unless the WHY is non-obvious.
- No unused variables, imports, or dead code.
- Prefer editing existing files over creating new ones.
- Mobile-first Tailwind (`md:` breakpoint for desktop-only behaviour).
