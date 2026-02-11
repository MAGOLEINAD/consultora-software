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
    solutions: string;
    about: string;
    contact: string;
  };
  solutions: Array<{ href: string; label: string }>;
  services: Array<{ href: string; label: string }>;
}

export default function Header({ locale, translations, solutions, services }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<'solutions' | 'services' | null>(null);

  const navItems = [
    { href: '/', label: translations.home },
    { href: '/solutions', label: translations.solutions, submenu: true },
    { href: '/services', label: translations.services, submenu: true },
    { href: '/about', label: translations.about },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[hsl(var(--border))] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm">
      <nav className="container mx-auto flex h-20 md:h-24 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-[hsl(var(--accent))] text-white flex items-center justify-center shadow-lg shadow-[hsl(var(--accent))]/30">
            <svg viewBox="0 0 40 40" className="h-7 w-7 md:h-8 md:w-8" aria-hidden="true">
              <defs>
                <linearGradient id="rw-iso" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#ffd1c2" />
                </linearGradient>
              </defs>
              <circle cx="20" cy="20" r="18" fill="url(#rw-iso)" opacity="0.22" />
              <path
                d="M12 28 V12 H21 C25 12 28 15 28 19 C28 22 26 24 23 25 L28 28 H22 L18 24 H16 V28 Z
                   M16 16 V20 H20 C22 20 23 19 23 18 C23 17 22 16 20 16 Z"
                fill="#ffffff"
              />
              <circle cx="28" cy="12" r="3" fill="#ffffff" />
            </svg>
          </div>
          <div className="leading-tight">
            <span className="block text-xl md:text-2xl font-semibold text-[hsl(var(--accent))]">
              RightWay
            </span>
            <span className="block text-xs md:text-sm text-[hsl(var(--neutral-600))] tracking-[0.2em] uppercase">
              Partners
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-10">
          {navItems.map((item) =>
            item.submenu ? (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="relative text-base md:text-lg font-semibold text-[hsl(var(--neutral-800))] hover:text-[hsl(var(--primary))] transition-colors after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-[hsl(var(--primary))] after:transition-all group-hover:after:w-full"
                >
                  {item.label}
                </Link>
                <div className="absolute left-0 top-full pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all">
                  <div className="w-72 rounded-2xl border border-[hsl(var(--border))] bg-white shadow-xl p-4">
                    <div className="space-y-2">
                      {(item.href === '/solutions' ? solutions : services).map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block rounded-xl px-3 py-2 text-sm font-semibold text-[hsl(var(--accent))] hover:bg-[hsl(var(--neutral-100))] transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-base md:text-lg font-semibold text-[hsl(var(--neutral-800))] hover:text-[hsl(var(--primary))] transition-colors after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-[hsl(var(--primary))] after:transition-all hover:after:w-full"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* CTA and Language Switcher */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <LanguageSwitcher currentLocale={locale} />
          <Button asChild size="sm" className="hover:-translate-y-0.5 transition-transform">
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
              <div key={item.href}>
                {item.submenu ? (
                  <button
                    type="button"
                    className="w-full flex items-center justify-between text-sm font-medium text-[hsl(var(--neutral-800))] py-2"
                    onClick={() =>
                      setOpenSubmenu((prev) =>
                        prev === (item.href === '/solutions' ? 'solutions' : 'services')
                          ? null
                          : item.href === '/solutions'
                            ? 'solutions'
                            : 'services'
                      )
                    }
                  >
                    {item.label}
                    <span className="text-[hsl(var(--neutral-600))]">
                      {openSubmenu === (item.href === '/solutions' ? 'solutions' : 'services') ? '–' : '+'}
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="block text-sm font-medium text-[hsl(var(--neutral-800))] hover:text-[hsl(var(--primary))] py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
                {item.submenu && openSubmenu === (item.href === '/solutions' ? 'solutions' : 'services') && (
                  <div className="pl-4 pb-2">
                    {(item.href === '/solutions' ? solutions : services).map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block text-xs text-[hsl(var(--neutral-600))] hover:text-[hsl(var(--primary))] py-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
