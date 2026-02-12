'use client';

import { Link } from '@/i18n/routing';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from '@/components/ui/button';
import ThemeSwitcher from '@/components/shared/ThemeSwitcher';

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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm">
      <nav className="container mx-auto flex h-20 md:h-24 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-xl shadow-lg shadow-accent/30">
            <Image
              src="/images/logos/rightwaylogo.png"
              alt="RightWay logo"
              width={48}
              height={48}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="leading-tight">
            <span className="block text-xl md:text-2xl font-semibold text-accent">
              RightWay
            </span>
            <span className="block text-xs md:text-sm text-neutral-600 tracking-[0.2em] uppercase">
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
                  className="relative text-base md:text-lg font-semibold text-neutral-800 hover:text-primary transition-colors after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all group-hover:after:w-full"
                >
                  {item.label}
                </Link>
                <div className="absolute left-0 top-full pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all">
                  <div className="w-72 rounded-2xl border border-border bg-white shadow-xl p-4">
                    <div className="space-y-2">
                      {(item.href === '/solutions' ? solutions : services).map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block rounded-xl px-3 py-2 text-sm font-semibold text-accent hover:bg-neutral-100 transition-colors"
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
                className="relative text-base md:text-lg font-semibold text-neutral-800 hover:text-primary transition-colors after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* CTA and Language Switcher */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <ThemeSwitcher locale={locale} />
          <LanguageSwitcher currentLocale={locale} />
          <Button asChild size="default" className="text-base font-semibold hover:-translate-y-0.5 transition-transform">
            <Link href="/contact">{translations.contact}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-neutral-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={locale === 'es' ? 'Abrir menu' : 'Toggle menu'}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <div key={item.href}>
                {item.submenu ? (
                  <button
                    type="button"
                    className="w-full flex items-center justify-between rounded-xl px-2 py-3 text-base font-semibold text-neutral-900 transition-colors hover:bg-neutral-100"
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
                    <span className="text-lg leading-none text-neutral-600">
                      {openSubmenu === (item.href === '/solutions' ? 'solutions' : 'services') ? '-' : '+'}
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="block rounded-xl px-2 py-3 text-base font-semibold text-neutral-900 transition-colors hover:bg-neutral-100 hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
                {item.submenu && openSubmenu === (item.href === '/solutions' ? 'solutions' : 'services') && (
                  <div className="mt-1 space-y-1 pl-3 pb-2">
                    {(item.href === '/solutions' ? solutions : services).map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block rounded-lg px-2 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-border space-y-4">
              <ThemeSwitcher locale={locale} />
              <LanguageSwitcher currentLocale={locale} />
              <Button asChild className="w-full text-base font-semibold">
                <Link href="/contact">{translations.contact}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}




