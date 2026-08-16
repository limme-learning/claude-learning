# Antigravity (AGY) Rules & Guidelines

## 1. Execution & Permissions
- **Mode:** Autonomous / Bypass Permissions Enabled (`bypassPermissions`).
- Proactively run necessary terminal commands, linting, tests, and build scripts without waiting for manual confirmation unless destructive actions on unversioned data are required.
- Do not stop for trivial permissions on safe operations (reading files, executing local test/dev scripts, compiling registries).

## 2. Integrated Skills & UX Design Quality
- **Impeccable Design Skill Active:** Reference [`.claude/skills/impeccable/SKILL.md`](file:///E:/me/devops/claude-partices/.claude/skills/impeccable/SKILL.md).
- **Craft Floor Enforced:** Follow [`reference/craft-floor.md`](file:///E:/me/devops/claude-partices/.claude/skills/impeccable/reference/craft-floor.md) for all frontend UI code:
  - Contrast $\ge 4.5:1$ (WCAG AA).
  - Genuine shadows with soft blur and offset (reject zero-offset colored halos).
  - Complete state coverage: `:hover`, `:active:scale-[0.98]`, `:focus-visible` offset ring, `:disabled`, skeleton loaders.
  - Ban anti-patterns: no nested cards, no eyebrow kickers, no gradient keyword fills.

## 3. Architecture & Monorepo Directives
- **Target Project:** [`demo-projects/ui-kit`](file:///E:/me/devops/claude-partices/demo-projects/ui-kit)
- **App Name:** `apps/uikit`
- **Headless Dual-Engine:** Support both `@base-ui/react` and `@radix-ui/*` primitives with unified wrappers in `packages/ui`.
- **Derived Packages:** Maintain source of truth in `registry/bases/<base>/` and compile into derived workspace packages under `packages/registry/bases/<base>/components/` and `packages/registry/bases/<base>/blocks/`.

## 4. Git & Security Rules
- Follow [`.claude/rules/git.md`](file:///E:/me/devops/claude-partices/.claude/rules/git.md) for clean branch naming and conventional commits.
- Follow [`.claude/rules/security.md`](file:///E:/me/devops/claude-partices/.claude/rules/security.md) for secrets management and sanitation.
