import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

export default function LoanCalculator() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(15);
  const [years, setYears] = useState(5);

  const P = parseFloat(amount) || 0;
  const r = (parseFloat(rate) || 0) / 100 / 12;
  const n = (parseFloat(years) || 0) * 12;

  const emi = r > 0 && n > 0 ? (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : (n > 0 ? P / n : 0);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;

  return (
    <ToolLayout title="Loan / EMI Calculator" description="Work out monthly installments for any loan amount, interest rate and term.">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label>Loan Amount (PKR)</label>
          <input type="number" className="field" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
        <div>
          <label>Annual Interest Rate (%)</label>
          <input type="number" step="0.1" className="field" value={rate} onChange={e => setRate(e.target.value)} />
        </div>
        <div>
          <label>Term (years)</label>
          <input type="number" className="field" value={years} onChange={e => setYears(e.target.value)} />
        </div>
      </div>
      <div className="result-box">
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Monthly Installment</div>
        <div className="value">PKR {emi.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 8 }}>
          Total payment: PKR {totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })} \u00b7
          {' '}Total interest: PKR {totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </div>
      </div>
    </ToolLayout>
  );
}
