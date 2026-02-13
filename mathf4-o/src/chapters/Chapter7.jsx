import { useState } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import Container from '../components/Container';
import Reveal from '../components/Reveal';
import * as math from '../lib/math';

const subTabs = [
    { id: 'calc', label: 'Calculator' },
    { id: 'solver', label: 'Eq. Solver' },
];

export default function Chapter7() {
    const [activeTab, setActiveTab] = useState(subTabs[0].id);

    // Calculator
    const [matInputs, setMatInputs] = useState({ a: '2', b: '1', c: '3', d: '4' });
    const [matResult, setMatResult] = useState(null);
    const [calcExp, setCalcExp] = useState('steps');

    // Solver
    const [solInputs, setSolInputs] = useState({ a1: '2', b1: '3', c1: '7', a2: '1', b2: '-1', c2: '1' });
    const [solResult, setSolResult] = useState(null);
    const [solExp, setSolExp] = useState('steps');

    const handleCalc = () => {
        const det = math.calculateDeterminant2x2(Number(matInputs.a), Number(matInputs.b), Number(matInputs.c), Number(matInputs.d));
        const inv = math.calculateInverse2x2(Number(matInputs.a), Number(matInputs.b), Number(matInputs.c), Number(matInputs.d));
        setMatResult({ det, inv });
    };

    const handleSolve = () => {
        const res = math.solveSimultaneousCramer(
            Number(solInputs.a1), Number(solInputs.b1), Number(solInputs.c1),
            Number(solInputs.a2), Number(solInputs.b2), Number(solInputs.c2)
        );
        setSolResult(res);
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

            {activeTab === 'calc' && (
                <Reveal>
                    <div className="chapter-split">
                        <div className="chapter-work-area">
                            <Container title="Matrix Operations">
                                <p>Input Matrix M:</p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', maxWidth: '150px' }}>
                                    <input value={matInputs.a} onChange={e => setMatInputs({ ...matInputs, a: e.target.value })} />
                                    <input value={matInputs.b} onChange={e => setMatInputs({ ...matInputs, b: e.target.value })} />
                                    <input value={matInputs.c} onChange={e => setMatInputs({ ...matInputs, c: e.target.value })} />
                                    <input value={matInputs.d} onChange={e => setMatInputs({ ...matInputs, d: e.target.value })} />
                                </div>
                                <button className="action" style={{ marginTop: '1rem' }} onClick={handleCalc}>Calculate</button>
                                {matResult && (
                                    <div className="result">
                                        Determinant: {matResult.det.determinant} <br />
                                        Inverse: {matResult.inv.error ? 'Singular' : (
                                            <BlockMath math={String.raw`\begin{pmatrix} ${matResult.inv.a.toFixed(2)} & ${matResult.inv.b.toFixed(2)} \\ ${matResult.inv.c.toFixed(2)} & ${matResult.inv.d.toFixed(2)} \end{pmatrix}`} />
                                        )}
                                    </div>
                                )}
                            </Container>
                        </div>
                        <div className="chapter-explainer">
                            <div className="explainer-tabs">
                                <button className="explainer-tab" aria-selected={calcExp === 'steps'} onClick={() => setCalcExp('steps')}>Steps</button>
                                <button className="explainer-tab" aria-selected={calcExp === 'lazy'} onClick={() => setCalcExp('lazy')}>Lazyplain</button>
                            </div>

                            {calcExp === 'steps' ? (
                                <>
                                    <h4>Formulas</h4>
                                    <BlockMath math={String.raw`|M| = ad - bc`} />
                                    <BlockMath math={String.raw`M^{-1} = \frac{1}{|M|} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}`} />
                                </>
                            ) : (
                                <>
                                    <h4>ELI5: Matrices</h4>
                                    <p className="steps"><strong>Determinant:</strong> "The Scaling Factor" 📈</p>
                                    <ul className="steps">
                                        <li>Tells you how big the matrix stretches things.</li>
                                        <li>If it's <InlineMath math="0" />, it squashes everything flat!</li>
                                    </ul>
                                    <p className="steps"><strong>Inverse:</strong> "The Undo Button" ↩️</p>
                                    <ul className="steps">
                                        <li>If Matrix <InlineMath math="A" /> messes things up, Inverse <InlineMath math="A^{-1}" /> fixes them back to normal.</li>
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                </Reveal>
            )}

            {activeTab === 'solver' && (
                <Reveal>
                    <div className="chapter-split">
                        <div className="chapter-work-area">
                            <Container title="Simultaneous Solver">
                                <div className="field-grid">
                                    <div><label>a1</label><input value={solInputs.a1} onChange={e => setSolInputs({ ...solInputs, a1: e.target.value })} /></div>
                                    <div><label>b1</label><input value={solInputs.b1} onChange={e => setSolInputs({ ...solInputs, b1: e.target.value })} /></div>
                                    <div><label>c1</label><input value={solInputs.c1} onChange={e => setSolInputs({ ...solInputs, c1: e.target.value })} /></div>

                                    <div><label>a2</label><input value={solInputs.a2} onChange={e => setSolInputs({ ...solInputs, a2: e.target.value })} /></div>
                                    <div><label>b2</label><input value={solInputs.b2} onChange={e => setSolInputs({ ...solInputs, b2: e.target.value })} /></div>
                                    <div><label>c2</label><input value={solInputs.c2} onChange={e => setSolInputs({ ...solInputs, c2: e.target.value })} /></div>
                                </div>
                                <button className="action" onClick={handleSolve}>Solve</button>
                                {solResult && (
                                    <div className="result">
                                        {solResult.error ? solResult.error : `x = ${solResult.x.toFixed(4)}, y = ${solResult.y.toFixed(4)}`}
                                    </div>
                                )}
                            </Container>
                        </div>
                        <div className="chapter-explainer">
                            <div className="explainer-tabs">
                                <button className="explainer-tab" aria-selected={solExp === 'steps'} onClick={() => setSolExp('steps')}>Steps</button>
                                <button className="explainer-tab" aria-selected={solExp === 'lazy'} onClick={() => setSolExp('lazy')}>Lazyplain</button>
                            </div>

                            {solExp === 'steps' ? (
                                <>
                                    <h4>Cramer's Rule</h4>
                                    <BlockMath math={String.raw`x = \frac{D_x}{D}, y = \frac{D_y}{D}`} />
                                </>
                            ) : (
                                <>
                                    <h4>ELI5: Simultaneous Eqs</h4>
                                    <p className="steps"><strong>The Intersection ❌</strong></p>
                                    <ul className="steps">
                                        <li>Two lines meet at one specific point.</li>
                                        <li>We found the exact <InlineMath math="x" /> and <InlineMath math="y" /> coordinate where they crash into each other!</li>
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
