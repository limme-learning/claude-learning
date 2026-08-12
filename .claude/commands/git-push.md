---
name: git-push
description: "Safely push the current branch — checks for a remote, shows what would be pushed, and confirms before pushing. Never force-pushes. Usage: /git-push"
argument-hint: []
---

# /git-push

Push the current branch, safely. This is a single-repo workspace (see `.claude/rules/git.md`) —
plain `git`, no `-C`/multi-repo handling needed.

Read `.claude/rules/git.md` before proceeding for the branch-naming/commit-format context, though
this command's own job is narrower: the push step only.

---

## Step 0 — Confirm this is a git repo

```bash
git status
```

If this errors with "not a git repository", stop and say so — don't run `git init` yourself
without being asked; that's a decision for the user to make explicitly.

## Step 1 — Check for a remote

```bash
git remote -v
```

**If there is no remote**, stop here. Tell the user there's nothing to push to yet and give them
the exact command to add one once they have a URL:

```bash
git remote add origin <url>
```

Do not guess a URL. Do not proceed to any step below without a remote.

## Step 2 — Show what would be pushed

```bash
git branch --show-current
git status --short
git log @{u}..HEAD --oneline 2>/dev/null || git log --oneline -10
```

The `log @{u}..HEAD` form shows exactly what's new since the last push, if this branch already
tracks a remote branch; the fallback (`--oneline -10`) covers the first-ever push of a new
branch, where no upstream exists yet to diff against.

If the current branch is `main`, flag it explicitly: pushing a feature branch directly to the
trunk branch skips the PR/review step this project's daily workflow assumes — confirm that's
actually intended before continuing, don't push silently.

## Step 3 — Confirm before pushing

Show the user the branch name, the commit list from Step 2, and the target (`origin/<branch>`).
Pushing is a shared-state action — always confirm before it, even if a previous push in this
session was already approved once.

## Step 4 — Push

```bash
# first push of a new branch (no upstream yet):
git push -u origin <branch>

# subsequent pushes (upstream already tracked):
git push
```

**Never** add `--force`, `--force-with-lease`, or `--no-verify` unless the user explicitly asks
for one of those in this exact request — a routine push never needs them, and silently adding
one converts a safe operation into a destructive one.

If the push is rejected (non-fast-forward — someone else pushed first), stop and report it
plainly. Do not auto-run `pull`, `rebase`, or `fetch --force` to "fix" it — that's a merge
decision for the user, not something to resolve unattended.

## Step 5 — Report

```
Pushed — <branch> → origin/<branch>
  <N> commit(s):
    <oneline log from Step 2>
```

Or, if blocked at any step above, state exactly which step blocked it and what the user needs to
do next (init the repo, add a remote, resolve a rejected push, confirm a trunk-branch push).
