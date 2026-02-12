"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
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
  sectionClassName?: string;
  locale?: string;
}

const tabImages = [
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80',
];

export default function SolutionTabsVerticalTimeline({
  title,
  tabs,
  sectionClassName = 'section-padding bg-neutral-50',
  locale = 'en',
}: SolutionTabsProps) {
  const [active, setActive] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const current = tabs[active] ?? tabs[0];
  const copy = locale === 'es'
    ? {
        viewFullDetails: 'Ver detalles completos',
        viewDetails: 'Ver detalles',
        swipeHint: 'Deslizá para explorar más soluciones',
      }
    : {
        viewFullDetails: 'View full details',
        viewDetails: 'View details',
        swipeHint: 'Swipe to explore more solutions',
      };

  // Handle swipe gestures for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && active < tabs.length - 1) {
      setActive(active + 1);
    }
    if (isRightSwipe && active > 0) {
      setActive(active - 1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && active > 0) {
        setActive(active - 1);
      }
      if (e.key === 'ArrowDown' && active < tabs.length - 1) {
        setActive(active + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [active, tabs.length]);

  return (
    <section className={sectionClassName}>
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-accent mb-12 md:mb-16">
          {title}
        </h2>

        {/* Desktop: Vertical Timeline Layout */}
        <div className="hidden lg:grid lg:grid-cols-[380px_1fr] gap-12 max-w-7xl mx-auto">
          {/* Left: Vertical Navigation with Timeline */}
          <div className="relative">
            {/* Timeline vertical line */}
            <div className="absolute left-[19px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20" />

            <div className="space-y-2">
              {tabs.map((tab, index) => (
                <button
                  key={tab.slug}
                  onClick={() => setActive(index)}
                  className={`relative w-full text-left group transition-all duration-300 cursor-pointer ${
                    index === active ? 'scale-100' : 'scale-95'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-6 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    index === active
                      ? 'bg-primary border-primary shadow-lg shadow-primary/30'
                      : 'bg-white border-neutral-300 group-hover:border-primary/50'
                  }`}>
                    <span className={`text-xs font-bold transition-colors ${
                      index === active ? 'text-white' : 'text-neutral-500 group-hover:text-primary'
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Content */}
                  <div className={`ml-16 py-4 px-5 rounded-xl transition-all duration-300 ${
                    index === active
                      ? 'bg-white shadow-md'
                      : 'bg-transparent hover:bg-white/50'
                  }`}>
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className={`text-sm font-semibold mb-1 transition-colors ${
                          index === active ? 'text-primary' : 'text-neutral-600 group-hover:text-primary'
                        }`}>
                          {tab.label}
                        </div>
                        <div className={`text-xs transition-colors ${
                          index === active ? 'text-neutral-700' : 'text-neutral-500'
                        }`}>
                          {tab.title}
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-all ${
                        index === active
                          ? 'text-primary translate-x-0 opacity-100'
                          : 'text-neutral-400 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                      }`} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Large Content Area */}
          <div className="relative">
            <div
              key={current?.slug}
              className="animate-in fade-in slide-in-from-right-4 duration-500"
            >
              {/* Image */}
              <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8 group">
                <Image
                  src={tabImages[active % tabImages.length]}
                  alt={current?.title ?? 'Solution'}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={defaultBlurDataURL}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority={active === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />

                {/* Floating number badge */}
                <div className="absolute top-6 left-6 w-16 h-16 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-xl">
                  <span className="text-2xl font-bold text-primary">
                    {String(active + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-4">
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  {current?.label}
                </div>

                <h3 className="font-display text-3xl md:text-4xl font-bold text-accent">
                  {current?.title}
                </h3>

                <p className="text-lg text-neutral-700 leading-relaxed">
                  {current?.description}
                </p>

                <Link
                  href={`/solutions/${current?.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                >
                  {copy.viewFullDetails}
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Swipeable Cards */}
        <div
          className="lg:hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative overflow-hidden">
            <div
              key={current?.slug}
              className="animate-in fade-in slide-in-from-right-4 duration-300"
            >
              {/* Image */}
              <div className="relative h-[280px] rounded-2xl overflow-hidden mb-6">
                <Image
                  src={tabImages[active % tabImages.length]}
                  alt={current?.title ?? 'Solution'}
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={defaultBlurDataURL}
                  sizes="100vw"
                  priority={active === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-transparent to-transparent" />

                {/* Number badge */}
                <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <span className="text-lg font-bold text-primary">
                    {String(active + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Label badge */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-primary text-xs font-semibold">
                  {current?.label}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 px-1">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-accent">
                  {current?.title}
                </h3>

                <p className="text-base text-neutral-700 leading-relaxed">
                  {current?.description}
                </p>

                <Link
                  href={`/solutions/${current?.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                >
                  {copy.viewDetails}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {tabs.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`transition-all duration-300 cursor-pointer ${
                  index === active
                    ? 'w-8 h-2 bg-primary rounded-full'
                    : 'w-2 h-2 bg-neutral-300 rounded-full hover:bg-primary/50'
                }`}
                aria-label={`Go to solution ${index + 1}`}
              />
            ))}
          </div>

          {/* Swipe hint (only on first load) */}
          <div className="text-center mt-6 text-sm text-neutral-500">
            {copy.swipeHint}
          </div>
        </div>
      </div>
    </section>
  );
}
