import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { categories } from '../utils/toolsData';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)', position: 'sticky', top: 0, zIndex: 40 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'baseline', gap: 4, textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.35rem', color: 'var(--text)' }}>Tools</span>
          <span style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.35rem', color: 'var(--accent)' }}>Hub</span>
        </Link>

        <nav style={{ display: 'flex', gap: 22, alignItems: 'center' }} className="nav-desktop">
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({
              color: isActive ? 'var(--accent-soft)' : 'var(--text-muted)',
              fontSize: '0.92rem',
              fontWeight: 500,
              textDecoration: 'none',
            })}
          >
            Home
          </NavLink>
          {categories.map(c => (
            <NavLink
              key={c.id}
              to={`/category/${c.id}`}
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent-soft)' : 'var(--text-muted)',
                fontSize: '0.92rem',
                fontWeight: 500,
                textDecoration: 'none',
              })}
            >
              {c.name}
            </NavLink>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }} className="nav-desktop">
          {isAdmin && (
            <Link to="/admin" style={{ color: 'var(--accent-soft)', fontSize: '0.9rem', fontWeight: 500 }}>Admin</Link>
          )}
          {currentUser ? (
            <button className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.88rem' }} onClick={handleLogout}>Log Out</button>
          ) : (
            <>
              <Link to="/login" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Log In</Link>
              <Link to="/signup" className="btn" style={{ padding: '8px 16px', fontSize: '0.88rem' }}>Sign Up</Link>
            </>
          )}
        </div>

        <button
          className="btn-outline nav-toggle"
          onClick={() => setOpen(!open)}
          style={{ display: 'none', padding: '8px 12px' }}
          aria-label="Toggle menu"
        >
          {open ? '\u2715' : '\u2630'}
        </button>
      </div>

      {open && (
        <div className="container" style={{ paddingBottom: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Link to="/" onClick={() => setOpen(false)} style={{ color: 'var(--text)', fontWeight: 600 }}>
            Home
          </Link>
          {categories.map(c => (
            <Link key={c.id} to={`/category/${c.id}`} onClick={() => setOpen(false)} style={{ color: 'var(--text)' }}>
              {c.name}
            </Link>
          ))}
          {isAdmin && <Link to="/admin" onClick={() => setOpen(false)} style={{ color: 'var(--accent-soft)' }}>Admin</Link>}
          {currentUser ? (
            <button className="btn-outline" style={{ alignSelf: 'flex-start' }} onClick={() => { setOpen(false); handleLogout(); }}>Log Out</button>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} style={{ color: 'var(--text)' }}>Log In</Link>
              <Link to="/signup" onClick={() => setOpen(false)} style={{ color: 'var(--text)' }}>Sign Up</Link>
            </>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 760px) {
          .nav-desktop { display: none !important; }
          .nav-toggle { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
