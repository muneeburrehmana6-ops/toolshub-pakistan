import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ToolCard from '../components/ToolCard';
import { categories, tools } from '../utils/toolsData';

export default function Home() {
  return (
    <>
      <SEO
        title={null}
        description="Free online GPA calculator, unit converters, PDF and image tools built for Pakistani students and professionals. No sign-up, everything runs in your browser."
        path="/"
      />

      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ padding: '72px 24px 56px', maxWidth: 780 }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600, marginBottom: 14 }}>
            {tools.length}+ free tools, zero sign-up
          </div>
          <h1 style={{ fontSize: 'clamp(2.1rem, 5vw, 3.1rem)', maxWidth: 620 }}>
            Calculators and file tools built for how Pakistan actually works.
          </h1>
          <p style={{ fontSize: '1.05rem', marginTop: 16, maxWidth: 560 }}>
            From GPA calculations to PDF conversions, every tool runs directly in your browser \u2014
            nothing you upload ever leaves your device.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 28 }}>
            <a href="#tools" className="btn">Browse tools</a>
            <Link to="/tools/gpa-calculator" className="btn btn-outline">Try GPA Calculator</Link>
          </div>
        </div>
      </section>

      <section id="tools" className="container" style={{ padding: '56px 24px' }}>
        {categories.map(cat => {
          const catTools = tools.filter(t => t.category === cat.id);
          return (
            <div key={cat.id} style={{ marginBottom: 48 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: cat.color, display: 'inline-block' }} />
                <h2 style={{ fontSize: '1.3rem', margin: 0 }}>{cat.name}</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
                {catTools.map(t => <ToolCard key={t.slug} tool={t} />)}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
