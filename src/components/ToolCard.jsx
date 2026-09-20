import { Link } from 'react-router-dom';
import { categories } from '../utils/toolsData';

export default function ToolCard({ tool }) {
  const cat = categories.find(c => c.id === tool.category);
  return (
    <Link
      to={`/tools/${tool.slug}`}
      className="card"
      style={{
        display: 'block',
        textDecoration: 'none',
        borderLeft: `3px solid ${cat?.color || 'var(--accent)'}`,
        transition: 'transform 0.15s ease, border-color 0.15s ease',
      }}
    >
      <div style={{ fontSize: '0.75rem', color: cat?.color, fontWeight: 600, marginBottom: 8 }}>
        {cat?.name}
      </div>
      <h3 style={{ fontSize: '1.05rem', marginBottom: 6, color: 'var(--text)' }}>{tool.name}</h3>
      <p style={{ fontSize: '0.87rem', margin: 0 }}>{tool.desc}</p>
    </Link>
  );
}
