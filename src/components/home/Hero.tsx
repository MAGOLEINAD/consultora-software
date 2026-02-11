import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';

interface HeroProps {
  locale: string;
  title: string;
  subtitle: string;
  cta1: string;
  cta2: string;
  badge: string;
}

export default function Hero({ locale, title, subtitle, cta1, cta2, badge }: HeroProps) {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-[hsl(var(--accent))] via-[hsl(var(--accent-light))] to-[hsl(var(--accent))]">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[hsl(var(--primary))] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[hsl(var(--accent-secondary))] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[hsl(var(--primary))] px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-medium uppercase tracking-wide">{badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              {subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white group border-none">
                <Link href="/contact">
                  {cta1}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[hsl(var(--accent))] group">
                <Link href="/#pricing">
                  <Play className="mr-2 h-5 w-5" />
                  {cta2}
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[400px] lg:h-[600px]">
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop"
                alt="IT Solutions Team"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--accent))]/60 to-transparent"></div>
            </div>

            {/* Floating card */}
            <div className="absolute bottom-8 left-8 bg-white p-6 rounded-xl shadow-2xl max-w-xs">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[hsl(var(--primary))] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-[hsl(var(--foreground))] mb-1">24/7 Support</h3>
                  <p className="text-sm text-[hsl(var(--neutral-600))]">Expert assistance anytime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
