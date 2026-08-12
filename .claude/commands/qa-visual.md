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

## Step 1 — Run the automated check

Don't install a separate headless-browser stack for this — Impeccable (installed at
`.claude/skills/impeccable/`) already bundles a Puppeteer-driven detector that includes a
contrast/layout engine, and running it doubles as `nextjs-vercel-skills/SKILL.md` §3d's
`impeccable audit` step. Run it at the default viewport, then again at a mobile width:

```bash
node .claude/skills/impeccable/scripts/detect.mjs <url>
node .claude/skills/impeccable/scripts/detect.mjs --viewport 390x844 <url>
```

First run in a repo needs Puppeteer resolvable from an ancestor of `.claude/skills/impeccable`
— Node ESM `import()` doesn't honor `NODE_PATH`, so `npm install --save-dev puppeteer` at the
workspace root the skill lives under (not just the target app's own `node_modules`) if the
command errors with "puppeteer is required." Chromium download needs pnpm's build-script
approval (`allowBuilds`/`onlyBuiltDependencies` in `pnpm-workspace.yaml`, not the piped
`pnpm approve-builds` picker — that hangs badly on non-interactive stdin).

Exit code 0 with no output = clean pass at that viewport. Non-zero = findings printed to
stderr, including the specific contrast/line-length/overused-pattern issue and why it matters.

For a one-off visual sanity check beyond what the detector's rules cover (spacing that "reads
wrong" but isn't a rule violation), grab actual screenshots the same way, then delete them —
they're a verification aid, not a deliverable:

```bash
node -e "const puppeteer=require('puppeteer');(async()=>{const b=await puppeteer.launch();const p=await b.newPage();await p.setViewport({width:1280,height:900});await p.goto('<url>',{waitUntil:'networkidle0'});await p.screenshot({path:'.qa-desktop.png',fullPage:true});await b.close();})();"
```

## Step 2 — Read the findings

- Any contrast finding (WCAG under 4.5:1 normal / 3:1 large text) or layout-breaking finding is
  blocking.
- A floating circular "N" overlay in screenshots is the Next.js dev-mode indicator, not a real
  layout defect — it doesn't ship in production builds. Don't "fix" it.

## Step 3 — Report and self-correct

- If a contrast or layout violation is found: fix the offending code (e.g. adjust the color to
  the nearest on-brand token from this project's design doc, once one exists — see
  `nextjs-vercel-skills/SKILL.md` §3a) and re-run Step 1–2 to confirm the fix before reporting
  done.
- If everything passes: report which route/viewports were checked and that no violations were
  found. Don't just say "looks good" — state what was actually checked.

Do not skip this command for a visual change and assert it works without having run it.
