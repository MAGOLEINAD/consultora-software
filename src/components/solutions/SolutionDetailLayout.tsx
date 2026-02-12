'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from '@/i18n/routing';
import {
  AlertTriangle,
  TrendingDown,
  Clock,
  Users,
  DollarSign,
  Shield,
  BarChart3,
  Settings,
  Lightbulb,
  Zap,
  Target,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Rocket,
  TrendingUp,
  LucideIcon
} from 'lucide-react';

// Iconos para common struggles (problemas)
const struggleIcons: LucideIcon[] = [
  TrendingDown,
  Clock,
  Users,
  AlertTriangle,
  DollarSign,
  Shield,
  BarChart3,
  Settings,
];

// Iconos para solutions
const solutionIcons: LucideIcon[] = [
  Lightbulb,
  Zap,
  Target,
  CheckCircle2,
  BarChart3,
  Shield,
  Sparkles,
  Settings,
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
  locale?: string;
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
  locale = 'en',
}: SolutionDetailLayoutProps) {
  const copy = locale === 'es'
    ? {
        strugglesBadge: 'Desafios comunes',
        strugglesDescription: 'Las organizaciones enfrentan estos desafios criticos sin las soluciones adecuadas',
        solutionsBadge: 'Nuestro enfoque',
        solutionsDescription: 'Soluciones estrategicas disenadas para transformar desafios en oportunidades',
        caseBadge: 'Exito real',
        caseTitle: 'Caso de estudio',
        caseCtaTitle: 'Listo para resultados similares?',
        caseCtaDescription: 'Conversemos sobre como podemos ayudar a tu organizacion',
        finalCtaTitle: 'Listo para transformar tu negocio?',
        finalCtaDescription: 'Conversemos sobre como implementar estas soluciones para generar resultados reales en tu organizacion',
      }
    : {
        strugglesBadge: 'Common Challenges',
        strugglesDescription: 'Organizations face these critical challenges without the right solutions',
        solutionsBadge: 'Our Approach',
        solutionsDescription: 'Strategic solutions designed to transform challenges into opportunities',
        caseBadge: 'Real-World Success',
        caseTitle: 'Case Study',
        caseCtaTitle: 'Ready for similar results?',
        caseCtaDescription: "Let's discuss how we can help your organization",
        finalCtaTitle: 'Ready to Transform Your Business?',
        finalCtaDescription: "Let's discuss how we can implement these solutions to drive real results for your organization",
      };

  return (
    <div className="bg-white">
      {/* Intro Section */}
      {intro && (
        <section className="py-12 md:py-20 bg-linear-to-b from-neutral-50 to-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-px w-12 bg-linear-to-r from-transparent to-primary"></div>
                <Sparkles className="w-5 h-5 text-primary" />
                <div className="h-px w-12 bg-linear-to-l from-transparent to-primary"></div>
              </div>
              <p className="text-lg md:text-xl text-neutral-700 leading-relaxed text-center">
                {intro}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Struggles Section - Problemas Comunes */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-700 text-sm font-semibold mb-4">
                <AlertTriangle className="w-4 h-4" />
                {copy.strugglesBadge}
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-neutral-900 mb-4">
                {strugglesTitle}
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                {copy.strugglesDescription}
              </p>
            </div>

            {/* Grid de Struggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {struggles.map((item, index) => {
                const Icon = struggleIcons[index % struggleIcons.length];
                return (
                  <div
                    key={index}
                    className="group relative bg-linear-to-br from-white to-neutral-50 rounded-2xl p-8 border-2 border-neutral-200 hover:border-red-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-red-500/5 to-transparent rounded-bl-full"></div>

                    {/* Icon */}
                    <div className="relative mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                      </div>
                      {/* Number badge */}
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-bold shadow-md">
                        {index + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                      {item}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Separator className="container mx-auto" />

      {/* Solutions Section */}
      <section className="py-16 md:py-24 bg-linear-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                <Rocket className="w-4 h-4" />
                {copy.solutionsBadge}
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-neutral-900 mb-4">
                {solutionsTitle}
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                {copy.solutionsDescription}
              </p>
            </div>

            {/* Grid de Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {solutions.map((item, index) => {
                const Icon = solutionIcons[index % solutionIcons.length];
                return (
                  <div
                    key={index}
                    className="group relative bg-white rounded-2xl p-8 border-2 border-neutral-200 hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden"
                  >
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Content wrapper */}
                    <div className="relative">
                      {/* Icon and number */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br from-primary to-accent shadow-lg shadow-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                        </div>
                        <div className="flex-1 flex justify-end">
                          <span className="text-6xl font-bold text-neutral-100 group-hover:text-primary/20 transition-colors">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </div>

                      {/* Text */}
                      <p className="text-base md:text-lg text-neutral-800 leading-relaxed font-medium">
                        {item}
                      </p>

                      {/* Decorative check mark */}
                      <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <CheckCircle2 className="w-12 h-12 text-primary/20" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      {caseTitle && caseDescription && (
        <section className="py-16 md:py-24 bg-linear-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-semibold mb-4 border border-white/20">
                  <TrendingUp className="w-4 h-4" />
                  {copy.caseBadge}
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
                  {copy.caseTitle}
                </h2>
              </div>

              {/* Case content */}
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl">
                <div className="flex items-start gap-6 mb-8">
                  <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-primary to-accent shadow-2xl shadow-primary/50 shrink-0">
                    <Sparkles className="w-10 h-10 text-white" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                      {caseTitle}
                    </h3>
                    <p className="text-lg text-white/90 leading-relaxed whitespace-pre-line">
                      {caseDescription}
                    </p>
                  </div>
                </div>

                <Separator className="my-8 bg-white/20" />

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <p className="text-white/80 text-lg font-semibold mb-1">
                      {copy.caseCtaTitle}
                    </p>
                    <p className="text-white/60 text-sm">
                      {copy.caseCtaDescription}
                    </p>
                  </div>
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-neutral-900 hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all group whitespace-nowrap"
                  >
                    <Link href="/contact" className="flex items-center gap-2">
                      {ctaButtonText}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA alternativo si no hay case study */}
      {(!caseTitle || !caseDescription) && (
        <section className="py-16 md:py-24 bg-linear-to-br from-primary via-accent to-accent-secondary text-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Rocket className="w-16 h-16 mx-auto mb-6 opacity-90" strokeWidth={1.5} />
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                {copy.finalCtaTitle}
              </h2>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                {copy.finalCtaDescription}
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-neutral-900 hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all group"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  {ctaButtonText}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

