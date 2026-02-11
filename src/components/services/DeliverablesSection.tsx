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
        <div className="max-w-4xl mx-auto">
          <SectionHeading title={title} centered={false} />

          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex gap-4 items-start">
                <Package className="w-5 h-5 text-[hsl(var(--primary))] shrink-0 mt-1" />
                <p className="text-[hsl(var(--neutral-800))]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
