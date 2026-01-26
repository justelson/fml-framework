"""
Earth Geometry Formulas - FML Framework
Contains formulas for calculations on Earth's surface
"""

import math


EARTH_RADIUS_KM = 6371  # Earth's radius in kilometers
EARTH_RADIUS_NM = 3440  # Earth's radius in nautical miles


def calculate_haversine(lat1, lon1, lat2, lon2, unit='km'):
    """
    Calculate great circle distance between two points using Haversine formula
    
    Args:
        lat1 (float): Latitude of first point (degrees)
        lon1 (float): Longitude of first point (degrees)
        lat2 (float): Latitude of second point (degrees)
        lon2 (float): Longitude of second point (degrees)
        unit (str): 'km' for kilometers or 'nm' for nautical miles
    
    Returns:
        dict: Contains distance in specified unit
    """
    # Convert to radians
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)
    
    # Haversine formula
    dlat = lat2_rad - lat1_rad
    dlon = lon2_rad - lon1_rad
    
    a = math.sin(dlat/2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon/2)**2
    c = 2 * math.asin(math.sqrt(a))
    
    # Calculate distance
    radius = EARTH_RADIUS_NM if unit == 'nm' else EARTH_RADIUS_KM
    distance = radius * c
    
    return {
        "distance": distance,
        "unit": unit,
        "lat1": lat1,
        "lon1": lon1,
        "lat2": lat2,
        "lon2": lon2
    }


def calculate_great_circle(lat1, lon1, lat2, lon2):
    """
    Calculate great circle distance (shortest path on Earth's surface)
    
    Args:
        lat1 (float): Latitude of first point (degrees)
        lon1 (float): Longitude of first point (degrees)
        lat2 (float): Latitude of second point (degrees)
        lon2 (float): Longitude of second point (degrees)
    
    Returns:
        dict: Contains distance in km and nautical miles
    """
    result_km = calculate_haversine(lat1, lon1, lat2, lon2, 'km')
    result_nm = calculate_haversine(lat1, lon1, lat2, lon2, 'nm')
    
    return {
        "distance_km": result_km["distance"],
        "distance_nm": result_nm["distance"],
        "lat1": lat1,
        "lon1": lon1,
        "lat2": lat2,
        "lon2": lon2
    }


def calculate_small_circle(lat1, lon1, lat2, lon2, latitude):
    """
    Calculate distance along a small circle (parallel of latitude)
    
    Args:
        lat1 (float): Latitude of first point (degrees)
        lon1 (float): Longitude of first point (degrees)
        lat2 (float): Latitude of second point (degrees)
        lon2 (float): Longitude of second point (degrees)
        latitude (float): Latitude of the small circle
    
    Returns:
        dict: Contains distance in km and nautical miles
    """
    # Convert to radians
    lat_rad = math.radians(latitude)
    lon1_rad = math.radians(lon1)
    lon2_rad = math.radians(lon2)
    
    # Calculate radius of small circle
    small_circle_radius_km = EARTH_RADIUS_KM * math.cos(lat_rad)
    small_circle_radius_nm = EARTH_RADIUS_NM * math.cos(lat_rad)
    
    # Calculate arc length
    dlon = abs(lon2_rad - lon1_rad)
    distance_km = small_circle_radius_km * dlon
    distance_nm = small_circle_radius_nm * dlon
    
    return {
        "distance_km": distance_km,
        "distance_nm": distance_nm,
        "latitude": latitude,
        "lon1": lon1,
        "lon2": lon2
    }


def degrees_to_nautical_miles(degrees):
    """
    Convert degrees of arc to nautical miles (1 degree = 60 nautical miles)
    
    Args:
        degrees (float): Degrees of arc
    
    Returns:
        dict: Contains nautical miles
    """
    nautical_miles = degrees * 60
    return {"nautical_miles": nautical_miles, "degrees": degrees}


def nautical_miles_to_kilometers(nautical_miles):
    """
    Convert nautical miles to kilometers (1 nm ≈ 1.852 km)
    
    Args:
        nautical_miles (float): Distance in nautical miles
    
    Returns:
        dict: Contains kilometers
    """
    kilometers = nautical_miles * 1.852
    return {"kilometers": kilometers, "nautical_miles": nautical_miles}


# Formula metadata for AI agents
FORMULAS = {
    "calculate_haversine": {
        "name": "Haversine Distance",
        "description": "Calculate great circle distance using Haversine formula",
        "category": "earth_geometry",
        "parameters": ["lat1", "lon1", "lat2", "lon2", "unit"],
        "function": calculate_haversine
    },
    "calculate_great_circle": {
        "name": "Great Circle Distance",
        "description": "Calculate shortest distance on Earth's surface",
        "category": "earth_geometry",
        "parameters": ["lat1", "lon1", "lat2", "lon2"],
        "function": calculate_great_circle
    },
    "calculate_small_circle": {
        "name": "Small Circle Distance",
        "description": "Calculate distance along a parallel of latitude",
        "category": "earth_geometry",
        "parameters": ["lat1", "lon1", "lat2", "lon2", "latitude"],
        "function": calculate_small_circle
    },
    "degrees_to_nautical_miles": {
        "name": "Degrees to Nautical Miles",
        "description": "Convert degrees of arc to nautical miles",
        "category": "earth_geometry",
        "parameters": ["degrees"],
        "function": degrees_to_nautical_miles
    },
    "nautical_miles_to_kilometers": {
        "name": "Nautical Miles to Kilometers",
        "description": "Convert nautical miles to kilometers",
        "category": "earth_geometry",
        "parameters": ["nautical_miles"],
        "function": nautical_miles_to_kilometers
    }
}
