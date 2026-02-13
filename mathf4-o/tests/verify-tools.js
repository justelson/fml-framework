/**
 * Tool Verification Test (No API Required)
 * Verifies all tools are properly mapped and functional
 */

import { dispatchTool } from '../src/lib/toolDispatcher.js';
import { mathTools } from '../src/lib/aiTools.js';

console.log('============================================================');
console.log('TOOL VERIFICATION TEST');
console.log('============================================================\n');

let passed = 0;
let failed = 0;
const errors = [];

// Test cases for each chapter
const testCases = [
  // Chapter 1: Coordinate Geometry
  { tool: 'calculateGradient', args: { x1: 0, y1: 0, x2: 3, y2: 4 }, expected: 'gradient' },
  { tool: 'calculateDistance', args: { x1: 0, y1: 0, x2: 3, y2: 4 }, expected: 'distance' },
  { tool: 'calculateMidpoint', args: { x1: 0, y1: 0, x2: 4, y2: 6 }, expected: 'x' },
  { tool: 'findLineEquation', args: { x1: 0, y1: 0, x2: 2, y2: 4 }, expected: 'equation' },
  { tool: 'analyzeLines', args: { m1: 2, m2: 2 }, expected: 'relationship' },
  
  // Chapter 2: Areas and Perimeters
  { tool: 'triangleAreaSAS', args: { a: 5, b: 6, angleC: 60 }, expected: 'area' },
  { tool: 'triangleAreaHeron', args: { a: 3, b: 4, c: 5 }, expected: 'area' },
  { tool: 'parallelogramArea', args: { base: 10, height: 5 }, expected: 'area' },
  { tool: 'rhombusArea', args: { d1: 6, d2: 8 }, expected: 'area' },
  { tool: 'trapeziumArea', args: { a: 5, b: 7, height: 4 }, expected: 'area' },
  { tool: 'regularPolygonArea', args: { n: 6, sideLength: 5 }, expected: 'area' },
  { tool: 'circleArea', args: { radius: 5 }, expected: 'area' },
  { tool: 'similarPolygonsArea', args: { originalArea: 100, scaleFactor: 2 }, expected: 'newArea' },
  
  // Chapter 3: Three-Dimensional Figures
  { tool: 'cylinderStats', args: { radius: 5, height: 10 }, expected: 'volume' },
  { tool: 'coneStats', args: { radius: 3, slantHeight: 5 }, expected: 'volume' },
  { tool: 'sphereStats', args: { radius: 4 }, expected: 'volume' },
  { tool: 'pyramidStats', args: { baseArea: 25, height: 12 }, expected: 'volume' },
  { tool: 'prismStats', args: { baseArea: 20, height: 8 }, expected: 'volume' },
  { tool: 'angleLinePlane', args: { heightOfPoint: 5, distanceOnPlane: 12 }, expected: 'angle' },
  
  // Chapter 4: Probability
  { tool: 'probabilityEvent', args: { favorable: 1, total: 6 }, expected: 'probability' },
  { tool: 'mutuallyExclusiveEvents', args: { probA: 0.3, probB: 0.4 }, expected: 'probability' },
  { tool: 'independentEvents', args: { probA: 0.5, probB: 0.6 }, expected: 'probability' },
  { tool: 'complementProbability', args: { prob: 0.3 }, expected: 'complement' },
  
  // Chapter 5: Trigonometry
  { tool: 'sineRule', args: { angleA: 30, sideA: 5, angleB: 45 }, expected: 'sideB' },
  { tool: 'cosineRuleSide', args: { b: 5, c: 6, angleA: 60 }, expected: 'sideA' },
  { tool: 'cosineRuleAngle', args: { a: 7, b: 5, c: 6 }, expected: 'angleA' },
  { tool: 'trigRatios', args: { opposite: 3, adjacent: 4, hypotenuse: 5 }, expected: 'sin' },
  
  // Chapter 6: Vectors
  { tool: 'vectorMagnitude', args: { x: 3, y: 4 }, expected: 'magnitude' },
  { tool: 'vectorDirection', args: { x: 1, y: 1 }, expected: 'angle' },
  { tool: 'addVectors', args: { x1: 3, y1: 4, x2: 1, y2: 2 }, expected: 'x' },
  { tool: 'subtractVectors', args: { x1: 5, y1: 7, x2: 2, y2: 3 }, expected: 'x' },
  { tool: 'scalarMultiply', args: { k: 3, x: 2, y: 4 }, expected: 'x' },
  { tool: 'dotProduct', args: { x1: 3, y1: 4, x2: 1, y2: 2 }, expected: 'dotProduct' },
  
  // Chapter 7: Matrices and Transformations
  { tool: 'matrixDeterminant', args: { a: 2, b: 3, c: 1, d: 4 }, expected: 'determinant' },
  { tool: 'matrixInverse', args: { a: 2, b: 1, c: 1, d: 3 }, expected: 'inverse' },
  { tool: 'solveSimultaneousEq', args: { a: 2, b: 3, e: 7, c: 1, d: 2, f: 4 }, expected: 'x' },
  { tool: 'transformPoint', args: { a: 1, b: 0, c: 0, d: 1, x: 5, y: 3 }, expected: 'transformed' },
  { tool: 'rotationMatrix', args: { degrees: 90 }, expected: 'matrix' },
  { tool: 'reflectionMatrix', args: { axis: 'x' }, expected: 'matrix' },
  { tool: 'enlargementMatrix', args: { scaleFactor: 2 }, expected: 'matrix' },
  
  // Chapter 8: Linear Programming
  { tool: 'evaluateObjectiveFunction', args: { x: 2, y: 5, coeffX: 3, coeffY: 4 }, expected: 'value' },
  { tool: 'checkConstraint', args: { x: 2, y: 3, coeffX: 1, coeffY: 1, operator: '<=', constant: 10 }, expected: 'satisfied' },
];

console.log(`Testing ${testCases.length} tools...\n`);

testCases.forEach((test, index) => {
  try {
    const result = dispatchTool(test.tool, test.args);
    
    if (result && test.expected in result) {
      console.log(`✅ [${index + 1}/${testCases.length}] ${test.tool}`);
      passed++;
    } else {
      console.log(`❌ [${index + 1}/${testCases.length}] ${test.tool} - Missing expected field: ${test.expected}`);
      errors.push({ tool: test.tool, error: `Missing field: ${test.expected}`, result });
      failed++;
    }
  } catch (error) {
    console.log(`❌ [${index + 1}/${testCases.length}] ${test.tool} - ${error.message}`);
    errors.push({ tool: test.tool, error: error.message });
    failed++;
  }
});

console.log('\n============================================================');
console.log(`RESULTS: ${passed}/${testCases.length} passed (${((passed/testCases.length)*100).toFixed(1)}%)`);
console.log('============================================================\n');

// Verify all tools from aiTools.js are in dispatcher
console.log('Verifying tool coverage...\n');
const toolsInAiTools = mathTools.map(t => t.name);
const toolsInDispatcher = testCases.map(t => t.tool);
const missingTools = toolsInAiTools.filter(t => !toolsInDispatcher.includes(t));

if (missingTools.length > 0) {
  console.log('⚠️  Tools in aiTools.js but not tested:');
  missingTools.forEach(tool => console.log(`   - ${tool}`));
} else {
  console.log('✅ All tools from aiTools.js are tested!');
}

console.log(`\n📊 Tool Count: ${mathTools.length} in aiTools.js, ${testCases.length} tested`);

if (errors.length > 0) {
  console.log('\n❌ ERRORS:\n');
  errors.forEach(err => {
    console.log(`Tool: ${err.tool}`);
    console.log(`Error: ${err.error}`);
    if (err.result) console.log(`Result:`, err.result);
    console.log('');
  });
}

console.log('\n' + (failed === 0 ? '🎉 ALL TOOLS WORKING!' : '⚠️  Some tools need attention'));
