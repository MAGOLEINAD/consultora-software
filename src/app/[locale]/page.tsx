import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import Hero from '@/components/home/Hero';
import ClientLogoSlider from '@/components/home/ClientLogoSlider';
import AboutTabs from '@/components/home/AboutTabs';
import ServicesGrid from '@/components/home/ServicesGrid';
import PricingCards from '@/components/home/PricingCards';
import FAQSection from '@/components/home/FAQSection';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params;
  const t = await getTranslations({ locale });

  return generatePageMetadata({
    locale,
    title: t('metadata.home.title'),
    description: t('metadata.home.description'),
    path: '',
  });
}

export default async function HomePage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params;
  const t = await getTranslations({ locale });

  const services = [
    {
      name: t('services.dataPlatformsBi.name'),
      shortDescription: t('services.dataPlatformsBi.shortDescription'),
      slug: 'data-platforms-bi',
    },
    {
      name: t('services.processAutomation.name'),
      shortDescription: t('services.processAutomation.shortDescription'),
      slug: 'process-automation',
    },
    {
      name: t('services.appliedAi.name'),
      shortDescription: t('services.appliedAi.shortDescription'),
      slug: 'applied-ai',
    },
    {
      name: t('services.mlForecasting.name'),
      shortDescription: t('services.mlForecasting.shortDescription'),
      slug: 'ml-forecasting',
    },
    {
      name: t('services.softwareSelection.name'),
      shortDescription: t('services.softwareSelection.shortDescription'),
      slug: 'software-selection',
    },
    {
      name: t('services.managedServices.name'),
      shortDescription: t('services.managedServices.shortDescription'),
      slug: 'managed-services',
    },
  ];

  const pricingPackages = Array.from({ length: 4 }, (_, i) => ({
    name: t(`home.packages.items.${i}.name`),
    duration: t(`home.packages.items.${i}.duration`),
    price: t(`home.packages.items.${i}.price`),
    includes: Array.from({ length: Number(t(`home.packages.items.${i}.includesLength`)) }, (_, j) =>
      t(`home.packages.items.${i}.includes.${j}`)
    ),
    excludes: Array.from({ length: Number(t(`home.packages.items.${i}.excludesLength`)) }, (_, j) =>
      t(`home.packages.items.${i}.excludes.${j}`)
    ).filter(Boolean),
    notes: Array.from({ length: Number(t(`home.packages.items.${i}.notesLength`)) }, (_, j) =>
      t(`home.packages.items.${i}.notes.${j}`)
    ).filter(Boolean),
    cta: t(`home.packages.items.${i}.cta`),
  }));

  const faqItems = Array.from({ length: 5 }, (_, i) => ({
    question: t(`home.faq.items.${i}.question`),
    answer: t(`home.faq.items.${i}.answer`),
  }));

  return (
    <>
      <Hero
        locale={locale}
        badge={t('home.hero.badge')}
        title={t('home.hero.title')}
        subtitle={t('home.hero.subtitle')}
        cta1={t('home.hero.cta1')}
        metricTitle={t('home.hero.metricTitle')}
        metricSubtitle={t('home.hero.metricSubtitle')}
        awardLine={t('home.hero.awardLine')}
      />

      <ClientLogoSlider title={t('home.trustedBy')} />

      <AboutTabs
        title={t('home.aboutTabs.title')}
        subtitle={t('home.aboutTabs.subtitle')}
        tabs={[
          {
            label: t('home.aboutTabs.tabs.0.label'),
            title: t('home.aboutTabs.tabs.0.title'),
            description: t('home.aboutTabs.tabs.0.description'),
          },
          {
            label: t('home.aboutTabs.tabs.1.label'),
            title: t('home.aboutTabs.tabs.1.title'),
            description: t('home.aboutTabs.tabs.1.description'),
          },
          {
            label: t('home.aboutTabs.tabs.2.label'),
            title: t('home.aboutTabs.tabs.2.title'),
            description: t('home.aboutTabs.tabs.2.description'),
          },
        ]}
        points={[
          t('home.aboutTabs.points.0'),
          t('home.aboutTabs.points.1'),
          t('home.aboutTabs.points.2'),
          t('home.aboutTabs.points.3'),
        ]}
        cta={t('home.aboutTabs.cta')}
        helpLine={t('home.aboutTabs.helpLine')}
      />

      <ServicesGrid
        locale={locale}
        title={t('home.services.title')}
        subtitle={t('home.services.subtitle')}
        services={services}
      />

      <PricingCards
        title={t('home.packages.title')}
        intro={t('home.packages.intro')}
        selectionPrompt={t('home.packages.selectionPrompt')}
        selectionHint={t('home.packages.selectionHint')}
        selectedLabel={t('home.packages.selectedLabel')}
        packages={pricingPackages}
        disclaimer={t('home.packages.disclaimer')}
      />

      <FAQSection
        title={t('home.faq.title')}
        subtitle={t('home.faq.subtitle')}
        description={t('home.faq.description')}
        cta={t('home.faq.cta')}
        items={faqItems}
      />
    </>
  );
}
