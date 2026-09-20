import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ToolCard from '../components/ToolCard';
import { categories, getToolsByCategory } from '../utils/toolsData';

export default function Category() {
  const { id } = useParams();
  const cat = categories.find(c => c.id === id);
  const catTools = getToolsByCategory(id);

  if (!cat) {
    return (
      <div className="container" style={{ padding: '64px 24px' }}>
        <h1>Category not found</h1>
        <Link to="/">Back home</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '56px 24px 80px' }}>
      <SEO title={cat.name} description={`Free ${cat.name.toLowerCase()} \u2014 no sign-up, runs in your browser.`} path={`/category/${cat.id}`} />
      <h1 style={{ fontSize: '2rem', marginBottom: 28 }}>{cat.name}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {catTools.map(t => <ToolCard key={t.slug} tool={t} />)}
      </div>
    </div>
  );
}
