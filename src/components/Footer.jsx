import { Link } from 'react-router-dom';
import { categories } from '../utils/toolsData';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', marginTop: 80, padding: '48px 0 32px' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr', gap: 32 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.2rem', marginBottom: 10 }}>
            Tools<span style={{ color: 'var(--accent)' }}>Hub</span>
          </div>
          <p style={{ fontSize: '0.9rem' }}>
            Free calculators, converters and file tools built for students and professionals in Pakistan.
            Everything runs in your browser \u2014 no files are uploaded to a server.
          </p>
        </div>
        <div>
          <div style={{ fontWeight: 600, marginBottom: 10, fontSize: '0.85rem', color: 'var(--text-muted)' }}>CATEGORIES</div>
          {categories.map(c => (
            <div key={c.id} style={{ marginBottom: 8 }}>
              <Link to={`/category/${c.id}`} style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{c.name}</Link>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontWeight: 600, marginBottom: 10, fontSize: '0.85rem', color: 'var(--text-muted)' }}>SITE</div>
          <div style={{ marginBottom: 8 }}><Link to="/about" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>About Us</Link></div>
          <div style={{ marginBottom: 8 }}><Link to="/contact" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Contact</Link></div>
          <div style={{ marginBottom: 8 }}><Link to="/privacy-policy" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Privacy Policy</Link></div>
          <div style={{ marginBottom: 8 }}><Link to="/blog" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Guides</Link></div>
        </div>
      </div>
      <div className="container" style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--border)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        \u00a9 {new Date().getFullYear()} ToolsHub. All tools are provided as-is for general use; verify important results independently.
      </div>
    </footer>
  );
}
