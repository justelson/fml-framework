import sys
import math
import matplotlib.pyplot as plt
from matplotlib.backends.backend_qtagg import FigureCanvasQTAgg as FigureCanvas
from matplotlib.figure import Figure
import statistics
from PySide6.QtWidgets import (QApplication, QMainWindow, QTabWidget, QWidget,
                               QVBoxLayout, QHBoxLayout, QLabel, QLineEdit,
                               QPushButton, QTextEdit, QSpinBox, QDoubleSpinBox,
                               QFormLayout, QGroupBox, QMessageBox, QComboBox)
from PySide6.QtCore import Qt
from PySide6.QtGui import QFont, QColor


class Chapter1_2_RelationsAndFunctions:
    """Solves concepts from Chapters 1 and 2: Relations and Functions."""

    def solve_quadratic_function(self, a, b, c):
        """Solves a quadratic equation: f(x) = ax^2 + bx + c = 0"""
        discriminant = b**2 - 4*a*c
        
        results = {
            'discriminant': discriminant,
            'equation': f"{a}x² + {b}x + {c} = 0"
        }
        
        if discriminant > 0:
            root1 = (-b + math.sqrt(discriminant)) / (2*a)
            root2 = (-b - math.sqrt(discriminant)) / (2*a)
            results['roots'] = (root1, root2)
            results['message'] = f"Two real roots: x = {root1:.4f} and x = {root2:.4f}"
        elif discriminant == 0:
            root = -b / (2*a)
            results['roots'] = (root,)
            results['message'] = f"One real root (vertex): x = {root:.4f}"
        else:
            results['roots'] = None
            results['message'] = "No real roots (complex roots). Graph doesn't touch x-axis."
        
        return results

    def plot_function(self, func_str, x_min, x_max):
        """Plots a function over a range"""
        try:
            x_values = [x * 0.1 for x in range(int(x_min*10), int(x_max*10)+1)]
            y_values = [eval(func_str.replace('x', f'({x})')) for x in x_values]
            
            fig = Figure(figsize=(6, 4), dpi=100)
            ax = fig.add_subplot(111)
            ax.plot(x_values, y_values, 'b-', linewidth=2)
            ax.axhline(0, color='black', linewidth=0.5)
            ax.axvline(0, color='black', linewidth=0.5)
            ax.grid(True, linestyle='--', alpha=0.3)
            ax.set_xlabel("x (Domain)")
            ax.set_ylabel("f(x) (Range)")
            ax.set_title(f"Graph of f(x) = {func_str}")
            
            return fig, "Plot generated successfully"
        except Exception as e:
            return None, f"Error: {str(e)}"


class Chapter3_Statistics:
    """Solves concepts from Chapter 3: Statistics."""

    def analyze_ungrouped_data(self, data):
        """Calculates central tendency for a list of numbers"""
        try:
            data = [float(x) for x in data]
            mean_val = statistics.mean(data)
            median_val = statistics.median(data)
            
            try:
                mode_val = statistics.mode(data)
            except statistics.StatisticsError:
                mode_val = "No unique mode"
            
            return {
                'mean': f"{mean_val:.4f}",
                'median': f"{median_val}",
                'mode': f"{mode_val}",
                'count': len(data)
            }
        except Exception as e:
            return {'error': str(e)}

    def mean_grouped_data(self, groups):
        """Calculates estimated mean for grouped data"""
        try:
            sum_fx = sum(g['frequency'] * g['midpoint'] for g in groups)
            sum_f = sum(g['frequency'] for g in groups)
            estimated_mean = sum_fx / sum_f
            
            return {
                'sum_f': sum_f,
                'sum_fx': sum_fx,
                'mean': f"{estimated_mean:.4f}"
            }
        except Exception as e:
            return {'error': str(e)}


class Chapter4_RatesAndVariations:
    """Solves concepts from Chapter 4: Rates and Variations."""

    def direct_variation(self, x1, y1, x2):
        """Solves y = kx"""
        try:
            k = y1 / x1
            y2 = k * x2
            return {
                'k': f"{k:.4f}",
                'result': f"{y2:.4f}",
                'equation': f"y = {k:.4f}x"
            }
        except Exception as e:
            return {'error': str(e)}

    def inverse_variation(self, x1, y1, x2):
        """Solves y = k/x"""
        try:
            k = y1 * x1
            y2 = k / x2
            return {
                'k': f"{k:.4f}",
                'result': f"{y2:.4f}",
                'equation': f"y = {k:.4f}/x"
            }
        except Exception as e:
            return {'error': str(e)}


class Chapter5_SequencesAndSeries:
    """Solves concepts from Chapter 5: Sequences and Series."""

    def solve_arithmetic_progression(self, a, d, n):
        """Calculates nth term and Sum of AP"""
        try:
            nth_term = a + (n - 1) * d
            sum_n = (n / 2) * (2 * a + (n - 1) * d)
            
            return {
                'nth_term': f"{nth_term:.4f}",
                'sum': f"{sum_n:.4f}",
                'sequence': f"a={a}, d={d}, n={n}"
            }
        except Exception as e:
            return {'error': str(e)}

    def solve_geometric_progression(self, a, r, n):
        """Calculates nth term and Sum of GP"""
        try:
            nth_term = a * (r ** (n - 1))
            
            if r == 1:
                sum_n = a * n
            else:
                sum_n = (a * (r**n - 1)) / (r - 1)
            
            return {
                'nth_term': f"{nth_term:.4f}",
                'sum': f"{sum_n:.4f}",
                'sequence': f"a={a}, r={r}, n={n}"
            }
        except Exception as e:
            return {'error': str(e)}


class Chapter6_Circles:
    """Solves concepts from Chapter 6: Circles."""

    def arc_length_and_sector_area(self, radius, theta_degrees):
        """Calculates Arc Length and Area of a Sector"""
        try:
            fraction = theta_degrees / 360
            arc_length = fraction * 2 * math.pi * radius
            sector_area = fraction * math.pi * (radius ** 2)
            
            return {
                'arc_length': f"{arc_length:.4f}",
                'sector_area': f"{sector_area:.4f}",
                'radius': radius,
                'angle': theta_degrees
            }
        except Exception as e:
            return {'error': str(e)}

    def chord_length(self, radius, distance_from_center):
        """Calculates the length of a chord"""
        try:
            if distance_from_center >= radius:
                return {'error': "Distance is greater than radius"}
            
            half_chord = math.sqrt(radius**2 - distance_from_center**2)
            total_chord_length = 2 * half_chord
            
            return {
                'chord_length': f"{total_chord_length:.4f}",
                'half_chord': f"{half_chord:.4f}",
                'radius': radius,
                'distance': distance_from_center
            }
        except Exception as e:
            return {'error': str(e)}


class Chapter7_EarthAsSphere:
    """Solves concepts from Chapter 7: Earth as a Sphere."""

    def calculate_great_circle_distance(self, lat1, lat2):
        """Calculates distance along a meridian"""
        try:
            if (lat1 > 0 and lat2 > 0) or (lat1 < 0 and lat2 < 0):
                alpha = abs(lat1 - lat2)
            else:
                alpha = abs(lat1) + abs(lat2)
            
            distance_nm = alpha * 60
            distance_km = distance_nm * 1.852
            
            return {
                'angle': f"{alpha}°",
                'distance_nm': f"{distance_nm:.2f}",
                'distance_km': f"{distance_km:.2f}"
            }
        except Exception as e:
            return {'error': str(e)}

    def calculate_small_circle_distance(self, long1, long2, latitude):
        """Calculates distance along a parallel of latitude"""
        try:
            alpha = abs(long1 - long2)
            lat_rad = math.radians(latitude)
            distance_nm = alpha * 60 * math.cos(lat_rad)
            distance_km = distance_nm * 1.852
            
            return {
                'distance_nm': f"{distance_nm:.2f}",
                'distance_km': f"{distance_km:.2f}",
                'latitude': latitude,
                'longitude_diff': alpha
            }
        except Exception as e:
            return {'error': str(e)}


class Chapter8_Accounting:
    """Solves concepts from Chapter 8: Accounting."""

    def basic_accounting_equation(self, assets=None, liabilities=None, capital=None):
        """Solves: Assets = Capital + Liabilities"""
        try:
            if assets is None and liabilities is not None and capital is not None:
                assets = capital + liabilities
                unknown = 'Assets'
            elif capital is None and assets is not None and liabilities is not None:
                capital = assets - liabilities
                unknown = 'Capital'
            elif liabilities is None and assets is not None and capital is not None:
                liabilities = assets - capital
                unknown = 'Liabilities'
            else:
                return {'error': 'Provide exactly two values to find the third'}
            
            return {
                'assets': f"{assets:,.2f}",
                'liabilities': f"{liabilities:,.2f}",
                'capital': f"{capital:,.2f}",
                'calculated': unknown
            }
        except Exception as e:
            return {'error': str(e)}


class MathGUIApp(QMainWindow):
    """Main GUI Application Window"""
    
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Form Three Mathematics Solver")
        self.setGeometry(100, 100, 900, 700)
        
        # Initialize solver classes
        self.ch1_2 = Chapter1_2_RelationsAndFunctions()
        self.ch3 = Chapter3_Statistics()
        self.ch4 = Chapter4_RatesAndVariations()
        self.ch5 = Chapter5_SequencesAndSeries()
        self.ch6 = Chapter6_Circles()
        self.ch7 = Chapter7_EarthAsSphere()
        self.ch8 = Chapter8_Accounting()
        
        # Create tab widget
        self.tabs = QTabWidget()
        self.setCentralWidget(self.tabs)
        
        # Add tabs
        self.create_chapter1_2_tab()
        self.create_chapter3_tab()
        self.create_chapter4_tab()
        self.create_chapter5_tab()
        self.create_chapter6_tab()
        self.create_chapter7_tab()
        self.create_chapter8_tab()

    def create_chapter1_2_tab(self):
        """Chapter 1-2: Relations and Functions"""
        widget = QWidget()
        layout = QVBoxLayout()
        
        # Quadratic Solver
        group1 = QGroupBox("Quadratic Solver: ax² + bx + c = 0")
        form1 = QFormLayout()
        
        self.ch12_a = QDoubleSpinBox()
        self.ch12_a.setValue(1)
        self.ch12_b = QDoubleSpinBox()
        self.ch12_b.setValue(-5)
        self.ch12_c = QDoubleSpinBox()
        self.ch12_c.setValue(6)
        
        form1.addRow("a:", self.ch12_a)
        form1.addRow("b:", self.ch12_b)
        form1.addRow("c:", self.ch12_c)
        
        btn_solve = QPushButton("Solve")
        btn_solve.clicked.connect(self.solve_quadratic)
        form1.addRow(btn_solve)
        
        group1.setLayout(form1)
        layout.addWidget(group1)
        
        # Output
        self.ch12_output = QTextEdit()
        self.ch12_output.setReadOnly(True)
        layout.addWidget(QLabel("Results:"))
        layout.addWidget(self.ch12_output)
        
        # Function Plotter
        group2 = QGroupBox("Function Plotter")
        form2 = QFormLayout()
        
        self.ch12_func = QLineEdit("x**2 - 5*x + 6")
        self.ch12_x_min = QDoubleSpinBox()
        self.ch12_x_min.setValue(-2)
        self.ch12_x_max = QDoubleSpinBox()
        self.ch12_x_max.setValue(5)
        
        form2.addRow("f(x):", self.ch12_func)
        form2.addRow("x min:", self.ch12_x_min)
        form2.addRow("x max:", self.ch12_x_max)
        
        btn_plot = QPushButton("Plot")
        btn_plot.clicked.connect(self.plot_function)
        form2.addRow(btn_plot)
        
        group2.setLayout(form2)
        layout.addWidget(group2)
        
        # Plot area (embedded Matplotlib canvas will be inserted here)
        self.ch12_plot_area = QVBoxLayout()
        self.ch12_plot_placeholder = QLabel("Plot area")
        self.ch12_plot_placeholder.setAlignment(Qt.AlignCenter)
        self.ch12_plot_area.addWidget(self.ch12_plot_placeholder)
        layout.addLayout(self.ch12_plot_area)

        widget.setLayout(layout)
        self.tabs.addTab(widget, "Chapter 1-2: Relations & Functions")

    def create_chapter3_tab(self):
        """Chapter 3: Statistics"""
        widget = QWidget()
        layout = QVBoxLayout()
        
        # Ungrouped Data
        group1 = QGroupBox("Ungrouped Data Analysis")
        form1 = QFormLayout()
        
        self.ch3_data = QLineEdit("5, 8, 12, 15, 12, 8, 8, 5, 20")
        form1.addRow("Data (comma-separated):", self.ch3_data)
        
        btn_analyze = QPushButton("Analyze")
        btn_analyze.clicked.connect(self.analyze_ungrouped_data)
        form1.addRow(btn_analyze)
        
        group1.setLayout(form1)
        layout.addWidget(group1)
        
        self.ch3_output = QTextEdit()
        self.ch3_output.setReadOnly(True)
        layout.addWidget(QLabel("Results:"))
        layout.addWidget(self.ch3_output)
        
        widget.setLayout(layout)
        self.tabs.addTab(widget, "Chapter 3: Statistics")

    def create_chapter4_tab(self):
        """Chapter 4: Rates and Variations"""
        widget = QWidget()
        layout = QVBoxLayout()
        
        # Direct Variation
        group1 = QGroupBox("Direct Variation (y = kx)")
        form1 = QFormLayout()
        
        self.ch4_x1 = QDoubleSpinBox()
        self.ch4_x1.setValue(4)
        self.ch4_y1 = QDoubleSpinBox()
        self.ch4_y1.setValue(24)
        self.ch4_x2 = QDoubleSpinBox()
        self.ch4_x2.setValue(5)
        
        form1.addRow("x₁:", self.ch4_x1)
        form1.addRow("y₁:", self.ch4_y1)
        form1.addRow("x₂:", self.ch4_x2)
        
        btn_direct = QPushButton("Solve Direct")
        btn_direct.clicked.connect(self.solve_direct_variation)
        form1.addRow(btn_direct)
        
        group1.setLayout(form1)
        layout.addWidget(group1)
        
        # Inverse Variation
        group2 = QGroupBox("Inverse Variation (y = k/x)")
        form2 = QFormLayout()
        
        self.ch4_inv_x1 = QDoubleSpinBox()
        self.ch4_inv_x1.setValue(2)
        self.ch4_inv_y1 = QDoubleSpinBox()
        self.ch4_inv_y1.setValue(60)
        self.ch4_inv_x2 = QDoubleSpinBox()
        self.ch4_inv_x2.setValue(3)
        
        form2.addRow("x₁:", self.ch4_inv_x1)
        form2.addRow("y₁:", self.ch4_inv_y1)
        form2.addRow("x₂:", self.ch4_inv_x2)
        
        btn_inverse = QPushButton("Solve Inverse")
        btn_inverse.clicked.connect(self.solve_inverse_variation)
        form2.addRow(btn_inverse)
        
        group2.setLayout(form2)
        layout.addWidget(group2)
        
        self.ch4_output = QTextEdit()
        self.ch4_output.setReadOnly(True)
        layout.addWidget(QLabel("Results:"))
        layout.addWidget(self.ch4_output)
        
        widget.setLayout(layout)
        self.tabs.addTab(widget, "Chapter 4: Rates & Variations")

    def create_chapter5_tab(self):
        """Chapter 5: Sequences and Series"""
        widget = QWidget()
        layout = QVBoxLayout()
        
        # AP
        group1 = QGroupBox("Arithmetic Progression (AP)")
        form1 = QFormLayout()
        
        self.ch5_ap_a = QDoubleSpinBox()
        self.ch5_ap_a.setValue(1)
        self.ch5_ap_d = QDoubleSpinBox()
        self.ch5_ap_d.setValue(2)
        self.ch5_ap_n = QSpinBox()
        self.ch5_ap_n.setValue(10)
        
        form1.addRow("First term (a):", self.ch5_ap_a)
        form1.addRow("Common diff (d):", self.ch5_ap_d)
        form1.addRow("Number of terms (n):", self.ch5_ap_n)
        
        btn_ap = QPushButton("Solve AP")
        btn_ap.clicked.connect(self.solve_ap)
        form1.addRow(btn_ap)
        
        group1.setLayout(form1)
        layout.addWidget(group1)
        
        # GP
        group2 = QGroupBox("Geometric Progression (GP)")
        form2 = QFormLayout()
        
        self.ch5_gp_a = QDoubleSpinBox()
        self.ch5_gp_a.setValue(2)
        self.ch5_gp_r = QDoubleSpinBox()
        self.ch5_gp_r.setValue(3)
        self.ch5_gp_n = QSpinBox()
        self.ch5_gp_n.setValue(5)
        
        form2.addRow("First term (a):", self.ch5_gp_a)
        form2.addRow("Common ratio (r):", self.ch5_gp_r)
        form2.addRow("Number of terms (n):", self.ch5_gp_n)
        
        btn_gp = QPushButton("Solve GP")
        btn_gp.clicked.connect(self.solve_gp)
        form2.addRow(btn_gp)
        
        group2.setLayout(form2)
        layout.addWidget(group2)
        
        self.ch5_output = QTextEdit()
        self.ch5_output.setReadOnly(True)
        layout.addWidget(QLabel("Results:"))
        layout.addWidget(self.ch5_output)
        
        widget.setLayout(layout)
        self.tabs.addTab(widget, "Chapter 5: Sequences & Series")

    def create_chapter6_tab(self):
        """Chapter 6: Circles"""
        widget = QWidget()
        layout = QVBoxLayout()
        
        # Arc Length & Sector Area
        group1 = QGroupBox("Arc Length & Sector Area")
        form1 = QFormLayout()
        
        self.ch6_radius = QDoubleSpinBox()
        self.ch6_radius.setValue(5)
        self.ch6_theta = QDoubleSpinBox()
        self.ch6_theta.setValue(60)
        
        form1.addRow("Radius (r):", self.ch6_radius)
        form1.addRow("Angle (θ in degrees):", self.ch6_theta)
        
        btn_arc = QPushButton("Calculate")
        btn_arc.clicked.connect(self.calculate_arc)
        form1.addRow(btn_arc)
        
        group1.setLayout(form1)
        layout.addWidget(group1)
        
        # Chord Length
        group2 = QGroupBox("Chord Length")
        form2 = QFormLayout()
        
        self.ch6_chord_r = QDoubleSpinBox()
        self.ch6_chord_r.setValue(5)
        self.ch6_chord_d = QDoubleSpinBox()
        self.ch6_chord_d.setValue(3)
        
        form2.addRow("Radius (r):", self.ch6_chord_r)
        form2.addRow("Distance from center (d):", self.ch6_chord_d)
        
        btn_chord = QPushButton("Calculate")
        btn_chord.clicked.connect(self.calculate_chord)
        form2.addRow(btn_chord)
        
        group2.setLayout(form2)
        layout.addWidget(group2)
        
        self.ch6_output = QTextEdit()
        self.ch6_output.setReadOnly(True)
        layout.addWidget(QLabel("Results:"))
        layout.addWidget(self.ch6_output)
        
        widget.setLayout(layout)
        self.tabs.addTab(widget, "Chapter 6: Circles")

    def create_chapter7_tab(self):
        """Chapter 7: Earth as a Sphere"""
        widget = QWidget()
        layout = QVBoxLayout()
        
        # Great Circle
        group1 = QGroupBox("Great Circle Distance (along Meridian)")
        form1 = QFormLayout()
        
        self.ch7_lat1 = QDoubleSpinBox()
        self.ch7_lat1.setValue(10)
        self.ch7_lat2 = QDoubleSpinBox()
        self.ch7_lat2.setValue(45)
        
        form1.addRow("Latitude 1 (°):", self.ch7_lat1)
        form1.addRow("Latitude 2 (°):", self.ch7_lat2)
        
        btn_great = QPushButton("Calculate")
        btn_great.clicked.connect(self.calculate_great_circle)
        form1.addRow(btn_great)
        
        group1.setLayout(form1)
        layout.addWidget(group1)
        
        # Small Circle
        group2 = QGroupBox("Small Circle Distance (along Parallel)")
        form2 = QFormLayout()
        
        self.ch7_long1 = QDoubleSpinBox()
        self.ch7_long1.setValue(10)
        self.ch7_long2 = QDoubleSpinBox()
        self.ch7_long2.setValue(30)
        self.ch7_lat = QDoubleSpinBox()
        self.ch7_lat.setValue(20)
        
        form2.addRow("Longitude 1 (°):", self.ch7_long1)
        form2.addRow("Longitude 2 (°):", self.ch7_long2)
        form2.addRow("Latitude (°):", self.ch7_lat)
        
        btn_small = QPushButton("Calculate")
        btn_small.clicked.connect(self.calculate_small_circle)
        form2.addRow(btn_small)
        
        group2.setLayout(form2)
        layout.addWidget(group2)
        
        self.ch7_output = QTextEdit()
        self.ch7_output.setReadOnly(True)
        layout.addWidget(QLabel("Results:"))
        layout.addWidget(self.ch7_output)
        
        widget.setLayout(layout)
        self.tabs.addTab(widget, "Chapter 7: Earth as Sphere")

    def create_chapter8_tab(self):
        """Chapter 8: Accounting"""
        widget = QWidget()
        layout = QVBoxLayout()
        
        group = QGroupBox("Accounting Equation: Assets = Capital + Liabilities")
        form = QFormLayout()
        
        self.ch8_assets = QLineEdit()
        self.ch8_assets.setPlaceholderText("Leave blank to calculate")
        self.ch8_liabilities = QLineEdit()
        self.ch8_liabilities.setPlaceholderText("Leave blank to calculate")
        self.ch8_capital = QLineEdit()
        self.ch8_capital.setPlaceholderText("Leave blank to calculate")
        
        form.addRow("Assets:", self.ch8_assets)
        form.addRow("Liabilities:", self.ch8_liabilities)
        form.addRow("Capital:", self.ch8_capital)
        
        btn_calc = QPushButton("Calculate")
        btn_calc.clicked.connect(self.calculate_accounting)
        form.addRow(btn_calc)
        
        group.setLayout(form)
        layout.addWidget(group)
        
        self.ch8_output = QTextEdit()
        self.ch8_output.setReadOnly(True)
        layout.addWidget(QLabel("Results:"))
        layout.addWidget(self.ch8_output)
        
        widget.setLayout(layout)
        self.tabs.addTab(widget, "Chapter 8: Accounting")

    # Slot methods for Chapter 1-2
    def solve_quadratic(self):
        try:
            a = self.ch12_a.value()
            b = self.ch12_b.value()
            c = self.ch12_c.value()
            
            if a == 0:
                self.ch12_output.setText("Error: 'a' cannot be 0 for a quadratic equation")
                return
            
            result = self.ch1_2.solve_quadratic_function(a, b, c)
            
            output = f"Equation: {result['equation']}\n"
            output += f"Discriminant: {result['discriminant']}\n"
            output += f"Message: {result['message']}"
            
            self.ch12_output.setText(output)
        except Exception as e:
            self.ch12_output.setText(f"Error: {str(e)}")

    def plot_function(self):
        try:
            func_str = self.ch12_func.text()
            x_min = self.ch12_x_min.value()
            x_max = self.ch12_x_max.value()
            
            if x_min >= x_max:
                self.ch12_output.setText("Error: x_min must be less than x_max")
                return
            
            fig, msg = self.ch1_2.plot_function(func_str, x_min, x_max)

            if fig:
                # remove previous widgets from plot area
                while self.ch12_plot_area.count():
                    item = self.ch12_plot_area.takeAt(0)
                    w = item.widget()
                    if w is not None:
                        w.setParent(None)

                canvas = FigureCanvas(fig)
                self.ch12_plot_area.addWidget(canvas)
                canvas.draw()
                self.ch12_output.setText(msg)
            else:
                self.ch12_output.setText(msg)
        except Exception as e:
            self.ch12_output.setText(f"Error: {str(e)}")

    # Slot methods for Chapter 3
    def analyze_ungrouped_data(self):
        try:
            data_str = self.ch3_data.text()
            data = [float(x.strip()) for x in data_str.split(',')]
            
            result = self.ch3.analyze_ungrouped_data(data)
            
            if 'error' in result:
                self.ch3_output.setText(f"Error: {result['error']}")
            else:
                output = f"Data Count: {result['count']}\n"
                output += f"Mean: {result['mean']}\n"
                output += f"Median: {result['median']}\n"
                output += f"Mode: {result['mode']}"
                self.ch3_output.setText(output)
        except Exception as e:
            self.ch3_output.setText(f"Error: {str(e)}")

    # Slot methods for Chapter 4
    def solve_direct_variation(self):
        try:
            result = self.ch4.direct_variation(
                self.ch4_x1.value(),
                self.ch4_y1.value(),
                self.ch4_x2.value()
            )
            
            if 'error' in result:
                self.ch4_output.setText(f"Error: {result['error']}")
            else:
                output = f"Equation: {result['equation']}\n"
                output += f"Constant (k): {result['k']}\n"
                output += f"When x = {self.ch4_x2.value()}, y = {result['result']}"
                self.ch4_output.setText(output)
        except Exception as e:
            self.ch4_output.setText(f"Error: {str(e)}")

    def solve_inverse_variation(self):
        try:
            result = self.ch4.inverse_variation(
                self.ch4_inv_x1.value(),
                self.ch4_inv_y1.value(),
                self.ch4_inv_x2.value()
            )
            
            if 'error' in result:
                self.ch4_output.setText(f"Error: {result['error']}")
            else:
                output = f"Equation: {result['equation']}\n"
                output += f"Constant (k): {result['k']}\n"
                output += f"When x = {self.ch4_inv_x2.value()}, y = {result['result']}"
                self.ch4_output.setText(output)
        except Exception as e:
            self.ch4_output.setText(f"Error: {str(e)}")

    # Slot methods for Chapter 5
    def solve_ap(self):
        try:
            result = self.ch5.solve_arithmetic_progression(
                self.ch5_ap_a.value(),
                self.ch5_ap_d.value(),
                self.ch5_ap_n.value()
            )
            
            if 'error' in result:
                self.ch5_output.setText(f"Error: {result['error']}")
            else:
                output = f"Sequence: {result['sequence']}\n"
                output += f"nth term: {result['nth_term']}\n"
                output += f"Sum of first n terms: {result['sum']}"
                self.ch5_output.setText(output)
        except Exception as e:
            self.ch5_output.setText(f"Error: {str(e)}")

    def solve_gp(self):
        try:
            result = self.ch5.solve_geometric_progression(
                self.ch5_gp_a.value(),
                self.ch5_gp_r.value(),
                self.ch5_gp_n.value()
            )
            
            if 'error' in result:
                self.ch5_output.setText(f"Error: {result['error']}")
            else:
                output = f"Sequence: {result['sequence']}\n"
                output += f"nth term: {result['nth_term']}\n"
                output += f"Sum of first n terms: {result['sum']}"
                self.ch5_output.setText(output)
        except Exception as e:
            self.ch5_output.setText(f"Error: {str(e)}")

    # Slot methods for Chapter 6
    def calculate_arc(self):
        try:
            result = self.ch6.arc_length_and_sector_area(
                self.ch6_radius.value(),
                self.ch6_theta.value()
            )
            
            if 'error' in result:
                self.ch6_output.setText(f"Error: {result['error']}")
            else:
                output = f"Radius: {result['radius']}\n"
                output += f"Angle: {result['angle']}°\n"
                output += f"Arc Length: {result['arc_length']} units\n"
                output += f"Sector Area: {result['sector_area']} sq units"
                self.ch6_output.setText(output)
        except Exception as e:
            self.ch6_output.setText(f"Error: {str(e)}")

    def calculate_chord(self):
        try:
            result = self.ch6.chord_length(
                self.ch6_chord_r.value(),
                self.ch6_chord_d.value()
            )
            
            if 'error' in result:
                self.ch6_output.setText(f"Error: {result['error']}")
            else:
                output = f"Radius: {result['radius']}\n"
                output += f"Distance from center: {result['distance']}\n"
                output += f"Half chord: {result['half_chord']} units\n"
                output += f"Chord Length: {result['chord_length']} units"
                self.ch6_output.setText(output)
        except Exception as e:
            self.ch6_output.setText(f"Error: {str(e)}")

    # Slot methods for Chapter 7
    def calculate_great_circle(self):
        try:
            result = self.ch7.calculate_great_circle_distance(
                self.ch7_lat1.value(),
                self.ch7_lat2.value()
            )
            
            if 'error' in result:
                self.ch7_output.setText(f"Error: {result['error']}")
            else:
                output = f"Angular Difference: {result['angle']}\n"
                output += f"Distance: {result['distance_nm']} nm\n"
                output += f"Distance: {result['distance_km']} km"
                self.ch7_output.setText(output)
        except Exception as e:
            self.ch7_output.setText(f"Error: {str(e)}")

    def calculate_small_circle(self):
        try:
            result = self.ch7.calculate_small_circle_distance(
                self.ch7_long1.value(),
                self.ch7_long2.value(),
                self.ch7_lat.value()
            )
            
            if 'error' in result:
                self.ch7_output.setText(f"Error: {result['error']}")
            else:
                output = f"Longitude Difference: {result['longitude_diff']}°\n"
                output += f"Latitude: {result['latitude']}°\n"
                output += f"Distance: {result['distance_nm']} nm\n"
                output += f"Distance: {result['distance_km']} km"
                self.ch7_output.setText(output)
        except Exception as e:
            self.ch7_output.setText(f"Error: {str(e)}")

    # Slot methods for Chapter 8
    def calculate_accounting(self):
        try:
            assets = self.ch8_assets.text()
            liabilities = self.ch8_liabilities.text()
            capital = self.ch8_capital.text()
            
            assets = float(assets) if assets else None
            liabilities = float(liabilities) if liabilities else None
            capital = float(capital) if capital else None
            
            result = self.ch8.basic_accounting_equation(assets, liabilities, capital)
            
            if 'error' in result:
                self.ch8_output.setText(f"Error: {result['error']}")
            else:
                output = f"Assets: {result['assets']}\n"
                output += f"Liabilities: {result['liabilities']}\n"
                output += f"Capital: {result['capital']}\n"
                output += f"\nCalculated: {result['calculated']}"
                self.ch8_output.setText(output)
        except Exception as e:
            self.ch8_output.setText(f"Error: {str(e)}")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    # Simple stylesheet for a cleaner look
    app.setStyleSheet("""
        QWidget { font-family: Arial; font-size: 12pt; }
        QGroupBox { font-weight: bold; margin-top: 8px; }
        QPushButton { background-color: #4CAF50; color: white; padding: 6px; }
        QPushButton:hover { background-color: #45a049; }
        QTextEdit { background: #f8f8f8; }
    """)

    window = MathGUIApp()
    window.show()
    sys.exit(app.exec())
