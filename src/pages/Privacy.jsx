import SEO from '../components/SEO';

export default function Privacy() {
  return (
    <div className="container" style={{ padding: '56px 24px 80px', maxWidth: 720 }}>
      <SEO title="Privacy Policy" description="ToolsHub privacy policy \u2014 how we handle your data and files." path="/privacy-policy" />
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long' })}</p>

      <h2 style={{ marginTop: 28 }}>Files you use in our tools</h2>
      <p>
        Every calculator and file tool on ToolsHub runs entirely in your web browser using
        JavaScript. Files you select \u2014 images, PDFs, spreadsheets, documents \u2014 are processed
        on your own device and are never uploaded to our servers or seen by us.
      </p>

      <h2 style={{ marginTop: 28 }}>Cookies and advertising</h2>
      <p>
        We may use cookies and similar technologies to serve relevant advertising through
        Google AdSense. Google and its partners may use cookies to serve ads based on your
        visits to this site and other sites on the internet. You can opt out of personalised
        advertising by visiting Google\u2019s Ads Settings.
      </p>

      <h2 style={{ marginTop: 28 }}>Analytics</h2>
      <p>
        We may use analytics tools to understand which tools are most useful, using anonymised,
        aggregated usage data such as page views and general location (country/city level).
      </p>

      <h2 style={{ marginTop: 28 }}>Contact form data</h2>
      <p>
        If you submit the contact form, we store your name, email and message only to respond
        to your query. We do not sell or share this information with third parties.
      </p>

      <h2 style={{ marginTop: 28 }}>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Continued use of the site after changes
        means you accept the updated policy.
      </p>
    </div>
  );
}
