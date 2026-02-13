import { useMemo, useState } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import ChartCanvas from '../components/ChartCanvas.jsx';
import Reveal from '../components/Reveal.jsx';
import Container from '../components/Container.jsx';
import usePrefersReducedMotion from '../lib/usePrefersReducedMotion.js';
import {
  parsePairs,
  getDomainAndRange,
  isFunction,
  inverseRelation,
  linearFunction,
  quadraticFunction,
  quadraticTurningPoint,
  solveQuadratic,
  generateFunctionSeries,
  formatNumber,
} from '../lib/math.js';

const subTabs = [
  { id: 'relation', label: 'Relations' },
  { id: 'linear', label: 'Linear' },
  { id: 'quadratic', label: 'Quadratic' },
  { id: 'roots', label: 'Roots' },
  { id: 'plot', label: 'Plot' },
];

export default function Chapter1_2({ theme }) {
  const reducedMotion = usePrefersReducedMotion();
  const [activeTab, setActiveTab] = useState(subTabs[0].id);
  const [relationText, setRelationText] = useState('1,2; 2,4; 3,6');
  const [relationOutput, setRelationOutput] = useState('');
  const [relationPairs, setRelationPairs] = useState([]);
  const [relationExp, setRelationExp] = useState('steps');

  const [linearValues, setLinearValues] = useState({ m: '2', x: '4', c: '1' });
  const [linearResult, setLinearResult] = useState('');
  const [linearExp, setLinearExp] = useState('steps');

  const [quadValues, setQuadValues] = useState({ a: '1', b: '-5', c: '6', x: '2' });
  const [quadResult, setQuadResult] = useState('');
  const [quadExp, setQuadExp] = useState('steps');

  const [turningValues, setTurningValues] = useState({ a: '1', b: '-5', c: '6' });
  const [turningResult, setTurningResult] = useState('');

  const [solverValues, setSolverValues] = useState({ a: '1', b: '-5', c: '6' });
  const [solverResult, setSolverResult] = useState('');
  const [rootExp, setRootExp] = useState('steps');

  const [plotValues, setPlotValues] = useState({ expr: 'x^2 - 5*x + 6', xMin: '-2', xMax: '5' });
  const [plotResult, setPlotResult] = useState('');
  const [plotPoints, setPlotPoints] = useState([]);
  const [plotExp, setPlotExp] = useState('steps');

  const relationChart = useMemo(() => {
    if (!relationPairs.length) return null;
    return {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Relation points',
            data: relationPairs.map(([x, y]) => ({ x, y })),
            pointRadius: 5,
            pointBackgroundColor: '#f5b623',
          },
        ],
      },
      options: {
        animation: reducedMotion ? false : { duration: 600 },
        plugins: { legend: { labels: { color: '#f4efe6' } } },
        scales: {
          x: { ticks: { color: '#c2b6a6' }, grid: { color: '#2b2b2f' } },
          y: { ticks: { color: '#c2b6a6' }, grid: { color: '#2b2b2f' } },
        },
      },
    };
  }, [relationPairs, reducedMotion]);

  const plotChart = useMemo(() => {
    if (!plotPoints.length) return null;
    return {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'f(x)',
            data: plotPoints,
            borderColor: '#e05a4f',
            backgroundColor: 'rgba(224, 90, 79, 0.2)',
            pointRadius: 0,
            tension: 0.25,
          },
        ],
      },
      options: {
        animation: reducedMotion ? false : { duration: 700 },
        parsing: false,
        plugins: { legend: { labels: { color: '#f4efe6' } } },
        scales: {
          x: { type: 'linear', ticks: { color: '#c2b6a6' }, grid: { color: '#2b2b2f' } },
          y: { ticks: { color: '#c2b6a6' }, grid: { color: '#2b2b2f' } },
        },
      },
    };
  }, [plotPoints, reducedMotion]);

  const handleRelation = () => {
    const pairs = parsePairs(relationText);
    if (!pairs.length) {
      setRelationOutput('Enter pairs like 1,2; 2,4; 3,6');
      setRelationPairs([]);
      return;
    }
    const { domain, range } = getDomainAndRange(pairs);
    const relationIsFunction = isFunction(pairs);
    const inverse = inverseRelation(pairs)
      .map((pair) => `(${pair[0]}, ${pair[1]})`)
      .join(', ');

    setRelationPairs(pairs);
    setRelationOutput(
      `Domain: {${domain.join(', ')}}\nRange: {${range.join(', ')}}\nFunction: ${relationIsFunction ? 'Yes' : 'No'}\nInverse: ${inverse}`
    );
  };

  const handleLinear = () => {
    const m = Number(linearValues.m);
    const x = Number(linearValues.x);
    const c = Number(linearValues.c);
    const value = linearFunction(m, x, c);
    setLinearResult(`f(x) = ${formatNumber(value, 3)} when x = ${x}`);
  };

  const handleQuadraticValue = () => {
    const a = Number(quadValues.a);
    const b = Number(quadValues.b);
    const c = Number(quadValues.c);
    const x = Number(quadValues.x);
    const value = quadraticFunction(a, b, c, x);
    setQuadResult(`f(x) = ${formatNumber(value, 3)} when x = ${x}`);
  };

  const handleTurningPoint = () => {
    const a = Number(turningValues.a);
    const b = Number(turningValues.b);
    const c = Number(turningValues.c);
    const { x, y } = quadraticTurningPoint(a, b, c);
    setTurningResult(`Turning point: (${formatNumber(x, 3)}, ${formatNumber(y, 3)})`);
  };

  const handleSolver = () => {
    const a = Number(solverValues.a);
    const b = Number(solverValues.b);
    const c = Number(solverValues.c);
    if (a === 0) {
      setSolverResult('a must not be 0 for a quadratic equation.');
      return;
    }
    const result = solveQuadratic(a, b, c);
    const roots = result.roots.length
      ? result.roots.map((root) => formatNumber(root, 4)).join(', ')
      : 'None';
    setSolverResult(
      `Discriminant: ${formatNumber(result.discriminant, 3)}\n${result.message}\nRoots: ${roots}`
    );
  };

  const handlePlot = () => {
    const xMin = Number(plotValues.xMin);
    const xMax = Number(plotValues.xMax);
    if (Number.isNaN(xMin) || Number.isNaN(xMax) || xMin >= xMax) {
      setPlotResult('x min must be less than x max.');
      setPlotPoints([]);
      return;
    }
    try {
      const points = generateFunctionSeries(plotValues.expr, xMin, xMax, 0.1);
      setPlotPoints(points);
      setPlotResult(`Plot ready with ${points.length} points.`);
    } catch (error) {
      setPlotResult(error.message);
      setPlotPoints([]);
    }
  };

  return (
    <section className="section-stack" style={{ gap: '1rem' }}>
      <div className="mini-tabs" role="tablist" aria-label="Relations and functions topics">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            className="mini-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`ch1-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'relation' && (
        <Reveal>
          <div className="chapter-split" id="ch1-relation" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Relation Scanner">
                <p className="sub-intro">
                  A relation is a list of ordered pairs. The domain is all the x values, the range is all
                  the y values. If one x maps to only one y, it is a function.
                </p>
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="relation">Ordered pairs</label>
                  <textarea
                    id="relation"
                    value={relationText}
                    onChange={(event) => setRelationText(event.target.value)}
                    placeholder="1,2; 2,4; 3,6"
                  />
                </div>
                <button className="action" type="button" onClick={handleRelation}>
                  Analyze relation
                </button>
                {relationOutput && <div className="result">{relationOutput}</div>}
              </Container>
              {relationChart && (
                <Container title="Graph">
                  <div className="chart-wrap" style={{ marginTop: 0, border: 'none', padding: 0, background: 'transparent' }}>
                    <ChartCanvas config={relationChart} height={240} theme={theme} />
                  </div>
                </Container>
              )}
              <Container>
                <div className="explain">
                  <strong>How to use:</strong> Type pairs and press analyze. The output tells you the
                  domain, range, and whether the rule is a function.
                </div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button
                  className="explainer-tab"
                  aria-selected={relationExp === 'steps'}
                  onClick={() => setRelationExp('steps')}
                >
                  Steps
                </button>
                <button
                  className="explainer-tab"
                  aria-selected={relationExp === 'lazy'}
                  onClick={() => setRelationExp('lazy')}
                >
                  Lazyplain
                </button>
              </div>

              {relationExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`R=\{(x,y)\}`} />
                  <BlockMath math={String.raw`\text{Domain}=\{x\},\quad \text{Range}=\{y\}`} />
                  <ol className="steps">
                    <li>List all x-values to get the domain.</li>
                    <li>List all y-values to get the range.</li>
                    <li>If any x repeats with different y, it is not a function.</li>
                    <li>Swap each pair to get the inverse relation.</li>
                  </ol>
                </>
              ) : (
                <>
                  <h4>ELI5: Relations</h4>
                  <p className="steps">
                    Think of a <strong>Relation</strong> like a list of connections, like people and their
                    house numbers.
                  </p>
                  <ul className="steps">
                    <li>
                      <strong>Domain:</strong> The "From" list. Like the names of the people.
                    </li>
                    <li>
                      <strong>Range:</strong> The "To" list. Like the actual house numbers.
                    </li>
                    <li>
                      <strong>Function:</strong> A "fair" list where every name only goes to
                      one house. If "Bob" is listed in two different houses at once, it's not a
                      function!
                    </li>
                  </ul>
                  <p className="steps" style={{ marginTop: '8px' }}>
                    <strong>Why use this?</strong> We use these to map how one thing (like time)
                    affects another thing (like how far you've walked).
                  </p>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {activeTab === 'linear' && (
        <Reveal>
          <div className="chapter-split" id="ch1-linear" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Linear Function">
                <p className="sub-intro">
                  A linear function uses f(x)=mx+c. Multiply the slope m by x, then add the intercept c.
                </p>
                <div className="field-grid">
                  <div>
                    <label htmlFor="linear-m">m (slope)</label>
                    <input
                      id="linear-m"
                      value={linearValues.m}
                      onChange={(event) => setLinearValues({ ...linearValues, m: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="linear-x">x</label>
                    <input
                      id="linear-x"
                      value={linearValues.x}
                      onChange={(event) => setLinearValues({ ...linearValues, x: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="linear-c">c (intercept)</label>
                    <input
                      id="linear-c"
                      value={linearValues.c}
                      onChange={(event) => setLinearValues({ ...linearValues, c: event.target.value })}
                    />
                  </div>
                </div>
                <button className="action" type="button" onClick={handleLinear}>
                  Compute f(x)
                </button>
                {linearResult && <div className="result">{linearResult}</div>}
              </Container>
              <Container>
                <div className="explain">
                  <strong>Example:</strong> m=2, x=4, c=1 gives f(x)=9.
                </div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button
                  className="explainer-tab"
                  aria-selected={linearExp === 'steps'}
                  onClick={() => setLinearExp('steps')}
                >
                  Steps
                </button>
                <button
                  className="explainer-tab"
                  aria-selected={linearExp === 'lazy'}
                  onClick={() => setLinearExp('lazy')}
                >
                  Lazyplain
                </button>
              </div>

              {linearExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`f(x)=mx+c`} />
                  <ol className="steps">
                    <li>Multiply m by x.</li>
                    <li>Add c to the result.</li>
                    <li>The final value is f(x).</li>
                  </ol>
                </>
              ) : (
                <>
                  <h4>ELI5: Linear Functions</h4>
                  <p className="steps">
                    A <strong>Linear Function</strong> is a "straight path" rule. It's like a taxi fare.
                  </p>
                  <ul className="steps">
                    <li>
                      <strong>m (Slope):</strong> How steep the climb is. Like how much the
                      taxi costs for every minute.
                    </li>
                    <li>
                      <strong>c (Intercept):</strong> The starting point. Like the fee you pay
                      just for getting into the taxi.
                    </li>
                  </ul>
                  <p className="steps" style={{ marginTop: '8px' }}>
                    <strong>Where do we use it?</strong> It's used for anything that grows at a
                    steady speed, like saving 5 dollars every week.
                  </p>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {activeTab === 'quadratic' && (
        <Reveal>
          <div className="chapter-split" id="ch1-quadratic" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Quadratic Value + Turning Point">
                <p className="sub-intro">
                  Quadratics are curves. You can plug in x to find a y value, and you can find the
                  turning point where the curve changes direction.
                </p>
                <div className="field-grid">
                  <div>
                    <label htmlFor="quad-a">a</label>
                    <input
                      id="quad-a"
                      value={quadValues.a}
                      onChange={(event) => setQuadValues({ ...quadValues, a: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="quad-b">b</label>
                    <input
                      id="quad-b"
                      value={quadValues.b}
                      onChange={(event) => setQuadValues({ ...quadValues, b: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="quad-c">c</label>
                    <input
                      id="quad-c"
                      value={quadValues.c}
                      onChange={(event) => setQuadValues({ ...quadValues, c: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="quad-x">x</label>
                    <input
                      id="quad-x"
                      value={quadValues.x}
                      onChange={(event) => setQuadValues({ ...quadValues, x: event.target.value })}
                    />
                  </div>
                </div>
                <button className="action" type="button" onClick={handleQuadraticValue}>
                  Evaluate f(x)
                </button>
                {quadResult && <div className="result">{quadResult}</div>}

                <div className="field-grid" style={{ marginTop: '12px' }}>
                  <div>
                    <label htmlFor="turn-a">a</label>
                    <input
                      id="turn-a"
                      value={turningValues.a}
                      onChange={(event) => setTurningValues({ ...turningValues, a: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="turn-b">b</label>
                    <input
                      id="turn-b"
                      value={turningValues.b}
                      onChange={(event) => setTurningValues({ ...turningValues, b: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="turn-c">c</label>
                    <input
                      id="turn-c"
                      value={turningValues.c}
                      onChange={(event) => setTurningValues({ ...turningValues, c: event.target.value })}
                    />
                  </div>
                </div>
                <button className="action" type="button" onClick={handleTurningPoint}>
                  Turning point
                </button>
                {turningResult && <div className="result">{turningResult}</div>}
              </Container>
              <Container>
                <div className="explain">
                  <strong>Example:</strong> a=1, b=-5, c=6 gives a turning point near (2.5, -0.25).
                </div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button
                  className="explainer-tab"
                  aria-selected={quadExp === 'steps'}
                  onClick={() => setQuadExp('steps')}
                >
                  Steps
                </button>
                <button
                  className="explainer-tab"
                  aria-selected={quadExp === 'lazy'}
                  onClick={() => setQuadExp('lazy')}
                >
                  Lazyplain
                </button>
              </div>

              {quadExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`f(x)=ax^2+bx+c`} />
                  <BlockMath math={String.raw`x_{\text{turn}}=\frac{-b}{2a},\quad y_{\text{turn}}=f(x_{\text{turn}})`} />
                  <ol className="steps">
                    <li>Substitute x into the quadratic to get f(x).</li>
                    <li>Use <InlineMath math={String.raw`x=-b/(2a)`} /> for the turning point.</li>
                    <li>Plug that x back into f(x) to get y.</li>
                  </ol>
                </>
              ) : (
                <>
                  <h4>ELI5: Quadratic Curves</h4>
                  <p className="steps">
                    A <strong>Quadratic</strong> is a rule that makes a "smiley" or "frowny" curve (a Parabola).
                  </p>
                  <ul className="steps">
                    <li>
                      <strong>a:</strong> Controls how skinny or wide the curve is.
                    </li>
                    <li>
                      <strong>Vertex:</strong> The very bottom of the smile or the very top of
                      the hill.
                    </li>
                  </ul>
                  <p className="steps" style={{ marginTop: '8px' }}>
                    <strong>Real world:</strong> When you throw a ball in the air, its path
                    follows this exact curve!
                  </p>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {activeTab === 'roots' && (
        <Reveal>
          <div className="chapter-split" id="ch1-roots" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Quadratic Roots">
                <p className="sub-intro">
                  Roots are where the graph crosses the x-axis. The discriminant tells you how many real
                  roots exist.
                </p>
                <div className="field-grid">
                  <div>
                    <label htmlFor="solver-a">a</label>
                    <input
                      id="solver-a"
                      value={solverValues.a}
                      onChange={(event) => setSolverValues({ ...solverValues, a: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="solver-b">b</label>
                    <input
                      id="solver-b"
                      value={solverValues.b}
                      onChange={(event) => setSolverValues({ ...solverValues, b: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="solver-c">c</label>
                    <input
                      id="solver-c"
                      value={solverValues.c}
                      onChange={(event) => setSolverValues({ ...solverValues, c: event.target.value })}
                    />
                  </div>
                </div>
                <button className="action" type="button" onClick={handleSolver}>
                  Solve quadratic
                </button>
                {solverResult && <div className="result">{solverResult}</div>}
              </Container>
              <Container>
                <div className="explain">
                  <strong>Example:</strong> a=1, b=-5, c=6 gives roots 2 and 3.
                </div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button
                  className="explainer-tab"
                  aria-selected={rootExp === 'steps'}
                  onClick={() => setRootExp('steps')}
                >
                  Steps
                </button>
                <button
                  className="explainer-tab"
                  aria-selected={rootExp === 'lazy'}
                  onClick={() => setRootExp('lazy')}
                >
                  Lazyplain
                </button>
              </div>

              {rootExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`D=b^2-4ac`} />
                  <BlockMath math={String.raw`x=\frac{-b\pm\sqrt{D}}{2a}`} />
                  <ol className="steps">
                    <li>Compute the discriminant D.</li>
                    <li>If D &gt; 0 there are two roots, if D = 0 one root, if D &lt; 0 no real roots.</li>
                    <li>Plug into the quadratic formula to get the roots.</li>
                  </ol>
                </>
              ) : (
                <>
                  <h4>ELI5: Finding Roots</h4>
                  <p className="steps">
                    <strong>Roots</strong> are simply the "Floor Hits." If the curve is a ball bouncing,
                    the roots are the exact spots where the ball touches the ground (the
                    floor).
                  </p>
                  <ul className="steps">
                    <li>
                      <strong>Discriminant:</strong> A "magic number" that tells us IF we hit
                      the floor. If it's negative, the ball is floating in the air and never
                      touches the ground!
                    </li>
                  </ul>
                  <p className="steps" style={{ marginTop: '8px' }}>
                    <strong>Why find them?</strong> In business, roots can tell you the "Break
                    Even" point—the exact moment you stop losing money and start making it.
                  </p>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {activeTab === 'plot' && (
        <Reveal>
          <div className="chapter-split" id="ch1-plot" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Function Plotter">
                <p className="sub-intro">
                  Plotting gives a quick picture of how a function behaves. Use simple expressions like
                  x^2, sin(x), or sqrt(x).
                </p>
                <div className="field-grid">
                  <div>
                    <label htmlFor="plot-expr">f(x)</label>
                    <input
                      id="plot-expr"
                      value={plotValues.expr}
                      onChange={(event) => setPlotValues({ ...plotValues, expr: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="plot-min">x min</label>
                    <input
                      id="plot-min"
                      value={plotValues.xMin}
                      onChange={(event) => setPlotValues({ ...plotValues, xMin: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="plot-max">x max</label>
                    <input
                      id="plot-max"
                      value={plotValues.xMax}
                      onChange={(event) => setPlotValues({ ...plotValues, xMax: event.target.value })}
                    />
                  </div>
                </div>
                <button className="action" type="button" onClick={handlePlot}>
                  Plot function
                </button>
                {plotResult && <div className="result">{plotResult}</div>}
              </Container>
              {plotChart && (
                <Container title="Graph">
                  <div className="chart-wrap" style={{ marginTop: 0, border: 'none', padding: 0, background: 'transparent' }}>
                    <ChartCanvas config={plotChart} height={280} theme={theme} />
                  </div>
                </Container>
              )}
              <Container>
                <div className="explain">
                  <strong>Example:</strong> f(x)=x^2-5*x+6, x min=-2, x max=5.
                </div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button
                  className="explainer-tab"
                  aria-selected={plotExp === 'steps'}
                  onClick={() => setPlotExp('steps')}
                >
                  Steps
                </button>
                <button
                  className="explainer-tab"
                  aria-selected={plotExp === 'lazy'}
                  onClick={() => setPlotExp('lazy')}
                >
                  Lazyplain
                </button>
              </div>

              {plotExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`y=f(x)`} />
                  <ol className="steps">
                    <li>Pick a range for x (like -2 to 5).</li>
                    <li>Substitute each x into the function to get y.</li>
                    <li>Plot the points and connect them smoothly.</li>
                  </ol>
                </>
              ) : (
                <>
                  <h4>ELI5: Plotting Functions</h4>
                  <p className="steps">
                    <strong>Plotting</strong> is like drawing a "map" of a rule. If you have a rule that
                    says "Double the number and add 1," plotting shows you what that rule
                    LOOKS like as a line.
                  </p>
                  <p className="steps" style={{ marginTop: '8px' }}>
                    <strong>Why do it?</strong> It helps us "see" the future. If a line is
                    going up, we can see where it will be tomorrow or next year!
                  </p>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}
    </section>
  );
}
