# Workspace Agent Guidelines

## Permissions & Autonomy
- Default Mode: `bypassPermissions` (Full tool authorization: Bash, Read, Write, Edit, Glob, Grep).
- Proactively run builds, tests, typechecks, and package generation commands.

## UI/UX Standards
- Enforce the **Impeccable Craft Floor** ([`.claude/skills/impeccable/SKILL.md`](file:///E:/me/devops/claude-partices/.claude/skills/impeccable/SKILL.md)) on all component and block development:
  - Contrast ratio $\ge 4.5:1$
  - Depth with soft blur and offset (no zero-blur decorative block shadows)
  - Full interaction states: `:hover`, `:focus-visible`, `:active:scale-[0.98]`, `:disabled`, and skeleton loading states
  - Zero lazy nested card containers

## Ecosystem Guidelines
- Mirror the ReUI ecosystem pattern: maintain component/block sources of truth in `registry/bases/base` and `registry/bases/radix`, generating pre-bundled derived workspace packages with `esbuild`.
