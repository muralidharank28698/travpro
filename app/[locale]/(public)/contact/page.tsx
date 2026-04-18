"use client";

import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('Contact');
  
  return (
    <div className="py-20 px-6 sm:px-12 max-w-4xl mx-auto w-full animate-fade-in-up">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] mb-4">
          {t.rich('title', {
            span: (chunks) => <span className="text-[var(--color-primary)]">{chunks}</span>
          })}
        </h1>
        <p className="text-lg text-[var(--muted)]">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="card p-8 space-y-8">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">{t('getintouch')}</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-[var(--foreground)]">{t('call')}</h3>
                <p className="text-[var(--muted)]">+91 94432 02669</p>
                <p className="text-xs text-[var(--muted-light)] mt-1 uppercase tracking-widest">{t('available')}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 border border-blue-500/20">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-[var(--foreground)]">{t('email')}</h3>
                <p className="text-[var(--muted)]">support@zytravo.com</p>
                <p className="text-xs text-[var(--muted-light)] mt-1 uppercase tracking-widest">{t('response')}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0 border border-purple-500/20">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-[var(--foreground)]">{t('office')}</h3>
                <p className="text-[var(--muted)]">{t('address')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-8">
          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[var(--foreground)]">{t('form.name')}</label>
              <input type="text" placeholder={t('form.placeholder_name')} className="form-input" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[var(--foreground)]">{t('form.email')}</label>
              <input type="email" placeholder={t('form.placeholder_email')} className="form-input" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[var(--foreground)]">{t('form.message')}</label>
              <textarea placeholder={t('form.placeholder_message')} className="form-input min-h-[120px] resize-none" required></textarea>
            </div>
            <button type="submit" className="premium-button w-full py-4 mt-4 shadow-xl shadow-black/10 hover:shadow-black/20">
              {t('form.submit')}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-20 text-center">
        <Link href="/" className="secondary-button py-3 px-8">
          {t('back')}
        </Link>
      </div>
    </div>
  );
}
