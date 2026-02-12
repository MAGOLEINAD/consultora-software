import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import { Workflow } from 'lucide-react';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params;
  const t = await getTranslations({ locale });

  return generatePageMetadata({
    locale,
    title: `${t('services.processAutomation.name')} | Consultora Software`,
    description: t('services.processAutomation.shortDescription'),
    path: '/services/process-automation',
  });
}

export default async function ProcessAutomationPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params;
  const t = await getTranslations({ locale });

  const challenges = Array.from({ length: 5 }, (_, i) =>
    t(`services.processAutomation.challenges.items.${i}`)
  );

  const deliverables = Array.from({ length: 5 }, (_, i) =>
    t(`services.processAutomation.deliverables.items.${i}`)
  );

  const outcomes = Array.from({ length: 4 }, (_, i) =>
    t(`services.processAutomation.outcomes.items.${i}`)
  );

  return (
    <>
      <ServiceHero
        icon={Workflow}
        name={t('services.processAutomation.name')}
        shortDescription={t('services.processAutomation.shortDescription')}
        locale={locale}
      />
      <ServiceDetailLayout
        challengesTitle={t('services.processAutomation.challenges.title')}
        challenges={challenges}
        deliverablesTitle={t('services.processAutomation.deliverables.title')}
        deliverables={deliverables}
        outcomesTitle={t('services.processAutomation.outcomes.title')}
        outcomes={outcomes}
        ctaTitle={t('services.outcomesCtaTitle')}
        ctaDescription={t('services.outcomesCtaDescription')}
        ctaButtonText={t('navigation.contact')}
        tabsLabels={{
          challenges: t('services.tabsLabels.challenges'),
          deliverables: t('services.tabsLabels.deliverables'),
          outcomes: t('services.tabsLabels.outcomes'),
        }}
        locale={locale}
      />
    </>
  );
}
