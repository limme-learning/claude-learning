---
name: add-shadcn
description: "Install a missing shadcn/ui component and wire up the import, instead of hand-rolling a custom equivalent. Usage: /add-shadcn <component>"
argument-hint: "<component>"
---

# /add-shadcn

Keep UI composed from shadcn's actual component set rather than a hallucinated or hand-rolled
equivalent. See `nextjs-vercel-skills/SKILL.md` §3b. Applies once `frontend/` is scaffolded with
shadcn/ui adopted — if `frontend/` doesn't exist yet, say so and stop rather than guessing paths.

`$ARGUMENTS` is the component name (e.g. `accordion`, `calendar`). If empty, infer it from what
the current task needs; if more than one plausible component fits, ask rather than guessing.

## Step 0 — Check if it's already installed

Look in `frontend/components/ui/` (adjust if this project's actual shadcn output dir differs)
for an existing file matching the component (e.g. `accordion.tsx`). If it's already there, stop
— just report that it's installed and show the import path (`@/components/ui/<component>`).
Don't reinstall or overwrite it.

## Step 1 — Install

```bash
cd frontend && npx shadcn@latest add <component>
```

Run this before writing any code that imports the component — never write the import first and
assume the file will exist.

## Step 2 — Wire the import

Use the component from `@/components/ui/<component>` in the code being written. Match the
composition patterns already used elsewhere in this codebase for similar components (check one
existing usage for prop conventions before inventing new ones).

## Step 3 — Report

Confirm the component was installed (or already present) and where it's now used.
