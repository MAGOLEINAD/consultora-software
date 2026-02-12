import { Link } from '@/i18n/routing';
import { Card, CardContent } from '@/components/ui/card';
import { Database, Workflow, Brain, TrendingUp, ShoppingCart, Headphones, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import Image from 'next/image';
import { defaultBlurDataURL } from '@/lib/image';

const serviceIcons = {
  'data-platforms-bi': Database,
  'process-automation': Workflow,
  'applied-ai': Brain,
  'ml-forecasting': TrendingUp,
  'software-selection': ShoppingCart,
  'managed-services': Headphones,
};

const serviceMedia: Record<string, { image: string; accent: string }> = {
  'data-platforms-bi': {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    accent: 'from-orange-500/30 to-transparent',
  },
  'process-automation': {
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    accent: 'from-slate-900/40 to-transparent',
  },
  'applied-ai': {
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
    accent: 'from-orange-500/30 to-transparent',
  },
  'ml-forecasting': {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    accent: 'from-slate-900/40 to-transparent',
  },
  'software-selection': {
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80',
    accent: 'from-orange-500/30 to-transparent',
  },
  'managed-services': {
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
    accent: 'from-slate-900/40 to-transparent',
  },
};

interface Service {
  name: string;
  shortDescription: string;
  slug: string;
}

interface ServicesGridProps {
  locale: string;
  title: string;
  subtitle: string;
  services: Service[];
}

export default function ServicesGrid({ title, subtitle, services }: ServicesGridProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = serviceIcons[service.slug as keyof typeof serviceIcons] || Database;
            const media = serviceMedia[service.slug] || serviceMedia['data-platforms-bi'];

            return (
              <Link key={service.slug} href={`/services/${service.slug}`}>
                <Card className="h-full overflow-hidden border-border hover:shadow-xl transition-all group hover-lift">
                  <div className="relative h-52">
                    <Image
                      src={media.image}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      placeholder="blur"
                      blurDataURL={defaultBlurDataURL}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className={`absolute inset-0 bg-linear-to-tr ${media.accent}`}></div>
                    <div className="absolute bottom-4 left-4 h-12 w-12 rounded-2xl bg-white/90 backdrop-blur border border-white/60 flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="font-display text-xl font-semibold text-accent mb-3">
                      {service.name}
                    </h3>
                    <p className="text-sm text-neutral-800 mb-6">
                      {service.shortDescription}
                    </p>
                    <div className="flex items-center text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

