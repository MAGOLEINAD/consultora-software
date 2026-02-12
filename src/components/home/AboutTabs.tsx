'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Check, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { defaultBlurDataURL } from '@/lib/image';

interface AboutTab {
  label: string;
  title: string;
  description: string;
}

interface AboutTabsProps {
  title: string;
  subtitle: string;
  tabs: AboutTab[];
  points: string[];
  cta: string;
  helpLine: string;
  locale?: string;
}

export default function AboutTabs({ title, subtitle, tabs, points, cta, helpLine, locale = 'en' }: AboutTabsProps) {
  const [active, setActive] = useState(0);
  const current = tabs[active] ?? tabs[0];

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
          <div className="relative">
            <div className="relative h-105 rounded-[36px] overflow-hidden border border-border shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80"
                alt="Team delivering IT solutions"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={defaultBlurDataURL}
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl border border-border shadow-lg p-4 w-44">
              <p className="text-xs text-neutral-700">{locale === 'es' ? 'Crecimiento de ingresos' : 'Revenue growth'}</p>
              <p className="text-xl font-semibold text-accent">$120,544</p>
              <div className="mt-2 h-12 w-full rounded-lg bg-neutral-100"></div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-primary mb-4">
              <span className="h-px w-10 bg-primary"></span>
              <span>{subtitle}</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-accent mb-6 leading-tight">
              {title}
            </h2>

            <div className="flex flex-wrap gap-3 mb-6">
              {tabs.map((tab, index) => (
                <button
                  key={tab.label}
                  onClick={() => setActive(index)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    index === active
                      ? 'bg-primary text-white shadow'
                      : 'bg-neutral-100 text-accent hover:bg-neutral-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="font-display text-2xl font-semibold text-accent mb-3">
                {current?.title}
              </h3>
              <p className="text-neutral-800 leading-relaxed">
                {current?.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {points.map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm text-accent font-semibold">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <Button asChild className="bg-primary hover:bg-primary-dark text-white hover:-translate-y-0.5 transition-transform">
                <Link href="/contact">{cta}</Link>
              </Button>
              <div className="flex items-center gap-3 text-accent">
                <div className="h-12 w-12 rounded-full border border-border flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div className="text-sm">
                  <p className="text-neutral-700">{helpLine}</p>
                  <p className="font-semibold">(+480) 123 678 900</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

