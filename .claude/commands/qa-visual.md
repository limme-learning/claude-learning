---
name: qa-visual
description: "Run a local browser check (screenshot + contrast/a11y report) against the dev server to verify a visual change before calling it done. Usage: /qa-visual [route]"
argument-hint: "[route]"
---

# /qa-visual

Verify a UI change actually renders correctly and meets contrast/accessibility standards, using
the running local dev server rather than a visual claim taken on faith. Applies once `frontend/`
is scaffolded — if it doesn't exist yet, say so and stop rather than guessing at a dev command.

`$ARGUMENTS` is an optional route (e.g. `/pricing`). If empty, infer the route from the file(s)
just edited in this session; if that's ambiguous, ask which route to check.

## Step 0 — Ensure the dev server is running

Check for a server already listening on `localhost:3000` (Next.js default). If none is running,
start it in the background from `frontend/` (`pnpm dev` / `npm run dev` — check
`frontend/package.json` for the actual script name) and wait for the "ready" log line before
continuing.

## Step 1 — Capture the route

Use a headless browser (e.g. `npx playwright test --ui-mode=headless`, or an equivalent
screenshot script already present in this repo — check for one before writing a new one) to:

- Load the target route at the default viewport, plus one mobile width (e.g. 390px).
- Capture a screenshot of each.
- Extract computed foreground/background colors for text elements changed in this session.

## Step 2 — Check contrast and layout

- Compute WCAG contrast ratio for changed text/background pairs. Flag anything under 4.5:1 for
  normal text or 3:1 for large text.
- Look at the screenshots for obvious layout breaks (overlap, overflow, clipped content) at both
  viewports captured.

## Step 3 — Report and self-correct

- If a contrast or layout violation is found: fix the offending code (e.g. adjust the color to
  the nearest on-brand token from this project's design doc, once one exists — see
  `nextjs-vercel-skills/SKILL.md` §3a) and re-run Step 1–2 to confirm the fix before reporting
  done.
- If everything passes: report which route/viewports were checked and that no violations were
  found. Don't just say "looks good" — state what was actually checked.

Do not skip this command for a visual change and assert it works without having run it.
