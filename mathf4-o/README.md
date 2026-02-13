# MathF4-O (Form 4 Basic Mathematics, Old Syllabus)

Interactive Form 4 math learning web app with AI-assisted solving and richer visual modules.

## What the app does

The app combines chapter-based learning with an AI assistant that interprets natural-language math questions, dispatches them to specialized tools, and returns computed answers with explanations. It includes topics like coordinate geometry, 3D figures, probability, trigonometry, vectors, matrices, and linear programming.

## Files ready

Key runtime files:
- `src/App.jsx`
- `src/chapters/` (Chapter1..Chapter8, Home, AIAssist, Settings)
- `src/lib/math.js` (core math functions)
- `src/lib/aiTools.js` (AI tool definitions)
- `src/lib/toolDispatcher.js` (tool execution)
- `src/lib/groqService.js` (Groq integration)

Key test/docs files:
- `tests/simple-test.js`
- `tests/advanced-test.js`
- `tests/verify-tools.js`
- `tests/data/`
- `docs/README.md`

## Install and run

Prerequisites:
- Node.js 18+
- npm 9+

```bash
npm install
cp .env.example .env        # macOS/Linux
# copy .env.example .env    # Windows PowerShell/cmd
# set your key in .env
npm run dev
```

Local URL:
- `http://localhost:5173`

Environment variable:
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

## Test commands

```bash
npm run test:simple
npm run test:simple:quick
npm run test:advanced
npm run test:advanced:quick
npm run test:advanced:random
```

## Self-deploy anywhere

Build:
```bash
npm install
npm run build
```

Deploy output:
- `dist/`

Set env var on host:
- `VITE_GROQ_API_KEY`

Platform notes:
1. Vercel: Root `mathf4-o`, build `npm run build`, output `dist`
2. Netlify: Base `mathf4-o`, build `npm run build`, publish `dist`
3. Cloudflare Pages: Build `npm run build`, output `dist`
4. Any static host: serve `dist/` and route SPA requests to `index.html`

## Pull request instructions

1. Branch from `main`.
2. Keep changes focused by topic.
3. Run `npm run build` and at least `npm run test:advanced:quick`.
4. Open PR with summary, test output, and screenshots for UI changes.

## Security and credentials

- Do not commit `.env`.
- Keep docs/examples on placeholder values only.
- Repository check confirms no committed live private keys in tracked files.

## License

MIT License. See `../LICENSE`.

## Short description for sharing

MathF4-O is an AI-assisted Form 4 math app that turns plain-language questions into tool-based calculations with clear, step-by-step answers and interactive visual chapters.
