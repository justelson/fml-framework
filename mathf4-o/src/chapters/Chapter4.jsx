import { useState } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import Container from '../components/Container';
import Reveal from '../components/Reveal';
import * as math from '../lib/math';

const subTabs = [
    { id: 'simple', label: 'Simple' },
    { id: 'combined', label: 'Combined' },
];

export default function Chapter4() {
    const [activeTab, setActiveTab] = useState(subTabs[0].id);

    // Simple
    const [simpInputs, setSimpInputs] = useState({ success: '3', total: '10' });
    const [simpResult, setSimpResult] = useState(null);
    const [simpExp, setSimpExp] = useState('steps');

    // Combined
    const [combInputs, setCombInputs] = useState({ pa: '0.5', pb: '0.3' });
    const [combResult, setCombResult] = useState(null);
    const [combExp, setCombExp] = useState('steps');

    const handleSimple = () => {
        const res = math.calculateProbability(Number(simpInputs.success), Number(simpInputs.total));
        setSimpResult(res);
    };

    const handleCombined = () => {
        const pa = Number(combInputs.pa);
        const pb = Number(combInputs.pb);
        setCombResult({
            and: pa * pb,
            or: pa + pb // Assuming mutually exclusive for simple OR, or just sum
        });
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

            {activeTab === 'simple' && (
                <Reveal>
                    <div className="chapter-split">
                        <div className="chapter-work-area">
                            <Container title="Simple Probability">
                                <p className="sub-intro">Likelihood of an event occurring.</p>
                                <div className="field-grid">
                                    <div><label>Favorable Outcomes</label><input value={simpInputs.success} onChange={e => setSimpInputs({ ...simpInputs, success: e.target.value })} /></div>
                                    <div><label>Total Outcomes</label><input value={simpInputs.total} onChange={e => setSimpInputs({ ...simpInputs, total: e.target.value })} /></div>
                                </div>
                                <button className="action" onClick={handleSimple}>Calculate</button>
                                {simpResult && (
                                    <div className="result">
                                        Probability used: {simpResult.probability?.toFixed(4)}
                                        <div style={{ marginTop: '10px', height: '20px', background: 'var(--bg-3)', borderRadius: '10px', overflow: 'hidden' }}>
                                            <div style={{ width: `${(simpResult.probability || 0) * 100}%`, height: '100%', background: 'var(--accent)', transition: 'width 0.5s' }} />
                                        </div>
                                    </div>
                                )}
                            </Container>
                        </div>
                        <div className="chapter-explainer">
                            <div className="explainer-tabs">
                                <button className="explainer-tab" aria-selected={simpExp === 'steps'} onClick={() => setSimpExp('steps')}>Steps</button>
                                <button className="explainer-tab" aria-selected={simpExp === 'lazy'} onClick={() => setSimpExp('lazy')}>Lazyplain</button>
                            </div>

                            {simpExp === 'steps' ? (
                                <>
                                    <h4>Formula</h4>
                                    <BlockMath math={String.raw`P(A) = \frac{n(A)}{n(S)}`} />
                                </>
                            ) : (
                                <>
                                    <h4>ELI5: Probability</h4>
                                    <p className="steps">Think of <strong>Rolling a Die</strong> 🎲</p>
                                    <ul className="steps">
                                        <li><strong>Winning</strong>: The number you want (e.g., getting a 6).</li>
                                        <li><strong>Total</strong>: All possible numbers (1, 2, 3, 4, 5, 6).</li>
                                        <li>Chance = Winning / Total (1 / 6).</li>
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                </Reveal>
            )}

            {activeTab === 'combined' && (
                <Reveal>
                    <div className="chapter-split">
                        <div className="chapter-work-area">
                            <Container title="Combined Events">
                                <div className="field-grid">
                                    <div><label>P(A)</label><input value={combInputs.pa} onChange={e => setCombInputs({ ...combInputs, pa: e.target.value })} /></div>
                                    <div><label>P(B)</label><input value={combInputs.pb} onChange={e => setCombInputs({ ...combInputs, pb: e.target.value })} /></div>
                                </div>
                                <button className="action" onClick={handleCombined}>Calculate</button>
                                {combResult && (
                                    <div className="result">
                                        P(A and B) [Independent]: {combResult.and.toFixed(4)}
                                        <br />
                                        P(A or B) [Mutually Exclusive]: {combResult.or.toFixed(4)}
                                    </div>
                                )}
                            </Container>
                        </div>
                        <div className="chapter-explainer">
                            <div className="explainer-tabs">
                                <button className="explainer-tab" aria-selected={combExp === 'steps'} onClick={() => setCombExp('steps')}>Steps</button>
                                <button className="explainer-tab" aria-selected={combExp === 'lazy'} onClick={() => setCombExp('lazy')}>Lazyplain</button>
                            </div>

                            {combExp === 'steps' ? (
                                <>
                                    <h4>Formulas</h4>
                                    <BlockMath math={String.raw`P(A \cap B) = P(A) \times P(B)`} />
                                    <BlockMath math={String.raw`P(A \cup B) = P(A) + P(B)`} />
                                </>
                            ) : (
                                <>
                                    <h4>ELI5: Combined Events</h4>
                                    <ul className="steps">
                                        <li><strong>AND</strong> means <strong>Multiply</strong>. "Heads AND Heads". Is it harder? Yes, so number gets smaller.</li>
                                        <li><strong>OR</strong> means <strong>Add</strong>. "1 OR 2". Is it easier? Yes, so number gets bigger.</li>
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
