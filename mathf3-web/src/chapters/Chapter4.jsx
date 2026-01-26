import { useMemo, useState } from 'react';
import { BlockMath } from 'react-katex';
import ChartCanvas from '../components/ChartCanvas.jsx';
import Reveal from '../components/Reveal.jsx';
import Container from '../components/Container.jsx';
import usePrefersReducedMotion from '../lib/usePrefersReducedMotion.js';
import { directVariation, inverseVariation, formatNumber } from '../lib/math.js';

const subTabs = [
  { id: 'direct', label: 'Direct' },
  { id: 'inverse', label: 'Inverse' },
];

export default function Chapter4({ theme }) {
  const reducedMotion = usePrefersReducedMotion();
  const [activeTab, setActiveTab] = useState(subTabs[0].id);
  const [directValues, setDirectValues] = useState({ x1: '4', y1: '24', x2: '5' });
  const [directOutput, setDirectOutput] = useState('');
  const [directChartPoints, setDirectChartPoints] = useState([]);
  const [directExp, setDirectExp] = useState('steps');

  const [inverseValues, setInverseValues] = useState({ x1: '2', y1: '60', x2: '3' });
  const [inverseOutput, setInverseOutput] = useState('');
  const [inverseChartPoints, setInverseChartPoints] = useState([]);
  const [inverseExp, setInverseExp] = useState('steps');

  const directChart = useMemo(() => {
    if (!directChartPoints.length) return null;
    return {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'y = kx',
            data: directChartPoints,
            borderColor: '#f5b623',
            backgroundColor: 'rgba(245, 182, 35, 0.18)',
            pointRadius: 0,
            tension: 0.1,
          },
        ],
      },
      options: {
        animation: reducedMotion ? false : { duration: 500 },
        parsing: false,
        scales: {
          x: { type: 'linear' },
          y: {},
        },
      },
    };
  }, [directChartPoints, reducedMotion]);

  const inverseChart = useMemo(() => {
    if (!inverseChartPoints.length) return null;
    return {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'y = k / x',
            data: inverseChartPoints,
            borderColor: '#e05a4f',
            backgroundColor: 'rgba(224, 90, 79, 0.2)',
            pointRadius: 0,
            tension: 0.15,
          },
        ],
      },
      options: {
        animation: reducedMotion ? false : { duration: 500 },
        parsing: false,
        scales: {
          x: { type: 'linear' },
          y: {},
        },
      },
    };
  }, [inverseChartPoints, reducedMotion]);

  const handleDirect = () => {
    const x1 = Number(directValues.x1);
    const y1 = Number(directValues.y1);
    const x2 = Number(directValues.x2);
    const { k, y2 } = directVariation(x1, y1, x2);
    setDirectOutput(`k = ${formatNumber(k, 3)}\nWhen x = ${x2}, y = ${formatNumber(y2, 3)}`);

    const points = [];
    for (let x = 0; x <= x2 * 1.2; x += x2 / 12) {
      points.push({ x, y: k * x });
    }
    setDirectChartPoints(points);
  };

  const handleInverse = () => {
    const x1 = Number(inverseValues.x1);
    const y1 = Number(inverseValues.y1);
    const x2 = Number(inverseValues.x2);
    const { k, y2 } = inverseVariation(x1, y1, x2);
    setInverseOutput(`k = ${formatNumber(k, 3)}\nWhen x = ${x2}, y = ${formatNumber(y2, 3)}`);

    const points = [];
    for (let x = 0.5; x <= x2 * 2; x += x2 / 10) {
      points.push({ x, y: k / x });
    }
    setInverseChartPoints(points);
  };

  return (
    <section className="section-stack" style={{ gap: '1rem' }}>
      <div className="mini-tabs" role="tablist" aria-label="Rates and variations topics">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            className="mini-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`ch4-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'direct' && (
        <Reveal>
          <div className="chapter-split" id="ch4-direct" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Direct Variation">
                <p className="sub-intro">
                  Direct variation means y grows in the same direction as x. The constant k tells how
                  steep the line is.
                </p>
                <div className="field-grid">
                  <div>
                    <label htmlFor="direct-x1">x1</label>
                    <input
                      id="direct-x1"
                      value={directValues.x1}
                      onChange={(event) => setDirectValues({ ...directValues, x1: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="direct-y1">y1</label>
                    <input
                      id="direct-y1"
                      value={directValues.y1}
                      onChange={(event) => setDirectValues({ ...directValues, y1: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="direct-x2">x2</label>
                    <input
                      id="direct-x2"
                      value={directValues.x2}
                      onChange={(event) => setDirectValues({ ...directValues, x2: event.target.value })}
                    />
                  </div>
                </div>
                <button className="action" type="button" onClick={handleDirect}>
                  Solve direct variation
                </button>
                {directOutput && <div className="result">{directOutput}</div>}
              </Container>
              {directChart && (
                <Container title="Graph">
                  <div className="chart-wrap" style={{ marginTop: 0, border: 'none', padding: 0, background: 'transparent' }}>
                    <ChartCanvas config={directChart} height={220} theme={theme} />
                  </div>
                </Container>
              )}
              <Container>
                <div className="explain">
                  <strong>Example:</strong> If y=24 when x=4, then k=6 and y=30 when x=5.
                </div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button
                  className="explainer-tab"
                  aria-selected={directExp === 'steps'}
                  onClick={() => setDirectExp('steps')}
                >
                  Steps
                </button>
                <button
                  className="explainer-tab"
                  aria-selected={directExp === 'lazy'}
                  onClick={() => setDirectExp('lazy')}
                >
                  Lazyplain
                </button>
              </div>

              {directExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`y=kx`} />
                  <ol className="steps">
                    <li>Find k by dividing y1 by x1.</li>
                    <li>Use k to compute y2 = k * x2.</li>
                    <li>Check that the line passes through the origin.</li>
                  </ol>
                </>
              ) : (
                <>
                  <h4>ELI5: Direct Variation</h4>
                  <p className="steps">
                    This is about things that grow together at a steady pace.
                  </p>
                  <ul className="steps">
                    <li>
                      <strong>Direct:</strong> If "A" gets bigger, "B" gets bigger too. Like
                      the more candy you buy, the more money you pay.
                    </li>
                    <li>
                      <strong>k (Constant):</strong> The price for one piece of candy. It never
                      changes!
                    </li>
                  </ul>
                  <p className="steps" style={{ marginTop: '8px' }}>
                    <strong>Real world:</strong> If you double the recipe for a cake, you need
                    double the eggs. That's direct variation.
                  </p>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {activeTab === 'inverse' && (
        <Reveal>
          <div className="chapter-split" id="ch4-inverse" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Inverse Variation">
                <p className="sub-intro">
                  Inverse variation means when x goes up, y goes down. The constant k stays the same for
                  every pair.
                </p>
                <div className="field-grid">
                  <div>
                    <label htmlFor="inverse-x1">x1</label>
                    <input
                      id="inverse-x1"
                      value={inverseValues.x1}
                      onChange={(event) => setInverseValues({ ...inverseValues, x1: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="inverse-y1">y1</label>
                    <input
                      id="inverse-y1"
                      value={inverseValues.y1}
                      onChange={(event) => setInverseValues({ ...inverseValues, y1: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="inverse-x2">x2</label>
                    <input
                      id="inverse-x2"
                      value={inverseValues.x2}
                      onChange={(event) => setInverseValues({ ...inverseValues, x2: event.target.value })}
                    />
                  </div>
                </div>
                <button className="action" type="button" onClick={handleInverse}>
                  Solve inverse variation
                </button>
                {inverseOutput && <div className="result">{inverseOutput}</div>}
              </Container>
              {inverseChart && (
                <Container title="Graph">
                  <div className="chart-wrap" style={{ marginTop: 0, border: 'none', padding: 0, background: 'transparent' }}>
                    <ChartCanvas config={inverseChart} height={220} theme={theme} />
                  </div>
                </Container>
              )}
              <Container>
                <div className="explain">
                  <strong>Example:</strong> If y=60 when x=2, k=120 and y=40 when x=3.
                </div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button
                  className="explainer-tab"
                  aria-selected={inverseExp === 'steps'}
                  onClick={() => setInverseExp('steps')}
                >
                  Steps
                </button>
                <button
                  className="explainer-tab"
                  aria-selected={inverseExp === 'lazy'}
                  onClick={() => setInverseExp('lazy')}
                >
                  Lazyplain
                </button>
              </div>

              {inverseExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`y=\frac{k}{x}`} />
                  <ol className="steps">
                    <li>Find k by multiplying x1 * y1.</li>
                    <li>Compute y2 = k / x2.</li>
                    <li>As x increases, y decreases.</li>
                  </ol>
                </>
              ) : (
                <>
                  <h4>ELI5: Inverse Variation</h4>
                  <p className="steps">
                    This is about things that work in opposite ways.
                  </p>
                  <ul className="steps">
                    <li>
                      <strong>Inverse:</strong> If one thing goes UP, the other thing goes
                      DOWN.
                    </li>
                    <li>
                      <strong>Example:</strong> The more people helping to clean a room, the
                      LESS time it takes.
                    </li>
                  </ul>
                  <p className="steps" style={{ marginTop: '8px' }}>
                    <strong>The Secret:</strong> If you multiply the two things together (Speed
                    x Time), you always get the same magic number <strong>k</strong>!
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
