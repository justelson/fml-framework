import { useState } from 'react';
import { BlockMath } from 'react-katex';
import Reveal from '../components/Reveal.jsx';
import Container from '../components/Container.jsx';
import {
  greatCircleDistance,
  smallCircleDistance,
  haversineDistance,
  formatNumber,
} from '../lib/math.js';

const subTabs = [
  { id: 'great', label: 'Great Circle' },
  { id: 'small', label: 'Small Circle' },
  { id: 'haversine', label: 'Haversine' },
];

export default function Chapter7() {
  const [activeTab, setActiveTab] = useState(subTabs[0].id);
  const [greatValues, setGreatValues] = useState({ lat1: '10', lat2: '45' });
  const [greatOutput, setGreatOutput] = useState('');
  const [greatExp, setGreatExp] = useState('steps');

  const [smallValues, setSmallValues] = useState({ long1: '10', long2: '30', lat: '20' });
  const [smallOutput, setSmallOutput] = useState('');
  const [smallExp, setSmallExp] = useState('steps');

  const [havValues, setHavValues] = useState({ lat1: '-6.7', lon1: '39.2', lat2: '-6.1', lon2: '35.7' });
  const [havOutput, setHavOutput] = useState('');
  const [havExp, setHavExp] = useState('steps');

  const handleGreat = () => {
    const lat1 = Number(greatValues.lat1);
    const lat2 = Number(greatValues.lat2);
    const result = greatCircleDistance(lat1, lat2);
    setGreatOutput(
      `Angle difference: ${formatNumber(result.alpha, 2)} deg\nDistance: ${formatNumber(result.distanceNm, 2)} nm\nDistance: ${formatNumber(result.distanceKm, 2)} km`
    );
  };

  const handleSmall = () => {
    const long1 = Number(smallValues.long1);
    const long2 = Number(smallValues.long2);
    const latitude = Number(smallValues.lat);
    const result = smallCircleDistance(long1, long2, latitude);
    setSmallOutput(
      `Longitude diff: ${formatNumber(result.alpha, 2)} deg\nDistance: ${formatNumber(result.distanceNm, 2)} nm\nDistance: ${formatNumber(result.distanceKm, 2)} km`
    );
  };

  const handleHaversine = () => {
    const lat1 = Number(havValues.lat1);
    const lon1 = Number(havValues.lon1);
    const lat2 = Number(havValues.lat2);
    const lon2 = Number(havValues.lon2);
    const distance = haversineDistance(lat1, lon1, lat2, lon2);
    setHavOutput(`Great circle distance: ${formatNumber(distance, 2)} km`);
  };

  return (
    <section className="section-stack" style={{ gap: '1rem' }}>
      <div className="mini-tabs" role="tablist" aria-label="Earth as a sphere topics">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            className="mini-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`ch7-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'great' && (
        <Reveal>
          <div className="chapter-split" id="ch7-great" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Great Circle (Meridian)">
                <p className="sub-intro">
                  A great circle goes through the center of the Earth. Along a meridian, you only need
                  the latitude difference.
                </p>
                <div className="field-grid">
                  <div>
                    <label htmlFor="great-lat1">Latitude 1</label>
                    <input
                      id="great-lat1"
                      value={greatValues.lat1}
                      onChange={(event) => setGreatValues({ ...greatValues, lat1: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="great-lat2">Latitude 2</label>
                    <input
                      id="great-lat2"
                      value={greatValues.lat2}
                      onChange={(event) => setGreatValues({ ...greatValues, lat2: event.target.value })}
                    />
                  </div>
                </div>
                <button className="action" type="button" onClick={handleGreat}>
                  Compute distance
                </button>
                {greatOutput && <div className="result">{greatOutput}</div>}
              </Container>
              <Container>
                <div className="explain">
                  <strong>Example:</strong> Lat 10 to 45 gives the meridian distance.
                </div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button
                  className="explainer-tab"
                  aria-selected={greatExp === 'steps'}
                  onClick={() => setGreatExp('steps')}
                >
                  Steps
                </button>
                <button
                  className="explainer-tab"
                  aria-selected={greatExp === 'lazy'}
                  onClick={() => setGreatExp('lazy')}
                >
                  Lazyplain
                </button>
              </div>

              {greatExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`d=\alpha\cdot 60\,\text{nm}`} />
                  <ol className="steps">
                    <li>Find the angle difference in latitude (alpha).</li>
                    <li>Multiply by 60 to get nautical miles.</li>
                    <li>Convert to km by multiplying by 1.852 if needed.</li>
                  </ol>
                </>
              ) : (
                <>
                  <h4>ELI5: Great Circles</h4>
                  <p className="steps">
                    A "Great Circle" is the biggest circle you can draw on a ball. Like the
                    Earth's Equator or the lines going top-to-bottom (Meridians).
                  </p>
                  <ul className="steps">
                    <li>
                      <strong>The Rule:</strong> On a Great Circle, <strong>1 degree</strong> equals
                      exactly <strong>60 nautical miles</strong>.
                    </li>
                    <li>
                      <strong>Meridians:</strong> These are the lines that go from the North
                      Pole to the South Pole. If you travel along one, you are on a Great
                      Circle!
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {activeTab === 'small' && (
        <Reveal>
          <div className="chapter-split" id="ch7-small" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Small Circle (Parallel)">
                <p className="sub-intro">
                  A small circle is a parallel line that does not pass through the Earth's center. Use
                  longitude difference and cosine of latitude.
                </p>
                <div className="field-grid">
                  <div>
                    <label htmlFor="small-long1">Longitude 1</label>
                    <input
                      id="small-long1"
                      value={smallValues.long1}
                      onChange={(event) => setSmallValues({ ...smallValues, long1: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="small-long2">Longitude 2</label>
                    <input
                      id="small-long2"
                      value={smallValues.long2}
                      onChange={(event) => setSmallValues({ ...smallValues, long2: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="small-lat">Latitude</label>
                    <input
                      id="small-lat"
                      value={smallValues.lat}
                      onChange={(event) => setSmallValues({ ...smallValues, lat: event.target.value })}
                    />
                  </div>
                </div>
                <button className="action" type="button" onClick={handleSmall}>
                  Compute distance
                </button>
                {smallOutput && <div className="result">{smallOutput}</div>}
              </Container>
              <Container>
                <div className="explain">
                  <strong>Example:</strong> Long 10 to 30 at lat 20 shows distance along a parallel.
                </div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button
                  className="explainer-tab"
                  aria-selected={smallExp === 'steps'}
                  onClick={() => setSmallExp('steps')}
                >
                  Steps
                </button>
                <button
                  className="explainer-tab"
                  aria-selected={smallExp === 'lazy'}
                  onClick={() => setSmallExp('lazy')}
                >
                  Lazyplain
                </button>
              </div>

              {smallExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`d=\alpha\cdot 60\cos(\phi)`} />
                  <ol className="steps">
                    <li>Find longitude difference alpha in degrees.</li>
                    <li>Compute cos(latitude) using degrees.</li>
                    <li>Multiply by 60 and by cosine.</li>
                  </ol>
                </>
              ) : (
                <>
                  <h4>ELI5: Small Circles</h4>
                  <p className="steps">
                    These are any circles on Earth that *don't* cut through the exact center.
                    Like the parallel lines above or below the Equator.
                  </p>
                  <ul className="steps">
                    <li>
                      <strong>The Problem:</strong> As you go towards the North or South Pole,
                      the Earth gets "skinnier." So 1 degree of longitude is a shorter
                      distance than at the Equator.
                    </li>
                    <li>
                      <strong>The Fix:</strong> We multiply the distance by <strong>cos(latitude)</strong>
                      to adjust for how skinny the Earth is at that spot.
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {activeTab === 'haversine' && (
        <Reveal>
          <div className="chapter-split" id="ch7-haversine" role="tabpanel">
            <div className="chapter-work-area">
              <Container title="Haversine Distance">
                <p className="sub-intro">
                  Haversine is used for any two points on Earth. You enter both latitude and longitude to
                  get total distance.
                </p>
                <div className="field-grid">
                  <div>
                    <label htmlFor="hav-lat1">Latitude 1</label>
                    <input
                      id="hav-lat1"
                      value={havValues.lat1}
                      onChange={(event) => setHavValues({ ...havValues, lat1: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="hav-lon1">Longitude 1</label>
                    <input
                      id="hav-lon1"
                      value={havValues.lon1}
                      onChange={(event) => setHavValues({ ...havValues, lon1: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="hav-lat2">Latitude 2</label>
                    <input
                      id="hav-lat2"
                      value={havValues.lat2}
                      onChange={(event) => setHavValues({ ...havValues, lat2: event.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="hav-lon2">Longitude 2</label>
                    <input
                      id="hav-lon2"
                      value={havValues.lon2}
                      onChange={(event) => setHavValues({ ...havValues, lon2: event.target.value })}
                    />
                  </div>
                </div>
                <button className="action" type="button" onClick={handleHaversine}>
                  Compute great circle
                </button>
                {havOutput && <div className="result">{havOutput}</div>}
              </Container>
              <Container>
                <div className="explain">
                  <strong>Example:</strong> Dar es Salaam to Dodoma sample coordinates show total km.
                </div>
              </Container>
            </div>

            <div className="chapter-explainer">
              <div className="explainer-tabs">
                <button
                  className="explainer-tab"
                  aria-selected={havExp === 'steps'}
                  onClick={() => setHavExp('steps')}
                >
                  Steps
                </button>
                <button
                  className="explainer-tab"
                  aria-selected={havExp === 'lazy'}
                  onClick={() => setHavExp('lazy')}
                >
                  Lazyplain
                </button>
              </div>

              {havExp === 'steps' ? (
                <>
                  <h4>Solve by hand</h4>
                  <BlockMath math={String.raw`a=\sin^2(\Delta\phi/2)+\cos\phi_1\cos\phi_2\sin^2(\Delta\lambda/2)`} />
                  <BlockMath math={String.raw`d=2R\arctan2(\sqrt{a},\sqrt{1-a})`} />
                  <ol className="steps">
                    <li>Convert latitudes and longitudes to radians.</li>
                    <li>Compute a using the haversine formula.</li>
                    <li>Find distance d using Earth's radius R.</li>
                  </ol>
                </>
              ) : (
                <>
                  <h4>ELI5: Haversine Distance</h4>
                  <p className="steps">
                    This is how airplanes and ships find the shortest path between any two
                    cities on Earth.
                  </p>
                  <ul className="steps">
                    <li>
                      <strong>Wait, Distance?</strong> Since Earth is a ball, the shortest
                      path is actually a curve, not a straight line through the ground.
                    </li>
                    <li>
                      <strong>How it works:</strong> It takes the latitude and longitude of
                      two points and calculates the "Great Circle" path between them.
                    </li>
                  </ul>
                  <p className="steps" style={{ marginTop: '8px' }}>
                    <strong>Why use it?</strong> It's accurate even for very small distances,
                    unlike some other simple formulas.
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
