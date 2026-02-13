"""
Geometry Formulas - FML Framework
Contains all geometric formula implementations
"""

import math


def calculate_circle_properties(radius):
    """
    Calculate area and circumference of a circle
    
    Args:
        radius (float): Circle radius
    
    Returns:
        dict: Contains area and circumference
    """
    area = math.pi * radius ** 2
    circumference = 2 * math.pi * radius
    
    return {
        "area": area,
        "circumference": circumference,
        "radius": radius
    }


def calculate_arc_sector(radius, angle_degrees):
    """
    Calculate arc length and sector area
    
    Args:
        radius (float): Circle radius
        angle_degrees (float): Central angle in degrees
    
    Returns:
        dict: Contains arc length and sector area
    """
    angle_radians = math.radians(angle_degrees)
    arc_length = radius * angle_radians
    sector_area = 0.5 * radius ** 2 * angle_radians
    
    return {
        "arc_length": arc_length,
        "sector_area": sector_area,
        "angle_degrees": angle_degrees,
        "angle_radians": angle_radians
    }


def calculate_chord_length(radius, distance_from_center):
    """
    Calculate chord length given distance from center
    
    Args:
        radius (float): Circle radius
        distance_from_center (float): Perpendicular distance from center to chord
    
    Returns:
        dict: Contains chord length or None if invalid
    """
    if distance_from_center >= radius:
        return {"chord": None, "error": "Distance must be less than radius"}
    
    half_chord = math.sqrt(radius ** 2 - distance_from_center ** 2)
    chord = 2 * half_chord
    
    return {
        "chord": chord,
        "half_chord": half_chord,
        "distance": distance_from_center
    }


def calculate_triangle_area(base, height):
    """
    Calculate area of a triangle
    
    Args:
        base (float): Base length
        height (float): Height
    
    Returns:
        dict: Contains area
    """
    area = 0.5 * base * height
    return {"area": area}


def calculate_rectangle_properties(length, width):
    """
    Calculate area and perimeter of a rectangle
    
    Args:
        length (float): Length
        width (float): Width
    
    Returns:
        dict: Contains area and perimeter
    """
    area = length * width
    perimeter = 2 * (length + width)
    
    return {
        "area": area,
        "perimeter": perimeter
    }


def calculate_sphere_properties(radius):
    """
    Calculate surface area and volume of a sphere
    
    Args:
        radius (float): Sphere radius
    
    Returns:
        dict: Contains surface area and volume
    """
    surface_area = 4 * math.pi * radius ** 2
    volume = (4/3) * math.pi * radius ** 3
    
    return {
        "surface_area": surface_area,
        "volume": volume,
        "radius": radius
    }


def calculate_cylinder_properties(radius, height):
    """
    Calculate surface area and volume of a cylinder
    
    Args:
        radius (float): Base radius
        height (float): Height
    
    Returns:
        dict: Contains surface area and volume
    """
    base_area = math.pi * radius ** 2
    lateral_area = 2 * math.pi * radius * height
    surface_area = 2 * base_area + lateral_area
    volume = base_area * height
    
    return {
        "surface_area": surface_area,
        "volume": volume,
        "base_area": base_area,
        "lateral_area": lateral_area
    }


def calculate_cone_properties(radius, height, slant_height=None):
    """
    Calculate surface area and volume of a cone
    """
    if slant_height is None:
        slant_height = math.sqrt(radius**2 + height**2)
        
    base_area = math.pi * radius ** 2
    lateral_area = math.pi * radius * slant_height
    surface_area = base_area + lateral_area
    volume = (1/3) * base_area * height
    
    return {
        "surface_area": surface_area,
        "volume": volume,
        "slant_height": slant_height
    }


def calculate_pyramid_properties(base_area, perimeter, height, slant_height):
    """
    Calculate properties of a pyramid
    """
    lateral_area = 0.5 * perimeter * slant_height
    surface_area = base_area + lateral_area
    volume = (1/3) * base_area * height
    
    return {
        "surface_area": surface_area,
        "volume": volume
    }


# Formula metadata for AI agents
FORMULAS = {
    "calculate_circle_properties": {
        "name": "Circle Properties",
        "description": "Calculate area and circumference of a circle",
        "category": "geometry",
        "parameters": ["radius"],
        "function": calculate_circle_properties
    },
    "calculate_arc_sector": {
        "name": "Arc and Sector",
        "description": "Calculate arc length and sector area",
        "category": "geometry",
        "parameters": ["radius", "angle_degrees"],
        "function": calculate_arc_sector
    },
    "calculate_chord_length": {
        "name": "Chord Length",
        "description": "Calculate chord length from distance to center",
        "category": "geometry",
        "parameters": ["radius", "distance_from_center"],
        "function": calculate_chord_length
    },
    "calculate_triangle_area": {
        "name": "Triangle Area",
        "description": "Calculate area of a triangle",
        "category": "geometry",
        "parameters": ["base", "height"],
        "function": calculate_triangle_area
    },
    "calculate_rectangle_properties": {
        "name": "Rectangle Properties",
        "description": "Calculate area and perimeter of a rectangle",
        "category": "geometry",
        "parameters": ["length", "width"],
        "function": calculate_rectangle_properties
    },
    "calculate_sphere_properties": {
        "name": "Sphere Properties",
        "description": "Calculate surface area and volume of a sphere",
        "category": "geometry",
        "parameters": ["radius"],
        "function": calculate_sphere_properties
    },
    "calculate_cylinder_properties": {
        "name": "Cylinder Properties",
        "description": "Calculate surface area and volume of a cylinder",
        "category": "geometry",
        "parameters": ["radius", "height"],
        "function": calculate_cylinder_properties
    },
    "calculate_cone_properties": {
        "name": "Cone Properties",
        "description": "Calculate surface area and volume of a cone",
        "category": "geometry",
        "parameters": ["radius", "height"],
        "function": calculate_cone_properties
    },
    "calculate_pyramid_properties": {
        "name": "Pyramid Properties",
        "description": "Surface area and volume of pyramid",
        "category": "geometry",
        "parameters": ["base_area", "perimeter", "height", "slant_height"],
        "function": calculate_pyramid_properties
    }
}
