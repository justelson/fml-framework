# FML User Troubleshooting

## Scope

This guide addresses common issues encountered by students and teachers while using FML apps.

## Quick checks before debugging

1. Refresh the browser tab.
2. Confirm you are on the correct route (`/3o/` or `/4o/`).
3. Re-enter values and confirm field formats.
4. Try another browser if rendering looks broken.

## Common issues

### AI response is missing

Possible causes:

- API service temporary issue.
- Missing key in deployment environment.
- Request limit reached.

Actions:

- Retry after a short wait.
- Ask administrator to verify environment key setup.
- Continue using chapter calculators while AI is unavailable.

### Output looks wrong

Possible causes:

- Wrong chapter context for the formula.
- Missing or incorrect unit conversion.
- Input sign error (positive vs negative).

Actions:

- Verify topic/chapter selection.
- Re-check given values and units.
- Run a known textbook example to cross-check behavior.

### Graph or interactive view does not render

Possible causes:

- Browser compatibility or blocked scripts.
- Temporary load failure.

Actions:

- Refresh and reopen the chapter.
- Disable strict blocking extensions for the site.
- Use latest Chrome/Edge/Firefox versions.

### Mobile layout feels crowded

Actions:

- Rotate to landscape for chart-heavy topics.
- Use desktop for complex graphing and longer sessions.

## Reporting a bug

When reporting, include:

- Route and chapter name.
- Exact input values.
- Expected output vs actual output.
- Browser and device.
- Screenshot or short screen recording.

## Safety note

Never share private API keys in class chats, screenshots, or bug reports.
