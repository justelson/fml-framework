"""
Sequences and Series Formulas - FML Framework
Contains arithmetic and geometric progression formulas
"""


def solve_arithmetic_progression(a, d, n):
    """
    Calculate nth term and sum of arithmetic progression
    
    Args:
        a (float): First term
        d (float): Common difference
        n (int): Term number
    
    Returns:
        dict: Contains nth term and sum
    """
    nth_term = a + (n - 1) * d
    sum_n = (n / 2) * (2 * a + (n - 1) * d)
    
    return {
        "nth_term": nth_term,
        "sum": sum_n,
        "first_term": a,
        "common_difference": d,
        "n": n
    }


def solve_geometric_progression(a, r, n):
    """
    Calculate nth term and sum of geometric progression
    
    Args:
        a (float): First term
        r (float): Common ratio
        n (int): Term number
    
    Returns:
        dict: Contains nth term and sum
    """
    nth_term = a * (r ** (n - 1))
    
    if r == 1:
        sum_n = a * n
    else:
        sum_n = a * (1 - r ** n) / (1 - r)
    
    return {
        "nth_term": nth_term,
        "sum": sum_n,
        "first_term": a,
        "common_ratio": r,
        "n": n
    }


def calculate_compound_interest(p, r, t, n=1):
    """
    Calculate compound interest
    
    Args:
        p (float): Principal amount
        r (float): Annual interest rate (as decimal, e.g., 0.05 for 5%)
        t (float): Time in years
        n (int): Number of times interest is compounded per year
    
    Returns:
        dict: Contains final amount and interest earned
    """
    amount = p * (1 + r/n) ** (n * t)
    interest = amount - p
    
    return {
        "amount": amount,
        "interest": interest,
        "principal": p,
        "rate": r,
        "time": t,
        "compounds_per_year": n
    }


def calculate_simple_interest(p, r, t):
    """
    Calculate simple interest
    
    Args:
        p (float): Principal amount
        r (float): Annual interest rate (as decimal)
        t (float): Time in years
    
    Returns:
        dict: Contains interest and total amount
    """
    interest = p * r * t
    amount = p + interest
    
    return {
        "interest": interest,
        "amount": amount,
        "principal": p,
        "rate": r,
        "time": t
    }


# Formula metadata for AI agents
FORMULAS = {
    "solve_arithmetic_progression": {
        "name": "Arithmetic Progression",
        "description": "Calculate nth term and sum of AP",
        "category": "sequences",
        "parameters": ["a", "d", "n"],
        "function": solve_arithmetic_progression
    },
    "solve_geometric_progression": {
        "name": "Geometric Progression",
        "description": "Calculate nth term and sum of GP",
        "category": "sequences",
        "parameters": ["a", "r", "n"],
        "function": solve_geometric_progression
    },
    "calculate_compound_interest": {
        "name": "Compound Interest",
        "description": "Calculate compound interest and final amount",
        "category": "sequences",
        "parameters": ["p", "r", "t", "n"],
        "function": calculate_compound_interest
    },
    "calculate_simple_interest": {
        "name": "Simple Interest",
        "description": "Calculate simple interest and total amount",
        "category": "sequences",
        "parameters": ["p", "r", "t"],
        "function": calculate_simple_interest
    }
}
