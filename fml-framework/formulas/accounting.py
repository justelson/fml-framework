"""
Accounting Formulas - FML Framework
Contains basic accounting equation formulas
"""


def solve_accounting_equation(assets=None, liabilities=None, capital=None):
    """
    Solve accounting equation: Assets = Liabilities + Capital
    Provide any two values to calculate the third
    
    Args:
        assets (float, optional): Total assets
        liabilities (float, optional): Total liabilities
        capital (float, optional): Owner's capital/equity
    
    Returns:
        dict: Contains all three values and which was calculated
    """
    provided_count = sum(x is not None for x in [assets, liabilities, capital])
    
    if provided_count != 2:
        return {
            "error": "Provide exactly two values to calculate the third",
            "assets": assets,
            "liabilities": liabilities,
            "capital": capital
        }
    
    if assets is None:
        assets = liabilities + capital
        calculated = "Assets"
    elif liabilities is None:
        liabilities = assets - capital
        calculated = "Liabilities"
    else:  # capital is None
        capital = assets - liabilities
        calculated = "Capital"
    
    return {
        "assets": assets,
        "liabilities": liabilities,
        "capital": capital,
        "calculated": calculated
    }


def generate_balance_sheet(assets, liabilities):
    """
    Generate a simple balance sheet
    
    Args:
        assets (float): Total assets
        liabilities (float): Total liabilities
    
    Returns:
        dict: Contains balance sheet components
    """
    capital = assets - liabilities
    
    return {
        "assets": assets,
        "liabilities": liabilities,
        "capital": capital,
        "balanced": abs(assets - (liabilities + capital)) < 0.01
    }


def calculate_profit_loss(revenue, expenses):
    """
    Calculate profit or loss
    
    Args:
        revenue (float): Total revenue/income
        expenses (float): Total expenses
    
    Returns:
        dict: Contains profit/loss and type
    """
    result = revenue - expenses
    
    return {
        "result": abs(result),
        "type": "profit" if result >= 0 else "loss",
        "revenue": revenue,
        "expenses": expenses
    }


def calculate_depreciation_straight_line(cost, salvage_value, useful_life):
    """
    Calculate annual depreciation using straight-line method
    
    Args:
        cost (float): Original cost of asset
        salvage_value (float): Estimated salvage value at end of life
        useful_life (int): Useful life in years
    
    Returns:
        dict: Contains annual depreciation
    """
    annual_depreciation = (cost - salvage_value) / useful_life
    
    return {
        "annual_depreciation": annual_depreciation,
        "cost": cost,
        "salvage_value": salvage_value,
        "useful_life": useful_life
    }


# Formula metadata for AI agents
FORMULAS = {
    "solve_accounting_equation": {
        "name": "Accounting Equation",
        "description": "Solve Assets = Liabilities + Capital",
        "category": "accounting",
        "parameters": ["assets", "liabilities", "capital"],
        "function": solve_accounting_equation
    },
    "generate_balance_sheet": {
        "name": "Balance Sheet",
        "description": "Generate a simple balance sheet",
        "category": "accounting",
        "parameters": ["assets", "liabilities"],
        "function": generate_balance_sheet
    },
    "calculate_profit_loss": {
        "name": "Profit/Loss",
        "description": "Calculate profit or loss from revenue and expenses",
        "category": "accounting",
        "parameters": ["revenue", "expenses"],
        "function": calculate_profit_loss
    },
    "calculate_depreciation_straight_line": {
        "name": "Straight-Line Depreciation",
        "description": "Calculate annual depreciation using straight-line method",
        "category": "accounting",
        "parameters": ["cost", "salvage_value", "useful_life"],
        "function": calculate_depreciation_straight_line
    }
}
