/**
 * Simple Markdown Text Renderer
 * Handles basic markdown formatting for explanations
 */

export default function MarkdownText({ text }) {
  if (!text) return null;

  const parseMarkdown = (content) => {
    const lines = content.split('\n');
    const elements = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Skip empty lines
      if (!line.trim()) {
        elements.push(<br key={`br-${key++}`} />);
        continue;
      }

      // Bullet points (- or *)
      if (line.trim().match(/^[-*]\s/)) {
        const content = line.trim().substring(2);
        elements.push(
          <li key={`li-${key++}`} style={{ marginBottom: '0.5rem' }}>
            {parseInlineMarkdown(content)}
          </li>
        );
        continue;
      }

      // Numbered lists (1. 2. etc)
      if (line.trim().match(/^\d+\.\s/)) {
        const content = line.trim().replace(/^\d+\.\s/, '');
        elements.push(
          <li key={`li-${key++}`} style={{ marginBottom: '0.5rem', listStyleType: 'decimal' }}>
            {parseInlineMarkdown(content)}
          </li>
        );
        continue;
      }

      // Regular paragraph
      elements.push(
        <p key={`p-${key++}`} style={{ margin: '0.5rem 0' }}>
          {parseInlineMarkdown(line)}
        </p>
      );
    }

    return elements;
  };

  const parseInlineMarkdown = (text) => {
    const parts = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      // Bold (**text** or __text__)
      const boldMatch = remaining.match(/^(.*?)(\*\*|__)(.*?)\2/);
      if (boldMatch) {
        if (boldMatch[1]) parts.push(boldMatch[1]);
        parts.push(
          <strong key={`bold-${key++}`} style={{ color: 'var(--oxide-bright)', fontWeight: '600' }}>
            {boldMatch[3]}
          </strong>
        );
        remaining = remaining.substring(boldMatch[0].length);
        continue;
      }

      // Italic (*text* or _text_)
      const italicMatch = remaining.match(/^(.*?)([*_])(.*?)\2/);
      if (italicMatch && italicMatch[2].length === 1) {
        if (italicMatch[1]) parts.push(italicMatch[1]);
        parts.push(
          <em key={`italic-${key++}`} style={{ fontStyle: 'italic' }}>
            {italicMatch[3]}
          </em>
        );
        remaining = remaining.substring(italicMatch[0].length);
        continue;
      }

      // Code (`text`)
      const codeMatch = remaining.match(/^(.*?)`(.*?)`/);
      if (codeMatch) {
        if (codeMatch[1]) parts.push(codeMatch[1]);
        parts.push(
          <code key={`code-${key++}`} style={{
            background: 'var(--panel)',
            padding: '0.15rem 0.4rem',
            borderRadius: '3px',
            fontFamily: 'monospace',
            fontSize: '0.9em',
            border: '1px solid var(--line)'
          }}>
            {codeMatch[2]}
          </code>
        );
        remaining = remaining.substring(codeMatch[0].length);
        continue;
      }

      // No more markdown, add remaining text
      parts.push(remaining);
      break;
    }

    return parts;
  };

  const elements = parseMarkdown(text);
  
  // Check if we have list items
  const hasListItems = elements.some(el => el.type === 'li');

  if (hasListItems) {
    return (
      <ul style={{
        margin: '0.5rem 0',
        paddingLeft: '1.5rem',
        listStyleType: 'disc'
      }}>
        {elements}
      </ul>
    );
  }

  return <div>{elements}</div>;
}
