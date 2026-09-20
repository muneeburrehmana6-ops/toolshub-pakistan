import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [working, setWorking] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setWorking(true);
    try {
      await signup(email, password, name);
      navigate('/');
    } catch (err) {
      setError(err.code === 'auth/email-already-in-use' ? 'That email is already registered.' : 'Could not create account.');
    } finally {
      setWorking(false);
    }
  };

  return (
    <div className="container" style={{ padding: '64px 24px 80px', maxWidth: 420 }}>
      <SEO title="Sign Up" description="Create a free ToolsHub account." path="/signup" />
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit} className="card" style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" className="field" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" className="field" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" className="field" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {error && <div style={{ color: 'var(--danger)', fontSize: '0.85rem' }}>{error}</div>}
        <button type="submit" className="btn" disabled={working}>{working ? 'Creating account...' : 'Sign Up'}</button>
      </form>
      <p style={{ marginTop: 16, fontSize: '0.9rem' }}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
