import { useState } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import { Mafs, Coordinates, Polygon, Point, Text, Line } from 'mafs';
import Container from '../components/Container';
import Reveal from '../components/Reveal';
import * as math from '../lib/math';

const subTabs = [
    { id: 'sine', label: 'Sine Rule' },
    { id: 'cosine', label: 'Cosine Rule' },
];

export default function Chapter5() {
    const [activeTab, setActiveTab] = useState(subTabs[0].id);

    // Sine Rule
    const [sineInputs, setSineInputs] = useState({ a: '10', A: '45', B: '60' });
    const [sineResult, setSineResult] = useState(null);
    const [sineExp, setSineExp] = useState('steps');

    // Cosine Rule
    const [cosInputs, setCosInputs] = useState({ b: '5', c: '7', A: '50' });
    const [cosResult, setCosResult] = useState(null);
    const [cosExp, setCosExp] = useState('steps');

    const handleSine = () => {
        const res = math.calculateSineRuleSide(Number(sineInputs.a), Number(sineInputs.A), Number(sineInputs.B));
        setSineResult(res);
    };

    const handleCosine = () => {
        const res = math.calculateCosineRuleSide(Number(cosInputs.b), Number(cosInputs.c), Number(cosInputs.A));
        setCosResult(res);
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

            {activeTab === 'sine' && (
                <Reveal>
                    <div className="chapter-split">
                        <div className="chapter-work-area">
                            <Container title="Sine Rule">
                                <p className="sub-intro">Find unknown side.</p>
                                <div className="field-grid">
                                    <div><label>Side a</label><input value={sineInputs.a} onChange={e => setSineInputs({ ...sineInputs, a: e.target.value })} /></div>
                                    <div><label>Angle A°</label><input value={sineInputs.A} onChange={e => setSineInputs({ ...sineInputs, A: e.target.value })} /></div>
                                    <div><label>Angle B°</label><input value={sineInputs.B} onChange={e => setSineInputs({ ...sineInputs, B: e.target.value })} /></div>
                                </div>
                                <button className="action" onClick={handleSine}>Calculate side b</button>
                                {sineResult && <div className="result">Side b = {sineResult.side_b.toFixed(4)}</div>}
                            </Container>

                            <Container title="Visualization">
                                <div style={{ background: 'var(--panel-2)', padding: '1rem' }}>
                                    <Mafs viewBox={{ x: [-2, Math.max(Number(sineInputs.a), 5) + 2], y: [-2, 10] }} height={300}>
                                        <Coordinates.Cartesian
                                            xAxis={{ labels: (n) => n, lines: 1 }}
                                            yAxis={{ labels: (n) => n, lines: 1 }}
                                        />
                                        {sineResult && (
                                            <>
                                                <Polygon
                                                    points={[
                                                        [0, 0],
                                                        [Number(sineInputs.a), 0],
                                                        [Number(sineInputs.a) - Number(sineResult.side_b) * Math.cos(Number(sineInputs.B) * Math.PI / 180), Number(sineResult.side_b) * Math.sin(Number(sineInputs.B) * Math.PI / 180)]
                                                    ]}
                                                    color="#4facfe"
                                                />
                                                <Text x={0} y={-0.5} attach="s" size={14}>C</Text>
                                                <Text x={Number(sineInputs.a)} y={-0.5} attach="s" size={14}>B</Text>
                                                <Text x={Number(sineInputs.a) - Number(sineResult.side_b) * Math.cos(Number(sineInputs.B) * Math.PI / 180)} y={Number(sineResult.side_b) * Math.sin(Number(sineInputs.B) * Math.PI / 180) + 0.5} attach="n" size={14}>A</Text>
                                                {/* Labels */}
                                                <Text x={Number(sineInputs.a) / 2} y={-0.7} size={12}>a = {sineInputs.a}</Text>
                                                <Text x={Number(sineInputs.a) + 1.5} y={-0.5} size={16} color="var(--text)">x</Text>
                                                <Text x={-0.5} y={9.5} size={16} color="var(--text)">y</Text>
                                            </>
                                        )}
                                    </Mafs>
                                </div>
                            </Container>
                        </div>
                        <div className="chapter-explainer">
                            <div className="explainer-tabs">
                                <button className="explainer-tab" aria-selected={sineExp === 'steps'} onClick={() => setSineExp('steps')}>Steps</button>
                                <button className="explainer-tab" aria-selected={sineExp === 'lazy'} onClick={() => setSineExp('lazy')}>Lazyplain</button>
                            </div>

                            {sineExp === 'steps' ? (
                                <>
                                    <h4>Formula</h4>
                                    <BlockMath math={String.raw`\frac{a}{\sin A} = \frac{b}{\sin B}`} />
                                </>
                            ) : (
                                <>
                                    <h4>ELI5: Sine Rule</h4>
                                    <p className="steps"><strong>The Jawbreaker 🍭</strong></p>
                                    <ul className="steps">
                                        <li>Bigger mouth opening (Angle <InlineMath math="A" />: {sineInputs.A}°) = Bigger gap (Side <InlineMath math="a" />: {sineInputs.a}).</li>
                                        <li>It's a perfect ratio: <InlineMath math="a / \sin A" /> is always the same for the whole triangle!</li>
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                </Reveal>
            )}

            {activeTab === 'cosine' && (
                <Reveal>
                    <div className="chapter-split">
                        <div className="chapter-work-area">
                            <Container title="Cosine Rule">
                                <div className="field-grid">
                                    <div><label>Side b</label><input value={cosInputs.b} onChange={e => setCosInputs({ ...cosInputs, b: e.target.value })} /></div>
                                    <div><label>Side c</label><input value={cosInputs.c} onChange={e => setCosInputs({ ...cosInputs, c: e.target.value })} /></div>
                                    <div><label>Angle A°</label><input value={cosInputs.A} onChange={e => setCosInputs({ ...cosInputs, A: e.target.value })} /></div>
                                </div>
                                <button className="action" onClick={handleCosine}>Calculate side a</button>
                                {cosResult && <div className="result">Side a = {cosResult.side_a.toFixed(4)}</div>}
                            </Container>
                            <Container title="Visualization">
                                <div style={{ background: 'var(--panel-2)', padding: '1rem' }}>
                                    <Mafs viewBox={{ x: [-2, Math.max(Number(cosInputs.c), 5) + 2], y: [-2, 10] }} height={300}>
                                        <Coordinates.Cartesian
                                            xAxis={{ labels: (n) => n, lines: 1 }}
                                            yAxis={{ labels: (n) => n, lines: 1 }}
                                        />
                                        <Polygon
                                            points={[
                                                [0, 0],
                                                [Number(cosInputs.c), 0],
                                                [Number(cosInputs.b) * Math.cos(Number(cosInputs.A) * Math.PI / 180), Number(cosInputs.b) * Math.sin(Number(cosInputs.A) * Math.PI / 180)]
                                            ]}
                                            color="#e05a4f"
                                        />
                                        <Text x={0} y={-0.5} attach="s" size={14}>C</Text>
                                        <Text x={Number(cosInputs.c)} y={-0.5} attach="s" size={14}>B</Text>
                                        <Text x={Number(cosInputs.b) * Math.cos(Number(cosInputs.A) * Math.PI / 180)} y={Number(cosInputs.b) * Math.sin(Number(cosInputs.A) * Math.PI / 180) + 0.5} attach="n" size={14}>A</Text>
                                        {/* Labels */}
                                        <Text x={Number(cosInputs.c) / 2} y={-0.7} size={12}>c = {cosInputs.c}</Text>
                                        <Text x={Number(cosInputs.c) + 1.5} y={-0.5} size={16} color="var(--text)">x</Text>
                                        <Text x={-0.5} y={9.5} size={16} color="var(--text)">y</Text>
                                    </Mafs>
                                </div>
                            </Container>
                        </div>
                        <div className="chapter-explainer">
                            <div className="explainer-tabs">
                                <button className="explainer-tab" aria-selected={cosExp === 'steps'} onClick={() => setCosExp('steps')}>Steps</button>
                                <button className="explainer-tab" aria-selected={cosExp === 'lazy'} onClick={() => setCosExp('lazy')}>Lazyplain</button>
                            </div>

                            {cosExp === 'steps' ? (
                                <>
                                    <h4>Formula</h4>
                                    <BlockMath math={String.raw`a^2 = b^2 + c^2 - 2bc \cos A`} />
                                </>
                            ) : (
                                <>
                                    <h4>ELI5: Cosine Rule</h4>
                                    <p className="steps"><strong>Pythagoras 2.0 📐</strong></p>
                                    <ul className="steps">
                                        <li>Standard Pythagoras (<InlineMath math="a^2 + b^2 = c^2" />) only works for right angles (90°).</li>
                                        <li>Cosine Rule works for <strong>ANY</strong> triangle. The extra part (<InlineMath math="-2bc \cos A" />) checks if the corner A ({cosInputs.A}°) is sharp or dull.</li>
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
