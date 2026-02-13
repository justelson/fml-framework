# FML Agent Usage Guide

This file explains how users can run FML with their own AI agent setup.

## 1. Fast path: use your own API key with built-in agent flow

FML already includes AI integration through the app service layer.

Set your own key locally:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

Where to set it:

- `mathf3-o/.env`
- `mathf4-o/.env`

Run locally:

```bash
cd mathf3-o && npm install && npm run dev
cd mathf4-o && npm install && npm run dev
```

This uses the existing tool-based flow:

- Tool schemas: `src/lib/aiTools.js`
- Tool execution: `src/lib/toolDispatcher.js`
- AI service client: `src/lib/groqService.js`

## 2. Bring your own agent/provider

If you want another AI provider or your own agent backend, keep the FML tool pipeline and swap only the provider client layer.

Recommended approach:

1. Keep chapter math logic unchanged.
2. Keep tool schemas in `aiTools.js`.
3. Keep deterministic execution in `toolDispatcher.js`.
4. Replace provider calls in `groqService.js` with your custom adapter.
5. Preserve response shape expected by the UI.

This avoids breaking chapter calculators and keeps AI answers grounded by deterministic tools.

## 3. Security rules

- Never commit real API keys.
- Use `.env` locally and deployment environment variables in hosting platforms.
- Rotate keys immediately if exposure is suspected.

## 4. Deployment behavior

Production policy:

- Approved changes are merged into `main`.
- Deployment releases are synchronized to `official-deployment`.

Portal documentation routes:

- `/docs.html` docs hub
- `/docs-user.html` user dashboard
- `/docs-developer.html` developer dashboard

## 5. GitHub references

- Repository: `https://github.com/justelson/fml-framework`
- Framework folder: `https://github.com/justelson/fml-framework/tree/main/fml-framework`
- Root docs folder: `https://github.com/justelson/fml-framework/tree/main/docs`
