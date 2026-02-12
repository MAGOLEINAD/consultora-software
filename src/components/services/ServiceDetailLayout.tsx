'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import {
  AlertCircle,
  CheckCircle2,
  Package,
  Database,
  TrendingUp,
  Users,
  Shield,
  Zap,
  Target,
  BarChart3,
  Settings,
  Clock,
  FileText,
  Workflow,
  GitBranch,
  Network,
  Cpu,
  Sparkles,
  ArrowRight,
  ChevronRight,
  LucideIcon
} from 'lucide-react';

// Mapeo de iconos para challenges (problemas comunes)
const challengeIcons: LucideIcon[] = [
  Database,    // Data silos / integración
  TrendingUp,  // Escalabilidad / infraestructura
  Users,       // Recursos / equipo
  Shield,      // Costos / ROI / seguridad
  Network,     // Conectividad / sistemas
  Clock,       // Tiempo / delays
  AlertCircle, // Errores / problemas genéricos
  Settings,    // Configuración / complejidad
];

// Mapeo de iconos para deliverables (qué entregamos)
const deliverableIcons: LucideIcon[] = [
  FileText,    // Documentación / arquitectura
  Database,    // Plataformas / infraestructura
  BarChart3,   // Dashboards / analytics
  GitBranch,   // Pipelines / workflows
  Shield,      // Gobernanza / seguridad
  Workflow,    // Procesos / automatización
  Cpu,         // Sistemas / tecnología
  Package,     // Entregables / productos
  Settings,    // Configuración / setup
  Sparkles,    // Optimización / mejoras
];

// Mapeo de iconos para outcomes (resultados)
const outcomeIcons: LucideIcon[] = [
  Target,      // Objetivos / resultados
  TrendingUp,  // Crecimiento / mejoras
  Zap,         // Velocidad / eficiencia
  CheckCircle2,// Éxito / completado
  Users,       // Impacto en equipo
  BarChart3,   // Métricas / KPIs
  Shield,      // Confiabilidad / seguridad
  Sparkles,    // Transformación / innovación
];

interface ServiceDetailLayoutProps {
  challengesTitle: string;
  challenges: string[];
  deliverablesTitle: string;
  deliverables: string[];
  outcomesTitle: string;
  outcomes: string[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  locale?: string;
  tabsLabels: {
    challenges: string;
    deliverables: string;
    outcomes: string;
  };
}

export default function ServiceDetailLayout({
  challengesTitle,
  challenges,
  deliverablesTitle,
  deliverables,
  outcomesTitle,
  outcomes,
  ctaTitle,
  ctaDescription,
  ctaButtonText,
  tabsLabels,
  locale = 'en',
}: ServiceDetailLayoutProps) {
  const [activeTab, setActiveTab] = useState('challenges');

  const copy = locale === 'es'
    ? {
        helperText: 'Hace clic en cada paso para explorar la informacion',
        challengesBadge: 'Puntos de Dolor Comunes',
        challengesDescription: 'Estos son los obstaculos mas frecuentes antes de trabajar con nosotros',
        deliverablesBadge: 'Nuestra Solucion',
        deliverablesDescription: 'Entregables concretos para resolver desafios y generar resultados',
        outcomesBadge: 'Resultados Esperados',
        outcomesDescription: 'Impacto medible que podes esperar despues de la implementacion',
        typicalDelivery: 'Entrega tipica',
        typicalDeliveryDuration: '4-12 semanas',
      }
    : {
        helperText: 'Click on each step to explore the information',
        challengesBadge: 'Common Pain Points',
        challengesDescription: 'These are the most common obstacles our clients face before working with us',
        deliverablesBadge: 'Our Solution',
        deliverablesDescription: 'Concrete deliverables that solve your challenges and drive results',
        outcomesBadge: 'Expected Results',
        outcomesDescription: 'Measurable business outcomes you can expect after implementation',
        typicalDelivery: 'Typical delivery',
        typicalDeliveryDuration: '4-12 weeks',
      };

  const wizardSteps = [
    { id: 'challenges', letter: 'A', label: tabsLabels.challenges, icon: AlertCircle },
    { id: 'deliverables', letter: 'B', label: tabsLabels.deliverables, icon: Package },
    { id: 'outcomes', letter: 'C', label: tabsLabels.outcomes, icon: CheckCircle2 },
  ];

  return (
    <section className="py-8 md:py-24 bg-gradient-to-b from-white via-neutral-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">

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
                  {copy.helperText}
                </p>

                <div className="relative">
                  {/* Progress line */}
                  <div className="absolute top-10 left-0 right-0 h-1 bg-neutral-200 -z-0" style={{ left: '15%', right: '15%' }}></div>
                  <div
                    className="absolute top-10 left-0 h-1 bg-primary transition-all duration-500 -z-0"
                    style={{
                      left: '15%',
                      width: activeTab === 'challenges' ? '0%' : activeTab === 'deliverables' ? '35%' : '70%'
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
                          {/* Circle with icon - with solid background to hide line */}
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

            {/* Challenges Tab */}
            <TabsContent value="challenges" className="mt-0">
              <div className="text-center mb-6 md:mb-8">
                <Badge variant="outline" className="mb-2 md:mb-3 text-xs md:text-sm px-3 md:px-4 py-1 md:py-1.5 border-primary/30 text-primary">
                  {copy.challengesBadge}
                </Badge>
                <h2 className="font-display text-2xl md:text-4xl font-bold text-neutral-900 mb-2 md:mb-3">
                  {challengesTitle}
                </h2>
                <p className="text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
                  {copy.challengesDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                {challenges.map((item, index) => {
                  const Icon = challengeIcons[index % challengeIcons.length];
                  return (
                    <div
                      key={index}
                      className="group relative rounded-xl md:rounded-2xl border-2 border-neutral-200 bg-white p-4 md:p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                    >
                      {/* Number Badge */}
                      <div className="absolute -top-2 -left-2 md:-top-3 md:-left-3 h-6 w-6 md:h-8 md:w-8 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-xs md:text-sm font-bold shadow-md">
                        {index + 1}
                      </div>

                      <div className="flex gap-3 md:gap-4 items-start">
                        <div className="shrink-0 h-10 w-10 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" strokeWidth={2} />
                        </div>
                        <p className="text-sm md:text-base text-neutral-800 leading-relaxed pt-0.5 md:pt-1">{item}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Deliverables Tab */}
            <TabsContent value="deliverables" className="mt-0">
              <div className="text-center mb-6 md:mb-8">
                <Badge variant="outline" className="mb-2 md:mb-3 text-xs md:text-sm px-3 md:px-4 py-1 md:py-1.5 border-accent/30 text-accent">
                  {copy.deliverablesBadge}
                </Badge>
                <h2 className="font-display text-2xl md:text-4xl font-bold text-neutral-900 mb-2 md:mb-3">
                  {deliverablesTitle}
                </h2>
                <p className="text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
                  {copy.deliverablesDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                {deliverables.map((item, index) => {
                  const Icon = deliverableIcons[index % deliverableIcons.length];
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

            {/* Outcomes Tab */}
            <TabsContent value="outcomes" className="mt-0">
              <div className="text-center mb-6 md:mb-8">
                <Badge variant="outline" className="mb-2 md:mb-3 text-xs md:text-sm px-3 md:px-4 py-1 md:py-1.5 border-green-600/30 text-green-700">
                  {copy.outcomesBadge}
                </Badge>
                <h2 className="font-display text-2xl md:text-4xl font-bold text-neutral-900 mb-2 md:mb-3">
                  {outcomesTitle}
                </h2>
                <p className="text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
                  {copy.outcomesDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 md:gap-8 items-start">
                {/* Outcomes List */}
                <div className="space-y-3 md:space-y-4">
                  {outcomes.map((item, index) => {
                    const Icon = outcomeIcons[index % outcomeIcons.length];
                    return (
                      <div
                        key={index}
                        className="group flex gap-3 md:gap-4 items-start p-4 md:p-5 rounded-xl bg-white border-2 border-neutral-200 hover:border-green-500/50 hover:shadow-md transition-all duration-300"
                      >
                        <div className="shrink-0 h-9 w-9 md:h-10 md:w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <Icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
                        </div>
                        <p className="text-sm md:text-base text-neutral-800 leading-relaxed pt-1 md:pt-1.5 font-medium">{item}</p>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Card */}
                <div className="lg:sticky lg:top-24">
                  <div className="rounded-2xl md:rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-accent/5 to-accent-secondary/5 p-6 md:p-8 shadow-xl">
                    <div className="h-12 w-12 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 md:mb-6 shadow-lg">
                      <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={2} />
                    </div>

                    <h3 className="font-display text-xl md:text-2xl font-bold text-neutral-900 mb-2 md:mb-3">
                      {ctaTitle}
                    </h3>
                    <p className="text-sm md:text-base text-neutral-700 mb-5 md:mb-6 leading-relaxed">
                      {ctaDescription}
                    </p>

                    <Button
                      asChild
                      size="lg"
                      className="w-full group shadow-lg hover:shadow-xl transition-all"
                    >
                      <Link href="/contact" className="flex items-center justify-center">
                        {ctaButtonText}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>

                    <div className="mt-5 md:mt-6 pt-5 md:pt-6 border-t border-neutral-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-600">{copy.typicalDelivery}</span>
                        <span className="font-semibold text-neutral-900">{copy.typicalDeliveryDuration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </section>
  );
}
