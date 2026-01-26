"""
Statistics Formulas - FML Framework
Contains all statistical formula implementations
"""

from collections import Counter


def analyze_data_list(values):
    """
    Analyze a list of numbers for mean, median, mode
    
    Args:
        values (list): List of numbers
    
    Returns:
        dict: Contains mean, median, mode
    """
    sorted_values = sorted(values)
    n = len(values)
    
    # Mean
    mean = sum(values) / n
    
    # Median
    if n % 2 == 0:
        median = (sorted_values[n//2 - 1] + sorted_values[n//2]) / 2
    else:
        median = sorted_values[n//2]
    
    # Mode
    counter = Counter(values)
    max_count = max(counter.values())
    modes = [k for k, v in counter.items() if v == max_count]
    mode = modes[0] if len(modes) == 1 else modes
    
    return {
        "mean": mean,
        "median": median,
        "mode": mode,
        "count": n
    }


def calculate_grouped_mean(midpoints, frequencies):
    """
    Calculate mean for grouped data
    
    Args:
        midpoints (list): Class midpoints
        frequencies (list): Frequencies for each class
    
    Returns:
        dict: Contains mean
    """
    total = sum(m * f for m, f in zip(midpoints, frequencies))
    n = sum(frequencies)
    mean = total / n
    
    return {"mean": mean, "total_frequency": n}


def calculate_grouped_median(class_boundaries, frequencies):
    """
    Calculate median for grouped data
    
    Args:
        class_boundaries (list): List of (lower, upper) tuples
        frequencies (list): Frequencies for each class
    
    Returns:
        dict: Contains median
    """
    n = sum(frequencies)
    median_position = n / 2
    
    cumulative = 0
    for i, freq in enumerate(frequencies):
        cumulative += freq
        if cumulative >= median_position:
            lower, upper = class_boundaries[i]
            cf_before = cumulative - freq
            class_width = upper - lower
            
            median = lower + ((median_position - cf_before) / freq) * class_width
            return {"median": median, "median_class": i}
    
    return {"median": 0, "error": "Could not calculate median"}


def calculate_grouped_mode(class_boundaries, frequencies):
    """
    Calculate mode for grouped data
    
    Args:
        class_boundaries (list): List of (lower, upper) tuples
        frequencies (list): Frequencies for each class
    
    Returns:
        dict: Contains mode
    """
    max_freq = max(frequencies)
    modal_class_index = frequencies.index(max_freq)
    
    lower, upper = class_boundaries[modal_class_index]
    class_width = upper - lower
    
    f1 = frequencies[modal_class_index]
    f0 = frequencies[modal_class_index - 1] if modal_class_index > 0 else 0
    f2 = frequencies[modal_class_index + 1] if modal_class_index < len(frequencies) - 1 else 0
    
    mode = lower + ((f1 - f0) / ((f1 - f0) + (f1 - f2))) * class_width
    
    return {"mode": mode, "modal_class": modal_class_index}


def calculate_standard_deviation(values):
    """
    Calculate standard deviation of a dataset
    
    Args:
        values (list): List of numbers
    
    Returns:
        dict: Contains standard deviation and variance
    """
    n = len(values)
    mean = sum(values) / n
    variance = sum((x - mean) ** 2 for x in values) / n
    std_dev = variance ** 0.5
    
    return {
        "mean": mean,
        "variance": variance,
        "standard_deviation": std_dev
    }


# Formula metadata for AI agents
FORMULAS = {
    "analyze_data_list": {
        "name": "Data Analysis",
        "description": "Calculate mean, median, mode for a dataset",
        "category": "statistics",
        "parameters": ["values"],
        "function": analyze_data_list
    },
    "calculate_grouped_mean": {
        "name": "Grouped Mean",
        "description": "Calculate mean for grouped/frequency data",
        "category": "statistics",
        "parameters": ["midpoints", "frequencies"],
        "function": calculate_grouped_mean
    },
    "calculate_grouped_median": {
        "name": "Grouped Median",
        "description": "Calculate median for grouped data",
        "category": "statistics",
        "parameters": ["class_boundaries", "frequencies"],
        "function": calculate_grouped_median
    },
    "calculate_grouped_mode": {
        "name": "Grouped Mode",
        "description": "Calculate mode for grouped data",
        "category": "statistics",
        "parameters": ["class_boundaries", "frequencies"],
        "function": calculate_grouped_mode
    },
    "calculate_standard_deviation": {
        "name": "Standard Deviation",
        "description": "Calculate standard deviation and variance",
        "category": "statistics",
        "parameters": ["values"],
        "function": calculate_standard_deviation
    }
}
