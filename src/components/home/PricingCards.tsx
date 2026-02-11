'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, ArrowRight, Search, Database, Workflow, HeadphonesIcon } from 'lucide-react';

interface Package {
  name: string;
  duration: string;
  price: string;
  includes: string[];
  excludes?: string[];
  notes?: string[];
  cta: string;
}

interface PricingCardsProps {
  title: string;
  intro: string;
  packages: Package[];
  disclaimer: string;
}

const packageIcons = {
  0: Search,
  1: Database,
  2: Workflow,
  3: HeadphonesIcon,
};

export default function PricingCards({
  title,
  intro,
  packages,
  disclaimer,
}: PricingCardsProps) {
  const discoveryPackage = packages[0];
  const selectablePackages = packages.slice(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedPackage = selectablePackages[selectedIndex];

  const DiscoveryIcon = packageIcons[0];
  const SelectedIcon = packageIcons[selectedIndex + 1];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            {title}
          </h2>
          <p className="text-base text-neutral-600 max-w-2xl mx-auto">
            {intro}
          </p>
        </div>

        {/* Pricing Card */}
        <Card className="border-2 border-neutral-200 bg-white shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="bg-neutral-50 border-b-2 border-neutral-200 p-4">
            <p className="text-xs font-semibold text-neutral-600 uppercase tracking-wide mb-3">
              Choose Your Package
            </p>
            <div className="flex flex-wrap gap-2">
              {selectablePackages.map((pkg, index) => {
                const Icon = packageIcons[index + 1];
                return (
                  <button
                    key={pkg.name}
                    onClick={() => setSelectedIndex(index)}
                    className={`
                      flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 transition-all text-sm font-semibold cursor-pointer
                      ${selectedIndex === index
                        ? 'border-accent bg-accent text-white'
                        : 'border-neutral-300 bg-white text-neutral-700 hover:border-accent/40'
                      }
                    `}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
                    <span className="hidden sm:inline">{pkg.name}</span>
                    <span className="sm:hidden">{pkg.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <CardContent className="p-5 md:p-6">
            {/* Package Header */}
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-neutral-200">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <SelectedIcon className="h-5 w-5 text-accent" strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg md:text-xl font-bold text-neutral-900 truncate">
                  {selectedPackage.name}
                </h3>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-neutral-600">{selectedPackage.duration}</span>
                  <span className="font-bold text-accent text-base">{selectedPackage.price}</span>
                </div>
              </div>
            </div>

            {/* Phases */}
            <div className="space-y-4 mb-5">
              {/* Phase 1: Discovery */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <DiscoveryIcon className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900">
                    Phase 1: Discovery
                  </h4>
                  <span className="text-xs text-neutral-500 ml-auto">{discoveryPackage.duration}</span>
                </div>
                <ul className="space-y-1 ml-8">
                  {discoveryPackage.includes.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-xs text-neutral-700">
                      <Check className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phase 2: Implementation */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 w-6 rounded bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <SelectedIcon className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900">
                    Phase 2: Implementation
                  </h4>
                  <span className="text-xs text-neutral-500 ml-auto">{selectedPackage.duration}</span>
                </div>
                <ul className="space-y-1 ml-8">
                  {selectedPackage.includes.map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-xs text-neutral-700">
                      <Check className="h-3 w-3 text-accent mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {selectedPackage.excludes && selectedPackage.excludes.length > 0 && (
                  <div className="ml-8 mt-3 pt-3 border-t border-neutral-100">
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1.5">
                      Not Included
                    </p>
                    <ul className="space-y-1">
                      {selectedPackage.excludes.map((item) => (
                        <li key={item} className="flex items-start gap-1.5 text-xs text-neutral-500">
                          <X className="h-2.5 w-2.5 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <Button asChild className="w-full h-11 font-semibold">
              <Link href="/contact">
                Get Started with {selectedPackage.name.split(' ')[0]}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <p className="text-xs text-neutral-600 text-center mt-6 leading-relaxed">
          {disclaimer}
        </p>
      </div>
    </section>
  );
}
