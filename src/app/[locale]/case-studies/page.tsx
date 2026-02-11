import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import GradientBlur from '@/components/shared/GradientBlur';
import SectionHeading from '@/components/shared/SectionHeading';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale });

  return generatePageMetadata({
    locale: params.locale,
    title: t('metadata.caseStudies.title'),
    description: t('metadata.caseStudies.description'),
    path: '/case-studies',
  });
}

export default async function CaseStudiesPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale });

  const caseStudies = Array.from({ length: 2 }, (_, i) => ({
    title: t(`caseStudies.items.${i}.title`),
    problem: t(`caseStudies.items.${i}.problem`),
    approach: t(`caseStudies.items.${i}.approach`),
    results: t(`caseStudies.items.${i}.results`),
  }));

  return (
    <>
      <section className="relative py-16 md:py-24 overflow-hidden">
        <GradientBlur />

        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t('caseStudies.title')}
            </h1>
            <p className="text-lg md:text-xl text-neutral-800">
              {t('caseStudies.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto space-y-8">
            {caseStudies.map((caseStudy, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-2xl mb-4">{caseStudy.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Problem
                    </h3>
                    <p className="text-neutral-800">{caseStudy.problem}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Approach
                    </h3>
                    <p className="text-neutral-800">{caseStudy.approach}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Results
                    </h3>
                    <p className="text-neutral-800">{caseStudy.results}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
