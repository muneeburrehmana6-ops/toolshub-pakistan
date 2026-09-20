import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, path = '' }) {
  const fullTitle = title ? `${title} | ToolsHub Pakistan` : 'ToolsHub Pakistan \u2014 Free Online Calculators & File Tools';
  const url = `https://toolshub.pk${path}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
