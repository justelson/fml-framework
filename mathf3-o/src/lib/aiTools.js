/**
 * AI Tool Registry
 * This file defines the tools available to the AI model, mapping them to the
 * corresponding functions in src/lib/math.js.
 */

export const mathTools = [
    // --- Chapter 1 & 2: Algebra & Functions ---
    {
        name: 'calculateLinearY',
        description: 'Calculates the y value for a given x in a linear equation y = mx + c.',
        parameters: {
            type: 'object',
            properties: {
                m: { type: 'number', description: 'Slope of the line' },
                x: { type: 'number', description: 'Input value x' },
                c: { type: 'number', description: 'Y-intercept' },
            },
            required: ['m', 'x', 'c'],
        },
    },
    {
        name: 'solveQuadraticRoots',
        description: 'Finds the roots (x-intercepts) of a quadratic equation ax^2 + bx + c = 0.',
        parameters: {
            type: 'object',
            properties: {
                a: { type: 'number', description: 'Coefficient of x^2' },
                b: { type: 'number', description: 'Coefficient of x' },
                c: { type: 'number', description: 'Constant term' },
            },
            required: ['a', 'b', 'c'],
        },
    },
    {
        name: 'findQuadraticVertex',
        description: 'Finds the turning point (vertex) of a quadratic curve.',
        parameters: {
            type: 'object',
            properties: {
                a: { type: 'number', description: 'Coefficient of x^2' },
                b: { type: 'number', description: 'Coefficient of x' },
                c: { type: 'number', description: 'Constant term' },
            },
            required: ['a', 'b', 'c'],
        },
    },

    // --- Chapter 3: Statistics ---
    {
        name: 'analyzeDataList',
        description: 'Computes mean, median, and mode for a list of raw numbers.',
        parameters: {
            type: 'object',
            properties: {
                values: {
                    type: 'array',
                    items: { type: 'number' },
                    description: 'Array of numbers to analyze',
                },
            },
            required: ['values'],
        },
    },
    {
        name: 'calculateGroupedMean',
        description: 'Calculates the mean for data grouped into classes.',
        parameters: {
            type: 'object',
            properties: {
                classMarks: {
                    type: 'array',
                    items: { type: 'number' },
                    description: 'Midpoints of each class',
                },
                frequencies: {
                    type: 'array',
                    items: { type: 'number' },
                    description: 'Frequency count for each class',
                },
            },
            required: ['classMarks', 'frequencies'],
        },
    },
    {
        name: 'calculateGroupedMedian',
        description: 'Calculates the median for grouped data.',
        parameters: {
            type: 'object',
            properties: {
                L: { type: 'number', description: 'Lower boundary of the median class' },
                N: { type: 'number', description: 'Total number of items (sum of frequencies)' },
                nBefore: { type: 'number', description: 'Cumulative frequency before the median class' },
                nWithin: { type: 'number', description: 'Frequency within the median class' },
                i: { type: 'number', description: 'Class interval width' },
            },
            required: ['L', 'N', 'nBefore', 'nWithin', 'i'],
        },
    },
    {
        name: 'calculateGroupedMode',
        description: 'Calculates the mode for grouped data.',
        parameters: {
            type: 'object',
            properties: {
                L: { type: 'number', description: 'Lower boundary of the modal class' },
                t1: { type: 'number', description: 'Frequency of modal class minus previous class' },
                t2: { type: 'number', description: 'Frequency of modal class minus next class' },
                i: { type: 'number', description: 'Class interval width' },
            },
            required: ['L', 't1', 't2', 'i'],
        },
    },

    // --- Chapter 4: Rates & Variations ---
    {
        name: 'calculateDirectVariation',
        description: 'Solves a direct variation problem (y = kx). Finds k and then a new y.',
        parameters: {
            type: 'object',
            properties: {
                x1: { type: 'number', description: 'Initial x value' },
                y1: { type: 'number', description: 'Initial y value' },
                x2: { type: 'number', description: 'New x value to solve for' },
            },
            required: ['x1', 'y1', 'x2'],
        },
    },
    {
        name: 'calculateInverseVariation',
        description: 'Solves an inverse variation problem (y = k/x). Finds k and then a new y.',
        parameters: {
            type: 'object',
            properties: {
                x1: { type: 'number', description: 'Initial x value' },
                y1: { type: 'number', description: 'Initial y value' },
                x2: { type: 'number', description: 'New x value to solve for' },
            },
            required: ['x1', 'y1', 'x2'],
        },
    },

    // --- Chapter 5: Sequences & Series ---
    {
        name: 'solveArithmeticProgression',
        description: 'Calculates the nth term and sum of an Arithmetic Progression.',
        parameters: {
            type: 'object',
            properties: {
                a: { type: 'number', description: 'First term' },
                d: { type: 'number', description: 'Common difference' },
                n: { type: 'number', description: 'Number of terms' },
            },
            required: ['a', 'd', 'n'],
        },
    },
    {
        name: 'solveGeometricProgression',
        description: 'Calculates the nth term and sum of a Geometric Progression.',
        parameters: {
            type: 'object',
            properties: {
                a: { type: 'number', description: 'First term' },
                r: { type: 'number', description: 'Common ratio' },
                n: { type: 'number', description: 'Number of terms' },
            },
            required: ['a', 'r', 'n'],
        },
    },
    {
        name: 'calculateCompoundInterest',
        description: 'Calculates compound interest and total amount.',
        parameters: {
            type: 'object',
            properties: {
                p: { type: 'number', description: 'Principal amount' },
                r: { type: 'number', description: 'Annual interest rate (decimal, e.g., 0.05)' },
                t: { type: 'number', description: 'Time in years' },
                n: { type: 'number', description: 'compounds per year (default 1)' },
            },
            required: ['p', 'r', 't'],
        },
    },

    // --- Chapter 6: Circles ---
    {
        name: 'calculateCircleProperties',
        description: 'Calculates area and circumference of a circle.',
        parameters: {
            type: 'object',
            properties: {
                radius: { type: 'number', description: 'Radius of the circle' },
            },
            required: ['radius'],
        },
    },
    {
        name: 'calculateArcSector',
        description: 'Calculates arc length and sector area.',
        parameters: {
            type: 'object',
            properties: {
                radius: { type: 'number', description: 'Radius of the circle' },
                thetaDegrees: { type: 'number', description: 'Angle of the sector in degrees' },
            },
            required: ['radius', 'thetaDegrees'],
        },
    },
    {
        name: 'calculateChordLength',
        description: 'Calculates the length of a chord given radius and distance from center.',
        parameters: {
            type: 'object',
            properties: {
                radius: { type: 'number', description: 'Radius of the circle' },
                distance: { type: 'number', description: 'Perpendicular distance from center to chord' },
            },
            required: ['radius', 'distance'],
        },
    },

    // --- Chapter 7: Geometry (Earth) ---
    {
        name: 'calculateGreatCircle',
        description: 'Calculates distance along a meridian (Great Circle) between two latitudes.',
        parameters: {
            type: 'object',
            properties: {
                lat1: { type: 'number', description: 'Latitude of first point' },
                lat2: { type: 'number', description: 'Latitude of second point' },
            },
            required: ['lat1', 'lat2'],
        },
    },
    {
        name: 'calculateSmallCircle',
        description: 'Calculates distance along a parallel (Small Circle) between two longitudes.',
        parameters: {
            type: 'object',
            properties: {
                long1: { type: 'number', description: 'Longitude of first point' },
                long2: { type: 'number', description: 'Longitude of second point' },
                latitude: { type: 'number', description: 'Latitude where the travel happens' },
            },
            required: ['long1', 'long2', 'latitude'],
        },
    },
    {
        name: 'calculateHaversine',
        description: 'Calculates the Great Circle distance between any two points on Earth.',
        parameters: {
            type: 'object',
            properties: {
                lat1: { type: 'number', description: 'Latitude of first point' },
                lon1: { type: 'number', description: 'Longitude of first point' },
                lat2: { type: 'number', description: 'Latitude of second point' },
                lon2: { type: 'number', description: 'Longitude of second point' },
            },
            required: ['lat1', 'lon1', 'lat2', 'lon2'],
        },
    },

    // --- Chapter 8: Accounting ---
    {
        name: 'solveAccountingEquation',
        description: 'Solves the accounting equation Assets = Liabilities + Capital.',
        parameters: {
            type: 'object',
            properties: {
                assets: { type: 'number', description: 'Total Assets (or null/undefined if solving for it)' },
                liabilities: { type: 'number', description: 'Total Liabilities (or null/undefined if solving for it)' },
                capital: { type: 'number', description: 'Total Capital (or null/undefined if solving for it)' },
            },
            required: [], // None required, but 2 out of 3 must be present
        },
    },
    {
        name: 'generateBalanceSheet',
        description: 'Generates a simple balance sheet summary.',
        parameters: {
            type: 'object',
            properties: {
                assets: { type: 'number', description: 'Total Assets' },
                liabilities: { type: 'number', description: 'Total Liabilities' },
            },
            required: ['assets', 'liabilities'],
        },
    },
];
