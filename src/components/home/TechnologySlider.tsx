'use client';

import { useEffect, useRef } from 'react';

interface TechnologySliderProps {
  title: string;
}

export default function TechnologySlider({ title }: TechnologySliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Technologies used
  const technologies = [
    { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
    {
      name: 'Power BI',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg',
      fallbackIcon: 'https://cdn.simpleicons.org/powerbi/F2C811',
    },
    {
      name: 'Azure',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg',
      fallbackIcon: 'https://cdn.simpleicons.org/microsoftazure/0078D4',
    },
    {
      name: 'Oracle',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
      fallbackIcon: 'https://cdn.simpleicons.org/oracle/F80000',
      iconClassName: 'h-12 w-24',
      hideLabel: true,
    },
    {
      name: 'SQL Server',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
      fallbackIcon: 'https://cdn.simpleicons.org/microsoftsqlserver/CC2927',
    },
    { name: 'NestJS', icon: 'https://cdn.simpleicons.org/nestjs/E0234E' },
    { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
    { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
    { name: 'Google Cloud', icon: 'https://cdn.simpleicons.org/googlecloud/4285F4' },
    {
      name: 'AWS',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      fallbackIcon: 'https://cdn.simpleicons.org/amazonwebservices/FF9900',
      iconClassName: 'h-10 w-10',
      hideLabel: true,
    },
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
    <section className="py-12 md:py-12 bg-neutral-50 border-y border-border">
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
                <div className="flex items-center gap-2.5 opacity-90 transition-opacity duration-200 hover:opacity-100">
                  <img
                    src={technology.icon}
                    alt={`${technology.name} logo`}
                    className={`${technology.iconClassName ?? 'h-8 w-8'} object-contain`}
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      const target = event.currentTarget;
                      const fallbackIcon = technology.fallbackIcon;
                      if (!fallbackIcon || target.dataset.fallbackApplied === 'true') {
                        target.style.display = 'none';
                        return;
                      }
                      target.dataset.fallbackApplied = 'true';
                      target.src = fallbackIcon;
                    }}
                  />
                  {!technology.hideLabel && (
                    <span className="text-lg font-medium text-neutral-800 whitespace-nowrap">
                      {technology.name}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
