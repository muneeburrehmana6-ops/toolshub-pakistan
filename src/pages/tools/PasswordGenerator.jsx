import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generate = () => {
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    if (includeUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}';

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
  };

  return (
    <ToolLayout title="Password Generator" description="Generate strong, random passwords with custom rules.">
      <label>Length: {length}</label>
      <input type="range" min="6" max="32" value={length} onChange={e => setLength(e.target.value)} style={{ width: '100%' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 0 }}>
          <input type="checkbox" checked={includeUpper} onChange={e => setIncludeUpper(e.target.checked)} /> Include uppercase letters
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 0 }}>
          <input type="checkbox" checked={includeNumbers} onChange={e => setIncludeNumbers(e.target.checked)} /> Include numbers
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 0 }}>
          <input type="checkbox" checked={includeSymbols} onChange={e => setIncludeSymbols(e.target.checked)} /> Include symbols
        </label>
      </div>

      <button className="btn" style={{ marginTop: 18 }} onClick={generate}>Generate Password</button>

      {password && (
        <div className="result-box" style={{ fontFamily: 'monospace', fontSize: '1.2rem', wordBreak: 'break-all' }}>{password}</div>
      )}
    </ToolLayout>
  );
}
