'use client';

import { useRouter, usePathname } from '@/i18n/routing';
import { Languages } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const switchLocale = () => {
    const newLocale = currentLocale === 'en' ? 'es' : 'en';
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: newLocale }
    );
  };

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-[hsl(var(--muted))] transition-colors"
      aria-label={`Switch to ${currentLocale === 'en' ? 'Spanish' : 'English'}`}
    >
      <Languages className="w-4 h-4" />
      <span className="font-medium">{currentLocale === 'en' ? 'ES' : 'EN'}</span>
    </button>
  );
}
