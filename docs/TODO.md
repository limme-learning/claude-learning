# UI-Kit Implementation & Parallel Execution TODO List

> **Target Project:** [`demo-projects/ui-kit`](file:///E:/me/devops/claude-partices/demo-projects/ui-kit)  
> **Master Plan:** [`REUI-FULL-IMPLEMENTATION-PLAN.md`](file:///E:/me/devops/claude-partices/demo-projects/ui-kit/REUI-FULL-IMPLEMENTATION-PLAN.md)  
> **Ecosystem Plan:** [`REUI-ECOSYSTEM-PLAN.md`](file:///E:/me/devops/claude-partices/demo-projects/ui-kit/REUI-ECOSYSTEM-PLAN.md)  
> **Reference Ecosystem:** [`reui`](file:///E:/me/devops/claude-partices/reui) — verified 2026-08-14  
> **UX Craft Standard:** [Impeccable Craft Floor](file:///E:/me/devops/claude-partices/.claude/skills/impeccable/reference/craft-floor.md)

---

## ✅ Verified Reference: How `reui` Actually Structures the Ecosystem

> Ground truth of the reference ecosystem, verified by direct inspection of `e:\me\devops\claude-partices\reui`. We borrow its **pipeline concept** (shards → esbuild category packages → static registry → verify gate) and its **demo content** (copied as example files); we do **not** replicate its two-layer source layout (ui-kit has no `registry-reui/` — see Target Structure below).

```
reui/
├── registry/                            # LAYER 1 — PRIMITIVES (source of truth)
│   ├── bases.ts  config.ts  styles.tsx  base-colors.ts  fonts.ts  themes.ts
│   └── bases/{base,radix}/
│       ├── ui/*.tsx                     # 61 (base) / 60 (radix) primitives, one file each
│       ├── hooks/use-mobile.ts          # primitive-scoped hooks
│       ├── lib/utils.ts                 # shared cn()
│       └── ui/_registry.ts  hooks/_registry.ts  lib/_registry.ts   # shadcn Registry[] items
├── registry-reui/                       # LAYER 2 — REUI BLOCKS + EXAMPLES (source of truth)
│   └── bases/{base,radix}/
│       ├── reui/                        # block SOURCES
│       │   ├── alert.tsx … tree.tsx     #   simple single-file blocks
│       │   ├── data-grid/               #   multi-file mega-blocks (10 files, registry item per part)
│       │   ├── event-calendar/          #   13 files
│       │   ├── gantt/                   #   9 files
│       │   └── _registry.ts             #   registry:ui → target components/reui/
│       ├── components/<category>/       # EXAMPLE VARIANTS (previews)
│       │   ├── c-<category>-N.tsx       #   one file per variant (e.g. c-button-1 … c-button-61)
│       │   ├── meta.json                #   title/description/order/gridSize/previewHeight
│       │   └── (generated) _loaders.ts, _registry.ts
│       ├── hooks/{use-copy-to-clipboard,use-file-upload,use-scroll-position,use-slider-input}.ts
│       └── hooks/_registry.ts           #   registry:hook → target hooks/
│       └── _meta/components/bases/<base>/<category>.json   # generated shards
├── packages/registry/bases/<base>/components/<category>/   # LAYER 3a — esbuild category packages
│       # package.json (@reui/components-<base>-<category>) + src/index.ts + dist/index.js
├── lib/generated/component-preview-loaders/{index.ts, <base>/<category>.ts}  # LAYER 3b — loader maps
├── public/r/styles/<base>-<style>/{registry.json, <name>.json}              # LAYER 3c — shadcn registry
├── scripts/{build-components.mts, build-component-packages.mts, build-registry.mts, verify-registry.mts}
├── lib/registry-bases.ts               # AVAILABLE_BASES = ["base", "radix"] allowlist
└── app/(app) + components/{ui,reui,examples}   # showcase + installed copies
```

**Registry item conventions (what `shadcn add` receives):**
| Kind | type | install target | files path |
|---|---|---|---|
| Primitive | `registry:ui` | `components/ui/<name>.tsx` | `registry/bases/<base>/ui/<name>.tsx` |
| ReUI block | `registry:ui` | `components/reui/<name>.tsx` | `registry-reui/bases/<base>/reui/<name>.tsx` |
| Example | `registry:block` | `components/examples/<name>.tsx` | `registry-reui/bases/<base>/components/<cat>/c-*.tsx` |
| Hook | `registry:hook` | `hooks/<name>.ts` | `registry-reui/bases/<base>/hooks/<name>.ts` |
| Lib | `registry:lib` | `lib/<name>.ts` | `registry/bases/<base>/lib/<name>.ts` |

**Build pipeline (order matters):**
1. `build-components.mts` — scans `registry-reui/bases/*/components/*/c-*.tsx` → emits per-category shards (`registry-reui/_meta/components/bases/<base>/<category>.json`) + per-category preview loaders (`lib/generated/component-preview-loaders/<base>/<category>.ts`) + catalog stats (`_meta/components/registry.json`).
2. `build-component-packages.mts` — esbuild-bundles each example category into `packages/registry/bases/<base>/components/<category>/` (`@reui/components-<base>-<category>`), externalizes host `@/` aliases + app deps, rewires `lib/generated/component-preview-loaders/index.ts` to `"<base>:<category>" → () => import(pkg)`, syncs app `package.json` workspace deps. Flags: `--wire-app`, `--watch`, `<base>/<category>` filter.
3. `build-registry.mts` — emits `public/r/styles/<base>-<style>/*.json` per base/style pair (styles: vega/nova/maia/lyra/mira/luma/sera/rhea). Rewrites import paths (`@/registry-reui/bases/<base>/…` → `@/components/{reui,ui,hooks,lib,examples}/…`), resolves internal registryDeps to the `@reui/<name>` namespace, embeds file content, then runs an internal verification pass.
4. `verify-registry.mts` — production gate (exit 1 on failure): valid JSON + required fields, non-empty file content, no leaked registry import paths / style-* tokens, dependency completeness (every imported npm pkg is declared), and **base/radix example-set alignment** (same `c-*` set in both engines so install guides never 404).

**Verified inventory:** 61 base primitives / 60 radix primitives · 20 reui blocks (alert, autocomplete, badge, date-selector, data-grid, event-calendar, filters, frame, gantt, icon-stack, icon-tile, kanban, number-field, phone-input, rating, scrollspy, sortable, stepper, timeline, tree) · 5 hooks (4 reui + `use-mobile`) · 69 example categories.

---

## 🎯 Target Structure for `ui-kit` (Same as reui, but better)

> Key deltas vs the raw `reui` layout that make this monorepo *better* while keeping the ecosystem shape identical:
> 1. **Single-source runtime library instead of installed copies.** `reui` keeps `components/{ui,reui,examples}` as checked-in copies per base. We keep the runtime sources once in `packages/ui` (workspace-linked, type-checked, hot-reloaded) and *generate* the `registry/` layers as shadcn-shippable artifacts. No copy-drift.
> 2. **Self-contained: no `registry-reui/` layer, no reui dependency.** Demo/example files are copied from reui into ui-kit's own `registry/bases/{base,radix}/{components,blocks}/` (content owned by ui-kit). We borrow only the 4-script pipeline *concept*.
> 3. **Generated metadata, not hand-maintained.** `reui` hand-writes large `_registry.ts` files. We generate `_registry.ts` + `meta.json` from one typed catalog so metadata can never drift from source.
> 4. **Example-set alignment is enforced by the build** (mirror `verify-registry`), not by convention.
> 5. **Package scope `@ui-kit/`** for all generated workspace packages.

```
demo-projects/ui-kit/
├── apps/uikit/                          # showcase (routes per engine)
│   ├── app/[base]/[category]/page.tsx           # base/radix engine switcher
│   ├── app/[base]/blocks/[block]/page.tsx       # block showcase
│   ├── lib/generated/component-preview-loaders/ # generated: index.ts + <base>/<category>.ts
│   ├── public/r/styles/<base>-<style>/*.json    # generated shadcn registry
│   └── lib/registry-bases.ts                    # AVAILABLE_BASES allowlist
├── packages/ui/                         # ⭐ RUNTIME SOURCE (single copy, workspace-linked)
│   └── src/{components,radix-components,blocks,hooks,lib}
├── registry/                            # ⭐ CATALOG + EXAMPLE CONTENT (single source)
│   ├── bases.ts  config.ts  styles.tsx  catalog.ts
│   └── bases/{base,radix}/
│       ├── components/<category>/c-*.tsx + meta.json   # example variants (registry:block)
│       ├── blocks/<block>/c-*.tsx + meta.json          # block examples
│       └── _meta/components/bases/<base>/<category>.json   # generated shards
├── packages/registry/bases/<base>/components/<category>/   # esbuild category packages
├── packages/registry-builder/           # 4-script pipeline (concept borrowed from reui)
└── pnpm-workspace.yaml  turbo.json  package.json
```

---

## 🚦 Execution Matrix & Parallel Tracks

```
                        ┌──────────────────────────────────────────────┐
                        │  Track 0: Foundation & Build Pipeline         │
                        │  (workspace, packages/ui library, esbuild     │
                        │   registry-builder, registry-bases gate)      │
                        └──────────────────────┬───────────────────────┘
                                               │
               ┌───────────────────────────────┼───────────────────────────────┐
               ▼                               ▼                               ▼
  ┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
  │  Track 1: Primitive     │     │  Track 2: UI Blocks     │     │  Track 3: Example        │
  │  Engine                 │     │  Engine                 │     │  Variants (previews)     │
  │  (packages/ui base+     │     │  (packages/ui blocks/,  │     │  (registry/bases/        │
  │   radix, hooks, lib)    │     │   20 blocks + 5 hooks)  │     │   components+blocks/,    │
  │                         │     │                         │     │   69 cats)               │
  └────────────┬────────────┘     └────────────┬────────────┘     └────────────┬────────────┘
               │                               │                               │
               └───────────────────────────────┼───────────────────────────────┘
                                               │
                                               ▼
                        ┌──────────────────────────────────────────────┐
                        │  Track 4: Registry Build + Verify Gate        │
                        │  (shards → packages → public/r/styles →      │
                        │   verify-registry, engine-switcher wiring)    │
                        └──────────────────────┬───────────────────────┘
                                               │
                                               ▼
                        ┌──────────────────────────────────────────────┐
                        │  Track 5: Impeccable UX Craft Verification   │
                        │  (WCAG AA, 44px targets, states, zero        │
                        │   nested cards — light/dark, 375/768/1440)    │
                        └──────────────────────────────────────────────┘
```

---

## 📋 Track 0: Foundation, Library Source & Build Pipeline (Sequential)

- [x] **Step 0.1**: Rename `apps/web` → `apps/uikit`; package name → `@ui-kit/uikit`; README + script references updated.
- [x] **Step 0.2**: `pnpm-workspace.yaml` includes `apps/*`, `packages/*`, `packages/registry/bases/*/components/*`.
- [x] **Step 0.3**: Dual-engine deps in `packages/ui/package.json` — `@base-ui/react` 1.7.0, all `@radix-ui/react-*`, `@tanstack/react-table|virtual`, `@dnd-kit/*`, `@headless-tree/core`, cva, lucide-react, sonner, zod, next-themes.
- [x] **Step 0.4**: `packages/registry-builder/` exists with `build-component-packages.ts` + `build-registry.ts`; `apps/uikit/lib/generated/component-preview-loaders/index.ts` + catalog generated (28 entries).
- [x] **Step 0.5**: `packages/ui` strict-mode baseline green (`pnpm --filter @ui-kit/ui typecheck`); `@/lib/utils` alias + Bundler resolution configured; `globals.css` `@source "../../../registry/**/*.{ts,tsx}"`.
- [x] **Step 0.6**: `apps/uikit` typecheck green; `packages/ui/package.json` exposes `./radix-components/*`.
- [x] **Step 0.7 (SOURCE CONTENT)**: Catalog + example content live in ui-kit's own `registry/bases/{base,radix}/{components,blocks}/` (demo example files copied from reui as content; **no `registry-reui/` layer**):
  - [x] Add `registry/bases.ts`, `registry/config.ts`, `registry/styles.tsx` (styles list), `registry/catalog.ts` (72-category typed manifest) + `apps/uikit/lib/registry-bases.ts` (`AVAILABLE_BASES = ["base","radix"]`).
  - [x] Example variants named `c-<category>-N.tsx` + `meta.json` in `registry/bases/<base>/components/<category>/`; block examples in `registry/bases/<base>/blocks/<block>/`.
  - [x] Block sources stay in `packages/ui/src/blocks/` (single runtime source); hooks in `packages/ui/src/hooks/`; `lib/utils.ts` (`cn`) in `packages/ui/src/lib/`.
  - [ ] Replace stale descriptor lists `registry/bases/{base,radix}/{components,blocks}.ts` with the typed **catalog manifest** (`registry/catalog.ts`); `meta.json` becomes a generated artifact.
- [ ] **Step 0.8 (4-SCRIPT PIPELINE — concept borrowed from reui, sources are ui-kit's own)**: Extend `registry-builder` to the 4-script pipeline:
  - [ ] `build-components` → per-category shards (`registry/_meta/components/bases/<base>/<category>.json`) + per-category preview loaders + catalog stats.
  - [ ] `build-component-packages` → esbuild category packages (`@ui-kit/components-<base>-<category>`), externalize host `@/` aliases + app deps, rewire loader index to `"<base>:<category>" → () => import(pkg)`, sync app deps; `--wire-app`, `--watch`, `<base>/<category>` filter.
  - [ ] `build-registry` → `apps/uikit/public/r/styles/<base>-<style>/*.json` with import-path rewriting (`@ui-kit/ui/{components,radix-components,blocks,hooks,lib}/…` → `@/components/{ui,reui,hooks,lib}/…`), internal deps → `@ui-kit/<name>` namespace, embedded file content.
  - [ ] `verify-registry` → production gate: JSON/fields/content validity, no leaked internal import paths, **dependency completeness** (every imported pkg declared), base/radix example-set alignment.
- [x] **Step 0.9 (NAMESPACE UNIFICATION)**: Rename workspace package scope `@workspace/*` → `@ui-kit/*` so every package matches the `ui-kit` workspace name:
  - [x] `packages/ui` → `@ui-kit/ui`; `packages/registry-builder` → `@ui-kit/registry-builder`; `packages/eslint-config` → `@ui-kit/eslint-config`; `packages/typescript-config` → `@ui-kit/typescript-config` (4 package.json names).
  - [x] Update every `package.json` (app, generated registry packages, root) + all source imports `from "@workspace/..."` → `@ui-kit/...` across `apps/uikit`, `packages/*`, `registry/` (457 files; old `@workspace` scope fully removed).
  - [x] Update `apps/uikit/components.json` + `packages/ui/components.json` shadcn aliases.
  - [x] Re-run `pnpm install`, then `pnpm typecheck` + `pnpm lint` to confirm nothing references the old scope (`@ui-kit/ui` typecheck green).

---

## ⚡ Track 1: Primitive Engine (packages/ui — single source, dual engine)

> Runtime primitives stay in `packages/ui` (the reui-equivalent of `registry/bases/<base>/ui`). Layer-1 registry files are generated from this library.

**Base engine (`packages/ui/src/components/`) — ~61 primitives. Status: 10 done.**
- [x] `button`, `accordion`, `alert`, `badge`, `dialog`, `popover`, `switch`, `table`, `tabs`, `tooltip`
- [ ] `alert-dialog`, `aspect-ratio`, `avatar`, `breadcrumb`, `button-group`, `calendar`, `card`, `carousel`, `chart`, `checkbox`, `collapsible`, `combobox`, `command`, `context-menu`, `direction`, `drawer`, `dropdown-menu`, `empty`, `field`, `hover-card`, `input`, `input-group`, `input-otp`, `item`, `kbd`, `label`, `marker`, `menubar`, `message`, `message-scroller`, `native-select`, `navigation-menu`, `pagination`, `progress`, `radio-group`, `resizable`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `slider`, `sonner`, `spinner`, `textarea`, `toggle`, `toggle-group` (+ any reui-required extras)

**Radix engine (`packages/ui/src/radix-components/`) — ~60 primitives, API parity with base.** Exposed via `packages/ui/package.json` → `./radix-components/*` (NOT re-exported through `src/index.ts` to avoid name collisions).
- [ ] Full mirror of the base set using `@radix-ui/react-*` parts (accordion, alert-dialog, avatar, checkbox, collapsible, context-menu, dialog, dropdown-menu, hover-card, label, navigation-menu, popover, progress, radio-group, scroll-area, select, separator, slider, switch, tabs, toggle, toggle-group, tooltip, etc.)

**Hooks (`packages/ui/src/hooks/`)**
- [x] `use-copy-to-clipboard`, `use-scroll-position`, `use-slider-input`, `use-stepper`
- [ ] `use-file-upload` (drag-over, validation, thumbnails)

**Lib (`packages/ui/src/lib/utils.ts`)** — `cn` via clsx + tailwind-merge. [x] done.

---

## ⚡ Track 2: UI Block Engine (packages/ui/src/blocks — 20 blocks, dual engine)

> Block sources live once in `packages/ui/src/blocks/` (single runtime source, engine-agnostic like reui blocks). Example variants go in `registry/bases/{base,radix}/blocks/<block>/`. `data-grid`, `event-calendar`, `gantt` = **multi-file folders** with one installable registry item per part + an aggregate item.

- [x] `autocomplete`, `phone-input`, `rating`, `stepper` (in `packages/ui/src/blocks/`; examples in `registry/bases/{base,radix}/blocks/`)
- [ ] `data-grid/` — `data-grid.tsx` + `data-grid-table.tsx`, `-table-dnd.tsx`, `-table-dnd-rows.tsx`, `-table-virtual.tsx`, `-column-filter.tsx`, `-column-header.tsx`, `-column-visibility.tsx`, `-pagination.tsx`, `-scroll-area.tsx` (@tanstack/react-table + virtual, @dnd-kit)
- [ ] `event-calendar/` — `event-calendar.tsx` + content, nav, types, lib, i18n, dnd, event, month-view, time-grid, agenda-view, resource-view, recurrence (date-fns + @date-fns/tz)
- [ ] `gantt/` — `gantt.tsx` + bar, view, nav, types, lib, i18n, dnd, recurrence (date-fns + @date-fns/tz)
- [ ] `alert` (tone-tinted callouts), `badge` (status dots / dismissable tags)
- [ ] `filters` (AND/OR query builder), `date-selector` (dual-month + presets)
- [ ] `kanban` (@dnd-kit multi-column), `sortable` (drag reorder)
- [ ] `number-field` (stepper/scrub), `scrollspy` (IntersectionObserver)
- [ ] `timeline`, `tree` (@headless-tree/core), `icon-stack`, `icon-tile`, `frame` (device preview)
- [ ] Block examples in `registry/bases/{base,radix}/blocks/<block>/c-*.tsx` + `meta.json` (registry:block)

---

## ⚡ Track 3: Example Variants (registry/bases/*/components+blocks — 69 categories × 2 engines)

> One category dir per component; `c-<category>-N.tsx` variants + `meta.json`. Base + radix must ship the **same example set** (enforced by verify-registry). Content is copied from reui as demo content — ui-kit owns the files.

- [ ] 14 categories currently present (`accordion`, `alert`, `autocomplete`, `badge`, `button`, `dialog`, `phone-input`, `popover`, `rating`, `stepper`, `switch`, `table`, `tabs`, `tooltip`) — verify `c-*` naming + `meta.json` present in `registry/bases/{base,radix}/{components,blocks}/`.
- [ ] Remaining ~59 categories × base + radix (button-group, calendar, carousel, chart, checkbox, collapsible, combobox, command, context-menu, data-grid, date-selector, drawer, dropdown-menu, empty, event-calendar, field, file-upload, filters, frame, gantt, hover-card, icon-stack, icon-tile, input, input-group, input-otp, item, kanban, kbd, label, menubar, native-select, navigation-menu, number-field, pagination, progress, radio-group, resizable, scroll-area, scrollspy, select, separator, sheet, skeleton, slider, sonner, sortable, spinner, textarea, timeline, toggle, toggle-group, tree, …)
- [ ] Each category: `meta.json` (title/description/order/gridSize/previewHeight) + generated `_registry.ts`.
- [ ] Every example imports from `@ui-kit/ui/components/*` / `@ui-kit/ui/radix-components/*` / `@ui-kit/ui/blocks/*` / `@ui-kit/ui/hooks/*` (rewritten to `@/components/{ui,reui,hooks}/…` at registry-build time).
- [ ] **Re-point radix demos**: `registry/bases/radix/**` currently wrongly import from `@ui-kit/ui/components/*` (base runtime) → must switch to `@ui-kit/ui/radix-components/*`.

---

## ⚡ Track 4: Registry Build, Verify & App Wiring

- [ ] Run `build-components` → shards + loaders + catalog.
- [ ] Run `build-component-packages` (`--wire-app`) → `packages/registry/bases/*/components/*` packages; app loader index maps `base:category → package`.
- [ ] Run `build-registry` → `apps/uikit/public/r/styles/<base>-<style>/*.json` for the shipped styles.
- [ ] Run `verify-registry` → gate must pass (deps complete, no leaked internals, base/radix aligned).
- [ ] Rewire showcase to generated loaders + catalog (replace old `apps/uikit/registry/` manual map + `@/registry/index` `getPreviewLoader`).
- [ ] Engine switcher routes: `apps/uikit/app/[base]/[category]/page.tsx` and `[base]/blocks/[block]/page.tsx`; home `/` lists engines + categories from the catalog.
- [ ] End-to-end verify: `pnpm typecheck`, `pnpm lint`, `pnpm --filter @ui-kit/uikit build`, `npx shadcn add <item>` against the generated registry.

---

## 🛡️ Track 5: Impeccable UX Craft Floor Audit (applies to every primitive, block & example)

- [ ] **Contrast**: WCAG AA (≥ 4.5:1 normal, ≥ 3:1 large) across light/dark themes; secondary text tinted from surface hue.
- [ ] **Depth**: soft blur + real offset shadows (`0 4px 20px -2px`), no zero-blur halos; floats use real elevation.
- [ ] **States**: `:hover`, `:active:scale-[0.98]`, `:focus-visible` ring w/ offset, `:disabled`, `loading`/`empty` states on every control and block.
- [ ] **Motion**: 150–250 ms ease-out transitions; no lingering delays.
- [ ] **Touch targets**: ≥ 44×44 px on mobile (375px); verify tablet 768px, desktop 1440px.
- [ ] **Anti-pattern gate**: 0 nested cards, 0 eyebrow/kicker labels, 0 gradient text fills, no unstyled empty states.
- [ ] **Keyboard**: complete tab order, arrow-key listboxes/menus/tabs, ESC dismiss for modals/drawers/popovers.
