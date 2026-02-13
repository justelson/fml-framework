# FML Architecture Deep Dive

## Design objective

FML combines AI interaction with deterministic formula execution. AI is used for interpretation and tool selection, while math outputs come from explicit solvers.

## Layer model

## 1. Formula layer

Location:

- App-level math logic under `src/lib/math.js`.
- Framework references under `fml-framework/formulas/`.

Responsibilities:

- Deterministic computation.
- Input guards and numeric handling.
- Reusable helper functions.

## 2. Tool schema layer

Location:

- `src/lib/aiTools.js`.

Responsibilities:

- Declare allowed tool names.
- Define parameters and expected argument shape.
- Constrain AI function-calling behavior.

## 3. Dispatcher layer

Location:

- `src/lib/toolDispatcher.js`.

Responsibilities:

- Route tool calls to concrete solver functions.
- Validate inputs before execution.
- Return structured outputs for UI rendering.

## 4. AI service layer

Location:

- `src/lib/groqService.js`.
- `src/lib/systemPrompt.js`.

Responsibilities:

- Manage model requests.
- Apply guardrail/system prompt strategy.
- Integrate tool-calling flow.

## 5. UI layer

Location:

- `src/chapters/*`.
- `src/components/*`.

Responsibilities:

- User inputs, forms, and feedback loops.
- Visualizations and results display.
- Learning flow across chapter pages.

## 6. Portal and deployment layer

Location:

- `portal/*`.
- `scripts/build-vercel.mjs`.

Responsibilities:

- Unified navigation and docs pages.
- Route launch points (`/3o/`, `/4o/`).
- Build assembly into deployment output.

## Data and control flow

1. User submits prompt or form data.
2. AI layer interprets intent and selects tool schema.
3. Dispatcher executes deterministic solver.
4. UI receives computed output and renders explanation.
5. User validates and iterates with new inputs.

## Engineering guardrails

- Keep solvers deterministic and side-effect free.
- Keep schemas strict and versionable.
- Avoid hidden assumptions in prompt-only logic.
- Back behavior changes with tests and docs updates.
