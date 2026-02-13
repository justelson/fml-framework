/**
 * AI TOOL DEFINITIONS FOR FORM 4 MATHEMATICS
 * These tools are exposed to the Groq AI assistant
 */

export const mathTools = [
  // CHAPTER 1: COORDINATE GEOMETRY
  {
    type: "function",
    function: {
      name: "calculateGradient",
      description: "Calculate the gradient (slope) of a line passing through two points. Returns 'undefined' for vertical lines.",
      parameters: {
        type: "object",
        properties: {
          x1: { type: "number", description: "x-coordinate of first point" },
          y1: { type: "number", description: "y-coordinate of first point" },
          x2: { type: "number", description: "x-coordinate of second point" },
          y2: { type: "number", description: "y-coordinate of second point" }
        },
        required: ["x1", "y1", "x2", "y2"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "calculateDistance",
      description: "Calculate the distance between two points using the distance formula.",
      parameters: {
        type: "object",
        properties: {
          x1: { type: "number", description: "x-coordinate of first point" },
          y1: { type: "number", description: "y-coordinate of first point" },
          x2: { type: "number", description: "x-coordinate of second point" },
          y2: { type: "number", description: "y-coordinate of second point" }
        },
        required: ["x1", "y1", "x2", "y2"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "calculateMidpoint",
      description: "Calculate the midpoint of a line segment between two points.",
      parameters: {
        type: "object",
        properties: {
          x1: { type: "number", description: "x-coordinate of first point" },
          y1: { type: "number", description: "y-coordinate of first point" },
          x2: { type: "number", description: "x-coordinate of second point" },
          y2: { type: "number", description: "y-coordinate of second point" }
        },
        required: ["x1", "y1", "x2", "y2"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "analyzeLines",
      description: "Determine if two lines are parallel, perpendicular, or neither based on their gradients.",
      parameters: {
        type: "object",
        properties: {
          m1: { type: "number", description: "Gradient of first line" },
          m2: { type: "number", description: "Gradient of second line" }
        },
        required: ["m1", "m2"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "findLineEquation",
      description: "Find the equation of a line in the form y = mx + c given two points.",
      parameters: {
        type: "object",
        properties: {
          x1: { type: "number", description: "x-coordinate of first point" },
          y1: { type: "number", description: "y-coordinate of first point" },
          x2: { type: "number", description: "x-coordinate of second point" },
          y2: { type: "number", description: "y-coordinate of second point" }
        },
        required: ["x1", "y1", "x2", "y2"]
      }
    }
  },

  // CHAPTER 2: AREAS AND PERIMETERS
  {
    type: "function",
    function: {
      name: "triangleAreaSAS",
      description: "Calculate triangle area using two sides and the included angle (SAS formula: ½ab sin C).",
      parameters: {
        type: "object",
        properties: {
          a: { type: "number", description: "Length of first side" },
          b: { type: "number", description: "Length of second side" },
          angleC: { type: "number", description: "Angle between the sides in degrees" }
        },
        required: ["a", "b", "angleC"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "triangleAreaHeron",
      description: "Calculate triangle area using Heron's formula when all three sides are known.",
      parameters: {
        type: "object",
        properties: {
          a: { type: "number", description: "Length of first side" },
          b: { type: "number", description: "Length of second side" },
          c: { type: "number", description: "Length of third side" }
        },
        required: ["a", "b", "c"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "parallelogramArea",
      description: "Calculate the area of a parallelogram using base and height.",
      parameters: {
        type: "object",
        properties: {
          base: { type: "number", description: "Length of the base" },
          height: { type: "number", description: "Perpendicular height" }
        },
        required: ["base", "height"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "rhombusArea",
      description: "Calculate the area of a rhombus using its diagonals.",
      parameters: {
        type: "object",
        properties: {
          d1: { type: "number", description: "Length of first diagonal" },
          d2: { type: "number", description: "Length of second diagonal" }
        },
        required: ["d1", "d2"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "trapeziumArea",
      description: "Calculate the area of a trapezium using parallel sides and height.",
      parameters: {
        type: "object",
        properties: {
          a: { type: "number", description: "Length of first parallel side" },
          b: { type: "number", description: "Length of second parallel side" },
          height: { type: "number", description: "Perpendicular height between parallel sides" }
        },
        required: ["a", "b", "height"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "regularPolygonArea",
      description: "Calculate the area of a regular polygon given number of sides and side length.",
      parameters: {
        type: "object",
        properties: {
          n: { type: "number", description: "Number of sides" },
          sideLength: { type: "number", description: "Length of each side" }
        },
        required: ["n", "sideLength"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "circleArea",
      description: "Calculate the area and circumference of a circle given its radius.",
      parameters: {
        type: "object",
        properties: {
          radius: { type: "number", description: "Radius of the circle" }
        },
        required: ["radius"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "similarPolygonsArea",
      description: "Calculate the area of a similar polygon given the original area and scale factor.",
      parameters: {
        type: "object",
        properties: {
          originalArea: { type: "number", description: "Area of the original polygon" },
          scaleFactor: { type: "number", description: "Scale factor (k)" }
        },
        required: ["originalArea", "scaleFactor"]
      }
    }
  },

  // CHAPTER 3: THREE-DIMENSIONAL FIGURES
  {
    type: "function",
    function: {
      name: "cylinderStats",
      description: "Calculate volume and surface area of a cylinder.",
      parameters: {
        type: "object",
        properties: {
          radius: { type: "number", description: "Radius of the cylinder base" },
          height: { type: "number", description: "Height of the cylinder" }
        },
        required: ["radius", "height"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "coneStats",
      description: "Calculate volume, height, and surface area of a cone given radius and slant height.",
      parameters: {
        type: "object",
        properties: {
          radius: { type: "number", description: "Radius of the cone base" },
          slantHeight: { type: "number", description: "Slant height of the cone" }
        },
        required: ["radius", "slantHeight"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "sphereStats",
      description: "Calculate volume and surface area of a sphere.",
      parameters: {
        type: "object",
        properties: {
          radius: { type: "number", description: "Radius of the sphere" }
        },
        required: ["radius"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "pyramidStats",
      description: "Calculate the volume of a pyramid given base area and height.",
      parameters: {
        type: "object",
        properties: {
          baseArea: { type: "number", description: "Area of the pyramid base" },
          height: { type: "number", description: "Perpendicular height of the pyramid" }
        },
        required: ["baseArea", "height"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "prismStats",
      description: "Calculate the volume of a prism given base area and height.",
      parameters: {
        type: "object",
        properties: {
          baseArea: { type: "number", description: "Area of the prism base" },
          height: { type: "number", description: "Height of the prism" }
        },
        required: ["baseArea", "height"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "angleLinePlane",
      description: "Calculate the angle between a line and a plane in 3D geometry.",
      parameters: {
        type: "object",
        properties: {
          heightOfPoint: { type: "number", description: "Vertical height of the point above the plane" },
          distanceOnPlane: { type: "number", description: "Horizontal distance on the plane" }
        },
        required: ["heightOfPoint", "distanceOnPlane"]
      }
    }
  },

  // CHAPTER 4: PROBABILITY
  {
    type: "function",
    function: {
      name: "probabilityEvent",
      description: "Calculate the probability of an event: P(E) = favorable outcomes / total outcomes.",
      parameters: {
        type: "object",
        properties: {
          favorable: { type: "number", description: "Number of favorable outcomes" },
          total: { type: "number", description: "Total number of possible outcomes" }
        },
        required: ["favorable", "total"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "mutuallyExclusiveEvents",
      description: "Calculate P(A or B) for mutually exclusive events: P(A) + P(B).",
      parameters: {
        type: "object",
        properties: {
          probA: { type: "number", description: "Probability of event A" },
          probB: { type: "number", description: "Probability of event B" }
        },
        required: ["probA", "probB"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "independentEvents",
      description: "Calculate P(A and B) for independent events: P(A) × P(B).",
      parameters: {
        type: "object",
        properties: {
          probA: { type: "number", description: "Probability of event A" },
          probB: { type: "number", description: "Probability of event B" }
        },
        required: ["probA", "probB"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "complementProbability",
      description: "Calculate the complement of a probability: P(A') = 1 - P(A).",
      parameters: {
        type: "object",
        properties: {
          prob: { type: "number", description: "Probability of the event" }
        },
        required: ["prob"]
      }
    }
  },

  // CHAPTER 5: TRIGONOMETRY
  {
    type: "function",
    function: {
      name: "sineRule",
      description: "Use the sine rule to find an unknown side: a/sin(A) = b/sin(B).",
      parameters: {
        type: "object",
        properties: {
          angleA: { type: "number", description: "Angle A in degrees" },
          sideA: { type: "number", description: "Side opposite to angle A" },
          angleB: { type: "number", description: "Angle B in degrees" }
        },
        required: ["angleA", "sideA", "angleB"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "cosineRuleSide",
      description: "Use the cosine rule to find an unknown side: a² = b² + c² - 2bc cos(A).",
      parameters: {
        type: "object",
        properties: {
          b: { type: "number", description: "Length of side b" },
          c: { type: "number", description: "Length of side c" },
          angleA: { type: "number", description: "Angle A (opposite to side a) in degrees" }
        },
        required: ["b", "c", "angleA"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "cosineRuleAngle",
      description: "Use the cosine rule to find an unknown angle: cos(A) = (b²+c²-a²)/2bc.",
      parameters: {
        type: "object",
        properties: {
          a: { type: "number", description: "Length of side a" },
          b: { type: "number", description: "Length of side b" },
          c: { type: "number", description: "Length of side c" }
        },
        required: ["a", "b", "c"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "trigRatios",
      description: "Calculate sine, cosine, and tangent ratios for a right-angled triangle.",
      parameters: {
        type: "object",
        properties: {
          opposite: { type: "number", description: "Length of opposite side" },
          adjacent: { type: "number", description: "Length of adjacent side" },
          hypotenuse: { type: "number", description: "Length of hypotenuse" }
        },
        required: ["opposite", "adjacent", "hypotenuse"]
      }
    }
  },

  // CHAPTER 6: VECTORS
  {
    type: "function",
    function: {
      name: "vectorMagnitude",
      description: "Calculate the magnitude (length) of a vector.",
      parameters: {
        type: "object",
        properties: {
          x: { type: "number", description: "x-component of the vector" },
          y: { type: "number", description: "y-component of the vector" }
        },
        required: ["x", "y"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "vectorDirection",
      description: "Calculate the direction (angle) of a vector.",
      parameters: {
        type: "object",
        properties: {
          x: { type: "number", description: "x-component of the vector" },
          y: { type: "number", description: "y-component of the vector" }
        },
        required: ["x", "y"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "addVectors",
      description: "Add two vectors component-wise.",
      parameters: {
        type: "object",
        properties: {
          x1: { type: "number", description: "x-component of first vector" },
          y1: { type: "number", description: "y-component of first vector" },
          x2: { type: "number", description: "x-component of second vector" },
          y2: { type: "number", description: "y-component of second vector" }
        },
        required: ["x1", "y1", "x2", "y2"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "subtractVectors",
      description: "Subtract one vector from another component-wise.",
      parameters: {
        type: "object",
        properties: {
          x1: { type: "number", description: "x-component of first vector" },
          y1: { type: "number", description: "y-component of first vector" },
          x2: { type: "number", description: "x-component of second vector" },
          y2: { type: "number", description: "y-component of second vector" }
        },
        required: ["x1", "y1", "x2", "y2"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "scalarMultiply",
      description: "Multiply a vector by a scalar value.",
      parameters: {
        type: "object",
        properties: {
          k: { type: "number", description: "Scalar multiplier" },
          x: { type: "number", description: "x-component of the vector" },
          y: { type: "number", description: "y-component of the vector" }
        },
        required: ["k", "x", "y"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "dotProduct",
      description: "Calculate the dot product of two vectors.",
      parameters: {
        type: "object",
        properties: {
          x1: { type: "number", description: "x-component of first vector" },
          y1: { type: "number", description: "y-component of first vector" },
          x2: { type: "number", description: "x-component of second vector" },
          y2: { type: "number", description: "y-component of second vector" }
        },
        required: ["x1", "y1", "x2", "y2"]
      }
    }
  },

  // CHAPTER 7: MATRICES AND TRANSFORMATIONS
  {
    type: "function",
    function: {
      name: "matrixDeterminant",
      description: "Calculate the determinant of a 2×2 matrix.",
      parameters: {
        type: "object",
        properties: {
          a: { type: "number", description: "Element at position (1,1)" },
          b: { type: "number", description: "Element at position (1,2)" },
          c: { type: "number", description: "Element at position (2,1)" },
          d: { type: "number", description: "Element at position (2,2)" }
        },
        required: ["a", "b", "c", "d"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "matrixInverse",
      description: "Calculate the inverse of a 2×2 matrix.",
      parameters: {
        type: "object",
        properties: {
          a: { type: "number", description: "Element at position (1,1)" },
          b: { type: "number", description: "Element at position (1,2)" },
          c: { type: "number", description: "Element at position (2,1)" },
          d: { type: "number", description: "Element at position (2,2)" }
        },
        required: ["a", "b", "c", "d"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "solveSimultaneousEq",
      description: "Solve simultaneous equations using Cramer's rule: ax + by = e, cx + dy = f.",
      parameters: {
        type: "object",
        properties: {
          a: { type: "number", description: "Coefficient of x in first equation" },
          b: { type: "number", description: "Coefficient of y in first equation" },
          e: { type: "number", description: "Constant in first equation" },
          c: { type: "number", description: "Coefficient of x in second equation" },
          d: { type: "number", description: "Coefficient of y in second equation" },
          f: { type: "number", description: "Constant in second equation" }
        },
        required: ["a", "b", "e", "c", "d", "f"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "transformPoint",
      description: "Apply a transformation matrix to a point.",
      parameters: {
        type: "object",
        properties: {
          a: { type: "number", description: "Matrix element (1,1)" },
          b: { type: "number", description: "Matrix element (1,2)" },
          c: { type: "number", description: "Matrix element (2,1)" },
          d: { type: "number", description: "Matrix element (2,2)" },
          x: { type: "number", description: "x-coordinate of point" },
          y: { type: "number", description: "y-coordinate of point" }
        },
        required: ["a", "b", "c", "d", "x", "y"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "rotationMatrix",
      description: "Generate a rotation transformation matrix for a given angle.",
      parameters: {
        type: "object",
        properties: {
          degrees: { type: "number", description: "Angle of rotation in degrees" }
        },
        required: ["degrees"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "reflectionMatrix",
      description: "Generate a reflection transformation matrix for a given axis.",
      parameters: {
        type: "object",
        properties: {
          axis: { type: "string", description: "Axis of reflection: 'x', 'y', or 'y=x'" }
        },
        required: ["axis"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "enlargementMatrix",
      description: "Generate an enlargement transformation matrix for a given scale factor.",
      parameters: {
        type: "object",
        properties: {
          scaleFactor: { type: "number", description: "Scale factor for enlargement" }
        },
        required: ["scaleFactor"]
      }
    }
  },

  // CHAPTER 8: LINEAR PROGRAMMING
  {
    type: "function",
    function: {
      name: "evaluateObjectiveFunction",
      description: "Evaluate an objective function P = ax + by at a given point.",
      parameters: {
        type: "object",
        properties: {
          x: { type: "number", description: "x-coordinate of the point" },
          y: { type: "number", description: "y-coordinate of the point" },
          coeffX: { type: "number", description: "Coefficient of x in objective function" },
          coeffY: { type: "number", description: "Coefficient of y in objective function" }
        },
        required: ["x", "y", "coeffX", "coeffY"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "checkConstraint",
      description: "Check if a point satisfies a linear constraint.",
      parameters: {
        type: "object",
        properties: {
          x: { type: "number", description: "x-coordinate of the point" },
          y: { type: "number", description: "y-coordinate of the point" },
          coeffX: { type: "number", description: "Coefficient of x in constraint" },
          coeffY: { type: "number", description: "Coefficient of y in constraint" },
          operator: { type: "string", description: "Comparison operator: '<=', '>=', '=', '<', '>'" },
          constant: { type: "number", description: "Right-hand side constant" }
        },
        required: ["x", "y", "coeffX", "coeffY", "operator", "constant"]
      }
    }
  }
];
