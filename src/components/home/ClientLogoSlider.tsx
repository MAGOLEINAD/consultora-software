'use client';

import { useEffect, useRef } from 'react';

interface ClientLogoSliderProps {
  title: string;
}

export default function ClientLogoSlider({ title }: ClientLogoSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Technologies used
  const technologies = [
    { name: 'React', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
    { name: 'Power BI', logo: 'https://www.vectorlogo.zone/logos/microsoft_powerbi/microsoft_powerbi-icon.svg' },
    { name: 'Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
    { name: 'Oracle', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg' },
    { name: 'SQL Server', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg' },
    { name: 'NestJS', logo: 'https://cdn.simpleicons.org/nestjs/E0234E' },
    { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/3178C6' },
    { name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs/339933' },
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
    <section className="py-12 md:py-16 bg-neutral-50 border-y border-border">
      <div className="container mx-auto px-4 md:px-8">
        <p className="text-center text-sm text-neutral-800 mb-8 uppercase tracking-[0.25em]">
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
                className="shrink-0 flex items-center justify-center px-4"
              >
                <div className="group flex items-center justify-center gap-3 rounded-2xl border border-neutral-200 bg-white px-5 py-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <img
                    src={technology.logo}
                    alt={`${technology.name} logo`}
                    className="h-6 w-6 object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="text-base font-semibold text-neutral-700 group-hover:text-accent transition-colors whitespace-nowrap">
                    {technology.name}
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

