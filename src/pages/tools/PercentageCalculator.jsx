import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

export default function PercentageCalculator() {
  const [value, setValue] = useState(50);
  const [total, setTotal] = useState(200);
  const [from, setFrom] = useState(100);
  const [to, setTo] = useState(150);

  const pctOf = total > 0 ? ((parseFloat(value) / parseFloat(total)) * 100).toFixed(2) : '0';
  const change = parseFloat(from) > 0 ? (((parseFloat(to) - parseFloat(from)) / parseFloat(from)) * 100).toFixed(2) : '0';

  return (
    <ToolLayout title="Percentage Calculator" description="Quickly find what percentage one number is of another, or the percentage change between two numbers.">
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: '1rem' }}>What is X% of Y</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div><label>Value</label><input type="number" className="field" value={value} onChange={e => setValue(e.target.value)} /></div>
          <div><label>Out of</label><input type="number" className="field" value={total} onChange={e => setTotal(e.target.value)} /></div>
        </div>
        <div className="result-box"><div className="value">{pctOf}%</div></div>
      </div>

      <div>
        <h3 style={{ fontSize: '1rem' }}>Percentage Change</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div><label>From</label><input type="number" className="field" value={from} onChange={e => setFrom(e.target.value)} /></div>
          <div><label>To</label><input type="number" className="field" value={to} onChange={e => setTo(e.target.value)} /></div>
        </div>
        <div className="result-box"><div className="value">{change > 0 ? '+' : ''}{change}%</div></div>
      </div>
    </ToolLayout>
  );
}
