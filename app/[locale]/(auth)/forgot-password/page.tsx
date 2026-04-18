"use client";

import { useState } from "react";
import { Link } from "@/navigation";
import { ArrowLeft, Mail, ChevronRight, CheckCircle2 } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function ForgotPasswordPage() {
  const t = useTranslations('Auth.forgot');
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--background)]">
      <div className="max-w-md w-full animate-fade-in-up">
        <Link 
          href="/login" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('back')}
        </Link>

        <div className="card p-10 shadow-2xl border-border/40">
          {!isSubmitted ? (
            <div className="space-y-8">
              <div className="space-y-3">
                <h1 className="text-3xl font-black tracking-tight text-[var(--foreground)]">
                  {t.rich('title', {
                    span: (chunks) => <span className="text-[var(--color-primary)]">{chunks}</span>
                  })}
                </h1>
                <p className="text-[var(--muted)] font-medium leading-relaxed">
                  {t('subtitle')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-black text-[var(--muted-light)]">{t('email')}</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                    <input 
                      type="email" 
                      required 
                      placeholder="e.g. john@example.com"
                      className="form-input !pl-12 h-14" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="premium-button w-full py-4 text-lg tracking-tight group"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {t('submit')}
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </button>
              </form>

              <div className="text-center pt-4">
                <p className="text-sm text-[var(--muted)]">
                  {t('remember')}{" "}
                  <Link href="/login" className="text-[var(--color-primary)] font-bold hover:underline">
                    {t('login')}
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-8 py-4 animate-scale-in">
              <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-3xl mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <div className="space-y-3">
                <h2 className="text-2xl font-black text-[var(--foreground)] tracking-tight">{t('success_title')}</h2>
                <p className="text-[var(--muted)] leading-relaxed font-medium">
                  {t('success_msg')}<br/>
                  <span className="text-[var(--foreground)] font-bold">{email}</span>
                </p>
              </div>

              <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-xs text-amber-600 dark:text-amber-500 leading-relaxed">
                {t('spam_notice')}
              </div>

              <button 
                onClick={() => setIsSubmitted(false)}
                className="secondary-button w-full py-4"
              >
                {t('try_again')}
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 text-center text-[var(--muted-light)] text-xs font-bold uppercase tracking-[0.2em]">
          {t('powered')}
        </div>
      </div>
    </div>
  );
}
