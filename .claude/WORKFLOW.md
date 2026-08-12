# claude-partices — Daily Development Workflow

Daily habits that keep the codebase clean, secure, and deployable at all times.

---

## Feature branch workflow

```
main ──────────────────────────────────────────►
   │                                          │
   └── {type}/{short-description}             │
         │                                    PR/MR
         ├─ /security-scan  ← run first, always
         ├─ write tests (before implementation)
         ├─ implement
         ├─ /before-pr      ← final gate
```

### Branch naming

Full rules live in `.claude/rules/git.md`. Summary:
```
{type}/{short-description}
```
No ticket tracker is wired up yet, so there's no ticket segment — see `.claude/rules/git.md`.

---

## Command sequence — every change

Run in this exact order. Do not skip steps.

| Step | Command | When |
|---|---|---|
| 1 | `/security-scan` | Always, first |
| 2 | Write tests | Before implementation |
| 3 | Implement | After tests are failing |
| 4 | `/before-pr` | Final gate before opening a PR/MR |
| 5 | Open PR/MR | After all gates pass |

If the change is a visual/UI change under `frontend/`: run `/qa-visual` before Step 4, and reach
for `impeccable audit`/`critique`/`live` during Step 3 if the change is a real design pass, not
just a tweak (see `nextjs-vercel-skills/SKILL.md` §3d for which of the three fits). If it adds a
missing shadcn component: run `/add-shadcn` as part of Step 3. If it adds a new table/endpoint:
run `/new-backend-resource` as part of Step 3.

---

## Daily habits

### 1. Start every session with context

```bash
git status && git log --oneline -5
git fetch origin && git log origin/main --oneline -5   # anything broken upstream?
```

### 2. Tests first, always

Write one failing test before writing any implementation. This is not optional.

```bash
# api/ — once scaffolded
mvn -f api/pom.xml test -Dtest=<TestClass> -Dsurefire.failIfNoSpecifiedTests=false

# frontend/ — once scaffolded
cd frontend && pnpm test --watch
```

### 3. Format before every commit

```bash
# api/ — once scaffolded: mvn -f api/pom.xml spotless:apply (or whichever formatter is adopted)
# frontend/ — once scaffolded: cd frontend && pnpm format
```

Commit formatting separately from logic changes.

### 4. Never commit directly to `main`

All changes go through a PR/MR + review. `main` is always deployable.

---

## Before opening a PR/MR

```
/before-pr   → runs lint + types + tests + review
```

## Before deploying

Not applicable yet — no deploy target chosen. Add a `/deploy-check` command and this section
the day one is.

---

## Skill routing — which skill to reach for

| I need to... | Use |
|---|---|
| Implement any new feature spanning `api/` or `frontend/` | `project-implementation-guide` |
| Work on anything under `frontend/` (Next.js) specifically | `nextjs-vercel-skills` |
| Review for security/compliance/quality issues | `project-quality-and-security` |
| Add a new skill | `writing-a-new-skill` |

---

## Environment health checks

Not applicable yet — no running services exist. Add health-check commands here once `api/` and
`frontend/` are scaffolded and running locally.
