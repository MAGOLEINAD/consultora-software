import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import { TrendingUp } from 'lucide-react';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale });

  return generatePageMetadata({
    locale: params.locale,
    title: `${t('services.mlForecasting.name')} | Consultora Software`,
    description: t('services.mlForecasting.shortDescription'),
    path: '/services/ml-forecasting',
  });
}

export default async function MlForecastingPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale });

  return (
    <>
      <ServiceHero
        icon={TrendingUp}
        name={t('services.mlForecasting.name')}
        shortDescription={t('services.mlForecasting.shortDescription')}
      />
      <ServiceDetailLayout
        challengesTitle={t('services.mlForecasting.challenges.title')}
        challenges={Array.from({ length: 4 }, (_, i) => t(`services.mlForecasting.challenges.items.${i}`))}
        deliverablesTitle={t('services.mlForecasting.deliverables.title')}
        deliverables={Array.from({ length: 5 }, (_, i) => t(`services.mlForecasting.deliverables.items.${i}`))}
        outcomesTitle={t('services.mlForecasting.outcomes.title')}
        outcomes={Array.from({ length: 4 }, (_, i) => t(`services.mlForecasting.outcomes.items.${i}`))}
        ctaTitle={t('services.outcomesCtaTitle')}
        ctaDescription={t('services.outcomesCtaDescription')}
        ctaButtonText={t('navigation.contact')}
        tabsLabels={{
          challenges: t('services.tabsLabels.challenges'),
          deliverables: t('services.tabsLabels.deliverables'),
          outcomes: t('services.tabsLabels.outcomes'),
        }}
      />
    </>
  );
}
