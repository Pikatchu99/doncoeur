# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

DonCœur — a French-language blood-donation awareness landing page focused on Bénin (Cotonou, Porto-Novo, Parakou, and others). Single-page marketing site: hero, "why donate", an eligibility-check questionnaire, donation process steps, a center finder (map + list), FAQ, and footer. Not connected to any backend — all static data (centers, FAQ, journey steps) lives in `lib/data.ts`.

Built with v0 (initial scaffold) and then extensively iterated on with Claude Code — see `PROMPTS.md` for the full methodology log. Known limitations, notably:

- The map center data is demo/placeholder data, not real coordinates/hours/contacts.
- "Simuler ma position" is a hardcoded fake location, not real geolocation.

## Commands

```bash
pnpm dev      # start dev server
pnpm build    # production build
pnpm start    # run production build
pnpm lint     # eslint
```

There is no test suite configured.

Note: `next.config.mjs` sets `typescript.ignoreBuildErrors: true`, so `pnpm build` will NOT fail on type errors — run `tsc --noEmit` separately if you need to verify types.

## Architecture

- **`app/page.tsx` is a thin composition root** — it just imports and renders the 9 section components in order. Each section lives in [components/sections/](components/sections/) (`header`, `hero`, `why-donate`, `eligibility-quiz`, `journey`, `centres-finder`, `faq`, `final-cta`, `footer`) and owns whatever local state it needs — there's no page-level state left. When asked to change a specific section's content, copy, or behavior, go straight to its file there rather than `page.tsx`.
- **Static data is centralized in [lib/data.ts](lib/data.ts)**: the `Center` type + `centers` array, `faqs`, and `journeySteps` (which references `lucide-react` icon components directly as values). Content/data edits (add a center, change a FAQ answer) belong there, not in a section component.
- **Map is a dynamic-imported client component**: [components/center-map.tsx](components/center-map.tsx) wraps `react-leaflet`, imported via `next/dynamic` with `ssr: false` inside `components/sections/centres-finder.tsx` because Leaflet requires `window`. Follow the same dynamic-import pattern for any other map-dependent UI.
- **Styling is Tailwind v4 + shadcn**, configured through `app/globals.css` (`@import 'tailwindcss'`, `@import 'shadcn/tailwind.css'`) rather than a `tailwind.config.*` file — there isn't one. `components.json` defines the shadcn setup (style: `base-nova`, base color: `neutral`, no class prefix). Custom one-off animations/visuals (the filling blood bag, vein-path SVGs, etc.) are hand-written CSS classes in `globals.css` (e.g. `.blood-scene`, `.bag-fluid`, `.vein-loop`, `.journey-tube`) — check there before assuming a visual effect is a Tailwind utility.
- **UI primitives** come from `@base-ui/react` wrapped with `class-variance-authority` in [components/ui/](components/ui/) (currently just `button.tsx`), following shadcn conventions. Path alias `@/*` maps to the repo root (see `tsconfig.json` / `components.json` aliases: `@/components`, `@/lib`, `@/ui`, `@/hooks`).
- **The eligibility quiz** ([components/sections/eligibility-quiz.tsx](components/sections/eligibility-quiz.tsx)) is a self-contained state machine: a `questions` array driven by `question` (current index) and per-field `useState` hooks, advancing via `nextQuestion()`. `computeEligibility()` implements the full brief annex — age (18–65) and weight (≥50kg) thresholds, a gender-dependent post-donation delay (3 months men / 4 months women, skippable via a "never donated" checkbox), and always appends the mandatory "only a medical interview can confirm fitness" disclaimer.
- **The center finder** ([components/sections/centres-finder.tsx](components/sections/centres-finder.tsx)) filters `centers` (from `lib/data.ts`) in-memory via `useMemo` (by free-text `query` and `city` select), shows an explicit empty-state message when nothing matches, and syncs the selected center between the list and `CenterMap` (map recenter is driven by the `active` prop via `react-leaflet`'s `useMap`).
- **SEO/social preview**: `app/layout.tsx` has full Open Graph/Twitter Card metadata; `app/opengraph-image.tsx` generates the share-preview image at request time via `next/og` (`ImageResponse`) — there's no static image asset to keep in sync, edit that file if the share card needs to change.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
