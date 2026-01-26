import math

class BasicMathFormThree:
    """
    A comprehensive toolkit to solve mathematical concepts from the 
    Tanzania Institute of Education Form Three Student's Book [3, 4].
    """

    # --- CHAPTER 1: RELATIONS ---
    @staticmethod
    def inverse_relation(ordered_pairs):
        """
        Reverses the order of coordinates in each ordered pair to find 
        the inverse relation [5, 6].
        Example: {(a, b)} becomes {(b, a)} [5].
        """
        return [(b, a) for (a, b) in ordered_pairs]

    # --- CHAPTER 2: FUNCTIONS ---
    @staticmethod
    def linear_function(m, x, c):
        """
        Calculates f(x) for a linear function in the form f(x) = mx + c [7].
        'm' is the gradient (slope) and 'c' is the y-intercept [7].
        """
        return m * x + c

    @staticmethod
    def quadratic_function(a, b, c, x):
        """
        Calculates f(x) for a quadratic function f(x) = ax^2 + bx + c [8].
        The graph of such a function is a parabola [9].
        """
        return a * (x**2) + (b * x) + c

    @staticmethod
    def quadratic_turning_point(a, b, c):
        """
        Finds the coordinates of the turning point (vertex) of a parabola [9].
        Formula: x = -b / 2a, y = (4ac - b^2) / 4a [9, 10].
        """
        x = -b / (2 * a)
        y = (4 * a * c - b**2) / (4 * a)
        return (x, y)

    # --- CHAPTER 3: STATISTICS ---
    @staticmethod
    def grouped_mean(class_marks, frequencies):
        """
        Calculates the mean (x-bar) for grouped data [11].
        Formula: Mean = Σ(fi * xi) / Σfi, where xi is the class mark [11, 12].
        """
        total_fx = sum(f * x for f, x in zip(frequencies, class_marks))
        total_f = sum(frequencies)
        return total_fx / total_f

    @staticmethod
    def grouped_median(L, N, n_b, n_w, i):
        """
        Calculates the median for grouped data [13].
        L: Lower boundary of the median class [13, 14].
        N: Total number of observations [13].
        n_b: Cumulative frequency before the median class [13].
        n_w: Frequency of the median class [13].
        i: Class size [13].
        Formula: Median = L + ((N/2 - n_b) / n_w) * i [13, 14].
        """
        return L + (((N / 2) - n_b) / n_w) * i

    @staticmethod
    def grouped_mode(L, t1, t2, i):
        """
        Calculates the mode for grouped data [15, 16].
        L: Lower class limit of the modal class [15].
        t1: Frequency difference (modal class - class before) [15].
        t2: Frequency difference (modal class - class after) [15].
        i: Class size [15].
        Formula: Mode = L + (t1 / (t1 + t2)) * i [15, 16].
        """
        return L + (t1 / (t1 + t2)) * i

    # --- CHAPTER 4: RATES AND VARIATIONS ---
    @staticmethod
    def direct_variation(k, x):
        """
        Calculates y when x varies directly as y (y = kx) [17, 18].
        'k' is the constant of proportionality [17].
        """
        return k * x

    @staticmethod
    def inverse_variation(k, x):
        """
        Calculates y when x varies inversely as y (y = k/x) [18, 19].
        The graph of this relation never crosses the axes [20, 21].
        """
        return k / x

    # --- CHAPTER 5: SEQUENCES AND SERIES ---
    @staticmethod
    def arithmetic_nth_term(a1, n, d):
        """
        Finds the nth term (An) of an Arithmetic Progression (AP) [22].
        a1: First term, n: term number, d: common difference [22, 23].
        Formula: An = a1 + (n - 1)d [22, 24].
        """
        return a1 + (n - 1) * d

    @staticmethod
    def arithmetic_sum(a1, n, d):
        """
        Finds the sum of the first n terms (Sn) of an AP [25].
        Formula: Sn = (n / 2) * (2*a1 + (n - 1)d) [14, 25].
        """
        return (n / 2) * (2 * a1 + (n - 1) * d)

    @staticmethod
    def geometric_nth_term(g1, n, r):
        """
        Finds the nth term (Gn) of a Geometric Progression (GP) [26].
        g1: First term, n: term number, r: common ratio [26, 27].
        Formula: Gn = g1 * r^(n-1) [27, 28].
        """
        return g1 * (r**(n - 1))

    @staticmethod
    def geometric_sum(g1, n, r):
        """
        Finds the sum of the first n terms (Sn) of a GP [28, 29].
        If r > 1: Sn = g1(r^n - 1) / (r - 1) [29].
        If r < 1: Sn = g1(1 - r^n) / (1 - r) [29].
        """
        if r == 1:
            return g1 * n
        elif r > 1:
            return g1 * (r**n - 1) / (r - 1)
        else:
            return g1 * (1 - r**n) / (1 - r)

# --- EXAMPLE USAGE ---
if __name__ == "__main__":
    math_solver = BasicMathFormThree()

    # Solving for Chapter 3 Example 3.12 (Grouped Median) [13]
    # Lengths of nails: median class 115-123, L=114.5, N=40, n_b=17, n_w=12, i=9
    median_nail = math_solver.grouped_median(114.5, 40, 17, 12, 9)
    print(f"Chapter 3: Grouped Median of nails is {median_nail:.2f} mm [30].")

    # Solving for Chapter 5 Example 5.11 (Sum of Arithmetic Series) [25]
    # Series: 3 + 10 + 17 + 21... find sum of 16 terms. a1=3, d=7, n=16.
    ap_sum = math_solver.arithmetic_sum(3, 16, 7)
    print(f"Chapter 5: Sum of first 16 terms in AP is {ap_sum} [25].")