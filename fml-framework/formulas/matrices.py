"""
Matrices Formulas - FML Framework
Contains 2x2 matrix operations
"""

def calculate_determinant_2x2(a, b, c, d):
    """
    Calculate determinant of 2x2 matrix
    | a  b |
    | c  d |
    
    Args:
        a, b, c, d (float): Matrix elements
    
    Returns:
        dict: Contains determinant
    """
    det = a*d - b*c
    return {"determinant": det}

def calculate_inverse_2x2(a, b, c, d):
    """
    Calculate inverse of 2x2 matrix
    
    Args:
        a, b, c, d (float): Matrix elements
    
    Returns:
        dict: Contains inverse matrix elements or error
    """
    det = a*d - b*c
    
    if det == 0:
        return {"error": "Matrix is singular (no inverse)"}
    
    inv_factor = 1 / det
    return {
        "a": d * inv_factor,
        "b": -b * inv_factor,
        "c": -c * inv_factor,
        "d": a * inv_factor,
        "determinant": det
    }

def multiply_matrices_2x2(a1, b1, c1, d1, a2, b2, c2, d2):
    """
    Multiply two 2x2 matrices
    M1 x M2
    
    Args:
        a1, b1, c1, d1: First matrix elements
        a2, b2, c2, d2: Second matrix elements
    
    Returns:
        dict: Resulting matrix elements
    """
    # row 1 * col 1
    ra = a1*a2 + b1*c2
    # row 1 * col 2
    rb = a1*b2 + b1*d2
    # row 2 * col 1
    rc = c1*a2 + d1*c2
    # row 2 * col 2
    rd = c1*b2 + d1*d2
    
    return {
        "a": ra, "b": rb,
        "c": rc, "d": rd
    }

def solve_simultaneous_cramer(a1, b1, c1, a2, b2, c2):
    """
    Solve simultaneous equations using Cramer's Rule (Matrices)
    a1x + b1y = c1
    a2x + b2y = c2
    
    Args:
        Coefficients for equations
        
    Returns:
        dict: x and y values
    """
    # Determinant of coefficient matrix
    D = a1*b2 - a2*b1
    
    if D == 0:
        return {"error": "No unique solution (lines are parallel)"}
        
    # Determinant for x (replace x col with constants)
    Dx = c1*b2 - c2*b1
    
    # Determinant for y (replace y col with constants)
    Dy = a1*c2 - a2*c1
    
    x = Dx / D
    y = Dy / D
    
    return {
        "x": x,
        "y": y,
        "D": D,
        "Dx": Dx,
        "Dy": Dy
    }

FORMULAS = {
    "calculate_determinant_2x2": {
        "name": "Determinant (2x2)",
        "description": "Calculate determinant of a 2x2 matrix",
        "category": "matrices",
        "parameters": ["a", "b", "c", "d"],
        "function": calculate_determinant_2x2
    },
    "calculate_inverse_2x2": {
        "name": "Inverse Matrix (2x2)",
        "description": "Find inverse of a 2x2 matrix",
        "category": "matrices",
        "parameters": ["a", "b", "c", "d"],
        "function": calculate_inverse_2x2
    },
    "multiply_matrices_2x2": {
        "name": "Matrix Multiplication",
        "description": "Multiply two 2x2 matrices",
        "category": "matrices",
        "parameters": ["a1", "b1", "c1", "d1", "a2", "b2", "c2", "d2"],
        "function": multiply_matrices_2x2
    },
    "solve_simultaneous_cramer": {
        "name": "Cramer's Rule Solver",
        "description": "Solve simultaneous equations using matrices",
        "category": "matrices",
        "parameters": ["a1", "b1", "c1", "a2", "b2", "c2"],
        "function": solve_simultaneous_cramer
    }
}
