import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [working, setWorking] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setWorking(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Login failed. Check your email and password.');
    } finally {
      setWorking(false);
    }
  };

  return (
    <div className="container" style={{ padding: '64px 24px 80px', maxWidth: 420 }}>
      <SEO title="Log In" description="Log in to your ToolsHub account." path="/login" />
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="card" style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" className="field" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" className="field" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {error && <div style={{ color: 'var(--danger)', fontSize: '0.85rem' }}>{error}</div>}
        <button type="submit" className="btn" disabled={working}>{working ? 'Logging in...' : 'Log In'}</button>
      </form>
      <p style={{ marginTop: 16, fontSize: '0.9rem' }}>
        No account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
