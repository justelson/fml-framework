# FML Agent Master Guide

## Overview
This guide provides the complete instruction set for an AI agent to build a new FML-based math application.

## Core Philosophy
- **Standardization**: Every app must follow the same structure.
- **Python-First**: Logic definitions start in Python, then transpile to JS.
- **AI-Native**: The app is built to be understood by AI assistants (via `aiTools.js`).

## Workflow Execution

### Phase 1: Initiation
1. **Activation**: User runs `/fml-kickstart` or asks to build a new math app.
2. **Consultation**: Execute `workflows/fml-kickstart.md` to interview the user.
3. **Output**: Produce a `spec.yaml` defining the app's metadata and chapters.

### Phase 2: Formula Engineering
1. **Ingestion**: Ask user for raw Python formulas.
2. **Formatting**: Apply `workflows/fml-formula-format.md` to standardize the code.
3. **Verification**: valid type hints, complete docstrings, and distinct `AI_TOOL` metadata.
4. **Storage**: Save to `fml-framework/formulas/form{N}/formulas.py`.

### Phase 3: Application Generation
1. **Scaffolding**: Copy `fml-framework/templates/base-app/` to `mathf{N}-{S}/`.
2. **Configuration**: Update `package.json`, `index.html` with spec details.
3. **Library Gen**:
   - Convert Python formulas -> `src/lib/math.js`
   - Extract Tool Metadata -> `src/lib/aiTools.js`
   - Create Dispatcher -> `src/lib/toolDispatcher.js`
4. **Component Gen**:
   - For each chapter in spec, create `src/chapter/Chapter{ID}.jsx` from `chapter-template.jsx`.
   - Wire up imports and state variables.
5. **Routing**: Update `src/App.jsx` with new routes.

## Critical Rules
- **Do NOT** change the `aiTools.js` structure; it breaks the AI integration.
- **Do NOT** use hardcoded styles; use variables from `styles.css`.
- **ALWAYS** include the `AI_TOOL` block in Python docstrings.

## Troubleshooting
- **Missing Tools**: If AI can't see a tool, check `aiTools.js` export.
- **Calculation Errors**: Verify JS implementation matches Python logic.
- **UI Glitches**: Ensure `theme` prop is passed to all components.
