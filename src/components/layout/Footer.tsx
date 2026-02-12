import { Link } from '@/i18n/routing';
import { Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

interface FooterProps {
  locale: string;
  translations: {
    tagline: string;
    services: string;
    company: string;
    quickLinks: string;
    getInTouch: string;
    address: string;
    email: string;
    phone: string;
    terms: string;
    privacy: string;
    copyright: string;
  };
  navItems: {
    services: Array<{ href: string; label: string }>;
    company: Array<{ href: string; label: string }>;
  };
}

export default function Footer({ locale, translations, navItems }: FooterProps) {
  const socialAriaLabel = locale === 'es' ? 'Enlace social' : 'Social link';
  return (
    <footer className="fexo-footer text-white">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-5">
              <div className="h-10 w-10 overflow-hidden rounded-xl">
                <Image
                  src="/images/logos/rightwaylogo.png"
                  alt="RightWay logo"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-lg font-semibold">RightWay</p>
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">Partners</p>
              </div>
            </div>
            <p className="text-sm text-white/70 max-w-sm mb-6">
              {translations.tagline}
            </p>
            <div className="flex items-center gap-3">
              {[Linkedin, Twitter, Mail].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white/50 transition-colors"
                  aria-label={socialAriaLabel}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-4">
              {translations.quickLinks}
            </h3>
            <span className="block h-0.5 w-10 bg-primary mb-6"></span>
            <ul className="space-y-3 text-sm text-white/70">
              {navItems.company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-4">
              {translations.services}
            </h3>
            <span className="block h-0.5 w-10 bg-primary mb-6"></span>
            <ul className="space-y-3 text-sm text-white/70">
              {navItems.services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-4">
              {translations.getInTouch}
            </h3>
            <span className="block h-0.5 w-10 bg-primary mb-6"></span>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>{translations.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-0.5" />
                <span>{translations.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-0.5" />
                <span>{translations.phone}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <p>{translations.copyright}</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">{translations.terms}</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">{translations.privacy}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

