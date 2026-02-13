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
  Check,
  Triangle,
  Move,
  Grid
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
      // Chapter 1: Coordinate Geometry
      'calculateGradient': 'Gradient',
      'calculateDistance': 'Distance',
      'calculateMidpoint': 'Midpoint',
      'findLineEquation': 'Line Equation',
      'analyzeLines': 'Line Analysis',

      // Chapter 2: Areas and Perimeters
      'triangleAreaSAS': 'Triangle Area (SAS)',
      'triangleAreaHeron': 'Triangle Area (Heron)',
      'parallelogramArea': 'Parallelogram Area',
      'rhombusArea': 'Rhombus Area',
      'trapeziumArea': 'Trapezium Area',
      'regularPolygonArea': 'Regular Polygon Area',
      'circleArea': 'Circle Properties',
      'similarPolygonsArea': 'Similar Polygons',

      // Chapter 3: 3D Figures
      'cylinderStats': 'Cylinder',
      'coneStats': 'Cone',
      'sphereStats': 'Sphere',
      'pyramidStats': 'Pyramid',
      'prismStats': 'Prism',
      'angleLinePlane': '3D Angle',

      // Chapter 4: Probability
      'probabilityEvent': 'Probability',
      'mutuallyExclusiveEvents': 'Mutually Exclusive',
      'independentEvents': 'Independent Events',
      'complementProbability': 'Complement',

      // Chapter 5: Trigonometry
      'sineRule': 'Sine Rule',
      'cosineRuleSide': 'Cosine Rule (Side)',
      'cosineRuleAngle': 'Cosine Rule (Angle)',
      'trigRatios': 'Trig Ratios',

      // Chapter 6: Vectors
      'vectorMagnitude': 'Vector Magnitude',
      'vectorDirection': 'Vector Direction',
      'addVectors': 'Vector Addition',
      'subtractVectors': 'Vector Subtraction',
      'scalarMultiply': 'Scalar Multiplication',
      'dotProduct': 'Dot Product',

      // Chapter 7: Matrices
      'matrixDeterminant': 'Matrix Determinant',
      'matrixInverse': 'Matrix Inverse',
      'solveSimultaneousEq': 'Simultaneous Equations',
      'transformPoint': 'Point Transformation',
      'rotationMatrix': 'Rotation Matrix',
      'reflectionMatrix': 'Reflection Matrix',
      'enlargementMatrix': 'Enlargement Matrix',

      // Chapter 8: Linear Programming
      'evaluateObjectiveFunction': 'Objective Function',
      'checkConstraint': 'Constraint Check'
    };

    const toolName = toolNames[tool] || tool;

    // Helper to format matrix display
    const formatMatrix = (matrix) => {
      if (!matrix || !Array.isArray(matrix)) return '';
      return matrix.map(row => `[${row.join(', ')}]`).join('\n');
    };

    switch (tool) {
      // Chapter 1: Coordinate Geometry
      case 'calculateGradient':
        return { 
          title: toolName, 
          answer: result.isVertical ? 'Undefined (vertical line)' : `m = ${result.gradient.toFixed(3)}`,
          details: null 
        };

      case 'calculateDistance':
        return { title: toolName, answer: `d = ${result.distance.toFixed(3)}`, details: null };

      case 'calculateMidpoint':
        return { title: toolName, answer: `M = (${result.x.toFixed(2)}, ${result.y.toFixed(2)})`, details: null };

      case 'findLineEquation':
        return { title: toolName, answer: result.equation, details: result.m !== null ? `Gradient: ${result.m.toFixed(2)}` : null };

      case 'analyzeLines':
        return { title: toolName, answer: result.relationship, details: result.explanation };

      // Chapter 2: Areas and Perimeters
      case 'triangleAreaSAS':
      case 'triangleAreaHeron':
      case 'parallelogramArea':
      case 'rhombusArea':
      case 'trapeziumArea':
      case 'regularPolygonArea':
        return { title: toolName, answer: `Area = ${result.area.toFixed(2)}`, details: result.formula || null };

      case 'circleArea':
        return { 
          title: toolName, 
          answer: `Area = ${result.area.toFixed(2)}`, 
          details: `Circumference = ${result.circumference.toFixed(2)}` 
        };

      case 'similarPolygonsArea':
        return { 
          title: toolName, 
          answer: `New Area = ${result.newArea.toFixed(2)}`, 
          details: `Scale Factor: ${result.scaleFactor}, Area Ratio: ${result.areaRatio}` 
        };

      // Chapter 3: 3D Figures
      case 'cylinderStats':
      case 'coneStats':
      case 'sphereStats':
        return { 
          title: toolName, 
          answer: `Volume = ${result.volume.toFixed(2)}`, 
          details: `Surface Area = ${result.surfaceArea ? result.surfaceArea.toFixed(2) : result.totalSurfaceArea.toFixed(2)}` 
        };

      case 'pyramidStats':
      case 'prismStats':
        return { title: toolName, answer: `Volume = ${result.volume.toFixed(2)}`, details: result.formula || null };

      case 'angleLinePlane':
        return { title: toolName, answer: `θ = ${result.angle.toFixed(2)}°`, details: result.formula || null };

      // Chapter 4: Probability
      case 'probabilityEvent':
        return { 
          title: toolName, 
          answer: `P = ${result.probability.toFixed(4)}`, 
          details: `${result.favorable} favorable out of ${result.total} total` 
        };

      case 'mutuallyExclusiveEvents':
      case 'independentEvents':
        return { 
          title: toolName, 
          answer: `P = ${result.probability.toFixed(4)}`, 
          details: result.formula || null 
        };

      case 'complementProbability':
        return { 
          title: toolName, 
          answer: `P(A') = ${result.complement.toFixed(4)}`, 
          details: `Original: ${result.original.toFixed(4)}` 
        };

      // Chapter 5: Trigonometry
      case 'sineRule':
        return { title: toolName, answer: `Side b = ${result.sideB.toFixed(3)}`, details: result.formula || null };

      case 'cosineRuleSide':
        return { title: toolName, answer: `Side a = ${result.sideA.toFixed(3)}`, details: result.formula || null };

      case 'cosineRuleAngle':
        return { title: toolName, answer: `Angle A = ${result.angleA.toFixed(2)}°`, details: result.formula || null };

      case 'trigRatios':
        return { 
          title: toolName, 
          answer: `sin = ${result.sin.toFixed(4)}, cos = ${result.cos.toFixed(4)}, tan = ${result.tan.toFixed(4)}`, 
          details: null 
        };

      // Chapter 6: Vectors
      case 'vectorMagnitude':
        return { title: toolName, answer: `|v| = ${result.magnitude.toFixed(3)}`, details: result.formula || null };

      case 'vectorDirection':
        return { 
          title: toolName, 
          answer: `θ = ${result.angle.toFixed(2)}°`, 
          details: `Bearing: ${result.bearing.toFixed(2)}°` 
        };

      case 'addVectors':
      case 'subtractVectors':
        return { 
          title: toolName, 
          answer: `Result = (${result.x.toFixed(2)}, ${result.y.toFixed(2)})`, 
          details: result.magnitude ? `Magnitude: ${result.magnitude.toFixed(3)}` : null 
        };

      case 'scalarMultiply':
        return { 
          title: toolName, 
          answer: `Result = (${result.x.toFixed(2)}, ${result.y.toFixed(2)})`, 
          details: `Scalar: ${result.scalar}, Magnitude: ${result.magnitude.toFixed(3)}` 
        };

      case 'dotProduct':
        return { title: toolName, answer: `u · v = ${result.dotProduct.toFixed(3)}`, details: result.formula || null };

      // Chapter 7: Matrices
      case 'matrixDeterminant':
        return { 
          title: toolName, 
          answer: `det = ${result.determinant}`, 
          details: result.formula ? `Formula: ${result.formula}` : null,
          matrix: result.matrix 
        };

      case 'matrixInverse':
        if (result.error) {
          return { title: toolName, answer: result.error, details: null };
        }
        return { 
          title: toolName, 
          answer: `Determinant = ${result.determinant.toFixed(4)}`, 
          details: null,
          matrix: result.inverse 
        };

      case 'solveSimultaneousEq':
        if (result.error) {
          return { title: toolName, answer: result.error, details: null };
        }
        return { 
          title: toolName, 
          answer: `x = ${result.x.toFixed(3)}, y = ${result.y.toFixed(3)}`, 
          details: result.equation1 && result.equation2 ? `${result.equation1}\n${result.equation2}` : null 
        };

      case 'transformPoint':
        return { 
          title: toolName, 
          answer: `(${result.transformed.x.toFixed(2)}, ${result.transformed.y.toFixed(2)})`, 
          details: `Original: (${result.original.x}, ${result.original.y})`,
          matrix: result.matrix 
        };

      case 'rotationMatrix':
      case 'reflectionMatrix':
      case 'enlargementMatrix':
        return { 
          title: toolName, 
          answer: result.type || 'Transformation Matrix', 
          details: result.degrees ? `Angle: ${result.degrees}°` : (result.axis ? `Axis: ${result.axis}` : (result.scaleFactor ? `Scale: ${result.scaleFactor}` : null)),
          matrix: result.matrix 
        };

      // Chapter 8: Linear Programming
      case 'evaluateObjectiveFunction':
        return { 
          title: toolName, 
          answer: `P = ${result.value.toFixed(2)}`, 
          details: `At point (${result.x}, ${result.y}): ${result.function}` 
        };

      case 'checkConstraint':
        return { 
          title: toolName, 
          answer: result.satisfied ? '✓ Satisfied' : '✗ Not Satisfied', 
          details: `${result.constraint}\nLeft side = ${result.leftSide.toFixed(2)}` 
        };

      default:
        return {
          title: toolName,
          answer: JSON.stringify(result).substring(0, 100) + (JSON.stringify(result).length > 100 ? '...' : ''),
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
    { q: "Find roots of 2x² - 5x - 3 = 0", icon: "algebra" },
    { q: "Calculate area of triangle with sides 5, 8 and angle 60°", icon: "geometry" },
    { q: "Find volume of a cone with radius 4 and height 9", icon: "geometry" },
    { q: "Find angle A if triangle sides are 5, 6, 7", icon: "trig" },
    { q: "Add vectors (2, 3) and (-1, 5)", icon: "vector" },
    { q: "Find determinant of matrix [[2, 1], [3, 4]]", icon: "matrix" }
  ];

  const iconMap = {
    'algebra': Calculator,
    'geometry': Triangle,
    'trig': Circle,
    'vector': Move,
    'matrix': Grid,
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
      gridTemplateColumns: 'minmax(280px, 320px) 1fr',
      gap: '1.5rem',
      height: 'calc(100vh - 140px)',
      width: '100%',
      // Responsive adjustment inside JS styles if usually hard; 
      // but strictly following fml3-o structure:
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
            Ask any Form 4 math question
          </p>
        </div>

        {/* Messages Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', color: 'var(--muted)' }}>
              <MessageSquare size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text)' }}>Start a Conversation</h4>
              <p style={{ margin: 0, maxWidth: '400px' }}>
                Ask any Form 4 math question and I'll help you solve it step by step.
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
                            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.75rem', whiteSpace: 'pre-line' }}>
                              {msg.content.details}
                            </div>
                          )}
                          {msg.content.matrix && (
                            <div style={{
                              marginTop: '0.75rem',
                              padding: '1rem',
                              background: 'var(--panel)',
                              border: '1px solid var(--line)',
                              borderRadius: '8px',
                              fontFamily: 'monospace',
                              fontSize: '1rem',
                              lineHeight: '1.8'
                            }}>
                              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.5rem', fontFamily: 'inherit' }}>
                                Matrix:
                              </div>
                              {msg.content.matrix.map((row, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <span style={{ color: 'var(--muted)' }}>[</span>
                                  {row.map((val, j) => (
                                    <span key={j} style={{ 
                                      minWidth: '60px', 
                                      textAlign: 'center',
                                      color: 'var(--text)',
                                      fontWeight: '500'
                                    }}>
                                      {typeof val === 'number' ? val.toFixed(3) : val}
                                    </span>
                                  ))}
                                  <span style={{ color: 'var(--muted)' }}>]</span>
                                </div>
                              ))}
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
