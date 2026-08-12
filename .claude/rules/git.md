---
paths:
  - "**/.git"
  - "**/COMMIT_EDITMSG"
---

# Git Rules — Branch Names & Commit Messages

Single-repo workspace (root is the one git repo; `api/` and `frontend/` are plain subdirectories,
not separate repos — revisit this file if that ever changes to a multi-repo layout). No ticket
tracker is wired up yet (no Jira/Linear prefix) — this rule uses type + short description only;
revisit the day a tracker is adopted, since a stale scheme here is worse than admitting there
isn't one yet.

---

## Branch naming

```
{type}/{short-description}
```

Rules:
- All lowercase — no uppercase anywhere
- Hyphens only — no underscores, no spaces
- Type from the approved list (see below)
- Description: 2–5 words

Approved types: `feat` · `fix` · `hotfix` · `refactor` · `test` · `docs` · `chore` · `perf` · `style` · `revert`

Valid examples:
```
feat/add-checkout-flow
fix/geofence-accuracy-flag
chore/upgrade-eslint
```

---

## Commit message

Format: `<type>(<scope>): <description>`

```
feat(frontend): add checkout flow
fix(api): correct geofence accuracy threshold
chore(frontend): upgrade eslint to v9
```

Scopes — real module/package names in this repo, kept in sync as modules are added/renamed.
Neither `api/` nor `frontend/` is scaffolded yet, so there's no real scope list to write down —
update this section with the actual module names the first time either directory exists, rather
than inventing a plausible-looking list now.

## Common rules

- Subject line ≤ 72 characters
- Imperative mood: "add" not "added" or "adding"
- No capital letter at the start of the description
- No period at the end
- **Never add a co-author trailer** — not for Claude, not for anyone, unless the user explicitly
  asks for it
- Never force-push to `main` or any long-lived release branch

---

## When the user says "short commit" or "commit"

Run `git commit -m "<one-liner>"` only — no body, no heredoc multi-line message.
