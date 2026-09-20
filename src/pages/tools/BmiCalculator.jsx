import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

export default function BmiCalculator() {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);

  const h = (parseFloat(height) || 0) / 100;
  const w = parseFloat(weight) || 0;
  const bmi = h > 0 ? w / (h * h) : 0;

  let category = '';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal weight';
  else if (bmi < 30) category = 'Overweight';
  else if (bmi > 0) category = 'Obese';

  return (
    <ToolLayout
      title="BMI Calculator"
      description="Check your Body Mass Index from height and weight."
      note="BMI is a general screening measure and doesn't account for muscle mass, age, or body composition. It isn't a diagnosis \u2014 talk to a doctor about your individual health."
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label>Height (cm)</label>
          <input type="number" className="field" value={height} onChange={e => setHeight(e.target.value)} />
        </div>
        <div>
          <label>Weight (kg)</label>
          <input type="number" className="field" value={weight} onChange={e => setWeight(e.target.value)} />
        </div>
      </div>
      <div className="result-box">
        <div className="value">{bmi > 0 ? bmi.toFixed(1) : '\u2014'}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>{category}</div>
      </div>
    </ToolLayout>
  );
}
