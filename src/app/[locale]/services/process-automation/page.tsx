import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import { Workflow } from 'lucide-react';
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
      />
      <ChallengesSection
        title={t('services.processAutomation.challenges.title')}
        items={challenges}
      />
      <DeliverablesSection
        title={t('services.processAutomation.deliverables.title')}
        items={deliverables}
      />
      <OutcomesSection
        locale={locale}
        title={t('services.processAutomation.outcomes.title')}
        items={outcomes}
        ctaText={t('navigation.contact')}
        cardTitle={t('services.outcomesCtaTitle')}
        cardDescription={t('services.outcomesCtaDescription')}
      />
    </>
  );
}
