# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

DonCœur — a French-language blood-donation awareness landing page focused on Bénin (Cotonou, Porto-Novo, Parakou). Single-page marketing site: hero, "why donate", an eligibility-check questionnaire, donation process steps, a center finder (map + list), FAQ, and footer. Not connected to any backend — all data (blood centers, FAQ) is hardcoded in `app/page.tsx`.

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

- **Everything lives in one page component**: [app/page.tsx](app/page.tsx) is the entire site — hero, eligibility quiz, journey steps, center finder, FAQ, and footer are all inline JSX in a single `Page()` function, with local data arrays (`centers`, `faqs`) defined at module scope above it. When asked to change site content or copy, this is almost always the file to edit.
- **Map is a dynamic-imported client component**: [components/center-map.tsx](components/center-map.tsx) wraps `react-leaflet`. It's loaded via `next/dynamic` with `ssr: false` in page.tsx because Leaflet requires `window`. If you add other map-dependent UI, follow the same dynamic-import pattern.
- **Styling is Tailwind v4 + shadcn**, configured through `app/globals.css` (`@import 'tailwindcss'`, `@import 'shadcn/tailwind.css'`) rather than a `tailwind.config.*` file — there isn't one. `components.json` defines the shadcn setup (style: `base-nova`, base color: `neutral`, no class prefix). Custom one-off animations/visuals (the filling blood bag, vein-path SVGs, etc.) are hand-written CSS classes in `globals.css` (e.g. `.blood-scene`, `.bag-fluid`, `.vein-loop`, `.journey-tube`) — check there before assuming a visual effect is a Tailwind utility.
- **UI primitives** come from `@base-ui/react` wrapped with `class-variance-authority` in [components/ui/](components/ui/) (currently just `button.tsx`), following shadcn conventions. Path alias `@/*` maps to the repo root (see `tsconfig.json` / `components.json` aliases: `@/components`, `@/lib`, `@/ui`, `@/hooks`).
- **The eligibility quiz** is a small local state machine in `Page()`: a `questions` array driven by `question` (current index) and per-field `useState` hooks, advancing via `nextQuestion()` until an eligibility verdict is computed from age/weight thresholds and stored in `eligibility`.
- **The center finder** filters the local `centers` array in-memory via `useMemo` (by free-text `query` and `city` select), and syncs the selected center between the list and `CenterMap` (map recenter is driven by the `active` prop via `react-leaflet`'s `useMap`).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
