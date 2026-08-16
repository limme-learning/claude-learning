# ui-kit

A dual-engine (Base UI + Radix UI) design-system component library with a showcase app, a
reusable `packages/ui` component + style source, and a registry builder for `shadcn`-style
installs.

## Layout

- `apps/uikit` — Next.js showcase (`/base` and `/radix` engine variants, 8 styles, Components/Blocks tabs).
- `packages/ui` — component primitives (`components`/`base-components`), blocks
  (`blocks`/`base-blocks`), and `style-*` CSS layers — source of truth for the registry.
- `packages/registry` — per-engine, per-category example source (`bases/base`, `bases/radix`).
- `packages/registry-builder` — builds `shadcn`-compatible registry JSON for the install command.

## Getting started

```bash
pnpm install
pnpm --filter @ui-kit/uikit dev
```

## Rules

See `AGENTS.md` — `packages/ui` is a pure shadcn/reui install layer (CLI or systematic audit
only, no one-off hand edits). Customization and variety belong in `packages/registry`.
