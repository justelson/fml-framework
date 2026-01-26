import math
import matplotlib.pyplot as plt
import statistics

class Chapter1_2_RelationsAndFunctions:
    """
    Solves concepts from Chapters 1 and 2: Relations and Functions.
    Covers: Domain, Range, Inverse, and Quadratic Functions.
    """

    def solve_quadratic_function(self, a, b, c):
        """
        Solves a quadratic equation in the form: f(x) = ax^2 + bx + c = 0
        Uses the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a
        
        Textbook Reference: Chapter 2, Quadratic Relations
        """
        print(f"\n--- Solving Quadratic Function: {a}x² + {b}x + {c} = 0 ---")
        
        # Calculate the Discriminant (D = b² - 4ac)
        discriminant = b**2 - 4*a*c
        print(f"Discriminant (b² - 4ac) = {discriminant}")

        if discriminant > 0:
            root1 = (-b + math.sqrt(discriminant)) / (2*a)
            root2 = (-b - math.sqrt(discriminant)) / (2*a)
            print(f"Two real roots found: x = {root1:.2f} and x = {root2:.2f}")
            return root1, root2
        elif discriminant == 0:
            root = -b / (2*a)
            print(f"One real root (vertex) found: x = {root:.2f}")
            return root,
        else:
            print("No real roots (roots are complex numbers). Graph does not touch x-axis.")
            return None

    def plot_function(self, func, x_range, title="Function Graph"):
        """
        Plots any mathematical function f(x) over a specific range.
        This visualizes the 'Vertical Line Test' and domain/range concepts.
        """
        x_values = [x * 0.1 for x in range(int(x_range[0]*10), int(x_range[1]*10))]
        y_values = [func(x) for x in x_values]

        plt.figure(figsize=(8, 6))
        plt.plot(x_values, y_values, label=title)
        plt.axhline(0, color='black', linewidth=1) # x-axis
        plt.axvline(0, color='black', linewidth=1) # y-axis
        plt.grid(True, linestyle='--')
        plt.title(title)
        plt.xlabel("x (Domain)")
        plt.ylabel("f(x) (Range)")
        plt.legend()
        plt.show()
        print("Graph generated successfully.")

class Chapter3_Statistics:
    """
    Solves concepts from Chapter 3: Statistics.
    Covers: Mean, Median, Mode for grouped and ungrouped data.
    """

    def analyze_ungrouped_data(self, data):
        """
        Calculates central tendency for a simple list of numbers.
        Reference: Activity 3.2
        """
        print(f"\n--- Analyzing Ungrouped Data: {data} ---")
        
        # Mean: Sum of values / Number of values
        mean_val = statistics.mean(data)
        
        # Median: The middle value when sorted
        median_val = statistics.median(data)
        
        # Mode: The most frequent value
        try:
            mode_val = statistics.mode(data)
        except statistics.StatisticsError:
            mode_val = "No unique mode"

        print(f"Mean: {mean_val:.2f}")
        print(f"Median: {median_val}")
        print(f"Mode: {mode_val}")

    def mean_grouped_data(self, groups):
        """
        Calculates the estimated mean for grouped data.
        Input 'groups' is a list of dictionaries: [{'midpoint': x, 'frequency': f}, ...]
        Formula: x̄ = (Σfx) / (Σf)
        Reference: Example 3.4
        """
        print("\n--- Calculating Mean of Grouped Data ---")
        
        sum_fx = 0
        sum_f = 0

        for group in groups:
            x = group['midpoint'] # Class mark
            f = group['frequency']
            sum_fx += (f * x)
            sum_f += f
        
        estimated_mean = sum_fx / sum_f
        print(f"Total Frequency (Σf): {sum_f}")
        print(f"Sum of f*x (Σfx): {sum_fx}")
        print(f"Estimated Mean: {estimated_mean:.2f}")
        return estimated_mean

class Chapter4_RatesAndVariations:
    """
    Solves concepts from Chapter 4.
    Covers: Direct, Inverse, and Joint Variation.
    """

    def direct_variation(self, x1, y1, x2):
        """
        Solves y = kx.
        Given x1 and y1, finds k. Then finds y2 for x2.
        Reference: Example 4.12
        """
        print("\n--- Solving Direct Variation (y ∝ x) ---")
        
        # Step 1: Find Constant k = y / x
        k = y1 / x1
        print(f"Constant of proportionality (k) = {y1}/{x1} = {k}")
        
        # Step 2: Solve for new value y2 = k * x2
        y2 = k * x2
        print(f"When x = {x2}, y = {k} * {x2} = {y2}")
        return y2

    def inverse_variation(self, x1, y1, x2):
        """
        Solves y = k/x.
        Given x1 and y1, finds k. Then finds y2 for x2.
        Reference: Example 4.15 (Work/Time problems)
        """
        print("\n--- Solving Inverse Variation (y ∝ 1/x) ---")
        
        # Step 1: Find Constant k = y * x
        k = y1 * x1
        print(f"Constant of proportionality (k) = {y1} * {x1} = {k}")
        
        # Step 2: Solve for new value y2 = k / x2
        y2 = k / x2
        print(f"When x = {x2}, y = {k} / {x2} = {y2}")
        return y2

class Chapter5_SequencesAndSeries:
    """
    Solves concepts from Chapter 5.
    Covers: Arithmetic Progression (AP) and Geometric Progression (GP).
    """

    def solve_arithmetic_progression(self, a, d, n):
        """
        Calculates nth term and Sum of AP.
        a = first term
        d = common difference
        n = number of terms
        
        Formulas:
        nth term: An = a + (n-1)d
        Sum: Sn = n/2 * (2a + (n-1)d)
        Reference: Theorem 6.1 equivalent logic
        """
        print(f"\n--- Arithmetic Progression (a={a}, d={d}, n={n}) ---")
        
        nth_term = a + (n - 1) * d
        sum_n = (n / 2) * (2 * a + (n - 1) * d)
        
        print(f"The {n}th term is: {nth_term}")
        print(f"The Sum of the first {n} terms is: {sum_n}")

    def solve_geometric_progression(self, a, r, n):
        """
        Calculates nth term and Sum of GP.
        a = first term
        r = common ratio
        
        Formulas:
        nth term: Gn = a * r^(n-1)
        Sum: Sn = a(r^n - 1) / (r - 1)  (if r > 1)
        Reference: Example 5.17
        """
        print(f"\n--- Geometric Progression (a={a}, r={r}, n={n}) ---")
        
        nth_term = a * (r ** (n - 1))
        
        if r == 1:
            sum_n = a * n
        else:
            sum_n = (a * (r**n - 1)) / (r - 1)
            
        print(f"The {n}th term is: {nth_term}")
        print(f"The Sum of the first {n} terms is: {sum_n}")

class Chapter6_Circles:
    """
    Solves concepts from Chapter 6.
    Covers: Arc Length, Sector Area, Chord Properties.
    """

    def arc_length_and_sector_area(self, radius, theta_degrees):
        """
        Calculates Arc Length and Area of a Sector.
        Formulas:
        Arc Length (l) = (θ/360) * 2πr
        Sector Area (A) = (θ/360) * πr²
        Reference: Example 6.1
        """
        print(f"\n--- Circle Calculations (r={radius}, θ={theta_degrees}°) ---")
        
        fraction = theta_degrees / 360
        
        arc_length = fraction * 2 * math.pi * radius
        sector_area = fraction * math.pi * (radius ** 2)
        
        print(f"Arc Length: {arc_length:.2f} units")
        print(f"Sector Area: {sector_area:.2f} sq units")

    def chord_length(self, radius, distance_from_center):
        """
        Calculates the length of a chord.
        Uses Pythagoras theorem on the right triangle formed by radius, 
        distance to chord, and half-chord.
        Reference: Example 6.15
        """
        print(f"\n--- Chord Length Calculation (r={radius}, dist={distance_from_center}) ---")
        
        if distance_from_center >= radius:
            print("Error: Distance is greater than radius. Chord doesn't exist.")
            return

        # c² = a² + b²  ->  half_chord = √(r² - d²)
        half_chord = math.sqrt(radius**2 - distance_from_center**2)
        total_chord_length = 2 * half_chord
        
        print(f"Length of the chord: {total_chord_length:.2f} units")

class Chapter7_EarthAsSphere:
    """
    Solves concepts from Chapter 7.
    Covers: Great Circles, Small Circles, Distances in Nautical Miles (nm).
    R (Earth) approx 6370km.
    """
    
    def calculate_great_circle_distance(self, lat1, lat2):
        """
        Calculates distance along a meridian (Great Circle).
        Distance = Difference in angle * 60 nm
        Reference: Example 7.6
        """
        print(f"\n--- Earth Distance: Along a Meridian (Lat {lat1}° to {lat2}°) ---")
        
        # Calculate angular difference
        if (lat1 > 0 and lat2 > 0) or (lat1 < 0 and lat2 < 0):
            # Same hemisphere, subtract
            alpha = abs(lat1 - lat2)
        else:
            # Different hemispheres, add
            alpha = abs(lat1) + abs(lat2)
            
        distance_nm = alpha * 60
        distance_km = distance_nm * 1.852
        
        print(f"Angular Difference (α): {alpha}°")
        print(f"Distance: {distance_nm} nm")
        print(f"Distance: {distance_km:.2f} km")

    def calculate_small_circle_distance(self, long1, long2, latitude):
        """
        Calculates distance along a parallel of latitude (Small Circle).
        Formula: Distance = Difference in Longitude * 60 * cos(latitude)
        Reference: Example 7.8
        """
        print(f"\n--- Earth Distance: Along Parallel {latitude}° (Long {long1}° to {long2}°) ---")
        
        # Calculate angular difference in longitude
        alpha = abs(long1 - long2) # Simplified for non-dateline crossing
        
        # Convert latitude to radians for the cos function
        lat_rad = math.radians(latitude)
        
        distance_nm = alpha * 60 * math.cos(lat_rad)
        distance_km = distance_nm * 1.852
        
        print(f"Distance: {distance_nm:.2f} nm")
        print(f"Distance: {distance_km:.2f} km")

class Chapter8_Accounting:
    """
    Solves concepts from Chapter 8.
    Covers: Basic Balance Sheet Equation.
    """

    def basic_accounting_equation(self, assets=None, liabilities=None, capital=None):
        """
        Solves: Assets = Capital + Liabilities
        Pass 'None' for the value you want to calculate.
        Reference: Accounting Introduction
        """
        print("\n--- Accounting Equation Solver ---")
        
        if assets is None and liabilities is not None and capital is not None:
            assets = capital + liabilities
            print(f"Calculated Assets: {assets}")
        elif capital is None and assets is not None and liabilities is not None:
            capital = assets - liabilities
            print(f"Calculated Capital: {capital}")
        elif liabilities is None and assets is not None and capital is not None:
            liabilities = assets - capital
            print(f"Calculated Liabilities: {liabilities}")
        else:
            print("Error: Please provide exactly two values to find the third.")

# ==========================================
# MAIN EXECUTION BLOCK (Demonstrations)
# ==========================================

if __name__ == "__main__":
    print("=== FORM THREE MATHEMATICS SOLVER ===")

    # --- Chapter 2 Demo: Quadratics ---
    algebra = Chapter1_2_RelationsAndFunctions()
    # Solving x² - 5x + 6 = 0 (Roots should be 2 and 3)
    algebra.solve_quadratic_function(1, -5, 6)
    
    # --- Chapter 3 Demo: Statistics ---
    stats = Chapter3_Statistics()
    data = [5, 8, 12, 15, 12, 8, 8, 5, 20]
    stats.analyze_ungrouped_data(data)
    
    # --- Chapter 4 Demo: Variations ---
    variation = Chapter4_RatesAndVariations()
    # If y varies directly as x, and y=24 when x=4, find y when x=5 (Ref Example 4.12)
    variation.direct_variation(4, 24, 5)
    
    # --- Chapter 5 Demo: Sequences ---
    seq = Chapter5_SequencesAndSeries()
    # AP: 1, 3, 5, 7... find 10th term and sum
    seq.solve_arithmetic_progression(a=1, d=2, n=10)
    
    # --- Chapter 6 Demo: Circles ---
    circles = Chapter6_Circles()
    # Find chord length in a circle of radius 5cm, distance 3cm from center
    circles.chord_length(radius=5, distance_from_center=3)
    
    # --- Chapter 7 Demo: Earth Geometry ---
    earth = Chapter7_EarthAsSphere()
    # Distance between two latitudes on the same meridian (Example 7.6 logic)
    earth.calculate_great_circle_distance(10, 45) # 10°N to 45°N
    
    # --- Chapter 8 Demo: Accounting ---
    acc = Chapter8_Accounting()
    # Calculate Capital if Assets=1,500,000 and Liabilities=200,000
    acc.basic_accounting_equation(assets=1500000, liabilities=200000, capital=None)