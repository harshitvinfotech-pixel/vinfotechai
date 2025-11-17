import { Helmet } from 'react-helmet-async';

interface PageMetaProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

export default function PageMeta({ title, description, keywords, ogImage }: PageMetaProps) {
  const fullTitle = `${title} | Vinfotech`;
  const defaultOgImage = ogImage || '/vinfo-2.png';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={defaultOgImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={defaultOgImage} />
    </Helmet>
  );
}
