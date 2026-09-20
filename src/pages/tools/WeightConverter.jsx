import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

const units = { kilogram: 1, gram: 0.001, pound: 0.453592, tola: 0.011664, maund: 37.3242 };

export default function WeightConverter() {
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState('kilogram');
  const [to, setTo] = useState('tola');

  const result = ((parseFloat(value) || 0) * units[from]) / units[to];

  return (
    <ToolLayout title="Weight Converter" description="Convert between kilograms, grams, pounds, tola and maund.">
      <label>Value</label>
      <input type="number" className="field" value={value} onChange={e => setValue(e.target.value)} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 14 }}>
        <div>
          <label>From</label>
          <select className="field" value={from} onChange={e => setFrom(e.target.value)}>
            {Object.keys(units).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div>
          <label>To</label>
          <select className="field" value={to} onChange={e => setTo(e.target.value)}>
            {Object.keys(units).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>
      <div className="result-box"><div className="value">{result.toLocaleString(undefined, { maximumFractionDigits: 4 })} {to}</div></div>
    </ToolLayout>
  );
}
