import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';

interface Testimonial {
  quote: string;
  author: string;
}

interface TestimonialsProps {
  title: string;
  items: Testimonial[];
}

export default function Testimonials({ title, items }: TestimonialsProps) {
  return (
    <section className="section-padding bg-[hsl(var(--neutral-50))]">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading title={title} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {items.map((testimonial, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="pt-6">
                <Quote className="w-8 h-8 text-[hsl(var(--primary))] mb-4 opacity-50" />
                <p className="text-[hsl(var(--neutral-800))] mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                  {testimonial.author}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
