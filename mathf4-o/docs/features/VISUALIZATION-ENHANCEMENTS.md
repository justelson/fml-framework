# Visualization Enhancements for All Chapters

## Goal
Add proper axis labels, tick marks, numbers, point labels, and make all graphs more informative across all chapters.

## Standard Enhancements to Apply

### 1. Axis Configuration
```jsx
<Coordinates.Cartesian 
  xAxis={{ labels: (n) => n, lines: 1 }}
  yAxis={{ labels: (n) => n, lines: 1 }}
/>
```
- `labels: (n) => n` - Shows numbers on every tick
- `lines: 1` - Shows grid lines at every integer

### 2. Axis Labels (x, y, z)
```jsx
<Text x={maxX - 0.5} y={-0.5} size={16} color="var(--text)">x</Text>
<Text x={-0.5} y={maxY - 0.5} size={16} color="var(--text)">y</Text>
```

### 3. Point Labels
```jsx
<Text x={pointX} y={pointY + 0.5} attach="n" size={14}>
  P({pointX}, {pointY})
</Text>
```

### 4. Line Weight
```jsx
<Line weight={2} /> // Make lines more visible
```

## Chapter-by-Chapter Enhancements

### Chapter 1: Coordinate Geometry ✅
**Sections:** Gradient, Distance, Midpoint, Equation, Analysis

**Enhancements:**
- ✅ Add axis labels (x, y)
- ✅ Add tick marks with numbers
- ✅ Label points (P₁, P₂, A, B, M)
- ✅ Show coordinates on points
- ✅ Increase line weight to 2
- ✅ Add grid lines

### Chapter 2: Areas and Perimeters
**Sections:** Triangle (SAS), Circle, Polygon

**Current Issues:**
- No axis numbers
- No labels on shapes
- No dimensions shown

**Enhancements Needed:**
- Add axis labels with numbers
- Label triangle vertices (A, B, C)
- Show side lengths on triangles
- Label circle radius
- Show polygon dimensions
- Add measurement annotations

### Chapter 5: Trigonometry
**Sections:** Sine Rule, Cosine Rule

**Current Issues:**
- Triangle vertices not labeled
- No angle markers
- No side length labels

**Enhancements Needed:**
- Label vertices (A, B, C)
- Show angle markers at vertices
- Label sides (a, b, c)
- Add angle degree labels
- Show which angle/side is being calculated

### Chapter 6: Vectors
**Sections:** Magnitude, Addition

**Current Issues:**
- No axis numbers
- Vectors not labeled
- No component labels

**Enhancements Needed:**
- Add axis labels with numbers
- Label vectors (u, v, u+v)
- Show vector components (x, y)
- Add magnitude annotation
- Show resultant vector clearly

### Chapter 8: Linear Programming
**Sections:** Feasible Region

**Current Issues:**
- No axis numbers
- Constraints not labeled
- Feasible region not shaded

**Enhancements Needed:**
- Add axis labels with numbers
- Label constraint lines
- Shade feasible region
- Mark corner points
- Show objective function value at points

## Implementation Pattern

### Standard Template:
```jsx
<Container title="Visualization">
  <div style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '4px' }}>
    <Mafs viewBox={{ x: [minX, maxX], y: [minY, maxY] }} height={300}>
      {/* Axes with numbers */}
      <Coordinates.Cartesian 
        xAxis={{ labels: (n) => n, lines: 1 }}
        yAxis={{ labels: (n) => n, lines: 1 }}
      />
      
      {/* Main content (points, lines, shapes) */}
      <Point x={x1} y={y1} color="#f5b623" />
      <Line weight={2} color="#e05a4f" />
      
      {/* Labels */}
      <Text x={x1} y={y1 + 0.5} attach="n" size={14}>
        Label
      </Text>
      
      {/* Axis labels */}
      <Text x={maxX - 0.5} y={-0.5} size={16} color="var(--text)">x</Text>
      <Text x={-0.5} y={maxY - 0.5} size={16} color="var(--text)">y</Text>
    </Mafs>
  </div>
</Container>
```

## Color Scheme
- Points: `#f5b623` (yellow/gold)
- Lines/Shapes: `#e05a4f` (red)
- Text: `var(--text)` (theme-aware)
- Grid: Default Mafs color
- Highlights: `#10b981` (green) for results

## Typography
- Axis labels (x, y, z): size 16
- Point labels: size 14
- Measurements: size 13
- Annotations: size 12

## Next Steps
1. Update Chapter 1 (Coordinate Geometry) - IN PROGRESS
2. Update Chapter 2 (Areas and Perimeters)
3. Update Chapter 5 (Trigonometry)
4. Update Chapter 6 (Vectors)
5. Update Chapter 8 (Linear Programming)

## Benefits
- ✅ More informative visualizations
- ✅ Better learning experience
- ✅ Clear axis references
- ✅ Professional appearance
- ✅ Easier to understand relationships
- ✅ Matches textbook quality
