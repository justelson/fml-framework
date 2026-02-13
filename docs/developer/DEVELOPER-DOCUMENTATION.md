# FML Developer Documentation

## Purpose

This document is the developer entry point for implementing, testing, and shipping FML changes safely.

## Repository layout

- `fml-framework/`: reusable formulas, templates, and references.
- `mathf3-o/`: Form 3 production app.
- `mathf4-o/`: Form 4 production app.
- `portal/`: unified root site and docs dashboards.
- `scripts/build-vercel.mjs`: build assembly script for deploy output.

## Local setup

1. Clone repository.
2. Install root dependencies.
3. Install app dependencies if required.
4. Configure environment variables locally.

Core command references:

- `npm run build` from root.
- `cd mathf3-o && npm run dev`.
- `cd mathf4-o && npm run dev`.

## Implementation flow

1. Define or update math logic.
2. Expose logic through tool schema definitions.
3. Wire tool dispatch paths to deterministic functions.
4. Surface changes in chapter UI.
5. Add tests and verify both normal and edge cases.

## Branching policy

- `main`: approved development source.
- `official-deployment`: production deployment branch.
- feature branches: scoped implementation work.

Recommended release pattern:

1. Merge validated feature branches into `main`.
2. Sync approved release set to `official-deployment`.
3. Deploy from `official-deployment` in Vercel.

## Review checklist

- No unresolved conflicts.
- No secret values committed.
- Build succeeds in root and affected app.
- Docs updated when behavior changes.
- Route navigation remains consistent.
