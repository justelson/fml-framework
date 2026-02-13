---
description: Standardize Python formulas for FML Framework
---

# FML Formula Formatting Guide

## Objective
Convert raw Python mathematical functions into FML-compliant formulas with metadata for AI consumption.

## Input Format
Raw Python functions provided by the user (e.g., `def calc_x(y): return y*2`).

## Output Format
A structured Python file with:
1. Type-hinted functions
2. Docstrings with `AI_TOOL` metadata
3. A `FORMULAS` dictionary registry

## Formatting Rules

### 1. Function Definition
- Use snake_case for function names.
- Add type hints for all arguments and return values.
- Return a directory `dict` with named keys.

### 2. Docstring with AI Metadata
Every function MUST have an `AI_TOOL` section in the docstring:

```python
def function_name(arg1: float) -> dict:
    """
    Brief description of function.

    Args:
        arg1: Description of arg1

    Returns:
        Dictionary with results

    AI_TOOL:
        name: unique_tool_name (camelCase, e.g., calculateArea)
        description: User-friendly description for the AI assistant
        chapter: Chapter Number (e.g., 1)
    """
    # Implementation
    return {"result": ...}
```

### 3. Registry Registration
At the end of the file, export a `FORMULAS` dict. 

> [!IMPORTANT]
> **Single Source of Truth**: The `name` in the Python `AI_TOOL` docstring MUST match the `js_name` in the `FORMULAS` dictionary exactly. Failure to do this will result in "Unknown Tool" errors in the final app.

```python
FORMULAS = {
    "function_name": {
        "name": "Display Name",
        "js_name": "uniqueToolName", # MUST MATCH AI_TOOL: name exactly
        "description": "Description...",
        "chapter": 1,
        "parameters": ["arg1"],
        "function": function_name
    }
}
```

## Step-by-Step Instructions for AI
1. Analyze the raw code to identify distinct mathematical operations.
2. Group functions by Chapter/Topic.
3. Rewrite each function to match the FML signature pattern.
4. Generate the `AI_TOOL` metadata based on the function's purpose.
5. Compile the `FORMULAS` dictionary.
6. Save the result to `fml-framework/formulas/form{N}/formulas.py`.
