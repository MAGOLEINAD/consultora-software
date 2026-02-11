import { Link } from '@/i18n/routing';
import { Linkedin, Twitter, Mail } from 'lucide-react';

interface FooterProps {
  locale: string;
  translations: {
    tagline: string;
    services: string;
    company: string;
    copyright: string;
  };
  navItems: {
    services: Array<{ href: string; label: string }>;
    company: Array<{ href: string; label: string }>;
  };
}

export default function Footer({ locale, translations, navItems }: FooterProps) {
  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--neutral-50))]">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))]" />
              <span className="text-lg font-bold text-[hsl(var(--foreground))]">
                Consultora Software
              </span>
            </div>
            <p className="text-sm text-[hsl(var(--neutral-800))] max-w-md mb-6">
              {translations.tagline}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--neutral-800))] hover:text-[hsl(var(--primary))] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--neutral-800))] hover:text-[hsl(var(--primary))] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={`mailto:contact@consultora-software.com`}
                className="text-[hsl(var(--neutral-800))] hover:text-[hsl(var(--primary))] transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm text-[hsl(var(--foreground))] mb-4">
              {translations.services}
            </h3>
            <ul className="space-y-3">
              {navItems.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[hsl(var(--neutral-800))] hover:text-[hsl(var(--primary))] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm text-[hsl(var(--foreground))] mb-4">
              {translations.company}
            </h3>
            <ul className="space-y-3">
              {navItems.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[hsl(var(--neutral-800))] hover:text-[hsl(var(--primary))] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[hsl(var(--border))]">
          <p className="text-sm text-[hsl(var(--neutral-800))] text-center">
            {translations.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
