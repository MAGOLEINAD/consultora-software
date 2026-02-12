'use client';

import { useRouter } from '@/i18n/routing';
import { Languages } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = currentLocale === 'en' ? 'es' : 'en';
    const cleaned = pathname.replace(/^\/(en|es)(\/|$)/, '/');
    const targetPath = cleaned === '' ? '/' : cleaned;
    router.replace(targetPath, { locale: newLocale, scroll: false });
  };

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors cursor-pointer"
      aria-label={currentLocale === 'en' ? 'Cambiar a espanol' : 'Switch to English'}
    >
      <Languages className="w-4 h-4" />
      <span className="font-medium">{currentLocale === 'en' ? 'ES' : 'EN'}</span>
    </button>
  );
}

