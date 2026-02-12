import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import SolutionTabs from '@/components/home/SolutionTabsVerticalTimeline';

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

  const tabs = solutionSlugs.map((slug, index) => ({
    slug,
    label: t(`home.solutionTabs.tabs.${index}.label`),
    title: t(`home.solutionTabs.tabs.${index}.title`),
    description: t(`home.solutionTabs.tabs.${index}.description`),
  }));

  return (
    <SolutionTabs
      title={t('home.solutionTabs.title')}
      tabs={tabs}
      sectionClassName="pt-10 pb-16 md:pb-20 bg-neutral-50"
      locale={params.locale}
    />
  );
}
