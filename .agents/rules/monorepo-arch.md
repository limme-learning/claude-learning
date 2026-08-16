# Monorepo & ReUI Ecosystem Guidelines

- **Target Application:** `apps/uikit`
- **Headless Dual-Engine:** Support `@base-ui/react` and `@radix-ui/*` primitives.
- **Source of Truth:** Author source files in `registry/bases/base/` and `registry/bases/radix/`.
- **Derived Workspace Packages:** Pre-bundled with `esbuild` into `packages/registry/bases/<base>/components/<category>` and `packages/registry/bases/<base>/blocks/<block>`.
