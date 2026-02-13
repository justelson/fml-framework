import { BookOpen, Calculator, Compass, TrendingUp } from 'lucide-react';
import Container from '../components/Container';
import Reveal from '../components/Reveal';

export default function Home() {
  const chapters = [
    { id: 1, title: 'Coordinate Geometry', icon: <Compass size={24} />, topics: 'Gradients, Distance, Midpoint, Line Equations' },
    { id: 2, title: 'Areas & Perimeters', icon: <Calculator size={24} />, topics: 'Triangles, Quadrilaterals, Polygons, Circles' },
    { id: 3, title: '3D Figures', icon: <BookOpen size={24} />, topics: 'Cylinders, Cones, Spheres, Pyramids, Prisms' },
    { id: 4, title: 'Probability', icon: <TrendingUp size={24} />, topics: 'Events, Combined Probability, Tree Diagrams' },
    { id: 5, title: 'Trigonometry', icon: <Calculator size={24} />, topics: 'Sine Rule, Cosine Rule, 3D Problems' },
    { id: 6, title: 'Vectors', icon: <Compass size={24} />, topics: 'Magnitude, Direction, Operations' },
    { id: 7, title: 'Matrices & Transformations', icon: <BookOpen size={24} />, topics: 'Determinants, Inverse, Transformations' },
    { id: 8, title: 'Linear Programming', icon: <TrendingUp size={24} />, topics: 'Inequalities, Feasible Regions, Optimization' },
  ];

  return (
    <div className="home-container">
      <Reveal>
        <Container title="📚 Form 4 Basic Mathematics - Old Syllabus">
          <p style={{ marginBottom: '1.5rem', color: 'var(--muted)' }}>
            Welcome to the comprehensive Form 4 Mathematics learning platform. This app covers all 8 chapters
            with interactive calculators, visualizations, and AI-powered assistance.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {chapters.map((chapter, idx) => (
              <Reveal key={chapter.id} delay={idx * 100}>
                <div className="chapter-card" style={{
                  padding: '1.5rem',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  background: 'var(--panel-bg)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                    <div style={{ color: 'var(--accent)' }}>{chapter.icon}</div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Ch {chapter.id}: {chapter.title}</h3>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--muted)' }}>{chapter.topics}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--accent-bg)', borderRadius: '8px', border: '1px solid var(--accent)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>🤖 AI Assistant Available</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--muted)' }}>
              Use the AI Assist tab to ask questions in natural language. The AI will automatically select
              the right tool and provide step-by-step explanations for any problem.
            </p>
          </div>
        </Container>
      </Reveal>
    </div>
  );
}
