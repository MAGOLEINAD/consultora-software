import Image from 'next/image';
import { defaultBlurDataURL } from '@/lib/image';

interface HeroProps {
  locale: string;
  title: string;
  subtitle: string;
  badge: string;
}

export default function Hero({ locale, title, subtitle, badge }: HeroProps) {
  const proofPoints = locale === 'es'
    ? ['Data Platforms', 'Automatizacion', 'IA Aplicada']
    : ['Data Platforms', 'Automation', 'Applied AI'];

  return (
    <section className="relative overflow-hidden fexo-hero-dark text-white">
      <Image
        src="/images/hero/it.avif"
        alt="Technology background"
        fill
        className="object-cover object-right opacity-30"
        placeholder="blur"
        blurDataURL={defaultBlurDataURL}
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#08122b]/90 via-[#08122b]/80 to-black/85"></div>
      <div className="absolute inset-0 fexo-circuit opacity-40"></div>
      <div className="absolute -top-28 -right-28 h-80 w-80 rounded-full bg-primary opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 py-16 md:py-24 lg:py-28">
        <div className="max-w-5xl">
          <div className="flex items-center gap-4 text-sm uppercase tracking-[0.35em] text-white/70 mb-7">
            <span className="h-px w-14 bg-white/40"></span>
            <span>{badge}</span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold mb-7 leading-[0.92] tracking-tight max-w-4xl">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl">
            {subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 md:gap-6">
            {proofPoints.map((item, index) => (
              <div key={item} className="inline-flex items-center gap-4">
                <span className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-sm md:text-base font-semibold text-white/90">
                  {item}
                </span>
                {index < proofPoints.length - 1 && (
                  <span className="hidden md:inline-block h-px w-8 bg-white/20"></span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
