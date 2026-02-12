import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import { Database } from 'lucide-react';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';

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

      <ServiceDetailLayout
        challengesTitle={t('services.dataPlatformsBi.challenges.title')}
        challenges={challenges}
        deliverablesTitle={t('services.dataPlatformsBi.deliverables.title')}
        deliverables={deliverables}
        outcomesTitle={t('services.dataPlatformsBi.outcomes.title')}
        outcomes={outcomes}
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
