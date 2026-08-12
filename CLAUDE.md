# claude-partices

## What this is

A practice/scratch workspace for setting up and exercising a Claude Code `.claude/` configuration
(rules, commands, skills) against an intended stack of a Java/Spring Boot backend and a Next.js
frontend. Neither stack is scaffolded yet — this file and its companions describe the intended
shape so the first real implementation has a mental model to follow, and get corrected against
reality the moment code actually exists. See `plan.md` for the original Next.js-skill-setup
rationale this configuration grew from.

```
claude-partices/
├── api/                     # Java 21 / Spring Boot — NOT YET SCAFFOLDED
├── frontend/                # Next.js — NOT YET SCAFFOLDED
├── plan.md                  # original PRD: Next.js skill setup rationale
└── .claude/                 # Claude Code skills, commands, rules — this file's companions
```

---

## Quick start

Not applicable yet — `api/` and `frontend/` don't exist. Once scaffolded, fill in the real
install/run commands here rather than leaving this section aspirational.

---

## Tech stack

| Layer | Stack |
|-------|-------|
| Language (backend) | Java 21 (planned) |
| Framework (backend) | Spring Boot (planned) |
| Database | Not decided |
| Language (frontend) | TypeScript |
| Framework (frontend) | Next.js (App Router) |
| Testing | Not decided |
| Code quality | Not decided |
| CI/CD | Not decided |
| Secrets | Not decided |

---

## Architecture

Not decided yet beyond "backend + frontend, typed client in between" — see
`.claude/skills/project-implementation-guide/SKILL.md` §5 for the provisional wiring diagram.
Replace this section with the real, enforced structure the first time either side is scaffolded.

---

## Skills — which one to reach for

| Situation | Use skill |
|-----------|-----------|
| Implementing any new feature spanning `api/` or `frontend/` — read this first, every time | `project-implementation-guide` |
| Working on anything under `frontend/` (Next.js) specifically — caching, RSC, components, design system | `nextjs-vercel-skills` |
| Security/compliance review, coverage, or lint violations | `project-quality-and-security` |
| Adding a new skill to this list | `writing-a-new-skill` |

Slash commands (type `/` in Claude Code):

| Command | What it does |
|---------|-------------|
| `/security-scan` | Secrets scan now; SAST + dependency checks once `api/`/`frontend/` exist — run FIRST |
| `/before-pr` | Full pre-merge gate: lint, types, tests, review |
| `/git-work <type> <desc>` | Generate branch name and commit message — enforces `.claude/rules/git.md` |
| `/git-push [api\|frontend]` | Safely push the current branch, once a remote exists |
| `/qa-visual [route]` | Local browser check (screenshot + contrast/a11y) for a `frontend/` change |
| `/add-shadcn <component>` | Install a missing shadcn/ui component and wire the import |
| `/new-backend-resource <name>` | Scaffold a new `api/` endpoint + typed frontend client wiring |

---

## Daily workflow

See `.claude/WORKFLOW.md` for the full command sequence every contributor follows.

## Key documentation

| Topic | Location |
|-------|----------|
| Daily dev workflow | `.claude/WORKFLOW.md` |
| Next.js skill setup rationale | `plan.md` |
| Branching strategy | `.claude/rules/git.md` |

---

## Rules & conventions enforced by Claude Code

- `.claude/rules/git.md` — branch naming, commit message format (no ticket tracker yet)
- `.claude/rules/security.md` — secrets, backend/frontend security baseline
- No CI-enforced thresholds yet — nothing to cite until `api/`/`frontend/` exist and CI runs
