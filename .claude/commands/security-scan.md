---
name: security-scan
description: "claude-partices security scan — secrets check now, SAST/dependency checks once api/ and frontend/ are scaffolded. Run FIRST before /before-pr on every change. Usage: /security-scan"
argument-hint: []
---

<!--
Neither api/ (Java/Spring Boot) nor frontend/ (Next.js) is scaffolded yet, so most steps below
have no real tool to point at. Fill in Step 1/2 the day each stack actually exists — don't leave
them pointing at a command that doesn't exist; Step 3 (secrets) works today regardless of stack.
-->

# /security-scan

Run first — before anything else on every change. Blocks on any Critical/High finding.

## Step 1 — Static analysis (SAST)

Not wired up yet. Once `api/` exists: SpotBugs/Checkstyle via `mvn verify`. Once `frontend/`
exists: `eslint` + `next lint` (or an equivalent SAST tool if adopted). Skip this step until
then rather than running a command that doesn't exist.

## Step 2 — Dependency vulnerabilities

Not wired up yet. Once `api/pom.xml` exists: `mvn dependency-check:check`. Once
`frontend/package.json` exists: `npm audit` / `pnpm audit`. CVSS >= 7 = block.

## Step 3 — Secrets

```bash
gitleaks detect --source . --report-format json --report-path gitleaks-report.json
```

Any finding = **block immediately**. Rotate the leaked secret before proceeding — a scan
finding, once fixed in code, does not un-leak a secret that was ever committed; treat it as
already compromised.

## OWASP checklist

```
A01 — Broken Access Control
  [ ] Authorization enforced at the service/use-case layer (api/), not just a controller annotation
  [ ] Tenant/ownership isolation checked before every data access
  [ ] No endpoint left open by mistake (permit-all on something that shouldn't be)

A02 — Cryptographic Failures
  [ ] No sensitive data in logs, exception messages, or response bodies beyond what's needed
  [ ] Secrets come from environment variables validated at startup, never hardcoded
  [ ] TLS enforced at the edge

A03 — Injection
  [ ] No raw string-concatenated SQL/JPQL
  [ ] Input validated at the API boundary
  [ ] File upload MIME type validated server-side, not from the Content-Type header alone

A05 — Security Misconfiguration
  [ ] Containers run as non-root
  [ ] Only intended endpoints are publicly exposed (health/metrics, not admin/debug)
  [ ] No stack traces leak into error responses

A06 — Vulnerable Components
  [ ] Dependency scan: 0 findings above the CVSS threshold

A07 — Auth Failures
  [ ] Session/token lifetime is short; refresh tokens (if any) are HttpOnly + Secure
  [ ] Logout actually invalidates server-side state, not just a client-side token discard

A09 — Logging & Monitoring Failures
  [ ] Failed auth attempts logged with enough context to investigate, without logging secrets
  [ ] Sensitive-data access logged to an audit trail, not the general application log
```

## Gate report

```
Security Scan — [branch]    [date]

SAST:              PASS | FAIL | N/A (not scaffolded yet) — [N] findings
Dependency check:  PASS | FAIL | N/A (not scaffolded yet) — [N] findings
Secrets:           PASS | FAIL — [N] findings

Verdict: READY FOR /before-pr | BLOCKED — fix [N] issues first
```

## Hard rules

1. **Any Critical SAST finding → block** — no exceptions
2. **Secrets found → rotate immediately + confirm** — blocked until rotation is confirmed
3. **Dependency CVSS above threshold → block** — update the dependency or open a tracked issue
4. **Sensitive data in logs = Critical** — treat as an incident, not a lint warning
