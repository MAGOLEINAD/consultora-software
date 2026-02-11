import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import ServicesGrid from '@/components/home/ServicesGrid';
import GradientBlur from '@/components/shared/GradientBlur';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale });

  return generatePageMetadata({
    locale: params.locale,
    title: t('metadata.services.title'),
    description: t('metadata.services.description'),
    path: '/services',
  });
}

export default async function ServicesPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale });

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

  return (
    <>
      <section className="relative py-16 md:py-24 overflow-hidden">
        <GradientBlur />
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t('services.title')}
            </h1>
            <p className="text-lg md:text-xl text-neutral-800">
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <ServicesGrid
        locale={params.locale}
        title=""
        subtitle=""
        services={services}
      />
    </>
  );
}
