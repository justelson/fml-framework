"""
Vectors Formulas - FML Framework
Contains vector magnitude, addition, scaler operations
"""

import math

def calculate_vector_magnitude(x, y):
    """
    Calculate magnitude of a 2D vector
    
    Args:
        x (float): X component
        y (float): Y component
    
    Returns:
        dict: Contains magnitude
    """
    magnitude = math.sqrt(x**2 + y**2)
    return {"magnitude": magnitude}

def add_vectors(x1, y1, x2, y2):
    """
    Add two vectors
    
    Args:
        x1, y1: Components of first vector
        x2, y2: Components of second vector
    
    Returns:
        dict: Contains resultant vector components
    """
    return {
        "x": x1 + x2,
        "y": y1 + y2
    }

def scalar_multiply_vector(k, x, y):
    """
    Multiply a vector by a scalar
    
    Args:
        k (float): Scalar value
        x, y: Vector components
    
    Returns:
        dict: Contains new vector components
    """
    return {
        "x": k * x,
        "y": k * y
    }

def calculate_dot_product(x1, y1, x2, y2):
    """
    Calculate dot product of two vectors
    
    Args:
        x1, y1: First vector
        x2, y2: Second vector
    
    Returns:
        dict: Contains dot product value
    """
    dot_product = x1*x2 + y1*y2
    return {"dot_product": dot_product}

FORMULAS = {
    "calculate_vector_magnitude": {
        "name": "Vector Magnitude",
        "description": "Calculate length of a vector",
        "category": "vectors",
        "parameters": ["x", "y"],
        "function": calculate_vector_magnitude
    },
    "add_vectors": {
        "name": "Vector Addition",
        "description": "Add two vectors together",
        "category": "vectors",
        "parameters": ["x1", "y1", "x2", "y2"],
        "function": add_vectors
    },
    "scalar_multiply_vector": {
        "name": "Scalar Multiplication",
        "description": "Multiply vector by a number",
        "category": "vectors",
        "parameters": ["k", "x", "y"],
        "function": scalar_multiply_vector
    },
    "calculate_dot_product": {
        "name": "Dot Product",
        "description": "Calculate dot product of two vectors",
        "category": "vectors",
        "parameters": ["x1", "y1", "x2", "y2"],
        "function": calculate_dot_product
    }
}
