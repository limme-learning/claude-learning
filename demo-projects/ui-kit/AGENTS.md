<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## `packages/ui` is a pure shadcn install layer

`packages/ui/src/components` and `packages/ui/src/styles/style-*.css` must only be changed via
the `shadcn` CLI (`pnpm exec shadcn add <component> -y` from `packages/ui`) or a documented,
systematic audit applied identically across all 8 styles (Vega, Nova, Maia, Lyra, Mira, Luma,
Sera, Rhea) — never a one-off hand edit made for a single demo's sake. If someone installs a
component from this registry, they must get the exact same `packages/ui` primitive as everyone
else; only the example wrapper should ever differ.

All customization, variety, and one-off styling choices belong in
`packages/registry/bases/{base,radix}/...` instead.
