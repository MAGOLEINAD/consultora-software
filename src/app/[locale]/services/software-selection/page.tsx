import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import { ShoppingCart } from 'lucide-react';
import ServiceHero from '@/components/services/ServiceHero';
import ChallengesSection from '@/components/services/ChallengesSection';
import DeliverablesSection from '@/components/services/DeliverablesSection';
import OutcomesSection from '@/components/services/OutcomesSection';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale });

  return generatePageMetadata({
    locale: params.locale,
    title: `${t('services.softwareSelection.name')} | Consultora Software`,
    description: t('services.softwareSelection.shortDescription'),
    path: '/services/software-selection',
  });
}

export default async function SoftwareSelectionPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale });

  return (
    <>
      <ServiceHero
        icon={ShoppingCart}
        name={t('services.softwareSelection.name')}
        shortDescription={t('services.softwareSelection.shortDescription')}
      />
      <ChallengesSection
        title={t('services.softwareSelection.challenges.title')}
        items={Array.from({ length: 4 }, (_, i) => t(`services.softwareSelection.challenges.items.${i}`))}
      />
      <DeliverablesSection
        title={t('services.softwareSelection.deliverables.title')}
        items={Array.from({ length: 5 }, (_, i) => t(`services.softwareSelection.deliverables.items.${i}`))}
      />
      <OutcomesSection
        locale={params.locale}
        title={t('services.softwareSelection.outcomes.title')}
        items={Array.from({ length: 4 }, (_, i) => t(`services.softwareSelection.outcomes.items.${i}`))}
        ctaText={t('navigation.contact')}
      />
    </>
  );
}
