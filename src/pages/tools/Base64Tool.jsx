import { useState, useMemo } from 'react';
import ToolLayout from '../../components/ToolLayout';

export default function Base64Tool() {
  const [input, setInput] = useState('Hello Pakistan');
  const [decodeInput, setDecodeInput] = useState('SGVsbG8gUGFraXN0YW4=');

  const encoded = useMemo(() => {
    try {
      return btoa(unescape(encodeURIComponent(input)));
    } catch {
      return 'Could not encode this text.';
    }
  }, [input]);

  const decoded = useMemo(() => {
    try {
      return decodeURIComponent(escape(atob(decodeInput)));
    } catch {
      return 'Invalid Base64 input.';
    }
  }, [decodeInput]);

  return (
    <ToolLayout title="Base64 Encoder / Decoder" description="Encode text to Base64, or decode Base64 back to readable text.">
      <div style={{ marginBottom: 28 }}>
        <label>Text to Encode</label>
        <textarea className="field" rows={3} value={input} onChange={e => setInput(e.target.value)} />
        <div className="result-box" style={{ wordBreak: 'break-all', fontSize: '0.85rem' }}>{encoded}</div>
      </div>
      <div>
        <label>Base64 to Decode</label>
        <textarea className="field" rows={3} value={decodeInput} onChange={e => setDecodeInput(e.target.value)} />
        <div className="result-box" style={{ wordBreak: 'break-all', fontSize: '0.85rem' }}>{decoded}</div>
      </div>
    </ToolLayout>
  );
}
