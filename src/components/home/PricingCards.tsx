import { Link } from '@/i18n/routing';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';

interface Package {
  name: string;
  duration: string;
  priceFrom: string;
  priceUnit?: string;
  featured: boolean;
  badge?: string;
  features: string[];
  cta: string;
}

interface PricingCardsProps {
  locale: string;
  title: string;
  subtitle: string;
  packages: {
    dataPlatform: Package;
    automation: Package;
    managed: Package;
  };
}

export default function PricingCards({ locale, title, subtitle, packages }: PricingCardsProps) {
  const packagesArray = [
    packages.dataPlatform,
    packages.automation,
    packages.managed,
  ];

  return (
    <section id="pricing" className="section-padding bg-[hsl(var(--neutral-50))]">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packagesArray.map((pkg, index) => (
            <Card
              key={index}
              className={`relative ${
                pkg.featured
                  ? 'border-[hsl(var(--primary))] shadow-xl scale-105 md:scale-110'
                  : ''
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge variant="accent" className="px-4 py-1">
                    {pkg.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                <CardDescription className="text-sm">{pkg.duration}</CardDescription>

                <div className="mt-6">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-sm text-[hsl(var(--neutral-800))]">from</span>
                    <span className="text-4xl md:text-5xl font-bold text-[hsl(var(--foreground))]">
                      {pkg.priceFrom}
                    </span>
                  </div>
                  {pkg.priceUnit && (
                    <p className="text-sm text-[hsl(var(--neutral-800))] mt-1">
                      {pkg.priceUnit}
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
                      <span className="text-sm text-[hsl(var(--neutral-800))]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  asChild
                  className="w-full"
                  variant={pkg.featured ? 'default' : 'outline'}
                >
                  <Link href="/contact">{pkg.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
