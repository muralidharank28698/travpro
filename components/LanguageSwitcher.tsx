"use client";

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { useState, useRef, useEffect } from 'react';

const languages = [
  { code: 'en', name: 'English', label: 'US' },
  { code: 'fr', name: 'Français', label: 'FR' },
  { code: 'es', name: 'Español', label: 'ES' },
];

export function LanguageSwitcher() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    setIsOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface/50 border border-border backdrop-blur-md hover:bg-surface transition-all duration-300 group"
      >
        <span className="text-xs font-bold text-foreground/80">{currentLanguage.label}</span>
        <svg
          className={`w-3.5 h-3.5 text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border overflow-hidden animate-fade-in-up z-50">
          <div className="p-2 space-y-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                  locale === lang.code
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-muted hover:bg-surface hover:text-foreground font-medium'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`text-[10px] font-black w-5 tracking-tighter ${locale === lang.code ? 'text-primary' : 'text-muted-light'}`}>{lang.label}</span>
                  <span className="leading-none">{lang.name}</span>
                </div>
                {locale === lang.code && (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
