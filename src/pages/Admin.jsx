import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';

export default function Admin() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [usage, setUsage] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const usersSnap = await getDocs(collection(db, 'users'));
        setUsers(usersSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        const usageQuery = query(collection(db, 'toolUsage'), orderBy('timestamp', 'desc'), limit(200));
        const usageSnap = await getDocs(usageQuery);
        setUsage(usageSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error('Admin data load failed:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const toolCounts = usage.reduce((acc, u) => {
    acc[u.toolName || u.toolSlug] = (acc[u.toolName || u.toolSlug] || 0) + 1;
    return acc;
  }, {});
  const topTools = Object.entries(toolCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

  return (
    <div className="container" style={{ padding: '48px 24px 80px' }}>
      <SEO title="Admin Dashboard" description="ToolsHub admin dashboard." path="/admin" />
      <h1>Admin Dashboard</h1>
      <p>Logged in as {currentUser?.email}</p>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, margin: '24px 0 40px' }}>
            <div className="result-box" style={{ marginTop: 0 }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Registered Users</div>
              <div className="value">{users.length}</div>
            </div>
            <div className="result-box" style={{ marginTop: 0 }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tool Uses (last 200)</div>
              <div className="value">{usage.length}</div>
            </div>
            <div className="result-box" style={{ marginTop: 0 }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Most Used Tool</div>
              <div className="value" style={{ fontSize: '1.1rem' }}>{topTools[0]?.[0] || '\u2014'}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div className="card">
              <h2 style={{ fontSize: '1.05rem' }}>Top Tools</h2>
              <table>
                <thead><tr><th>Tool</th><th>Uses</th></tr></thead>
                <tbody>
                  {topTools.map(([name, count]) => (
                    <tr key={name}><td>{name}</td><td>{count}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card">
              <h2 style={{ fontSize: '1.05rem' }}>Registered Users</h2>
              <div style={{ maxHeight: 340, overflow: 'auto' }}>
                <table>
                  <thead><tr><th>Email</th><th>Name</th></tr></thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id}><td>{u.email}</td><td>{u.displayName || '\u2014'}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginTop: 24 }}>
            <h2 style={{ fontSize: '1.05rem' }}>Recent Activity</h2>
            <div style={{ maxHeight: 340, overflow: 'auto' }}>
              <table>
                <thead><tr><th>Tool</th><th>User</th><th>When</th></tr></thead>
                <tbody>
                  {usage.map(u => (
                    <tr key={u.id}>
                      <td>{u.toolName || u.toolSlug}</td>
                      <td>{u.userEmail}</td>
                      <td>{u.timestamp?.toDate ? u.timestamp.toDate().toLocaleString() : '\u2014'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
