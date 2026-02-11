import Image from 'next/image';
import { LucideIcon } from 'lucide-react';
import { defaultBlurDataURL } from '@/lib/image';

interface ServiceHeroProps {
  icon: LucideIcon;
  name: string;
  shortDescription: string;
  imageSrc?: string;
}

export default function ServiceHero({ icon: Icon, name, shortDescription, imageSrc }: ServiceHeroProps) {
  const heroImage =
    imageSrc ||
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80';

  return (
    <section className="relative overflow-hidden bg-accent text-white">
      <div className="absolute inset-0 fexo-circuit opacity-35"></div>
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-3 mb-6 text-sm uppercase tracking-[0.35em] text-white/70">
              <span className="h-px w-10 bg-white/40"></span>
              <span>Service detail</span>
            </div>
            <div className="inline-flex h-16 w-16 rounded-2xl bg-white/10 border border-white/20 items-center justify-center mb-6">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
              {name}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-xl">
              {shortDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {['Strategy', 'Delivery', 'Optimization'].map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest bg-white/10 border border-white/20"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative h-[320px] md:h-[420px] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src={heroImage}
              alt={name}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL={defaultBlurDataURL}
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-primary/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

