---
name: project-implementation-guide
description: >
  Pre-implementation mental model for claude-partices. Use this skill EVERY TIME before
  implementing, adding, or modifying any feature — even small ones. Covers which module owns
  a feature, what to reuse before writing new code, where files go, and how the pieces wire
  together. Trigger on: "implement X", "add X", "build X", "create a page/component/endpoint/
  form", "wire up X", "make X work", or any task touching `api/` or `frontend/`.
---

<!--
Neither api/ nor frontend/ is scaffolded yet. This skill states the intended shape (Java/Spring
Boot backend, Next.js frontend, matching template/claude's own reference project) so the first
implementation task has a mental model to follow — but every recipe below is provisional until
real code exists to check it against. Update §1-5 with real specifics the day either directory
is actually scaffolded; don't let this drift into describing a shape the code never took.
-->

# claude-partices Implementation Guide

Read this top-to-bottom before writing a single line. It is the mental model every feature in
this project needs: which module, what already exists, where things go, and how the pieces
connect.

---

## 1. Which module?

| Module | Audience | Key responsibilities | Status |
|-----------|----------|-------------|---|
| `api` | Backend clients (frontend, integrations) | Java 21 / Spring Boot service layer, persistence, auth | Not yet scaffolded |
| `frontend` | End users | Next.js app | Not yet scaffolded |

If a feature spans both, implement shared contracts (DTO shapes, API spec) once and generate the
typed client for `frontend` from it — never hand-duplicate the shape on both sides.

For the Next.js-specific mental model (skill precedence, caching, design tokens, component
library), see `nextjs-vercel-skills/SKILL.md` — that skill is the entry point for anything under
`frontend/`, this one is the entry point for anything spanning both or living in `api/`.

---

## 2. Pre-implementation checklist

### 2a. Is there a reusable component/utility already?

Not applicable yet — no shared package exists. Once `frontend/packages/` (or equivalent) is
scaffolded, check there before writing a new component; update this section then.

### 2b. Is there a generated/typed API client already?

Not applicable yet. Once `api/` exposes an OpenAPI spec, `frontend` should generate a typed
client from it (`<regeneration command>` — fill in once the tool is chosen: openapi-generator,
orval, etc.) and never hand-write a raw `fetch` call to `api/`.

### 2c. Does config/env need updating?

If the feature needs new configuration:
1. Add it to the relevant env schema (`api/src/main/resources/application.yml` for backend,
   `frontend`'s env schema once one exists)
2. Validate it at startup — fail fast if a required value is missing, never silently default a
   security-relevant value

---

## 3. File placement conventions

```
api/
  src/main/java/.../<module>/       # one package per bounded module (see §1)
frontend/
  apps/<app>/app/                   # Next.js App Router routes
  packages/                         # shared code across apps, once >1 app exists
```

**Rule:** keep route/controller entry points thin — push logic into a service/hook, not the
entry file itself.

---

## 4. Implementation recipes

No real recipes yet — neither stack is scaffolded. Add 2–4 short, copy-pasteable recipes here
(a service call with validation, a Next.js data fetch) using this project's actual libraries,
the first time each pattern is established for real — don't invent one in advance.

---

## 5. How everything wires together

```
browser → frontend (Next.js) → typed API client → api (Spring Boot) → persistence → back to UI
```

Cross-cutting concerns (auth, logging, error translation) — assign an owning layer here once
the stack exists; don't guess at this in advance.

---

## 6. Quick sanity checklist before you commit

- [ ] `/security-scan` run and clean
- [ ] `/before-pr` run and clean
- [ ] No hand-duplicated DTO/type shape between `api` and `frontend` where a generated client
  should exist instead
- [ ] `.claude/rules/git.md` branch/commit convention followed
