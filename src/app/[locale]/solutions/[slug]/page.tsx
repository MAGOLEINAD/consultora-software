import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import { notFound } from 'next/navigation';

const solutionSlugs = [
  'fpa-automation',
  'forecasting-tools',
  'pricing-analytics',
  'profitability-models',
  'spend-cubes',
  'customer-analytics',
];

export async function generateMetadata(props: { params: Promise<{ locale: string; slug: string }> }) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale });

  return generatePageMetadata({
    locale: params.locale,
    title: `${t(`solutions.items.${params.slug}.name`)} | Consultora Software`,
    description: t(`solutions.items.${params.slug}.description`),
    path: `/solutions/${params.slug}`,
  });
}

export default async function SolutionDetailPage(props: { params: Promise<{ locale: string; slug: string }> }) {
  const params = await props.params;
  const { locale, slug } = params;
  const t = await getTranslations({ locale });

  if (!solutionSlugs.includes(slug)) {
    notFound();
  }

  const baseKey = `solutions.items.${slug}`;
  const name = t(`${baseKey}.name`);
  const description = t(`${baseKey}.description`);
  let intro = '';
  try {
    intro = t(`${baseKey}.intro`);
  } catch {
    intro = '';
  }

  const commonStruggles = Array.from({ length: 4 }, (_, i) => {
    try {
      return t(`${baseKey}.commonStruggles.${i}`);
    } catch {
      return '';
    }
  }).filter(Boolean);

  const solutions = Array.from({ length: 4 }, (_, i) => {
    try {
      return t(`${baseKey}.solutions.${i}`);
    } catch {
      return '';
    }
  }).filter(Boolean);

  let caseTitle = '';
  let caseDescription = '';
  try {
    caseTitle = t(`${baseKey}.case.title`);
    caseDescription = t(`${baseKey}.case.description`);
  } catch {
    caseTitle = '';
    caseDescription = '';
  }

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-[hsl(var(--accent))] mb-6">
          {name}
        </h1>
        <p className="text-lg text-[hsl(var(--neutral-800))] mb-6">
          {description}
        </p>
        {intro && (
          <p className="text-[hsl(var(--neutral-800))] leading-relaxed mb-8">
            {intro}
          </p>
        )}

        {commonStruggles.length > 0 && (
          <div className="mb-10">
            <h2 className="font-display text-2xl font-semibold text-[hsl(var(--accent))] mb-4">
              {t('solutions.commonStrugglesTitle')}
            </h2>
            <ul className="space-y-3 text-[hsl(var(--neutral-800))]">
              {commonStruggles.map((item) => (
                <li key={item} className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--neutral-50))] p-4">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {solutions.length > 0 && (
          <div className="mb-10">
            <h2 className="font-display text-2xl font-semibold text-[hsl(var(--accent))] mb-4">
              {t('solutions.solutionsTitle')}
            </h2>
            <ul className="space-y-3 text-[hsl(var(--neutral-800))]">
              {solutions.map((item) => (
                <li key={item} className="rounded-2xl border border-[hsl(var(--border))] bg-white p-4">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {caseTitle && caseDescription && (
          <div className="rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--neutral-50))] p-8">
            <h3 className="font-display text-2xl font-semibold text-[hsl(var(--accent))] mb-3">
              {caseTitle}
            </h3>
            <p className="text-[hsl(var(--neutral-800))] leading-relaxed">
              {caseDescription}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
