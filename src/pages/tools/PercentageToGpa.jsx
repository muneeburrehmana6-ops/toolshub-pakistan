import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

function estimateGpa(pct) {
  if (pct >= 85) return 4.0;
  if (pct >= 80) return 3.66;
  if (pct >= 75) return 3.33;
  if (pct >= 71) return 3.0;
  if (pct >= 68) return 2.66;
  if (pct >= 64) return 2.33;
  if (pct >= 61) return 2.0;
  if (pct >= 58) return 1.66;
  if (pct >= 55) return 1.33;
  if (pct >= 50) return 1.0;
  return 0.0;
}

export default function PercentageToGpa() {
  const [pct, setPct] = useState(75);
  const gpa = estimateGpa(parseFloat(pct) || 0);

  return (
    <ToolLayout
      title="Percentage to GPA Converter"
      description="Convert a percentage marksheet score into an estimated GPA on the standard 4.0 scale."
      note="Universities set their own exact cut-offs, so treat this as a close estimate rather than an official conversion."
    >
      <label>Percentage Score</label>
      <input type="number" min="0" max="100" className="field" value={pct} onChange={e => setPct(e.target.value)} />
      <div className="result-box">
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Estimated GPA</div>
        <div className="value">{gpa.toFixed(2)}</div>
      </div>
    </ToolLayout>
  );
}
