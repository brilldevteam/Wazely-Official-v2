---
name: project-conventions
description: Background knowledge of this repo's established patterns (CSS layering, dark mode, scroll animations, product data model, verification workflow). Load before editing globals.css, theming, marketing sections, or product cards, so you don't rediscover these the hard way.
user-invocable: false
---

# Wazely landing page — project conventions

Next.js 16 (App Router) + React 19 + Tailwind v4 + TypeScript marketing site. No test
suite — verification is `npm run typecheck && npm run lint` (and a production
`npm run build` before anything you'd call "done"), plus visual checks (see below).

Read `AGENTS.md` first — this repo's Next.js has breaking changes vs. training data;
the real docs are vendored at `node_modules/next/dist/docs/`.

## The #1 gotcha: un-layered CSS beats Tailwind utilities, always

`src/app/globals.css` starts with `@import "tailwindcss"`, which puts all Tailwind
utilities inside `@layer utilities`. Everything else in that file — `.product-card`,
`.section-space`, `.hero-surface`, button-variant classes from `cva`, etc. — is
**not** wrapped in `@layer`, so by CSS cascade-layer rules it beats *any* Tailwind
utility class on the same element, regardless of source order or specificity.

Concretely: `<div className="product-card border-dashed">` will **not** get a dashed
border, because `.product-card { border: 1px solid #dce2e9 }` (un-layered) wins over
`.border-dashed` (layered). This has bitten every attempt to override a custom class
with a Tailwind utility this session.

**Fix patterns**, in order of preference:
1. Add a new custom class in `globals.css` (e.g. `.product-card-soon { border-style:
   dashed }`) that comes *after* the base rule in the file — un-layered rules still
   cascade normally among themselves, so later wins.
2. Replace the custom class with inline Tailwind utilities entirely, if there's no
   reason for the shared class.
3. Last resort: `!` important modifier (`border-dashed!`) — layered utilities marked
   important still lose to un-layered rules in some engines, so prefer #1.

## Dark mode

Class-based, not OS-only: `@custom-variant dark (&:where(.dark, .dark *));` in
`globals.css`, toggled by adding/removing `.dark` on `<html>`. An inline script in
`src/app/layout.tsx` sets it before paint, reading `localStorage['wazely-theme']`
falling back to `prefers-color-scheme`.

Two valid ways to theme something, pick based on what you're touching:
- **New component, Tailwind-only**: use the `dark:` variant inline
  (`dark:text-white`) — it works fine, it's registered via the custom variant.
- **Existing un-layered base class** (`.bg-white`, `.text-navy`, `.product-card-erp`,
  etc.): add a `.dark .that-class { ... }` override in `globals.css` instead —
  `dark:` utilities can't win against the un-layered base rule (see gotcha above).

Theme-aware **images** (two different screenshots for light/dark) use the
`<ProductImage>` pattern (`src/components/marketing/product-image.tsx`): render both
`<Image>` variants, one `dark:hidden`, one `hidden dark:block`. Reuse this for any
other image that needs to differ by theme instead of inventing something new.

## Scroll-driven animation system

- `<ScrollReveal>` (`src/components/marketing/scroll-reveal.tsx`) — client component,
  `IntersectionObserver`-driven fade/slide-in, `direction` prop, `stagger` prop for
  staggered children (`.scroll-reveal-stagger > *`). Wrap new marketing sections in
  this for the standard entrance animation instead of writing new motion code.
- The hero "pieces fly in and assemble into the screenshot" effect
  (`hero-assembly.tsx`, `erp-hero.tsx`) is **not** CSS `animation-timeline: view()`
  — that was tried and dropped (inconsistent across browsers and broke on Next.js
  App Router navigation). It's a plain scroll listener driving a `--p` (0→1) CSS
  custom property that interpolates `--from-left/top` → `--to-left/top` positions
  and rotation per fragment. See the comment block above `.hero-assembly-piece` in
  `globals.css` for the full mechanism before touching it.

## Product data model

`src/data/products.ts` is the single source of truth for the 3 product cards
(Wazely CRM / ERP / Color). Each entry needs `image`, optional `imageDark`,
`imageWidth`/`imageHeight` (the actual asset's pixel size, used by `next/image`).
Two components render this list and must be kept in sync when a product is added,
removed, or reordered: `company-hero.tsx` (homepage hero preview strip) and
`products-section.tsx` (the full `#products` grid, which also has a hardcoded
"Coming soon" 4th card with its own light/dark image pair).

## Generating marketing screenshot/placeholder assets

No images are committed from an image-generation tool — they're produced with ad hoc
Node scripts using `sharp` (already a transitive dependency via Next's image
optimizer) + inline SVG, written to a throwaway `.cjs` file, run with `node`, then
deleted. For "screenshot a real external site" assets (e.g. the Wazely Color product
card), the pattern used repeatedly this session is headless Chrome via the Chrome
DevTools Protocol: launch `chrome.exe --headless=new --remote-debugging-port=...`,
connect over the raw `ws://` WebSocket (no Puppeteer/Playwright installed), navigate,
screenshot with `Page.captureScreenshot`, then crop/resize with `sharp`. If a
Playwright or Puppeteer MCP server is ever added to this project, prefer it over
hand-rolled CDP scripts — it's the same capability with far less boilerplate.

## Verification loop for visual changes

There's no visual regression tooling. After any layout/theming change: run
`npm run typecheck && npm run lint`, start `npm run dev`, then drive headless Chrome
(pattern above) to screenshot the affected section at a couple of viewport widths and
in both themes before calling the change done — don't rely on eyeballing the code.

## Branching / git habits established this session

Feature branches get descriptive names (`hero-scroll-assembly`,
`wazely-erp-product-launch`, `product-catalog-knowledge-base-navigation`, …), never
work directly on `main`. Commit only when asked; push/open PRs only when asked.
Commit messages and PR bodies end with the Claude attribution footer from the
session's system instructions.
