# PROJECT_ANALYSIS.md

> **Document purpose:** A complete, implementation-ready analysis of the KAHF Treasure website, written so that another senior frontend developer (or an AI agent) can fully understand the project **before** any redesign or refactor. No code is changed by this document — it is analysis only.
>
> **Analyzed commit/state:** working tree on branch `master`, most source files staged as new (`A`) relative to the single existing commit `3188927 Initial commit from Create Next App`.
>
> **Date of analysis:** 2026-07-28.

> ⚠️ **Important framing note.** The section template supplied for this analysis (Portfolio, Projects, Skills, Experience, Research, Publications, Resume download) describes a **developer/personal portfolio site**. This project is **not** a portfolio — it is a **single-page e‑commerce catalog / price list for a Bangladeshi attar (perfume oil) & Islamic-products shop**. Where the template asks about portfolio-specific concepts, this document maps them to the nearest real equivalent (e.g. "Portfolio browsing" → "product/collection browsing", "Resume download" → *not applicable*) and says so explicitly instead of inventing content.

> 📸 **Screenshots:** No screenshot assets are stored in the repository, so none can be referenced directly. One prior visual-debugging record exists — `debug-hero-banner-missing.md` — which describes hero-banner rendering states in text; it is cited where relevant. Any future screenshots should be dropped into `public/` or a new `docs/screenshots/` folder and linked from here.

---

# 1. Project Overview

## Purpose of the website
A **single-page marketing + price-list site** for **KAHF Treasure**, a Bangladeshi retailer of premium attar (perfume oils), honey, Islamic books, and other Islamic products. The primary goal is **lead generation / direct ordering** rather than on-site checkout: the site showcases products with prices per volume (3ML / 6ML / 12ML / 24ML / 50ML) and funnels users to **WhatsApp, Facebook, email, or a contact form** to place orders. There is no cart, no payment, and no user accounts.

## Target audience
- **Bengali-speaking consumers in Bangladesh** (primary language of content is Bengali; `<html lang="bn">`, `openGraph.locale = 'bn_BD'`).
- Buyers of fragrance/attar interested in "designer-inspired" scents (e.g. "Blue De Channel", "212 NYC", "Dior Arabia") at accessible price points.
- Mobile-first shoppers who transact over WhatsApp/Facebook Messenger — the dominant commerce channel for small BD retailers.

## Current technology stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | Next.js (App Router) | `16.2.9` | ⚠️ Newer than most training data — APIs may differ (see `AGENTS.md`). Bundled docs live in `node_modules/next/dist/docs/`. |
| UI library | React | `19.2.4` | React 19; Server Components by default. |
| Language | TypeScript | `^5` | `strict: true`, `noEmit`, bundler resolution. |
| Styling | Tailwind CSS | `^4` | v4 config-less setup via `@import 'tailwindcss'` — **no `tailwind.config.js`**. |
| PostCSS | `@tailwindcss/postcss` | `^4` | See `postcss.config.mjs`. |
| Icons | `lucide-react` | `^1.22.0` | Used sparingly (Mail, Send, ChevronDown, status icons). |
| Class utilities | `clsx` + `tailwind-merge` | `^2.1.1` / `^3.6.0` | Combined in `cn()` helper (`src/lib/utils.ts`). |
| Variants | `class-variance-authority` | `^0.7.1` | ⚠️ **Declared but never used** anywhere in `src/`. |
| Email | `@emailjs/browser` | `^4.4.1` | Client-side form submission (no backend). |
| Hosting | Vercel | — | `.vercel` dir + `metadataBase` → `https://kahf-treasure.vercel.app`. |
| Fonts | `next/font/google` | — | Plus Jakarta Sans, Cormorant Garamond, Noto Serif Bengali, Outfit. |

## Folder structure summary

```
kahf-treasure/
├── AGENTS.md                     # "This is NOT the Next.js you know" — version warning
├── CLAUDE.md                     # imports AGENTS.md + project guidance for AI agents
├── README.md                     # default create-next-app readme (not customized)
├── debug-hero-banner-missing.md  # historical debug log for a hero-opacity bug (RESOLVED)
├── index.html                    # ⚠️ 89 KB static HTML — legacy/standalone artifact, NOT used by Next.js
├── next.config.ts                # image remotePatterns only
├── eslint.config.mjs             # flat config: next/core-web-vitals + next/typescript
├── postcss.config.mjs
├── tsconfig.json                 # @/* → ./src/*
├── .env.local                    # EmailJS keys + Vercel OIDC token (⚠️ tracked; see §11)
├── public/                       # ⚠️ only default CNA SVGs (file/globe/next/vercel/window) — all unused
├── আতরের বিক্রয় মূল্য & Attar Plan from chatgpt.docx   # source content doc (untracked)
└── src/
    ├── app/
    │   ├── layout.tsx            # fonts, metadata, <html>/<body>
    │   ├── page.tsx              # the ONLY route — composes all sections
    │   ├── globals.css           # design tokens + base styles + animations
    │   ├── loading.tsx           # route-level loading spinner
    │   ├── not-found.tsx         # 404 page
    │   └── favicon.ico
    ├── components/
    │   ├── home/                 # page sections (Hero, MostWanted, NewArrivals, Collections, Packages, Contact, ContactForm)
    │   ├── layout/               # Navbar, Footer
    │   └── ui/                   # GlassPanel, PremiumTable, PriceChip, ProductList, ScrollObserver, SectionHeader, WhatsappFAB
    ├── data/
    │   ├── products.ts           # featuredProducts, newArrivals, previousCollection, flowerCollection
    │   └── packages.ts           # packages (currently 1 VIP package)
    └── lib/
        └── utils.ts              # cn() helper
```

## Routing structure
- **App Router**, single route only: `/` → `src/app/page.tsx`.
- Convention files: `layout.tsx` (root layout), `loading.tsx` (Suspense fallback), `not-found.tsx` (404).
- **No** `sitemap.ts`, `robots.ts`, `manifest.ts`, route groups, dynamic routes, API routes, or nested layouts.
- In-page navigation is **hash-anchor based** (`#most-wanted`, `#new-arrivals`, `#collections`, `#packages`, `#contact`) — there are no separate pages, so "routing" is really smooth-scroll anchoring.

## Main frameworks
Next.js 16 (App Router) + React 19. Rendering is effectively **static** — the page has no server data fetching; everything renders from local `src/data/*` arrays. Only three components opt into client rendering.

## Build tools
- `next dev` / `next build` / `next start` (see `package.json` scripts).
- `eslint` via flat config (`eslint.config.mjs`). **No test runner, no Prettier config, no Husky/lint-staged, no CI config** in-repo.
- Tailwind v4 processed through PostCSS.

## Important dependencies
See the stack table above. The dependencies that materially shape architecture: **`@emailjs/browser`** (defines the entire contact/order pipeline as client-side), **`next/font/google`** (four font families → four CSS variables), and **`lucide-react`** (icons). `class-variance-authority` is dead weight and should be removed or adopted.

---

# 2. Existing Pages

There is exactly **one page** (`/`). It is a long vertical scroll composed of sections. Below, each *section* is treated as a "page" per the template's intent, since each behaves like a distinct screen region with its own purpose. Composition order is defined in `src/app/page.tsx`:

```
ScrollObserver → Navbar → main[ Hero → MostWanted → NewArrivals → Collections → Packages → Contact ] → Footer → WhatsappFAB
```

### 2.0 Route `/` (the whole site)

| Attribute | Detail |
|---|---|
| Route | `/` (`src/app/page.tsx`) |
| Purpose | Present the brand, showcase products/prices, and drive contact/orders. |
| Top-level components | `ScrollObserver`, `Navbar`, `HeroSection`, `MostWantedSection`, `NewArrivalsSection`, `CollectionsSection`, `PackagesSection`, `ContactSection`, `Footer`, `WhatsappFAB` |
| Rendering | Server component shell; client islands = `Navbar`, `HeroSection`, `ContactForm`, `ScrollObserver`. |

---

### 2.1 Hero — `#hero`
- **File:** `src/components/home/HeroSection.tsx` (`'use client'`)
- **Purpose:** Brand introduction + primary CTAs; auto-rotating image slider.
- **Components used:** `next/image`, `next/link`, local `heroSlides` array (3 slides).
- **Current UI layout:** Two-column grid on `lg` (`grid-cols-[1fr_1.1fr]`). Left column: logo image, decorative divider, Bengali H1 ("আতরের বিক্রয় মূল্য তালিকা"), tagline, description, two CTA buttons ("Explore Collection", "Contact Us"), and a 3-item stat row (50+ / 100% / 64). Right column: an aspect-ratio slider card with image, gradient overlay, eyebrow/title/description, prev/next buttons, and progress dots. Ambient blurred gold glow blobs behind.
- **Current UX:** Auto-advances every 5s (`setInterval`), manual prev/next + dot navigation. Smooth 1s crossfade with slight scale. First image `priority`, all `unoptimized`.
- **Problems:**
  - Slider images are generated on the fly from `coresg-normal.trae.ai/api/ide/v1/text_to_image?...` — a **Trae IDE image-generation endpoint**, not a stable CDN. These are marked `unoptimized` and are a **fragility/branding risk** (may 404, rate-limit, or change; not real product photos). This is the same subsystem that caused the historical bug in `debug-hero-banner-missing.md`.
  - **No autoplay pause on hover/focus** and **no `prefers-reduced-motion` handling** → accessibility + UX concern.
  - Slider has no swipe/touch gesture support on mobile (buttons only).
  - Stats ("64 Districts", "100% Trusted Quality") are **unsubstantiated marketing claims** with no source.
  - Prev/next use literal `←`/`→` glyphs instead of icons (visual inconsistency with the rest of the icon system).
  - H1 text ("বিক্রয় মূল্য তালিকা" = "sales price list") duplicates the intent of the sections below; hero doesn't sell the brand story.
- **Opportunities:** Replace generated images with real optimized product photography; add reduced-motion + hover-pause; add swipe; make stats real or remove; unify arrows with `lucide-react` (`ArrowLeft/Right`); consider a stronger value proposition headline.

### 2.2 Most Wanted — `#most-wanted`
- **File:** `src/components/home/MostWantedSection.tsx` (server)
- **Purpose:** Highlight 4 featured products with descriptions + full price ranges.
- **Components used:** `SectionHeader`, `GlassPanel`, `PriceChip`, data `featuredProducts`.
- **Current UI layout:** `SectionHeader` then a responsive grid (1 / 2 / 4 cols). Each card = product name (display font), Bengali description, and a grid of `PriceChip`s (grid switches to 3 cols when a product has 5 prices).
- **Current UX:** Hover lifts card, brightens border, animates a radial glow, expands letter-spacing on the title.
- **Problems:** Only 4 products are "featured" and they are hardcoded in `featuredProducts` (no visual/marketing rationale documented). Cards have no image — pure text, which weakens a *fragrance* product (scent sells visually/emotionally). The `grid-cols-3 vs grid-cols-2 md:grid-cols-4` branching by price count is a subtle layout inconsistency between cards.
- **Opportunities:** Add product imagery/scent-family badges; standardize the price-chip grid; add a "most wanted" ranking indicator or social proof.

### 2.3 New Arrivals — `#new-arrivals`
- **File:** `src/components/home/NewArrivalsSection.tsx` (server)
- **Purpose:** Full price list of new products (21 items in `newArrivals`).
- **Components used:** `SectionHeader`, `GlassPanel`, `ProductList`, data `newArrivals`.
- **Current UI layout:** Single `GlassPanel` wrapping a `ProductList` (row-per-product list with name, optional Bengali description, and 3 price columns).
- **Current UX:** Zebra striping, hover row highlight. Only the first 3 price tiers (`prices.slice(0,3)`) are shown even if the product has 4–5 tiers.
- **Problems:** **Data loss in the UI** — `ProductList` renders only 3ML/6ML/12ML, so 24ML/50ML prices present in `featuredProducts`/data are invisible here (acceptable for `newArrivals` which mostly have 3, but the component is not future-proof). No sorting, no filtering, no search across ~21 items. Long list on mobile with no sticky header.
- **Opportunities:** Sticky column header on scroll; search/filter/sort; show all available volumes; "Stockout" items could be de-emphasized or moved.

### 2.4 Collections — `#collections`
- **File:** `src/components/home/CollectionsSection.tsx` (server)
- **Purpose:** Two side-by-side price lists: "Previous Collection" (9 items) and "ফুলের রাজ্য / Flower Kingdom" (12 items).
- **Components used:** `GlassPanel`, `ProductList`, data `previousCollection` + `flowerCollection`. **Note:** does *not* use `SectionHeader` — it uses a bespoke inline heading + gradient rule (design inconsistency).
- **Current UI layout:** 2-col grid on `lg`, stacked on mobile; each column has its own heading and a `GlassPanel`+`ProductList`.
- **Current UX:** Same list interactions as New Arrivals.
- **Problems:** The section has **no top-level `SectionHeader`** (unlike every other section), so visual hierarchy is inconsistent — it looks like two orphan sub-sections rather than one "Collections" block. The two headings use different fonts (`font-display` uppercase vs `font-bengali`) without a shared pattern.
- **Opportunities:** Wrap in a consistent `SectionHeader`; unify the two sub-headings into a documented "collection heading" pattern.

### 2.5 Packages — `#packages`
- **File:** `src/components/home/PackagesSection.tsx` (server)
- **Purpose:** Show curated bundle deals. Currently **only 1 package** (`packages` array has a single VIP entry).
- **Components used:** `SectionHeader`, `GlassPanel`, data `packages`. Includes an inline `isBengaliText()` regex helper to pick the font per item.
- **Current UI layout:** 2-col grid intended for multiple packages, but with one VIP item that spans full width (`lg:col-span-2`) with a 2-col item list.
- **Current UX:** Hover glow + border; VIP styling (gold gradient price pill, diamond bullets).
- **Problems:** Grid is built for many packages but only one exists → the "grid" reads as a single oversized card, wasting the layout. The `isBengaliText()` helper duplicates logic that also exists implicitly via the data's `isBengali` flag elsewhere (inconsistent approach to Bengali detection). Package items are plain strings (no per-item price/volume context).
- **Opportunities:** Add more packages or switch to a single-card layout; centralize Bengali-script detection; enrich package items with the referenced products' prices.

### 2.6 Contact — `#contact`
- **Files:** `src/components/home/ContactSection.tsx` (server) + `src/components/home/ContactForm.tsx` (`'use client'`)
- **Purpose:** Provide contact channels (WhatsApp, Facebook, Email) and an order/inquiry form.
- **Components used:** `SectionHeader`, inline contact cards (with inline SVGs), `ContactForm`, `lucide-react` `Mail`.
- **Current UI layout:** 3 contact cards (WhatsApp / Facebook / Email), then a centered `ContactForm` card (name, email, phone, custom subject dropdown, message, submit).
- **Current UX:** EmailJS `sendForm` submission with `idle/loading/success/error` states and inline feedback. Custom accessible-ish listbox for subject via `createPortal`.
- **Problems:**
  - **EmailJS keys are `NEXT_PUBLIC_*`** → exposed to the client by design (unavoidable with EmailJS, but there is **no spam protection / rate limiting / captcha**, so the form is abusable).
  - The custom `SubjectSelect` reimplements a native `<select>` with manual portal positioning (`top = rect.top - listHeight`) — it **always opens upward** and recomputes on toggle only; on small screens or near viewport edges it can misposition. Keyboard support is limited (no arrow-key navigation / type-ahead).
  - Success/error colors are ad-hoc (`text-green-400`, `--red-accent`) rather than tokenized.
  - No inline field validation messaging beyond native `required`.
- **Opportunities:** Add captcha/honeypot; replace or harden the custom select (keyboard nav, edge-aware positioning, native fallback); tokenize status colors; add field-level validation.

---

# 3. Components

Reusable components live in `src/components/ui/` (primitives) and `src/components/layout/`. Section components in `src/components/home/` are **page-specific compositions**, not reusable primitives, but are included for completeness.

### 3.1 UI primitives (`src/components/ui/`)

| Component | File | Props | Client? |
|---|---|---|---|
| `GlassPanel` | `GlassPanel.tsx` | `React.HTMLAttributes<HTMLDivElement>` (spreads `className`, `children`, `...props`) | No |
| `SectionHeader` | `SectionHeader.tsx` | `{ title: React.ReactNode; id?: string } & HTMLAttributes` (omits native `title`) | No |
| `PriceChip` | `PriceChip.tsx` | `{ volume: string; price: string }` | No |
| `ProductList` | `ProductList.tsx` | `{ products: TableProduct[]; ariaLabel: string }` | No |
| `PremiumTable` | `PremiumTable.tsx` | `{ products: TableProduct[]; ariaLabel: string; isCompact?: boolean }` | No |
| `ScrollObserver` | `ScrollObserver.tsx` | none | **Yes** |
| `WhatsappFAB` | `WhatsappFAB.tsx` | none | No |

#### `GlassPanel`
- **Purpose:** Reusable "glassmorphism" card container (gradient bg, gold border, blur, hover-lift). The visual backbone of most sections.
- **Props:** Full div attribute passthrough + `className` merged via `cn()`. Highly flexible.
- **Dependencies:** `cn` (`@/lib/utils`).
- **Reusability:** ★★★★★ — used by MostWanted, NewArrivals, Collections, Packages.
- **Design consistency:** Strong; the single source of the card look. **However**, the Contact cards in `ContactSection.tsx` and the `ContactForm` card **reimplement the same glass styles inline instead of using `GlassPanel`** — duplication and drift risk.
- **Possible improvements:** Adopt `GlassPanel` in Contact; expose variants (e.g. `interactive`/`static`, `vip`) rather than long `className` overrides.

#### `SectionHeader`
- **Purpose:** Centered uppercase gold heading flanked by gradient rules.
- **Props:** `title`, optional `id` (for `aria-labelledby`).
- **Dependencies:** `cn`.
- **Reusability:** ★★★★☆ — used by MostWanted, NewArrivals, Packages, Contact. **Not** used by Collections (inconsistency, see §2.4).
- **Design consistency:** Good where used; the exception in Collections breaks the pattern.
- **Possible improvements:** Support an optional subtitle/eyebrow and a Bengali-heading variant so Collections can adopt it.

#### `PriceChip`
- **Purpose:** Small volume+price tile used inside Most Wanted cards.
- **Props:** `volume`, `price` (both strings).
- **Reusability:** ★★★☆☆ — only used in `MostWantedSection`.
- **Design consistency:** Uses `--gold-400` (see **token bug** in §4) rather than `--color-gold-400`.
- **Possible improvements:** Fix token reference; reuse in `ProductList` price columns for a single price-display primitive.

#### `ProductList`
- **Purpose:** Row-based price list (name + optional description + 3 price columns).
- **Props:** `products: TableProduct[]`, `ariaLabel`.
- **Dependencies:** `TableProduct` type from `@/data/products`.
- **Reusability:** ★★★★☆ — used by NewArrivals + Collections (×2).
- **Design consistency:** Good. Uses `role="list"/"listitem"` semantics.
- **Possible improvements:** Only shows `prices.slice(0,3)`; hardcodes the `3 ML / 6 ML / 12 ML` header regardless of actual data volumes → **can mislabel** if a product's tiers differ. Should derive columns from data.

#### `PremiumTable` ⚠️
- **Purpose:** A `<table>` rendering of the same `TableProduct[]` data, with a "ঘ্রাণ কেমন?" (scent description) column and `isCompact` mode.
- **Props:** `products`, `ariaLabel`, `isCompact?`.
- **Reusability / status:** **DEAD CODE** — `PremiumTable` is **never imported anywhere** in `src/` (verified). It appears to be a superseded alternative to `ProductList`.
- **Possible improvements:** Either delete it, or consolidate: the project has **two components doing the same job** (`PremiumTable` table vs `ProductList` list). Pick one, or make `ProductList` render `PremiumTable`'s description column so the richer data (`description`, `subtext`) is actually shown.

#### `ScrollObserver`
- **Purpose:** Adds `is-visible` to `.animate-on-scroll` elements as they enter the viewport (staggered by index), with a `MutationObserver` to catch dynamically added nodes.
- **Props:** none; renders `null`.
- **Reusability:** ★★★★☆ — one global instance mounted in `page.tsx`.
- **Design consistency:** Fine.
- **Possible improvements:** The `MutationObserver` on `document.body { subtree: true }` fires on **every DOM mutation site-wide** (including the hero slider's 5s interval and Navbar scroll state) → unnecessary churn. Also no `prefers-reduced-motion` opt-out. The stagger via `index * 100ms` is based on observer callback order, not document order, so stagger can look arbitrary.

#### `WhatsappFAB`
- **Purpose:** Fixed floating WhatsApp button (bottom-right).
- **Props:** none. Hardcoded phone number `8801681253714`.
- **Reusability:** ★★★☆☆ (single-purpose).
- **Possible improvements:** Hardcoded number duplicated in `ContactSection` and `Footer` → centralize contact constants. No entrance animation / no "has-scrolled" reveal.

### 3.2 Layout components (`src/components/layout/`)

#### `Navbar` (`Navbar.tsx`, `'use client'`)
- **Purpose:** Fixed top nav with scroll-aware background, brand wordmark, hash links, and a mobile hamburger→fullscreen menu.
- **Props:** none.
- **Dependencies:** `cn`, `next/link`, React state (`scrolled`, `menuOpen`).
- **Reusability:** Single instance.
- **Design consistency:** Good gold/dark language. Uses `role="menubar"/"menuitem"` semantics.
- **Possible improvements:**
  - **No active-section highlighting** (no scrollspy) — users can't tell where they are.
  - Mobile menu does **not lock body scroll** when open and has **no focus trap / Esc-to-close**.
  - The scroll listener sets state on every scroll above 40px (fine) but there's no active-link logic tying into `ScrollObserver`.
  - Logo link is `href="#"` (jumps to top but is a non-semantic anchor; `href="#hero"` or `/` would be cleaner).

#### `Footer` (`Footer.tsx`, server)
- **Purpose:** Brand mark, tagline, social links (Facebook/WhatsApp/Email), copyright, developer credit.
- **Props:** none.
- **Design consistency:** Good; consistent with brand.
- **Possible improvements:** Inline SVGs duplicate the ones in `ContactSection`/`WhatsappFAB` → extract a `SocialIcon`/icon set. No quick links / sitemap. Contact info hardcoded again (third copy).

### 3.3 Section components (`src/components/home/`)
`HeroSection`, `MostWantedSection`, `NewArrivalsSection`, `CollectionsSection`, `PackagesSection`, `ContactSection`, `ContactForm`. These are **compositions**, analyzed per section in §2. Reusability is intentionally low (page-specific). The main cross-cutting issue is **duplicated card/glass styling and duplicated contact constants** across them.

---

# 4. Current Design System

The design system is **token-driven via CSS custom properties** defined in `src/app/globals.css`, consumed through Tailwind v4 arbitrary-value classes (e.g. `text-[var(--color-gold-300)]`). There is no `tailwind.config.js`; brand colors are registered under `@theme inline` and semantic tokens under `:root`.

### Typography
| Role | Font | CSS var | Loaded in |
|---|---|---|---|
| Body / sans | Plus Jakarta Sans | `--font-sans` | `layout.tsx` |
| Display / serif | Cormorant Garamond | `--font-display` | `layout.tsx` |
| Bengali | Noto Serif Bengali | `--font-bengali` | `layout.tsx` |
| Accent (labels/eyebrows) | Outfit | `--font-accent` | `layout.tsx` |

- Default body class is `font-bengali` (set on `<html>`), appropriate for a Bengali-first audience.
- Headings mix `font-display` (English section titles) and `font-bengali` (Bengali headings).
- **Issue:** Font-size scale is entirely **ad-hoc arbitrary values** (`text-[1.4rem]`, `text-[0.65rem]`, `text-[clamp(2.2rem,5vw,5rem)]`, etc.) repeated inline across files. There is **no typographic scale** (no `text-sm/base/lg` system, no documented step ratio) → inconsistent sizes and hard maintenance.

### Spacing
- Sections use a consistent `py-20` + `container mx-auto px-4 max-w-7xl` rhythm (good baseline).
- **Issue:** Inner spacing is arbitrary and inconsistent (`mb-[24px]`, `gap-[28px]`, `p-[6px]`, `pt-[100px]`, `mb-[18px]`) — pixel values interleaved with Tailwind scale values. No spacing token system.

### Colors
Defined in `globals.css`:
- **Gold ramp:** `--color-gold-100 … --color-gold-800` (`#FDF6E3` → `#544520`).
- **Dark ramp:** `--color-dark-50 … --color-dark-500` (`#262626` → `#060606`).
- **Semantic:** `--text-primary #EDEDED`, `--text-secondary #A0A0A0`, `--text-muted #606060`, `--red-accent #E55B5B`, `--red-bg`.
- **Gradients/shadows:** `--gradient-gold`, `--gradient-card`, `--shadow-gold`, `--shadow-gold-hover`.
- ⚠️ **Token bug:** Several components reference **non-existent** variables — `--gold-300` and `--gold-400` (e.g. in `PriceChip.tsx`, `PremiumTable.tsx`, `PackagesSection.tsx`). The defined tokens are `--color-gold-300/400`. These resolve to *nothing* (the CSS var is undefined), so those elements fall back to `currentColor`/inherited color. This is a **real, shipping bug** worth fixing early.
- Raw hex/`rgba()` values (e.g. `rgba(201,168,76,...)`, `#080604`, `rgba(212,175,55,...)`) are scattered inline rather than tokenized. Note `#C9A84C` (gold-500) vs `#D4AF37` (`212,175,55`) are **two slightly different golds** used interchangeably → subtle inconsistency.

### Icons
- `lucide-react` for `Mail`, `Send`, `CheckCircle`, `AlertCircle`, `Loader2`, `ChevronDown`.
- **Inline hand-written SVGs** for WhatsApp and Facebook (brand glyphs not in lucide) — duplicated in `ContactSection`, `Footer`, `WhatsappFAB`.
- **Inconsistency:** Hero slider uses text arrows `←`/`→` instead of icons.

### Animations
Defined in `globals.css`: `fadeInUp`, `shimmer`, `pulse-glow`, and the `.animate-on-scroll`→`.is-visible` reveal (opacity + translateY, 0.7s). Transitions use tokens `--transition-base` (0.4s) and `--transition-spring` (0.6s spring curve).
- **Issues:** No `prefers-reduced-motion` support anywhere (reveal, hero autoplay, hover transforms). Reveal is applied at the **section** granularity only (`animate-on-scroll` on each `<section>`), so entire sections fade in as one block rather than staggered children.

### Buttons
- No `Button` component exists. Buttons are ad-hoc: Hero CTAs (pill, gold gradient / ghost), Navbar CTA (gold pill), ContactForm submit (gold gradient, state-driven label), 404 return button. Each restyles from scratch → **no button system**, inconsistent padding/radius/typography.

### Cards
- `GlassPanel` is the canonical card, but Contact cards + form reimplement it inline. VIP package card is a bespoke variant.

### Navbar
- See §3.2. Fixed, scroll-aware, mobile fullscreen menu. Missing scrollspy, focus trap, body-scroll lock.

### Footer
- See §3.2. Clean, brand-consistent, but duplicates icons/contact info.

### Forms
- Single form (`ContactForm`). Shared `inputClass` string for consistent inputs (good local pattern). Custom portal-based subject select. No validation system, no captcha.

### Responsive behavior
- Mobile-first with `sm/md/lg` breakpoints. Grids collapse sensibly (4→2→1). Hero switches to single column and adjusts aspect ratios. Tables/lists rely on `overflow-x-auto` (`PremiumTable`) or compact columns (`ProductList`).
- **Issues:** Heavy reliance on arbitrary responsive font sizes; some very small text on mobile (`text-[0.55rem]`, `text-[0.45rem]` stockout badge) risks legibility. No explicit tablet-tuned layout (jumps `md`→`lg`).

### Dark mode
- The site is **dark-only by design** (dark bg, gold accents). `globals.css` declares `@custom-variant dark (&:is(.dark *))` and `layout.tsx` sets `suppressHydrationWarning`, but there is **no theme toggle and no light theme** — the `dark` variant is effectively unused. So "dark mode" = the only mode.

### Accessibility
- **Good:** semantic landmarks (`<nav>`, `<main>`, `<header>`, `<footer role="contentinfo">`), `aria-label`/`aria-labelledby` on sections and controls, `aria-hidden` on decorative elements, `role="list"` semantics, focus-visible not obviously removed.
- **Gaps:** no `prefers-reduced-motion`; hero autoplay can't be paused; custom select has limited keyboard support; mobile menu lacks focus trap/Esc; tiny font sizes; color-contrast of `--text-muted #606060` on near-black may fail WCAG AA for small text; no skip-to-content link.

### Visual hierarchy
- Strong section-title treatment (`SectionHeader`) creates clear anchors — except Collections (no `SectionHeader`). Hero is visually dominant. Within lists, price emphasis is good. Overall hierarchy is **good but inconsistent** at the Collections seam and in the packages single-card layout.

### Consistency
- **Biggest systemic weakness.** Token bugs (`--gold-*` vs `--color-gold-*`), two golds (`#C9A84C` vs `#D4AF37`), duplicated card/contact/icon code, ad-hoc type/spacing scales, and one section skipping `SectionHeader`. The brand *look* is consistent to the eye, but the *implementation* has drift that will compound during a redesign.

---

# 5. User Flow

> Template terms mapped to this site: **Portfolio browsing → product/collection browsing; Project details → (n/a, no product detail pages); Resume download → NOT APPLICABLE (this is a shop, not a portfolio).**

### Landing page
User lands on `/`. Hero immediately shows brand logo, Bengali headline, tagline, two CTAs, and an auto-rotating slider. `loading.tsx` (crown + gold spinner) may flash during route load.

### Navigation
Fixed `Navbar` with hash links (Most Wanted, New Arrivals, Collections, Packages, যোগাযোগ). Clicking smooth-scrolls (via `html { scroll-behavior: smooth }`). On mobile, hamburger opens a fullscreen menu.

### Scrolling experience
Sections reveal via `ScrollObserver` (fade + rise). Navbar background solidifies after 40px. Ambient gold glows and a global noise texture (`body::before`) add atmosphere.

### "Portfolio" browsing → Product/collection browsing
User scrolls through Most Wanted (cards) → New Arrivals (list) → Collections (two lists) → Packages. Browsing is **read-only**: no filtering, sorting, search, or detail view. To act, the user must jump to Contact or the WhatsApp FAB.

### "Project details" → Product details
**None.** There are no per-product pages or modals. All info (name, prices, short Bengali scent description) is inline in lists/cards. A user wanting more detail (notes, longevity, images) has no path except contacting.

### Contact flow
User reaches `#contact` (via nav CTA, hero "Contact Us", or scrolling). Three channel cards (WhatsApp/Facebook/Email) + a form. Form submits via EmailJS with success/error feedback. The persistent WhatsApp FAB offers a shortcut from anywhere.

### Resume download
**Not applicable** — no resume/CV concept in an e-commerce catalog.

### Call-to-actions
- Primary: "Explore Collection" (hero → `#most-wanted`), "যোগাযোগ"/"Contact Us" (→ `#contact`), WhatsApp FAB, and the three contact cards.
- CTAs are clear but **all roads lead to "contact us"** — there is no in-page "order this item" affordance tied to a specific product (user must manually tell the seller which scent/volume they want).

### Where users may become confused
1. **No product→order linkage:** a user who likes "212 NYC 6ML" must remember it and re-type it into WhatsApp/form; the form's subject options are generic ("Order Inquiry", etc.).
2. **No active-nav indicator:** on a long single page, users lose their place.
3. **Collections lacks a clear section title**, so its two lists can feel disconnected from the page structure.
4. **Stockout items** appear inline in lists and could be mistaken as orderable.
5. **Hero slider images** are decorative/generated and don't correspond to actual purchasable products, which may set inaccurate expectations.
6. **Prices lack currency clarity** for non-locals (`300/-` implies BDT Taka but is never labeled).

---

# 6. Strengths

| Area | Assessment |
|---|---|
| **Performance** | Mostly static; Server Components by default; only 3 client islands. Fonts via `next/font` (self-hosted, no layout shift). Minimal JS. |
| **Code organization** | Clear separation: `app/` routes, `components/{home,layout,ui}`, `data/`, `lib/`. Data is decoupled from presentation (`src/data/*`) — editing catalog doesn't touch components. |
| **Animations** | Tasteful, on-brand reveal + hover micro-interactions; consistent transition tokens; not gratuitous. |
| **Accessibility (baseline)** | Good semantic HTML, ARIA labels, landmark roles, `aria-hidden` on decoration, list semantics. Above average for a small-shop site. |
| **SEO** | **Excellent metadata** in `layout.tsx`: localized title/description, keywords, OpenGraph, Twitter card, robots directives, icons, `metadataBase`, `lang="bn"`, `locale="bn_BD"`. |
| **Responsiveness** | Sensible mobile-first grid collapses; fluid hero typography via `clamp()`. |
| **Clean components** | Small, focused, typed components; `GlassPanel`/`SectionHeader` show good abstraction instinct; `cn()` helper is idiomatic. |
| **UX (channel fit)** | Correctly optimizes for WhatsApp/Facebook commerce, the right pattern for the BD market. |
| **Modern UI** | Cohesive premium gold-on-dark aesthetic, glassmorphism, gradients, noise texture — looks high-end. |
| **Type safety** | Shared `TableProduct`/`FeaturedProduct`/`Package` interfaces; `strict` TS. |

---

# 7. Weaknesses

| # | Category | Issue | Where |
|---|---|---|---|
| 1 | **Design token bug** | References to undefined `--gold-300`/`--gold-400` (correct names are `--color-gold-*`) → styles silently fall back. | `PriceChip.tsx`, `PremiumTable.tsx`, `PackagesSection.tsx` |
| 2 | **Color inconsistency** | Two golds used interchangeably: `#C9A84C` (token) vs `#D4AF37` (`rgba(212,175,55)`). | Multiple files |
| 3 | **Dead code** | `PremiumTable` never imported; `class-variance-authority` never used. | `ui/PremiumTable.tsx`, `package.json` |
| 4 | **Code duplication** | Glass-card styles reimplemented instead of `GlassPanel`; contact phone/links hardcoded in 3 places; WhatsApp/Facebook SVGs duplicated 2–3×. | `ContactSection.tsx`, `Footer.tsx`, `WhatsappFAB.tsx` |
| 5 | **No design scale** | Typography & spacing are ad-hoc arbitrary values everywhere; no scale system. | All components |
| 6 | **No button/system components** | Every button/card variant restyled inline. | Hero, Navbar, ContactForm, 404 |
| 7 | **Visual inconsistency** | Collections skips `SectionHeader`; hero uses text arrows vs icon system. | `CollectionsSection.tsx`, `HeroSection.tsx` |
| 8 | **Data-vs-UI mismatch** | `ProductList` shows only 3 fixed volumes with hardcoded `3/6/12 ML` header, ignoring 24/50ML and real volume labels. | `ProductList.tsx` |
| 9 | **Animation** | No `prefers-reduced-motion`; hero autoplay can't pause; site-wide `MutationObserver` churn. | `ScrollObserver.tsx`, `HeroSection.tsx` |
| 10 | **Hero image fragility** | Slides pulled from a Trae IDE text-to-image endpoint (`coresg-normal.trae.ai`), `unoptimized`, not real products; historically caused a visual bug. | `HeroSection.tsx`, `next.config.ts`, `debug-hero-banner-missing.md` |
| 11 | **Accessibility gaps** | No focus trap/Esc/body-lock on mobile menu; limited keyboard nav in custom select; tiny fonts (`0.45–0.55rem`); `--text-muted` contrast risk; no skip link. | `Navbar.tsx`, `ContactForm.tsx`, various |
| 12 | **Form abuse risk** | Public EmailJS keys with no captcha/honeypot/rate-limit. | `ContactForm.tsx` |
| 13 | **Empty/whitespace** | Packages grid built for many, holds one → oversized empty-feeling card. | `PackagesSection.tsx` |
| 14 | **No product detail / ordering link** | Users can't act on a specific item; must re-type into contact. | Whole flow |
| 15 | **Repo hygiene** | Legacy `index.html` (89 KB) and default `public/*.svg` unused; default `README.md`; `.env.local` tracked with secrets. | Root, `public/` |
| 16 | **Alignment/hierarchy** | Collections' two headings use different fonts without a shared rule; stat claims unverified. | `CollectionsSection.tsx`, `HeroSection.tsx` |
| 17 | **Performance micro** | Body-wide `MutationObserver { subtree:true }` reacts to slider/nav state changes. | `ScrollObserver.tsx` |
| 18 | **Currency ambiguity** | Prices like `300/-` never labeled as BDT. | `data/*`, list/card components |

---

# 8. Feature Inventory

| Feature | Purpose | Implementation | Files involved | Possible improvements |
|---|---|---|---|---|
| **Hero image slider** | Brand hero + rotating imagery | Client component, `useState` index, `setInterval` 5s, crossfade via opacity/scale; images from Trae text-to-image URL, `next/image unoptimized` | `home/HeroSection.tsx`, `next.config.ts` | Real photos, reduced-motion, hover-pause, swipe, icon arrows |
| **Sticky scroll-aware Navbar** | Navigation + brand | Client; `scroll` listener toggles `scrolled`; hash links; mobile hamburger→fullscreen | `layout/Navbar.tsx` | Scrollspy, focus trap, body-scroll lock, Esc-to-close |
| **Smooth-scroll anchor nav** | Move between sections | CSS `scroll-behavior: smooth` + `href="#id"` | `globals.css`, all sections | Offset for fixed navbar (anchor may hide under navbar) |
| **Scroll-reveal animations** | Progressive disclosure | `IntersectionObserver` adds `is-visible`; `MutationObserver` re-scans | `ui/ScrollObserver.tsx`, `globals.css` | Per-child stagger, reduced-motion, scope observer |
| **Most Wanted product cards** | Feature 4 products | Server; map `featuredProducts`→`GlassPanel`+`PriceChip` | `home/MostWantedSection.tsx`, `ui/GlassPanel.tsx`, `ui/PriceChip.tsx`, `data/products.ts` | Images, scent-family badges, consistent chip grid |
| **Price lists (New Arrivals, Collections)** | Full catalog w/ prices | Server; `ProductList` rows; zebra + hover | `home/NewArrivalsSection.tsx`, `home/CollectionsSection.tsx`, `ui/ProductList.tsx`, `data/products.ts` | Search/filter/sort, all volumes, sticky header |
| **Royal Packages** | Bundle upsell | Server; map `packages`→`GlassPanel` with VIP variant; inline Bengali-detection regex | `home/PackagesSection.tsx`, `data/packages.ts` | More packages or single-card layout; itemized prices |
| **Stockout badges** | Mark unavailable items | `stockout?: boolean` renders a red pill | `ui/ProductList.tsx`, `ui/PremiumTable.tsx`, `data/products.ts` | De-emphasize/relocate stockouts |
| **Bengali/English font switching** | Render mixed scripts | `isBengali` flag or `isBengaliText()` regex → `font-bengali` | `ui/ProductList.tsx`, `home/PackagesSection.tsx`, `data/products.ts` | Centralize detection utility |
| **Contact channel cards** | Multi-channel contact | Server; `<a>` cards to WhatsApp/Facebook/mailto with inline SVGs | `home/ContactSection.tsx` | Use `GlassPanel`, extract icons, centralize numbers |
| **EmailJS contact/order form** | Capture inquiries/orders | Client; `emailjs.sendForm`; status machine; custom portal subject select | `home/ContactForm.tsx`, `.env.local` | Captcha/honeypot, validation, keyboard-accessible select, product-aware subjects |
| **WhatsApp FAB** | Always-available contact | Fixed `<a>` with brand gradient | `ui/WhatsappFAB.tsx` | Centralize number; reveal-on-scroll |
| **SEO metadata** | Discoverability/social | `metadata` export (OG, Twitter, robots, icons, keywords) | `app/layout.tsx` | Add `sitemap.ts`, `robots.ts`, JSON-LD Product/Organization schema |
| **Loading screen** | Route transition feedback | `loading.tsx` crown + gold spinner | `app/loading.tsx` | Reduced-motion; brand logo instead of emoji |
| **404 page** | Handle bad routes | `not-found.tsx` gold 404 + return-home | `app/not-found.tsx` | Add nav/search; localize CTA label |
| **Custom subject dropdown** | Categorize inquiries | Portal listbox, fixed positioning | `home/ContactForm.tsx` | Full keyboard nav, edge-aware positioning |

---

# 9. Missing Features

| Priority | Feature | Why |
|---|---|---|
| **High** | **Product-aware ordering** (e.g. "Order this" button that prefills WhatsApp/form with product + volume) | Closes the biggest UX gap: users currently must manually re-type what they want. Directly impacts conversions. |
| **High** | **Search / filter / sort across the ~40+ products** | Catalog is long and flat; discovery is poor on mobile. |
| **High** | **Real product imagery** (replace generated hero + add per-product photos) | Fragrance is sold visually/emotionally; generated images are a branding + reliability risk (§7 #10). |
| **High** | **`sitemap.ts` + `robots.ts` + JSON-LD structured data** | Metadata is strong but crawl/rich-result coverage is incomplete; structured `Product`/`Organization` data boosts SEO for a commerce site. |
| **High** | **Spam protection on the form** (honeypot/captcha/rate limit) | Public EmailJS keys are abusable as-is. |
| **Medium** | **Currency labeling / price formatting** (BDT ৳) | Removes ambiguity for all users. |
| **Medium** | **Active-section nav highlighting (scrollspy)** | Orientation on a long single page. |
| **Medium** | **Product detail view** (modal or `/product/[slug]`) with notes, longevity, images | Deeper info without leaving to contact. |
| **Medium** | **Reduced-motion + hero pause controls** | Accessibility + comfort. |
| **Medium** | **Reusable design-system primitives** (`Button`, `Card`, tokenized type/spacing) | Prerequisite for a clean redesign; kills duplication. |
| **Medium** | **Content management for catalog** (even a typed JSON/CMS) | Non-devs currently can't safely edit `src/data/*`. |
| **Low** | **Testimonials / social proof / reviews** | Trust building. |
| **Low** | **Multi-language toggle (bn/en)** | Broaden reach; content is currently bn-heavy. |
| **Low** | **Analytics/consent** | Measure funnel; the "50+/64 districts" stats suggest interest in metrics. |
| **Low** | **Order/WhatsApp deep-link templates per package** | Streamline package purchases. |
| **Low** | **Blog/scent guide** | SEO long-tail + education. |

---

# 10. Design Improvement Ideas (no code)

> Template sections that do not exist here (**About, Skills, Experience, Research, Publications, Resume**) are **not applicable** — this is an attar shop, not a portfolio. They are listed below only to explicitly close them out. Real sections get concrete ideas.

- **Hero:** Replace generated imagery with curated real product/lifestyle photography; make the headline a brand value proposition (not "price list"); unify slider arrows with the icon system; add hover-pause + reduced-motion; make stats real or drop them; consider anchoring a single strong CTA.
- **Navbar:** Add scrollspy active state; ensure anchor targets clear the fixed bar (scroll offset); mobile menu focus trap + body lock + Esc; consider a subtle logo mark.
- **About:** *Not applicable* — but a short **brand story / trust band** (sourcing, authenticity, delivery to 64 districts) would fill the role and build credibility.
- **Skills / Experience / Research / Publications:** *Not applicable* (portfolio concepts). Nearest useful equivalents: **"Why KAHF" trust points**, **FAQ**, and **scent-family guide**.
- **Projects → Products/Collections:** Add product cards with imagery + scent-family tags; enable filter/sort/search; standardize card layout; add per-product "order" affordance; give Collections a proper `SectionHeader`.
- **Resume:** *Not applicable.*
- **Contact:** Tokenize status colors; harden the custom select (or use native + styled); add captcha; make the subject field product-aware; adopt `GlassPanel` for consistency.
- **Footer:** Add quick links + FAQ/policies; extract shared social icons; centralize contact constants.
- **Loading screen:** Swap crown emoji for the brand logo mark; respect reduced-motion.
- **404 page:** Add navigation/search and localize the CTA to Bengali; keep the strong visual.
- **Dark mode:** Either commit to dark-only (remove the unused `dark` variant scaffolding) **or** build a real light theme with a toggle — currently it's neither.
- **Micro-interactions:** Standardize hover/press states into tokens; add tasteful focus-visible rings in gold; subtle FAB reveal.
- **Animations:** Move to per-child staggered reveals; add reduced-motion; scope the observer to avoid site-wide mutation reactions.
- **Mobile:** Increase smallest font sizes for legibility; add swipe to the hero; sticky list headers; ensure tap targets ≥44px.
- **Desktop:** Use the extra width for richer product cards / imagery; consider a sticky mini-nav or category rail for the long catalog.
- **Tablet:** Add an explicit `md` layout tier (currently jumps `md`→`lg`), e.g. 2–3 column product grids and a balanced Collections layout.

---

# 11. Code Quality Review

| Dimension | Assessment |
|---|---|
| **Folder structure** | ★★★★☆ Clean, conventional Next.js App Router layout; data/presentation separation is a real strength. Root clutter (`index.html`, default `public/*`, default README) drags it down. |
| **Naming** | ★★★★☆ Components and data exports are clearly named and typed. The `--gold-*` vs `--color-gold-*` token mismatch is the notable naming defect. |
| **Component organization** | ★★★☆☆ Good primitive instinct (`GlassPanel`, `SectionHeader`) undermined by duplication (contact cards/icons/constants) and dead code (`PremiumTable`). No `Button`/`Card` system. |
| **Hooks** | ★★★★☆ Sensible, minimal (`useState`, `useEffect`, `useCallback`, `useRef`). Listeners cleaned up correctly. `ScrollObserver`'s body-wide `MutationObserver` is the one heavy-handed choice. |
| **State management** | ★★★★★ Appropriately local; no global store needed for a static catalog. |
| **Performance** | ★★★★☆ Static-friendly, few client islands, `next/font`. Minor: `unoptimized` hero images, observer churn. |
| **Maintainability** | ★★★☆☆ Editing catalog is easy (data files) but editing *styles* is hard — arbitrary values everywhere, no scale, duplicated styles, token bugs. |
| **Scalability** | ★★★☆☆ Fine for one page; adding many products/pages/packages will strain the flat lists and hardcoded assumptions (`slice(0,3)`, single-package grid). |
| **Readability** | ★★★☆☆ Logic is readable, but very long inline Tailwind arbitrary-value class strings hurt scan-ability. |
| **Best practices** | ★★★☆☆ Good: typed data, semantic HTML, ARIA. Gaps: secrets in tracked `.env.local`, unused deps, no tests, no reduced-motion, default README. |

**Top code-quality actions (pre-redesign):** fix the CSS token bug; delete `PremiumTable` + `class-variance-authority` (or adopt them); extract `Button`, shared icons, and contact constants; introduce type/spacing scale tokens; remove `index.html` and default public assets; verify `.env.local` is untracked and secrets rotated if leaked.

---

# 12. Performance Review

| Concern | Finding | Recommendation |
|---|---|---|
| **Large components** | `HeroSection.tsx` (~230 lines) and `ContactForm.tsx` (~255 lines) are the largest; both are client. `PremiumTable.tsx` is large but dead. | Keep hero lean; delete dead table; split `ContactForm`'s `SubjectSelect` if it grows. |
| **Unnecessary re-renders** | Hero re-renders every 5s (expected). Navbar re-renders on scroll threshold cross (cheap). No obvious render storms. | Fine; ensure any future list interactivity is memoized. |
| **Image optimization** | Hero slides use `unoptimized` from a **non-CDN generation endpoint**; logo/OG use `i.ibb.co`. | Move to real, optimized images through `next/image` (drop `unoptimized`); host on a stable CDN; add width/height + `sizes`. |
| **Bundle size** | Small: 3 client components, tree-shakeable `lucide-react`, `clsx`/`tailwind-merge`. **`class-variance-authority` is bundled-but-unused.** | Remove unused dep; keep icon imports named. |
| **Lazy-loading** | Everything renders eagerly on one page. `ContactForm` (EmailJS) loads even if never used. | Consider `next/dynamic` for `ContactForm`/`SubjectSelect`; lazy-load below-fold sections if catalog grows. |
| **Memoization** | `nextSlide`/`prevSlide` are `useCallback`'d. No heavy computations to memoize currently. | Adequate; revisit if search/filter is added. |
| **Animation optimization** | Reveal uses transform/opacity (GPU-friendly, good). `MutationObserver` on whole body is the main inefficiency. | Scope observer to `main`/sections; disconnect after initial reveal; add reduced-motion. |
| **SEO** | Strong metadata; **missing** `sitemap.ts`, `robots.ts`, JSON-LD, and canonical per-section anchors. | Add sitemap/robots/structured data; ensure OG image is stable. |
| **Accessibility (perf-adjacent)** | Missing reduced-motion, focus trap, skip link; tiny fonts; contrast risks (§4/§7). | Address as part of the redesign; these are low-effort, high-impact. |

**Overall:** performance is already good for a static marketing page; the wins are **image strategy**, **removing dead weight**, and **scoping the observer** — not architectural rework.

---

# 13. Final Recommendations

### Critical improvements (do first, low risk, high impact)
1. **Fix the CSS token bug** — replace all `--gold-300`/`--gold-400` with `--color-gold-300`/`--color-gold-400` (`PriceChip.tsx`, `PremiumTable.tsx`, `PackagesSection.tsx`). Silent visual defect shipping today.
2. **Secure the form & secrets** — confirm `.env.local` is untracked (it currently shows in git state); rotate keys if exposed; add a honeypot/captcha to the EmailJS form.
3. **Fix hero image reliability** — replace Trae-generated `unoptimized` slides with real, CDN-hosted, optimized images.
4. **Remove dead weight** — delete `PremiumTable` (unused) and `class-variance-authority` (unused), or deliberately adopt them; delete legacy `index.html` and default `public/*.svg`.
5. **Accessibility quick wins** — add `prefers-reduced-motion`, mobile-menu focus trap + Esc + body-lock, a skip link, and raise sub-0.6rem font sizes.

### Recommended improvements (foundational for the redesign)
6. **Introduce a real design system** — tokenized typography scale, spacing scale, one canonical gold, and `Button`/`Card` primitives; adopt `GlassPanel` in Contact.
7. **Kill duplication** — central `contact` constants (phone/links) and a shared social-icon set used by `ContactSection`, `Footer`, `WhatsappFAB`.
8. **Consistency fixes** — give Collections a `SectionHeader`; unify slider arrows with `lucide-react`; standardize the Most Wanted price-chip grid.
9. **Make `ProductList` data-driven** — derive volume columns from data instead of hardcoding `3/6/12 ML` and `slice(0,3)`.
10. **SEO completion** — add `sitemap.ts`, `robots.ts`, and JSON-LD `Product`/`Organization` schema.
11. **Scope `ScrollObserver`** — limit the `MutationObserver`, disconnect after reveal, add reduced-motion.

### Optional improvements (nice-to-have)
12. Product-aware ordering deep links (prefill WhatsApp/form with item + volume).
13. Search/filter/sort for the catalog; product detail view.
14. Currency labeling (৳ BDT); tablet-specific layout tier.
15. Testimonials/trust band/FAQ; light-theme toggle or removal of unused `dark` scaffolding.
16. Replace crown emoji in `loading.tsx` with the brand mark; localize the 404 CTA.

### Future roadmap (phased)
- **Phase 0 — Stabilize:** items 1–5 (token bug, secrets, hero images, dead code, a11y quick wins). No visual redesign yet.
- **Phase 1 — Systematize:** items 6–11 (design tokens, primitives, dedup, consistency, data-driven lists, SEO). This is the foundation the redesign should sit on.
- **Phase 2 — Convert:** product-aware ordering, search/filter, product detail, currency, tablet layout — the conversion-focused UX layer.
- **Phase 3 — Grow:** CMS/structured content for the catalog, testimonials/reviews, blog/scent guide, analytics + consent, optional multi-language.

---

### Appendix — File → Responsibility quick map

| File | Responsibility |
|---|---|
| `src/app/layout.tsx` | Fonts, SEO metadata, root `<html>/<body>` |
| `src/app/page.tsx` | Composes the single page |
| `src/app/globals.css` | Design tokens, base styles, keyframes, reveal classes |
| `src/app/loading.tsx` / `not-found.tsx` | Loading + 404 |
| `src/components/home/*` | Page sections (Hero, MostWanted, NewArrivals, Collections, Packages, Contact) + ContactForm |
| `src/components/layout/*` | Navbar, Footer |
| `src/components/ui/*` | GlassPanel, SectionHeader, PriceChip, ProductList, ScrollObserver, WhatsappFAB, PremiumTable(dead) |
| `src/data/products.ts` | featuredProducts, newArrivals, previousCollection, flowerCollection + product types |
| `src/data/packages.ts` | packages + Package type |
| `src/lib/utils.ts` | `cn()` |
| `next.config.ts` | Image `remotePatterns` (`i.ibb.co`, `coresg-normal.trae.ai`) |
| `.env.local` | EmailJS keys + Vercel OIDC token (⚠️ tracked) |
| `index.html` (root) | ⚠️ Legacy standalone HTML, not part of the Next.js app |

*End of analysis. No source files were modified in producing this document.*
