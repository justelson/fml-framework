/**
 * Tool Dispatcher
 * Maps the AI's tool call (string name + args) to the actual JavaScript function.
 */

import * as MathLib from './math.js';

export function dispatchTool(toolName, args) {
    switch (toolName) {
        // --- Chapter 1 & 2: Algebra ---
        case 'calculateLinearY':
            if (args.m === undefined || args.x === undefined || args.c === undefined) {
                throw new Error('Missing arguments for calculateLinearY');
            }
            return { y: MathLib.linearFunction(args.m, args.x, args.c) };

        case 'solveQuadraticRoots':
            if (args.a === undefined || args.b === undefined || args.c === undefined) {
                throw new Error('Missing arguments for solveQuadraticRoots');
            }
            return MathLib.solveQuadratic(args.a, args.b, args.c);

        case 'findQuadraticVertex':
            if (args.a === undefined || args.b === undefined || args.c === undefined) {
                throw new Error('Missing arguments for findQuadraticVertex');
            }
            return MathLib.quadraticTurningPoint(args.a, args.b, args.c);

        // --- Chapter 3: Statistics ---
        case 'analyzeDataList':
            if (!Array.isArray(args.values)) {
                throw new Error('values must be an array for analyzeDataList');
            }
            return MathLib.computeStats(args.values);

        case 'calculateGroupedMean':
            if (!Array.isArray(args.classMarks) || !Array.isArray(args.frequencies)) {
                throw new Error('Invalid arguments for calculateGroupedMean');
            }
            return { mean: MathLib.groupedMean(args.classMarks, args.frequencies) };

        case 'calculateGroupedMedian':
            // L, N, nBefore, nWithin, i
            return { median: MathLib.groupedMedian(args.L, args.N, args.nBefore, args.nWithin, args.i) };

        case 'calculateGroupedMode':
            // L, t1, t2, i
            return { mode: MathLib.groupedMode(args.L, args.t1, args.t2, args.i) };

        // --- Chapter 4: Rates & Variations ---
        case 'calculateDirectVariation':
            return MathLib.directVariation(args.x1, args.y1, args.x2);

        case 'calculateInverseVariation':
            return MathLib.inverseVariation(args.x1, args.y1, args.x2);

        // --- Chapter 5: Sequences & Series ---
        case 'solveArithmeticProgression':
            return MathLib.arithmeticProgression(args.a, args.d, args.n);

        case 'solveGeometricProgression':
            return MathLib.geometricProgression(args.a, args.r, args.n);

        case 'calculateCompoundInterest':
            // p, r, t, n (optional in math.js defaulting to 1, but passed from AI)
            return MathLib.compoundInterest(args.p, args.r, args.t, args.n || 1);

        // --- Chapter 6: Circles ---
        case 'calculateCircleProperties':
            return MathLib.circleProperties(args.radius);

        case 'calculateArcSector':
            return MathLib.arcLengthSectorArea(args.radius, args.thetaDegrees);

        case 'calculateChordLength':
            return MathLib.chordLength(args.radius, args.distance);

        // --- Chapter 7: Geometry (Earth) ---
        case 'calculateGreatCircle':
            return MathLib.greatCircleDistance(args.lat1, args.lat2);

        case 'calculateSmallCircle':
            return MathLib.smallCircleDistance(args.long1, args.long2, args.latitude);

        case 'calculateHaversine':
            return { distance: MathLib.haversineDistance(args.lat1, args.lon1, args.lat2, args.lon2) };

        // --- Chapter 8: Accounting ---
        case 'solveAccountingEquation':
            return MathLib.accountingEquation(args.assets ?? null, args.liabilities ?? null, args.capital ?? null);

        case 'generateBalanceSheet':
            return MathLib.simpleBalanceSheet(args.assets, args.liabilities);

        default:
            throw new Error(`Unknown tool: ${toolName}`);
    }
}
