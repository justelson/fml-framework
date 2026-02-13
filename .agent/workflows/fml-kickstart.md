---
description: Kickstart the FML Math App Generation Workflow
---

# FML Kickstart Workflow

Use this workflow to guide the creation of a new Form-level Mathematics Web Application.

## Step 1: Initialization verification
The AI agent must verify the following file structure exists:
- `fml-framework/templates/` (Base templates)
- `fml-framework/formulas/` (Formula repository)

## Step 2: User Interview
Ask the user the following questions to gather the "Form Specification":
1. **Target Form Level**: (e.g., Form 1, Form 2, Form 4)
2. **Syllabus Type**: Old (o) or New (n)?
3. **Application Description**: Brief description of the app's scope.
4. **Chapters List**: List of chapters with IDs, titles, and key topics.

## Step 3: Formula Ingestion
Instruct the user to provide the mathematical formulas.
*Prompt:* "Please paste the raw Python formulas for this form level. I will help you format them into the FML structure."

## Step 4: Process Execution
Once inputs are received:
1. **Format Formulas**: Use `fml-formula-format.md` to standardize the Python code.
2. **Generate App**: Use `fml-generate-app.md` to build the React application.
3. **Continuous Learning**: Use `fml-learning-loop.md` to document issues and optimize the framework.

## Trigger Commands
- `/fml-new` : Start this workflow
- `/fml-formulas` : Jump to formula formatting
- `/fml-build` : Jump to app generation
- `/fml-learning` : Jump to the Learning Framework loop
