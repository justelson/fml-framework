import { BookOpen, Calculator, Compass, TrendingUp } from 'lucide-react';
import Container from '../components/Container';
import Reveal from '../components/Reveal';

export default function Home() {
  const chapters = [
    { id: '1-2', title: 'Relations & Functions + Algebra', icon: <Compass size={24} />, topics: 'Domain, range, linear and quadratic behavior' },
    { id: 3, title: 'Statistics', icon: <TrendingUp size={24} />, topics: 'Mean, median, mode, grouped data, interpretation' },
    { id: 4, title: 'Rates & Variations', icon: <Calculator size={24} />, topics: 'Direct, inverse, and applied variation models' },
    { id: 5, title: 'Sequences & Series', icon: <BookOpen size={24} />, topics: 'AP, GP, terms, sums, and compound growth' },
    { id: 6, title: 'Circles', icon: <Compass size={24} />, topics: 'Area, circumference, arc, sector, and chord calculations' },
    { id: 7, title: 'Earth Geometry', icon: <TrendingUp size={24} />, topics: 'Great circle, small circle, and haversine distance' },
    { id: 8, title: 'Accounting', icon: <Calculator size={24} />, topics: 'Balance sheet logic and accounting equation' },
  ];

  return (
    <div className="home-container">
      <Reveal>
        <Container title="Form 3 Basic Mathematics - Old Syllabus">
          <p style={{ marginBottom: '1.5rem', color: 'var(--muted)' }}>
            Welcome to the Form 3 learning platform. The home layout now matches Form 4 style:
            clear chapter cards, quick topic scan, and direct path to AI support.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {chapters.map((chapter, idx) => (
              <Reveal key={chapter.id} delay={idx * 100}>
                <div
                  className="chapter-card"
                  style={{
                    padding: '1.5rem',
                    border: '1px solid var(--line)',
                    borderRadius: '8px',
                    background: 'var(--panel-2)',
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
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                    <div style={{ color: 'var(--signal)' }}>{chapter.icon}</div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Ch {chapter.id}: {chapter.title}</h3>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--muted)' }}>{chapter.topics}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--panel-2)', borderRadius: '8px', border: '1px solid var(--signal)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--signal)' }}>AI Assistant Available</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--muted)' }}>
              Use the AI Assist tab for natural-language questions. The assistant chooses tools
              automatically and responds with computed answers and step-by-step guidance.
            </p>
          </div>
        </Container>
      </Reveal>
    </div>
  );
}
