import math
from collections import Counter

class FormThreeMath:
    """
    A comprehensive toolkit for Form Three Basic Mathematics.
    Covers Relations, Functions, Statistics, Variations, Sequences, 
    Circles, Spherical Geometry, and Basic Accounting.
    """

    # --- CHAPTER 1: RELATIONS & CHAPTER 2: FUNCTIONS ---
    @staticmethod
    def get_domain_and_range(relation):
        """
        In a relation R = {(x, y)}, the Domain is the set of all first entries (x)
        and the Range is the set of all second entries (y)[cite: 91, 92].
        """
        domain = {pair[0] for pair in relation}
        range_set = {pair[1] for pair in relation}
        return sorted(list(domain)), sorted(list(range_set))

    @staticmethod
    def is_function(relation):
        """
        A function is a special relation where every element in the domain 
        is mapped to exactly one element in the range[cite: 42, 48].
        """
        domain = [pair[0] for pair in relation]
        return len(domain) == len(set(domain))

    # --- CHAPTER 3: STATISTICS ---
    @staticmethod
    def calculate_statistics(data):
        """
        Calculates measures of central tendency: Mean, Median, and Mode.
        """
        # Mean: The average of the data
        mean = sum(data) / len(data)
        
        # Median: The middle value when sorted
        sorted_data = sorted(data)
        n = len(sorted_data)
        if n % 2 == 0:
            median = (sorted_data[n//2 - 1] + sorted_data[n//2]) / 2
        else:
            median = sorted_data[n//2]
            
        # Mode: The most frequent value
        counts = Counter(data)
        max_freq = max(counts.values())
        mode = [val for val, freq in counts.items() if freq == max_freq]
        
        return {"Mean": mean, "Median": median, "Mode": mode}

    # --- CHAPTER 4: RATES AND VARIATIONS ---
    @staticmethod
    def direct_variation(x, k):
        """
        Direct Variation formula: y = kx.
        """
        return k * x

    @staticmethod
    def inverse_variation(x, k):
        """
        Inverse Variation formula: y = k / x.
        """
        return k / x

    # --- CHAPTER 5: SEQUENCES AND SERIES ---
    @staticmethod
    def arithmetic_progression(a, d, n):
        """
        AP: a is the first term, d is common difference, n is the term number.
        Nth term = a + (n-1)d
        Sum = (n/2) * (2a + (n-1)d)
        """
        nth_term = a + (n - 1) * d
        sum_n = (n / 2) * (2 * a + (n - 1) * d)
        return nth_term, sum_n

    @staticmethod
    def geometric_progression(a, r, n):
        """
        GP: a is the first term, r is common ratio, n is the term number.
        Nth term = a * r^(n-1)
        Sum = a(r^n - 1) / (r - 1)
        """
        nth_term = a * (r ** (n - 1))
        sum_n = a * (r**n - 1) / (r - 1) if r != 1 else a * n
        return nth_term, sum_n

    @staticmethod
    def compound_interest(p, r, t, n=1):
        """
        Formula: A = P(1 + r/n)^(nt).
        P = Principal, r = annual interest rate, t = time, n = times compounded per year.
        """
        amount = p * (1 + (r / n))**(n * t)
        interest = amount - p
        return amount, interest

    # --- CHAPTER 6: CIRCLES ---
    @staticmethod
    def circle_properties(radius):
        """
        Calculates basic circle dimensions used in angle/tangent properties[cite: 7].
        """
        area = math.pi * (radius ** 2)
        circumference = 2 * math.pi * radius
        return area, circumference

    # --- CHAPTER 7: EARTH AS A SPHERE ---
    @staticmethod
    def haversine_distance(lat1, lon1, lat2, lon2):
        """
        Calculates distance between two points on Earth (Great Circle Distance).
        Earth's radius is approximately 6371 km.
        """
        R = 6371  # Earth radius in kilometers
        # Convert degrees to radians
        phi1, phi2 = math.radians(lat1), math.radians(lat2)
        dphi = math.radians(lat2 - lat1)
        dlambda = math.radians(lon2 - lon1)
        
        a = math.sin(dphi/2)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(dlambda/2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return R * c

    # --- CHAPTER 8: ACCOUNTING ---
    @staticmethod
    def simple_balance_sheet(assets, liabilities):
        """
        The Basic Accounting Equation: Assets = Liabilities + Capital (Owner's Equity).
        """
        capital = assets - liabilities
        return {
            "Total Assets": assets,
            "Total Liabilities": liabilities,
            "Owner's Equity (Capital)": capital
        }

# --- EXAMPLE USAGE ---
if __name__ == "__main__":
    math_tool = FormThreeMath()

    print("--- 1. Relations & Functions ---")
    my_relation = [(1, 2), (2, 4), (3, 6)]
    dom, ran = math_tool.get_domain_and_range(my_relation)
    print(f"Relation: {my_relation}\nDomain: {dom}, Range: {ran}")
    print(f"Is Function? {math_tool.is_function(my_relation)}\n")

    print("--- 2. Statistics ---")
    scores = [45, 80, 80, 95, 60]
    stats = math_tool.calculate_statistics(scores)
    print(f"Scores: {scores}\nStats: {stats}\n")

    print("--- 3. Sequences & Interest ---")
    nth, total = math_tool.arithmetic_progression(a=5, d=3, n=10)
    print(f"AP (a=5, d=3): 10th term = {nth}, Sum = {total}")
    amt, int_earned = math_tool.compound_interest(p=1000, r=0.05, t=2)
    print(f"Compound Interest: Total Amount = {amt:.2f}, Interest = {int_earned:.2f}\n")

    print("--- 4. Earth as a Sphere ---")
    # Distance between Dar es Salaam and Dodoma (approximate)
    dist = math_tool.haversine_distance(-6.7, 39.2, -6.1, 35.7)
    print(f"Distance (Great Circle): {dist:.2f} km\n")

    print("--- 5. Accounting ---")
    balance = math_tool.simple_balance_sheet(assets=500000, liabilities=150000)
    print(f"Balance Sheet Summary: {balance}")