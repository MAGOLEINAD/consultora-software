import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import Hero from '@/components/home/Hero';
import ClientLogoSlider from '@/components/home/ClientLogoSlider';
import AboutTabs from '@/components/home/AboutTabs';
import ServicesGrid from '@/components/home/ServicesGrid';
import PricingCards from '@/components/home/PricingCards';
import SolutionTabs from '@/components/home/SolutionTabs';
import Testimonials from '@/components/home/Testimonials';
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

  const testimonials = Array.from({ length: 3 }, (_, i) => ({
    quote: t(`home.testimonials.items.${i}.quote`),
    author: t(`home.testimonials.items.${i}.author`),
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

      <SolutionTabs
        title={t('home.solutionTabs.title')}
        tabs={[
          {
            slug: 'fpa-automation',
            label: t('home.solutionTabs.tabs.0.label'),
            title: t('home.solutionTabs.tabs.0.title'),
            description: t('home.solutionTabs.tabs.0.description'),
          },
          {
            slug: 'forecasting-tools',
            label: t('home.solutionTabs.tabs.1.label'),
            title: t('home.solutionTabs.tabs.1.title'),
            description: t('home.solutionTabs.tabs.1.description'),
          },
          {
            slug: 'pricing-analytics',
            label: t('home.solutionTabs.tabs.2.label'),
            title: t('home.solutionTabs.tabs.2.title'),
            description: t('home.solutionTabs.tabs.2.description'),
          },
          {
            slug: 'profitability-models',
            label: t('home.solutionTabs.tabs.3.label'),
            title: t('home.solutionTabs.tabs.3.title'),
            description: t('home.solutionTabs.tabs.3.description'),
          },
          {
            slug: 'spend-cubes',
            label: t('home.solutionTabs.tabs.4.label'),
            title: t('home.solutionTabs.tabs.4.title'),
            description: t('home.solutionTabs.tabs.4.description'),
          },
          {
            slug: 'customer-analytics',
            label: t('home.solutionTabs.tabs.5.label'),
            title: t('home.solutionTabs.tabs.5.title'),
            description: t('home.solutionTabs.tabs.5.description'),
          },
        ]}
      />

      <PricingCards
        title={t('home.packages.title')}
        intro={t('home.packages.intro')}
        packages={pricingPackages}
        comparison={Array.from({ length: 4 }, (_, i) => ({
          package: t(`home.packages.comparison.${i}.package`),
          bestFor: t(`home.packages.comparison.${i}.bestFor`),
          duration: t(`home.packages.comparison.${i}.duration`),
          outcomes: t(`home.packages.comparison.${i}.outcomes`),
          pricing: t(`home.packages.comparison.${i}.pricing`),
        }))}
        whoFor={Array.from({ length: 4 }, (_, i) => t(`home.packages.whoFor.${i}`))}
        notFit={Array.from({ length: 4 }, (_, i) => t(`home.packages.notFit.${i}`))}
        disclaimer={t('home.packages.disclaimer')}
      />

      <Testimonials
        title={t('home.testimonials.title')}
        items={testimonials}
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
