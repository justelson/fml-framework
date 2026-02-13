"""
Probability Formulas - FML Framework
Contains basic and combined probability calculations
"""

def calculate_probability(successful_outcomes, total_outcomes):
    """
    Calculate P(A) = n(A) / n(S)
    
    Args:
        successful_outcomes (int): Number of desired outcomes
        total_outcomes (int): Total number of possible outcomes
    
    Returns:
        dict: Probability value
    """
    if total_outcomes == 0:
        return {"error": "Total outcomes cannot be zero"}
        
    prob = successful_outcomes / total_outcomes
    return {"probability": prob}

def calculate_combined_probability_or(p_a, p_b, p_a_and_b=0):
    """
    Calculate P(A or B) = P(A) + P(B) - P(A and B)
    
    Args:
        p_a (float): Probability of event A
        p_b (float): Probability of event B
        p_a_and_b (float): Probability of A and B (0 if mutually exclusive)
    
    Returns:
        dict: Combined probability
    """
    prob = p_a + p_b - p_a_and_b
    return {"probability_or": prob}

def calculate_independent_probability_and(p_a, p_b):
    """
    Calculate P(A and B) for independent events = P(A) * P(B)
    
    Args:
        p_a (float): Probability of event A
        p_b (float): Probability of event B
    
    Returns:
        dict: Joint probability
    """
    return {"probability_and": p_a * p_b}

FORMULAS = {
    "calculate_probability": {
        "name": "Simple Probability",
        "description": "Calculate probability of an event",
        "category": "probability",
        "parameters": ["successful_outcomes", "total_outcomes"],
        "function": calculate_probability
    },
    "calculate_combined_probability_or": {
        "name": "Combined Probability (OR)",
        "description": "Calculate P(A or B)",
        "category": "probability",
        "parameters": ["p_a", "p_b", "p_a_and_b"],
        "function": calculate_combined_probability_or
    },
    "calculate_independent_probability_and": {
        "name": "Independent Probability (AND)",
        "description": "Calculate P(A and B) for independent events",
        "category": "probability",
        "parameters": ["p_a", "p_b"],
        "function": calculate_independent_probability_and
    }
}
