import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import { Link } from '@/i18n/routing';

const solutionSlugs = [
  'fpa-automation',
  'forecasting-tools',
  'pricing-analytics',
  'profitability-models',
  'spend-cubes',
  'customer-analytics',
];

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale });

  return generatePageMetadata({
    locale: params.locale,
    title: t('metadata.solutions.title'),
    description: t('metadata.solutions.description'),
    path: '/solutions',
  });
}

export default async function SolutionsPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale });

  const items = solutionSlugs.map((slug) => ({
    slug,
    name: t(`solutions.items.${slug}.name`),
    description: t(`solutions.items.${slug}.description`),
  }));

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-accent mb-4">
            {t('solutions.title')}
          </h1>
          <p className="text-neutral-800">
            {t('solutions.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link key={item.slug} href={`/solutions/${item.slug}`}>
              <div className="rounded-3xl border border-border bg-neutral-50 p-6 hover-lift">
                <h3 className="font-display text-xl font-semibold text-accent mb-3">
                  {item.name}
                </h3>
                <p className="text-sm text-neutral-800">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
