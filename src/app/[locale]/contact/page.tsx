import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import GradientBlur from '@/components/shared/GradientBlur';
import Link from 'next/link';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale });

  return generatePageMetadata({
    locale: params.locale,
    title: t('metadata.contact.title'),
    description: t('metadata.contact.description'),
    path: '/contact',
  });
}

export default async function ContactPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale });

  const formTranslations = {
    name: t('contact.form.name'),
    email: t('contact.form.email'),
    company: t('contact.form.company'),
    message: t('contact.form.message'),
    submit: t('contact.form.submit'),
    success: t('contact.form.success'),
    error: t('contact.form.error'),
  };

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/';

  return (
    <>
      <section className="relative py-16 md:py-24 overflow-hidden">
        <GradientBlur variant="accent" />

        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(var(--foreground))] mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-lg md:text-xl text-[hsl(var(--neutral-800))]">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto">
            <ContactForm translations={formTranslations} />

            <div className="mt-8 text-center">
              <p className="text-[hsl(var(--neutral-800))] mb-4">
                {t('contact.or')}
              </p>

              <Button asChild variant="outline" size="lg">
                <Link href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-5 w-5" />
                  {t('contact.schedule')}
                </Link>
              </Button>

              <p className="text-sm text-[hsl(var(--neutral-800))] mt-8">
                {t('contact.responseTime')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
