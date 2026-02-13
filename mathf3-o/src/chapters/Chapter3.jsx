import { useMemo, useState } from 'react';
import { BlockMath } from 'react-katex';
import ChartCanvas from '../components/ChartCanvas.jsx';
import Reveal from '../components/Reveal.jsx';
import Container from '../components/Container.jsx';
import usePrefersReducedMotion from '../lib/usePrefersReducedMotion.js';
import {
  parseNumberList,
  computeStats,
  groupedMean,
  groupedMedian,
  groupedMode,
  formatNumber,
} from '../lib/math.js';

const subTabs = [
  { id: 'ungrouped', label: 'Ungrouped' },
  { id: 'mean', label: 'Grouped Mean' },
  { id: 'median', label: 'Grouped Median' },
  { id: 'mode', label: 'Grouped Mode' },
];

export default function Chapter3({ theme }) {
  const reducedMotion = usePrefersReducedMotion();
  const [activeTab, setActiveTab] = useState(subTabs[0].id);
  const [dataText, setDataText] = useState('5, 8, 12, 15, 12, 8, 8, 5, 20');
  const [statsOutput, setStatsOutput] = useState('');
  const [barData, setBarData] = useState(null);
  const [statsExp, setStatsExp] = useState('steps');

  const [groupMarks, setGroupMarks] = useState('10, 20, 30, 40');
  const [groupFreqs, setGroupFreqs] = useState('2, 5, 4, 3');
  const [groupMeanOutput, setGroupMeanOutput] = useState('');
  const [meanExp, setMeanExp] = useState('steps');

  const [medianValues, setMedianValues] = useState({ L: '114.5', N: '40', nBefore: '17', nWithin: '12', i: '9' });
  const [medianOutput, setMedianOutput] = useState('');
  const [medianExp, setMedianExp] = useState('steps');

  const [modeValues, setModeValues] = useState({ L: '114.5', t1: '5', t2: '3', i: '9' });
  const [modeOutput, setModeOutput] = useState('');
  const [modeExp, setModeExp] = useState('steps');

  const barChart = useMemo(() => {
    if (!barData) return null;
    return {
      type: 'bar',
      data: {
        labels: barData.labels,
        datasets: [
          {
            label: 'Frequency',
            data: barData.values,
            backgroundColor: 'rgba(245, 182, 35, 0.55)',
            borderColor: '#f5b623',
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: reducedMotion ? false : { duration: 500 },
        scales: {
          x: {},
          y: {},
        },
      },
    };
  }, [barData, reducedMotion]);

  const handleStats = () => {
    const values = parseNumberList(dataText);
    if (!values.length) {
      setStatsOutput('Enter numbers separated by commas or spaces.');
      setBarData(null);
      return;
    }
    const stats = computeStats(values);
    setStatsOutput(
      `Count: ${values.length}\nMean: ${formatNumber(stats.mean, 3)}\nMedian: ${formatNumber(stats.median, 3)}\nMode: ${stats.mode}`
    );

    const counts = values.reduce((map, value) => {
      map.set(value, (map.get(value) || 0) + 1);
      return map;
    }, new Map());

    const labels = [...counts.keys()].sort((a, b) => a - b).map((value) => String(value));
    const valuesList = labels.map((label) => counts.get(Number(label)) || 0);
    setBarData({ labels, values: valuesList });
  };

  const handleGroupedMean = () => {
    const marks = parseNumberList(groupMarks);
    const freqs = parseNumberList(groupFreqs);
    if (!marks.length || marks.length !== freqs.length) {
      setGroupMeanOutput('Provide matching class marks and frequencies.');
      return;
    }
    const mean = groupedMean(marks, freqs);
    setGroupMeanOutput(`Grouped mean: ${formatNumber(mean, 3)}`);
  };

  const handleGroupedMedian = () => {
    const L = Number(medianValues.L);
    const N = Number(medianValues.N);
    const nBefore = Number(medianValues.nBefore);
    const nWithin = Number(medianValues.nWithin);
    const i = Number(medianValues.i);
    const result = groupedMedian(L, N, nBefore, nWithin, i);
    setMedianOutput(`Grouped median: ${formatNumber(result, 3)}`);
  };

  const handleGroupedMode = () => {
    const L = Number(modeValues.L);
    const t1 = Number(modeValues.t1);
    const t2 = Number(modeValues.t2);
    const i = Number(modeValues.i);
    const result = groupedMode(L, t1, t2, i);
    setModeOutput(`Grouped mode: ${formatNumber(result, 3)}`);
  };

  return (
    <section className="section-stack" style={{ gap: '1rem' }}>
      <div className="mini-tabs" role="tablist" aria-label="Statistics topics">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            className="mini-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`ch3-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'ungrouped' && (
        <Reveal>
          <div className="chapter-split" id="ch3-ungrouped" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Ungrouped Data Analyzer">
                <p className="sub-intro">
                  Ungrouped data means raw numbers. We find the mean (average), median (middle), and mode
                  (most common) to summarize the list.
                </p>
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="ungrouped">Data set</label>
                  <textarea
                    id="ungrouped"
                    value={dataText}
                    onChange={(event) => setDataText(event.target.value)}
                    placeholder="5, 8, 12, 15, 12, 8, 8, 5, 20"
                  />
                </div>
                <button className="action" type="button" onClick={handleStats}>
                  Analyze data
                </button>
                {statsOutput && <div className="result">{statsOutput}</div>}
              </Container>
              {barChart && (
                <Container title="Frequency Chart">
                  <div className="chart-wrap" style={{ marginTop: 0, border: 'none', padding: 0, background: 'transparent' }}>
                    <ChartCanvas config={barChart} height={240} theme={theme} />
                  </div>
                </Container>
              )}
              <Container>
                <div className="explain">
                  <strong>Example:</strong> 5, 8, 12, 15, 12, 8, 8, 5, 20 shows mode 8.
                </div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button
                  className="explainer-tab"
                  aria-selected={statsExp === 'steps'}
                  onClick={() => setStatsExp('steps')}
                >
                  Steps
                </button>
                <button
                  className="explainer-tab"
                  aria-selected={statsExp === 'lazy'}
                  onClick={() => setStatsExp('lazy')}
                >
                  Lazyplain
                </button>
              </div>

              {statsExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`\bar{x}=\frac{\sum x}{n}`} />
                  <ol className="steps">
                    <li>Add all values and divide by how many values to get the mean.</li>
                    <li>Sort the list and take the middle value for the median.</li>
                    <li>Count repeats to find the mode.</li>
                  </ol>
                </>
              ) : (
                <>
                  <h4>ELI5: Ungrouped Stats</h4>
                  <p className="steps">
                    This is like looking at a pile of Lego bricks.
                  </p>
                  <ul className="steps">
                    <li>
                      <strong>Mean:</strong> If you broke all the Lego towers and shared the
                      bricks equally with everyone, how many would each person get?
                    </li>
                    <li>
                      <strong>Median:</strong> Line up all the kids by height. The one exactly
                      in the middle is the median.
                    </li>
                    <li>
                      <strong>Mode:</strong> The "Favorite." If most kids are wearing blue
                      shirts, blue is the mode.
                    </li>
                  </ul>
                  <p className="steps" style={{ marginTop: '8px' }}>
                    <strong>Where do we use it?</strong> Teachers use this to see the average
                    grade of a class.
                  </p>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {activeTab === 'mean' && (
        <Reveal>
          <div className="chapter-split" id="ch3-mean" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Grouped Mean">
                <p className="sub-intro">
                  Grouped data uses class marks and frequencies. We multiply each class mark by its
                  frequency, then divide by total frequency.
                </p>
                <div className="field-grid">
                  <div>
                    <label htmlFor="class-marks">Class marks</label>
                    <input
                      id="class-marks"
                      value={groupMarks}
                      onChange={(event) => setGroupMarks(event.target.value)}
                      placeholder="10, 20, 30, 40"
                    />
                  </div>
                  <div>
                    <label htmlFor="class-freqs">Frequencies</label>
                    <input
                      id="class-freqs"
                      value={groupFreqs}
                      onChange={(event) => setGroupFreqs(event.target.value)}
                      placeholder="2, 5, 4, 3"
                    />
                  </div>
                </div>
                <button className="action" type="button" onClick={handleGroupedMean}>
                  Compute grouped mean
                </button>
                {groupMeanOutput && <div className="result">{groupMeanOutput}</div>}
              </Container>
              <Container>
                <div className="explain">
                  <strong>Example:</strong> Class marks 10, 20, 30, 40 with frequencies 2, 5, 4, 3.
                </div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button
                  className="explainer-tab"
                  aria-selected={meanExp === 'steps'}
                  onClick={() => setMeanExp('steps')}
                >
                  Steps
                </button>
                <button
                  className="explainer-tab"
                  aria-selected={meanExp === 'lazy'}
                  onClick={() => setMeanExp('lazy')}
                >
                  Lazyplain
                </button>
              </div>

              {meanExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`\bar{x}=\frac{\sum f_i x_i}{\sum f_i}`} />
                  <ol className="steps">
                    <li>Multiply each class mark by its frequency.</li>
                    <li>Add all the products to get sum f x.</li>
                    <li>Divide by total frequency.</li>
                  </ol>
                </>
              ) : (
                <>
                  <h4>ELI5: Grouped Mean</h4>
                  <p className="steps">
                    Sometimes we have too many things to count individually. So we put them
                    in "buckets" (groups).
                  </p>
                  <ul className="steps">
                    <li>
                      <strong>Class Mark:</strong> The "middle" of a bucket.
                    </li>
                    <li>
                      <strong>Frequency:</strong> How many things are in that bucket.
                    </li>
                  </ul>
                  <p className="steps" style={{ marginTop: '8px' }}>
                    <strong>The Trick:</strong> We pretend everyone in the bucket is the same
                    size as the class mark, then we find the average!
                  </p>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {activeTab === 'median' && (
        <Reveal>
          <div className="chapter-split" id="ch3-median" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Grouped Median">
                <p className="sub-intro">
                  The grouped median estimates the middle value inside a class. You only need the median
                  class boundaries and the frequencies around it.
                </p>
                <div className="field-grid">
                  <div>
                    <label htmlFor="median-L">L (lower boundary)</label>
                    <input
                      id="median-L"
                      value={medianValues.L}
                      onChange={(event) => setMedianValues({ ...medianValues, L: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="median-N">N (total)</label>
                    <input
                      id="median-N"
                      value={medianValues.N}
                      onChange={(event) => setMedianValues({ ...medianValues, N: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="median-nb">n before</label>
                    <input
                      id="median-nb"
                      value={medianValues.nBefore}
                      onChange={(event) => setMedianValues({ ...medianValues, nBefore: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="median-nw">n within</label>
                    <input
                      id="median-nw"
                      value={medianValues.nWithin}
                      onChange={(event) => setMedianValues({ ...medianValues, nWithin: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="median-i">Class size i</label>
                    <input
                      id="median-i"
                      value={medianValues.i}
                      onChange={(event) => setMedianValues({ ...medianValues, i: event.target.value })}
                    />
                  </div>
                </div>
                <button className="action" type="button" onClick={handleGroupedMedian}>
                  Compute median
                </button>
                {medianOutput && <div className="result">{medianOutput}</div>}
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button
                  className="explainer-tab"
                  aria-selected={medianExp === 'steps'}
                  onClick={() => setMedianExp('steps')}
                >
                  Steps
                </button>
                <button
                  className="explainer-tab"
                  aria-selected={medianExp === 'lazy'}
                  onClick={() => setMedianExp('lazy')}
                >
                  Lazyplain
                </button>
              </div>

              {medianExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`\text{Median}=L+\frac{(N/2-n_b)}{n_w}i`} />
                  <ol className="steps">
                    <li>Find the median class where the running total passes N/2.</li>
                    <li>Use its lower boundary L and class width i.</li>
                    <li>Plug values into the formula.</li>
                  </ol>
                </>
              ) : (
                <>
                  <h4>ELI5: Grouped Median</h4>
                  <p className="steps">
                    This is like finding the middle of a crowd when you only know how many
                    people are in each room, but not exactly where they are standing.
                  </p>
                  <ul className="steps">
                    <li>
                      <strong>L (Lower boundary):</strong> The doorstep of the room where the
                      middle person must be.
                    </li>
                    <li>
                      <strong>N/2:</strong> The "Middle" spot we are looking for.
                    </li>
                  </ul>
                  <p className="steps" style={{ marginTop: '8px' }}>
                    <strong>How it works:</strong> We find which "room" has the middle person,
                    then we guess exactly where they are sitting inside that room.
                  </p>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {activeTab === 'mode' && (
        <Reveal>
          <div className="chapter-split" id="ch3-mode" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Grouped Mode">
                <p className="sub-intro">
                  The grouped mode estimates the most common value inside the modal class. You compare
                  the modal class to the ones before and after it.
                </p>
                <div className="field-grid">
                  <div>
                    <label htmlFor="mode-L">L (lower limit)</label>
                    <input
                      id="mode-L"
                      value={modeValues.L}
                      onChange={(event) => setModeValues({ ...modeValues, L: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="mode-t1">t1</label>
                    <input
                      id="mode-t1"
                      value={modeValues.t1}
                      onChange={(event) => setModeValues({ ...modeValues, t1: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="mode-t2">t2</label>
                    <input
                      id="mode-t2"
                      value={modeValues.t2}
                      onChange={(event) => setModeValues({ ...modeValues, t2: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="mode-i">Class size i</label>
                    <input
                      id="mode-i"
                      value={modeValues.i}
                      onChange={(event) => setModeValues({ ...modeValues, i: event.target.value })}
                    />
                  </div>
                </div>
                <button className="action" type="button" onClick={handleGroupedMode}>
                  Compute mode
                </button>
                {modeOutput && <div className="result">{modeOutput}</div>}
              </Container>
              <Container>
                <div className="explain">
                  <strong>Example:</strong> L=114.5, t1=5, t2=3, i=9 gives the modal estimate.
                </div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button
                  className="explainer-tab"
                  aria-selected={modeExp === 'steps'}
                  onClick={() => setModeExp('steps')}
                >
                  Steps
                </button>
                <button
                  className="explainer-tab"
                  aria-selected={modeExp === 'lazy'}
                  onClick={() => setModeExp('lazy')}
                >
                  Lazyplain
                </button>
              </div>

              {modeExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`\text{Mode}=L+\frac{t_1}{t_1+t_2}i`} />
                  <ol className="steps">
                    <li>Find the modal class (highest frequency).</li>
                    <li>Compute t1 and t2 using the neighboring classes.</li>
                    <li>Substitute into the formula.</li>
                  </ol>
                </>
              ) : (
                <>
                  <h4>ELI5: Grouped Mode</h4>
                  <p className="steps">
                    We want to find the most "popular" size.
                  </p>
                  <ul className="steps">
                    <li>
                      <strong>Modal Class:</strong> The bucket with the most stuff in it.
                    </li>
                    <li>
                      <strong>t1 & t2:</strong> We look at the buckets next door. If the bucket
                      before is also pretty full, the "true" mode is probably shifted towards
                      that side.
                    </li>
                  </ul>
                  <p className="steps" style={{ marginTop: '8px' }}>
                    <strong>Real world:</strong> Shoe stores use this to see which shoe size
                    realy is the most common so they can stock more of them.
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
