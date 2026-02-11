import Image from 'next/image';
import { defaultBlurDataURL } from '@/lib/image';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface TeamSectionProps {
  title: string;
  subtitle: string;
  members: TeamMember[];
}

export default function TeamSection({ title, subtitle, members }: TeamSectionProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 text-sm uppercase tracking-[0.35em] text-[hsl(var(--primary))] mb-4">
            <span className="h-px w-10 bg-[hsl(var(--primary))]"></span>
            <span>{subtitle}</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-[hsl(var(--accent))]">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <div
              key={member.name}
              className="rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--neutral-50))] p-5 hover-lift"
            >
              <div className="relative h-48 rounded-2xl overflow-hidden bg-white">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={defaultBlurDataURL}
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="pt-5">
                <p className="text-lg font-semibold text-[hsl(var(--accent))]">{member.name}</p>
                <p className="text-sm text-[hsl(var(--neutral-600))]">{member.role}</p>
                <div className="flex gap-2 pt-4">
                  {['f', 'in', 'x', 'ig'].map((label) => (
                    <span
                      key={label}
                      className="h-9 w-9 rounded-full border border-[hsl(var(--border))] text-[hsl(var(--neutral-600))] flex items-center justify-center text-xs font-semibold"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
