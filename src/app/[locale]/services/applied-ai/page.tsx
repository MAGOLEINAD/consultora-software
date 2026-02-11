import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import { Brain } from 'lucide-react';
import ServiceHero from '@/components/services/ServiceHero';
import ChallengesSection from '@/components/services/ChallengesSection';
import DeliverablesSection from '@/components/services/DeliverablesSection';
import OutcomesSection from '@/components/services/OutcomesSection';

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
      <ChallengesSection
        title={t('services.appliedAi.challenges.title')}
        items={Array.from({ length: 4 }, (_, i) => t(`services.appliedAi.challenges.items.${i}`))}
      />
      <DeliverablesSection
        title={t('services.appliedAi.deliverables.title')}
        items={Array.from({ length: 5 }, (_, i) => t(`services.appliedAi.deliverables.items.${i}`))}
      />
      <OutcomesSection
        locale={params.locale}
        title={t('services.appliedAi.outcomes.title')}
        items={Array.from({ length: 4 }, (_, i) => t(`services.appliedAi.outcomes.items.${i}`))}
        ctaText={t('navigation.contact')}
      />
    </>
  );
}
