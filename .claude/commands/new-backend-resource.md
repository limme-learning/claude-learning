---
name: new-backend-resource
description: "Scaffold a new api/ endpoint end-to-end (persistence, controller, authorization) plus typed frontend client wiring. Usage: /new-backend-resource <resource_name>"
argument-hint: "<resource_name>"
---

<!--
Neither api/ nor frontend/ is scaffolded yet, so the recipes below describe the intended shape,
not a verified one. Update the module-layout and client-regeneration specifics the first time
api/ actually exists, per project-implementation-guide/SKILL.md's staleness note.
-->

# /new-backend-resource

Scaffold a new backend resource end-to-end — persistence, controller, authorization, and the
typed frontend client wiring — never a raw ad-hoc query or a frontend `fetch` that bypasses the
generated client. See `nextjs-vercel-skills/SKILL.md` §3c and
`project-implementation-guide/SKILL.md` §1.

`$ARGUMENTS` is the resource name (e.g. `documents`). If empty, ask for it — don't guess a name.

## Step 0 — Gather the shape

Ask the user (if not already given in the request) what fields the resource needs and who
should be able to read/write it. Don't default to a permissive access rule without being told to.

## Step 1 — Add the endpoint in `api/`

Follow `api/`'s existing module conventions (see `project-implementation-guide/SKILL.md` §3 for
the package layout, once real). Include:
- The persistence layer (entity + repository)
- The controller/endpoint
- An authorization check scoped to the requesting user at the service layer — never an endpoint
  with no access check, and never authorization enforced only by a controller annotation with
  no server-side re-check (see `.claude/rules/security.md`)

## Step 2 — Regenerate the typed frontend client

```bash
# once api/ exposes an OpenAPI spec and a generator is chosen:
<API client regeneration command>
```

Never hand-write a `fetch` call for a new endpoint from `frontend/` — it only ever calls through
the generated client, per `nextjs-vercel-skills/SKILL.md` §3c.

## Step 3 — Wire the frontend

Use the newly generated client in the component/route that needs it, following
`nextjs-vercel-skills/SKILL.md`'s precedence order for how the fetch itself is cached
(`next-cache-components`).

## Step 4 — Report

State what was added in `api/`, whether the client was regenerated, and where it's used in
`frontend/`. Remind the user to run `/security-scan` and `/before-pr` before opening a PR.
