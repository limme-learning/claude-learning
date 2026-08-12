---
name: git-work
description: "Generate branch name and commit message for a change. Usage: /git-work <type> <short-description> (e.g. /git-work feat add-checkout-flow)"
argument-hint: "<type> <short-description>"
---

<!--
No ticket tracker is wired up yet (see .claude/rules/git.md), so this drops the <TICKET> segment
the template version of this command normally takes. Re-add it the day a tracker is adopted.
-->

# /git-work

Generate the git artefacts for a change, applying `.claude/rules/git.md` mechanically instead of
re-deriving it by hand each time.

`$ARGUMENTS` is `<type> <short-description>` (e.g. `feat add-checkout-flow`). If either part is
missing, ask rather than guessing — a wrong type or description is worse than asking once.

## Step 1 — Validate the type

Must be one of: `feat` · `fix` · `hotfix` · `refactor` · `test` · `docs` · `chore` · `perf` ·
`style` · `revert`. If not, stop and ask which of these actually applies.

## Step 2 — Branch name

```
{type}/{short-description}
```

All lowercase, hyphens only, 2–5 word description.

## Step 3 — Commit message

```
<type>(<scope>): <description>
```

Scope: the real module the change lives in (`api`, `frontend`, or omit if the change spans
both or neither). Imperative mood, no trailing period, subject ≤ 72 chars.

## Step 4 — Output

```
Branch:  <type>/<short-description>
Commit:  <type>(<scope>): <description>
```

Then, if the user wants it applied immediately:

```bash
git checkout -b <branch-name>
```

Never run the commit itself here — that belongs to the actual commit step once changes exist.
