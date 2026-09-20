import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

export default function WordCounter() {
  const [text, setText] = useState('');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const sentences = text.trim() ? (text.match(/[.!?]+/g) || []).length : 0;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return (
    <ToolLayout title="Word Counter" description="Count words, characters, sentences and estimated reading time.">
      <textarea className="field" rows={10} value={text} onChange={e => setText(e.target.value)} placeholder="Paste or type your text here..." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 16 }}>
        {[
          ['Words', words],
          ['Characters', chars],
          ['No spaces', charsNoSpace],
          ['~Read time', `${readingTime} min`],
        ].map(([label, val]) => (
          <div key={label} className="result-box" style={{ marginTop: 0 }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{label}</div>
            <div className="value" style={{ fontSize: '1.5rem' }}>{val}</div>
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
