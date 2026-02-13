import { useState } from 'react';
import { BlockMath } from 'react-katex';
import { Mafs, Coordinates, Point, Line, Text } from 'mafs';
import Container from '../components/Container';
import Reveal from '../components/Reveal';
import * as math from '../lib/math';

const subTabs = [
  { id: 'gradient', label: 'Gradient' },
  { id: 'distance', label: 'Distance' },
  { id: 'midpoint', label: 'Midpoint' },
  { id: 'equation', label: 'Equation' },
  { id: 'analysis', label: 'Analysis' },
];

export default function Chapter1() {
  const [activeTab, setActiveTab] = useState(subTabs[0].id);

  // Gradient
  const [gradInputs, setGradInputs] = useState({ x1: '2', y1: '3', x2: '5', y2: '9' });
  const [gradResult, setGradResult] = useState('');
  const [gradExp, setGradExp] = useState('steps');

  // Distance
  const [distInputs, setDistInputs] = useState({ x1: '-1', y1: '4', x2: '3', y2: '1' });
  const [distResult, setDistResult] = useState('');
  const [distExp, setDistExp] = useState('steps');

  // Midpoint
  const [midInputs, setMidInputs] = useState({ x1: '2', y1: '3', x2: '8', y2: '7' });
  const [midResult, setMidResult] = useState('');
  const [midExp, setMidExp] = useState('steps');

  // Equation
  const [eqInputs, setEqInputs] = useState({ x1: '1', y1: '2', x2: '3', y2: '6' });
  const [eqResult, setEqResult] = useState('');
  const [eqExp, setEqExp] = useState('steps');

  // Analysis
  const [anaInputs, setAnaInputs] = useState({ m1: '2', m2: '-0.5' });
  const [anaResult, setAnaResult] = useState('');
  const [anaExp, setAnaExp] = useState('steps');

  const handleGradient = () => {
    const result = math.calculateGradient(
      Number(gradInputs.x1), Number(gradInputs.y1),
      Number(gradInputs.x2), Number(gradInputs.y2)
    );
    setGradResult(result.isVertical ? 'Undefined (vertical line)' : `m = ${result.gradient.toFixed(4)}`);
  };

  const handleDistance = () => {
    const result = math.calculateDistance(
      Number(distInputs.x1), Number(distInputs.y1),
      Number(distInputs.x2), Number(distInputs.y2)
    );
    setDistResult(`Distance = ${result.distance.toFixed(4)} units`);
  };

  const handleMidpoint = () => {
    const result = math.calculateMidpoint(
      Number(midInputs.x1), Number(midInputs.y1),
      Number(midInputs.x2), Number(midInputs.y2)
    );
    setMidResult(`Midpoint = (${result.x.toFixed(2)}, ${result.y.toFixed(2)})`);
  };

  const handleEquation = () => {
    const result = math.findLineEquation(
      Number(eqInputs.x1), Number(eqInputs.y1),
      Number(eqInputs.x2), Number(eqInputs.y2)
    );
    setEqResult(`Equation: ${result.equation}`);
  };

  const handleAnalysis = () => {
    const result = math.analyzeLines(Number(anaInputs.m1), Number(anaInputs.m2));
    setAnaResult(`Lines are ${result.relationship.toUpperCase()}\n${result.explanation}`);
  };

  return (
    <section className="section-stack">
      <div className="mini-tabs" role="tablist">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            className="mini-tab"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'gradient' && (
        <Reveal>
          <div className="chapter-split" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Gradient of a Line">
                <p className="sub-intro">
                  The gradient (slope) measures how steep a line is. Formula: m = (y₂ - y₁) / (x₂ - x₁)
                </p>
                <div className="field-grid">
                  <div>
                    <label htmlFor="grad-x1">x₁</label>
                    <input id="grad-x1" value={gradInputs.x1} onChange={(e) => setGradInputs({ ...gradInputs, x1: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="grad-y1">y₁</label>
                    <input id="grad-y1" value={gradInputs.y1} onChange={(e) => setGradInputs({ ...gradInputs, y1: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="grad-x2">x₂</label>
                    <input id="grad-x2" value={gradInputs.x2} onChange={(e) => setGradInputs({ ...gradInputs, x2: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="grad-y2">y₂</label>
                    <input id="grad-y2" value={gradInputs.y2} onChange={(e) => setGradInputs({ ...gradInputs, y2: e.target.value })} />
                  </div>
                </div>
                <button className="action" type="button" onClick={handleGradient}>Calculate Gradient</button>
                {gradResult && <div className="result">{gradResult}</div>}
              </Container>

              <Container title="Visualization">
                <div style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '4px' }}>
                  <Mafs viewBox={{ x: [-2, 10], y: [-2, 12] }} height={300}>
                    <Coordinates.Cartesian
                      xAxis={{ labels: (n) => n, lines: 1 }}
                      yAxis={{ labels: (n) => n, lines: 1 }}
                    />
                    <Point x={Number(gradInputs.x1)} y={Number(gradInputs.y1)} color="#f5b623" />
                    <Point x={Number(gradInputs.x2)} y={Number(gradInputs.y2)} color="#f5b623" />
                    <Line.ThroughPoints
                      point1={[Number(gradInputs.x1), Number(gradInputs.y1)]}
                      point2={[Number(gradInputs.x2), Number(gradInputs.y2)]}
                      color="#e05a4f"
                      weight={2}
                    />
                    <Text x={Number(gradInputs.x1)} y={Number(gradInputs.y1) + 0.5} attach="n" size={14}>
                      P₁({gradInputs.x1}, {gradInputs.y1})
                    </Text>
                    <Text x={Number(gradInputs.x2)} y={Number(gradInputs.y2) + 0.5} attach="n" size={14}>
                      P₂({gradInputs.x2}, {gradInputs.y2})
                    </Text>
                    <Text x={9.5} y={-0.5} size={16} color="var(--text)">x</Text>
                    <Text x={-0.5} y={11.5} size={16} color="var(--text)">y</Text>
                  </Mafs>
                </div>
              </Container>

              <Container>
                <div className="explain">
                  <strong>How to use:</strong> Enter two points. The gradient tells you how much y changes for each unit change in x.
                </div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button className="explainer-tab" aria-selected={gradExp === 'steps'} onClick={() => setGradExp('steps')}>Steps</button>
                <button className="explainer-tab" aria-selected={gradExp === 'lazy'} onClick={() => setGradExp('lazy')}>Lazyplain</button>
              </div>

              {gradExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`m = \frac{y_2 - y_1}{x_2 - x_1}`} />
                  <ol className="steps">
                    <li>Identify points: P₁(x₁, y₁) and P₂(x₂, y₂)</li>
                    <li>Subtract y-coordinates: y₂ - y₁</li>
                    <li>Subtract x-coordinates: x₂ - x₁</li>
                    <li>Divide: (y₂ - y₁) / (x₂ - x₁)</li>
                  </ol>
                  <p className="steps"><strong>Example:</strong> (2, 3) and (5, 9)</p>
                  <BlockMath math={String.raw`m = \frac{9-3}{5-2} = \frac{6}{3} = 2`} />
                </>
              ) : (
                <>
                  <h4>ELI5: Gradient</h4>
                  <p className="steps">Think of <strong>gradient</strong> like climbing a hill. It tells you how steep it is!</p>
                  <ul className="steps">
                    <li><strong>Positive:</strong> Going uphill</li>
                    <li><strong>Negative:</strong> Going downhill</li>
                    <li><strong>Zero:</strong> Flat ground</li>
                    <li><strong>Undefined:</strong> A cliff (vertical)</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {activeTab === 'distance' && (
        <Reveal>
          <div className="chapter-split" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Distance Between Points">
                <p className="sub-intro">Find straight-line distance using Pythagoras theorem.</p>
                <div className="field-grid">
                  <div><label htmlFor="dist-x1">x₁</label><input id="dist-x1" value={distInputs.x1} onChange={(e) => setDistInputs({ ...distInputs, x1: e.target.value })} /></div>
                  <div><label htmlFor="dist-y1">y₁</label><input id="dist-y1" value={distInputs.y1} onChange={(e) => setDistInputs({ ...distInputs, y1: e.target.value })} /></div>
                  <div><label htmlFor="dist-x2">x₂</label><input id="dist-x2" value={distInputs.x2} onChange={(e) => setDistInputs({ ...distInputs, x2: e.target.value })} /></div>
                  <div><label htmlFor="dist-y2">y₂</label><input id="dist-y2" value={distInputs.y2} onChange={(e) => setDistInputs({ ...distInputs, y2: e.target.value })} /></div>
                </div>
                <button className="action" type="button" onClick={handleDistance}>Calculate Distance</button>
                {distResult && <div className="result">{distResult}</div>}
              </Container>

              <Container title="Visualization">
                <div style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '4px' }}>
                  <Mafs viewBox={{ x: [-3, 5], y: [-1, 6] }} height={280}>
                    <Coordinates.Cartesian
                      xAxis={{ labels: (n) => n, lines: 1 }}
                      yAxis={{ labels: (n) => n, lines: 1 }}
                    />
                    <Point x={Number(distInputs.x1)} y={Number(distInputs.y1)} color="#f5b623" />
                    <Point x={Number(distInputs.x2)} y={Number(distInputs.y2)} color="#f5b623" />
                    <Line.Segment
                      point1={[Number(distInputs.x1), Number(distInputs.y1)]}
                      point2={[Number(distInputs.x2), Number(distInputs.y2)]}
                      color="#e05a4f" weight={2}
                    />
                    <Text x={Number(distInputs.x1)} y={Number(distInputs.y1) + 0.5} attach="n" size={14}>
                      A({distInputs.x1}, {distInputs.y1})
                    </Text>
                    <Text x={Number(distInputs.x2)} y={Number(distInputs.y2) + 0.5} attach="n" size={14}>
                      B({distInputs.x2}, {distInputs.y2})
                    </Text>
                    <Text x={4.5} y={-0.5} size={16} color="var(--text)">x</Text>
                    <Text x={-0.5} y={5.5} size={16} color="var(--text)">y</Text>
                  </Mafs>
                </div>
              </Container>

              <Container>
                <div className="explain"><strong>Example:</strong> Distance from (-1, 4) to (3, 1) = 5 units</div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button className="explainer-tab" aria-selected={distExp === 'steps'} onClick={() => setDistExp('steps')}>Steps</button>
                <button className="explainer-tab" aria-selected={distExp === 'lazy'} onClick={() => setDistExp('lazy')}>Lazyplain</button>
              </div>

              {distExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}`} />
                  <ol className="steps">
                    <li>Find difference in x: (x₂ - x₁)</li>
                    <li>Find difference in y: (y₂ - y₁)</li>
                    <li>Square both differences</li>
                    <li>Add the squares</li>
                    <li>Take square root</li>
                  </ol>
                  <BlockMath math={String.raw`d = \sqrt{(3-(-1))^2 + (1-4)^2} = \sqrt{25} = 5`} />
                </>
              ) : (
                <>
                  <h4>ELI5: Distance</h4>
                  <p className="steps">The <strong>distance formula</strong> finds the shortest path between two points - a straight line!</p>
                  <ul className="steps">
                    <li>Like measuring with a ruler on a map</li>
                    <li>Uses Pythagoras theorem</li>
                    <li>Always positive</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {activeTab === 'midpoint' && (
        <Reveal>
          <div className="chapter-split" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Midpoint of Line Segment">
                <p className="sub-intro">Find the exact center point between two points.</p>
                <div className="field-grid">
                  <div><label htmlFor="mid-x1">x₁</label><input id="mid-x1" value={midInputs.x1} onChange={(e) => setMidInputs({ ...midInputs, x1: e.target.value })} /></div>
                  <div><label htmlFor="mid-y1">y₁</label><input id="mid-y1" value={midInputs.y1} onChange={(e) => setMidInputs({ ...midInputs, y1: e.target.value })} /></div>
                  <div><label htmlFor="mid-x2">x₂</label><input id="mid-x2" value={midInputs.x2} onChange={(e) => setMidInputs({ ...midInputs, x2: e.target.value })} /></div>
                  <div><label htmlFor="mid-y2">y₂</label><input id="mid-y2" value={midInputs.y2} onChange={(e) => setMidInputs({ ...midInputs, y2: e.target.value })} /></div>
                </div>
                <button className="action" type="button" onClick={handleMidpoint}>Calculate Midpoint</button>
                {midResult && <div className="result">{midResult}</div>}
              </Container>

              <Container title="Visualization">
                <div style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '4px' }}>
                  <Mafs viewBox={{ x: [0, 10], y: [0, 10] }} height={280}>
                    <Coordinates.Cartesian
                      xAxis={{ labels: (n) => n, lines: 1 }}
                      yAxis={{ labels: (n) => n, lines: 1 }}
                    />
                    <Point x={Number(midInputs.x1)} y={Number(midInputs.y1)} color="#f5b623" />
                    <Point x={Number(midInputs.x2)} y={Number(midInputs.y2)} color="#f5b623" />
                    <Point x={(Number(midInputs.x1) + Number(midInputs.x2)) / 2} y={(Number(midInputs.y1) + Number(midInputs.y2)) / 2} color="#10b981" />
                    <Line.Segment
                      point1={[Number(midInputs.x1), Number(midInputs.y1)]}
                      point2={[Number(midInputs.x2), Number(midInputs.y2)]}
                      color="#e05a4f" weight={2}
                    />
                    <Text x={Number(midInputs.x1)} y={Number(midInputs.y1) + 0.5} attach="n" size={14}>
                      A({midInputs.x1}, {midInputs.y1})
                    </Text>
                    <Text x={Number(midInputs.x2)} y={Number(midInputs.y2) + 0.5} attach="n" size={14}>
                      B({midInputs.x2}, {midInputs.y2})
                    </Text>
                    <Text x={(Number(midInputs.x1) + Number(midInputs.x2)) / 2} y={(Number(midInputs.y1) + Number(midInputs.y2)) / 2 - 0.7} attach="s" size={14} color="#10b981">
                      M
                    </Text>
                    <Text x={9.5} y={-0.5} size={16} color="var(--text)">x</Text>
                    <Text x={-0.5} y={9.5} size={16} color="var(--text)">y</Text>
                  </Mafs>
                </div>
              </Container>

              <Container>
                <div className="explain"><strong>How to use:</strong> The midpoint is exactly halfway between the two points.</div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button className="explainer-tab" aria-selected={midExp === 'steps'} onClick={() => setMidExp('steps')}>Steps</button>
                <button className="explainer-tab" aria-selected={midExp === 'lazy'} onClick={() => setMidExp('lazy')}>Lazyplain</button>
              </div>

              {midExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`M = \left(\frac{x_1+x_2}{2}, \frac{y_1+y_2}{2}\right)`} />
                  <ol className="steps">
                    <li>Add the x-coordinates: x₁ + x₂</li>
                    <li>Divide by 2 to get x-coordinate of midpoint</li>
                    <li>Add the y-coordinates: y₁ + y₂</li>
                    <li>Divide by 2 to get y-coordinate of midpoint</li>
                  </ol>
                  <BlockMath math={String.raw`M = \left(\frac{2+8}{2}, \frac{3+7}{2}\right) = (5, 5)`} />
                </>
              ) : (
                <>
                  <h4>ELI5: Midpoint</h4>
                  <p className="steps">The <strong>midpoint</strong> is like finding the middle of a seesaw - perfectly balanced!</p>
                  <ul className="steps">
                    <li>Average the x-coordinates</li>
                    <li>Average the y-coordinates</li>
                    <li>That's your center point!</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {activeTab === 'equation' && (
        <Reveal>
          <div className="chapter-split" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Equation of a Line">
                <p className="sub-intro">Find the equation in form y = mx + c</p>
                <div className="field-grid">
                  <div><label htmlFor="eq-x1">x₁</label><input id="eq-x1" value={eqInputs.x1} onChange={(e) => setEqInputs({ ...eqInputs, x1: e.target.value })} /></div>
                  <div><label htmlFor="eq-y1">y₁</label><input id="eq-y1" value={eqInputs.y1} onChange={(e) => setEqInputs({ ...eqInputs, y1: e.target.value })} /></div>
                  <div><label htmlFor="eq-x2">x₂</label><input id="eq-x2" value={eqInputs.x2} onChange={(e) => setEqInputs({ ...eqInputs, x2: e.target.value })} /></div>
                  <div><label htmlFor="eq-y2">y₂</label><input id="eq-y2" value={eqInputs.y2} onChange={(e) => setEqInputs({ ...eqInputs, y2: e.target.value })} /></div>
                </div>
                <button className="action" type="button" onClick={handleEquation}>Find Equation</button>
                {eqResult && <div className="result">{eqResult}</div>}
              </Container>

              <Container title="Visualization">
                <div style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '4px' }}>
                  <Mafs viewBox={{ x: [-2, 10], y: [-2, 12] }} height={300}>
                    <Coordinates.Cartesian
                      xAxis={{ labels: (n) => n, lines: 1 }}
                      yAxis={{ labels: (n) => n, lines: 1 }}
                    />
                    <Point x={Number(eqInputs.x1)} y={Number(eqInputs.y1)} color="#f5b623" />
                    <Point x={Number(eqInputs.x2)} y={Number(eqInputs.y2)} color="#f5b623" />
                    <Line.ThroughPoints
                      point1={[Number(eqInputs.x1), Number(eqInputs.y1)]}
                      point2={[Number(eqInputs.x2), Number(eqInputs.y2)]}
                      color="#e05a4f"
                      weight={2}
                    />
                    <Text x={Number(eqInputs.x1)} y={Number(eqInputs.y1) + 0.5} attach="n" size={14}>
                      A({eqInputs.x1}, {eqInputs.y1})
                    </Text>
                    <Text x={Number(eqInputs.x2)} y={Number(eqInputs.y2) + 0.5} attach="n" size={14}>
                      B({eqInputs.x2}, {eqInputs.y2})
                    </Text>
                    <Text x={9.5} y={-0.5} size={16} color="var(--text)">x</Text>
                    <Text x={-0.5} y={11.5} size={16} color="var(--text)">y</Text>
                  </Mafs>
                </div>
              </Container>

              <Container>
                <div className="explain"><strong>Example:</strong> Points (1, 2) and (3, 6) give y = 2x + 0</div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button className="explainer-tab" aria-selected={eqExp === 'steps'} onClick={() => setEqExp('steps')}>Steps</button>
                <button className="explainer-tab" aria-selected={eqExp === 'lazy'} onClick={() => setEqExp('lazy')}>Lazyplain</button>
              </div>

              {eqExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`y = mx + c`} />
                  <ol className="steps">
                    <li>Calculate gradient m = (y₂ - y₁) / (x₂ - x₁)</li>
                    <li>Use one point in y = mx + c</li>
                    <li>Solve for c: c = y - mx</li>
                    <li>Write final equation</li>
                  </ol>
                </>
              ) : (
                <>
                  <h4>ELI5: Line Equation</h4>
                  <p className="steps">The equation <strong>y = mx + c</strong> is like a recipe for drawing a line!</p>
                  <ul className="steps">
                    <li><strong>m</strong> is the gradient (steepness)</li>
                    <li><strong>c</strong> is where it crosses the y-axis</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {activeTab === 'analysis' && (
        <Reveal>
          <div className="chapter-split" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Parallel & Perpendicular Lines">
                <p className="sub-intro">Analyze relationship between two lines using gradients.</p>
                <div className="field-grid">
                  <div><label htmlFor="ana-m1">Gradient m₁</label><input id="ana-m1" value={anaInputs.m1} onChange={(e) => setAnaInputs({ ...anaInputs, m1: e.target.value })} /></div>
                  <div><label htmlFor="ana-m2">Gradient m₂</label><input id="ana-m2" value={anaInputs.m2} onChange={(e) => setAnaInputs({ ...anaInputs, m2: e.target.value })} /></div>
                </div>
                <button className="action" type="button" onClick={handleAnalysis}>Analyze Lines</button>
                {anaResult && <div className="result">{anaResult}</div>}
              </Container>

              <Container title="Visualization">
                <div style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '4px' }}>
                  <Mafs viewBox={{ x: [-5, 5], y: [-5, 5] }} height={300}>
                    <Coordinates.Cartesian
                      xAxis={{ labels: (n) => n, lines: 1 }}
                      yAxis={{ labels: (n) => n, lines: 1 }}
                    />
                    {/* Line 1: y = m1x */}
                    <Line.ThroughPoints
                      point1={[0, 0]}
                      point2={[1, Number(anaInputs.m1) || 0]}
                      color="#f5b623"
                      weight={2}
                    />
                    {/* Line 2: y = m2x */}
                    <Line.ThroughPoints
                      point1={[0, 0]}
                      point2={[1, Number(anaInputs.m2) || 0]}
                      color="#e05a4f"
                      weight={2}
                    />
                    <Text x={2} y={2 * Number(anaInputs.m1) + 0.5} size={14} color="#f5b623">L₁</Text>
                    <Text x={2} y={2 * Number(anaInputs.m2) + 0.5} size={14} color="#e05a4f">L₂</Text>
                    <Text x={4.5} y={-0.5} size={16} color="var(--text)">x</Text>
                    <Text x={-0.5} y={4.5} size={16} color="var(--text)">y</Text>
                  </Mafs>
                </div>
              </Container>

              <Container>
                <div className="explain"><strong>Rules:</strong> Parallel if m₁ = m₂, Perpendicular if m₁ × m₂ = -1</div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button className="explainer-tab" aria-selected={anaExp === 'steps'} onClick={() => setAnaExp('steps')}>Steps</button>
                <button className="explainer-tab" aria-selected={anaExp === 'lazy'} onClick={() => setAnaExp('lazy')}>Lazyplain</button>
              </div>

              {anaExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <ol className="steps">
                    <li>Check if m₁ = m₂ → Lines are PARALLEL</li>
                    <li>Check if m₁ × m₂ = -1 → Lines are PERPENDICULAR</li>
                    <li>Otherwise → Lines just intersect</li>
                  </ol>
                  <p className="steps"><strong>Example:</strong> m₁ = 2, m₂ = -0.5</p>
                  <BlockMath math={String.raw`2 \times (-0.5) = -1 \text{ → Perpendicular}`} />
                </>
              ) : (
                <>
                  <h4>ELI5: Line Relationships</h4>
                  <ul className="steps">
                    <li><strong>Parallel:</strong> Like train tracks - never meet!</li>
                    <li><strong>Perpendicular:</strong> Like a plus sign - meet at 90°</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}
    </section>
  );
}
