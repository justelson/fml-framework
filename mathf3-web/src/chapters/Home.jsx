import React from 'react';
import Container from '../components/Container';
import Reveal from '../components/Reveal';

export default function Home() {
    return (
        <div className="chapter-split">
            <div className="chapter-work-area">
                <Container title="Welcome to fML-3">
                    <Reveal>
                        <p>
                            Welcome to the <strong>Formula Math Library (fML-3)</strong>. This application is designed to help you explore and understand various mathematical concepts through interactive solvers and detailed explanations.
                        </p>
                        <p>
                            Select a chapter from the sidebar to get started, or check the <strong>AI Assist</strong> tab for personalized help.
                        </p>

                        <h3>Core Modules</h3>
                        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                            <li><strong>Relations + Functions (Ch 1-2):</strong> Explore domain, range, and quadratic behaviors.</li>
                            <li><strong>Statistics (Ch 3):</strong> Analyze data with central tendency and visualizations.</li>
                            <li><strong>Rates + Variations (Ch 4):</strong> Understand direct and inverse relationships.</li>
                            <li><strong>Sequences + Series (Ch 5):</strong> Discover patterns in numbers and financial models.</li>
                            <li><strong>Geometry (Ch 6-7):</strong> Dive into circles and spherical geometry.</li>
                            <li><strong>Accounting (Ch 8):</strong> meaningful financial insights.</li>
                        </ul>

                        <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--panel)', borderRadius: '8px', borderLeft: '4px solid var(--signal)' }}>
                            <strong>New Feature:</strong> AI Assist is now available to help you break down complex math problems step-by-step.
                        </div>
                    </Reveal>
                </Container>
            </div>

            <div className="chapter-explainer">
                <Reveal delay={200}>
                    <div className="explainer-card">
                        <h4>Quick Start</h4>
                        <p>
                            Click on any chapter on the left sidebar to open its workspace. Each workspace contains specific solvers and tools relevant to that topic.
                        </p>
                    </div>

                    <div className="explainer-card">
                        <h4>Documentation</h4>
                        <p>All documentation for users and developers can now be found in the <strong>Settings</strong> tab.</p>
                    </div>

                    <div className="explainer-card">
                        <h4>System Status</h4>
                        <p>All modules loaded and ready.</p>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                            <span className="pill">v3.0.0</span>
                            <span className="pill">Online</span>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
