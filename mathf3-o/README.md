# MathF3-O (Form 3 Basic Mathematics)

Interactive Form 3 math learning web app with AI-assisted problem solving.

## What the app does

Students choose a chapter or ask a question in plain language. The AI assistant maps the request to a math tool, runs the calculation, and returns explained results. The app includes chapter content, calculator-style utilities, and validation tests for tool selection and answer quality.

## Files ready

Key runtime files:
- `src/App.jsx`
- `src/chapters/` (chapter content + AI Assist + Settings)
- `src/lib/math.js` (core math functions)
- `src/lib/aiTools.js` (AI tool definitions)
- `src/lib/toolDispatcher.js` (tool execution)
- `src/lib/groqService.js` (Groq integration)

Key test/docs files:
- `tests/simple-test.js`
- `tests/advanced-test.js`
- `tests/data/`
- `docs/README.md`
- `docs/testing/TESTING.md`

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
npm run test:advanced:easy
npm run test:advanced:medium
npm run test:advanced:hard
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
1. Vercel: Root `mathf3-o`, build `npm run build`, output `dist`
2. Netlify: Base `mathf3-o`, build `npm run build`, publish `dist`
3. Cloudflare Pages: Build `npm run build`, output `dist`
4. Any static host: serve `dist/` and route SPA requests to `index.html`

## Pull request instructions

1. Branch from `main`.
2. Keep changes scoped (feature/fix/docs).
3. Run `npm run build` and at least `npm run test:advanced:quick`.
4. Open PR with summary, test output, and screenshots for UI updates.

## Security and credentials

- Do not commit `.env`.
- Use placeholders in docs/examples only.
- Repository check confirms no committed live private keys in tracked files.

## License

MIT License. See `../LICENSE`.

## Short description for sharing

MathF3-O is an AI-assisted Form 3 math app that converts natural-language questions into validated calculations and step-by-step explanations, with interactive chapter tools and tests.
