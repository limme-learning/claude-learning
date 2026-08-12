---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.java"
  - "**/application*.yml"
  - "**/.env*"
---

# Security Rules

Applies once `api/` (Java/Spring Boot) and `frontend/` (Next.js) are scaffolded. Kept deliberately
short — a rule nobody enforces is worse than no rule; delete any section below that doesn't end
up matching a real lint/CI check once the stack exists.

---

## Secrets

- Never commit `.env`, `.env.local`, `application-secrets.yml`, or any file containing a real
  credential, API key, or connection string.
- Never hardcode a secret in source as a "temporary" value — use environment variables validated
  at startup (fail fast if a required one is missing).

## Backend (`api/` — Spring Boot)

- Authorization checks belong on the use-case/service layer, never assumed to be handled only by
  a controller-level annotation with no server-side re-check.
- Parameterize all queries — no string-concatenated SQL/JPQL.
- Validate all external input at the controller boundary before it reaches domain logic.

## Frontend (`frontend/` — Next.js)

- Never call `api/` with a raw `fetch` bypassing the project's typed API client, once one exists
  — see `nextjs-vercel-skills/SKILL.md` §3c, Option A.
- No secret or internal-only value in a `NEXT_PUBLIC_*` env var — those ship to the browser.
- Sanitize/escape any user-provided content rendered as HTML; never `dangerouslySetInnerHTML` on
  unsanitized input.

## Dependencies

- Run a dependency audit (`npm audit` / `mvn dependency-check:check` — whichever applies) as part
  of `/security-scan`, once the respective package manifest exists.

## When in doubt

Flag the concern and ask, rather than silently choosing the more permissive option.
