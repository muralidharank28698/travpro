"use client";

import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFound');
  
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center animate-fade-in-up">
      <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center text-4xl mb-8 shadow-sm">
        🧭
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] mb-4">
        {t.rich('title', {
          span: (chunks) => <span className="text-rose-500">{chunks}</span>
        })}
      </h1>
      <p className="text-lg text-[var(--muted)] max-w-md mx-auto mb-10">
        {t('subtitle')}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="premium-button py-3 px-8 shadow-lg shadow-emerald-50">
          {t('home')}
        </Link>
        <button 
          onClick={() => window.history.back()} 
          className="secondary-button py-3 px-8"
        >
          {t('back')}
        </button>
      </div>

      <div className="mt-16 pt-8 border-t border-[var(--card-border)] w-full max-w-sm">
        <p className="text-sm text-[var(--muted-light)] font-medium mb-4 uppercase tracking-widest">{t('help')}</p>
        <Link href="/contact" className="text-[var(--color-primary)] font-bold hover:underline">
          {t('contact')}
        </Link>
      </div>
    </div>
  );
}
