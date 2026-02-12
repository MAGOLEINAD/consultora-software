'use client';

import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { defaultBlurDataURL } from '@/lib/image';

interface Testimonial {
  quote: string;
  author: string;
}

interface TestimonialsProps {
  title: string;
  items: Testimonial[];
}

export default function Testimonials({ title, items }: TestimonialsProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const avatars = [
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  ];

  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = sliderRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.8) * (direction === 'left' ? -1 : 1);
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-primary mb-4">
              <span className="h-px w-10 bg-primary"></span>
              <span>OUR CLIENT’S</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-accent">
              {title}
            </h2>
          </div>

          <div className="text-left lg:text-right">
            <div className="text-4xl font-semibold text-accent">4.9</div>
            <div className="flex items-center gap-1 justify-start lg:justify-end text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary" />
              ))}
            </div>
            <p className="text-sm text-neutral-700">Based on 150 reviews</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_2.1fr] gap-8 items-stretch">
          <div className="rounded-3xl bg-accent text-white p-8 shadow-lg">
            <p className="text-lg font-semibold mb-4">Success stories</p>
            <p className="text-5xl font-semibold mb-4">98%</p>
            <p className="text-sm text-white/70 mb-6">Client Retention Rate</p>
            <div className="h-px bg-white/20 my-6"></div>
            <div className="text-sm text-white/70 mb-3">Trustpilot</div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {avatars.map((src, i) => (
                  <div key={i} className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-accent">
                    <Image
                      src={src}
                      alt="Client"
                      fill
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={defaultBlurDataURL}
                      sizes="32px"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-primary" />
                  ))}
                </div>
                <p className="text-xs text-white/70">450+ reviews</p>
              </div>
            </div>
          </div>

          <div className="relative">
       

            <div ref={sliderRef} className="overflow-x-auto">
              <div className="flex gap-6 min-w-225 snap-x snap-mandatory pb-2">
              {items.map((testimonial, index) => (
                <Card key={index} className="bg-white border-border shadow-sm min-w-70 snap-start rounded-3xl overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-1 text-primary mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary" />
                      ))}
                    </div>
                    <p className="text-neutral-800 mb-6">
                      {testimonial.quote}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden border border-border">
                        <Image
                          src={avatars[index % avatars.length]}
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                          placeholder="blur"
                          blurDataURL={defaultBlurDataURL}
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-accent">
                          {testimonial.author}
                        </p>
                        <p className="text-xs text-neutral-600">UI/UX Designer</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
