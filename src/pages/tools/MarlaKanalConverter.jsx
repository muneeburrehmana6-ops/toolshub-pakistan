import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

// 1 Marla = 272.25 sq ft (standard Punjab measure), 1 Kanal = 20 Marla
const SQFT_PER_MARLA = 272.25;

export default function MarlaKanalConverter() {
  const [marla, setMarla] = useState(5);
  const m = parseFloat(marla) || 0;
  const sqft = m * SQFT_PER_MARLA;
  const kanal = m / 20;
  const sqyard = sqft / 9;

  return (
    <ToolLayout
      title="Marla / Kanal Converter"
      description="Convert between Marla, Kanal and Square Feet for property deals."
      note="Based on the standard Punjab measure (1 Marla = 272.25 sq ft). Some regions use slightly different local conversions \u2014 confirm with local convention before finalising a deal."
    >
      <label>Marla</label>
      <input type="number" className="field" value={marla} onChange={e => setMarla(e.target.value)} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 20 }}>
        <div className="result-box" style={{ marginTop: 0 }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Square Feet</div>
          <div className="value" style={{ fontSize: '1.4rem' }}>{sqft.toLocaleString(undefined, { maximumFractionDigits: 1 })}</div>
        </div>
        <div className="result-box" style={{ marginTop: 0 }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Square Yards</div>
          <div className="value" style={{ fontSize: '1.4rem' }}>{sqyard.toLocaleString(undefined, { maximumFractionDigits: 1 })}</div>
        </div>
        <div className="result-box" style={{ marginTop: 0 }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Kanal</div>
          <div className="value" style={{ fontSize: '1.4rem' }}>{kanal.toFixed(3)}</div>
        </div>
      </div>
    </ToolLayout>
  );
}
