import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import SectionHeading from '@/components/shared/SectionHeading';
import Image from 'next/image';
import { defaultBlurDataURL } from '@/lib/image';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  items: FAQItem[];
}

export default function FAQSection({ title, subtitle, description, cta, items }: FAQSectionProps) {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start max-w-6xl mx-auto">
          <div>
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-[hsl(var(--primary))] mb-4">
              <span className="h-px w-10 bg-[hsl(var(--primary))]"></span>
              <span>{subtitle}</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-[hsl(var(--accent))] mb-5 leading-[1.1]">
              {title}
            </h2>
            <p className="text-[hsl(var(--neutral-800))] leading-relaxed mb-6">
              {description}
            </p>
            <Button asChild className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white hover:-translate-y-0.5 transition-transform">
              <Link href="/contact">{cta}</Link>
            </Button>
          </div>

          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {items.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-2xl border border-[hsl(var(--border))] bg-white px-4"
                >
                  <AccordionTrigger className="text-left text-[hsl(var(--accent))] font-semibold">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[hsl(var(--neutral-800))]">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
