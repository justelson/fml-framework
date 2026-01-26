import { useState } from 'react';
import { BlockMath } from 'react-katex';
import Reveal from '../components/Reveal.jsx';
import Container from '../components/Container.jsx';
import {
  circleProperties,
  arcLengthSectorArea,
  chordLength,
  formatNumber,
} from '../lib/math.js';

const subTabs = [
  { id: 'props', label: 'Basics' },
  { id: 'arc', label: 'Arc + Sector' },
  { id: 'chord', label: 'Chord' },
];

export default function Chapter6() {
  const [activeTab, setActiveTab] = useState(subTabs[0].id);
  const [circleValues, setCircleValues] = useState({ radius: '5' });
  const [circleOutput, setCircleOutput] = useState('');
  const [circleExp, setCircleExp] = useState('steps');

  const [arcValues, setArcValues] = useState({ radius: '5', theta: '60' });
  const [arcOutput, setArcOutput] = useState('');
  const [arcExp, setArcExp] = useState('steps');

  const [chordValues, setChordValues] = useState({ radius: '5', distance: '3' });
  const [chordOutput, setChordOutput] = useState('');
  const [chordExp, setChordExp] = useState('steps');

  const handleCircle = () => {
    const radius = Number(circleValues.radius);
    const result = circleProperties(radius);
    setCircleOutput(
      `Area: ${formatNumber(result.area, 3)}\nCircumference: ${formatNumber(result.circumference, 3)}`
    );
  };

  const handleArc = () => {
    const radius = Number(arcValues.radius);
    const theta = Number(arcValues.theta);
    const result = arcLengthSectorArea(radius, theta);
    setArcOutput(
      `Arc length: ${formatNumber(result.arcLength, 3)}\nSector area: ${formatNumber(result.sectorArea, 3)}`
    );
  };

  const handleChord = () => {
    const radius = Number(chordValues.radius);
    const distance = Number(chordValues.distance);
    const result = chordLength(radius, distance);
    if (!result) {
      setChordOutput('Distance must be smaller than radius.');
      return;
    }
    setChordOutput(
      `Half chord: ${formatNumber(result.halfChord, 3)}\nChord length: ${formatNumber(result.chord, 3)}`
    );
  };

  return (
    <section className="section-stack" style={{ gap: '1rem' }}>
      <div className="mini-tabs" role="tablist" aria-label="Circle topics">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            className="mini-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`ch6-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'props' && (
        <Reveal>
          <div className="chapter-split" id="ch6-props" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Circle Properties">
                <p className="sub-intro">
                  Circles have a radius, and from that we can find area and circumference. These are the
                  two core measurements you use in most circle questions.
                </p>
                <div className="field-grid">
                  <div>
                    <label htmlFor="circle-radius">Radius</label>
                    <input
                      id="circle-radius"
                      value={circleValues.radius}
                      onChange={(event) => setCircleValues({ radius: event.target.value })}
                    />
                  </div>
                </div>
                <button className="action" type="button" onClick={handleCircle}>
                  Compute area + circumference
                </button>
                {circleOutput && <div className="result">{circleOutput}</div>}
              </Container>
              <Container>
                <div className="explain">
                  <strong>Example:</strong> r=5 gives area 78.54 and circumference 31.42.
                </div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button
                  className="explainer-tab"
                  aria-selected={circleExp === 'steps'}
                  onClick={() => setCircleExp('steps')}
                >
                  Steps
                </button>
                <button
                  className="explainer-tab"
                  aria-selected={circleExp === 'lazy'}
                  onClick={() => setCircleExp('lazy')}
                >
                  Lazyplain
                </button>
              </div>

              {circleExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`A=\pi r^2`} />
                  <BlockMath math={String.raw`C=2\pi r`} />
                  <ol className="steps">
                    <li>Square the radius for area.</li>
                    <li>Multiply by 2 and pi for circumference.</li>
                    <li>Keep units consistent.</li>
                  </ol>
                </>
              ) : (
                <>
                  <h4>ELI5: Circle Basics</h4>
                  <p className="steps">
                    A circle is just a round shape where every point on the edge is the same
                    distance from the center.
                  </p>
                  <ul className="steps">
                    <li>
                      <strong>Radius (r):</strong> The distance from the center to the edge.
                      Like the spoke on a bike wheel.
                    </li>
                    <li>
                      <strong>Circumference:</strong> If you walked all the way around the
                      edge, how far did you go?
                    </li>
                    <li>
                      <strong>Area:</strong> How much paint would you need to color the whole
                      circle in?
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {activeTab === 'arc' && (
        <Reveal>
          <div className="chapter-split" id="ch6-arc" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Arc Length + Sector Area">
                <p className="sub-intro">
                  A sector is a slice of a circle. The angle tells what fraction of the whole circle you
                  are using.
                </p>
                <div className="field-grid">
                  <div>
                    <label htmlFor="arc-radius">Radius</label>
                    <input
                      id="arc-radius"
                      value={arcValues.radius}
                      onChange={(event) => setArcValues({ ...arcValues, radius: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="arc-theta">Theta (degrees)</label>
                    <input
                      id="arc-theta"
                      value={arcValues.theta}
                      onChange={(event) => setArcValues({ ...arcValues, theta: event.target.value })}
                    />
                  </div>
                </div>
                <button className="action" type="button" onClick={handleArc}>
                  Compute arc + sector
                </button>
                {arcOutput && <div className="result">{arcOutput}</div>}
              </Container>
              <Container>
                <div className="explain">
                  <strong>Example:</strong> r=5, theta=60 gives arc length and sector area.
                </div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button
                  className="explainer-tab"
                  aria-selected={arcExp === 'steps'}
                  onClick={() => setArcExp('steps')}
                >
                  Steps
                </button>
                <button
                  className="explainer-tab"
                  aria-selected={arcExp === 'lazy'}
                  onClick={() => setArcExp('lazy')}
                >
                  Lazyplain
                </button>
              </div>

              {arcExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`l=\frac{\theta}{360}\cdot 2\pi r`} />
                  <BlockMath math={String.raw`A=\frac{\theta}{360}\cdot \pi r^2`} />
                  <ol className="steps">
                    <li>Convert the angle to a fraction of 360.</li>
                    <li>Multiply by the full circumference for arc length.</li>
                    <li>Multiply by the full area for sector area.</li>
                  </ol>
                </>
              ) : (
                <>
                  <h4>ELI5: Arc & Sector</h4>
                  <p className="steps">
                    This is like eating a giant pizza!
                  </p>
                  <ul className="steps">
                    <li>
                      <strong>Sector:</strong> The actual slice of pizza you are eating.
                    </li>
                    <li>
                      <strong>Arc:</strong> Just the crust of that specific slice.
                    </li>
                    <li>
                      <strong>Theta (Angle):</strong> How "hungry" you are. A 90 degree angle
                      means you are eating exactly 1/4 of the pizza.
                    </li>
                  </ul>
                  <p className="steps" style={{ marginTop: '8px' }}>
                    <strong>The Math:</strong> We just find the "whole" pizza's size and take
                    the fraction we want.
                  </p>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {activeTab === 'chord' && (
        <Reveal>
          <div className="chapter-split" id="ch6-chord" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Chord Length">
                <p className="sub-intro">
                  A chord is a straight line between two points on the circle. We use a right triangle to
                  find its length.
                </p>
                <div className="field-grid">
                  <div>
                    <label htmlFor="chord-radius">Radius</label>
                    <input
                      id="chord-radius"
                      value={chordValues.radius}
                      onChange={(event) => setChordValues({ ...chordValues, radius: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="chord-distance">Distance from center</label>
                    <input
                      id="chord-distance"
                      value={chordValues.distance}
                      onChange={(event) => setChordValues({ ...chordValues, distance: event.target.value })}
                    />
                  </div>
                </div>
                <button className="action" type="button" onClick={handleChord}>
                  Compute chord
                </button>
                {chordOutput && <div className="result">{chordOutput}</div>}
              </Container>
              <Container>
                <div className="explain">
                  <strong>Example:</strong> r=5, distance=3 gives chord length 8.
                </div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button
                  className="explainer-tab"
                  aria-selected={chordExp === 'steps'}
                  onClick={() => setChordExp('steps')}
                >
                  Steps
                </button>
                <button
                  className="explainer-tab"
                  aria-selected={chordExp === 'lazy'}
                  onClick={() => setChordExp('lazy')}
                >
                  Lazyplain
                </button>
              </div>

              {chordExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`\text{half}=\sqrt{r^2-d^2}`} />
                  <BlockMath math={String.raw`\text{chord}=2\cdot \text{half}`} />
                  <ol className="steps">
                    <li>Draw the right triangle from center to chord.</li>
                    <li>Use Pythagoras to find half the chord.</li>
                    <li>Double it to get full chord length.</li>
                  </ol>
                </>
              ) : (
                <>
                  <h4>ELI5: Chords</h4>
                  <p className="steps">
                    A chord is like a short-cut path across a circular park.
                  </p>
                  <ul className="steps">
                    <li>
                      <strong>The Rule:</strong> If you draw a line from the center straight
                      to the middle of the chord, it makes a "Perfect Corner" (90 degrees).
                    </li>
                    <li>
                      <strong>Finding Length:</strong> We use the <strong>Pythagorean Theorem</strong>
                      (the triangle rule) to find half the length, then double it.
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
