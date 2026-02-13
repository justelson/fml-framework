# Official Deployment Policy

This project uses `official-deployment` as the production deployment branch.

## Source of truth

- `main` is the approval branch.
- Any change to production must be reviewed and approved on `main` first.
- `official-deployment` must only contain approved code from `main`.

## Required workflow

1. Approve and merge changes into `main`.
2. Sync `official-deployment` from `main` (fast-forward or merge from `main`).
3. Push `official-deployment`.
4. Vercel deploys from `official-deployment`.

## Deployment scope

When `official-deployment` is updated from `main`, the deployed app includes all approved `main` changes, including:
- `/` portal landing page
- `/3o/` Form 3 app
- `/4o/` Form 4 app

## Branch protection recommendation

- Protect `official-deployment` from direct edits.
- Allow updates only through sync from `main`.
