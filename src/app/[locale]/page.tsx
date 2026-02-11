import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import Hero from '@/components/home/Hero';
import ClientLogoSlider from '@/components/home/ClientLogoSlider';
import ServicesGrid from '@/components/home/ServicesGrid';
import PricingCards from '@/components/home/PricingCards';
import ApproachTimeline from '@/components/home/ApproachTimeline';
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

  const pricingPackages = {
    dataPlatform: {
      name: t('home.pricing.packages.dataPlatform.name'),
      duration: t('home.pricing.packages.dataPlatform.duration'),
      priceFrom: t('home.pricing.packages.dataPlatform.priceFrom'),
      priceUnit: undefined,
      featured: false,
      features: Array.from({ length: 5 }, (_, i) =>
        t(`home.pricing.packages.dataPlatform.features.${i}`)
      ),
      cta: t('home.pricing.packages.dataPlatform.cta'),
    },
    automation: {
      name: t('home.pricing.packages.automation.name'),
      duration: t('home.pricing.packages.automation.duration'),
      priceFrom: t('home.pricing.packages.automation.priceFrom'),
      priceUnit: undefined,
      featured: true,
      badge: t('home.pricing.packages.automation.badge'),
      features: Array.from({ length: 5 }, (_, i) =>
        t(`home.pricing.packages.automation.features.${i}`)
      ),
      cta: t('home.pricing.packages.automation.cta'),
    },
    managed: {
      name: t('home.pricing.packages.managed.name'),
      duration: t('home.pricing.packages.managed.duration'),
      priceFrom: t('home.pricing.packages.managed.priceFrom'),
      priceUnit: t('home.pricing.packages.managed.priceUnit'),
      featured: false,
      features: Array.from({ length: 5 }, (_, i) =>
        t(`home.pricing.packages.managed.features.${i}`)
      ),
      cta: t('home.pricing.packages.managed.cta'),
    },
  };

  const approachSteps = Array.from({ length: 4 }, (_, i) => ({
    title: t(`home.approach.steps.${i}.title`),
    description: t(`home.approach.steps.${i}.description`),
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
        cta2={t('home.hero.cta2')}
      />

      <ClientLogoSlider title={t('home.trustedBy')} />

      <ServicesGrid
        locale={locale}
        title={t('home.services.title')}
        subtitle={t('home.services.subtitle')}
        services={services}
      />

      <PricingCards
        locale={locale}
        title={t('home.pricing.title')}
        subtitle={t('home.pricing.subtitle')}
        packages={pricingPackages}
      />

      <ApproachTimeline
        title={t('home.approach.title')}
        subtitle={t('home.approach.subtitle')}
        steps={approachSteps}
      />

      <Testimonials
        title={t('home.testimonials.title')}
        items={testimonials}
      />

      <FAQSection
        title={t('home.faq.title')}
        items={faqItems}
      />
    </>
  );
}
