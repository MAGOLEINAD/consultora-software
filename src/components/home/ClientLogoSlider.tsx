'use client';

import { useEffect, useRef } from 'react';

interface ClientLogoSliderProps {
  title: string;
}

export default function ClientLogoSlider({ title }: ClientLogoSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Technologies used
  const technologies = [
    'React',
    'Power BI',
    'Azure',
    'Oracle',
    'SQL Server',
    'NestJS',
    'TypeScript',
    'Node.js',
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
    <section className="py-12 md:py-16 bg-[hsl(var(--neutral-50))] border-y border-[hsl(var(--border))]">
      <div className="container mx-auto px-4 md:px-8">
        <p className="text-center text-sm text-[hsl(var(--neutral-800))] mb-8 uppercase tracking-[0.25em]">
          {title}
        </p>

        <div
          ref={scrollRef}
          className="overflow-hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-10 md:gap-14">
            {[...technologies, ...technologies].map((technology, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center px-4"
              >
                <div className="flex items-center justify-center rounded-full border border-[hsl(var(--border))] bg-white px-8 py-4 shadow-sm">
                  <span className="text-xl font-semibold text-[hsl(var(--neutral-600))] hover:text-[hsl(var(--accent))] transition-colors whitespace-nowrap">
                    {technology}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
