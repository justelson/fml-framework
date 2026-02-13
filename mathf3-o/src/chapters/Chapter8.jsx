import { useMemo, useState } from 'react';
import { BlockMath } from 'react-katex';
import ChartCanvas from '../components/ChartCanvas.jsx';
import Reveal from '../components/Reveal.jsx';
import Container from '../components/Container.jsx';
import usePrefersReducedMotion from '../lib/usePrefersReducedMotion.js';
import { accountingEquation, simpleBalanceSheet, formatNumber } from '../lib/math.js';

const subTabs = [
  { id: 'equation', label: 'Equation' },
  { id: 'sheet', label: 'Balance Sheet' },
];

export default function Chapter8({ theme }) {
  const reducedMotion = usePrefersReducedMotion();
  const [activeTab, setActiveTab] = useState(subTabs[0].id);
  const [eqValues, setEqValues] = useState({ assets: '', liabilities: '200000', capital: '1500000' });
  const [eqOutput, setEqOutput] = useState('');
  const [breakdown, setBreakdown] = useState(null);
  const [eqExp, setEqExp] = useState('steps');

  const [sheetValues, setSheetValues] = useState({ assets: '500000', liabilities: '150000' });
  const [sheetOutput, setSheetOutput] = useState('');
  const [sheetExp, setSheetExp] = useState('steps');

  const chartConfig = useMemo(() => {
    if (!breakdown) return null;
    return {
      type: 'doughnut',
      data: {
        labels: ['Assets', 'Liabilities', 'Capital'],
        datasets: [
          {
            data: [breakdown.assets, breakdown.liabilities, breakdown.capital],
            backgroundColor: ['#f5b623', '#e05a4f', '#9ee06c'],
            borderColor: '#0b0b0c',
            borderWidth: 2,
          },
        ],
      },
      options: {
        animation: reducedMotion ? false : { duration: 600 },
      },
    };
  }, [breakdown, reducedMotion]);

  const handleEquation = () => {
    const assets = eqValues.assets ? Number(eqValues.assets) : null;
    const liabilities = eqValues.liabilities ? Number(eqValues.liabilities) : null;
    const capital = eqValues.capital ? Number(eqValues.capital) : null;
    const result = accountingEquation(assets, liabilities, capital);
    if (result.error) {
      setEqOutput(result.error);
      setBreakdown(null);
      return;
    }
    setEqOutput(
      `Assets: ${formatNumber(result.assets, 2)}\nLiabilities: ${formatNumber(result.liabilities, 2)}\nCapital: ${formatNumber(result.capital, 2)}\nCalculated: ${result.calculated}`
    );
    setBreakdown({
      assets: result.assets,
      liabilities: result.liabilities,
      capital: result.capital,
    });
  };

  const handleSheet = () => {
    const assets = Number(sheetValues.assets);
    const liabilities = Number(sheetValues.liabilities);
    const result = simpleBalanceSheet(assets, liabilities);
    setSheetOutput(
      `Assets: ${formatNumber(result.assets, 2)}\nLiabilities: ${formatNumber(result.liabilities, 2)}\nCapital: ${formatNumber(result.capital, 2)}`
    );
  };

  return (

    <section className="section-stack" style={{ gap: '1rem' }}>
      <div className="mini-tabs" role="tablist" aria-label="Accounting topics">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            className="mini-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`ch8-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'equation' && (
        <Reveal>
          <div className="chapter-split" id="ch8-equation" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Accounting Equation">
                <p className="sub-intro">
                  The rule is Assets = Liabilities + Capital. If you know two values, the third one is
                  the missing piece.
                </p>
                <p className="inline-note">Leave one field blank to solve for it.</p>
                <div className="field-grid">
                  <div>
                    <label htmlFor="eq-assets">Assets</label>
                    <input
                      id="eq-assets"
                      value={eqValues.assets}
                      onChange={(event) => setEqValues({ ...eqValues, assets: event.target.value })}
                      placeholder="Leave blank"
                    />
                  </div>
                  <div>
                    <label htmlFor="eq-liabilities">Liabilities</label>
                    <input
                      id="eq-liabilities"
                      value={eqValues.liabilities}
                      onChange={(event) => setEqValues({ ...eqValues, liabilities: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="eq-capital">Capital</label>
                    <input
                      id="eq-capital"
                      value={eqValues.capital}
                      onChange={(event) => setEqValues({ ...eqValues, capital: event.target.value })}
                    />
                  </div>
                </div>
                <button className="action" type="button" onClick={handleEquation}>
                  Solve equation
                </button>
                {eqOutput && <div className="result">{eqOutput}</div>}
              </Container>
              {chartConfig && (
                <Container title="Financial Mix">
                  <div className="chart-wrap" style={{ marginTop: 0, border: 'none', padding: 0, background: 'transparent' }}>
                    <ChartCanvas config={chartConfig} height={220} theme={theme} />
                  </div>
                </Container>
              )}
              <Container>
                <div className="explain">
                  <strong>Example:</strong> Assets blank, liabilities 200000, capital 1500000 gives assets.
                </div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button
                  className="explainer-tab"
                  aria-selected={eqExp === 'steps'}
                  onClick={() => setEqExp('steps')}
                >
                  Steps
                </button>
                <button
                  className="explainer-tab"
                  aria-selected={eqExp === 'lazy'}
                  onClick={() => setEqExp('lazy')}
                >
                  Lazyplain
                </button>
              </div>

              {eqExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`\text{Assets}=\text{Liabilities}+\text{Capital}`} />
                  <ol className="steps">
                    <li>Pick the missing value you want to solve.</li>
                    <li>Rearrange the equation to isolate it.</li>
                    <li>Substitute the known values and compute.</li>
                  </ol>
                </>
              ) : (
                <>
                  <h4>ELI5: The Accounting Rule</h4>
                  <p className="steps">
                    This is the "Golden Rule" of business. It keeps everything balanced.
                  </p>
                  <ul className="steps">
                    <li>
                      <strong>Assets:</strong> Things the business *owns* (Cash, Cars,
                      Buildings).
                    </li>
                    <li>
                      <strong>Liabilities:</strong> Money the business *owes* to others (Bank
                      loans).
                    </li>
                    <li>
                      <strong>Capital:</strong> The owner's personal money and "skin in the
                      game."
                    </li>
                  </ul>
                  <p className="steps" style={{ marginTop: '8px' }}>
                    <strong>The Logic:</strong> If you buy a $10,000 car (Asset), you either
                    paid for it yourself (Capital) or borrowed money for it (Liability).
                  </p>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {activeTab === 'sheet' && (
        <Reveal>
          <div className="chapter-split" id="ch8-sheet" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Balance Sheet Snapshot">
                <p className="sub-intro">
                  A balance sheet is a quick check of what the business owns, owes, and keeps as capital.
                </p>
                <div className="field-grid">
                  <div>
                    <label htmlFor="sheet-assets">Total assets</label>
                    <input
                      id="sheet-assets"
                      value={sheetValues.assets}
                      onChange={(event) => setSheetValues({ ...sheetValues, assets: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="sheet-liabilities">Total liabilities</label>
                    <input
                      id="sheet-liabilities"
                      value={sheetValues.liabilities}
                      onChange={(event) => setSheetValues({ ...sheetValues, liabilities: event.target.value })}
                    />
                  </div>
                </div>
                <button className="action" type="button" onClick={handleSheet}>
                  Generate summary
                </button>
                {sheetOutput && <div className="result">{sheetOutput}</div>}
              </Container>
              <Container>
                <div className="explain">
                  <strong>Example:</strong> Assets 500000, liabilities 150000 gives capital 350000.
                </div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button
                  className="explainer-tab"
                  aria-selected={sheetExp === 'steps'}
                  onClick={() => setSheetExp('steps')}
                >
                  Steps
                </button>
                <button
                  className="explainer-tab"
                  aria-selected={sheetExp === 'lazy'}
                  onClick={() => setSheetExp('lazy')}
                >
                  Lazyplain
                </button>
              </div>

              {sheetExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`\text{Capital}=\text{Assets}-\text{Liabilities}`} />
                  <ol className="steps">
                    <li>Subtract liabilities from assets.</li>
                    <li>The remainder is the capital value.</li>
                    <li>Check that assets = liabilities + capital.</li>
                  </ol>
                </>
              ) : (
                <>
                  <h4>ELI5: Balance Sheet</h4>
                  <p className="steps">
                    This is like a "Health Checkup" for a company. It shows the value of the
                    company *right now*.
                  </p>
                  <ul className="steps">
                    <li>
                      <strong>Why "Balance"?</strong> Because the left side (what we own) must
                      always equal the right side (how we paid for it).
                    </li>
                    <li>
                      <strong>Net Worth:</strong> In personal life, we call Capital "Net
                      Worth." It's what's left for you after you pay off all your debts.
                    </li>
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
