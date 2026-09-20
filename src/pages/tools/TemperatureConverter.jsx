import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState(25);
  const c = parseFloat(celsius) || 0;
  const f = (c * 9) / 5 + 32;
  const k = c + 273.15;

  return (
    <ToolLayout title="Temperature Converter" description="Convert between Celsius, Fahrenheit and Kelvin.">
      <label>Celsius</label>
      <input type="number" className="field" value={celsius} onChange={e => setCelsius(e.target.value)} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 20 }}>
        <div className="result-box" style={{ marginTop: 0 }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Fahrenheit</div>
          <div className="value">{f.toFixed(1)}\u00b0F</div>
        </div>
        <div className="result-box" style={{ marginTop: 0 }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Kelvin</div>
          <div className="value">{k.toFixed(1)}K</div>
        </div>
      </div>
    </ToolLayout>
  );
}
