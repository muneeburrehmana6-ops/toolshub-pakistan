import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

// Editable indicative rates (relative to 1 PKR). Wire to a live FX API before launch for accuracy.
const defaultRates = { PKR: 1, USD: 1 / 278, AED: 1 / 75.7, SAR: 1 / 74.1, GBP: 1 / 352, EUR: 1 / 300 };

export default function CurrencyConverter() {
  const [rates, setRates] = useState(defaultRates);
  const [value, setValue] = useState(1000);
  const [from, setFrom] = useState('PKR');
  const [to, setTo] = useState('USD');
  const [editRates, setEditRates] = useState(false);

  const inPkr = (parseFloat(value) || 0) / rates[from];
  const result = inPkr * rates[to];

  return (
    <ToolLayout
      title="Currency Converter"
      description="Convert between PKR, USD, AED, SAR, GBP and EUR."
      note="Exchange rates change constantly. The default rates here are indicative \u2014 edit them with today's rate for an accurate result, or connect a live FX API for production use."
    >
      <label>Amount</label>
      <input type="number" className="field" value={value} onChange={e => setValue(e.target.value)} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 14 }}>
        <div>
          <label>From</label>
          <select className="field" value={from} onChange={e => setFrom(e.target.value)}>
            {Object.keys(rates).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div>
          <label>To</label>
          <select className="field" value={to} onChange={e => setTo(e.target.value)}>
            {Object.keys(rates).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>

      <button className="btn-outline" style={{ marginTop: 14, fontSize: '0.85rem' }} onClick={() => setEditRates(!editRates)}>
        {editRates ? 'Hide' : 'Edit'} rates
      </button>
      {editRates && (
        <div className="card" style={{ marginTop: 12, background: 'var(--surface-2)' }}>
          {Object.keys(rates).filter(u => u !== 'PKR').map(u => (
            <div key={u} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
              <span>1 {u} = ? PKR</span>
              <input type="number" className="field" style={{ maxWidth: 120 }} value={(1 / rates[u]).toFixed(2)}
                onChange={e => setRates({ ...rates, [u]: 1 / (parseFloat(e.target.value) || 1) })} />
            </div>
          ))}
        </div>
      )}

      <div className="result-box"><div className="value">{result.toLocaleString(undefined, { maximumFractionDigits: 2 })} {to}</div></div>
    </ToolLayout>
  );
}
