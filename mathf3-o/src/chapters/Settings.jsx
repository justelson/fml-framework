import { useEffect, useState } from 'react';
import { Key, BookOpen, Code, Info, ExternalLink, Github, Lightbulb, Zap, MessageSquare, Settings as SettingsIcon, FileText, Folder, Check, Copy } from 'lucide-react';
import Container from '../components/Container.jsx';
import MarkdownText from '../components/MarkdownText.jsx';
import userDocs from '../data/userDocs.json';
import developerDocs from '../data/developerDocs.json';

export default function Settings() {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [status, setStatus] = useState('');
  const [activeTab, setActiveTab] = useState('settings');
  const [activeSection, setActiveSection] = useState('');

  // Auto-select first section when tab changes
  useEffect(() => {
    if (activeTab === 'user-docs' && userDocs.sections.length > 0) {
      setActiveSection(userDocs.sections[0].id);
    } else if (activeTab === 'dev-docs' && developerDocs.sections.length > 0) {
      setActiveSection(developerDocs.sections[0].id);
    }
  }, [activeTab]);

  useEffect(() => {
    const stored = window.localStorage.getItem('groqApiKey') || '';
    setApiKey(stored);
  }, []);

  const handleSave = () => {
    const trimmed = apiKey.trim();
    window.localStorage.setItem('groqApiKey', trimmed);
    setStatus(trimmed ? 'Groq API key saved locally.' : 'Groq API key cleared.');
    setTimeout(() => setStatus(''), 3000);
  };

  const handleClear = () => {
    window.localStorage.removeItem('groqApiKey');
    setApiKey('');
    setStatus('Groq API key removed.');
    setTimeout(() => setStatus(''), 3000);
  };

  const iconMap = {
    key: Key,
    book: BookOpen,
    code: Code,
    info: Info,
    lightbulb: Lightbulb,
    zap: Zap,
    message: MessageSquare,
    settings: SettingsIcon,
    file: FileText,
    folder: Folder,
    rocket: Zap,
    brain: Lightbulb,
    palette: FileText,
    shield: Info,
    puzzle: Folder,
    plus: Zap,
    github: Github,
    package: Folder
  };

  const renderIcon = (iconName, size = 16, color = 'var(--text)') => {
    const Icon = iconMap[iconName] || Info;
    return <Icon size={size} color={color} />;
  };

  const renderContent = (content) => {
    return content.map((block, idx) => {
      switch (block.type) {
        case 'heading':
          return <h4 key={idx} style={{ marginTop: '1.5rem', marginBottom: '0.75rem', color: 'var(--text)' }}>{block.text}</h4>;
        case 'paragraph':
          return <p key={idx} style={{ lineHeight: '1.6', color: 'var(--text)', marginBottom: '1rem' }}>{block.text}</p>;
        case 'code':
          return (
            <div key={idx} style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--line)', marginBottom: '1rem', overflowX: 'auto' }}>
              <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text)' }}>{block.text}</pre>
            </div>
          );
        case 'list':
          return (
            <ul key={idx} className="steps" style={{ marginBottom: '1rem' }}>
              {block.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
        case 'callout':
          const colors = {
            info: 'var(--signal)',
            warning: '#ff6b6b',
            tip: 'var(--oxide-bright)'
          };
          return (
            <div key={idx} style={{
              display: 'flex',
              gap: '0.75rem',
              padding: '1rem',
              background: 'var(--panel-2)',
              borderLeft: `3px solid ${colors[block.variant] || 'var(--signal)'}`,
              marginBottom: '1rem'
            }}>
              <Info size={20} color={colors[block.variant]} style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{block.text}</div>
            </div>
          );
        case 'chapter':
          return (
            <div key={idx} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px dashed var(--line)' }}>
              <strong style={{ display: 'block', color: 'var(--oxide-bright)', marginBottom: '0.25rem' }}>{block.title}</strong>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--muted)' }}>{block.description}</p>
            </div>
          );
        default:
          return null;
      }
    });
  };

  const renderDocSection = (docs) => {
    const section = docs.sections.find(s => s.id === activeSection);
    if (!section) return null;

    return (
      <div className="chapter-split">
        <div className="chapter-work-area">
          <Container title={section.title}>
            {renderContent(section.content)}
          </Container>
        </div>
        <div className="chapter-explainer">
          <h4>Quick Nav</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {docs.sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                style={{
                  textAlign: 'left',
                  background: activeSection === s.id ? 'var(--panel)' : 'transparent',
                  border: activeSection === s.id ? '1px solid var(--line)' : 'none',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  color: activeSection === s.id ? 'var(--signal)' : 'var(--muted)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease'
                }}
              >
                {renderIcon(s.icon, 14, activeSection === s.id ? 'var(--signal)' : 'currentColor')}
                {s.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="section-stack" style={{ gap: '1rem' }}>
      {/* Mini Tabs */}
      <div className="mini-tabs" role="tablist">
        <button
          className="mini-tab"
          role="tab"
          aria-selected={activeTab === 'settings'}
          onClick={() => setActiveTab('settings')}
        >
          <Key size={16} style={{ marginRight: '6px' }} />
          Settings
        </button>
        <button
          className="mini-tab"
          role="tab"
          aria-selected={activeTab === 'user-docs'}
          onClick={() => setActiveTab('user-docs')}
        >
          <BookOpen size={16} style={{ marginRight: '6px' }} />
          User Docs
        </button>
        <button
          className="mini-tab"
          role="tab"
          aria-selected={activeTab === 'dev-docs'}
          onClick={() => setActiveTab('dev-docs')}
        >
          <Code size={16} style={{ marginRight: '6px' }} />
          Developer Docs
        </button>
      </div>

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="chapter-split">
          <div className="chapter-work-area">
            <Container title="Groq API Key">
              <p className="sub-intro">
                Your API key is stored locally in your browser and never sent to external servers.
                Get your free API key from <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--oxide-bright)' }}>console.groq.com</a>
              </p>

              <label htmlFor="groq-key">API Key</label>
              <input
                id="groq-key"
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(event) => setApiKey(event.target.value)}
                placeholder="gsk_..."
                autoComplete="off"
                style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}
              />

              <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                <button className="action" type="button" onClick={handleSave}>
                  Save Key
                </button>
                <button className="action" type="button" onClick={handleClear} style={{ background: 'var(--panel)', color: 'var(--text)', border: '1px solid var(--line)' }}>
                  Clear Key
                </button>
                <button
                  className="action"
                  type="button"
                  onClick={() => setShowKey((prev) => !prev)}
                  style={{ background: 'var(--panel)', color: 'var(--text)', border: '1px solid var(--line)' }}
                >
                  {showKey ? 'Hide' : 'Show'}
                </button>
              </div>

              {status && (
                <div className="result" style={{
                  marginTop: '12px',
                  background: 'var(--panel-2)',
                  border: '1px solid var(--signal)',
                  color: 'var(--signal)'
                }}>
                  {status}
                </div>
              )}
            </Container>
            <Container title="Useful Links">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a
                  href="https://console.groq.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem',
                    background: 'var(--panel-2)',
                    border: '1px solid var(--line)',
                    borderRadius: '4px',
                    color: 'var(--text)',
                    textDecoration: 'none',
                    transition: 'border-color 160ms ease-out'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--oxide)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line)'}
                >
                  <ExternalLink size={18} color="var(--oxide-bright)" />
                  <div>
                    <strong style={{ display: 'block' }}>Groq Console</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Get your API key</span>
                  </div>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem',
                    background: 'var(--panel-2)',
                    border: '1px solid var(--line)',
                    borderRadius: '4px',
                    color: 'var(--text)',
                    textDecoration: 'none',
                    transition: 'border-color 160ms ease-out'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--oxide)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line)'}
                >
                  <Github size={18} color="var(--oxide-bright)" />
                  <div>
                    <strong style={{ display: 'block' }}>Project Repository</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>View source code</span>
                  </div>
                </a>
              </div>
            </Container>
          </div>

          <div className="chapter-explainer">
            <h4>Privacy & Security</h4>
            <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: '1.6' }}>
                Your API key is stored in browser <strong>localStorage</strong> only. No intermediate servers have access to your key. It is sent directly to Groq's API from your browser.
              </div>
            </div>

            <h4>How to Get Key</h4>
            <ol className="steps">
              <li>Visit <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--oxide-bright)' }}>console.groq.com</a></li>
              <li>Sign up or log in to your account</li>
              <li>Navigate to API Keys section</li>
              <li>Create a new API key</li>
              <li>Copy and paste it into the field</li>
            </ol>
          </div>
        </div>
      )}

      {/* User Docs Tab */}
      {activeTab === 'user-docs' && renderDocSection(userDocs)}

      {/* Developer Docs Tab */}
      {activeTab === 'dev-docs' && renderDocSection(developerDocs)}
    </section>
  );
}
