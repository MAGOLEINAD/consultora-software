import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import GradientBlur from '@/components/shared/GradientBlur';
import { Zap, Shield, Users, FileText } from 'lucide-react';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale });

  return generatePageMetadata({
    locale: params.locale,
    title: t('metadata.about.title'),
    description: t('metadata.about.description'),
    path: '/about',
  });
}

const icons = [Zap, Shield, Users, FileText];

export default async function AboutPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale });

  const values = Array.from({ length: 4 }, (_, i) => ({
    title: t(`about.values.items.${i}.title`),
    description: t(`about.values.items.${i}.description`),
  }));

  return (
    <>
      <section className="relative py-16 md:py-24 overflow-hidden">
        <GradientBlur variant="accent" />

        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(var(--foreground))] mb-6">
              {t('about.title')}
            </h1>
            <p className="text-lg md:text-xl text-[hsl(var(--neutral-800))] mb-6">
              {t('about.subtitle')}
            </p>
            <p className="text-[hsl(var(--neutral-800))] leading-relaxed">
              {t('about.description')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[hsl(var(--neutral-50))]">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] text-center mb-12">
            {t('about.values.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const Icon = icons[index];
              return (
                <Card key={index}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl mb-2">{value.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {value.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
