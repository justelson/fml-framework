# FML Framework Structure

## Directory Layout

```
fml-framework/
│
├── README.md                    # Overview and introduction
├── QUICK_START.md              # Guide for AI agents
├── STRUCTURE.md                # This file - detailed structure
│
├── formulas/                   # Python formula implementations
│   ├── algebra.py             # Linear, quadratic, variations
│   ├── statistics.py          # Mean, median, mode, std dev
│   ├── geometry.py            # Circles, triangles, 3D shapes
│   ├── sequences.py           # AP, GP, interest calculations
│   ├── earth_geometry.py      # Great circles, haversine
│   └── accounting.py          # Balance sheets, profit/loss
│
├── reference/                  # Reference implementations
│   └── form3-link.md          # Link to Form 3 Math app
│
└── templates/                  # Future: Project templates
    └── (coming soon)
```

## Formula File Structure

Each formula file follows this pattern:

```python
"""
Module Description
Brief description of what formulas are included
"""

import math  # or other required libraries


def formula_name(param1, param2):
    """
    Formula description
    
    Args:
        param1 (type): Description
        param2 (type): Description
    
    Returns:
        dict: Contains result fields
    """
    # Implementation
    result = param1 + param2
    
    return {
        "result": result,
        "param1": param1,
        "param2": param2
    }


# Formula metadata for AI agents
FORMULAS = {
    "formula_name": {
        "name": "Display Name",
        "description": "What this formula does",
        "category": "category_name",
        "parameters": ["param1", "param2"],
        "function": formula_name
    }
}
```

## Categories

### Algebra
- Linear equations
- Quadratic equations (roots, vertex)
- Direct and inverse variation

### Statistics
- Descriptive statistics (mean, median, mode)
- Grouped data calculations
- Standard deviation

### Geometry
- 2D shapes (circles, triangles, rectangles)
- 3D shapes (spheres, cylinders)
- Arc length, sector area, chord length

### Sequences
- Arithmetic progressions
- Geometric progressions
- Simple and compound interest

### Earth Geometry
- Great circle distances
- Small circle distances
- Haversine formula
- Unit conversions

### Accounting
- Accounting equation
- Balance sheets
- Profit/loss calculations
- Depreciation

## Usage Pattern

### 1. Direct Python Usage
```python
from formulas.algebra import solve_quadratic_roots

result = solve_quadratic_roots(1, -5, 6)
print(result)  # {"roots": [3.0, 2.0], "discriminant": 1, "type": "two_roots"}
```

### 2. Web Application (JavaScript)
Convert to JavaScript and use in web apps:
```javascript
import { solveQuadraticRoots } from './lib/math.js';

const result = solveQuadraticRoots(1, -5, 6);
console.log(result);
```

### 3. AI Integration
AI agents read the FORMULAS metadata to understand available tools:
```python
from formulas.algebra import FORMULAS

for name, meta in FORMULAS.items():
    print(f"{meta['name']}: {meta['description']}")
    print(f"Parameters: {meta['parameters']}")
```

## Design Principles

1. **Pure Functions**: Each formula is a pure function with no side effects
2. **Consistent Returns**: Always return a dictionary with named fields
3. **Type Hints**: Use type hints in docstrings for clarity
4. **Metadata**: Include FORMULAS dict for AI agent discovery
5. **Documentation**: Clear docstrings with Args and Returns
6. **Error Handling**: Return error information in the result dict

## Extending the Framework

### Adding a New Category
1. Create `formulas/new_category.py`
2. Implement formulas following the pattern
3. Add FORMULAS metadata dict
4. Update this STRUCTURE.md file

### Adding a New Formula
1. Add function to appropriate category file
2. Add entry to FORMULAS dict
3. Write tests (future)
4. Update documentation

## Future Enhancements

- [ ] Unit tests for all formulas
- [ ] Project templates for quick starts
- [ ] Formula validation utilities
- [ ] Automatic JavaScript conversion tool
- [ ] API server for formula execution
- [ ] Formula visualization generators
- [ ] More categories (calculus, trigonometry, vectors, matrices)
