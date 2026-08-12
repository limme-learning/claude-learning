---
name: nextjs-vercel-skills
description: >
  Pre-implementation mental model for `frontend/` (Next.js): which skill to consult first, in
  what order, and which project-specific rules fill the gaps the upstream Vercel skill pack
  doesn't cover (design tokens, UI component library, backend access). Use this EVERY TIME
  before implementing, editing, or reviewing anything under `frontend/` — routing, data
  fetching, caching, component composition, or a visual/UI change. Trigger on: "add a page",
  "new component", "fetch data", "cache this", "optimize this page", "add a form", "style
  this", or any task touching `frontend/apps/*`, `frontend/packages/*`, or Next.js files
  (`page.tsx`, `layout.tsx`, `route.ts`, `loading.tsx`, `error.tsx`).
---

<!--
`frontend/` isn't scaffolded yet. This skill states the intended setup so the first real Next.js
task has an order to follow; §1 (install command) works today, everything else in §3 is
provisional until frontend/ exists — check it still matches once it does.
-->

# Next.js / Vercel Skill Stack

Read this before touching any file under `frontend/`. It routes to the right skill for the job
rather than re-deriving Next.js conventions from scratch on every task.

---

## 1. One-time setup

Install the upstream Vercel skill pack (maintained externally — don't hand-roll what this
already covers):

```bash
npx plugins add vercel/vercel-plugin
```

This registers 7 skills for Claude Code: `next-best-practices`, `next-cache-components`,
`vercel-composition-patterns`, `vercel-react-best-practices`, `deploy-to-vercel`, plus
`turborepo` and `ai-sdk` (only relevant if `frontend/` ends up using a Turborepo pipeline or the
Vercel AI SDK — neither is decided yet).

---

## 2. Skill precedence — consult in this order

| Order | Skill | When |
|---|---|---|
| 1 | `next-best-practices` | Always first — file conventions, RSC/Client boundary, async APIs, metadata |
| 2 | `next-cache-components` | The moment a data fetch or mutation is introduced (`use cache`, `cacheTag`, `revalidateTag` — never `unstable_cache` or `getServerSideProps`) |
| 3 | `vercel-composition-patterns` | Deciding how components split up |
| 4 | `vercel-react-best-practices` | Final rendering/perf pass on any component |
| 5 | This project's own rules (§3 below) | Layered on top — never silently overrides a Vercel skill; if one of this project's rules must win, it says so explicitly and states why |
| 6 | `deploy-to-vercel` | Only at ship time |
| 7 | `turborepo` / `ai-sdk` | Only if the task actually touches the monorepo pipeline or the AI SDK |

If a project rule and a Vercel skill conflict, the Vercel skill wins by default.

---

## 3. Gaps the Vercel pack has no opinion on

### 3a. Design system

Not set up yet. Once a design doc exists (Tailwind tokens, spacing, typography), read it before
writing any UI and use only the tokens it defines — no unauthorized utility classes (e.g. an
arbitrary gradient). Update this section with the doc's real path the day it's created.

### 3b. UI component library

shadcn/ui (planned). Check `frontend/components/ui/` before writing any UI element. If a needed
component isn't installed, run the install command first (see `/add-shadcn`), then import it —
never hand-roll a component the library already provides.

### 3c. Data / auth backend

Backed by `api/` (Java/Spring Boot, this project's own backend) — never call it with a raw
`fetch`. Once an OpenAPI spec exists, generate a typed client from it and call through that
instead. Register new routes in the Next.js rewrite/proxy config once one exists; the browser
never talks to `api/`'s origin directly. See `/new-backend-resource` for scaffolding a new
endpoint + client wiring.

### 3d. Visual QA

After editing any visual client component, verify locally with `/qa-visual` before calling the
task done — don't assert a visual claim you haven't actually checked in a browser.

---

## 4. Quick commands

| Command | What it does |
|---|---|
| `/qa-visual [route]` | Screenshot + contrast/a11y check against the local dev server |
| `/add-shadcn <component>` | Install a missing shadcn/ui component and wire the import |
| `/new-backend-resource <name>` | Scaffold a new `api/` endpoint + typed frontend client wiring |

---

## 5. Non-goals

Don't write a custom skill duplicating `next-cache-components` or `next-best-practices` — they
already cover that ground and are maintained upstream by Vercel. If they're ever wrong for this
project (e.g. this repo pins an older Next.js major), say so explicitly in §3 above rather than
silently working around it.
