import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import { ShoppingCart } from 'lucide-react';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';

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
  const { locale } = params;
  const t = await getTranslations({ locale });

  return (
    <>
      <ServiceHero
        icon={ShoppingCart}
        name={t('services.softwareSelection.name')}
        shortDescription={t('services.softwareSelection.shortDescription')}
        locale={locale}
      />
      <ServiceDetailLayout
        challengesTitle={t('services.softwareSelection.challenges.title')}
        challenges={Array.from({ length: 4 }, (_, i) => t(`services.softwareSelection.challenges.items.${i}`))}
        deliverablesTitle={t('services.softwareSelection.deliverables.title')}
        deliverables={Array.from({ length: 5 }, (_, i) => t(`services.softwareSelection.deliverables.items.${i}`))}
        outcomesTitle={t('services.softwareSelection.outcomes.title')}
        outcomes={Array.from({ length: 4 }, (_, i) => t(`services.softwareSelection.outcomes.items.${i}`))}
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
