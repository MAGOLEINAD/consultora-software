"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { defaultBlurDataURL } from '@/lib/image';
import { Link } from '@/i18n/routing';

interface SolutionTab {
  slug: string;
  label: string;
  title: string;
  description: string;
}

interface SolutionTabsProps {
  title: string;
  tabs: SolutionTab[];
}

const tabImages = [
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
];

export default function SolutionTabs({ title, tabs }: SolutionTabsProps) {
  const [active, setActive] = useState(0);
  const current = tabs[active] ?? tabs[0];

  return (
    <section className="section-padding bg-[hsl(var(--neutral-50))]">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-[hsl(var(--accent))] mb-12">
          {title}
        </h2>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-[hsl(var(--border))] shadow-sm">
          <div className="p-5 md:p-6 border-b border-[hsl(var(--border))]">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab, index) => (
                <button
                  key={tab.label}
                  onClick={() => setActive(index)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    index === active
                      ? 'bg-[hsl(var(--primary))] text-white shadow'
                      : 'bg-[hsl(var(--neutral-50))] text-[hsl(var(--accent))] hover:bg-[hsl(var(--neutral-100))]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div key={current?.label} className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-5 items-center fade-swap p-5 md:p-6">
            <div>
              <h3 className="font-display text-2xl font-semibold text-[hsl(var(--accent))] mb-2">
                {current?.title}
              </h3>
              <p className="text-sm text-[hsl(var(--neutral-800))] mb-3 leading-relaxed">
                {current?.description}
              </p>
              <Link
                href={`/solutions/${current?.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--primary))]"
              >
                View details
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative h-[200px] md:h-[230px] rounded-xl overflow-hidden">
              <Image
                src={tabImages[active % tabImages.length]}
                alt={current?.label ?? 'Solution'}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={defaultBlurDataURL}
                sizes="(max-width: 1200px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
