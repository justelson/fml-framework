import { useState } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import { Mafs, Coordinates, Vector, Point, Text, Line } from 'mafs';
import Container from '../components/Container';
import Reveal from '../components/Reveal';
import * as math from '../lib/math';

const subTabs = [
    { id: 'magnitude', label: 'Magnitude' },
    { id: 'addition', label: 'Addition' },
];

export default function Chapter6() {
    const [activeTab, setActiveTab] = useState(subTabs[0].id);

    // Magnitude
    const [magInputs, setMagInputs] = useState({ x: '3', y: '4' });
    const [magResult, setMagResult] = useState(null);
    const [magExp, setMagExp] = useState('steps');

    // Addition
    const [addInputs, setAddInputs] = useState({ x1: '3', y1: '1', x2: '1', y2: '3' });
    const [addResult, setAddResult] = useState(null);
    const [addExp, setAddExp] = useState('steps');

    const handleMagnitude = () => {
        const res = math.calculateVectorMagnitude(Number(magInputs.x), Number(magInputs.y));
        setMagResult(res);
    };

    const handleAddition = () => {
        const res = math.addVectors(
            Number(addInputs.x1), Number(addInputs.y1),
            Number(addInputs.x2), Number(addInputs.y2)
        );
        setAddResult(res);
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

            {activeTab === 'magnitude' && (
                <Reveal>
                    <div className="chapter-split">
                        <div className="chapter-work-area">
                            <Container title="Vector Magnitude">
                                <div className="field-grid">
                                    <div><label>x</label><input value={magInputs.x} onChange={e => setMagInputs({ ...magInputs, x: e.target.value })} /></div>
                                    <div><label>y</label><input value={magInputs.y} onChange={e => setMagInputs({ ...magInputs, y: e.target.value })} /></div>
                                </div>
                                <button className="action" onClick={handleMagnitude}>Calculate</button>
                                {magResult && <div className="result">Magnitude = {magResult.magnitude}</div>}
                            </Container>
                            <Container title="Visual">
                                <div style={{ background: 'var(--panel-2)', padding: '1rem' }}>
                                    <Mafs viewBox={{ x: [-1, Number(magInputs.x) + 2], y: [-1, Number(magInputs.y) + 2] }} height={300}>
                                        <Coordinates.Cartesian
                                            xAxis={{ labels: (n) => n, lines: 1 }}
                                            yAxis={{ labels: (n) => n, lines: 1 }}
                                        />
                                        <Vector tail={[0, 0]} tip={[Number(magInputs.x), Number(magInputs.y)]} color="#f5b623" weight={3} />
                                        {/* Component lines */}
                                        <Line.Segment point1={[0, 0]} point2={[Number(magInputs.x), 0]} style="dashed" color="var(--muted)" />
                                        <Line.Segment point1={[Number(magInputs.x), 0]} point2={[Number(magInputs.x), Number(magInputs.y)]} style="dashed" color="var(--muted)" />

                                        <Text x={Number(magInputs.x) / 2} y={Number(magInputs.y) / 2} attach="ne" size={16} color="#f5b623">v</Text>
                                        <Text x={Number(magInputs.x) / 2} y={-0.5} size={12}>x = {magInputs.x}</Text>
                                        <Text x={Number(magInputs.x) + 0.5} y={Number(magInputs.y) / 2} size={12} transform="rotate(90)">y = {magInputs.y}</Text>

                                        <Text x={Number(magInputs.x) + 1.5} y={-0.5} size={16} color="var(--text)">x</Text>
                                        <Text x={-0.5} y={Number(magInputs.y) + 1.5} size={16} color="var(--text)">y</Text>
                                    </Mafs>
                                </div>
                            </Container>
                        </div>
                        <div className="chapter-explainer">
                            <div className="explainer-tabs">
                                <button className="explainer-tab" aria-selected={magExp === 'steps'} onClick={() => setMagExp('steps')}>Steps</button>
                                <button className="explainer-tab" aria-selected={magExp === 'lazy'} onClick={() => setMagExp('lazy')}>Lazyplain</button>
                            </div>

                            {magExp === 'steps' ? (
                                <>
                                    <h4>Formula</h4>
                                    <BlockMath math={String.raw`|v| = \sqrt{x^2 + y^2}`} />
                                </>
                            ) : (
                                <>
                                    <h4>ELI5: Magnitude</h4>
                                    <p className="steps"><strong>As the crow flies</strong> 🦅</p>
                                    <ul className="steps">
                                        <li>Walking {magInputs.x} blocks East (<InlineMath math="x" />) and {magInputs.y} blocks North (<InlineMath math="y" />) is long.</li>
                                        <li>The vector magnitude ( shortcut ) is approximately {magResult ? magResult.magnitude.toFixed(2) : '?'}.</li>
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                </Reveal>
            )}

            {activeTab === 'addition' && (
                <Reveal>
                    <div className="chapter-split">
                        <div className="chapter-work-area">
                            <Container title="Vector Addition">
                                <div className="field-grid">
                                    <div><label>x1</label><input value={addInputs.x1} onChange={e => setAddInputs({ ...addInputs, x1: e.target.value })} /></div>
                                    <div><label>y1</label><input value={addInputs.y1} onChange={e => setAddInputs({ ...addInputs, y1: e.target.value })} /></div>
                                    <div><label>x2</label><input value={addInputs.x2} onChange={e => setAddInputs({ ...addInputs, x2: e.target.value })} /></div>
                                    <div><label>y2</label><input value={addInputs.y2} onChange={e => setAddInputs({ ...addInputs, y2: e.target.value })} /></div>
                                </div>
                                <button className="action" onClick={handleAddition}>Add Vectors</button>
                                {addResult && <div className="result">Result = ({addResult.x}, {addResult.y})</div>}
                            </Container>
                            <Container title="Visual">
                                <div style={{ background: 'var(--panel-2)', padding: '1rem' }}>
                                    <Mafs viewBox={{ x: [-1, Math.max(Number(addInputs.x1) + Number(addInputs.x2), 5) + 2], y: [-1, Math.max(Number(addInputs.y1) + Number(addInputs.y2), 5) + 2] }} height={300}>
                                        <Coordinates.Cartesian
                                            xAxis={{ labels: (n) => n, lines: 1 }}
                                            yAxis={{ labels: (n) => n, lines: 1 }}
                                        />
                                        {/* Vector 1 */}
                                        <Vector tail={[0, 0]} tip={[Number(addInputs.x1), Number(addInputs.y1)]} color="#4facfe" weight={3} />
                                        <Text x={Number(addInputs.x1) / 2} y={Number(addInputs.y1) / 2} attach="nw" size={14} color="#4facfe">u</Text>

                                        {/* Vector 2 placed at tip of Vector 1 */}
                                        <Vector
                                            tail={[Number(addInputs.x1), Number(addInputs.y1)]}
                                            tip={[Number(addInputs.x1) + Number(addInputs.x2), Number(addInputs.y1) + Number(addInputs.y2)]}
                                            color="#e05a4f" weight={3}
                                        />
                                        <Text x={Number(addInputs.x1) + Number(addInputs.x2) / 2} y={Number(addInputs.y1) + Number(addInputs.y2) / 2} attach="nw" size={14} color="#e05a4f">v</Text>

                                        {/* Resultant */}
                                        {addResult && (
                                            <>
                                                <Vector
                                                    tail={[0, 0]}
                                                    tip={[addResult.x, addResult.y]}
                                                    color="#f5b623" style="dashed" weight={2}
                                                />
                                                <Text x={addResult.x / 2} y={addResult.y / 2} attach="se" size={16} color="#f5b623">u+v</Text>
                                            </>
                                        )}
                                        <Text x={Math.max(Number(addInputs.x1) + Number(addInputs.x2), 5) + 1.5} y={-0.5} size={16} color="var(--text)">x</Text>
                                        <Text x={-0.5} y={Math.max(Number(addInputs.y1) + Number(addInputs.y2), 5) + 1.5} size={16} color="var(--text)">y</Text>
                                    </Mafs>
                                </div>
                            </Container>
                        </div>
                        <div className="chapter-explainer">
                            <div className="explainer-tabs">
                                <button className="explainer-tab" aria-selected={addExp === 'steps'} onClick={() => setAddExp('steps')}>Steps</button>
                                <button className="explainer-tab" aria-selected={addExp === 'lazy'} onClick={() => setAddExp('lazy')}>Lazyplain</button>
                            </div>

                            {addExp === 'steps' ? (
                                <>
                                    <h4>Method</h4>
                                    <p>Tip-to-tail method.</p>
                                    <BlockMath math={String.raw`\begin{pmatrix} x_1 \\ y_1 \end{pmatrix} + \begin{pmatrix} x_2 \\ y_2 \end{pmatrix} = \begin{pmatrix} x_1+x_2 \\ y_1+y_2 \end{pmatrix}`} />
                                </>
                            ) : (
                                <>
                                    <h4>ELI5: Vector Addition</h4>
                                    <p className="steps"><strong>Treasure Hunt 🗺️</strong></p>
                                    <ul className="steps">
                                        <li>1. Walk path u: ({addInputs.x1}, {addInputs.y1}).</li>
                                        <li>2. Then walk path v: ({addInputs.x2}, {addInputs.y2}) starting from where u ended.</li>
                                        <li>The Result u+v is {addResult ? `(${addResult.x}, ${addResult.y})` : '?'}.</li>
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
