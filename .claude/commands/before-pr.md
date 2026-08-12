---
name: before-pr
description: "Full pre-merge gate: lint, types, tests, review. Run after /security-scan and before opening a PR/MR. Usage: /before-pr"
argument-hint: []
---

<!--
Neither api/ nor frontend/ is scaffolded yet — Step 2's commands have no real target. Fill them
in the day each stack exists rather than leaving a command that fails confusingly.
-->

Run a full pre-merge gate on the current changes. Work through all steps in order and stop at
the first blocking failure.

## Step 1 — Detect what changed

```bash
git diff --name-only HEAD
git diff --name-only origin/main...HEAD
```

## Step 2 — Automated quality gates

Run only the block(s) matching what actually changed.

```bash
# api/ (Java/Spring Boot) — once scaffolded
mvn -f api/pom.xml verify

# frontend/ (Next.js) — once scaffolded
cd frontend && pnpm lint && pnpm typecheck && pnpm test
```

If any command fails, stop here. Report the exact error and the file/line that caused it. Do
not proceed to the next step until the user has fixed it.

## Step 3 — Senior code review

Review the staged diff yourself. Focus on:
- Correctness and logic bugs in the changed files
- Security issues — see `.claude/rules/security.md`
- Anything Step 2 structurally can't catch: architecture-rule violations, missing edge-case
  tests, inconsistent error handling

Report findings by severity. Critical and High findings are blocking — the user must resolve
them before merging.

## Step 4 — Final checklist

- [ ] All tests pass (no skipped/disabled tests added without a tracked reason)
- [ ] No new `TODO`/`FIXME` without an issue reference
- [ ] Database migration added if schema changed (with a rollback path)
- [ ] Generated API client regenerated if the `api/` contract changed (see
  `nextjs-vercel-skills/SKILL.md` §3c, Option A)

Report the final status: **READY TO MERGE** or **BLOCKED** with the list of what needs fixing.
