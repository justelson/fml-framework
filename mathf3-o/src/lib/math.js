export function parseNumberList(text) {
  if (!text) return [];
  return text
    .split(/[,\s]+/)
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => Number(value))
    .filter((value) => !Number.isNaN(value));
}

export function parsePairs(text) {
  if (!text) return [];
  const pairs = [];
  const regex = /(-?\d*\.?\d+)\s*[, ]\s*(-?\d*\.?\d+)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    pairs.push([Number(match[1]), Number(match[2])]);
  }
  return pairs;
}

export function getDomainAndRange(pairs) {
  const domain = [...new Set(pairs.map((pair) => pair[0]))].sort((a, b) => a - b);
  const range = [...new Set(pairs.map((pair) => pair[1]))].sort((a, b) => a - b);
  return { domain, range };
}

export function isFunction(pairs) {
  const seen = new Set();
  for (const [x] of pairs) {
    if (seen.has(x)) return false;
    seen.add(x);
  }
  return true;
}

export function inverseRelation(pairs) {
  return pairs.map(([x, y]) => [y, x]);
}

export function linearFunction(m, x, c) {
  return m * x + c;
}

export function quadraticFunction(a, b, c, x) {
  return a * (x ** 2) + (b * x) + c;
}

export function quadraticTurningPoint(a, b, c) {
  const x = -b / (2 * a);
  const y = (4 * a * c - (b ** 2)) / (4 * a);
  return { x, y };
}

export function solveQuadratic(a, b, c) {
  const discriminant = (b ** 2) - (4 * a * c);
  if (discriminant > 0) {
    const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return { discriminant, roots: [root1, root2], message: 'Two real roots' };
  }
  if (discriminant === 0) {
    const root = -b / (2 * a);
    return { discriminant, roots: [root], message: 'One real root' };
  }
  return { discriminant, roots: [], message: 'No real roots' };
}

export function computeStats(values) {
  if (!values.length) return { mean: null, median: null, mode: 'No data' };
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];

  const counts = new Map();
  sorted.forEach((value) => {
    counts.set(value, (counts.get(value) || 0) + 1);
  });
  const maxCount = Math.max(...counts.values());
  const modes = [...counts.entries()]
    .filter(([, count]) => count === maxCount)
    .map(([value]) => value);

  const mode = modes.length === counts.size ? 'No unique mode' : modes.join(', ');
  return { mean, median, mode };
}

export function groupedMean(classMarks, frequencies) {
  const totalFx = classMarks.reduce((sum, value, index) => sum + (value * frequencies[index]), 0);
  const totalF = frequencies.reduce((sum, value) => sum + value, 0);
  return totalFx / totalF;
}

export function groupedMedian(L, N, nBefore, nWithin, i) {
  return L + (((N / 2) - nBefore) / nWithin) * i;
}

export function groupedMode(L, t1, t2, i) {
  return L + (t1 / (t1 + t2)) * i;
}

export function directVariation(x1, y1, x2) {
  const k = y1 / x1;
  const y2 = k * x2;
  return { k, y2 };
}

export function inverseVariation(x1, y1, x2) {
  const k = y1 * x1;
  const y2 = k / x2;
  return { k, y2 };
}

export function arithmeticProgression(a, d, n) {
  const nthTerm = a + (n - 1) * d;
  const sum = (n / 2) * (2 * a + (n - 1) * d);
  return { nthTerm, sum };
}

export function geometricProgression(a, r, n) {
  const nthTerm = a * (r ** (n - 1));
  const sum = r === 1 ? a * n : (a * ((r ** n) - 1)) / (r - 1);
  return { nthTerm, sum };
}

export function compoundInterest(p, r, t, n = 1) {
  const amount = p * (1 + (r / n)) ** (n * t);
  const interest = amount - p;
  return { amount, interest };
}

export function circleProperties(radius) {
  return {
    area: Math.PI * (radius ** 2),
    circumference: 2 * Math.PI * radius,
  };
}

export function arcLengthSectorArea(radius, thetaDegrees) {
  const fraction = thetaDegrees / 360;
  return {
    arcLength: fraction * 2 * Math.PI * radius,
    sectorArea: fraction * Math.PI * (radius ** 2),
  };
}

export function chordLength(radius, distance) {
  if (distance >= radius) return null;
  const halfChord = Math.sqrt((radius ** 2) - (distance ** 2));
  return {
    halfChord,
    chord: 2 * halfChord,
  };
}

export function greatCircleDistance(lat1, lat2) {
  const alpha = (lat1 > 0 && lat2 > 0) || (lat1 < 0 && lat2 < 0)
    ? Math.abs(lat1 - lat2)
    : Math.abs(lat1) + Math.abs(lat2);
  const distanceNm = alpha * 60;
  const distanceKm = distanceNm * 1.852;
  return { alpha, distanceNm, distanceKm };
}

export function smallCircleDistance(long1, long2, latitude) {
  const alpha = Math.abs(long1 - long2);
  const distanceNm = alpha * 60 * Math.cos(latitude * Math.PI / 180);
  const distanceKm = distanceNm * 1.852;
  return { alpha, distanceNm, distanceKm };
}

export function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const phi1 = lat1 * Math.PI / 180;
  const phi2 = lat2 * Math.PI / 180;
  const dPhi = (lat2 - lat1) * Math.PI / 180;
  const dLambda = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(dPhi / 2) ** 2
    + Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function accountingEquation(assets, liabilities, capital) {
  const values = [assets, liabilities, capital].filter((value) => value !== null);
  if (values.length !== 2) {
    return { error: 'Provide exactly two values to solve for the third.' };
  }
  if (assets === null) {
    const result = liabilities + capital;
    return { assets: result, liabilities, capital, calculated: 'Assets' };
  }
  if (liabilities === null) {
    const result = assets - capital;
    return { assets, liabilities: result, capital, calculated: 'Liabilities' };
  }
  const result = assets - liabilities;
  return { assets, liabilities, capital: result, calculated: 'Capital' };
}

export function simpleBalanceSheet(assets, liabilities) {
  return {
    assets,
    liabilities,
    capital: assets - liabilities,
  };
}

export function formatNumber(value, decimals = 4) {
  if (value === null || value === undefined || Number.isNaN(value)) return 'N/A';
  return Number(value).toFixed(decimals);
}

export function buildFunction(expression) {
  const raw = (expression || '').toLowerCase().trim();
  if (!raw) throw new Error('Expression is required.');

  const allowedWords = ['x', 'pi', 'e', 'sin', 'cos', 'tan', 'sqrt', 'abs', 'log', 'exp'];
  const tokens = raw.match(/[a-z]+/g) || [];
  tokens.forEach((token) => {
    if (!allowedWords.includes(token)) {
      throw new Error(`Unsupported token: ${token}`);
    }
  });

  if (/[^0-9a-z+\-*/^().,\s]/.test(raw)) {
    throw new Error('Invalid characters in expression.');
  }

  const normalized = raw
    .replace(/\^/g, '**')
    .replace(/\bpi\b/g, 'Math.PI')
    .replace(/\be\b/g, 'Math.E')
    .replace(/\bsin\b/g, 'Math.sin')
    .replace(/\bcos\b/g, 'Math.cos')
    .replace(/\btan\b/g, 'Math.tan')
    .replace(/\bsqrt\b/g, 'Math.sqrt')
    .replace(/\babs\b/g, 'Math.abs')
    .replace(/\blog\b/g, 'Math.log')
    .replace(/\bexp\b/g, 'Math.exp');

  return new Function('x', `"use strict"; return ${normalized};`);
}

export function generateFunctionSeries(expression, xMin, xMax, step = 0.1) {
  const fn = buildFunction(expression);
  const points = [];
  for (let x = xMin; x <= xMax; x += step) {
    const y = fn(x);
    if (Number.isFinite(y)) {
      points.push({ x: Number(x.toFixed(3)), y });
    }
  }
  return points;
}

export function buildSequencePoints(list) {
  return list.map((value, index) => ({ x: index + 1, y: value }));
}
