import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import { Brain } from 'lucide-react';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale });

  return generatePageMetadata({
    locale: params.locale,
    title: `${t('services.appliedAi.name')} | Consultora Software`,
    description: t('services.appliedAi.shortDescription'),
    path: '/services/applied-ai',
  });
}

export default async function AppliedAiPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale });

  return (
    <>
      <ServiceHero
        icon={Brain}
        name={t('services.appliedAi.name')}
        shortDescription={t('services.appliedAi.shortDescription')}
      />
      <ServiceDetailLayout
        challengesTitle={t('services.appliedAi.challenges.title')}
        challenges={Array.from({ length: 4 }, (_, i) => t(`services.appliedAi.challenges.items.${i}`))}
        deliverablesTitle={t('services.appliedAi.deliverables.title')}
        deliverables={Array.from({ length: 5 }, (_, i) => t(`services.appliedAi.deliverables.items.${i}`))}
        outcomesTitle={t('services.appliedAi.outcomes.title')}
        outcomes={Array.from({ length: 4 }, (_, i) => t(`services.appliedAi.outcomes.items.${i}`))}
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
