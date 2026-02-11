import GradientBlur from '@/components/shared/GradientBlur';
import { LucideIcon } from 'lucide-react';

interface ServiceHeroProps {
  icon: LucideIcon;
  name: string;
  shortDescription: string;
}

export default function ServiceHero({ icon: Icon, name, shortDescription }: ServiceHeroProps) {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <GradientBlur variant="accent" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] items-center justify-center mb-6">
            <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(var(--foreground))] mb-4">
            {name}
          </h1>

          <p className="text-lg md:text-xl text-[hsl(var(--neutral-800))]">
            {shortDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
