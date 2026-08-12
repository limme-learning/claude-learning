---
name: writing-a-new-skill
description: >
  Meta-guide for adding a new skill to this project's .claude/skills/ directory. Use this
  whenever the user asks to "add a skill", "create a skill for X", wants Claude to
  remember a recurring implementation pattern as reusable guidance, or when you notice
  yourself re-deriving the same project-specific context across multiple unrelated tasks
  and it would be worth writing down once. Trigger on: "add a skill", "make this a skill",
  "write a skill for", "how do I add a skill".
---

# Writing a New Skill

A skill is a packaged mental model — the context an implementer needs BEFORE starting a
category of task, written down once instead of re-derived (or re-explained by a human) every
time. This project's skills live in `.claude/skills/<name>/SKILL.md`.

---

## 1. Decide if it should be a skill at all

A skill earns its place if it's:
- **Recurring** — the same context would otherwise be re-explained across many unrelated tasks
- **Non-obvious from reading the code** — if `grep`-ing the codebase for 30 seconds would
  reveal the same thing, a skill just adds staleness risk for no benefit
- **Stable enough to write down** — a fast-moving in-progress decision belongs in a project
  memory or a doc, not a skill (skills should describe "how this project works," not "what
  we're debating this sprint")

If it's a one-off fact relevant to a single task, it doesn't need a skill — just say it.

## 2. The file

```
.claude/skills/<kebab-case-name>/
├── SKILL.md              ← required — frontmatter + the guide itself
└── references/           ← optional — deep-dive docs kept OUT of the main context window
    └── <topic>.md
```

Put anything long, dense, or rarely needed (a full API reference, an exhaustive pattern
catalog) into `references/` and link to it from `SKILL.md`, rather than inlining it — SKILL.md
itself gets loaded into context whenever the skill triggers, so it should stay skimmable.

## 3. The frontmatter — the part that matters most

```yaml
---
name: <kebab-case-name>
description: >
  <One dense paragraph: WHAT this skill is for, WHEN to use it, and a "Trigger on: ..."
  list of concrete phrases/keywords a user or Claude's own reasoning would actually produce.>
---
```

The `description` is the ONLY thing used to decide whether this skill is relevant to a given
task — write it for that job, not as a summary for a human reading the file later.

- **Front-load the trigger conditions.** "Use this whenever X" beats a description that
  explains the skill's philosophy before saying when it applies.
- **List concrete phrases, not abstract categories.** "Trigger on: 'add a page', 'new
  component', 'wire up a form'" beats "Trigger on: frontend development tasks" — the latter is
  too broad to be a useful signal and too vague to rule anything out.
- **Name every module/package/tool that should trigger it.** If this skill is about a specific
  part of the codebase, list that part's actual name(s) — a skill that only says "implementing
  features" will both over-trigger (matches everything) and under-trigger (doesn't obviously
  match when someone says the module's actual name).
- **Keep it to one skill's worth of scope.** If the description needs "and" to cover two
  unrelated trigger conditions ("use this for API design AND for deployment"), it's probably
  two skills.

## 4. The body — structure that's held up well in this project

1. **One-paragraph orientation** — what this skill covers, in plain terms
2. **A decision table or checklist near the top** — "which module", "which of these applies to
   you" — so a reader can skip to the relevant section instead of reading linearly
3. **Concrete, copy-pasteable recipes** — real import paths, real command names, using this
   project's actual libraries — never a generic example that could belong to any project
4. **A short sanity checklist at the end** — the highest-value section; a reader should be able
   to run through it in under a minute before committing

## 5. When to split one skill into two

Split when:
- The description started needing "and"/"or" to cover unrelated triggers
- The file is long enough that a reader working on trigger condition A has to scroll past
  irrelevant content for trigger condition B to find what they need
- Two different roles/situations need genuinely different mental models (e.g. "implementing a
  feature" vs. "reviewing security" are different enough jobs to warrant separate skills, even
  though both eventually touch the same codebase)

## 6. Keep skills from going stale

A skill that describes a file path, a function name, or a threshold is a claim that it existed
when the skill was written. Before trusting a skill's specifics on anything more than a quick
task:
- If it names a file, glance at whether it still exists
- If it names a threshold/rule enforced by CI, spot-check it's still what CI actually enforces
- Prefer a skill that points at real files ("see `<file>` for the exact shape") over one that
  duplicates their content inline — pointing decays more gracefully than copying

## 7. Register it

After creating the skill:
- Add a row to `CLAUDE.md`'s "Skills — which one to reach for" table
- Add a row to `.claude/WORKFLOW.md`'s "Skill routing" table if it's relevant to the daily flow
- Both tables should stay in sync — they answer the same question from two angles
