# FML Framework (Formula Math Library)

## Overview
The FML Framework is a modular, reusable system for building math education applications. It provides a standardized way to define mathematical formulas in Python and automatically generate interactive web interfaces.

## Purpose
This framework allows you to:
1. Define mathematical formulas once in Python
2. Automatically generate web interfaces for any math curriculum
3. Reuse the same structure for different grade levels or subjects
4. Let AI agents build upon your formula definitions

## Structure
```
fml-framework/
├── formulas/           # Python formula definitions
│   ├── algebra/
│   ├── geometry/
│   ├── statistics/
│   ├── calculus/
│   └── ...
├── reference/          # Reference implementations
│   └── form3/         # Form 3 Math (current implementation)
└── templates/          # Reusable templates for new projects
```

## How It Works
1. **Define Formulas**: Write Python functions for each mathematical operation
2. **Add Metadata**: Include formula names, descriptions, and parameters
3. **Generate Interface**: AI agents can read these definitions and create UIs
4. **Reuse**: Copy the structure for Form 4, Form 5, or any other curriculum

## Example Formula Definition
```python
def solve_quadratic_roots(a, b, c):
    """
    Solves quadratic equation ax² + bx + c = 0
    
    Args:
        a (float): Coefficient of x²
        b (float): Coefficient of x
        c (float): Constant term
    
    Returns:
        dict: Contains roots and discriminant
    """
    discriminant = b**2 - 4*a*c
    if discriminant < 0:
        return {"roots": [], "discriminant": discriminant}
    elif discriminant == 0:
        root = -b / (2*a)
        return {"roots": [root], "discriminant": discriminant}
    else:
        root1 = (-b + discriminant**0.5) / (2*a)
        root2 = (-b - discriminant**0.5) / (2*a)
        return {"roots": [root1, root2], "discriminant": discriminant}
```

## Benefits
- **Consistency**: Same structure across all math levels
- **Maintainability**: Update formulas in one place
- **Scalability**: Easy to add new topics or grade levels
- **AI-Friendly**: Clear structure for AI agents to understand and extend
- **Reusability**: Build Form 4, Form 5, A-Level math apps quickly

## Getting Started
1. Browse the `formulas/` directory to see available formulas
2. Check `reference/form3/` to see how Form 3 Math was implemented
3. Copy the structure to create a new math application
4. Tell an AI agent: "Build a Form 4 math app using the FML framework"

## Future Expansion
- Form 4 Mathematics
- Form 5 Mathematics
- A-Level Mathematics
- University Calculus
- Engineering Mathematics
- Statistics & Probability
