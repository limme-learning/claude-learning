# Contributing to ui-kit

## Ground rule

`packages/ui/src/{components,base-components,blocks,base-blocks}` is an **install layer**, not a
place to hand-edit. Change it only via:

- the `shadcn` CLI (`pnpm exec shadcn add <component> -y` from `packages/ui`), or
- a documented, systematic audit applied identically across all 8 styles (Vega, Nova, Maia, Lyra,
  Mira, Luma, Sera, Rhea) and both engines (Base UI, Radix).

Never a one-off tweak for a single demo. If you install a component from this registry, you
should get the exact same primitive everyone else gets — only the example wrapper differs.

All customization, variety, and one-off styling choices belong in
`packages/registry/bases/{base,radix}/...` instead.

## Making a change

1. `pnpm install`
2. `pnpm --filter @ui-kit/uikit dev` — iterate against the live showcase.
3. If you touched `packages/ui` or `packages/registry`, rebuild the registry before checking the
   site:
   ```bash
   pnpm --filter @ui-kit/registry-builder run build:components
   pnpm --filter @ui-kit/registry-builder run build:packages
   pnpm --filter @ui-kit/registry-builder run build:registry
   pnpm --filter @ui-kit/registry-builder run verify:registry
   ```
4. `pnpm --filter @ui-kit/uikit build` before opening a PR — must produce zero type errors and
   zero `@ts-nocheck` escapes in new code.

## Dependency versions

Keep every package version identical between the workspace root `package.json` and
`packages/ui/package.json`. A mismatch silently installs two copies of the same library, which
has repeatedly caused real bugs here (broken chart rendering, broken calendar types, broken
Drawer props) that only show up at type-check or runtime, not at install time.

## Adding a new style or engine

Both are data, not code forks — see `packages/registry-builder/src/build-registry.ts`'s
`uiDir`/`blocksDir` helpers and `registry/styles.tsx` / `registry/bases.ts` for the pattern
already used by the 8 existing styles and 2 existing engines.

## Git conventions

Same scheme as the workspace root (`.claude/rules/git.md`) — no ticket tracker wired up, so
type + short description only.

**Branch naming**: `{type}/{short-description}`
- All lowercase, hyphens only (no underscores/spaces)
- Type from: `feat` · `fix` · `hotfix` · `refactor` · `test` · `docs` · `chore` · `perf` · `style` · `revert`
- Description: 2–5 words

```
feat/base-ui-engine
fix/destructive-badge-contrast
docs/contributing-git-rules
```

**Commit message**: `<type>(<scope>): <description>`

Scopes — real package names in this workspace:

| Scope | Package |
|-------|---------|
| `uikit` | `apps/uikit` |
| `ui` | `packages/ui` |
| `registry` | `packages/registry` |
| `registry-builder` | `packages/registry-builder` |

```
fix(ui): correct destructive-light badge text color in light mode
feat(uikit): add not-found page
chore(registry-builder): restore base engine in build loop
```

**Common rules**:
- Subject line ≤ 72 characters
- Imperative mood: "add" not "added" or "adding"
- No capital letter at the start of the description, no period at the end
- Never add a co-author trailer unless explicitly asked
- Never force-push to `main`
- One logical change per commit — a registry rebuild triggered by a `packages/ui` edit belongs in
  the same commit as that edit, not a separate one
