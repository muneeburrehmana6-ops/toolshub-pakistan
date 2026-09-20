import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

const defaultScale = [
  { grade: 'A', points: 4.0 },
  { grade: 'A-', points: 3.66 },
  { grade: 'B+', points: 3.33 },
  { grade: 'B', points: 3.0 },
  { grade: 'B-', points: 2.66 },
  { grade: 'C+', points: 2.33 },
  { grade: 'C', points: 2.0 },
  { grade: 'D', points: 1.0 },
  { grade: 'F', points: 0.0 },
];

export default function GpaCalculator() {
  const [scale, setScale] = useState(defaultScale);
  const [showScale, setShowScale] = useState(false);
  const [courses, setCourses] = useState([
    { id: 1, credit: 3, grade: 'A' },
    { id: 2, credit: 3, grade: 'B+' },
  ]);

  const addCourse = () => setCourses([...courses, { id: Date.now(), credit: 3, grade: 'A' }]);
  const removeCourse = (id) => setCourses(courses.filter(c => c.id !== id));
  const updateCourse = (id, field, value) => setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  const updateScalePoint = (grade, points) => setScale(scale.map(s => s.grade === grade ? { ...s, points: parseFloat(points) || 0 } : s));

  const totalCredits = courses.reduce((sum, c) => sum + (parseFloat(c.credit) || 0), 0);
  const totalPoints = courses.reduce((sum, c) => {
    const gp = scale.find(s => s.grade === c.grade)?.points || 0;
    return sum + gp * (parseFloat(c.credit) || 0);
  }, 0);
  const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

  return (
    <ToolLayout
      title="GPA Calculator"
      description="Calculate your semester GPA. Uses the standard HEC 4.0 scale by default \u2014 edit it below if your university grades differently."
      note="This tool gives an estimate based on the grading scale you enter. Always verify your official GPA against your university's transcript or portal."
    >
      {courses.map((c, i) => (
        <div key={c.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12, marginBottom: 12, alignItems: 'end' }}>
          <div>
            <label>Course {i + 1} \u2014 Credit Hours</label>
            <input type="number" min="0" step="0.5" className="field" value={c.credit}
              onChange={e => updateCourse(c.id, 'credit', e.target.value)} />
          </div>
          <div>
            <label>Grade</label>
            <select className="field" value={c.grade} onChange={e => updateCourse(c.id, 'grade', e.target.value)}>
              {scale.map(s => <option key={s.grade} value={s.grade}>{s.grade}</option>)}
            </select>
          </div>
          <button className="btn-outline" style={{ padding: '11px 14px' }} onClick={() => removeCourse(c.id)} aria-label="Remove course">\u2715</button>
        </div>
      ))}

      <button className="btn-outline" onClick={addCourse} style={{ marginTop: 8 }}>+ Add course</button>

      <div style={{ marginTop: 20 }}>
        <button className="btn-outline" onClick={() => setShowScale(!showScale)} style={{ fontSize: '0.85rem' }}>
          {showScale ? 'Hide' : 'Edit'} grading scale
        </button>
        {showScale && (
          <div className="card" style={{ marginTop: 14, background: 'var(--surface-2)' }}>
            {scale.map(s => (
              <div key={s.grade} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ width: 40 }}>{s.grade}</span>
                <input type="number" step="0.01" className="field" style={{ maxWidth: 100 }} value={s.points}
                  onChange={e => updateScalePoint(s.grade, e.target.value)} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="result-box">
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Semester GPA</div>
        <div className="value">{gpa}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>
          {totalCredits} total credit hours
        </div>
      </div>
    </ToolLayout>
  );
}
