const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://consultora-software.com';

export function generateOrganizationSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Consultora Software',
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/logo.png`,
    description: locale === 'en'
      ? 'Premium software consultancy specializing in data platforms, automation, and AI solutions for high-value business outcomes.'
      : 'Consultora de software premium especializada en plataformas de datos, automatización y soluciones de IA para resultados empresariales de alto valor.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      availableLanguage: ['en', 'es'],
    },
    sameAs: [
      'https://linkedin.com/company/consultora-software',
    ],
  };
}

interface ServiceSchemaProps {
  name: string;
  description: string;
  priceRange?: string;
  locale: string;
}

export function generateServiceSchema({
  name,
  description,
  priceRange,
  locale,
}: ServiceSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    provider: {
      '@type': 'Organization',
      name: 'Consultora Software',
      url: `${SITE_URL}/${locale}`,
    },
    description,
    ...(priceRange && {
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: priceRange,
      },
    }),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
