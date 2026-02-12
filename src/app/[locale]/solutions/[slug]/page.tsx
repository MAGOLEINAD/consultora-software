import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import { notFound } from 'next/navigation';
import SolutionHero from '@/components/solutions/SolutionHero';
import SolutionDetailLayout from '@/components/solutions/SolutionDetailLayout';

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
    <>
      <SolutionHero
        name={name}
        description={description}
      />

      <SolutionDetailLayout
        intro={intro}
        strugglesTitle={t('solutions.commonStrugglesTitle')}
        struggles={commonStruggles}
        solutionsTitle={t('solutions.solutionsTitle')}
        solutions={solutions}
        caseTitle={caseTitle}
        caseDescription={caseDescription}
        ctaButtonText={t('navigation.contact')}
        tabsLabels={{
          struggles: t('solutions.tabsLabels.struggles'),
          solutions: t('solutions.tabsLabels.solutions'),
          case: t('solutions.tabsLabels.case'),
        }}
      />
    </>
  );
}
