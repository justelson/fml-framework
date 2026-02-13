---
description: Generate the FML React Web App
---

# FML App Generation Guide

## Objective
Scaffold and populate a new `mathf{N}-{S}` React application using the FML templates and provided formulas.

## Prerequisites
- **Form Specification** (Level, Syllabus, Chapters)
- **Formatted Formulas** (Python file from previous step)

## Process Steps

### 1. Directory Setup
Create the project root: `mathf{N}-{S}` (e.g., `mathf1-n`).
Initialize standard React+Vite structure (or copy from `fml-framework/templates/base-app`).

### 2. Core Library Generation
**Source**: `fml-framework/formulas/form{N}/formulas.py`
**Target**: `src/lib/`

- **Step 2a: Generate `math.js`**
  - Transpile each Python function to a JavaScript export.
  - Ensure type safety and error handling.

- **Step 2b: Generate `aiTools.js`**
  - Extract `AI_TOOL` metadata from Python docstrings.
  - Generate the `mathTools` array export.

- **Step 2c: Generate `toolDispatcher.js`**
  - Create a mapping between tool names and `math.js` functions.

### 3. Chapter Component Generation
For each chapter in the Specification:

- **Create `src/chapters/Chapter{ID}.jsx`**
- **Use Template**: `fml-framework/templates/chapter-template.jsx`
- **Customize**:
  - Update imports to pull specific functions from `math.js`.
  - Create state variables for each formula's parameters.
  - Generate UI forms for inputting parameters.
  - link "Calculate" buttons to the math functions.
  - ensure `AIAssist` integration is active.

### 4. App Configuration
- **Update `src/App.jsx`**:
  - Import all generated Chapter components.
  - Configure the `tabConfig` array with routes and titles.
- **Update `package.json`**:
  - Set `name` to `mathf{N}-{S}`.
- **Update `index.html`**:
  - Set `<title>` to the App Description.

### 5. Design & Optimization Standards (FML Lessons Learned)

> [!IMPORTANT]
> **Visualization Standards**:
> - **Axes**: Always use `<Coordinates.Cartesian xAxis={{ labels: (n) => n, lines: 1 }} yAxis={{ labels: (n) => n, lines: 1 }} />`.
> - **Labels**: Add explicit `<Text>` components for 'x' and 'y' axis labels.
> - **Imports**: Always verify `Line`, `Point`, and `Text` are imported from `mafs`.
> - **Dynamic Data**: Ensure point labels reflect the current state (e.g., `P1({x1}, {y1})`).

> [!TIP]
> **Prompt Token Budget**:
> - DO NOT list all tool definitions in `systemPrompt.js`.
> - Instead, provide a one-line summary per chapter. The AI already has access to definitions via function-calling metadata.
> - Keep the system prompt under **1,000 tokens**.

### 6. Learning Framework Setup
- **Create `docs/learning/`**:
  - `debug_log.md`: Initialize an empty log for tracking fixes.
  - `optimization_tips.md`: Initialize with base framework advice.
- **Goal**: Every time a developer (or AI) fixes a non-trivial bug, it MUST be documented in `debug_log.md` to help future generations of the app avoid the same mistake (Reinforcement Learning).

### 7. Final Verification
- Run `npm install`
- Run `npm run build` to check for errors.
