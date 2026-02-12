'use client';

import { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type ThemeName = 'ocean' | 'emerald' | 'indigo' | 'slate' | 'teal-navy' | 'graphite-cyan';

const THEMES: Array<{ value: ThemeName; label: string }> = [
  { value: 'ocean', label: 'Ocean' },
  { value: 'emerald', label: 'Emerald' },
  { value: 'indigo', label: 'Indigo' },
  { value: 'slate', label: 'Slate' },
  { value: 'teal-navy', label: 'Teal + Navy' },
  { value: 'graphite-cyan', label: 'Graphite + Cyan' },
];

const THEME_STORAGE_KEY = 'site-theme';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeName>('ocean');

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName | null;
    if (savedTheme && THEMES.some((item) => item.value === savedTheme)) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
      return;
    }
    document.documentElement.setAttribute('data-theme', 'ocean');
  }, []);

  const handleChange = (value: ThemeName) => {
    setTheme(value);
    document.documentElement.setAttribute('data-theme', value);
    localStorage.setItem(THEME_STORAGE_KEY, value);
  };

  return (
    <div className="inline-flex items-center gap-2 text-neutral-700">
      <Palette className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">Theme</span>
      <Select value={theme} onValueChange={(value) => handleChange(value as ThemeName)}>
        <SelectTrigger className="h-9 w-[170px]" aria-label="Select theme">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {THEMES.map((themeOption) => (
            <SelectItem key={themeOption.value} value={themeOption.value}>
              {themeOption.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
