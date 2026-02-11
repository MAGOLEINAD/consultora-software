'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, ArrowLeft, Search, Database, Workflow, HeadphonesIcon, Lightbulb, Pencil, Hammer, Rocket } from 'lucide-react';

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

const steps = [
  {
    number: 1,
    title: 'Discovery',
    description: 'We understand your current state, pain points, and desired outcomes through structured workshops and analysis.',
    icon: Lightbulb,
  },
  {
    number: 2,
    title: 'Design',
    description: 'We design the future state with clear architecture, data flows, and success metrics aligned to your business goals.',
    icon: Pencil,
  },
  {
    number: 3,
    title: 'Build',
    description: 'We deliver in rapid sprints with continuous feedback, ensuring you see progress every week.',
    icon: Hammer,
  },
  {
    number: 4,
    title: 'Deploy & Optimize',
    description: 'We launch, train your team, monitor performance, and iterate based on real-world usage and feedback.',
    icon: Rocket,
  },
];

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
  const [selectedStep, setSelectedStep] = useState(0);
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);

  const discoveryPackage = packages[0];
  const buildPackages = packages.slice(1, 4);

  const getStepContent = () => {
    switch (selectedStep) {
      case 0: // Discovery
        return {
          type: 'discovery',
          package: discoveryPackage,
          icon: packageIcons[0],
        };
      case 1: // Design - Just selection
        return {
          type: 'selection',
          packages: buildPackages,
          selectedIndex: selectedPackageIndex,
        };
      case 2: // Build - Show details
        return {
          type: 'build',
          package: buildPackages[selectedPackageIndex],
          icon: packageIcons[selectedPackageIndex + 1],
        };
      case 3: // Deploy & Optimize
        return {
          type: 'deploy',
          package: packages[3],
          icon: packageIcons[3],
        };
      default:
        return null;
    }
  };

  const stepContent = getStepContent();
  const currentStep = steps[selectedStep];

  const handleNext = () => {
    if (selectedStep < steps.length - 1) {
      setSelectedStep(selectedStep + 1);
    }
  };

  const handlePrevious = () => {
    if (selectedStep > 0) {
      setSelectedStep(selectedStep - 1);
    }
  };

  return (
    <section id="pricing" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {title}
          </h2>
          <p className="text-base text-neutral-600 max-w-2xl mx-auto">
            Start with a paid Discovery to scope accurately and provide a fixed proposal. Then choose your implementation sprint or ongoing support.
          </p>
        </div>

        {/* Visual Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto relative">
            {steps.map((step, index) => {
              const isActive = selectedStep === index;
              const isCompleted = selectedStep > index;

              return (
                <div key={step.number} className="flex items-center flex-1">
                  {/* Circle */}
                  <div className="relative flex flex-col items-center z-10">
                    <div
                      className={`
                        h-12 w-12 md:h-16 md:w-16 rounded-full flex items-center justify-center text-lg md:text-xl font-bold transition-all duration-300
                        ${isActive
                          ? 'bg-neutral-900 text-white border-4 border-neutral-900 scale-110 shadow-xl'
                          : isCompleted
                          ? 'bg-primary text-white border-4 border-primary'
                          : 'bg-white text-neutral-400 border-4 border-neutral-300'
                        }
                      `}
                    >
                      {step.number < 10 ? `0${step.number}` : step.number}
                    </div>
                    <span className={`text-[10px] md:text-xs mt-1 md:mt-2 font-semibold ${isActive ? 'text-neutral-900' : 'text-neutral-500'}`}>
                      {step.title}
                    </span>
                  </div>

                  {/* Arrow between steps */}
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-1 mx-2 md:mx-4 relative">
                      <div className="absolute inset-0 bg-neutral-200 right-4"></div>
                      <div
                        className={`absolute inset-0 right-4 transition-all duration-500 ${
                          selectedStep > index ? 'bg-primary' : 'bg-transparent'
                        }`}
                        style={{ width: selectedStep > index ? '100%' : '0%' }}
                      ></div>
                      <ArrowRight className={`absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 md:h-4 md:w-4 z-10 bg-white rounded-full ${selectedStep > index ? 'text-primary' : 'text-neutral-300'}`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Content Card */}
        <Card className="border-2 border-neutral-200 bg-neutral-50 shadow-lg mb-6">
          <CardContent className="p-6 md:p-8">
            {/* Step Title & Description with Navigation */}
            <div className="mb-6 pb-6 border-b border-neutral-200">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-neutral-900 flex items-center justify-center shrink-0">
                      <currentStep.icon className="h-5 w-5 text-white" strokeWidth={2.5} />
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-neutral-900">
                      {currentStep.title}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-2xl">
                    {currentStep.description}
                  </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-2 shrink-0 pt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevious}
                    disabled={selectedStep === 0}
                    className="h-9 px-4 cursor-pointer"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>

                  {selectedStep < steps.length - 1 ? (
                    <Button
                      size="sm"
                      onClick={handleNext}
                      className="h-9 px-4 cursor-pointer"
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button asChild size="sm" className="h-9 px-5 cursor-pointer">
                      <Link href="/contact" className="flex items-center cursor-pointer">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Step Content */}
            {stepContent && (
              <>
                {/* Discovery Step */}
                {stepContent.type === 'discovery' && stepContent.package && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        {stepContent.icon && <stepContent.icon className="h-6 w-6 text-primary" strokeWidth={2.5} />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-display text-xl font-bold text-neutral-900">
                          {stepContent.package.name}
                        </h4>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-neutral-600">{stepContent.package.duration}</span>
                          <span className="font-bold text-primary text-lg">{stepContent.package.price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-5">
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {stepContent.package.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {stepContent.package.notes && stepContent.package.notes.length > 0 && (
                      <div className="bg-primary/10 rounded-lg px-4 py-3 border border-primary/20 mt-4">
                        {stepContent.package.notes.map((note) => (
                          <p key={note} className="text-xs text-neutral-700 italic">{note}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Selection Step (Design) */}
                {stepContent.type === 'selection' && stepContent.packages && (
                  <div className="text-center">
                    <p className="text-base md:text-lg font-semibold text-neutral-800 mb-4 md:mb-6">
                      What type of solution are you looking for?
                    </p>

                    <div className="grid grid-cols-3 gap-2 md:gap-4">
                      {stepContent.packages.map((pkg, index) => {
                        const Icon = packageIcons[index + 1];
                        const isSelected = stepContent.selectedIndex === index;

                        return (
                          <button
                            key={pkg.name}
                            onClick={() => setSelectedPackageIndex(index)}
                            className={`
                              p-3 md:p-6 rounded-lg md:rounded-xl border-2 transition-all cursor-pointer
                              ${isSelected
                                ? 'border-primary bg-primary/5 shadow-md'
                                : 'border-neutral-300 bg-white hover:border-primary/50 hover:shadow-md'
                              }
                            `}
                          >
                            <div className="flex justify-center mb-2 md:mb-4">
                              <div className={`
                                h-10 w-10 md:h-16 md:w-16 rounded-lg md:rounded-xl flex items-center justify-center
                                ${isSelected ? 'bg-primary/10' : 'bg-neutral-100'}
                              `}>
                                <Icon className={`h-5 w-5 md:h-8 md:w-8 ${isSelected ? 'text-primary' : 'text-neutral-700'}`} strokeWidth={2} />
                              </div>
                            </div>
                            <h5 className="font-display font-bold text-xs md:text-base text-neutral-900 mb-1 md:mb-2">
                              {pkg.name}
                            </h5>
                            <p className="text-[10px] md:text-sm text-neutral-600">
                              {pkg.duration}
                            </p>
                            <p className="text-[10px] md:text-sm text-neutral-600 font-semibold">
                              {pkg.price}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Build Step */}
                {stepContent.type === 'build' && stepContent.package && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        {stepContent.icon && <stepContent.icon className="h-6 w-6 text-primary" strokeWidth={2.5} />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-display text-xl font-bold text-neutral-900">
                          {stepContent.package.name}
                        </h4>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-neutral-600">{stepContent.package.duration}</span>
                          <span className="font-bold text-primary text-lg">{stepContent.package.price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-5">
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {stepContent.package.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Deploy Step */}
                {stepContent.type === 'deploy' && stepContent.package && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        {stepContent.icon && <stepContent.icon className="h-6 w-6 text-primary" strokeWidth={2.5} />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-display text-xl font-bold text-neutral-900">
                          {stepContent.package.name}
                        </h4>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-neutral-600">{stepContent.package.duration}</span>
                          <span className="font-bold text-primary text-lg">{stepContent.package.price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-5">
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {stepContent.package.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <p className="text-sm text-neutral-600 text-center leading-relaxed">
          {disclaimer}
        </p>
      </div>
    </section>
  );
}
