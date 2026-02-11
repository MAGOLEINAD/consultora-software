import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import { Headphones } from 'lucide-react';
import ServiceHero from '@/components/services/ServiceHero';
import ChallengesSection from '@/components/services/ChallengesSection';
import DeliverablesSection from '@/components/services/DeliverablesSection';
import OutcomesSection from '@/components/services/OutcomesSection';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale });

  return generatePageMetadata({
    locale: params.locale,
    title: `${t('services.managedServices.name')} | Consultora Software`,
    description: t('services.managedServices.shortDescription'),
    path: '/services/managed-services',
  });
}

export default async function ManagedServicesPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale });

  return (
    <>
      <ServiceHero
        icon={Headphones}
        name={t('services.managedServices.name')}
        shortDescription={t('services.managedServices.shortDescription')}
      />
      <ChallengesSection
        title={t('services.managedServices.challenges.title')}
        items={Array.from({ length: 4 }, (_, i) => t(`services.managedServices.challenges.items.${i}`))}
      />
      <DeliverablesSection
        title={t('services.managedServices.deliverables.title')}
        items={Array.from({ length: 5 }, (_, i) => t(`services.managedServices.deliverables.items.${i}`))}
      />
      <OutcomesSection
        locale={params.locale}
        title={t('services.managedServices.outcomes.title')}
        items={Array.from({ length: 4 }, (_, i) => t(`services.managedServices.outcomes.items.${i}`))}
        ctaText={t('navigation.contact')}
      />
    </>
  );
}
