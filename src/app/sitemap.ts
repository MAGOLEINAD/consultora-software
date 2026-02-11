import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://consultora-software.com';

const servicePages = [
  'data-platforms-bi',
  'process-automation',
  'applied-ai',
  'ml-forecasting',
  'software-selection',
  'managed-services',
];

const solutionPages = [
  'fpa-automation',
  'forecasting-tools',
  'pricing-analytics',
  'profitability-models',
  'spend-cubes',
  'customer-analytics',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;

  const routes: MetadataRoute.Sitemap = [];

  // Add pages for each locale
  locales.forEach((locale) => {
    // Home
    routes.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    });

    // Services overview
    routes.push({
      url: `${SITE_URL}/${locale}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // Solutions overview
    routes.push({
      url: `${SITE_URL}/${locale}/solutions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // Service detail pages
    servicePages.forEach((service) => {
      routes.push({
        url: `${SITE_URL}/${locale}/services/${service}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });

    // Solution detail pages
    solutionPages.forEach((solution) => {
      routes.push({
        url: `${SITE_URL}/${locale}/solutions/${solution}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });

    // About
    routes.push({
      url: `${SITE_URL}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Case Studies
    routes.push({
      url: `${SITE_URL}/${locale}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Contact
    routes.push({
      url: `${SITE_URL}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  return routes;
}
