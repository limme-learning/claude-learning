---
name: project-quality-and-security
description: >
  Security, compliance, and code-quality guide for claude-partices. Use this skill for
  OWASP-style review, sensitive-data handling questions, static-analysis/lint violations,
  test-coverage gaps, or complexity/size threshold breaches. Trigger on: "security review",
  "is this safe", "OWASP", "lint violation", "coverage", or any task that touches
  `.claude/rules/security.md`.
---

# claude-partices Quality & Security Guide

## When to reach for this skill

- Reviewing a diff for security issues before merge
- Deciding whether a piece of data needs special handling (logging exclusion, audit trail,
  a distinct response DTO)
- Fixing a static-analysis, lint, or coverage-gate failure
- Deciding whether a method/file/class is too big or too complex

---

## Security review checklist

Full checklist: `.claude/commands/security-scan.md`. The three things that matter most in
review, worth restating here:

1. **Authorization at the right layer** — see `.claude/rules/security.md`'s backend section.
   A handler that "looks" protected because a caller happens to always be authenticated is not
   the same as an explicit check.
2. **No sensitive data past the boundary it needs to cross** — default to the narrowest
   response DTO the caller actually needs, not every field on the entity.
3. **Every external input is validated before it reaches business logic** — at the API
   boundary, not three layers deep where it's easy to forget a code path.

---

## Static analysis, coverage, and complexity

Not wired up yet — neither `api/` nor `frontend/` is scaffolded. Fill in this table the day CI
actually enforces these, rather than stating aspirational thresholds nobody gates on:

| Check | Tool | Threshold |
|---|---|---|
| Coverage | `<tool>` | `<N%>` |
| Method/function size | `<tool>` | `<N lines>` |
| File size | `<tool>` | `<N lines>` |
| Cyclomatic complexity | `<tool>` | `<N>` |
| Duplication | `<tool>` | `<threshold>` |

### Fixing a complexity/size violation

Prefer extracting a well-named private method/function over suppressing the rule. A
suppression comment should be rare enough that seeing one is itself worth a second look in
review — not a routine escape hatch.

---

## Common findings worth calling out by name

None yet — this project has no history to draw from. Add entries here the first time a
specific mistake recurs across more than one PR, rather than pre-filling a generic list.
