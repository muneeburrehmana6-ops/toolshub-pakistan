import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

const toTitleCase = (s) => s.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase());
const toSentenceCase = (s) => s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());

export default function CaseConverter() {
  const [text, setText] = useState('type or paste your text here');

  return (
    <ToolLayout title="Case Converter" description="Switch text between UPPERCASE, lowercase, Title Case and Sentence case.">
      <textarea className="field" rows={6} value={text} onChange={e => setText(e.target.value)} />
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
        <button className="btn-outline" onClick={() => setText(text.toUpperCase())}>UPPERCASE</button>
        <button className="btn-outline" onClick={() => setText(text.toLowerCase())}>lowercase</button>
        <button className="btn-outline" onClick={() => setText(toTitleCase(text))}>Title Case</button>
        <button className="btn-outline" onClick={() => setText(toSentenceCase(text))}>Sentence case</button>
      </div>
    </ToolLayout>
  );
}
