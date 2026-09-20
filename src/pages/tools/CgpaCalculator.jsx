import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

export default function CgpaCalculator() {
  const [semesters, setSemesters] = useState([
    { id: 1, gpa: 3.5, credits: 15 },
    { id: 2, gpa: 3.2, credits: 18 },
  ]);

  const addSemester = () => setSemesters([...semesters, { id: Date.now(), gpa: 3.0, credits: 15 }]);
  const removeSemester = (id) => setSemesters(semesters.filter(s => s.id !== id));
  const update = (id, field, value) => setSemesters(semesters.map(s => s.id === id ? { ...s, [field]: value } : s));

  const totalCredits = semesters.reduce((sum, s) => sum + (parseFloat(s.credits) || 0), 0);
  const totalPoints = semesters.reduce((sum, s) => sum + (parseFloat(s.gpa) || 0) * (parseFloat(s.credits) || 0), 0);
  const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

  return (
    <ToolLayout
      title="CGPA Calculator"
      description="Combine your semester GPAs and credit hours into a cumulative CGPA, weighted correctly by credit load."
      note="This is a weighted average based on the numbers you enter. Check your university transcript for the official figure."
    >
      {semesters.map((s, i) => (
        <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12, marginBottom: 12, alignItems: 'end' }}>
          <div>
            <label>Semester {i + 1} GPA</label>
            <input type="number" min="0" max="4" step="0.01" className="field" value={s.gpa}
              onChange={e => update(s.id, 'gpa', e.target.value)} />
          </div>
          <div>
            <label>Credit Hours</label>
            <input type="number" min="0" step="0.5" className="field" value={s.credits}
              onChange={e => update(s.id, 'credits', e.target.value)} />
          </div>
          <button className="btn-outline" style={{ padding: '11px 14px' }} onClick={() => removeSemester(s.id)} aria-label="Remove semester">\u2715</button>
        </div>
      ))}
      <button className="btn-outline" onClick={addSemester}>+ Add semester</button>

      <div className="result-box">
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Cumulative GPA</div>
        <div className="value">{cgpa}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>{totalCredits} total credit hours</div>
      </div>
    </ToolLayout>
  );
}
