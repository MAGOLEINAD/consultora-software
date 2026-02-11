'use client';

import { useEffect, useRef } from 'react';

interface ClientLogoSliderProps {
  title: string;
}

export default function ClientLogoSlider({ title }: ClientLogoSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Placeholder company names (these would be replaced with actual logos)
  const companies = [
    'TechCorp',
    'DataSolutions',
    'CloudScale',
    'AutomateNow',
    'SmartBI',
    'FutureAI',
    'ProcessFlow',
    'InsightData',
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scroll = () => {
      scrollPosition += 0.5;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
    };

    const intervalId = setInterval(scroll, 20);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-12 md:py-16 bg-white border-y border-[hsl(var(--border))]">
      <div className="container mx-auto px-4 md:px-8">
        <p className="text-center text-sm text-[hsl(var(--neutral-800))] mb-8">
          {title}
        </p>

        <div
          ref={scrollRef}
          className="overflow-hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-12 md:gap-16">
            {[...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center px-4"
              >
                <span className="text-2xl font-bold text-[hsl(var(--neutral-300))] hover:text-[hsl(var(--neutral-800))] transition-colors whitespace-nowrap">
                  {company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
