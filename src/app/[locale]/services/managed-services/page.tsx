import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import { Headphones } from 'lucide-react';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';

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
  const { locale } = params;
  const t = await getTranslations({ locale });

  return (
    <>
      <ServiceHero
        icon={Headphones}
        name={t('services.managedServices.name')}
        shortDescription={t('services.managedServices.shortDescription')}
        locale={locale}
      />
      <ServiceDetailLayout
        challengesTitle={t('services.managedServices.challenges.title')}
        challenges={Array.from({ length: 4 }, (_, i) => t(`services.managedServices.challenges.items.${i}`))}
        deliverablesTitle={t('services.managedServices.deliverables.title')}
        deliverables={Array.from({ length: 5 }, (_, i) => t(`services.managedServices.deliverables.items.${i}`))}
        outcomesTitle={t('services.managedServices.outcomes.title')}
        outcomes={Array.from({ length: 4 }, (_, i) => t(`services.managedServices.outcomes.items.${i}`))}
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
