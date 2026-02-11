import { CheckCircle } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

interface OutcomesSectionProps {
  locale: string;
  title: string;
  items: string[];
  ctaText?: string;
}

export default function OutcomesSection({ locale, title, items, ctaText = 'Get Started' }: OutcomesSectionProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title={title} centered={false} />

          <div className="space-y-4 mb-8">
            {items.map((item, index) => (
              <div key={index} className="flex gap-4 items-start">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-1" />
                <p className="text-[hsl(var(--neutral-800))]">{item}</p>
              </div>
            ))}
          </div>

          <div className="pt-8">
            <Button asChild size="lg">
              <Link href="/contact">{ctaText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
