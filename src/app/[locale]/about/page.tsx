import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import GradientBlur from '@/components/shared/GradientBlur';
import TeamSection from '@/components/home/TeamSection';
import Image from 'next/image';
import { defaultBlurDataURL } from '@/lib/image';

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

export default async function AboutPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale });
  const teamMembers = [
    {
      name: 'Mario Ruiz',
      role: 'Software Architect',
      image: '/images/staff/staff1.jpg',
    },
    {
      name: 'Sergio Adan',
      role: 'Principal Frontend Engineer',
      image: '/images/staff/staff2.jpg',
    },
    {
      name: 'Guillermo Martin',
      role: 'Product Manager',
      image: '/images/staff/staff3.jpg',
    },
    {
      name: 'Maximiliano Sigmund',
      role: 'Oracle Certified APEX Cloud Developer',
      image: '/images/staff/staff4.jpg',
    },
    {
      name: 'Mauro Leuzzi',
      role: 'Head of Data & Analytics',
      image: '/images/staff/staff5.jpg',
    },
    {
      name: 'Juan Martin Kecskemeti',
      role: 'Digital Payments Technology Manager',
      image: '/images/staff/staff6.jpg',
    },
    {
      name: 'Ariel Adan',
      role: 'Oracle APEX Senior Developer',
      image: '/images/staff/staff7.jpg',
    },
    {
      name: 'Christian Oscar',
      role: 'Full Stack',
      image: '/images/staff/staff8.jpg',
    },
  ];

  const highlights = Array.from({ length: 6 }, (_, i) => ({
    title: t(`about.highlights.items.${i}.title`),
    description: t(`about.highlights.items.${i}.description`),
  }));

  return (
    <>
      <section className="relative py-16 md:py-24 overflow-hidden">
        <GradientBlur variant="accent" />

        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
            <div className="relative">
              <div className="relative h-[420px] rounded-[36px] overflow-hidden border border-border shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80"
                  alt="Team collaborating"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={defaultBlurDataURL}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
              <div className="absolute -bottom-8 -right-6 h-44 w-44 rounded-3xl overflow-hidden border border-border shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=600&q=80"
                  alt="Team meeting"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={defaultBlurDataURL}
                  sizes="180px"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-primary mb-4">
                <span className="h-px w-10 bg-primary"></span>
                <span>{t('about.heroEyebrow')}</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-accent mb-6 leading-[1.1]">
                {t('about.heroTitle')}
              </h1>
              <p className="text-neutral-800 leading-relaxed mb-8">
                {t('about.intro')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {highlights.map((item) => (
                  <div key={item.title} className="border border-border rounded-2xl p-5 bg-white">
                    <h2 className="font-semibold text-accent mb-2">{item.title}</h2>
                    <p className="text-sm text-neutral-800 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TeamSection
        title={t('about.team.title')}
        subtitle={t('about.team.subtitle')}
        members={teamMembers}
      />
    </>
  );
}
