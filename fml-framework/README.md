# FML Framework (Formula Math Library)

The FML Framework is a formula-first structure for building curriculum math apps fast and consistently.

## What it is

Instead of writing UI-first math apps from scratch each time, FML standardizes:
- Formula implementations in Python
- Formula naming and data contracts
- Tool schema patterns for AI function-calling
- Reusable React templates for new chapter/app generation

This lets you build Form 3, Form 4, and future levels on the same architecture.

## Files ready now

`formulas/`:
- `algebra.py`
- `geometry.py`
- `statistics.py`
- `sequences.py`
- `accounting.py`
- `earth_geometry.py`
- `trigonometry.py`
- `vectors.py`
- `matrices.py`
- `probability.py`

`templates/`:
- `base-app/` (Vite + React scaffold)
- `chapter-template.jsx` (chapter starter)
- `ai-tools-template.js` (tool schema starter)

Other key files:
- `AGENT_GUIDE.md` (generation workflow guidance)
- `reference/form3-link.md` (historical reference map)
- `QUICK_START.md` (framework usage notes)

## How it works

1. Define a formula function in `formulas/*.py`.
2. Expose equivalent JS logic in app `src/lib/math.js`.
3. Define AI-callable tool schema in `src/lib/aiTools.js`.
4. Route tool calls via `src/lib/toolDispatcher.js`.
5. Render the feature in a chapter file under `src/chapters/`.
6. Validate with `tests/simple-test.js` and `tests/advanced-test.js`.

## Create a new app from this framework

1. Copy `templates/base-app` into a new folder (example: `mathf5-o`).
2. Add chapter files using `templates/chapter-template.jsx`.
3. Port needed formulas from `formulas/` into app math utilities.
4. Add or update AI tool schemas.
5. Add tests and docs.
6. Build and deploy.

## Install and self-deploy guidance

Framework folder itself is source/docs, not a standalone runtime app.
Deploy `mathf3-o` or `mathf4-o`:
- Install: `npm install`
- Build: `npm run build`
- Output: `dist/`
- Required env var: `VITE_GROQ_API_KEY`
- Host on Vercel, Netlify, Cloudflare Pages, Render Static, or any static server.

## PR instructions

1. Branch from `main`.
2. Keep commits scoped to one concern.
3. If formulas change, update matching tool schema/docs/tests.
4. Run app builds/tests before PR.
5. In PR description, include impacted curriculum areas and validation steps.

## Security note

Do not commit `.env` files or real credentials.
Current repository checks show placeholder keys in examples only.

## License

MIT License. See `../LICENSE`.
