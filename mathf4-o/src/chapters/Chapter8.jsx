import { useState } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import { Mafs, Coordinates, Text, Plot, Point } from 'mafs';
import Container from '../components/Container';
import Reveal from '../components/Reveal';

export default function Chapter8() {
    const [ineq1, setIneq1] = useState(3); // y <= 3
    const [ineq2, setIneq2] = useState(4); // x <= 4
    const [lpExp, setLpExp] = useState('steps');

    return (
        <section className="section-stack">
            <Reveal>
                <div className="chapter-split">
                    <div className="chapter-work-area">
                        <Container title="Region Visualizer">
                            <p>Adjust bounds:</p>
                            <div className="field-grid">
                                <div><label>Max Y</label><input type="number" value={ineq1} onChange={e => setIneq1(Number(e.target.value))} /></div>
                                <div><label>Max X</label><input type="number" value={ineq2} onChange={e => setIneq2(Number(e.target.value))} /></div>
                            </div>
                        </Container>

                        <Container title="Feasible Region">
                            <div style={{ background: 'var(--panel-2)', padding: '1rem' }}>
                                <Mafs viewBox={{ x: [-1, Math.max(ineq2, 5) + 2], y: [-1, Math.max(ineq1, 5) + 2] }} height={350}>
                                    <Coordinates.Cartesian
                                        xAxis={{ labels: (n) => n, lines: 1 }}
                                        yAxis={{ labels: (n) => n, lines: 1 }}
                                    />

                                    {/* Inequalities */}
                                    <Plot.Inequality
                                        y={{ "<=": ineq1 }}
                                        color="#4facfe"
                                        opacity={0.1}
                                    />
                                    <Plot.Inequality
                                        x={{ "<=": ineq2 }}
                                        color="#e05a4f"
                                        opacity={0.1}
                                    />
                                    <Plot.Inequality x={{ ">=": 0 }} color="#f5b623" opacity={0.05} />
                                    <Plot.Inequality y={{ ">=": 0 }} color="#f5b623" opacity={0.05} />

                                    {/* Boundary Lines */}
                                    <Plot.OfX y={() => ineq1} color="#4facfe" weight={2} />
                                    <Plot.OfY x={() => ineq2} color="#e05a4f" weight={2} />

                                    {/* Corner Points */}
                                    <Point x={0} y={0} color="var(--text)" />
                                    <Point x={0} y={ineq1} color="var(--text)" />
                                    <Point x={ineq2} y={0} color="var(--text)" />
                                    <Point x={ineq2} y={ineq1} color="#10b981" weight={3} />

                                    <Text x={0} y={-0.5} attach="s" size={12}>(0,0)</Text>
                                    <Text x={0} y={ineq1 + 0.5} attach="n" size={12}>(0,{ineq1})</Text>
                                    <Text x={ineq2} y={-0.5} attach="s" size={12}>({ineq2},0)</Text>
                                    <Text x={ineq2} y={ineq1 + 0.5} attach="n" size={12}>( {ineq2}, {ineq1} )</Text>

                                    <Text x={ineq2 / 2} y={ineq1 / 2} attach="center" size={20} weight="bold" color="var(--text)">Region R</Text>

                                    <Text x={Math.max(ineq2, 5) + 1.5} y={-0.5} size={16} color="var(--text)">x</Text>
                                    <Text x={-0.5} y={Math.max(ineq1, 5) + 1.5} size={16} color="var(--text)">y</Text>
                                </Mafs>
                            </div>
                        </Container>
                    </div>
                    <div className="chapter-explainer">
                        <div className="explainer-tabs">
                            <button className="explainer-tab" aria-selected={lpExp === 'steps'} onClick={() => setLpExp('steps')}>Steps</button>
                            <button className="explainer-tab" aria-selected={lpExp === 'lazy'} onClick={() => setLpExp('lazy')}>Lazyplain</button>
                        </div>

                        {lpExp === 'steps' ? (
                            <>
                                <h4>Linear Programming</h4>
                                <p>The feasible region is where all inequalities overlap.</p>
                                <BlockMath math={String.raw`y \leq ${ineq1}`} />
                                <BlockMath math={String.raw`x \leq ${ineq2}`} />
                                <BlockMath math={String.raw`x, y \geq 0`} />
                            </>
                        ) : (
                            <>
                                <h4>ELI5: The Safe Zone</h4>
                                <p className="steps">Think of it like <strong>Fencing a Yard</strong> 🏡</p>
                                <ul className="steps">
                                    <li>One fence says "Stay below {ineq1} North" (y ≤ {ineq1}).</li>
                                    <li>Another says "Stay left of {ineq2} East" (x ≤ {ineq2}).</li>
                                    <li>The <strong>Feasible Region (R)</strong> is the space clearly inside ALL the fences.</li>
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            </Reveal>
        </section>
    );
}
