import { AlertCircle } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';

interface ChallengesSectionProps {
  title: string;
  items: string[];
}

export default function ChallengesSection({ title, items }: ChallengesSectionProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title={title} centered={false} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--neutral-50))] p-6 hover-lift"
              >
                <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 rounded-xl bg-[hsl(var(--primary))] text-white flex items-center justify-center">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <p className="text-[hsl(var(--neutral-800))]">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
