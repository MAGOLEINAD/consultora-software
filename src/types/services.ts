export const SERVICE_SLUGS = [
  'data-platforms-bi',
  'process-automation',
  'applied-ai',
  'ml-forecasting',
  'software-selection',
  'managed-services',
] as const;

export type ServiceSlug = typeof SERVICE_SLUGS[number];

export interface Service {
  slug: ServiceSlug;
  icon: string;
}
