import { useMemo, useState } from 'react';
import { BlockMath } from 'react-katex';
import ChartCanvas from '../components/ChartCanvas.jsx';
import Reveal from '../components/Reveal.jsx';
import Container from '../components/Container.jsx';
import usePrefersReducedMotion from '../lib/usePrefersReducedMotion.js';
import {
  arithmeticProgression,
  geometricProgression,
  compoundInterest,
  buildSequencePoints,
  formatNumber,
} from '../lib/math.js';

const subTabs = [
  { id: 'ap', label: 'Arithmetic' },
  { id: 'gp', label: 'Geometric' },
  { id: 'ci', label: 'Compound' },
  { id: 'ai', label: 'AI Assist' },
];

export default function Chapter5({ theme }) {
  const reducedMotion = usePrefersReducedMotion();
  const [activeTab, setActiveTab] = useState(subTabs[0].id);
  const [apValues, setApValues] = useState({ a: '1', d: '2', n: '10' });
  const [apOutput, setApOutput] = useState('');
  const [apSeries, setApSeries] = useState([]);
  const [apExp, setApExp] = useState('steps');

  const [gpValues, setGpValues] = useState({ a: '2', r: '3', n: '5' });
  const [gpOutput, setGpOutput] = useState('');
  const [gpSeries, setGpSeries] = useState([]);
  const [gpExp, setGpExp] = useState('steps');

  const [ciValues, setCiValues] = useState({ p: '1000', r: '0.05', t: '2', n: '1' });
  const [ciOutput, setCiOutput] = useState('');
  const [ciExp, setCiExp] = useState('steps');

  const [aiText, setAiText] = useState('');
  const [aiResult, setAiResult] = useState(null);
  const [aiExp, setAiExp] = useState('steps');

  const apChart = useMemo(() => {
    if (!apSeries.length) return null;
    return {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Arithmetic sequence',
            data: buildSequencePoints(apSeries),
            borderColor: '#f5b623',
            backgroundColor: 'rgba(245, 182, 35, 0.2)',
            pointRadius: 2,
            tension: 0.2,
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
  }, [apSeries, reducedMotion]);

  const gpChart = useMemo(() => {
    if (!gpSeries.length) return null;
    return {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Geometric sequence',
            data: buildSequencePoints(gpSeries),
            borderColor: '#e05a4f',
            backgroundColor: 'rgba(224, 90, 79, 0.2)',
            pointRadius: 2,
            tension: 0.2,
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
  }, [gpSeries, reducedMotion]);

  const handleAp = () => {
    const a = Number(apValues.a);
    const d = Number(apValues.d);
    const n = Number(apValues.n);
    const result = arithmeticProgression(a, d, n);
    const series = Array.from({ length: n }, (_, i) => a + (i * d));
    setApSeries(series);
    setApOutput(
      `nth term: ${formatNumber(result.nthTerm, 3)}\nSum of first n terms: ${formatNumber(result.sum, 3)}`
    );
  };

  const handleGp = () => {
    const a = Number(gpValues.a);
    const r = Number(gpValues.r);
    const n = Number(gpValues.n);
    const result = geometricProgression(a, r, n);
    const series = Array.from({ length: n }, (_, i) => a * (r ** i));
    setGpSeries(series);
    setGpOutput(
      `nth term: ${formatNumber(result.nthTerm, 3)}\nSum of first n terms: ${formatNumber(result.sum, 3)}`
    );
  };

  const handleCompound = () => {
    const p = Number(ciValues.p);
    const r = Number(ciValues.r);
    const t = Number(ciValues.t);
    const n = Number(ciValues.n);
    const result = compoundInterest(p, r, t, n);
    setCiOutput(
      `Amount: ${formatNumber(result.amount, 2)}\nInterest earned: ${formatNumber(result.interest, 2)}`
    );
  };

  const analyzeStatement = () => {
    const text = aiText.trim();
    if (!text) {
      setAiResult({ error: 'Enter a short problem statement to analyze.' });
      return;
    }

    const lower = text.toLowerCase();
    const numbers = (lower.match(/-?\d+(\.\d+)?/g) || []).map(Number);
    const percentMatch = lower.match(/(\d+(\.\d+)?)\s*%/);

    let topic = 'Arithmetic Progression';
    let formula = String.raw`a_n=a+(n-1)d`;
    let steps = [
      'Identify the first term a, common difference d, and term number n.',
      'Substitute into the nth term formula.',
      'If asked for a sum, use the sum formula.',
    ];
    let resultText = 'Not enough numbers to compute a result yet.';

    if (lower.includes('compound') || lower.includes('interest')) {
      topic = 'Compound Interest';
      formula = String.raw`A=P\left(1+\frac{r}{n}\right)^{nt}`;
      steps = [
        'Identify principal P, rate r, time t, and compounding n.',
        'Convert percent rate to decimal if needed.',
        'Compute A, then interest = A - P.',
      ];

      const P = numbers[0];
      let r = percentMatch ? Number(percentMatch[1]) / 100 : numbers[1];
      if (r > 1) r = r / 100;
      const t = numbers[2];
      let n = 1;
      if (lower.includes('monthly')) n = 12;
      if (lower.includes('quarter')) n = 4;
      if (lower.includes('semi')) n = 2;
      if (lower.includes('daily')) n = 365;
      if (numbers.length >= 4) n = numbers[3];

      if ([P, r, t].every((value) => Number.isFinite(value))) {
        const result = compoundInterest(P, r, t, n);
        resultText = `Assumed P=${P}, r=${r}, t=${t}, n=${n}. Amount=${formatNumber(result.amount, 2)}, Interest=${formatNumber(result.interest, 2)}.`;
      }
    } else if (lower.includes('geometric') || lower.includes('ratio') || lower.includes('multiply')) {
      topic = 'Geometric Progression';
      formula = String.raw`a_n=ar^{n-1}`;
      steps = [
        'Identify the first term a, common ratio r, and term number n.',
        'Use the nth term formula.',
        'Use the sum formula if total is requested.',
      ];

      const [a, r, n] = numbers;
      if ([a, r, n].every((value) => Number.isFinite(value))) {
        const result = geometricProgression(a, r, n);
        resultText = `Assumed a=${a}, r=${r}, n=${n}. nth term=${formatNumber(result.nthTerm, 3)}, sum=${formatNumber(result.sum, 3)}.`;
      }
    } else if (lower.includes('arithmetic') || lower.includes('difference') || lower.includes('increase') || lower.includes('decrease')) {
      topic = 'Arithmetic Progression';
      formula = String.raw`a_n=a+(n-1)d`;
      steps = [
        'Identify the first term a, common difference d, and term number n.',
        'Use the nth term formula for a single term.',
        'Use the sum formula if total is requested.',
      ];

      const [a, d, n] = numbers;
      if ([a, d, n].every((value) => Number.isFinite(value))) {
        const result = arithmeticProgression(a, d, n);
        resultText = `Assumed a=${a}, d=${d}, n=${n}. nth term=${formatNumber(result.nthTerm, 3)}, sum=${formatNumber(result.sum, 3)}.`;
      }
    }

    setAiResult({
      topic,
      formula,
      steps,
      resultText,
    });
  };

  return (
    <section className="section-stack" style={{ gap: '1rem' }}>
      <div className="mini-tabs" role="tablist" aria-label="Sequences and series topics">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            className="mini-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`ch5-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'ap' && (
        <Reveal>
          <div className="chapter-split" id="ch5-ap" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Arithmetic Progression">
                <p className="sub-intro">
                  An arithmetic sequence adds the same difference each step. We can find the nth term and
                  the total sum.
                </p>
                <div className="field-grid">
                  <div>
                    <label htmlFor="ap-a">First term a</label>
                    <input
                      id="ap-a"
                      value={apValues.a}
                      onChange={(event) => setApValues({ ...apValues, a: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="ap-d">Common difference d</label>
                    <input
                      id="ap-d"
                      value={apValues.d}
                      onChange={(event) => setApValues({ ...apValues, d: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="ap-n">Number of terms n</label>
                    <input
                      id="ap-n"
                      value={apValues.n}
                      onChange={(event) => setApValues({ ...apValues, n: event.target.value })}
                    />
                  </div>
                </div>
                <button className="action" type="button" onClick={handleAp}>
                  Solve AP
                </button>
                {apOutput && <div className="result">{apOutput}</div>}
              </Container>
              {apChart && (
                <Container title="Sequence Plot">
                  <div className="chart-wrap" style={{ marginTop: 0, border: 'none', padding: 0, background: 'transparent' }}>
                    <ChartCanvas config={apChart} height={220} theme={theme} />
                  </div>
                </Container>
              )}
              <Container>
                <div className="explain">
                  <strong>Example:</strong> a=1, d=2, n=10 shows a straight rising line.
                </div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button
                  className="explainer-tab"
                  aria-selected={apExp === 'steps'}
                  onClick={() => setApExp('steps')}
                >
                  Steps
                </button>
                <button
                  className="explainer-tab"
                  aria-selected={apExp === 'lazy'}
                  onClick={() => setApExp('lazy')}
                >
                  Lazyplain
                </button>
              </div>

              {apExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`a_n=a+(n-1)d`} />
                  <BlockMath math={String.raw`S_n=\frac{n}{2}\left(2a+(n-1)d\right)`} />
                  <ol className="steps">
                    <li>Compute the nth term using the first formula.</li>
                    <li>Use the sum formula to get total of n terms.</li>
                    <li>The difference d stays the same each step.</li>
                  </ol>
                </>
              ) : (
                <>
                  <h4>ELI5: Arithmetic Progression</h4>
                  <p className="steps">
                    Think of this like climbing a set of stairs.
                  </p>
                  <ul className="steps">
                    <li>
                      <strong>a (First Term):</strong> The height of the first step.
                    </li>
                    <li>
                      <strong>d (Difference):</strong> How much higher each new step is.
                    </li>
                    <li>
                      <strong>n (Term Number):</strong> Which step you are standing on.
                    </li>
                  </ul>
                  <p className="steps" style={{ marginTop: '8px' }}>
                    <strong>The Sum:</strong> If you stack all the steps on top of each other,
                    how tall is the whole pile?
                  </p>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {activeTab === 'gp' && (
        <Reveal>
          <div className="chapter-split" id="ch5-gp" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Geometric Progression">
                <p className="sub-intro">
                  A geometric sequence multiplies by the same ratio each step. The curve grows faster when
                  the ratio is above 1.
                </p>
                <div className="field-grid">
                  <div>
                    <label htmlFor="gp-a">First term a</label>
                    <input
                      id="gp-a"
                      value={gpValues.a}
                      onChange={(event) => setGpValues({ ...gpValues, a: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="gp-r">Common ratio r</label>
                    <input
                      id="gp-r"
                      value={gpValues.r}
                      onChange={(event) => setGpValues({ ...gpValues, r: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="gp-n">Number of terms n</label>
                    <input
                      id="gp-n"
                      value={gpValues.n}
                      onChange={(event) => setGpValues({ ...gpValues, n: event.target.value })}
                    />
                  </div>
                </div>
                <button className="action" type="button" onClick={handleGp}>
                  Solve GP
                </button>
                {gpOutput && <div className="result">{gpOutput}</div>}
              </Container>
              {gpChart && (
                <Container title="Sequence Plot">
                  <div className="chart-wrap" style={{ marginTop: 0, border: 'none', padding: 0, background: 'transparent' }}>
                    <ChartCanvas config={gpChart} height={220} theme={theme} />
                  </div>
                </Container>
              )}
              <Container>
                <div className="explain">
                  <strong>Example:</strong> a=2, r=3, n=5 shows exponential growth.
                </div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button
                  className="explainer-tab"
                  aria-selected={gpExp === 'steps'}
                  onClick={() => setGpExp('steps')}
                >
                  Steps
                </button>
                <button
                  className="explainer-tab"
                  aria-selected={gpExp === 'lazy'}
                  onClick={() => setGpExp('lazy')}
                >
                  Lazyplain
                </button>
              </div>

              {gpExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`a_n=ar^{n-1}`} />
                  <BlockMath math={String.raw`S_n=\frac{a(r^n-1)}{r-1}`} />
                  <ol className="steps">
                    <li>Multiply by r each step to build the sequence.</li>
                    <li>Use the nth term formula to jump to any term.</li>
                    <li>Use the sum formula when r is not 1.</li>
                  </ol>
                </>
              ) : (
                <>
                  <h4>ELI5: Geometric Progression</h4>
                  <p className="steps">
                    This is like a rumor spreading at school.
                  </p>
                  <ul className="steps">
                    <li>
                      <strong>a (First Term):</strong> The first person who knows the secret.
                    </li>
                    <li>
                      <strong>r (Ratio):</strong> How many friends each person tells. If r=2,
                      everyone tells 2 friends.
                    </li>
                  </ul>
                  <p className="steps" style={{ marginTop: '8px' }}>
                    <strong>Warning:</strong> These numbers get HUGE very fast! It's called
                    "Exponential Growth."
                  </p>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {activeTab === 'ci' && (
        <Reveal>
          <div className="chapter-split" id="ch5-ci" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Compound Interest">
                <p className="sub-intro">
                  Compound interest adds interest on top of interest. The more often it compounds, the
                  faster the total grows.
                </p>
                <div className="field-grid">
                  <div>
                    <label htmlFor="ci-p">Principal P</label>
                    <input
                      id="ci-p"
                      value={ciValues.p}
                      onChange={(event) => setCiValues({ ...ciValues, p: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="ci-r">Rate r</label>
                    <input
                      id="ci-r"
                      value={ciValues.r}
                      onChange={(event) => setCiValues({ ...ciValues, r: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="ci-t">Time t (years)</label>
                    <input
                      id="ci-t"
                      value={ciValues.t}
                      onChange={(event) => setCiValues({ ...ciValues, t: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="ci-n">Compounds per year n</label>
                    <input
                      id="ci-n"
                      value={ciValues.n}
                      onChange={(event) => setCiValues({ ...ciValues, n: event.target.value })}
                    />
                  </div>
                </div>
                <button className="action" type="button" onClick={handleCompound}>
                  Calculate interest
                </button>
                {ciOutput && <div className="result">{ciOutput}</div>}
              </Container>
              <Container>
                <div className="explain">
                  <strong>Example:</strong> P=1000, r=0.05, t=2, n=1 shows the total amount after 2 years.
                </div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button
                  className="explainer-tab"
                  aria-selected={ciExp === 'steps'}
                  onClick={() => setCiExp('steps')}
                >
                  Steps
                </button>
                <button
                  className="explainer-tab"
                  aria-selected={ciExp === 'lazy'}
                  onClick={() => setCiExp('lazy')}
                >
                  Lazyplain
                </button>
              </div>

              {ciExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`A=P\left(1+\frac{r}{n}\right)^{nt}`} />
                  <ol className="steps">
                    <li>Convert the rate to decimal (5% becomes 0.05).</li>
                    <li>Plug P, r, n, t into the formula.</li>
                    <li>Interest earned is A - P.</li>
                  </ol>
                </>
              ) : (
                <>
                  <h4>ELI5: Compound Interest</h4>
                  <p className="steps">
                    This is "Interest on Interest." It's like a snowball rolling down a hill.
                  </p>
                  <ul className="steps">
                    <li>
                      <strong>Principal (P):</strong> Your starting snowball.
                    </li>
                    <li>
                      <strong>Rate (r):</strong> How much extra snow sticks to it.
                    </li>
                    <li>
                      <strong>n (Compounds):</strong> How often it rolls over to pick up more
                      snow.
                    </li>
                  </ul>
                  <p className="steps" style={{ marginTop: '8px' }}>
                    <strong>The Result:</strong> The snowball doesn't just get bigger, it gets
                    bigger *faster* every second!
                  </p>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {activeTab === 'ai' && (
        <Reveal>
          <div className="chapter-split" id="ch5-ai" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="AI Assist: Identify the Topic">
                <p className="sub-intro">
                  Paste a word problem. The tool will identify the likely topic, show the formula, and
                  explain how to solve it by hand.
                </p>
                <label htmlFor="ai-statement">Problem statement</label>
                <textarea
                  id="ai-statement"
                  value={aiText}
                  onChange={(event) => setAiText(event.target.value)}
                  placeholder="Example: The first term is 5, common difference 3. Find the 10th term."
                />
                <button className="action" type="button" onClick={analyzeStatement}>
                  Analyze statement
                </button>
                {aiResult?.error && <div className="result">{aiResult.error}</div>}
                {aiResult && !aiResult.error && (
                  <div className="result">
                    Topic: {aiResult.topic}
                    {'\n'}
                    Result: {aiResult.resultText}
                  </div>
                )}
              </Container>
            </div>

            <div className="chapter-explainer">
              {aiResult && !aiResult.error ? (
                <>
                  <h4>Formula</h4>
                  <BlockMath math={aiResult.formula} />
                  <h4>Steps</h4>
                  <ol className="steps">
                    {aiResult.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </>
              ) : (
                <div className="placeholder-explainer">
                  <h4>Waiting for problem...</h4>
                  <p className="steps">Paste a problem in the left panel to see the steps here.</p>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      )}
    </section>
  );
}
