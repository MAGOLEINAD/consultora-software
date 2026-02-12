'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  LucideIcon
} from 'lucide-react';

const struggleIcons: LucideIcon[] = [TrendingDown, Clock, Users, AlertTriangle, DollarSign, Shield, BarChart3, Settings];
const solutionIcons: LucideIcon[] = [Lightbulb, Zap, Target, CheckCircle2, BarChart3, Shield, Sparkles, Settings];

interface SolutionLayoutProps {
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

export default function FlipCardLayout({
  intro,
  strugglesTitle,
  struggles,
  solutionsTitle,
  solutions,
  caseTitle,
  caseDescription,
  ctaButtonText,
  locale = 'en',
}: SolutionLayoutProps) {
  // Estado para controlar qué cards están volteadas (true = muestra solución)
  const [flippedCards, setFlippedCards] = useState<boolean[]>(Array(Math.max(struggles.length, solutions.length)).fill(false));

  // Estado para el carousel en mobile
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const copy = locale === 'es'
    ? {
        sectionTitle: 'Transformamos Desafios en Soluciones',
        sectionSubtitle: 'Click en cada tarjeta para ver la solucion',
        challengeLabel: 'Desafio',
        solutionLabel: 'Solucion',
        flipToSolution: 'Ver Solucion',
        flipToChallenge: 'Ver Desafio',
        caseBadge: 'Caso de Exito',
        caseCtaTitle: 'Listo para resultados similares?',
        caseCtaDescription: 'Conversemos sobre como podemos ayudar',
        finalCtaTitle: 'Transformemos tu Negocio',
        finalCtaDescription: 'Implementemos estas soluciones',
        clickHint: 'Click para voltear',
        swipeHint: 'Desliza para ver más',
      }
    : {
        sectionTitle: 'Transforming Challenges into Solutions',
        sectionSubtitle: 'Click each card to see the solution',
        challengeLabel: 'Challenge',
        solutionLabel: 'Solution',
        flipToSolution: 'See Solution',
        flipToChallenge: 'See Challenge',
        caseBadge: 'Success Story',
        caseCtaTitle: 'Ready for similar results?',
        caseCtaDescription: "Let's discuss how we can help",
        finalCtaTitle: 'Transform Your Business',
        finalCtaDescription: "Let's implement these solutions",
        clickHint: 'Click to flip',
        swipeHint: 'Swipe to see more',
      };

  const toggleCard = (index: number) => {
    setFlippedCards(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleSwipe = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeCardIndex < pairCount - 1) {
        setActiveCardIndex(activeCardIndex + 1);
      } else if (diff < 0 && activeCardIndex > 0) {
        setActiveCardIndex(activeCardIndex - 1);
      }
    }
    setTouchStart(0);
  };

  const pairCount = Math.max(struggles.length, solutions.length);
  const totalDesktopPages = Math.max(1, Math.ceil(pairCount / 2));
  const currentDesktopStartIndex = Math.floor(activeCardIndex / 2) * 2;
  const currentDesktopPage = Math.floor(currentDesktopStartIndex / 2) + 1;
  const maxDesktopStartIndex = Math.max(0, (totalDesktopPages - 1) * 2);

  const splitCardText = (text: string) => {
    const trimmedText = text.trim();
    const capitalizeFirstLetter = (value: string) => {
      if (!value) return value;
      return value.charAt(0).toUpperCase() + value.slice(1);
    };
    const colonIndex = trimmedText.indexOf(':');

    if (colonIndex > -1) {
      return {
        title: trimmedText.slice(0, colonIndex + 1).trim(),
        description: capitalizeFirstLetter(trimmedText.slice(colonIndex + 1).trim()),
      };
    }

    const match = trimmedText.match(/^([^.!?]+[.!?]?)([\s\S]*)$/);

    if (!match) {
      return { title: trimmedText, description: '' };
    }

    return {
      title: match[1].trim(),
      description: match[2].trim(),
    };
  };

  return (
    <div className="bg-white">
      {/* Intro */}
      {intro && (
        <section className="py-4 md:py-6 bg-linear-to-b from-neutral-50 to-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-sm md:text-base text-neutral-700 leading-relaxed">{intro}</p>
            </div>
          </div>
        </section>
      )}

      {/* Interactive Flip Cards Section */}
      <section className="py-8 md:py-12 bg-linear-to-b from-white via-neutral-50 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 md:mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r from-red-50 via-primary/10 to-primary/10 text-primary text-xs md:text-sm font-semibold mb-3 border border-primary/20">
                <RefreshCw className="w-4 h-4" />
                {copy.clickHint}
              </div>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-neutral-900 mb-2">
                {copy.sectionTitle}
              </h2>
              <p className="text-sm md:text-base text-neutral-600">{copy.sectionSubtitle}</p>
            </div>

            {/* Desktop: 2 Cards Grid with Carousel */}
            <div className="hidden md:block">
              <div className="max-w-6xl mx-auto">
                <div className="flex justify-center mb-5">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 border border-neutral-200">
                    <span className="text-sm font-bold text-primary">{currentDesktopPage}</span>
                    <span className="text-sm text-neutral-500">/</span>
                    <span className="text-sm text-neutral-500">{totalDesktopPages}</span>
                  </div>
                </div>
                <div className="relative">
                  {/* Navigation Arrows */}
                  <button
                    onClick={() => setActiveCardIndex(Math.max(0, currentDesktopStartIndex - 2))}
                    disabled={currentDesktopStartIndex === 0}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 rounded-full bg-white border-2 border-neutral-200 flex items-center justify-center hover:bg-neutral-50 hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-neutral-200 z-10"
                    aria-label="Previous cards"
                  >
                    <ChevronLeft className="w-6 h-6 text-neutral-700" strokeWidth={2.5} />
                  </button>

                  <button
                    onClick={() => setActiveCardIndex(Math.min(maxDesktopStartIndex, currentDesktopStartIndex + 2))}
                    disabled={currentDesktopStartIndex >= maxDesktopStartIndex}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 rounded-full bg-white border-2 border-neutral-200 flex items-center justify-center hover:bg-neutral-50 hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-neutral-200 z-10"
                    aria-label="Next cards"
                  >
                    <ChevronRight className="w-6 h-6 text-neutral-700" strokeWidth={2.5} />
                  </button>

                  {/* 2 Cards Grid Display */}
                  <div className="grid grid-cols-2 gap-6">
                    {Array.from({ length: 2 }).map((_, offset) => {
                      const index = currentDesktopStartIndex + offset;
                      if (index >= pairCount) return <div key={offset} className="invisible"></div>;
                      const challenge = struggles[index];
                      const solution = solutions[index];
                      const challengeText = splitCardText(challenge ?? '');
                      const solutionText = splitCardText(solution ?? '');
                      const isFlipped = flippedCards[index];
                      const ChallengeIcon = struggleIcons[index % struggleIcons.length];
                      const SolutionIcon = solutionIcons[index % solutionIcons.length];

                      if (!challenge || !solution) return null;

                      return (
                        <div key={index} className="perspective-1000">
                          <div
                            className={`relative w-full h-70 transition-transform duration-700 transform-style-3d cursor-pointer ${
                              isFlipped ? 'rotate-y-180' : ''
                            }`}
                            onClick={() => toggleCard(index)}
                          >
                            {/* Front Side - Challenge */}
                            <div className={`absolute inset-0 backface-hidden rounded-2xl border-2 border-neutral-200 bg-white p-6 shadow-lg hover:shadow-2xl transition-shadow ${isFlipped ? 'pointer-events-none' : ''}`}>
                              <div className="flex flex-col h-full">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-2">
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold uppercase tracking-wide">
                                      <AlertTriangle className="w-3 h-3" />
                                      {copy.challengeLabel}
                                    </div>
                                  </div>
                                  <div className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold">
                                    {index + 1}
                                  </div>
                                </div>

                                <div className="mb-auto space-y-3">
                                  <div className="flex items-start gap-2">
                                    <ChallengeIcon className="w-5 h-5 text-red-500 mt-0.5 shrink-0" strokeWidth={2} />
                                    <h3 className="text-xl font-bold leading-tight text-neutral-900">
                                      {challengeText.title}
                                    </h3>
                                  </div>
                                  {challengeText.description && (
                                    <p className="text-sm text-neutral-700 leading-relaxed">
                                      {challengeText.description}
                                    </p>
                                  )}
                                </div>

                                <div className="mt-4 pt-4 border-t border-neutral-200">
                                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all">
                                    {copy.flipToSolution}
                                    <ArrowRight className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Back Side - Solution */}
                            <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-2 border-primary bg-white p-6 shadow-2xl shadow-primary/10 ${!isFlipped ? 'pointer-events-none' : ''}`}>
                              <div className="flex flex-col h-full">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-2">
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide">
                                      <CheckCircle2 className="w-3 h-3" />
                                      {copy.solutionLabel}
                                    </div>
                                  </div>
                                  <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                                    {index + 1}
                                  </div>
                                </div>

                                <div className="mb-auto space-y-3">
                                  <div className="flex items-start gap-2">
                                    <SolutionIcon className="w-5 h-5 text-primary mt-0.5 shrink-0" strokeWidth={2} />
                                    <h3 className="text-xl font-bold leading-tight text-neutral-900">
                                      {solutionText.title}
                                    </h3>
                                  </div>
                                  {solutionText.description && (
                                    <p className="text-sm text-neutral-800 leading-relaxed">
                                      {solutionText.description}
                                    </p>
                                  )}
                                </div>

                              <div className="mt-4 pt-4 border-t border-primary/20">
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-sm transition-all">
                                  {copy.flipToChallenge}
                                  <RefreshCw className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            </div>

            {/* Mobile: Swipeable Carousel */}
            <div className="md:hidden">
              {/* Progress Indicator Mobile */}
              <div className="flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-neutral-100 border border-neutral-200 w-fit mx-auto">
                <span className="text-sm font-bold text-primary">{activeCardIndex + 1}</span>
                <span className="text-sm text-neutral-500">/</span>
                <span className="text-sm text-neutral-500">{pairCount}</span>
              </div>

              <div
                className="relative overflow-hidden"
                onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
                onTouchEnd={handleSwipe}
              >
                <div
                  className="flex transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${activeCardIndex * 100}%)` }}
                >
                  {Array.from({ length: pairCount }).map((_, index) => {
                    const challenge = struggles[index];
                    const solution = solutions[index];
                    const challengeText = splitCardText(challenge ?? '');
                    const solutionText = splitCardText(solution ?? '');
                    const isFlipped = flippedCards[index];
                    const ChallengeIcon = struggleIcons[index % struggleIcons.length];
                    const SolutionIcon = solutionIcons[index % solutionIcons.length];

                    if (!challenge || !solution) return null;

                    return (
                      <div key={index} className="w-full shrink-0 px-2">
                        <div className="perspective-1000">
                          <div
                            className={`relative w-full h-80 transition-transform duration-700 transform-style-3d cursor-pointer ${
                              isFlipped ? 'rotate-y-180' : ''
                            }`}
                            onClick={() => toggleCard(index)}
                          >
                            {/* Front Side - Challenge */}
                            <div className={`absolute inset-0 backface-hidden rounded-2xl border-2 border-neutral-200 bg-white p-6 shadow-lg ${isFlipped ? 'pointer-events-none' : ''}`}>
                              <div className="flex flex-col h-full">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-2">
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold uppercase tracking-wide">
                                      <AlertTriangle className="w-3 h-3" />
                                      {copy.challengeLabel}
                                    </div>
                                  </div>
                                  <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-bold">
                                    {index + 1}
                                  </div>
                                </div>

                                <div className="mb-auto space-y-3">
                                  <div className="flex items-start gap-2">
                                    <ChallengeIcon className="w-5 h-5 text-red-500 mt-0.5 shrink-0" strokeWidth={2} />
                                    <h3 className="text-xl font-bold leading-tight text-neutral-900">
                                      {challengeText.title}
                                    </h3>
                                  </div>
                                  {challengeText.description && (
                                    <p className="text-base text-neutral-700 leading-relaxed">
                                      {challengeText.description}
                                    </p>
                                  )}
                                </div>

                                <div className="mt-6 pt-5 border-t border-neutral-200">
                                  <button className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all">
                                    {copy.flipToSolution}
                                    <ArrowRight className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Back Side - Solution */}
                            <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-2 border-primary bg-white p-6 shadow-2xl shadow-primary/10 ${!isFlipped ? 'pointer-events-none' : ''}`}>
                              <div className="flex flex-col h-full">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-2">
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide">
                                      <CheckCircle2 className="w-3 h-3" />
                                      {copy.solutionLabel}
                                    </div>
                                  </div>
                                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                                    {index + 1}
                                  </div>
                                </div>

                                <div className="mb-auto space-y-3">
                                  <div className="flex items-start gap-2">
                                    <SolutionIcon className="w-5 h-5 text-primary mt-0.5 shrink-0" strokeWidth={2} />
                                    <h3 className="text-xl font-bold leading-tight text-neutral-900">
                                      {solutionText.title}
                                    </h3>
                                  </div>
                                  {solutionText.description && (
                                    <p className="text-base text-neutral-800 leading-relaxed">
                                      {solutionText.description}
                                    </p>
                                  )}
                                </div>

                                <div className="mt-6 pt-5 border-t border-primary/20">
                                  <button className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-sm transition-all">
                                    {copy.flipToChallenge}
                                    <RefreshCw className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Dots Navigation */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  {Array.from({ length: pairCount }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveCardIndex(index)}
                      className={`transition-all duration-300 ${
                        index === activeCardIndex ? 'w-8 h-2 bg-primary rounded-full' : 'w-2 h-2 bg-neutral-300 rounded-full'
                      }`}
                      aria-label={`Go to card ${index + 1}`}
                    />
                  ))}
                </div>
                <p className="text-center text-sm text-neutral-500 mt-3">{copy.swipeHint}</p>
              </div>
            </div>

            {/* Helper text desktop */}
            <div className="hidden md:block text-center mt-8">
              <p className="text-sm text-neutral-500">
                {locale === 'es' ? 'Usa las flechas para navegar y haz click en cada tarjeta para voltearla' : 'Use arrows to navigate and click each card to flip it'}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Case Study */}
      {caseTitle && caseDescription && (
        <section className="py-8 md:py-12 bg-neutral-900 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-semibold mb-2 border border-white/20">
                  <TrendingUp className="w-3 h-3" />
                  {copy.caseBadge}
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-4">{caseTitle}</h3>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-5 md:p-8 shadow-2xl">
                <p className="text-sm md:text-base text-white/90 leading-relaxed whitespace-pre-line mb-5">
                  {caseDescription.split('.').map((sentence, i) => {
                    if (i === 0) {
                      return <span key={i} className="font-bold">{sentence}.</span>;
                    }
                    return <span key={i}> {sentence}{i < caseDescription.split('.').length - 1 ? '.' : ''}</span>;
                  })}
                </p>

                <div className="h-px bg-white/20 my-4"></div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <p className="text-white/80 text-sm font-semibold mb-0.5">{copy.caseCtaTitle}</p>
                    <p className="text-white/60 text-xs">{copy.caseCtaDescription}</p>
                  </div>
                  <Button asChild size="default" className="bg-white text-neutral-900 hover:bg-neutral-100 shadow-xl group whitespace-nowrap">
                    <Link href="/contact" className="flex items-center gap-2">
                      {ctaButtonText}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA alternativo */}
      {(!caseTitle || !caseDescription) && (
        <section className="py-8 md:py-12 bg-primary text-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <Rocket className="w-12 h-12 mx-auto mb-3 opacity-90" strokeWidth={1.5} />
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">{copy.finalCtaTitle}</h2>
              <p className="text-base text-white/90 mb-5 leading-relaxed">{copy.finalCtaDescription}</p>
              <Button asChild size="default" className="bg-white text-neutral-900 hover:bg-neutral-100 shadow-xl group">
                <Link href="/contact" className="flex items-center gap-2">
                  {ctaButtonText}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CSS para 3D flip */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
