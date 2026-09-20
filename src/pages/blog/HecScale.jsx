import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';

export default function HecScale() {
  return (
    <div className="container" style={{ padding: '56px 24px 80px', maxWidth: 680 }}>
      <SEO title="Understanding Pakistan's HEC 4.0 Grading Scale" description="How the standard grading scale used by most Pakistani universities works." path="/blog/hec-grading-scale" />
      <h1>Understanding Pakistan's HEC 4.0 Grading Scale</h1>
      <p>
        Most universities in Pakistan follow a grading scale recommended by the Higher Education
        Commission (HEC), based on a 4.0 point system. While individual universities can adjust
        the exact percentage cut-offs, the point values are broadly consistent.
      </p>
      <table style={{ margin: '20px 0' }}>
        <thead>
          <tr><th>Grade</th><th>Typical %</th><th>Grade Point</th></tr>
        </thead>
        <tbody>
          <tr><td>A</td><td>85\u2013100</td><td>4.00</td></tr>
          <tr><td>A-</td><td>80\u201384</td><td>3.66</td></tr>
          <tr><td>B+</td><td>75\u201379</td><td>3.33</td></tr>
          <tr><td>B</td><td>71\u201374</td><td>3.00</td></tr>
          <tr><td>B-</td><td>68\u201370</td><td>2.66</td></tr>
          <tr><td>C+</td><td>64\u201367</td><td>2.33</td></tr>
          <tr><td>C</td><td>61\u201363</td><td>2.00</td></tr>
          <tr><td>D</td><td>50\u201355</td><td>1.00</td></tr>
          <tr><td>F</td><td>Below 50</td><td>0.00</td></tr>
        </tbody>
      </table>
      <p>
        Because some universities shift these cut-offs slightly, it\u2019s always worth checking your
        own institution\u2019s official grading policy for exact boundaries. Our{' '}
        <Link to="/tools/gpa-calculator">GPA Calculator</Link> lets you edit the point value for
        each grade if your university\u2019s scale differs from this default.
      </p>
    </div>
  );
}
