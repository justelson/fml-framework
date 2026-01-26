"""
Algebra Formulas - FML Framework
Contains all algebraic formula implementations
"""

import math


def solve_linear(m, x, c):
    """
    Calculate Y for linear equation: y = mx + c
    
    Args:
        m (float): Slope/gradient
        x (float): X value
        c (float): Y-intercept
    
    Returns:
        dict: Contains y value
    """
    y = m * x + c
    return {"y": y}


def solve_quadratic_roots(a, b, c):
    """
    Solve quadratic equation: ax² + bx + c = 0
    
    Args:
        a (float): Coefficient of x²
        b (float): Coefficient of x
        c (float): Constant term
    
    Returns:
        dict: Contains roots and discriminant
    """
    discriminant = b**2 - 4*a*c
    
    if discriminant < 0:
        return {
            "roots": [],
            "discriminant": discriminant,
            "type": "no_real_roots"
        }
    elif discriminant == 0:
        root = -b / (2*a)
        return {
            "roots": [root],
            "discriminant": discriminant,
            "type": "one_root"
        }
    else:
        root1 = (-b + math.sqrt(discriminant)) / (2*a)
        root2 = (-b - math.sqrt(discriminant)) / (2*a)
        return {
            "roots": [root1, root2],
            "discriminant": discriminant,
            "type": "two_roots"
        }


def find_quadratic_vertex(a, b, c):
    """
    Find vertex (turning point) of quadratic function
    
    Args:
        a (float): Coefficient of x²
        b (float): Coefficient of x
        c (float): Constant term
    
    Returns:
        dict: Contains x and y coordinates of vertex
    """
    x = -b / (2*a)
    y = a * x**2 + b * x + c
    return {"x": x, "y": y}


def calculate_direct_variation(x1, y1, x2):
    """
    Calculate direct variation: y = kx
    
    Args:
        x1 (float): First x value
        y1 (float): First y value
        x2 (float): Second x value
    
    Returns:
        dict: Contains k constant and y2 result
    """
    k = y1 / x1
    y2 = k * x2
    return {"k": k, "y2": y2}


def calculate_inverse_variation(x1, y1, x2):
    """
    Calculate inverse variation: y = k/x
    
    Args:
        x1 (float): First x value
        y1 (float): First y value
        x2 (float): Second x value
    
    Returns:
        dict: Contains k constant and y2 result
    """
    k = x1 * y1
    y2 = k / x2
    return {"k": k, "y2": y2}


# Formula metadata for AI agents
FORMULAS = {
    "solve_linear": {
        "name": "Linear Equation",
        "description": "Calculate Y for linear equation y = mx + c",
        "category": "algebra",
        "parameters": ["m", "x", "c"],
        "function": solve_linear
    },
    "solve_quadratic_roots": {
        "name": "Quadratic Roots",
        "description": "Find roots of quadratic equation ax² + bx + c = 0",
        "category": "algebra",
        "parameters": ["a", "b", "c"],
        "function": solve_quadratic_roots
    },
    "find_quadratic_vertex": {
        "name": "Quadratic Vertex",
        "description": "Find turning point of quadratic function",
        "category": "algebra",
        "parameters": ["a", "b", "c"],
        "function": find_quadratic_vertex
    },
    "calculate_direct_variation": {
        "name": "Direct Variation",
        "description": "Calculate y when y varies directly as x",
        "category": "algebra",
        "parameters": ["x1", "y1", "x2"],
        "function": calculate_direct_variation
    },
    "calculate_inverse_variation": {
        "name": "Inverse Variation",
        "description": "Calculate y when y varies inversely as x",
        "category": "algebra",
        "parameters": ["x1", "y1", "x2"],
        "function": calculate_inverse_variation
    }
}
