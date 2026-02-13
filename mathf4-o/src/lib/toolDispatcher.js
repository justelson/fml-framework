/**
 * TOOL DISPATCHER
 * Maps AI tool calls to actual math functions
 */

import * as math from './math.js';

export function dispatchTool(toolName, args) {
  const functionMap = {
    // Chapter 1: Coordinate Geometry
    calculateGradient: () => math.calculateGradient(args.x1, args.y1, args.x2, args.y2),
    calculateDistance: () => math.calculateDistance(args.x1, args.y1, args.x2, args.y2),
    calculateMidpoint: () => math.calculateMidpoint(args.x1, args.y1, args.x2, args.y2),
    analyzeLines: () => math.analyzeLines(args.m1, args.m2),
    findLineEquation: () => math.findLineEquation(args.x1, args.y1, args.x2, args.y2),
    
    // Chapter 2: Areas and Perimeters
    triangleAreaSAS: () => math.triangleAreaSAS(args.a, args.b, args.angleC),
    triangleAreaHeron: () => math.triangleAreaHeron(args.a, args.b, args.c),
    parallelogramArea: () => math.parallelogramArea(args.base, args.height),
    rhombusArea: () => math.rhombusArea(args.d1, args.d2),
    trapeziumArea: () => math.trapeziumArea(args.a, args.b, args.height),
    regularPolygonArea: () => math.regularPolygonArea(args.n, args.sideLength),
    circleArea: () => math.circleArea(args.radius),
    similarPolygonsArea: () => math.similarPolygonsArea(args.originalArea, args.scaleFactor),
    
    // Chapter 3: Three-Dimensional Figures
    cylinderStats: () => math.cylinderStats(args.radius, args.height),
    coneStats: () => math.coneStats(args.radius, args.slantHeight),
    sphereStats: () => math.sphereStats(args.radius),
    pyramidStats: () => math.pyramidStats(args.baseArea, args.height),
    prismStats: () => math.prismStats(args.baseArea, args.height),
    angleLinePlane: () => math.angleLinePlane(args.heightOfPoint, args.distanceOnPlane),
    
    // Chapter 4: Probability
    probabilityEvent: () => math.probabilityEvent(args.favorable, args.total),
    mutuallyExclusiveEvents: () => math.mutuallyExclusiveEvents(args.probA, args.probB),
    independentEvents: () => math.independentEvents(args.probA, args.probB),
    complementProbability: () => math.complementProbability(args.prob),
    
    // Chapter 5: Trigonometry
    sineRule: () => math.sineRule(args.angleA, args.sideA, args.angleB),
    cosineRuleSide: () => math.cosineRuleSide(args.b, args.c, args.angleA),
    cosineRuleAngle: () => math.cosineRuleAngle(args.a, args.b, args.c),
    trigRatios: () => math.trigRatios(args.opposite, args.adjacent, args.hypotenuse),
    
    // Chapter 6: Vectors
    vectorMagnitude: () => math.vectorMagnitude(args.x, args.y),
    vectorDirection: () => math.vectorDirection(args.x, args.y),
    addVectors: () => math.addVectors(args.x1, args.y1, args.x2, args.y2),
    subtractVectors: () => math.subtractVectors(args.x1, args.y1, args.x2, args.y2),
    scalarMultiply: () => math.scalarMultiply(args.k, args.x, args.y),
    dotProduct: () => math.dotProduct(args.x1, args.y1, args.x2, args.y2),
    
    // Chapter 7: Matrices and Transformations
    matrixDeterminant: () => math.matrixDeterminant(args.a, args.b, args.c, args.d),
    matrixInverse: () => math.matrixInverse(args.a, args.b, args.c, args.d),
    solveSimultaneousEq: () => math.solveSimultaneousEq(args.a, args.b, args.e, args.c, args.d, args.f),
    transformPoint: () => math.transformPoint(args.a, args.b, args.c, args.d, args.x, args.y),
    rotationMatrix: () => math.rotationMatrix(args.degrees),
    reflectionMatrix: () => math.reflectionMatrix(args.axis),
    enlargementMatrix: () => math.enlargementMatrix(args.scaleFactor),
    
    // Chapter 8: Linear Programming
    evaluateObjectiveFunction: () => math.evaluateObjectiveFunction(args.x, args.y, args.coeffX, args.coeffY),
    checkConstraint: () => math.checkConstraint(args.x, args.y, args.coeffX, args.coeffY, args.operator, args.constant),
  };

  const func = functionMap[toolName];
  if (!func) {
    throw new Error(`Unknown tool: ${toolName}`);
  }

  return func();
}
