"""
Trigonometry Formulas - FML Framework
Contains sine rule, cosine rule, and triangle area calculations
"""

import math

def calculate_sine_rule_side(a, A_degrees, B_degrees):
    """
    Calculate side b using Sine Rule: a/sinA = b/sinB
    
    Args:
        a (float): Known side length
        A_degrees (float): Angle opposite to side a
        B_degrees (float): Angle opposite to side b
    
    Returns:
        dict: Contains calculated side length b
    """
    if A_degrees <= 0 or A_degrees >= 180 or B_degrees <= 0 or B_degrees >= 180:
        return {"error": "Angles must be between 0 and 180 degrees"}
        
    A_rad = math.radians(A_degrees)
    B_rad = math.radians(B_degrees)
    
    b = (a * math.sin(B_rad)) / math.sin(A_rad)
    return {"side_b": b}

def calculate_cosine_rule_side(b, c, A_degrees):
    """
    Calculate side a using Cosine Rule: a² = b² + c² - 2bc cosA
    
    Args:
        b (float): Side length b
        c (float): Side length c
        A_degrees (float): Angle A (between b and c)
    
    Returns:
        dict: Contains calculated side length a
    """
    A_rad = math.radians(A_degrees)
    a_squared = b**2 + c**2 - 2*b*c*math.cos(A_rad)
    a = math.sqrt(max(0, a_squared))
    return {"side_a": a}

def calculate_cosine_rule_angle(a, b, c):
    """
    Calculate angle A using Cosine Rule: cosA = (b² + c² - a²) / 2bc
    
    Args:
        a (float): Side opposite to angle A
        b (float): Adjacent side
        c (float): Adjacent side
    
    Returns:
        dict: Contains calculated angle A in degrees
    """
    if b <= 0 or c <= 0:
        return {"error": "Sides b and c must be positive"}
        
    cos_A = (b**2 + c**2 - a**2) / (2*b*c)
    
    if cos_A < -1 or cos_A > 1:
        return {"error": "Impossible triangle dimensions"}
        
    A_rad = math.acos(cos_A)
    A_deg = math.degrees(A_rad)
    return {"angle_A": A_deg}

def calculate_triangle_area_sine(a, b, C_degrees):
    """
    Calculate area of triangle using 1/2 ab sinC
    
    Args:
        a (float): Side a
        b (float): Side b
        C_degrees (float): Angle C between a and b
    
    Returns:
        dict: Contains area
    """
    C_rad = math.radians(C_degrees)
    area = 0.5 * a * b * math.sin(C_rad)
    return {"area": area}

FORMULAS = {
    "calculate_sine_rule_side": {
        "name": "Sine Rule (Side)",
        "description": "Calculate unknown side using Sine Rule",
        "category": "trigonometry",
        "parameters": ["a", "A_degrees", "B_degrees"],
        "function": calculate_sine_rule_side
    },
    "calculate_cosine_rule_side": {
        "name": "Cosine Rule (Side)",
        "description": "Calculate unknown side using Cosine Rule",
        "category": "trigonometry",
        "parameters": ["b", "c", "A_degrees"],
        "function": calculate_cosine_rule_side
    },
    "calculate_cosine_rule_angle": {
        "name": "Cosine Rule (Angle)",
        "description": "Calculate unknown angle using Cosine Rule",
        "category": "trigonometry",
        "parameters": ["a", "b", "c"],
        "function": calculate_cosine_rule_angle
    },
    "calculate_triangle_area_sine": {
        "name": "Triangle Area (Sine)",
        "description": "Calculate area using 1/2 ab sinC",
        "category": "trigonometry",
        "parameters": ["a", "b", "C_degrees"],
        "function": calculate_triangle_area_sine
    }
}
