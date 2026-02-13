import { useEffect, useMemo, useRef, useState } from 'react';
import { Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom';
import AIAssist from './chapters/AIAssist.jsx';
import Settings from './chapters/Settings.jsx';
import Home from './chapters/Home.jsx';
import Reveal from './components/Reveal.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';

// DYNAMIC_IMPORTS_START
// DYNAMIC_IMPORTS_END

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
    // DYNAMIC_TAB_CONFIG_START
    // DYNAMIC_TAB_CONFIG_END
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

    // Resize logic
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
                        >
                            <h1 className="hero-title">{{ APP_TITLE }}</h1>
                            <p className="hero-sub">
                                {{ APP_DESCRIPTION }}
                            </p>
                            <div className="pill-row">
                                <span className="pill">React</span>
                                <span className="pill">Chart.js</span>
                                <span className="pill">FML Framework</span>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={120}>
                        <nav className="tab-rail" role="tablist">
                            {tabConfig.filter(t => !t.hidden).map((tab) => (
                                <NavLink
                                    key={tab.id}
                                    to={tab.path}
                                    className={({ isActive }) => `tab-button ${tab.id === 'settings' ? 'full-width' : ''} ${isActive ? 'active' : ''}`}
                                    role="tab"
                                    id={`${tab.id}-tab`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    {tab.label}
                                </NavLink>
                            ))}
                            <ThemeToggle theme={theme} setTheme={setTheme} />
                        </nav>
                    </Reveal>

                    <Reveal delay={180}>
                        <div className="brand-card" style={{ marginTop: 'auto', fontSize: '0.75rem', opacity: 0.7 }}>
                            <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600', color: 'var(--signal)' }}>
                                Built with FML Framework
                            </p>
                            <p style={{ margin: 0, lineHeight: '1.5' }}>
                                Formula Math Library
                            </p>
                        </div>
                    </Reveal>
                </aside>
                <div
                    className="sidebar-resizer"
                    onPointerDown={startResize}
                />

                <main
                    className="panel"
                    id="chapter-panel"
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
