/**
 * Form 4 Math Formulas - Ported from FML Framework
 */

// --- Algebra ---
export function solveLinear(m, x, c) {
  return { y: m * x + c };
}

export function solveQuadraticRoots(a, b, c) {
  const discriminant = b ** 2 - 4 * a * c;
  if (discriminant < 0) {
    return { roots: [], discriminant, type: "no_real_roots" };
  } else if (discriminant === 0) {
    const root = -b / (2 * a);
    return { roots: [root], discriminant, type: "one_root" };
  } else {
    const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return { roots: [root1, root2], discriminant, type: "two_roots" };
  }
}

// --- Geometry: Coordinate ---
export function calculateGradient(x1, y1, x2, y2) {
  if (x2 === x1) return { gradient: null, isVertical: true };
  return { gradient: (y2 - y1) / (x2 - x1), isVertical: false };
}

export function calculateDistance(x1, y1, x2, y2) {
  return { distance: Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) };
}

export function calculateMidpoint(x1, y1, x2, y2) {
  return { x: (x1 + x2) / 2, y: (y1 + y2) / 2 };
}

export function findLineEquation(x1, y1, x2, y2) {
  if (x2 === x1) return { equation: `x = ${x1}`, m: null, c: null };
  const m = (y2 - y1) / (x2 - x1);
  const c = y1 - m * x1;
  const cSign = c >= 0 ? '+' : '-';
  return { equation: `y = ${m.toFixed(2)}x ${cSign} ${Math.abs(c).toFixed(2)}`, m, c };
}

export function analyzeLines(m1, m2) {
  const product = m1 * m2;
  if (m1 === m2) return { relationship: 'Parallel', explanation: 'Gradients are equal.' };
  if (Math.abs(product + 1) < 0.0001) return { relationship: 'Perpendicular', explanation: 'Product of gradients is -1.' };
  return { relationship: 'Intersecting', explanation: 'They meet at a single point.' };
}

// --- Geometry: Basic Areas ---
export function calculateTriangleArea(base, height) {
  return { area: 0.5 * base * height };
}

export function calculateRectangleProperties(length, width) {
  return {
    area: length * width,
    perimeter: 2 * (length + width)
  };
}

// --- Geometry: Circles & 3D ---
export function calculateCircleProperties(radius) {
  return {
    area: Math.PI * radius ** 2,
    circumference: 2 * Math.PI * radius,
  };
}

export function calculateConeProperties(radius, height) {
  const slantHeight = Math.sqrt(radius ** 2 + height ** 2);
  const baseArea = Math.PI * radius ** 2;
  const lateralArea = Math.PI * radius * slantHeight;
  return {
    surfaceArea: baseArea + lateralArea,
    volume: (1 / 3) * baseArea * height,
    slantHeight
  };
}

export function calculatePyramidProperties(baseArea, perimeter, height, slantHeight) {
  const lateralArea = 0.5 * perimeter * slantHeight;
  return {
    surfaceArea: baseArea + lateralArea,
    volume: (1 / 3) * baseArea * height
  };
}

export function calculateSphereProperties(radius) {
  return {
    surfaceArea: 4 * Math.PI * radius ** 2,
    volume: (4 / 3) * Math.PI * radius ** 3
  };
}

export function calculateCylinderProperties(radius, height) {
  const baseArea = Math.PI * radius ** 2;
  const lateralArea = 2 * Math.PI * radius * height;
  return {
    surfaceArea: 2 * baseArea + lateralArea,
    volume: baseArea * height
  };
}

// --- Trigonometry ---
export function calculateSineRuleSide(a, A_degrees, B_degrees) {
  const toRad = deg => deg * Math.PI / 180;
  const b = (a * Math.sin(toRad(B_degrees))) / Math.sin(toRad(A_degrees));
  return { side_b: b };
}

export function calculateCosineRuleSide(b, c, A_degrees) {
  const toRad = deg => deg * Math.PI / 180;
  const aSquared = b ** 2 + c ** 2 - 2 * b * c * Math.cos(toRad(A_degrees));
  return { side_a: Math.sqrt(Math.max(0, aSquared)) };
}

export function calculateCosineRuleAngle(a, b, c) {
  const cosA = (b ** 2 + c ** 2 - a ** 2) / (2 * b * c);
  if (cosA < -1 || cosA > 1) return { error: "Impossible values" };
  const A_rad = Math.acos(cosA);
  return { angle_A: A_rad * 180 / Math.PI };
}

// --- Vectors ---
export function calculateVectorMagnitude(x, y) {
  return { magnitude: Math.sqrt(x ** 2 + y ** 2) };
}

export function addVectors(x1, y1, x2, y2) {
  return { x: x1 + x2, y: y1 + y2 };
}

export function calculateDotProduct(x1, y1, x2, y2) {
  return { dotProduct: x1 * x2 + y1 * y2 };
}

// --- Matrices ---
export function calculateDeterminant2x2(a, b, c, d) {
  return { determinant: a * d - b * c };
}

export function calculateInverse2x2(a, b, c, d) {
  const det = a * d - b * c;
  if (det === 0) return { error: "Singular matrix" };
  const inv = 1 / det;
  return {
    a: d * inv, b: -b * inv,
    c: -c * inv, d: a * inv,
    determinant: det
  };
}

export function solveSimultaneousCramer(a1, b1, c1, a2, b2, c2) {
  const D = a1 * b2 - a2 * b1;
  if (D === 0) return { error: "No unique solution" };
  const Dx = c1 * b2 - c2 * b1;
  const Dy = a1 * c2 - a2 * c1;
  return { x: Dx / D, y: Dy / D, D, Dx, Dy };
}

// --- Probability ---
export function calculateProbability(success, total) {
  if (total === 0) return { error: "Total cannot be 0" };
  return { probability: success / total };
}


// ============================================================================
// FORM 4 SPECIFIC FUNCTIONS
// ============================================================================

// Chapter 2: Areas and Perimeters
export function triangleAreaSAS(a, b, angleC) {
  const radC = (angleC * Math.PI) / 180;
  const area = 0.5 * a * b * Math.sin(radC);
  return { area, formula: '½ab sin(C)', a, b, angleC };
}

export function triangleAreaHeron(a, b, c) {
  const s = (a + b + c) / 2;
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
  return { area, semiPerimeter: s, formula: "√[s(s-a)(s-b)(s-c)]" };
}

export function parallelogramArea(base, height) {
  const area = base * height;
  return { area, base, height, formula: 'base × height' };
}

export function rhombusArea(d1, d2) {
  const area = 0.5 * d1 * d2;
  return { area, diagonal1: d1, diagonal2: d2, formula: '½d₁d₂' };
}

export function trapeziumArea(a, b, height) {
  const area = 0.5 * (a + b) * height;
  return { area, parallelSide1: a, parallelSide2: b, height, formula: '½(a+b)h' };
}

export function regularPolygonArea(n, sideLength) {
  if (n < 3) return { error: 'Polygon must have at least 3 sides' };
  const numerator = n * Math.pow(sideLength, 2);
  const denominator = 4 * Math.tan(Math.PI / n);
  const area = numerator / denominator;
  return { area, sides: n, sideLength, formula: 'ns²/[4tan(π/n)]' };
}

export function circleArea(radius) {
  const area = Math.PI * Math.pow(radius, 2);
  const circumference = 2 * Math.PI * radius;
  return { area, circumference, radius, formula: 'πr²' };
}

export function similarPolygonsArea(originalArea, scaleFactor) {
  const newArea = originalArea * Math.pow(scaleFactor, 2);
  return { originalArea, newArea, scaleFactor, areaRatio: Math.pow(scaleFactor, 2) };
}

// Chapter 3: Three-Dimensional Figures
export function cylinderStats(radius, height) {
  const volume = Math.PI * Math.pow(radius, 2) * height;
  const curvedSA = 2 * Math.PI * radius * height;
  const totalSA = curvedSA + (2 * Math.PI * Math.pow(radius, 2));
  return { volume, curvedSurfaceArea: curvedSA, totalSurfaceArea: totalSA, radius, height };
}

export function coneStats(radius, slantHeight) {
  const height = Math.sqrt(Math.pow(slantHeight, 2) - Math.pow(radius, 2));
  const volume = (1/3) * Math.PI * Math.pow(radius, 2) * height;
  const curvedSA = Math.PI * radius * slantHeight;
  const totalSA = curvedSA + (Math.PI * Math.pow(radius, 2));
  return { volume, height, curvedSurfaceArea: curvedSA, totalSurfaceArea: totalSA, radius, slantHeight };
}

export function sphereStats(radius) {
  const volume = (4/3) * Math.PI * Math.pow(radius, 3);
  const surfaceArea = 4 * Math.PI * Math.pow(radius, 2);
  return { volume, surfaceArea, radius };
}

export function pyramidStats(baseArea, height) {
  const volume = (1/3) * baseArea * height;
  return { volume, baseArea, height, formula: '⅓ × base area × height' };
}

export function prismStats(baseArea, height) {
  const volume = baseArea * height;
  return { volume, baseArea, height, formula: 'base area × height' };
}

export function angleLinePlane(heightOfPoint, distanceOnPlane) {
  const angleRad = Math.atan(heightOfPoint / distanceOnPlane);
  const angleDeg = (angleRad * 180) / Math.PI;
  return { angle: angleDeg, heightOfPoint, distanceOnPlane, formula: 'tan(θ) = height/distance' };
}

// Chapter 4: Probability
export function probabilityEvent(favorable, total) {
  if (total === 0) return { error: 'Total outcomes cannot be zero' };
  const probability = favorable / total;
  return { probability, favorable, total, percentage: (probability * 100).toFixed(2) + '%' };
}

export function mutuallyExclusiveEvents(probA, probB) {
  const probAorB = probA + probB;
  return { probability: probAorB, probA, probB, formula: 'P(A or B) = P(A) + P(B)' };
}

export function independentEvents(probA, probB) {
  const probAandB = probA * probB;
  return { probability: probAandB, probA, probB, formula: 'P(A and B) = P(A) × P(B)' };
}

export function complementProbability(prob) {
  const complement = 1 - prob;
  return { complement, original: prob, formula: "P(A') = 1 - P(A)" };
}

// Chapter 5: Trigonometry
export function sineRule(angleA, sideA, angleB) {
  const radA = (angleA * Math.PI) / 180;
  const radB = (angleB * Math.PI) / 180;
  const sideB = (sideA * Math.sin(radB)) / Math.sin(radA);
  return { sideB, angleA, sideA, angleB, formula: 'a/sin(A) = b/sin(B)' };
}

export function cosineRuleSide(b, c, angleA) {
  const radA = (angleA * Math.PI) / 180;
  const a2 = Math.pow(b, 2) + Math.pow(c, 2) - (2 * b * c * Math.cos(radA));
  const a = Math.sqrt(a2);
  return { sideA: a, sideB: b, sideC: c, angleA, formula: 'a² = b² + c² - 2bc cos(A)' };
}

export function cosineRuleAngle(a, b, c) {
  const cosA = (Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c);
  const angleA = (Math.acos(cosA) * 180) / Math.PI;
  return { angleA, sideA: a, sideB: b, sideC: c, formula: 'cos(A) = (b²+c²-a²)/2bc' };
}

export function trigRatios(opposite, adjacent, hypotenuse) {
  const sine = opposite / hypotenuse;
  const cosine = adjacent / hypotenuse;
  const tangent = opposite / adjacent;
  return { sin: sine, cos: cosine, tan: tangent, opposite, adjacent, hypotenuse };
}

// Chapter 6: Vectors
export function vectorMagnitude(x, y) {
  const magnitude = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  return { magnitude, x, y, formula: '√(x² + y²)' };
}

export function vectorDirection(x, y) {
  const angleRad = Math.atan2(y, x);
  const angleDeg = (angleRad * 180) / Math.PI;
  const bearing = (90 - angleDeg + 360) % 360;
  return { angle: angleDeg, bearing, x, y, formula: 'θ = tan⁻¹(y/x)' };
}

export function subtractVectors(x1, y1, x2, y2) {
  const resultX = x1 - x2;
  const resultY = y1 - y2;
  const magnitude = Math.sqrt(Math.pow(resultX, 2) + Math.pow(resultY, 2));
  return { x: resultX, y: resultY, magnitude };
}

export function scalarMultiply(k, x, y) {
  const resultX = k * x;
  const resultY = k * y;
  const magnitude = Math.sqrt(Math.pow(resultX, 2) + Math.pow(resultY, 2));
  return { x: resultX, y: resultY, magnitude, scalar: k };
}

export function dotProduct(x1, y1, x2, y2) {
  const product = (x1 * x2) + (y1 * y2);
  return { dotProduct: product, formula: 'u·v = x₁x₂ + y₁y₂' };
}

// Chapter 7: Matrices and Transformations
export function matrixDeterminant(a, b, c, d) {
  const det = (a * d) - (b * c);
  return { determinant: det, matrix: [[a, b], [c, d]], formula: 'ad - bc' };
}

export function matrixInverse(a, b, c, d) {
  const det = (a * d) - (b * c);
  if (Math.abs(det) < 0.0001) {
    return { error: 'Matrix is singular (determinant = 0)', determinant: det };
  }
  const invA = d / det;
  const invB = -b / det;
  const invC = -c / det;
  const invD = a / det;
  return { inverse: [[invA, invB], [invC, invD]], determinant: det, original: [[a, b], [c, d]] };
}

export function solveSimultaneousEq(a, b, e, c, d, f) {
  const det = (a * d) - (b * c);
  if (Math.abs(det) < 0.0001) {
    return { error: 'No unique solution (determinant = 0)' };
  }
  const x = ((e * d) - (b * f)) / det;
  const y = ((a * f) - (e * c)) / det;
  return { x, y, equation1: `${a}x + ${b}y = ${e}`, equation2: `${c}x + ${d}y = ${f}` };
}

export function transformPoint(a, b, c, d, x, y) {
  const newX = (a * x) + (b * y);
  const newY = (c * x) + (d * y);
  return { original: { x, y }, transformed: { x: newX, y: newY }, matrix: [[a, b], [c, d]] };
}

export function rotationMatrix(degrees) {
  const rad = (degrees * Math.PI) / 180;
  const a = Math.cos(rad);
  const b = -Math.sin(rad);
  const c = Math.sin(rad);
  const d = Math.cos(rad);
  return { matrix: [[a, b], [c, d]], degrees, type: 'Rotation' };
}

export function reflectionMatrix(axis) {
  let matrix;
  if (axis === 'x') {
    matrix = [[1, 0], [0, -1]];
  } else if (axis === 'y') {
    matrix = [[-1, 0], [0, 1]];
  } else if (axis === 'y=x') {
    matrix = [[0, 1], [1, 0]];
  } else {
    return { error: 'Invalid axis. Use "x", "y", or "y=x"' };
  }
  return { matrix, axis, type: 'Reflection' };
}

export function enlargementMatrix(scaleFactor) {
  const matrix = [[scaleFactor, 0], [0, scaleFactor]];
  return { matrix, scaleFactor, type: 'Enlargement' };
}

// Chapter 8: Linear Programming
export function evaluateObjectiveFunction(x, y, coeffX, coeffY) {
  const value = (coeffX * x) + (coeffY * y);
  return { value, x, y, function: `P = ${coeffX}x + ${coeffY}y` };
}

export function checkConstraint(x, y, coeffX, coeffY, operator, constant) {
  const leftSide = (coeffX * x) + (coeffY * y);
  let satisfied = false;
  switch(operator) {
    case '<=': satisfied = leftSide <= constant; break;
    case '>=': satisfied = leftSide >= constant; break;
    case '=': satisfied = Math.abs(leftSide - constant) < 0.0001; break;
    case '<': satisfied = leftSide < constant; break;
    case '>': satisfied = leftSide > constant; break;
  }
  return { satisfied, leftSide, constraint: `${coeffX}x + ${coeffY}y ${operator} ${constant}` };
}
