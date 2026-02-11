import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import { TrendingUp } from 'lucide-react';
import ServiceHero from '@/components/services/ServiceHero';
import ChallengesSection from '@/components/services/ChallengesSection';
import DeliverablesSection from '@/components/services/DeliverablesSection';
import OutcomesSection from '@/components/services/OutcomesSection';

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
      <ChallengesSection
        title={t('services.mlForecasting.challenges.title')}
        items={Array.from({ length: 4 }, (_, i) => t(`services.mlForecasting.challenges.items.${i}`))}
      />
      <DeliverablesSection
        title={t('services.mlForecasting.deliverables.title')}
        items={Array.from({ length: 5 }, (_, i) => t(`services.mlForecasting.deliverables.items.${i}`))}
      />
      <OutcomesSection
        locale={params.locale}
        title={t('services.mlForecasting.outcomes.title')}
        items={Array.from({ length: 4 }, (_, i) => t(`services.mlForecasting.outcomes.items.${i}`))}
        ctaText={t('navigation.contact')}
        cardTitle={t('services.outcomesCtaTitle')}
        cardDescription={t('services.outcomesCtaDescription')}
      />
    </>
  );
}
