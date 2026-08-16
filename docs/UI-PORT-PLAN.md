# Plan: Port Origin UI components to the `ui-kit` React registry

Source reference: `radix-ng/origin-ui` (Angular/Radix-NG), specifically
`apps/origin-ui/src/registry/default/components/` — 25 categories, ~193 variant files total.

Target: `demo-projects/ui-kit`, which already proves out the pattern for `accordion`
(11 variants, batch 1 — commits `33b3cdd` / `81a720a`).

## Approach

This is not a line-for-line port of the Angular source. Two reasons: Origin UI's implementation
is Angular/Radix-NG-specific (signals, directives, template syntax) and doesn't translate
mechanically to React; and the Angular source is upstream-licensed code that shouldn't be
reproduced verbatim. Instead, treat each Origin UI variant as a **spec** — what the variant looks
like, what behavior/props it demonstrates — and re-implement it natively using the stack `ui-kit`
already runs: Base UI React primitives (`@base-ui/react/*`) + Tailwind, following the exact
accordion pattern already in the repo:

1. Base primitive wrapper in `packages/ui/src/components/<name>.tsx` (once per category, if Base
   UI has a matching primitive — reused across all variants in that category).
2. One file per variant in `apps/web/registry/<category>/<category>-<variant>.tsx`.
3. Registry metadata entry per variant in `apps/web/registry.json` (mirrored to
   `public/r/<variant>.json` by the existing build step) — `name`, `title`, `description`,
   `registryDependencies`, `files`, `categories`.
4. Loader entry per variant in `apps/web/registry/index.ts` `previewRegistry`.
5. Category shows up automatically on `[category]/page.tsx` via the existing registry-driven
   grid — no page-level work needed per category.

## Primitive availability check (do this first, per category)

Base UI (`@base-ui-components/react`) doesn't cover everything Origin UI covers. Before starting
a category, check if a Base UI primitive exists:

| Has direct Base UI primitive | Needs custom/hybrid build |
|---|---|
| accordion (done), dialog, popover, tooltip, tabs, switch, checkbox, radio, select, slider, menu (dropdowns), progress, avatar, separator | croppers, file-uploads, notifications, paginations, steppers, tables, badges, breadcrumbs, calendars |

For the right column, base the implementation on plain HTML/ARIA + existing `packages/ui`
primitives (e.g. buttons, input) rather than inventing a new headless dependency — keep the
dependency surface identical to what's already in `package.json`.

## Batching

Mirrors how accordion batch 1 shipped — one category (or small group) per commit.

| Batch | Categories | File count | Notes |
|---|---|---|---|
| 1 | accordion | 11 | done |
| 2 | buttons, badges | 21 | done (13 button + 8 badge variants) |
| 3 | inputs, textareas, checkboxes, radios | 29 | done (11 input, 5 textarea, 6 checkbox, 7 radio) |
| 4 | switchs, sliders, selects | 29 | done (10 switch, 10 slider, 9 select) |
| 5 | tabs, tooltips, popovers, dialogs, dropdowns | 25 | done (7 tab, 4 tooltip, 4 popover, 5 dialog, 5 dropdown) |
| 6 | avatars, breadcrumbs, paginations | 21 | done (9 avatar, 6 breadcrumb, 6 pagination) |
| 7 | alerts, notifications, steppers | 18 | done (6 alert, 5 notification, 7 stepper — stepper built from scratch, no primitive existed) |
| 8 | tables, file-uploads, croppers, calendars | 19 | done (7 table, 6 file-upload, 4 cropper, 2 calendar — file-upload/cropper/calendar built from scratch, no new deps added) |

All 8 batches complete: 173 total registry items across 25 categories. Built by 6 parallel agents (batches 3–8),
each owning disjoint categories and writing only its own manifest so nothing conflicted; merged centrally into
`registry.json` / `registry/index.ts` / `public/r/*.json` afterward. `npx tsc --noEmit` and `eslint` are clean.

## Per-category workflow (repeat for each)

1. Pull the list of variant names + short descriptions from the upstream category directory
   (titles only, not source) to scope the variant set.
2. Confirm/create the primitive wrapper in `packages/ui/src/components/`.
3. Implement each variant file, matching the accordion files' shape: self-contained
   `export default function`, realistic placeholder content, Tailwind utility classes consistent
   with existing tokens.
4. Add `registry.json` entries + `previewRegistry` loader entries.
5. Run the ui-kit dev server, visually check the new category page (`/[category]`), spot-check
   light/dark theme and keyboard nav.
6. Commit per category (or per batch), following existing commit style
   (`sync ui-kit batch N: <categories>`).

## Open decisions before starting

- **Croppers**: needs an image-cropping approach — canvas-based custom build vs. a small headless
  lib. Should be picked before batch 8.
- **Calendars**: only 1 upstream file, but scope (single date vs. range) affects whether it needs
  a date library (this repo has none yet).
- **Tables**: Origin UI's table variants may lean on sorting/filtering state — decide if these
  stay presentational-only (matching the "component showcase" spirit) or wire up real
  interactivity.

## Suggested order to start

Batch 2 (buttons, badges) next — no new primitives, no open decisions, keeps momentum identical
to the accordion batch.
