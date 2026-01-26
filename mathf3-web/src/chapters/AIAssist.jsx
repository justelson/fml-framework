import { useEffect, useState, useRef } from 'react';
import { getAiResponse } from '../lib/groqService.js';
import {
  Bot,
  User,
  Send,
  Trash2,
  AlertCircle,
  Lightbulb,
  MessageSquare,
  Loader2,
  Wrench,
  Calculator,
  BarChart3,
  TrendingUp,
  Hash,
  DollarSign,
  Circle,
  X,
  Check
} from 'lucide-react';
import Container from '../components/Container.jsx';
import MarkdownText from '../components/MarkdownText.jsx';

export default function AIAssist() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const stored = window.localStorage.getItem('groqApiKey') || '';
    setApiKey(stored);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const hasKey = apiKey.trim().length > 0;

  const handleSubmit = async () => {
    if (!question.trim()) return;
    if (!hasKey) {
      setMessages([...messages, {
        type: 'error',
        content: 'Please set your Groq API key in Settings first.',
        timestamp: new Date()
      }]);
      return;
    }

    const userMessage = {
      type: 'user',
      content: question,
      timestamp: new Date()
    };
    setMessages([...messages, userMessage]);
    setQuestion('');
    setLoading(true);

    try {
      const response = await getAiResponse(question);

      if (response.type === 'tool_result') {
        setMessages(prev => [...prev, {
          type: 'assistant',
          tool: response.tool,
          result: response.result,
          content: formatResult(response.tool, response.result),
          explanation: response.explanation,
          brief: response.brief,
          rawResult: response.result,
          timestamp: new Date()
        }]);
      } else if (response.type === 'error') {
        setMessages(prev => [...prev, {
          type: 'error',
          content: response.message,
          timestamp: new Date()
        }]);
      } else if (response.type === 'message') {
        // Handle casual chat messages
        setMessages(prev => [...prev, {
          type: 'assistant',
          content: response.message,
          isChat: true,
          timestamp: new Date()
        }]);
      } else {
        setMessages(prev => [...prev, {
          type: 'assistant',
          content: JSON.stringify(response.content),
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'error',
        content: error.message || 'An error occurred. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  };

  const formatResult = (tool, result) => {
    const toolNames = {
      'calculateLinearY': 'Linear Equation',
      'solveQuadraticRoots': 'Quadratic Roots',
      'findQuadraticVertex': 'Quadratic Vertex',
      'analyzeDataList': 'Statistical Analysis',
      'calculateGroupedMean': 'Grouped Mean',
      'calculateGroupedMedian': 'Grouped Median',
      'calculateGroupedMode': 'Grouped Mode',
      'calculateDirectVariation': 'Direct Variation',
      'calculateInverseVariation': 'Inverse Variation',
      'solveArithmeticProgression': 'Arithmetic Progression',
      'solveGeometricProgression': 'Geometric Progression',
      'calculateCompoundInterest': 'Compound Interest',
      'calculateCircleProperties': 'Circle Properties',
      'calculateArcSector': 'Arc & Sector',
      'calculateChordLength': 'Chord Length',
      'calculateGreatCircle': 'Great Circle Distance',
      'calculateSmallCircle': 'Small Circle Distance',
      'calculateHaversine': 'Haversine Distance',
      'solveAccountingEquation': 'Accounting Equation',
      'generateBalanceSheet': 'Balance Sheet'
    };

    const toolName = toolNames[tool] || tool;

    switch (tool) {
      case 'calculateLinearY':
        return {
          title: toolName,
          answer: `y = ${result.y}`,
          details: null
        };

      case 'solveQuadraticRoots':
        if (result.roots.length === 0) {
          return {
            title: toolName,
            answer: 'No real roots',
            details: `Discriminant: ${result.discriminant.toFixed(2)} (negative)`
          };
        } else if (result.roots.length === 1) {
          return {
            title: toolName,
            answer: `x = ${result.roots[0].toFixed(3)}`,
            details: 'One repeated root'
          };
        } else {
          return {
            title: toolName,
            answer: `x₁ = ${result.roots[0].toFixed(3)}, x₂ = ${result.roots[1].toFixed(3)}`,
            details: `Discriminant: ${result.discriminant.toFixed(2)}`
          };
        }

      case 'findQuadraticVertex':
        return {
          title: toolName,
          answer: `(${result.x.toFixed(3)}, ${result.y.toFixed(3)})`,
          details: 'Turning point coordinates'
        };

      case 'analyzeDataList':
        return {
          title: toolName,
          answer: `Mean: ${result.mean.toFixed(2)}`,
          details: `Median: ${result.median}, Mode: ${result.mode}`
        };

      case 'calculateGroupedMean':
        return {
          title: toolName,
          answer: result.mean.toFixed(2),
          details: 'Weighted average of grouped data'
        };

      case 'calculateGroupedMedian':
        return {
          title: toolName,
          answer: result.median.toFixed(2),
          details: 'Middle value of grouped data'
        };

      case 'calculateGroupedMode':
        return {
          title: toolName,
          answer: result.mode.toFixed(2),
          details: 'Most frequent value in grouped data'
        };

      case 'calculateDirectVariation':
        return {
          title: toolName,
          answer: `y = ${result.y2.toFixed(3)}`,
          details: `Constant k = ${result.k.toFixed(3)}`
        };

      case 'calculateInverseVariation':
        return {
          title: toolName,
          answer: `y = ${result.y2.toFixed(3)}`,
          details: `Constant k = ${result.k.toFixed(3)}`
        };

      case 'solveArithmeticProgression':
        return {
          title: toolName,
          answer: `nth term = ${result.nthTerm.toFixed(2)}`,
          details: `Sum of n terms = ${result.sum.toFixed(2)}`
        };

      case 'solveGeometricProgression':
        return {
          title: toolName,
          answer: `nth term = ${result.nthTerm.toFixed(2)}`,
          details: `Sum of n terms = ${result.sum.toFixed(2)}`
        };

      case 'calculateCompoundInterest':
        return {
          title: toolName,
          answer: `$${result.amount.toFixed(2)}`,
          details: `Interest earned: $${result.interest.toFixed(2)}`
        };

      case 'calculateCircleProperties':
        return {
          title: toolName,
          answer: `Area = ${result.area.toFixed(2)}`,
          details: `Circumference = ${result.circumference.toFixed(2)}`
        };

      case 'calculateArcSector':
        return {
          title: toolName,
          answer: `Arc length = ${result.arcLength.toFixed(2)}`,
          details: `Sector area = ${result.sectorArea.toFixed(2)}`
        };

      case 'calculateChordLength':
        return result ? {
          title: toolName,
          answer: result.chord.toFixed(2),
          details: `Half chord = ${result.halfChord.toFixed(2)}`
        } : {
          title: toolName,
          answer: 'Invalid',
          details: 'Distance must be less than radius'
        };

      case 'calculateGreatCircle':
        return {
          title: toolName,
          answer: `${result.distanceKm.toFixed(2)} km`,
          details: `${result.distanceNm.toFixed(2)} nautical miles`
        };

      case 'calculateSmallCircle':
        return {
          title: toolName,
          answer: `${result.distanceKm.toFixed(2)} km`,
          details: `${result.distanceNm.toFixed(2)} nautical miles`
        };

      case 'calculateHaversine':
        return {
          title: toolName,
          answer: `${result.distance.toFixed(2)} km`,
          details: 'Great circle distance'
        };

      case 'solveAccountingEquation':
        if (result.error) return {
          title: toolName,
          answer: 'Error',
          details: result.error
        };
        return {
          title: toolName,
          answer: `${result.calculated}: ${result[result.calculated.toLowerCase()]}`,
          details: `Assets: ${result.assets}, Liabilities: ${result.liabilities}, Capital: ${result.capital}`
        };

      case 'generateBalanceSheet':
        return {
          title: toolName,
          answer: `Capital: ${result.capital}`,
          details: `Assets: ${result.assets}, Liabilities: ${result.liabilities}`
        };

      default:
        return {
          title: toolName,
          answer: JSON.stringify(result),
          details: null
        };
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const useExample = (example) => {
    setQuestion(example);
    textareaRef.current?.focus();
  };

  const exampleQuestions = [
    { q: "Find the roots of x² - 5x + 6 = 0", icon: "algebra" },
    { q: "Calculate the mean of: 5, 8, 12, 15, 12, 8, 20", icon: "stats" },
    { q: "If y varies directly as x, and y = 20 when x = 4, find y when x = 7", icon: "variation" },
    { q: "Find the 10th term of an AP with first term 5 and common difference 3", icon: "sequence" },
    { q: "Calculate compound interest on $5000 at 6% for 3 years", icon: "finance" },
    { q: "Find the area of a circle with radius 7", icon: "geometry" }
  ];

  const iconMap = {
    'algebra': Calculator,
    'stats': BarChart3,
    'variation': TrendingUp,
    'sequence': Hash,
    'finance': DollarSign,
    'geometry': Circle,
    'user': User,
    'bot': Bot,
    'error': AlertCircle,
    'tool': Wrench,
    'chat': MessageSquare,
    'lightbulb': Lightbulb,
    'trash': Trash2,
    'send': Send,
    'loading': Loader2
  };

  const getIcon = (type) => {
    const Icon = iconMap[type];
    return Icon ? <Icon size={18} /> : null;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '320px 1fr',
      gap: '1.5rem',
      height: 'calc(100vh - 140px)',
      width: '100%'
    }}>
      {/* Left Sidebar - Tips & Examples */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', paddingRight: '4px' }}>

        {/* Status Card */}
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ margin: 0, color: 'var(--text)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bot size={20} />
                AI Math Assistant
              </h3>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--muted)' }}>
                Powered by Groq
              </p>
            </div>
            <div style={{
              padding: '0.4rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              background: hasKey ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 107, 107, 0.1)',
              color: hasKey ? '#10b981' : '#ff6b6b'
            }}>
              {hasKey ? <Check size={14} /> : <X size={14} />}
              {hasKey ? 'Connected' : 'No Key'}
            </div>
          </div>
        </Container>

        {/* API Key Warning */}
        {!hasKey && (
          <Container className="warning-card" style={{ borderColor: 'rgba(255, 107, 107, 0.4)', background: 'rgba(255, 107, 107, 0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
              <AlertCircle size={24} color="#ff6b6b" />
              <div>
                <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--text)' }}>API Key Required</strong>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)' }}>
                  Go to <strong>Settings</strong> to add your Groq API key.
                </p>
              </div>
            </div>
          </Container>
        )}

        {/* Quick Tips */}
        <Container title="Quick Tips">
          <ul style={{
            margin: 0,
            paddingLeft: '1.5rem',
            fontSize: '0.85rem',
            lineHeight: '1.8',
            color: 'var(--text)'
          }}>
            <li>Include all numbers and units</li>
            <li>Be specific about what to find</li>
            <li>Use clear math terms</li>
            <li><kbd style={{
              padding: '0.1rem 0.3rem',
              background: 'var(--panel-2)',
              borderRadius: '4px',
              border: '1px solid var(--line)',
              fontSize: '0.8rem'
            }}>Enter</kbd> to send</li>
            <li><kbd style={{
              padding: '0.1rem 0.3rem',
              background: 'var(--panel-2)',
              borderRadius: '4px',
              border: '1px solid var(--line)',
              fontSize: '0.8rem'
            }}>Shift+Enter</kbd> for new line</li>
          </ul>
        </Container>

        {/* Example Questions */}
        <Container title="Try These Examples">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {exampleQuestions.map((example, idx) => {
              const Icon = iconMap[example.icon];
              return (
                <button
                  key={idx}
                  onClick={() => useExample(example.q)}
                  disabled={loading}
                  className="tab-button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    textAlign: 'left',
                    padding: '0.75rem',
                    textTransform: 'none',
                    letterSpacing: 'normal'
                  }}
                >
                  {Icon && <Icon size={18} style={{ flexShrink: 0, opacity: 0.7 }} />}
                  <span style={{ fontSize: '0.85rem', lineHeight: '1.3' }}>{example.q}</span>
                </button>
              );
            })}
          </div>
        </Container>

        {/* Message Stats */}
        {messages.length > 0 && (
          <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.25rem' }}>Messages</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text)' }}>{messages.length}</div>
              </div>
              <button
                onClick={clearChat}
                className="action"
                style={{ background: 'transparent', border: '1px solid var(--line)', color: 'var(--muted)', padding: '0.5rem', marginTop: 0 }}
                title="Clear chat history"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </Container>
        )}
      </div>

      {/* Right Main Area - Chat Interface */}
      <Container className="main-chat" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }} fullWidth>
        {/* Chat Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--line)', background: 'var(--panel-2)' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text)' }}>
            Chat
          </h2>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--muted)' }}>
            Ask any Form 3 math question
          </p>
        </div>

        {/* Messages Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', color: 'var(--muted)' }}>
              <MessageSquare size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text)' }}>Start a Conversation</h4>
              <p style={{ margin: 0, maxWidth: '400px' }}>
                Ask any Form 3 math question and I'll help you solve it step by step.
              </p>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  gap: '0.75rem',
                  flexDirection: msg.type === 'user' ? 'row-reverse' : 'row'
                }}>
                  {/* Avatar */}
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: msg.type === 'user' ? 'var(--oxide)' : (msg.type === 'error' ? '#ff6b6b' : 'var(--signal)'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: 'white'
                  }}>
                    {msg.type === 'user' ? <User size={20} /> : (msg.type === 'error' ? <AlertCircle size={20} /> : <Bot size={20} />)}
                  </div>

                  {/* Message Content */}
                  <div style={{ maxWidth: '70%' }}>
                    {/* Message Bubble */}
                    <div style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      background: msg.type === 'user' ? 'var(--oxide)' : 'var(--panel-2)',
                      border: msg.type === 'user' ? 'none' : '1px solid var(--line)',
                      color: msg.type === 'user' ? 'white' : 'var(--text)'
                    }}>
                      {msg.type === 'assistant' && msg.tool && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--line)' }}>
                          <Wrench size={16} />
                          <span style={{ fontSize: '0.85rem', fontWeight: '500', opacity: 0.9 }}>
                            {msg.content.title}
                          </span>
                        </div>
                      )}

                      {msg.type === 'assistant' && msg.isChat ? (
                        <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{msg.content}</div>
                      ) : msg.type === 'assistant' && msg.content.answer ? (
                        <>
                          <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                            {msg.content.answer}
                          </div>
                          {msg.content.details && (
                            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.75rem' }}>
                              {msg.content.details}
                            </div>
                          )}
                          {(msg.brief || msg.explanation) && (
                            <div style={{
                              marginTop: '0.75rem',
                              paddingTop: '0.75rem',
                              borderTop: '1px dashed var(--line)',
                              fontSize: '0.9rem',
                              lineHeight: '1.6'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: '500', color: 'var(--signal)' }}>
                                <Lightbulb size={16} />
                                <span>Explanation</span>
                              </div>

                              {msg.brief && (
                                <div style={{
                                  padding: '0.75rem 1rem',
                                  background: 'var(--panel-2)',
                                  border: '1px solid var(--line)',
                                  borderLeft: '3px solid var(--signal)',
                                  borderRadius: '4px',
                                  marginBottom: '1rem',
                                  color: 'var(--text)',
                                  fontSize: '0.95rem',
                                  lineHeight: '1.7'
                                }}>
                                  {msg.brief}
                                </div>
                              )}

                              {msg.explanation && (
                                <div className="explanation-content" style={{ color: 'var(--text)' }}>
                                  <MarkdownText text={msg.explanation} />
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      ) : (
                        <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
                      )}
                    </div>

                    {/* Timestamp */}
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.25rem', textAlign: msg.type === 'user' ? 'right' : 'left' }}>
                      {msg.timestamp && formatTime(msg.timestamp)}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--signal)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <Bot size={20} />
                  </div>
                  <div style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    background: 'var(--panel-2)',
                    border: '1px solid var(--line)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Loader2 size={16} className="spin" />
                    <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--line)', background: 'var(--panel-2)' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <textarea
                ref={textareaRef}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Ask a math question... (Press Enter to send)"
                rows={1}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'var(--panel)',
                  border: '1px solid var(--line)',
                  borderRadius: '4px',
                  color: 'var(--text)',
                  fontFamily: 'inherit',
                  resize: 'none',
                  minHeight: '48px',
                  height: '48px'
                }}
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading || !hasKey || !question.trim()}
              className="action"
              style={{
                marginTop: 0,
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                opacity: (loading || !hasKey || !question.trim()) ? 0.5 : 1
              }}
            >
              {loading ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
