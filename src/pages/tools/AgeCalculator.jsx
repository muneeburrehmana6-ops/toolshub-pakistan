import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

export default function AgeCalculator() {
  const [dob, setDob] = useState('2000-01-01');

  const calc = () => {
    const birth = new Date(dob);
    const now = new Date();
    if (isNaN(birth.getTime()) || birth > now) return null;

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    const totalDays = Math.floor((now - birth) / (1000 * 60 * 60 * 24));
    return { years, months, days, totalDays };
  };

  const result = calc();

  return (
    <ToolLayout title="Age Calculator" description="Find your exact age in years, months and days from your date of birth.">
      <label>Date of Birth</label>
      <input type="date" className="field" value={dob} onChange={e => setDob(e.target.value)} max={new Date().toISOString().split('T')[0]} />

      {result ? (
        <div className="result-box">
          <div className="value">{result.years}y {result.months}m {result.days}d</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>
            {result.totalDays.toLocaleString()} total days lived
          </div>
        </div>
      ) : (
        <div className="result-box">Enter a valid date of birth in the past.</div>
      )}
    </ToolLayout>
  );
}
