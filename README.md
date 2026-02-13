# FML Framework Math Apps

Reusable Formula Math Library (FML) framework plus two deployable web apps:
- `mathf3-o`: Form 3 Basic Mathematics
- `mathf4-o`: Form 4 Basic Mathematics (old syllabus)

Repository URL:
- Primary: `https://github.com/justelson/fml-framework`
- Redirecting legacy URL: `https://github.com/justelson/fml-3o`

## What the app does

This project delivers AI-assisted math learning apps where students ask natural-language questions, the app picks a matching math tool, computes results, and explains the answer step by step. It combines curriculum chapters, interactive visualizations, and automated validation tests for tool selection and answer quality.

## What is ready right now

Framework files ready in `fml-framework/`:
- Formula modules: `algebra.py`, `geometry.py`, `statistics.py`, `sequences.py`, `accounting.py`, `earth_geometry.py`, `trigonometry.py`, `vectors.py`, `matrices.py`, `probability.py`
- Agent/workflow guidance: `AGENT_GUIDE.md`
- Reusable templates:
  - `templates/base-app/` (Vite + React starter)
  - `templates/chapter-template.jsx`
  - `templates/ai-tools-template.js`

Application files ready:
- `mathf3-o/` complete React + Vite app (chapters, AI assistant, tests, docs)
- `mathf4-o/` complete React + Vite app (chapters, AI assistant, tests, docs)
- `.agent/workflows/` prompt/workflow docs used to generate and extend new math apps

## Repository structure

```text
touching_grass/
|- fml-framework/          # Formula-first reusable framework
|- mathf3-o/               # Form 3 web app
|- mathf4-o/               # Form 4 web app
|- python-scripts/         # Older Python implementations/reference
|- textbook/               # Curriculum source material
|- README.md
|- LICENSE
```

## Install and run locally

Prerequisites:
- Node.js 18+ and npm 9+
- Optional: Python 3.10+ for legacy `python-scripts/`

1. Clone:
```bash
git clone https://github.com/justelson/fml-framework.git
cd touching_grass
```

2. Run Form 3 app:
```bash
cd mathf3-o
npm install
cp .env.example .env        # macOS/Linux
# copy .env.example .env    # Windows PowerShell/cmd
# edit .env and set your key
npm run dev
```

3. Run Form 4 app:
```bash
cd ../mathf4-o
npm install
cp .env.example .env        # macOS/Linux
# copy .env.example .env    # Windows PowerShell/cmd
# edit .env and set your key
npm run dev
```

4. Required environment variable for both apps:
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

## Self-deploy anywhere

Both apps are static Vite builds and can be deployed on any static hosting provider.

Build command (per app):
```bash
npm install
npm run build
```

Publish directory:
- `dist`

Required environment variable:
- `VITE_GROQ_API_KEY`

Provider quick settings:
1. Vercel
- Root directory: `mathf3-o` or `mathf4-o`
- Build command: `npm run build`
- Output: `dist`

2. Netlify
- Base directory: `mathf3-o` or `mathf4-o`
- Build command: `npm run build`
- Publish directory: `dist`

3. Cloudflare Pages
- Build command: `npm run build`
- Build output directory: `dist`
- Set environment variable in project settings

4. Render Static Site / Railway static / any static host
- Build in app folder
- Upload or serve `dist/`
- Configure SPA fallback to `index.html`

5. Docker self-host
- Build app, then serve `dist/` with Nginx, Caddy, or any static file server

## Single Vercel hub deployment

This repository now supports one Vercel deployment that serves:
- `/` -> FML portal landing page
- `/3o/` -> full Form 3 app
- `/4o/` -> full Form 4 app

Root deployment setup:
1. Import this repository in Vercel.
2. Use root settings:
- Build command: `npm run build`
- Output directory: `deploy`
3. Add project environment variable:
- `VITE_GROQ_API_KEY`
4. Deploy.

The root build script (`scripts/build-vercel.mjs`) automatically:
- Builds `mathf3-o` with base `/3o/`
- Builds `mathf4-o` with base `/4o/`
- Copies both outputs plus the portal page into `deploy/`

Routing fallback for deep links is handled by `vercel.json`.

Official deployment branch policy:
- Use `official-deployment` as the production deployment branch in Vercel.
- That branch must be synced from approved `main` changes.
- See `DEPLOYMENT_POLICY.md` for the required workflow.

## Pull request instructions

1. Fork the repository.
2. Create a branch from `main`:
```bash
git checkout -b feat/short-description
```
3. Make focused changes in the relevant folder (`fml-framework/`, `mathf3-o/`, or `mathf4-o/`).
4. Run checks before pushing:
```bash
# Form 3
cd mathf3-o && npm run build && npm run test:advanced:quick

# Form 4
cd ../mathf4-o && npm run build && npm run test:advanced:quick
```
5. Commit with a clear message and push.
6. Open a PR to `main` with:
- Scope summary
- Screenshots for UI changes
- Test commands run and results
- Any new env vars or deployment impact

## Security and key handling

Private-key status check completed on February 13, 2026:
- No committed live API keys or private key files were found in tracked files.
- The repository only contains placeholder values like `your_groq_api_key_here` in docs/examples.
- `.env` files should remain local and must never be committed.

If a real key was ever exposed outside this repo, rotate it immediately in the provider dashboard.

## License

This project is licensed under the MIT License. See `LICENSE`.

## Submission text (ready to copy)

Full description:
FML Framework is a reusable formula-first system for building math education apps. This repo includes two production-ready React apps (`mathf3-o` and `mathf4-o`) where learners ask math questions in plain language, AI routes requests to validated math tools, and the app returns explained results with interactive visuals. Source: `https://github.com/justelson/fml-framework`.

Instagram-length comment:
Built with the FML Framework: two AI-powered math learning apps (Form 3 + Form 4) that turn plain-language math questions into computed, step-by-step answers with visuals. Install with `npm install`, set `VITE_GROQ_API_KEY`, run `npm run dev`, then deploy the `dist/` build on Vercel/Netlify/Cloudflare or any static host. Open source at `https://github.com/justelson/fml-framework`.
