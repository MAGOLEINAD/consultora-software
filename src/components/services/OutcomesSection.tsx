import { CheckCircle } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

interface OutcomesSectionProps {
  locale: string;
  title: string;
  items: string[];
  ctaText?: string;
  cardTitle: string;
  cardDescription: string;
}

export default function OutcomesSection({ locale, title, items, ctaText = 'Get Started', cardTitle, cardDescription }: OutcomesSectionProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title={title} centered={false} />

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <p className="text-neutral-800">{item}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-border bg-neutral-50 p-8 shadow-lg">
              <h3 className="font-display text-2xl font-semibold text-accent mb-3">
                {cardTitle}
              </h3>
              <p className="text-neutral-800 mb-6">
                {cardDescription}
              </p>
              <Button asChild size="lg" className="hover:-translate-y-0.5 transition-transform">
                <Link href="/contact">{ctaText}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

