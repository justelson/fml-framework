import { useState } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import { Mafs, Coordinates, Polygon, Circle, Text, Line } from 'mafs';
import Container from '../components/Container';
import Reveal from '../components/Reveal';
import * as math from '../lib/math';

const subTabs = [
  { id: 'triangle', label: 'Triangles' },
  { id: 'circle', label: 'Circles' },
  { id: 'rectangle', label: 'Quadrilaterals' },
];

export default function Chapter2() {
  const [activeTab, setActiveTab] = useState(subTabs[0].id);

  // Triangle
  const [triInputs, setTriInputs] = useState({ base: '10', height: '5' });
  const [triResult, setTriResult] = useState(null);
  const [triExp, setTriExp] = useState('steps');

  // Circle
  const [circInputs, setCircInputs] = useState({ radius: '7' });
  const [circResult, setCircResult] = useState(null);
  const [circExp, setCircExp] = useState('steps');

  // Rectangle
  const [rectInputs, setRectInputs] = useState({ length: '8', width: '4' });
  const [rectResult, setRectResult] = useState(null);
  const [rectExp, setRectExp] = useState('steps');

  const handleTriangle = () => {
    const res = math.calculateTriangleArea(Number(triInputs.base), Number(triInputs.height));
    setTriResult(res);
  };

  const handleCircle = () => {
    const res = math.calculateCircleProperties(Number(circInputs.radius));
    setCircResult(res);
  };

  const handleRectangle = () => {
    const res = math.calculateRectangleProperties(Number(rectInputs.length), Number(rectInputs.width));
    setRectResult(res);
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

      {activeTab === 'triangle' && (
        <Reveal>
          <div className="chapter-split">
            <div className="chapter-work-area">
              <Container title="Triangle Area">
                <p className="sub-intro">Calculate area using base and height.</p>
                <div className="field-grid">
                  <div><label>Base</label><input value={triInputs.base} onChange={e => setTriInputs({ ...triInputs, base: e.target.value })} /></div>
                  <div><label>Height</label><input value={triInputs.height} onChange={e => setTriInputs({ ...triInputs, height: e.target.value })} /></div>
                </div>
                <button className="action" onClick={handleTriangle}>Calculate</button>
                {triResult && <div className="result">Area: {triResult.area.toFixed(2)} units²</div>}
              </Container>

              <Container title="Visualization">
                <div style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '4px' }}>
                  <Mafs viewBox={{ x: [-1, Number(triInputs.base) + 2], y: [-1, Number(triInputs.height) + 2] }} height={300}>
                    <Coordinates.Cartesian
                      xAxis={{ labels: (n) => n, lines: 1 }}
                      yAxis={{ labels: (n) => n, lines: 1 }}
                    />
                    {triResult && (
                      <>
                        <Polygon
                          points={[
                            [0, 0],
                            [Number(triInputs.base), 0],
                            [Number(triInputs.base) / 2, Number(triInputs.height)]
                          ]}
                          color="#f5b623"
                        />
                        <Text x={0} y={-0.5} attach="s" size={14}>A(0,0)</Text>
                        <Text x={Number(triInputs.base)} y={-0.5} attach="s" size={14}>B({triInputs.base},0)</Text>
                        <Text x={Number(triInputs.base) / 2} y={Number(triInputs.height) + 0.5} attach="n" size={14}>C({Number(triInputs.base) / 2}, {triInputs.height})</Text>
                        {/* Base label */}
                        <Text x={Number(triInputs.base) / 2} y={-0.7} size={12} color="var(--muted)">base = {triInputs.base}</Text>
                        {/* Height indicator */}
                        <Line.Segment point1={[Number(triInputs.base) / 2, 0]} point2={[Number(triInputs.base) / 2, Number(triInputs.height)]} style="dashed" color="var(--muted)" />
                        <Text x={Number(triInputs.base) / 2 + 0.3} y={Number(triInputs.height) / 2} size={12} color="var(--muted)">h = {triInputs.height}</Text>
                      </>
                    )}
                    <Text x={Number(triInputs.base) + 1.5} y={-0.5} size={16} color="var(--text)">x</Text>
                    <Text x={-0.5} y={Number(triInputs.height) + 1.5} size={16} color="var(--text)">y</Text>
                  </Mafs>
                </div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button className="explainer-tab" aria-selected={triExp === 'steps'} onClick={() => setTriExp('steps')}>Steps</button>
                <button className="explainer-tab" aria-selected={triExp === 'lazy'} onClick={() => setTriExp('lazy')}>Lazyplain</button>
              </div>

              {triExp === 'steps' ? (
                <>
                  <h4>Formula</h4>
                  <BlockMath math={String.raw`Area = \frac{1}{2} \times base \times height`} />
                </>
              ) : (
                <>
                  <h4>ELI5: Triangle Area</h4>
                  <p className="steps">Think of a triangle as <strong>half a rectangle</strong>.</p>
                  <ul className="steps">
                    <li><InlineMath math="b" /> = base (bottom of the shape: {triInputs.base})</li>
                    <li><InlineMath math="h" /> = height (how tall it is: {triInputs.height})</li>
                    <li>Make a full rectangle (<InlineMath math="b \times h" />), then cut it in half!</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {activeTab === 'circle' && (
        <Reveal>
          <div className="chapter-split">
            <div className="chapter-work-area">
              <Container title="Circle Properties">
                <div className="field-grid">
                  <div><label>Radius</label><input value={circInputs.radius} onChange={e => setCircInputs({ ...circInputs, radius: e.target.value })} /></div>
                </div>
                <button className="action" onClick={handleCircle}>Calculate</button>
                {circResult && (
                  <div className="result">
                    Area: {circResult.area.toFixed(2)}<br />
                    Circumference: {circResult.circumference.toFixed(2)}
                  </div>
                )}
              </Container>
              <Container title="Visual">
                <div style={{ background: 'var(--panel-2)', padding: '1rem' }}>
                  <Mafs viewBox={{ x: [-12, 12], y: [-12, 12] }} height={280}>
                    <Coordinates.Cartesian
                      xAxis={{ labels: (n) => n, lines: 1 }}
                      yAxis={{ labels: (n) => n, lines: 1 }}
                    />
                    <Circle center={[0, 0]} radius={Number(circInputs.radius)} color="#e05a4f" />
                    {/* Radius line */}
                    <Line.Segment point1={[0, 0]} point2={[Number(circInputs.radius), 0]} color="#10b981" weight={2} />
                    <Text x={Number(circInputs.radius) / 2} y={0.5} size={14} color="#10b981">r = {circInputs.radius}</Text>
                    <Text x={11.5} y={-0.5} size={16} color="var(--text)">x</Text>
                    <Text x={-0.5} y={11.5} size={16} color="var(--text)">y</Text>
                  </Mafs>
                </div>
              </Container>
            </div>
            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button className="explainer-tab" aria-selected={circExp === 'steps'} onClick={() => setCircExp('steps')}>Steps</button>
                <button className="explainer-tab" aria-selected={circExp === 'lazy'} onClick={() => setCircExp('lazy')}>Lazyplain</button>
              </div>

              {circExp === 'steps' ? (
                <>
                  <h4>Formulas</h4>
                  <BlockMath math={String.raw`A = \pi r^2`} />
                  <BlockMath math={String.raw`C = 2 \pi r`} />
                </>
              ) : (
                <>
                  <h4>ELI5: Circles</h4>
                  <p className="steps"><strong>Area:</strong> How much pizza you get to eat.</p>
                  <ul className="steps">
                    <li><InlineMath math="r" /> = radius (center to edge: {circInputs.radius})</li>
                    <li><InlineMath math="\pi" /> = roughly 3.14 (magic circle number)</li>
                    <li>Area grows super fast because <InlineMath math="r" /> is squared!</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {activeTab === 'rectangle' && (
        <Reveal>
          <div className="chapter-split">
            <div className="chapter-work-area">
              <Container title="Rectangle Properties">
                <div className="field-grid">
                  <div><label>Length</label><input value={rectInputs.length} onChange={e => setRectInputs({ ...rectInputs, length: e.target.value })} /></div>
                  <div><label>Width</label><input value={rectInputs.width} onChange={e => setRectInputs({ ...rectInputs, width: e.target.value })} /></div>
                </div>
                <button className="action" onClick={handleRectangle}>Calculate</button>
                {rectResult && <div className="result">Area: {rectResult.area}<br />Perimeter: {rectResult.perimeter}</div>}
              </Container>
              <Container title="Visual">
                <div style={{ background: 'var(--panel-2)', padding: '1rem' }}>
                  <Mafs viewBox={{ x: [-1, Number(rectInputs.length) + 2], y: [-1, Number(rectInputs.width) + 2] }} height={280}>
                    <Coordinates.Cartesian
                      xAxis={{ labels: (n) => n, lines: 1 }}
                      yAxis={{ labels: (n) => n, lines: 1 }}
                    />
                    <Polygon
                      points={[
                        [0, 0],
                        [Number(rectInputs.length), 0],
                        [Number(rectInputs.length), Number(rectInputs.width)],
                        [0, Number(rectInputs.width)]
                      ]}
                      color="#4facfe"
                    />
                    <Text x={0} y={-0.5} attach="s" size={14}>A</Text>
                    <Text x={Number(rectInputs.length)} y={-0.5} attach="s" size={14}>B</Text>
                    <Text x={Number(rectInputs.length)} y={Number(rectInputs.width) + 0.5} attach="n" size={14}>C</Text>
                    <Text x={0} y={Number(rectInputs.width) + 0.5} attach="n" size={14}>D</Text>
                    {/* Dimensions */}
                    <Text x={Number(rectInputs.length) / 2} y={-0.8} size={12} color="var(--muted)">l = {rectInputs.length}</Text>
                    <Text x={Number(rectInputs.length) + 0.5} y={Number(rectInputs.width) / 2} size={12} color="var(--muted)" transform="rotate(90)">w = {rectInputs.width}</Text>
                    <Text x={Number(rectInputs.length) + 1.5} y={-0.5} size={16} color="var(--text)">x</Text>
                    <Text x={-0.5} y={Number(rectInputs.width) + 1.5} size={16} color="var(--text)">y</Text>
                  </Mafs>
                </div>
              </Container>
            </div>
            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button className="explainer-tab" aria-selected={rectExp === 'steps'} onClick={() => setRectExp('steps')}>Steps</button>
                <button className="explainer-tab" aria-selected={rectExp === 'lazy'} onClick={() => setRectExp('lazy')}>Lazyplain</button>
              </div>

              {rectExp === 'steps' ? (
                <>
                  <h4>Formulas</h4>
                  <BlockMath math={String.raw`A = l \times w`} />
                  <BlockMath math={String.raw`P = 2(l + w)`} />
                </>
              ) : (
                <>
                  <h4>ELI5: Rectangles</h4>
                  <p className="steps"><strong>Area:</strong> Imagine tiling a floor. You count lines of tiles.</p>
                  <ul className="steps">
                    <li><InlineMath math="l" /> = length (how long it is: {rectInputs.length})</li>
                    <li><InlineMath math="w" /> = width (how wide it is: {rectInputs.width})</li>
                    <li>Multiply them to get total tiles!</li>
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
