import { useEffect, useMemo, useRef, useState } from 'react';
import { Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Chapter1_2 from './chapters/Chapter1_2.jsx';
import Chapter3 from './chapters/Chapter3.jsx';
import Chapter4 from './chapters/Chapter4.jsx';
import Chapter5 from './chapters/Chapter5.jsx';
import Chapter6 from './chapters/Chapter6.jsx';
import Chapter7 from './chapters/Chapter7.jsx';
import Chapter8 from './chapters/Chapter8.jsx';
import AIAssist from './chapters/AIAssist.jsx';
import Settings from './chapters/Settings.jsx';
import Home from './chapters/Home.jsx';
import Reveal from './components/Reveal.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';

const tabConfig = [
  {
    id: 'home',
    path: '/',
    label: 'Home',
    title: 'Welcome Back',
    subtitle: 'Overview of modules and recent updates.',
    Component: Home,
    hidden: true,
  },
  {
    id: 'ch1-2',
    path: '/ch1-2',
    label: 'Ch 1-2',
    title: 'Relations + Functions',
    subtitle: 'Domain, range, inverse relations, and quadratic behavior.',
    Component: Chapter1_2,
  },
  {
    id: 'ch3',
    path: '/ch3',
    label: 'Ch 3',
    title: 'Statistics',
    subtitle: 'Central tendency, grouped data, and quick visuals.',
    Component: Chapter3,
  },
  {
    id: 'ch4',
    path: '/ch4',
    label: 'Ch 4',
    title: 'Rates + Variations',
    subtitle: 'Direct and inverse variation in practical steps.',
    Component: Chapter4,
  },
  {
    id: 'ch5',
    path: '/ch5',
    label: 'Ch 5',
    title: 'Sequences + Series',
    subtitle: 'Arithmetic, geometric, and compound interest patterns.',
    Component: Chapter5,
  },
  {
    id: 'ch6',
    path: '/ch6',
    label: 'Ch 6',
    title: 'Circles',
    subtitle: 'Arc length, sector area, and chord geometry.',
    Component: Chapter6,
  },
  {
    id: 'ch7',
    path: '/ch7',
    label: 'Ch 7',
    title: 'Earth as Sphere',
    subtitle: 'Great circle, small circle, and haversine distance.',
    Component: Chapter7,
  },
  {
    id: 'ch8',
    path: '/ch8',
    label: 'Ch 8',
    title: 'Accounting',
    subtitle: 'Balance equations and capital breakdowns.',
    Component: Chapter8,
  },
  {
    id: 'ai',
    path: '/ai',
    label: 'AI',
    title: 'AI Assist',
    subtitle: 'Identify topics, pick formulas, and outline hand-solve steps.',
    Component: AIAssist,
  },
  {
    id: 'settings',
    path: '/settings',
    label: 'Settings',
    title: 'Settings',
    subtitle: 'Configure AI keys and local preferences.',
    Component: Settings,
  },
];

export default function App() {
  const [sidebarWidth, setSidebarWidth] = useState(220);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const resizingRef = useRef(false);
  const shellRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const active = useMemo(
    () => tabConfig.find((tab) => tab.path === location.pathname) || tabConfig[0],
    [location.pathname]
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!resizingRef.current || !shellRef.current) return;
      const rect = shellRef.current.getBoundingClientRect();
      const nextWidth = Math.min(360, Math.max(180, event.clientX - rect.left));
      setSidebarWidth(nextWidth);
    };

    const stopResize = () => {
      resizingRef.current = false;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopResize);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopResize);
    };
  }, []);

  const startResize = (event) => {
    resizingRef.current = true;
    event.preventDefault();
  };

  return (
    <div className="app-frame">
      <div className="app-shell" ref={shellRef}>
        <aside className="section-stack sidebar" style={{ width: sidebarWidth }}>
          <Reveal>
            <div
              className="brand-card"
              onClick={() => navigate('/')}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate('/');
                }
              }}
            >
              <h1 className="hero-title">fML-3</h1>
              <p className="hero-sub">
                Signal lab technical tooling with oxide precision. Pick a chapter,
                set inputs, and read the explanation below each solver.
              </p>
              <div className="pill-row">
                <span className="pill">React</span>
                <span className="pill">Chart.js</span>
                <span className="pill">Sharp Geometry</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <nav className="tab-rail" role="tablist" aria-label="Math chapters">
              {tabConfig.filter(t => !t.hidden).map((tab) => (
                <NavLink
                  key={tab.id}
                  to={tab.path}
                  className={({ isActive }) => `tab-button ${tab.id === 'settings' ? 'full-width' : ''} ${isActive ? 'active' : ''}`}
                  role="tab"
                  aria-selected={location.pathname === tab.path}
                  id={`${tab.id}-tab`}
                  style={{ textDecoration: 'none' }} // Ensure no underline from NavLink/a tag
                >
                  {tab.label}
                </NavLink>
              ))}
              <ThemeToggle theme={theme} setTheme={setTheme} />
              <a
                href="/"
                className="tab-button full-width portal-link"
                style={{ textDecoration: 'none' }}
                aria-label="Back to main portal"
              >
                Main Portal
              </a>
            </nav>
          </Reveal>

          <Reveal delay={180}>
            <div className="brand-card" style={{ marginTop: 'auto', fontSize: '0.75rem', opacity: 0.7 }}>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600', color: 'var(--signal)' }}>
                Built with FML Framework
              </p>
              <p style={{ margin: 0, lineHeight: '1.5' }}>
                Formula Math Library - A modular system for building math education apps.
                Reusable formulas in <code style={{ background: 'var(--panel-2)', padding: '0.1rem 0.3rem', borderRadius: '2px' }}>fml-framework/</code>
              </p>
            </div>
          </Reveal>
        </aside>
        <div
          className="sidebar-resizer"
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize sidebar"
          onPointerDown={startResize}
        />

        <main
          className="panel"
          id="chapter-panel"
          role="tabpanel"
          aria-labelledby={`${active.id}-tab`}
        >
          <Reveal>
            <h2>{active.title}</h2>
            <p className="hero-sub">{active.subtitle}</p>
          </Reveal>
          <Routes>
            {tabConfig.map((tab) => (
              <Route
                key={tab.id}
                path={tab.path}
                element={<tab.Component theme={theme} />}
              />
            ))}
          </Routes>
        </main>
      </div>
    </div>
  );
}
