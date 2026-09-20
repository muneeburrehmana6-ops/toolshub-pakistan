import SEO from '../components/SEO';

export default function About() {
  return (
    <div className="container" style={{ padding: '56px 24px 80px', maxWidth: 720 }}>
      <SEO title="About Us" description="Learn about ToolsHub, a free collection of calculators and file tools built for Pakistan." path="/about" />
      <h1>About ToolsHub</h1>
      <p>
        ToolsHub started as a simple idea: students and professionals in Pakistan need quick,
        reliable versions of everyday tools \u2014 a GPA calculator that matches how local
        universities grade, a currency converter with PKR built in, a way to shrink a photo
        for a CNIC form \u2014 without installing software or creating an account.
      </p>
      <p>
        Every tool on this site runs directly in your browser. When you convert an image or
        merge a PDF, the file is processed on your own device and is never uploaded to a
        server, so nothing about your documents leaves your computer.
      </p>
      <p>
        We keep adding tools based on what people actually search for. If there\u2019s something
        you wish existed, the contact page is the fastest way to tell us.
      </p>
      <h2 style={{ marginTop: 32 }}>What we believe</h2>
      <ul style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
        <li>Tools should be free and usable without an account.</li>
        <li>Your files are yours \u2014 we don\u2019t need to see them to help you.</li>
        <li>A tool built for Pakistan should understand Pakistani formats, currencies and grading systems.</li>
      </ul>
    </div>
  );
}
