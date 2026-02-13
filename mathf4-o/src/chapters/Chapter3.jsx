import { useState, useRef } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import Container from '../components/Container';
import Reveal from '../components/Reveal';
import * as math from '../lib/math';

// 3D Components
function CylinderMesh({ radius, height }) {
    return (
        <mesh position={[0, height / 2, 0]}>
            <cylinderGeometry args={[radius, radius, height, 32]} />
            <meshStandardMaterial color="#4facfe" opacity={0.8} transparent />
        </mesh>
    );
}

function ConeMesh({ radius, height }) {
    return (
        <mesh position={[0, height / 2, 0]}>
            <coneGeometry args={[radius, height, 32]} />
            <meshStandardMaterial color="#e05a4f" opacity={0.8} transparent />
        </mesh>
    );
}

function SphereMesh({ radius }) {
    return (
        <mesh position={[0, radius, 0]}>
            <sphereGeometry args={[radius, 32, 32]} />
            <meshStandardMaterial color="#f5b623" opacity={0.8} transparent />
        </mesh>
    );
}

const subTabs = [
    { id: 'cylinder', label: 'Cylinder' },
    { id: 'cone', label: 'Cone' },
    { id: 'sphere', label: 'Sphere' },
];

export default function Chapter3() {
    const [activeTab, setActiveTab] = useState(subTabs[0].id);

    // Cylinder
    const [cylInputs, setCylInputs] = useState({ radius: '2', height: '4' });
    const [cylResult, setCylResult] = useState(null);
    const [cylExp, setCylExp] = useState('steps');

    // Cone
    const [coneInputs, setConeInputs] = useState({ radius: '3', height: '5' });
    const [coneResult, setConeResult] = useState(null);
    const [coneExp, setConeExp] = useState('steps');

    // Sphere
    const [sphInputs, setSphInputs] = useState({ radius: '2.5' });
    const [sphResult, setSphResult] = useState(null);
    const [sphExp, setSphExp] = useState('steps');

    const handleCylinder = () => {
        const res = math.calculateCylinderProperties(Number(cylInputs.radius), Number(cylInputs.height));
        setCylResult(res);
    };

    const handleCone = () => {
        const res = math.calculateConeProperties(Number(coneInputs.radius), Number(coneInputs.height));
        setConeResult(res);
    };

    const handleSphere = () => {
        const res = math.calculateSphereProperties(Number(sphInputs.radius));
        setSphResult(res);
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

            {activeTab === 'cylinder' && (
                <Reveal>
                    <div className="chapter-split">
                        <div className="chapter-work-area">
                            <Container title="Cylinder">
                                <div className="field-grid">
                                    <div><label>Radius</label><input value={cylInputs.radius} onChange={e => setCylInputs({ ...cylInputs, radius: e.target.value })} /></div>
                                    <div><label>Height</label><input value={cylInputs.height} onChange={e => setCylInputs({ ...cylInputs, height: e.target.value })} /></div>
                                </div>
                                <button className="action" onClick={handleCylinder}>Calculate</button>
                                {cylResult && <div className="result">Surface Area: {cylResult.surfaceArea.toFixed(2)}<br />Volume: {cylResult.volume.toFixed(2)}</div>}
                            </Container>

                            <Container title="3D View">
                                <div style={{ height: '300px', background: 'var(--panel-2)', borderRadius: '4px' }}>
                                    <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                                        <ambientLight intensity={0.5} />
                                        <pointLight position={[10, 10, 10]} />
                                        <CylinderMesh radius={Number(cylInputs.radius)} height={Number(cylInputs.height)} />
                                        <gridHelper args={[20, 20]} />
                                        <OrbitControls />
                                    </Canvas>
                                </div>
                            </Container>
                        </div>
                        <div className="chapter-explainer">
                            <div className="explainer-tabs">
                                <button className="explainer-tab" aria-selected={cylExp === 'steps'} onClick={() => setCylExp('steps')}>Steps</button>
                                <button className="explainer-tab" aria-selected={cylExp === 'lazy'} onClick={() => setCylExp('lazy')}>Lazyplain</button>
                            </div>

                            {cylExp === 'steps' ? (
                                <>
                                    <h4>Formulas</h4>
                                    <BlockMath math={String.raw`V = \pi r^2 h`} />
                                    <BlockMath math={String.raw`SA = 2\pi r^2 + 2\pi r h`} />
                                </>
                            ) : (
                                <>
                                    <h4>ELI5: Cylinder</h4>
                                    <p className="steps">Think of a <strong>stack of coins</strong> 🪙</p>
                                    <ul className="steps">
                                        <li><InlineMath math="r" /> = radius (width of one coin)</li>
                                        <li><InlineMath math="h" /> = height (how many coins)</li>
                                        <li><strong>Volume:</strong> Area of one coin × height.</li>
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                </Reveal>
            )}

            {activeTab === 'cone' && (
                <Reveal>
                    <div className="chapter-split">
                        <div className="chapter-work-area">
                            <Container title="Cone">
                                <div className="field-grid">
                                    <div><label>Radius</label><input value={coneInputs.radius} onChange={e => setConeInputs({ ...coneInputs, radius: e.target.value })} /></div>
                                    <div><label>Height</label><input value={coneInputs.height} onChange={e => setConeInputs({ ...coneInputs, height: e.target.value })} /></div>
                                </div>
                                <button className="action" onClick={handleCone}>Calculate</button>
                                {coneResult && <div className="result">Surface Area: {coneResult.surfaceArea.toFixed(2)}<br />Volume: {coneResult.volume.toFixed(2)}</div>}
                            </Container>

                            <Container title="3D View">
                                <div style={{ height: '300px', background: 'var(--panel-2)', borderRadius: '4px' }}>
                                    <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                                        <ambientLight intensity={0.5} />
                                        <pointLight position={[10, 10, 10]} />
                                        <ConeMesh radius={Number(coneInputs.radius)} height={Number(coneInputs.height)} />
                                        <gridHelper args={[20, 20]} />
                                        <OrbitControls />
                                    </Canvas>
                                </div>
                            </Container>
                        </div>
                        <div className="chapter-explainer">
                            <div className="explainer-tabs">
                                <button className="explainer-tab" aria-selected={coneExp === 'steps'} onClick={() => setConeExp('steps')}>Steps</button>
                                <button className="explainer-tab" aria-selected={coneExp === 'lazy'} onClick={() => setConeExp('lazy')}>Lazyplain</button>
                            </div>

                            {coneExp === 'steps' ? (
                                <>
                                    <h4>Formulas</h4>
                                    <BlockMath math={String.raw`V = \frac{1}{3} \pi r^2 h`} />
                                    <BlockMath math={String.raw`SA = \pi r^2 + \pi r l`} />
                                </>
                            ) : (
                                <>
                                    <h4>ELI5: Cone</h4>
                                    <p className="steps">Think of an <strong>Ice Cream Cone</strong> 🍦</p>
                                    <ul className="steps">
                                        <li>It holds exactly <strong>1/3</strong> of a cylinder cup.</li>
                                        <li>Same height <InlineMath math="h" /> and radius <InlineMath math="r" />? You get 3x less ice cream than the cylinder.</li>
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                </Reveal>
            )}

            {activeTab === 'sphere' && (
                <Reveal>
                    <div className="chapter-split">
                        <div className="chapter-work-area">
                            <Container title="Sphere">
                                <div className="field-grid">
                                    <div><label>Radius</label><input value={sphInputs.radius} onChange={e => setSphInputs({ ...sphInputs, radius: e.target.value })} /></div>
                                </div>
                                <button className="action" onClick={handleSphere}>Calculate</button>
                                {sphResult && <div className="result">Surface Area: {sphResult.surfaceArea.toFixed(2)}<br />Volume: {sphResult.volume.toFixed(2)}</div>}
                            </Container>

                            <Container title="3D View">
                                <div style={{ height: '300px', background: 'var(--panel-2)', borderRadius: '4px' }}>
                                    <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                                        <ambientLight intensity={0.5} />
                                        <pointLight position={[10, 10, 10]} />
                                        <SphereMesh radius={Number(sphInputs.radius)} />
                                        <gridHelper args={[20, 20]} />
                                        <OrbitControls />
                                    </Canvas>
                                </div>
                            </Container>
                        </div>
                        <div className="chapter-explainer">
                            <div className="explainer-tabs">
                                <button className="explainer-tab" aria-selected={sphExp === 'steps'} onClick={() => setSphExp('steps')}>Steps</button>
                                <button className="explainer-tab" aria-selected={sphExp === 'lazy'} onClick={() => setSphExp('lazy')}>Lazyplain</button>
                            </div>

                            {sphExp === 'steps' ? (
                                <>
                                    <h4>Formulas</h4>
                                    <BlockMath math={String.raw`V = \frac{4}{3} \pi r^3`} />
                                    <BlockMath math={String.raw`SA = 4 \pi r^2`} />
                                </>
                            ) : (
                                <>
                                    <h4>ELI5: Sphere</h4>
                                    <p className="steps">Think of a <strong>Basketball</strong> 🏀</p>
                                    <ul className="steps">
                                        <li><InlineMath math="r" /> = radius (center to skin)</li>
                                        <li>Its surface area is exactly 4 circles of the same shadow. 4 × <InlineMath math="\pi r^2" />.</li>
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
