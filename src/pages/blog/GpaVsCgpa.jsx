import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';

export default function GpaVsCgpa() {
  return (
    <div className="container" style={{ padding: '56px 24px 80px', maxWidth: 680 }}>
      <SEO title="GPA vs CGPA: What's the Difference?" description="A plain-language explanation of how GPA and CGPA are calculated and why they differ." path="/blog/gpa-vs-cgpa" />
      <h1>GPA vs CGPA: What's the Difference?</h1>
      <p>
        Students often use these two terms interchangeably, but they measure different things.
        Understanding the difference makes it much easier to track your academic progress.
      </p>
      <h2>GPA (Grade Point Average)</h2>
      <p>
        Your GPA reflects performance in a single semester only. It is calculated by multiplying
        each course\u2019s grade point by its credit hours, adding those up, and dividing by the
        total credit hours for that semester.
      </p>
      <h2>CGPA (Cumulative Grade Point Average)</h2>
      <p>
        Your CGPA reflects performance across every semester you\u2019ve completed so far. It is a
        weighted average of all your semester GPAs, weighted by each semester\u2019s total credit
        hours \u2014 not a simple average of the GPA numbers.
      </p>
      <h2>Why they can look different</h2>
      <p>
        A strong single semester raises your GPA for that term immediately, but moves your CGPA
        more slowly because it\u2019s diluted across every semester you\u2019ve studied. This is why a
        rough semester early on can take several strong semesters to fully recover from in your CGPA.
      </p>
      <p>
        <Link to="/tools/gpa-calculator">Try the GPA Calculator</Link> or{' '}
        <Link to="/tools/cgpa-calculator">the CGPA Calculator</Link> to see this in practice.
      </p>
    </div>
  );
}
