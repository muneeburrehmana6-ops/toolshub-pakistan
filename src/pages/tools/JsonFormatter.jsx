import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

export default function JsonFormatter() {
  const [input, setInput] = useState('{"name":"ToolsHub","tools":34,"country":"Pakistan"}');
  const [error, setError] = useState('');
  const [output, setOutput] = useState('');

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e) {
      setError('Invalid JSON: ' + e.message);
      setOutput('');
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e) {
      setError('Invalid JSON: ' + e.message);
      setOutput('');
    }
  };

  return (
    <ToolLayout title="JSON Formatter" description="Format, validate and beautify JSON data.">
      <label>Input JSON</label>
      <textarea className="field" rows={8} value={input} onChange={e => setInput(e.target.value)} style={{ fontFamily: 'monospace', fontSize: '0.85rem' }} />
      <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
        <button className="btn" onClick={format}>Format / Validate</button>
        <button className="btn-outline" onClick={minify}>Minify</button>
      </div>
      {error && <div className="result-box" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>{error}</div>}
      {output && (
        <pre className="result-box" style={{ overflow: 'auto', maxHeight: 300, fontSize: '0.82rem', color: 'var(--text)' }}>{output}</pre>
      )}
    </ToolLayout>
  );
}
