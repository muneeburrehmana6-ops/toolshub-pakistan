import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

const units = { meter: 1, kilometer: 1000, mile: 1609.344, foot: 0.3048, inch: 0.0254, yard: 0.9144 };

export default function LengthConverter() {
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState('kilometer');
  const [to, setTo] = useState('mile');

  const result = ((parseFloat(value) || 0) * units[from]) / units[to];

  return (
    <ToolLayout title="Length Converter" description="Convert between kilometers, miles, feet, meters, inches and yards.">
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
