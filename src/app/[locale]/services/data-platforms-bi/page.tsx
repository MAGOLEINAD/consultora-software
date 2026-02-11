import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import { Database } from 'lucide-react';
import ServiceHero from '@/components/services/ServiceHero';
import ChallengesSection from '@/components/services/ChallengesSection';
import DeliverablesSection from '@/components/services/DeliverablesSection';
import OutcomesSection from '@/components/services/OutcomesSection';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params;
  const t = await getTranslations({ locale });

  return generatePageMetadata({
    locale,
    title: `${t('services.dataPlatformsBi.name')} | Consultora Software`,
    description: t('services.dataPlatformsBi.shortDescription'),
    path: '/services/data-platforms-bi',
  });
}

export default async function DataPlatformsBiPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params;
  const t = await getTranslations({ locale });

  const challenges = Array.from({ length: 4 }, (_, i) =>
    t(`services.dataPlatformsBi.challenges.items.${i}`)
  );

  const deliverables = Array.from({ length: 5 }, (_, i) =>
    t(`services.dataPlatformsBi.deliverables.items.${i}`)
  );

  const outcomes = Array.from({ length: 4 }, (_, i) =>
    t(`services.dataPlatformsBi.outcomes.items.${i}`)
  );

  return (
    <>
      <ServiceHero
        icon={Database}
        name={t('services.dataPlatformsBi.name')}
        shortDescription={t('services.dataPlatformsBi.shortDescription')}
      />

      <ChallengesSection
        title={t('services.dataPlatformsBi.challenges.title')}
        items={challenges}
      />

      <DeliverablesSection
        title={t('services.dataPlatformsBi.deliverables.title')}
        items={deliverables}
      />

      <OutcomesSection
        locale={locale}
        title={t('services.dataPlatformsBi.outcomes.title')}
        items={outcomes}
        ctaText={t('navigation.contact')}
        cardTitle={t('services.outcomesCtaTitle')}
        cardDescription={t('services.outcomesCtaDescription')}
      />
    </>
  );
}
