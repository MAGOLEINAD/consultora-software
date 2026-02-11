import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';
import { defaultBlurDataURL } from '@/lib/image';

interface HeroProps {
  locale: string;
  title: string;
  subtitle: string;
  cta1: string;
  badge: string;
  metricTitle: string;
  metricSubtitle: string;
  awardLine: string;
}

export default function Hero({ title, subtitle, cta1, badge, metricTitle, metricSubtitle, awardLine }: HeroProps) {
  return (
    <section className="relative overflow-hidden fexo-hero-dark text-white">
      <div className="absolute inset-0 fexo-circuit opacity-40"></div>
      <div className="absolute -top-28 -right-28 h-80 w-80 rounded-full bg-[hsl(var(--primary))] opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <div className="flex items-center gap-4 text-sm uppercase tracking-[0.4em] text-white/70 mb-6">
              <span className="h-px w-14 bg-white/40"></span>
              <span>{badge}</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold mb-6 leading-[0.95] tracking-tight">
              {title}
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button asChild size="lg" className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white group border-none shadow-lg shadow-[hsl(var(--primary))]/25 hover:-translate-y-0.5 transition-transform">
                <Link href="/services">
                  {cta1}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <div className="flex -space-x-3">
                {[
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80',
                  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
                  'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=120&q=80',
                ].map((src, idx) => (
                  <div key={idx} className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-[hsl(var(--accent))]">
                    <Image
                      src={src}
                      alt="Team member"
                      fill
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={defaultBlurDataURL}
                      sizes="40px"
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{metricTitle}</p>
                <p className="text-sm text-white/60">{metricSubtitle}</p>
              </div>
              <div className="text-sm text-white/60">
                {awardLine}
              </div>
            </div>
          </div>

          <div className="relative h-[420px] lg:h-[560px]">
            <div className="absolute inset-0 rounded-[36px] overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80"
                alt="Software engineer at work"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={defaultBlurDataURL}
                priority
              />
            </div>

            <div className="absolute -left-10 top-1/2 -translate-y-1/2 h-20 w-20 rounded-full bg-white/10 border border-white/30 flex items-center justify-center backdrop-blur">
              <div className="h-12 w-12 rounded-full bg-white/90 text-[hsl(var(--accent))] flex items-center justify-center">
                <Play className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
