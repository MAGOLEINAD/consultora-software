import { Link } from '@/i18n/routing';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Database, Workflow, Brain, TrendingUp, ShoppingCart, Headphones, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';

const serviceIcons = {
  'data-platforms-bi': Database,
  'process-automation': Workflow,
  'applied-ai': Brain,
  'ml-forecasting': TrendingUp,
  'software-selection': ShoppingCart,
  'managed-services': Headphones,
};

interface Service {
  name: string;
  shortDescription: string;
  slug: string;
}

interface ServicesGridProps {
  locale: string;
  title: string;
  subtitle: string;
  services: Service[];
}

export default function ServicesGrid({ locale, title, subtitle, services }: ServicesGridProps) {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => {
            const Icon = serviceIcons[service.slug as keyof typeof serviceIcons] || Database;

            return (
              <Link key={service.slug} href={`/services/${service.slug}`}>
                <Card className="h-full transition-all hover:shadow-lg hover:border-[hsl(var(--primary))] group">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl mb-2">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm mb-4">
                      {service.shortDescription}
                    </CardDescription>
                    <div className="flex items-center text-[hsl(var(--primary))] text-sm font-medium group-hover:gap-2 transition-all">
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
