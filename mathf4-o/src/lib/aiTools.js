/**
 * AI Tools Definition for Form 4 Mathematics
 * Complete coverage of all 8 chapters
 */

export const mathTools = [
  // ============================================================================
  // CHAPTER 1: COORDINATE GEOMETRY
  // ============================================================================
  {
    name: 'calculateGradient',
    description: 'Calculate gradient (slope) of a line through two points',
    parameters: {
      type: 'object',
      properties: {
        x1: { type: 'number', description: 'x-coordinate of first point' },
        y1: { type: 'number', description: 'y-coordinate of first point' },
        x2: { type: 'number', description: 'x-coordinate of second point' },
        y2: { type: 'number', description: 'y-coordinate of second point' }
      },
      required: ['x1', 'y1', 'x2', 'y2']
    }
  },
  {
    name: 'calculateDistance',
    description: 'Calculate distance between two points using distance formula',
    parameters: {
      type: 'object',
      properties: {
        x1: { type: 'number', description: 'x-coordinate of first point' },
        y1: { type: 'number', description: 'y-coordinate of first point' },
        x2: { type: 'number', description: 'x-coordinate of second point' },
        y2: { type: 'number', description: 'y-coordinate of second point' }
      },
      required: ['x1', 'y1', 'x2', 'y2']
    }
  },
  {
    name: 'calculateMidpoint',
    description: 'Find midpoint of a line segment between two points',
    parameters: {
      type: 'object',
      properties: {
        x1: { type: 'number', description: 'x-coordinate of first point' },
        y1: { type: 'number', description: 'y-coordinate of first point' },
        x2: { type: 'number', description: 'x-coordinate of second point' },
        y2: { type: 'number', description: 'y-coordinate of second point' }
      },
      required: ['x1', 'y1', 'x2', 'y2']
    }
  },
  {
    name: 'findLineEquation',
    description: 'Find equation of line through two points in form y = mx + c',
    parameters: {
      type: 'object',
      properties: {
        x1: { type: 'number', description: 'x-coordinate of first point' },
        y1: { type: 'number', description: 'y-coordinate of first point' },
        x2: { type: 'number', description: 'x-coordinate of second point' },
        y2: { type: 'number', description: 'y-coordinate of second point' }
      },
      required: ['x1', 'y1', 'x2', 'y2']
    }
  },
  {
    name: 'analyzeLines',
    description: 'Determine if two lines are parallel, perpendicular, or intersecting',
    parameters: {
      type: 'object',
      properties: {
        m1: { type: 'number', description: 'Gradient of first line' },
        m2: { type: 'number', description: 'Gradient of second line' }
      },
      required: ['m1', 'm2']
    }
  },

  // ============================================================================
  // CHAPTER 2: AREAS AND PERIMETERS
  // ============================================================================
  {
    name: 'triangleAreaSAS',
    description: 'Calculate area of triangle using two sides and included angle (SAS formula)',
    parameters: {
      type: 'object',
      properties: {
        a: { type: 'number', description: 'First side length' },
        b: { type: 'number', description: 'Second side length' },
        angleC: { type: 'number', description: 'Included angle in degrees' }
      },
      required: ['a', 'b', 'angleC']
    }
  },
  {
    name: 'triangleAreaHeron',
    description: 'Calculate area of triangle using Heron\'s formula (three sides)',
    parameters: {
      type: 'object',
      properties: {
        a: { type: 'number', description: 'First side length' },
        b: { type: 'number', description: 'Second side length' },
        c: { type: 'number', description: 'Third side length' }
      },
      required: ['a', 'b', 'c']
    }
  },
  {
    name: 'parallelogramArea',
    description: 'Calculate area of parallelogram',
    parameters: {
      type: 'object',
      properties: {
        base: { type: 'number', description: 'Base length' },
        height: { type: 'number', description: 'Perpendicular height' }
      },
      required: ['base', 'height']
    }
  },
  {
    name: 'rhombusArea',
    description: 'Calculate area of rhombus using diagonals',
    parameters: {
      type: 'object',
      properties: {
        d1: { type: 'number', description: 'First diagonal length' },
        d2: { type: 'number', description: 'Second diagonal length' }
      },
      required: ['d1', 'd2']
    }
  },
  {
    name: 'trapeziumArea',
    description: 'Calculate area of trapezium (trapezoid)',
    parameters: {
      type: 'object',
      properties: {
        a: { type: 'number', description: 'First parallel side' },
        b: { type: 'number', description: 'Second parallel side' },
        height: { type: 'number', description: 'Perpendicular height' }
      },
      required: ['a', 'b', 'height']
    }
  },
  {
    name: 'regularPolygonArea',
    description: 'Calculate area of regular polygon',
    parameters: {
      type: 'object',
      properties: {
        n: { type: 'number', description: 'Number of sides' },
        sideLength: { type: 'number', description: 'Length of each side' }
      },
      required: ['n', 'sideLength']
    }
  },
  {
    name: 'circleArea',
    description: 'Calculate area and circumference of circle',
    parameters: {
      type: 'object',
      properties: {
        radius: { type: 'number', description: 'Radius of circle' }
      },
      required: ['radius']
    }
  },
  {
    name: 'similarPolygonsArea',
    description: 'Calculate area of similar polygon given scale factor',
    parameters: {
      type: 'object',
      properties: {
        originalArea: { type: 'number', description: 'Area of original polygon' },
        scaleFactor: { type: 'number', description: 'Scale factor (ratio of sides)' }
      },
      required: ['originalArea', 'scaleFactor']
    }
  },

  // ============================================================================
  // CHAPTER 3: THREE-DIMENSIONAL FIGURES
  // ============================================================================
  {
    name: 'cylinderStats',
    description: 'Calculate volume and surface area of cylinder',
    parameters: {
      type: 'object',
      properties: {
        radius: { type: 'number', description: 'Base radius' },
        height: { type: 'number', description: 'Height of cylinder' }
      },
      required: ['radius', 'height']
    }
  },
  {
    name: 'coneStats',
    description: 'Calculate volume and surface area of cone',
    parameters: {
      type: 'object',
      properties: {
        radius: { type: 'number', description: 'Base radius' },
        slantHeight: { type: 'number', description: 'Slant height' }
      },
      required: ['radius', 'slantHeight']
    }
  },
  {
    name: 'sphereStats',
    description: 'Calculate volume and surface area of sphere',
    parameters: {
      type: 'object',
      properties: {
        radius: { type: 'number', description: 'Radius of sphere' }
      },
      required: ['radius']
    }
  },
  {
    name: 'pyramidStats',
    description: 'Calculate volume of pyramid',
    parameters: {
      type: 'object',
      properties: {
        baseArea: { type: 'number', description: 'Area of base' },
        height: { type: 'number', description: 'Perpendicular height' }
      },
      required: ['baseArea', 'height']
    }
  },
  {
    name: 'prismStats',
    description: 'Calculate volume of prism',
    parameters: {
      type: 'object',
      properties: {
        baseArea: { type: 'number', description: 'Area of base' },
        height: { type: 'number', description: 'Height of prism' }
      },
      required: ['baseArea', 'height']
    }
  },
  {
    name: 'angleLinePlane',
    description: 'Calculate angle between line and plane in 3D',
    parameters: {
      type: 'object',
      properties: {
        heightOfPoint: { type: 'number', description: 'Vertical height of point' },
        distanceOnPlane: { type: 'number', description: 'Horizontal distance on plane' }
      },
      required: ['heightOfPoint', 'distanceOnPlane']
    }
  },

  // ============================================================================
  // CHAPTER 4: PROBABILITY
  // ============================================================================
  {
    name: 'probabilityEvent',
    description: 'Calculate probability of an event',
    parameters: {
      type: 'object',
      properties: {
        favorable: { type: 'number', description: 'Number of favorable outcomes' },
        total: { type: 'number', description: 'Total number of possible outcomes' }
      },
      required: ['favorable', 'total']
    }
  },
  {
    name: 'mutuallyExclusiveEvents',
    description: 'Calculate probability of mutually exclusive events (A or B)',
    parameters: {
      type: 'object',
      properties: {
        probA: { type: 'number', description: 'Probability of event A' },
        probB: { type: 'number', description: 'Probability of event B' }
      },
      required: ['probA', 'probB']
    }
  },
  {
    name: 'independentEvents',
    description: 'Calculate probability of independent events (A and B)',
    parameters: {
      type: 'object',
      properties: {
        probA: { type: 'number', description: 'Probability of event A' },
        probB: { type: 'number', description: 'Probability of event B' }
      },
      required: ['probA', 'probB']
    }
  },
  {
    name: 'complementProbability',
    description: 'Calculate complement probability (not A)',
    parameters: {
      type: 'object',
      properties: {
        prob: { type: 'number', description: 'Probability of event' }
      },
      required: ['prob']
    }
  },

  // ============================================================================
  // CHAPTER 5: TRIGONOMETRY
  // ============================================================================
  {
    name: 'sineRule',
    description: 'Find unknown side using Sine Rule: a/sin(A) = b/sin(B)',
    parameters: {
      type: 'object',
      properties: {
        angleA: { type: 'number', description: 'Angle A in degrees' },
        sideA: { type: 'number', description: 'Side opposite to angle A' },
        angleB: { type: 'number', description: 'Angle B in degrees' }
      },
      required: ['angleA', 'sideA', 'angleB']
    }
  },
  {
    name: 'cosineRuleSide',
    description: 'Find unknown side using Cosine Rule: a² = b² + c² - 2bc·cos(A)',
    parameters: {
      type: 'object',
      properties: {
        b: { type: 'number', description: 'Side b' },
        c: { type: 'number', description: 'Side c' },
        angleA: { type: 'number', description: 'Included angle A in degrees' }
      },
      required: ['b', 'c', 'angleA']
    }
  },
  {
    name: 'cosineRuleAngle',
    description: 'Find unknown angle using Cosine Rule given three sides',
    parameters: {
      type: 'object',
      properties: {
        a: { type: 'number', description: 'Side opposite to angle A' },
        b: { type: 'number', description: 'Side b' },
        c: { type: 'number', description: 'Side c' }
      },
      required: ['a', 'b', 'c']
    }
  },
  {
    name: 'trigRatios',
    description: 'Calculate sin, cos, tan ratios for right triangle',
    parameters: {
      type: 'object',
      properties: {
        opposite: { type: 'number', description: 'Opposite side' },
        adjacent: { type: 'number', description: 'Adjacent side' },
        hypotenuse: { type: 'number', description: 'Hypotenuse' }
      },
      required: ['opposite', 'adjacent', 'hypotenuse']
    }
  },

  // ============================================================================
  // CHAPTER 6: VECTORS
  // ============================================================================
  {
    name: 'vectorMagnitude',
    description: 'Calculate magnitude (length) of a vector',
    parameters: {
      type: 'object',
      properties: {
        x: { type: 'number', description: 'x-component of vector' },
        y: { type: 'number', description: 'y-component of vector' }
      },
      required: ['x', 'y']
    }
  },
  {
    name: 'vectorDirection',
    description: 'Calculate direction angle and bearing of a vector',
    parameters: {
      type: 'object',
      properties: {
        x: { type: 'number', description: 'x-component of vector' },
        y: { type: 'number', description: 'y-component of vector' }
      },
      required: ['x', 'y']
    }
  },
  {
    name: 'addVectors',
    description: 'Add two vectors',
    parameters: {
      type: 'object',
      properties: {
        x1: { type: 'number', description: 'x-component of first vector' },
        y1: { type: 'number', description: 'y-component of first vector' },
        x2: { type: 'number', description: 'x-component of second vector' },
        y2: { type: 'number', description: 'y-component of second vector' }
      },
      required: ['x1', 'y1', 'x2', 'y2']
    }
  },
  {
    name: 'subtractVectors',
    description: 'Subtract two vectors',
    parameters: {
      type: 'object',
      properties: {
        x1: { type: 'number', description: 'x-component of first vector' },
        y1: { type: 'number', description: 'y-component of first vector' },
        x2: { type: 'number', description: 'x-component of second vector' },
        y2: { type: 'number', description: 'y-component of second vector' }
      },
      required: ['x1', 'y1', 'x2', 'y2']
    }
  },
  {
    name: 'scalarMultiply',
    description: 'Multiply vector by scalar',
    parameters: {
      type: 'object',
      properties: {
        k: { type: 'number', description: 'Scalar multiplier' },
        x: { type: 'number', description: 'x-component of vector' },
        y: { type: 'number', description: 'y-component of vector' }
      },
      required: ['k', 'x', 'y']
    }
  },
  {
    name: 'dotProduct',
    description: 'Calculate dot product of two vectors',
    parameters: {
      type: 'object',
      properties: {
        x1: { type: 'number', description: 'x-component of first vector' },
        y1: { type: 'number', description: 'y-component of first vector' },
        x2: { type: 'number', description: 'x-component of second vector' },
        y2: { type: 'number', description: 'y-component of second vector' }
      },
      required: ['x1', 'y1', 'x2', 'y2']
    }
  },

  // ============================================================================
  // CHAPTER 7: MATRICES AND TRANSFORMATIONS
  // ============================================================================
  {
    name: 'matrixDeterminant',
    description: 'Calculate determinant of 2x2 matrix [[a,b],[c,d]]',
    parameters: {
      type: 'object',
      properties: {
        a: { type: 'number', description: 'Top-left element' },
        b: { type: 'number', description: 'Top-right element' },
        c: { type: 'number', description: 'Bottom-left element' },
        d: { type: 'number', description: 'Bottom-right element' }
      },
      required: ['a', 'b', 'c', 'd']
    }
  },
  {
    name: 'matrixInverse',
    description: 'Calculate inverse of 2x2 matrix',
    parameters: {
      type: 'object',
      properties: {
        a: { type: 'number', description: 'Top-left element' },
        b: { type: 'number', description: 'Top-right element' },
        c: { type: 'number', description: 'Bottom-left element' },
        d: { type: 'number', description: 'Bottom-right element' }
      },
      required: ['a', 'b', 'c', 'd']
    }
  },
  {
    name: 'solveSimultaneousEq',
    description: 'Solve system of two linear equations using matrices',
    parameters: {
      type: 'object',
      properties: {
        a: { type: 'number', description: 'Coefficient of x in equation 1' },
        b: { type: 'number', description: 'Coefficient of y in equation 1' },
        e: { type: 'number', description: 'Constant in equation 1' },
        c: { type: 'number', description: 'Coefficient of x in equation 2' },
        d: { type: 'number', description: 'Coefficient of y in equation 2' },
        f: { type: 'number', description: 'Constant in equation 2' }
      },
      required: ['a', 'b', 'e', 'c', 'd', 'f']
    }
  },
  {
    name: 'transformPoint',
    description: 'Transform a point using a 2x2 transformation matrix',
    parameters: {
      type: 'object',
      properties: {
        a: { type: 'number', description: 'Matrix element [0,0]' },
        b: { type: 'number', description: 'Matrix element [0,1]' },
        c: { type: 'number', description: 'Matrix element [1,0]' },
        d: { type: 'number', description: 'Matrix element [1,1]' },
        x: { type: 'number', description: 'x-coordinate of point' },
        y: { type: 'number', description: 'y-coordinate of point' }
      },
      required: ['a', 'b', 'c', 'd', 'x', 'y']
    }
  },
  {
    name: 'rotationMatrix',
    description: 'Generate rotation matrix for given angle',
    parameters: {
      type: 'object',
      properties: {
        degrees: { type: 'number', description: 'Rotation angle in degrees (counterclockwise)' }
      },
      required: ['degrees']
    }
  },
  {
    name: 'reflectionMatrix',
    description: 'Generate reflection matrix for given axis',
    parameters: {
      type: 'object',
      properties: {
        axis: { type: 'string', description: 'Axis of reflection: "x", "y", or "y=x"' }
      },
      required: ['axis']
    }
  },
  {
    name: 'enlargementMatrix',
    description: 'Generate enlargement (scaling) matrix',
    parameters: {
      type: 'object',
      properties: {
        scaleFactor: { type: 'number', description: 'Scale factor for enlargement' }
      },
      required: ['scaleFactor']
    }
  },

  // ============================================================================
  // CHAPTER 8: LINEAR PROGRAMMING
  // ============================================================================
  {
    name: 'evaluateObjectiveFunction',
    description: 'Evaluate objective function P = ax + by at given point',
    parameters: {
      type: 'object',
      properties: {
        x: { type: 'number', description: 'x-coordinate' },
        y: { type: 'number', description: 'y-coordinate' },
        coeffX: { type: 'number', description: 'Coefficient of x' },
        coeffY: { type: 'number', description: 'Coefficient of y' }
      },
      required: ['x', 'y', 'coeffX', 'coeffY']
    }
  },
  {
    name: 'checkConstraint',
    description: 'Check if a point satisfies a linear constraint',
    parameters: {
      type: 'object',
      properties: {
        x: { type: 'number', description: 'x-coordinate' },
        y: { type: 'number', description: 'y-coordinate' },
        coeffX: { type: 'number', description: 'Coefficient of x' },
        coeffY: { type: 'number', description: 'Coefficient of y' },
        operator: { type: 'string', description: 'Comparison operator: <=, >=, =, <, >' },
        constant: { type: 'number', description: 'Right-hand side constant' }
      },
      required: ['x', 'y', 'coeffX', 'coeffY', 'operator', 'constant']
    }
  }
];
