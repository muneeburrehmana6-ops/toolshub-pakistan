import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

// Simplified illustrative slabs \u2014 verify against the current FBR notification before relying on this.
const slabs = [
  { upto: 600000, rate: 0, base: 0 },
  { upto: 1200000, rate: 0.05, base: 0 },
  { upto: 2200000, rate: 0.15, base: 30000 },
  { upto: 3200000, rate: 0.25, base: 180000 },
  { upto: 4100000, rate: 0.30, base: 430000 },
  { upto: Infinity, rate: 0.35, base: 700000 },
];

function annualTax(annualIncome) {
  for (let i = 0; i < slabs.length; i++) {
    if (annualIncome <= slabs[i].upto) {
      const prevUpto = i === 0 ? 0 : slabs[i - 1].upto;
      return slabs[i].base + (annualIncome - prevUpto) * slabs[i].rate;
    }
  }
  return 0;
}

export default function SalaryTaxCalculator() {
  const [monthly, setMonthly] = useState(150000);
  const annual = (parseFloat(monthly) || 0) * 12;
  const tax = annual > 600000 ? annualTax(annual) : 0;
  const monthlyTax = tax / 12;

  return (
    <ToolLayout
      title="Salary Tax Calculator (Pakistan)"
      description="Estimate your monthly income tax based on Pakistan's salary tax slabs."
      note="Tax slabs change with each Finance Act. This uses illustrative slab values \u2014 always confirm the current rates on the FBR website before making financial decisions."
    >
      <label>Gross Monthly Salary (PKR)</label>
      <input type="number" className="field" value={monthly} onChange={e => setMonthly(e.target.value)} />

      <div className="result-box">
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Estimated Monthly Tax</div>
        <div className="value">PKR {monthlyTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 8 }}>
          Net monthly salary: PKR {(parseFloat(monthly) - monthlyTax).toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </div>
      </div>
    </ToolLayout>
  );
}
