# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Critical: Next.js version

This project uses **Next.js 16.2.9 + React 19.2**. The App Router APIs and conventions differ from older versions. Before writing framework code, consult the bundled guides in `node_modules/next/dist/docs/` rather than relying on prior knowledge (see AGENTS.md above).

## Commands

```bash
npm run dev     # start dev server at http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint (flat config, next/core-web-vitals + next/typescript)
```

There is no test suite. Verify changes by running `npm run dev` and inspecting the page in a browser; `npm run lint` is the only automated gate.

## Architecture

Single-page marketing/catalog site for **KAHF Treasure**, a Bangladeshi premium attar (perfume oil) shop. Content is primarily in **Bengali**. There is no backend, database, or CMS — the entire site is a static composition of one route.

- **Single route.** `src/app/page.tsx` is the whole site: it stacks `Navbar`, a series of home sections (`HeroSection` → `MostWantedSection` → `NewArrivalsSection` → `CollectionsSection` → `PackagesSection` → `ContactSection`), `Footer`, and floating widgets (`WhatsappFAB`, `ScrollObserver`). `layout.tsx` wires up fonts and rich SEO metadata; `loading.tsx` and `not-found.tsx` are the App Router convention files.

- **Data lives in `src/data/`, not in components.** `products.ts` exports typed product arrays (`featuredProducts`, `newArrivals`, `previousCollection`, `flowerCollection`) and `packages.ts` exports `packages`. Sections import these arrays and render them. **To change catalog content (products, prices, packages, stock status), edit these files** — do not hardcode product data in components. Prices are strings like `'300/-'` and volumes are strings like `'3ML'`; a product hidden from sale uses `stockout: true`, Bengali-script names set `isBengali: true`.

- **Server vs client components.** Everything is a Server Component by default. Only two files opt into `'use client'`: `HeroSection.tsx` (slider state) and `ContactForm.tsx` (form + EmailJS). `ScrollObserver.tsx` is also client (it uses `IntersectionObserver`). Keep new components server-side unless they need browser APIs or state.

- **Presentational UI primitives** live in `src/components/ui/`: `PremiumTable` and `ProductList` are two responsive renderings of the same `TableProduct[]` data (table vs. list layout), `SectionHeader`, `GlassPanel`, `PriceChip`, `WhatsappFAB`, `ScrollObserver`. Home sections in `src/components/home/` compose these.

- **Contact form** (`ContactForm.tsx`) submits via **EmailJS** directly from the browser using `NEXT_PUBLIC_EMAILJS_*` env vars (in `.env.local`). There is no server-side form handler. The subject dropdown is a custom `createPortal` listbox, not a native `<select>`.

## Styling conventions

- **Tailwind CSS v4** via `@import 'tailwindcss'` in `src/app/globals.css` — there is no `tailwind.config.js`. The design system (gold/dark palette, gradients, shadows, transitions) is defined as CSS custom properties in `globals.css`: brand tokens under `@theme inline` (e.g. `--color-gold-500`, `--color-dark-500`) and semantic tokens under `:root` (e.g. `--text-primary`, `--gradient-gold`, `--shadow-gold`). Reuse these variables instead of introducing new hex colors.
- Styling is done with **inline Tailwind arbitrary-value classes** referencing those variables, e.g. `text-[var(--color-gold-300)]`, `bg-[linear-gradient(...)]`. This is the established pattern — match it.
- Merge/compose class names with the `cn()` helper from `src/lib/utils.ts` (clsx + tailwind-merge).
- Scroll-reveal animations: add the `animate-on-scroll` class to an element; `ScrollObserver` adds `is-visible` when it enters the viewport (staggered). The animation itself is defined in `globals.css`.
- Fonts are loaded in `layout.tsx` via `next/font/google` and exposed as CSS variables: `--font-sans` (Plus Jakarta), `--font-display` (Cormorant), `--font-bengali` (Noto Serif Bengali), `--font-accent` (Outfit). Use `font-bengali` for Bengali text.

## Images

Remote images are allowed only from hosts whitelisted in `next.config.ts` (`i.ibb.co`, `coresg-normal.trae.ai`). Adding an image from a new host requires adding its `remotePatterns` entry there.

## Path alias

`@/*` maps to `src/*` (see `tsconfig.json`). Import with `@/components/...`, `@/data/...`, `@/lib/...`.
