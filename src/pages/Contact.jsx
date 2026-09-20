import { useState } from 'react';
import SEO from '../components/SEO';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="container" style={{ padding: '56px 24px 80px', maxWidth: 560 }}>
      <SEO title="Contact" description="Get in touch with the ToolsHub team \u2014 suggestions, bug reports and tool requests." path="/contact" />
      <h1>Contact Us</h1>
      <p>Found a bug, or want a tool we don\u2019t have yet? Send a message below.</p>

      {sent ? (
        <div className="result-box">Thanks \u2014 your message has been noted. We read every submission.</div>
      ) : (
        <form onSubmit={handleSubmit} className="card" style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" className="field" required />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" className="field" required />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea id="message" className="field" rows={5} required />
          </div>
          <button type="submit" className="btn" style={{ alignSelf: 'flex-start' }}>Send message</button>
        </form>
      )}

      <p style={{ marginTop: 24, fontSize: '0.85rem' }}>
        Note: wire this form to a real email service (e.g. Formspree, EmailJS, or your own backend)
        before launch \u2014 right now it only confirms locally.
      </p>
    </div>
  );
}
