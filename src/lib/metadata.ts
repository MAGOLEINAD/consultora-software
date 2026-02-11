import { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://consultora-software.com';

interface PageMetadataProps {
  locale: string;
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export function generatePageMetadata({
  locale,
  title,
  description,
  path = '',
  image = '/og-default.jpg',
}: PageMetadataProps): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;
  const imageUrl = `${SITE_URL}${image}`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: {
        'en': `${SITE_URL}/en${path}`,
        'es': `${SITE_URL}/es${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Consultora Software',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}
