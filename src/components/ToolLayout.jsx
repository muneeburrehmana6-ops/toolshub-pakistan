import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import { useAuth } from '../context/AuthContext';
import { logToolUsage } from '../utils/logUsage';

export default function ToolLayout({ title, description, children, note }) {
  const { currentUser } = useAuth();

  useEffect(() => {
    logToolUsage(title, title, currentUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return (
    <div className="container" style={{ padding: '32px 24px 80px' }}>
      <SEO title={title} description={description} path={`/tools/${title}`} />
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
          marginBottom: 20,
        }}
      >
        \u2190 Back to all tools
      </Link>
      <div style={{ maxWidth: 760, marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.9rem' }}>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="card" style={{ maxWidth: 720 }}>
        {children}
      </div>
      {note && (
        <p style={{ maxWidth: 720, marginTop: 20, fontSize: '0.85rem' }}>{note}</p>
      )}
    </div>
  );
}
