# FML Operations Runbook

## Purpose

Operational guidance for safe releases, incident response, and deployment maintenance.

## Release checklist

1. Confirm target commit in `main`.
2. Verify docs updates for feature changes.
3. Run root build and app-level validation.
4. Validate key routes and docs pages locally.
5. Sync approved release to `official-deployment`.
6. Deploy and run smoke checks in production.

## Smoke test checklist

- Portal pages load:
  - `/`
  - `/docs.html`
  - `/docs-user.html`
  - `/docs-developer.html`
- App routes load:
  - `/3o/`
  - `/4o/`
- Theme switch works on portal pages.
- Core chapter tools return expected outputs.
- AI assist returns tool-backed response when key is set.

## Environment and secret management

- Use deployment provider environment variables for secrets.
- Never commit API keys in source files.
- Rotate keys after suspected exposure.
- Restrict key scope where provider options allow it.

## Incident response

### Issue: AI unavailable

Immediate action:

- Check provider status and environment variables.
- Confirm key is set in deployment branch environment.

Mitigation:

- Keep chapter calculators available for deterministic usage.

### Issue: incorrect solver output

Immediate action:

- Reproduce with known input/output test case.
- Isolate regression commit.

Mitigation:

- Hotfix formula logic.
- Add regression test case before redeploy.

### Issue: broken route after deploy

Immediate action:

- Verify build output contains required route assets.
- Check deployment branch and output directory settings.

Mitigation:

- Rebuild from clean state and redeploy.

## Rollback pattern

1. Identify last healthy deployment commit.
2. Repoint deployment to healthy commit in `official-deployment`.
3. Redeploy and verify smoke checks.
4. Open follow-up issue with root-cause notes.

## Operational ownership note

Keep this runbook current with each major release so onboarding and incident handling remain predictable across maintainers.
