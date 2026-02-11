import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { generateOrganizationSchema } from '@/lib/schemas';
import HtmlLangSetter from '@/components/shared/HtmlLangSetter';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const { locale } = params;
  const { children } = props;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const schema = generateOrganizationSchema(locale);

  const headerTranslations = {
    home: messages.navigation.home as string,
    services: messages.navigation.services as string,
    solutions: messages.navigation.solutions as string,
    about: messages.navigation.about as string,
    contact: messages.navigation.contact as string,
  };

  const footerTranslations = {
    tagline: messages.footer.tagline as string,
    services: messages.footer.services as string,
    company: messages.footer.company as string,
    quickLinks: messages.footer.quickLinks as string,
    getInTouch: messages.footer.getInTouch as string,
    address: messages.footer.address as string,
    email: messages.footer.email as string,
    phone: messages.footer.phone as string,
    copyright: messages.footer.copyright as string,
  };

  const footerNavItems = {
    services: [
      { href: '/services/data-platforms-bi', label: messages.services.dataPlatformsBi.name as string },
      { href: '/services/process-automation', label: messages.services.processAutomation.name as string },
      { href: '/services/applied-ai', label: messages.services.appliedAi.name as string },
      { href: '/services/ml-forecasting', label: messages.services.mlForecasting.name as string },
      { href: '/services/software-selection', label: messages.services.softwareSelection.name as string },
      { href: '/services/managed-services', label: messages.services.managedServices.name as string },
    ],
    company: [
      { href: '/solutions', label: messages.navigation.solutions as string },
      { href: '/about', label: messages.navigation.about as string },
      { href: '/contact', label: messages.navigation.contact as string },
    ],
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <HtmlLangSetter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="flex min-h-screen flex-col">
        <Header
          locale={locale}
          translations={headerTranslations}
          services={footerNavItems.services}
          solutions={[
            { href: '/solutions/fpa-automation', label: messages.solutions.items['fpa-automation'].name as string },
            { href: '/solutions/forecasting-tools', label: messages.solutions.items['forecasting-tools'].name as string },
            { href: '/solutions/pricing-analytics', label: messages.solutions.items['pricing-analytics'].name as string },
            { href: '/solutions/profitability-models', label: messages.solutions.items['profitability-models'].name as string },
            { href: '/solutions/spend-cubes', label: messages.solutions.items['spend-cubes'].name as string },
            { href: '/solutions/customer-analytics', label: messages.solutions.items['customer-analytics'].name as string },
          ]}
        />
        <main className="flex-1">{children}</main>
        <Footer
          locale={locale}
          translations={footerTranslations}
          navItems={footerNavItems}
        />
      </div>
    </NextIntlClientProvider>
  );
}
