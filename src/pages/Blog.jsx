import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const posts = [
  { slug: 'gpa-vs-cgpa', title: 'GPA vs CGPA: What\u2019s the Difference?', desc: 'A plain-language explanation of how GPA and CGPA are calculated and why they differ.' },
  { slug: 'hec-grading-scale', title: 'Understanding Pakistan\u2019s HEC 4.0 Grading Scale', desc: 'How the standard grading scale used by most Pakistani universities works.' },
  { slug: 'compress-image-without-losing-quality', title: 'How to Compress an Image Without Losing Quality', desc: 'Practical tips for shrinking photo file sizes for forms, email and web uploads.' },
];

export default function Blog() {
  return (
    <div className="container" style={{ padding: '56px 24px 80px', maxWidth: 720 }}>
      <SEO title="Guides" description="Short, practical guides on GPA, grading and file tools." path="/blog" />
      <h1>Guides</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 24 }}>
        {posts.map(p => (
          <Link key={p.slug} to={`/blog/${p.slug}`} className="card" style={{ textDecoration: 'none' }}>
            <h2 style={{ fontSize: '1.15rem', color: 'var(--text)' }}>{p.title}</h2>
            <p style={{ margin: 0 }}>{p.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
