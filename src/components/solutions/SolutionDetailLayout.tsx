'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { defaultBlurDataURL } from '@/lib/image';
import {
  AlertTriangle,
  Lightbulb,
  FileCheck,
  TrendingDown,
  DollarSign,
  Users,
  Clock,
  BarChart3,
  Target,
  Zap,
  Shield,
  Settings,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MoveRight,
  X,
  Check,
  LucideIcon
} from 'lucide-react';

// Iconos para common struggles
const struggleIcons: LucideIcon[] = [
  TrendingDown,    // Pérdidas / problemas financieros
  Clock,           // Tiempo / delays
  Users,           // Recursos / equipo
  AlertTriangle,   // Riesgos / problemas
  DollarSign,      // Costos
  Shield,          // Cumplimiento / seguridad
  BarChart3,       // Métricas / datos
  Settings,        // Complejidad / configuración
];

// Iconos para solutions
const solutionIcons: LucideIcon[] = [
  Lightbulb,       // Ideas / soluciones
  Zap,             // Automatización / velocidad
  Target,          // Objetivos / precisión
  BarChart3,       // Analytics / datos
  Shield,          // Seguridad / confiabilidad
  Settings,        // Optimización / sistemas
  Sparkles,        // Innovación / mejoras
  CheckCircle2,    // Entregables / completado
];

interface SolutionDetailLayoutProps {
  intro?: string;
  strugglesTitle: string;
  struggles: string[];
  solutionsTitle: string;
  solutions: string[];
  caseTitle?: string;
  caseDescription?: string;
  ctaButtonText: string;
  tabsLabels: {
    struggles: string;
    solutions: string;
    case: string;
  };
}

export default function SolutionDetailLayout({
  intro,
  strugglesTitle,
  struggles,
  solutionsTitle,
  solutions,
  caseTitle,
  caseDescription,
  ctaButtonText,
  tabsLabels,
}: SolutionDetailLayoutProps) {
  const [activeTab, setActiveTab] = useState('struggles');

  const wizardSteps = [
    { id: 'struggles', letter: 'A', label: tabsLabels.struggles, icon: AlertTriangle },
    { id: 'solutions', letter: 'B', label: tabsLabels.solutions, icon: Lightbulb },
    { id: 'case', letter: 'C', label: tabsLabels.case, icon: FileCheck },
  ];

  return (
    <section className="py-8 md:py-24 bg-gradient-to-b from-white via-neutral-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Intro text (optional) */}
          {intro && (
            <div className="mb-12 text-center max-w-4xl mx-auto">
              <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                {intro}
              </p>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Mobile: Sticky Tabs with Icons + Text */}
            <div className="md:hidden sticky top-0 z-20 bg-white/95 backdrop-blur-lg border-b border-neutral-200 -mx-4 px-4 py-3 mb-6">
              <div className="flex justify-center">
                <TabsList className="inline-flex h-auto rounded-xl bg-neutral-100 p-1 gap-0.5 w-full">
                  {wizardSteps.map((step) => {
                    const Icon = step.icon;
                    return (
                      <TabsTrigger
                        key={step.id}
                        value={step.id}
                        className="flex-1 flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md transition-all cursor-pointer"
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[10px] leading-tight text-center">{step.label}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>
            </div>

            {/* Desktop: Wizard Style Navigation */}
            <div className="hidden md:block mb-12">
              <div className="max-w-4xl mx-auto">
                {/* Helper text */}
                <p className="text-center text-sm text-neutral-600 mb-6 font-semibold">
                  Click on each step to explore the information
                </p>

                <div className="relative">
                  {/* Progress line */}
                  <div className="absolute top-10 left-0 right-0 h-1 bg-neutral-200 -z-0" style={{ left: '15%', right: '15%' }}></div>
                  <div
                    className="absolute top-10 left-0 h-1 bg-primary transition-all duration-500 -z-0"
                    style={{
                      left: '15%',
                      width: activeTab === 'struggles' ? '0%' : activeTab === 'solutions' ? '35%' : '70%'
                    }}
                  ></div>

                  {/* Wizard steps */}
                  <div className="relative grid grid-cols-3 gap-4">
                    {wizardSteps.map((step, index) => {
                      const Icon = step.icon;
                      const isActive = activeTab === step.id;
                      const isPassed = wizardSteps.findIndex(s => s.id === activeTab) > index;

                      return (
                        <button
                          key={step.id}
                          onClick={() => setActiveTab(step.id)}
                          className="flex flex-col items-center gap-3 group cursor-pointer relative z-10"
                        >
                          {/* Circle with icon */}
                          <div className="relative">
                            {/* Background circle to hide line */}
                            <div className="absolute inset-0 w-20 h-20 rounded-full bg-white -z-10"></div>

                            <div className={`
                              relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300
                              ${isActive
                                ? 'bg-primary text-white shadow-lg scale-110 ring-4 ring-primary/20'
                                : isPassed
                                ? 'bg-primary/80 text-white shadow-md'
                                : 'bg-white border-2 border-neutral-300 text-neutral-500 group-hover:border-primary/50 group-hover:text-primary'
                              }
                            `}>
                              <Icon className="w-9 h-9" strokeWidth={2} />

                              {/* Letter badge in corner */}
                              <div className={`
                                absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all text-sm font-bold
                                ${isActive
                                  ? 'bg-accent text-white'
                                  : isPassed
                                  ? 'bg-[hsl(var(--primary-dark))] text-white'
                                  : 'bg-neutral-100 text-neutral-600'
                                }
                              `}>
                                {step.letter}
                              </div>
                            </div>
                          </div>

                          {/* Label */}
                          <div className="text-center">
                            <p className={`
                              text-sm font-semibold transition-colors
                              ${isActive
                                ? 'text-neutral-900'
                                : 'text-neutral-600 group-hover:text-neutral-900'
                              }
                            `}>
                              {step.label}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Struggles Tab */}
            <TabsContent value="struggles" className="mt-0">
              <div className="text-center mb-6 md:mb-8">
                <Badge variant="outline" className="mb-2 md:mb-3 text-xs md:text-sm px-3 md:px-4 py-1 md:py-1.5 border-red-600/30 text-red-700">
                  Common Pain Points
                </Badge>
                <h2 className="font-display text-2xl md:text-4xl font-bold text-neutral-900 mb-2 md:mb-3">
                  {strugglesTitle}
                </h2>
                <p className="text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
                  These are the typical challenges organizations face without proper solutions
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                {struggles.map((item, index) => {
                  const Icon = struggleIcons[index % struggleIcons.length];
                  return (
                    <div
                      key={index}
                      className="group relative rounded-xl md:rounded-2xl border-2 border-neutral-200 bg-white p-4 md:p-6 hover:border-red-500/50 hover:shadow-lg transition-all duration-300"
                    >
                      {/* Number Badge */}
                      <div className="absolute -top-2 -left-2 md:-top-3 md:-left-3 h-6 w-6 md:h-8 md:w-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center text-xs md:text-sm font-bold shadow-md">
                        {index + 1}
                      </div>

                      <div className="flex gap-3 md:gap-4 items-start">
                        <div className="shrink-0 h-10 w-10 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5 md:w-6 md:h-6 text-red-600" strokeWidth={2} />
                        </div>
                        <p className="text-sm md:text-base text-neutral-800 leading-relaxed pt-0.5 md:pt-1">{item}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Solutions Tab */}
            <TabsContent value="solutions" className="mt-0">
              <div className="text-center mb-6 md:mb-8">
                <Badge variant="outline" className="mb-2 md:mb-3 text-xs md:text-sm px-3 md:px-4 py-1 md:py-1.5 border-accent/30 text-accent">
                  Our Approach
                </Badge>
                <h2 className="font-display text-2xl md:text-4xl font-bold text-neutral-900 mb-2 md:mb-3">
                  {solutionsTitle}
                </h2>
                <p className="text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
                  Strategic solutions designed to address these challenges effectively
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                {solutions.map((item, index) => {
                  const Icon = solutionIcons[index % solutionIcons.length];
                  return (
                    <div
                      key={index}
                      className="group relative rounded-xl md:rounded-2xl border-2 border-neutral-200 bg-gradient-to-br from-white to-neutral-50 p-4 md:p-6 hover:border-accent/50 hover:shadow-lg transition-all duration-300"
                    >
                      {/* Check Icon Badge */}
                      <div className="absolute -top-2 -left-2 md:-top-3 md:-left-3 h-6 w-6 md:h-8 md:w-8 rounded-full bg-gradient-to-br from-accent to-accent-secondary text-white flex items-center justify-center shadow-md">
                        <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4" strokeWidth={3} />
                      </div>

                      <div className="flex gap-3 md:gap-4 items-start">
                        <div className="shrink-0 h-10 w-10 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-gradient-to-br from-accent/10 to-accent-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5 md:w-6 md:h-6 text-accent" strokeWidth={2} />
                        </div>
                        <p className="text-sm md:text-base text-neutral-800 leading-relaxed pt-0.5 md:pt-1 font-medium">{item}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Case Study Tab */}
            <TabsContent value="case" className="mt-0">
              <div className="text-center mb-6 md:mb-8">
                <Badge variant="outline" className="mb-2 md:mb-3 text-xs md:text-sm px-3 md:px-4 py-1 md:py-1.5 border-green-600/30 text-green-700">
                  Real-World Example
                </Badge>
                <h2 className="font-display text-2xl md:text-4xl font-bold text-neutral-900 mb-2 md:mb-3">
                  {caseTitle || 'Case Study'}
                </h2>
                <p className="text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
                  See how we've helped organizations implement this solution successfully
                </p>
              </div>

              {caseTitle && caseDescription ? (
                <div className="max-w-4xl mx-auto">
                  <div className="rounded-2xl md:rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-white to-accent/5 p-6 md:p-10 shadow-xl">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="h-12 w-12 md:h-16 md:w-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shrink-0">
                        <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="font-display text-xl md:text-2xl font-bold text-neutral-900 mb-2">
                          {caseTitle}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm md:text-base text-neutral-700 leading-relaxed whitespace-pre-line">
                      {caseDescription}
                    </p>

                    <div className="mt-8 pt-6 border-t border-neutral-200">
                      <Button
                        asChild
                        size="lg"
                        className="w-full md:w-auto group shadow-lg hover:shadow-xl transition-all"
                      >
                        <Link href="/contact" className="flex items-center justify-center">
                          {ctaButtonText}
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto">
                  <div className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center">
                    <FileCheck className="w-16 h-16 text-primary mx-auto mb-4" strokeWidth={1.5} />
                    <h3 className="font-display text-xl font-bold text-neutral-900 mb-3">
                      Want to see this in action?
                    </h3>
                    <p className="text-neutral-700 mb-6">
                      Contact us to learn more about real implementations and results
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="group shadow-lg hover:shadow-xl transition-all"
                    >
                      <Link href="/contact" className="flex items-center justify-center">
                        {ctaButtonText}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </section>
  );
}
