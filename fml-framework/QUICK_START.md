# FML Framework - Quick Start Guide

## For AI Agents

When asked to build a new math application using the FML Framework, follow these steps:

### 1. Understand the Request
- What grade level? (Form 4, Form 5, A-Level, etc.)
- What topics? (Calculus, Trigonometry, Vectors, etc.)
- What features? (Interactive solvers, AI explanations, visualizations)

### 2. Review Available Formulas
Check `fml-framework/formulas/` for existing implementations:
- `algebra.py` - Linear, quadratic, variations
- `statistics.py` - Mean, median, mode, standard deviation
- `geometry.py` - Circles, triangles, 3D shapes
- `sequences.py` - AP, GP, compound interest
- `earth_geometry.py` - Great circles, haversine
- `accounting.py` - Balance sheets, profit/loss

### 3. Study the Reference Implementation
Look at `mathf3-web/` (Form 3 Math) to understand:
- Project structure
- UI component patterns
- AI integration approach
- Explanation system
- Theme system

### 4. Create New Formulas (if needed)
If the requested topics aren't in `formulas/`, create new files:
```python
# fml-framework/formulas/trigonometry.py

def calculate_sine(angle_degrees):
    """Calculate sine of an angle"""
    import math
    angle_radians = math.radians(angle_degrees)
    return {"sine": math.sin(angle_radians)}

FORMULAS = {
    "calculate_sine": {
        "name": "Sine Function",
        "description": "Calculate sine of an angle",
        "category": "trigonometry",
        "parameters": ["angle_degrees"],
        "function": calculate_sine
    }
}
```

### 5. Build the Application
Follow the Form 3 Math structure:
```
new-math-app/
├── src/
│   ├── chapters/          # One file per topic
│   ├── components/        # Reusable UI components
│   ├── lib/
│   │   ├── math.js       # Convert Python formulas to JS
│   │   ├── aiTools.js    # AI tool definitions
│   │   └── groqService.js # AI integration
│   └── styles.css
├── package.json
└── vite.config.js
```

### 6. Convert Python Formulas to JavaScript
Example conversion:
```python
# Python (fml-framework/formulas/algebra.py)
def solve_quadratic_roots(a, b, c):
    discriminant = b**2 - 4*a*c
    # ...
```

```javascript
// JavaScript (new-app/src/lib/math.js)
export function solveQuadraticRoots(a, b, c) {
  const discriminant = b**2 - 4*a*c;
  // ...
}
```

### 7. Key Features to Include
- ✅ Chapter-based navigation
- ✅ Interactive input forms
- ✅ Real-time calculations
- ✅ AI-powered explanations (brief + detailed)
- ✅ Markdown formatting for explanations
- ✅ Dark/light theme toggle
- ✅ Responsive design
- ✅ Example problems

### 8. AI Explanation System
Use the same pattern as Form 3:
1. User asks a question
2. AI identifies the right formula
3. Tool executes and returns result
4. AI generates:
   - Brief: "The problem asked us to... We applied... The answer is..."
   - Detailed: Bullet points with formulas, steps, and reasoning

## Example Prompt for AI Agents

"Build a Form 4 Mathematics application using the FML Framework. Include topics: Trigonometry, Vectors, Matrices, and Logarithms. Follow the structure of mathf3-web/ and use formulas from fml-framework/formulas/. Add new formula files for topics not yet covered."

## File Locations
- **Formulas**: `fml-framework/formulas/*.py`
- **Reference**: `mathf3-web/` (Form 3 implementation)
- **Documentation**: `fml-framework/README.md`
- **This Guide**: `fml-framework/QUICK_START.md`

## Benefits of This Approach
1. **Consistency**: All math apps follow the same pattern
2. **Reusability**: Formulas defined once, used everywhere
3. **Maintainability**: Update formulas in one place
4. **Scalability**: Easy to add new topics or grade levels
5. **AI-Friendly**: Clear structure for AI agents to understand

## Next Steps
1. Review the formulas in `fml-framework/formulas/`
2. Study the Form 3 implementation in `mathf3-web/`
3. Identify what new formulas are needed
4. Build the new application following the same patterns
5. Test with the AI explanation system
