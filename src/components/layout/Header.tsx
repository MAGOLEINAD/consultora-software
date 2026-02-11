'use client';

import { Link } from '@/i18n/routing';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  locale: string;
  translations: {
    home: string;
    services: string;
    about: string;
    caseStudies: string;
    contact: string;
  };
}

export default function Header({ locale, translations }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: translations.home },
    { href: '/services', label: translations.services },
    { href: '/about', label: translations.about },
    { href: '/case-studies', label: translations.caseStudies },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[hsl(var(--border))] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))]" />
          <span className="text-lg font-bold text-[hsl(var(--foreground))]">
            Consultora
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[hsl(var(--neutral-800))] hover:text-[hsl(var(--primary))] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA and Language Switcher */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <LanguageSwitcher currentLocale={locale} />
          <Button asChild size="sm">
            <Link href="/contact">{translations.contact}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-[hsl(var(--neutral-800))]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[hsl(var(--border))] bg-white">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm font-medium text-[hsl(var(--neutral-800))] hover:text-[hsl(var(--primary))] py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-[hsl(var(--border))] space-y-4">
              <LanguageSwitcher currentLocale={locale} />
              <Button asChild className="w-full">
                <Link href="/contact">{translations.contact}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
