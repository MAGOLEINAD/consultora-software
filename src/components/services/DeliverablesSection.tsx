import { Package } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';

interface DeliverablesSectionProps {
  title: string;
  items: string[];
}

export default function DeliverablesSection({ title, items }: DeliverablesSectionProps) {
  return (
    <section className="section-padding bg-[hsl(var(--neutral-50))]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title={title} centered={false} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[hsl(var(--border))] bg-white p-6 hover-lift"
              >
                <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 rounded-xl bg-[hsl(var(--accent))] text-white flex items-center justify-center">
                    <Package className="w-5 h-5" />
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
