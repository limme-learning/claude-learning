# ReUI Ecosystem Architecture, Porting & Refactoring Plan for `ui-kit`

> **Target Project:** [`demo-projects/ui-kit`](file:///E:/me/devops/claude-partices/demo-projects/ui-kit)  
> **Source Reference:** [`reui`](file:///E:/me/devops/claude-partices/reui)  
> **UX Craft Standard:** Impeccable Skill ([`.claude/skills/impeccable`](file:///E:/me/devops/claude-partices/.claude/skills/impeccable/SKILL.md))  
> **Engines Supported:** `@base-ui/react` (Base UI) & `@radix-ui/*` (Radix UI)

---

## 1. Executive Summary & Ecosystem Comparison

| Dimension | `reui` Ecosystem | Current `demo-projects/ui-kit` | Target Refactored `ui-kit` |
|---|---|---|---|
| **Headless Foundations** | Dual-engine: `@base-ui/react` + `@radix-ui` | Single-engine: `@base-ui/react` | Dual-engine (`base` + `radix`) with unified wrapper API |
| **Component Count** | 72+ atomic primitives & compound blocks | 25 categories (~173 variant files) | 72+ primitives + ~300 variants + 12 rich UI blocks |
| **Complex UI Blocks** | Data Grid, Kanban, Gantt, Event Calendar, Filters, Date Selector, Tree, Sortable, Timeline, Stepper | Stepper, File-Upload, Cropper, basic Table | Enterprise UI blocks (Gantt, Kanban, DataGrid, Filters, Tree, Calendar) |
| **Registry & CLI** | `shadcn`-compatible registry generator (`registry-reui`), JSON schema, multi-style/theme pipeline | Custom `registry.json` + `public/r/*.json` generator | Unified CLI/Registry compatible with `shadcn` & multi-theme generator |
| **Theme & Token System** | Dynamic Base Colors (Zinc, Slate, Neutral, etc.), Heading/Body font pairs, Radii, Menu Accents | Tailwind tokens, light/dark mode | Design token engine with live variant switching, radii scale & font pairing |
| **UX Craft Quality** | Standard component library showcase | Component variants | Verified against **Impeccable Craft Floor** (Contrast ≥ 4.5:1, purposeful depth, zero lazy nesting, accessible keyboard focus & states) |

---

## 2. Architecture & Monorepo Structure

> **Verified 2026-08-14** against `e:\me\devops\claude-partices\reui`. We borrow **only the pipeline concept** from `reui` (shards → esbuild category packages → static registry + verify gate). **ui-kit does NOT replicate reui's source layout**: there is no `registry-reui/` directory and no per-base installed copies. ui-kit implements its own UI once in `packages/ui/` (primitives, blocks, hooks, lib) and stores demo example files (copied from reui as content) directly under `registry/bases/<base>/{components,blocks}/`.

```
demo-projects/ui-kit/
├── apps/
│   └── uikit/
│       ├── app/
│       │   ├── [base]/[category]/page.tsx       # Multi-engine switcher (base vs radix)
│       │   └── [base]/blocks/[block]/page.tsx   # Interactive full UI block showcase
│       │   ├── layout.tsx
│       │   └── page.tsx
│       ├── lib/
│       │   ├── registry-bases.ts                # AVAILABLE_BASES allowlist (base, radix)
│       │   └── generated/                       # Auto-wired dynamic loaders
│       │       └── component-preview-loaders/   # index.ts + <base>/<category>.ts
│       └── public/r/styles/<base>-<style>/      # Compiled JSON registry distributions
├── packages/
│   ├── ui/                                      # ⭐ RUNTIME SOURCE (single copy, workspace-linked)
│   │   └── src/
│   │       ├── components/                      # Base-engine primitives
│   │       ├── radix-components/                # Radix-engine primitives (export map ./radix-components/*)
│   │       ├── blocks/                          # Block sources (autocomplete, rating, data-grid, …)
│   │       ├── hooks/                           # use-copy-to-clipboard, use-file-upload, …
│   │       └── lib/utils.ts                     # cn()
│   ├── registry/                                # 📦 DERIVED category packages (esbuild)
│   │   └── bases/<base>/components/<category>/  # @ui-kit/components-<base>-<category>
│   ├── registry-builder/                        # 4-script pipeline (borrows reui's concept)
│   ├── eslint-config/
│   └── typescript-config/
├── registry/                                    # ⭐ CATALOG + EXAMPLE CONTENT (single source)
│   ├── bases.ts  config.ts  styles.tsx  catalog.ts
│   └── bases/
│       ├── base/  (radix/ mirrors)
│       │   ├── components/<category>/           # 🧩 example variants c-<cat>-N.tsx + meta.json (registry:block)
│       │   │   ├── button/  (c-button-1 … c-button-61)
│       │   │   └── … (69 categories)
│       │   └── blocks/<block>/                  # 🏗️ block examples (c-<block>-N.tsx + meta.json)
│       └── _meta/components/bases/<base>/<category>.json   # generated shards
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

### 2.1 The ReUI Package-Splitting Architecture (Why & How)

Component category packages are **derived build artifacts**, not manually maintained boilerplate:
1. **Source of Truth:** ui-kit implements its own primitives/blocks/hooks once in `packages/ui`; demo example files (copied from reui as content) live in `registry/bases/<base>/{components,blocks}/<category>/`; metadata lives in the typed `registry/catalog.ts` manifest.
2. **Automated Package Generator (`build-component-packages`):**
   - Generates `packages/registry/bases/<base>/components/<category>/package.json` with name `@ui-kit/components-<base>-<category>`.
   - Uses `esbuild` to pre-bundle the category previews into `dist/index.js`, externalizing React context dependencies (React, Radix, next-themes, … must share the single app instance).
   - Auto-wires `lib/generated/component-preview-loaders/index.ts` to `"<base>:<category>" → () => import(pkg)`.
3. **4-script pipeline (`packages/registry-builder/`)** — the concept is borrowed from `reui`, the sources are ui-kit's own:
   - `build-components` → per-category shards + preview loader files + catalog stats.
   - `build-component-packages` → esbuild category packages (skip-broken alias resolution, metafile-driven dependency extraction, `--wire-app` / `--watch`).
   - `build-registry` → static `public/r/styles/<base>-<style>/*.json` with import-path rewriting + internal `@ui-kit/<name>` dependency resolution.
   - `verify-registry` → production gate (dependency completeness, no leaked internals, base/radix example-set alignment).
4. **Key Benefits**:
   - **🚀 Dev Server Speed:** Prevents Next.js / Turbopack from recompiling 600+ components on every refresh.
   - **📦 Modular Tree-Shaking:** Consumers can install only the category they need (`pnpm add @ui-kit/components-base-accordion`).
   - **🛡️ Clean Isolation:** Prevents alias clashes and dependency bloat between Base UI and Radix UI.
   - **➕ Better than `reui`:** `packages/ui` is the single runtime source (no per-base installed copies → no copy-drift); `_registry.ts` + `meta.json` are generated from one typed catalog (no hand-maintained metadata); **no `registry-reui/` layer** — the two-layer source split is reui-specific and not needed here.


---

## 3. Multi-Engine Strategy: Base UI vs. Radix UI

To provide clean parity with `reui`, primitives will follow an engine-switchable architecture:

1. **Primitive Parity Matrix**:
   - **Dialog/Modal:** `@base-ui/react/dialog` vs `@radix-ui/react-dialog`
   - **Popover:** `@base-ui/react/popover` vs `@radix-ui/react-popover`
   - **Tooltip:** `@base-ui/react/tooltip` vs `@radix-ui/react-tooltip`
   - **Accordion / Collapsible:** `@base-ui/react/accordion` vs `@radix-ui/react-accordion`
   - **Tabs:** `@base-ui/react/tabs` vs `@radix-ui/react-tabs`
   - **Select / Dropdown:** `@base-ui/react/select` vs `@radix-ui/react-dropdown-menu`
   - **Slider / Switch / Checkbox / Radio:** Base UI native vs Radix UI native

2. **Unified API Wrapper Pattern**:
   ```tsx
   // Example: packages/ui/src/components/button/button.tsx
   import * as React from "react"
   import { Slot } from "@radix-ui/react-slot"
   import { cva, type VariantProps } from "class-variance-authority"
   import { cn } from "@/lib/utils"

   // Impeccable UX: purposeful states, active scale micro-interaction, WCAG AAA contrast
   export const buttonVariants = cva(
     "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
     {
       variants: {
         variant: {
           default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
           destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
           outline: "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
           secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
           ghost: "hover:bg-accent hover:text-accent-foreground",
           link: "text-primary underline-offset-4 hover:underline",
         },
         size: {
           default: "h-9 px-4 py-2",
           sm: "h-8 rounded-md px-3 text-xs",
           lg: "h-10 rounded-md px-8",
           icon: "h-9 w-9",
         },
       },
       defaultVariants: {
         variant: "default",
         size: "default",
       },
     }
   )
   ```

---

## 4. Advanced UI Components & Rich Blocks to Port from `reui`

### A. Advanced Atomic Components
1. **`autocomplete.tsx`**: Combobox with async search, group dividers, and keyboard navigation.
2. **`number-field.tsx`**: Precise numeric stepper with scrubbing, clamping, and formatters.
3. **`phone-input.tsx`**: International country code picker + auto formatting.
4. **`date-selector.tsx`**: Dual-month range picker with presets, time-zone offsets, and relative date chips.
5. **`rating.tsx`**: Half-star precision, hover preview, and custom icon support.
6. **`icon-stack.tsx` & `icon-tile.tsx`**: Visual badge clusters and layered icon surfaces.

### B. High-Order Enterprise Blocks
1. **`data-grid/`**:
   - Column resizing, pinning, reordering.
   - Virtualized row rendering (`@tanstack/react-table` + `@tanstack/react-virtual`).
   - Multi-column sorting, facet filters, global search, and export (CSV/JSON).
2. **`kanban/`**:
   - Drag-and-drop board powered by `@dnd-kit/core` & `@dnd-kit/sortable`.
   - Column swimlanes, custom card badges, optimistic updates, and WIP limits.
3. **`gantt/`**:
   - Timeline bar views, milestone indicators, dependency links, drag-to-reschedule.
4. **`event-calendar/`**:
   - Month / Week / Day / Agenda views with recurring events and collision detection.
5. **`filters/`**:
   - Query builder with conditional operators (`AND` / `OR`), custom predicate rows, and saved filter views.
6. **`tree/`**:
   - Multi-select, drag reordering, asynchronous branch loading via `@headless-tree/react`.

---

## 5. Impeccable UX/UI Craft Verification Guidelines

Every component and block in `ui-kit` must pass the **Impeccable Craft Floor** ([`reference/craft-floor.md`](file:///E:/me/devops/claude-partices/.claude/skills/impeccable/reference/craft-floor.md)):

1. **Contrast & Color Semantics**:
   - Body & placeholder text $\ge 4.5:1$, large headers $\ge 3:1$.
   - Secondary text on colored surfaces must be tinted from the background hue, never dull disconnected gray.
2. **Depth & Elevation**:
   - Shadows must carry genuine offset and soft gaussian blur (`box-shadow: 0 4px 20px -2px rgba(0,0,0,0.06)`).
   - Reject zero-offset decorative glowing halos unless deliberately neobrutalist.
3. **Rhythm & Spacing**:
   - Tight internal groupings, generous section separation.
   - Distinct heading scale with more spacing above a header than below it.
4. **Anti-Pattern Bans**:
   - 🚫 **No nested cards**: Avoid cards inside cards inside cards. Use clean dividers, whitespace, or subtle tonal shifts.
   - 🚫 **No eyebrow/kicker labels**: Headings must carry their own weight without redundant tiny uppercase tags.
   - 🚫 **No gradient keyword fills**: Use typographic weight and scale for emphasis instead of flashy gradients.
   - 🚫 **No unstyled empty states**: Always supply clear empty illustration/icon, explanatory copy, and primary action button.
5. **Interactive Feedback**:
   - Every interactive control must feature `:hover`, `:focus-visible` (ring with offset), `:active` micro-scale ($0.98$), `:disabled`, and `loading` states.

---

## 6. Phased Implementation Roadmap

### Phase 1: Engine Foundation & Dual-Base Infrastructure (Weeks 1–2)
- [ ] Configure `@radix-ui/*` dependencies alongside `@base-ui/react` in `packages/ui`.
- [ ] Set up engine switcher in `apps/uikit` (`/base/[category]` vs `/radix/[category]`).
- [ ] Refactor existing 25 categories to export both Base UI and Radix UI implementations.
- [ ] Add dynamic design token switcher (Font pairing: Sans/Serif/Mono, Radius: 0 to 0.875rem, Accents).

### Phase 2: Missing Core Primitives Port (Weeks 3–4)
- [ ] Port remaining 47 atomic primitives from `reui` (`autocomplete`, `rating`, `phone-input`, `number-field`, `timeline`, `tree`, `sortable`, `drawer`, `command`, `context-menu`, `menubar`, `navigation-menu`, `resizable`, `sonner`, `spinner`, `toggle-group`).
- [ ] Implement unit tests & keyboard navigation audits for all new primitives.

### Phase 3: Enterprise UI Blocks Port (Weeks 5–7)
- [ ] **Block 1: Data Grid** (`@tanstack/react-table` with virtualization, column pinning, and faceted search).
- [ ] **Block 2: Kanban Board** (`@dnd-kit` drag-and-drop, swimlanes, task cards).
- [ ] **Block 3: Event Calendar** (Month, week, day, time grid).
- [ ] **Block 4: Complex Filter Bar** (Compound logic queries, date ranges, badges).
- [ ] **Block 5: Gantt Chart** (Timeline scheduling, task spans).

### Phase 4: Impeccable UX Audit & Production Registry Release (Week 8)
- [ ] Execute Impeccable audit pass on mobile (375px), tablet (768px), and desktop (1440px).
- [ ] Verify light/dark theme contrast scores with automated accessibility tests.
- [ ] Generate static registry manifests (`public/r/*.json`) and verify compatibility with `npx shadcn add`.
