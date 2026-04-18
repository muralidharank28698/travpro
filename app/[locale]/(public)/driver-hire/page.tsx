"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@/navigation";
import { createClient } from "@/lib/supabase/client";
import { useTranslations } from 'next-intl';

const DRIVER_PACKAGES = [
  { id: 1, name: "Half Day City", dur: "4 Hours", coverage: "Local City Only", price: 400, icon: "⏱️" },
  { id: 2, name: "Full Day City", dur: "8 Hours / 80 KM", coverage: "City + Nearby", price: 700, icon: "☀️" },
  { id: 3, name: "Outstation", dur: "Per Day", coverage: "Any Location", price: 900, note: "+ Driver Allowance", icon: "🛣️" },
  { id: 4, name: "Weekly Commute", dur: "7 Days", coverage: "City Use", price: 4500, icon: "📅" },
  { id: 5, name: "Monthly Retainer", dur: "30 Days", coverage: "City Use", price: 16000, icon: "💼" },
];

export default function DriverHirePage() {
  const t = useTranslations('DriverHire');
  const d = useTranslations('Dashboard.auth');
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkUser() {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session && mounted) {
          router.push("/login?redirectTo=/driver-hire");
          return;
        }

        const { data: { user }, error } = await supabase.auth.getUser();
        
        if ((error || !user) && mounted) {
          router.push("/login?redirectTo=/driver-hire");
        } else if (mounted) {
          setLoading(false);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        if (mounted) {
          router.push("/login?redirectTo=/driver-hire");
        }
      }
    }

    checkUser();
    return () => { mounted = false; };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center animate-fade-in-up">
        <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-black text-foreground tracking-tight">{t('securing')}</h2>
        <p className="text-sm font-medium text-[var(--muted-light)] mt-2 uppercase tracking-widest">{t('preparing')}</p>
      </div>
    );
  }

  return (
    <div className="py-12 px-6 sm:px-12 max-w-7xl mx-auto w-full animate-fade-in-up">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] mb-4">
          {t.rich('title', {
            span: (chunks) => <span className="text-[var(--color-primary)]">{chunks}</span>
          })}
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {DRIVER_PACKAGES.map((pkg, i) => (
          <div key={pkg.id} className="card p-8 group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-col justify-between bg-gradient-to-b from-background to-card" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="relative z-10 flex flex-col items-start gap-4 mb-8">
              <div className="w-14 h-14 bg-surface rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-border group-hover:scale-110 transition-transform duration-300">
                {pkg.icon}
              </div>
              <h3 className="text-2xl font-black text-[var(--foreground)] tracking-tight">{pkg.name}</h3>
              <div className="flex flex-col gap-3 w-full mt-4">
                <div className="flex justify-between items-center text-sm py-2 border-b border-border/50">
                  <span className="text-[var(--muted)] font-medium">{t('duration')}</span>
                  <span className="font-bold text-[var(--foreground)]">{pkg.dur}</span>
                </div>
                <div className="flex justify-between items-center text-sm py-2">
                  <span className="text-[var(--muted)] font-medium">{t('coverage')}</span>
                  <span className="font-bold text-[var(--foreground)]">{pkg.coverage}</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-[var(--card-border)] mt-auto flex items-end justify-between">
              <div>
                <p className="text-[10px] text-[var(--muted-light)] uppercase tracking-widest font-black mb-1">{t('starting')}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-[var(--foreground)]">₹{pkg.price.toLocaleString()}</span>
                  {pkg.note && <span className="text-[10px] text-[var(--muted)] font-bold">{pkg.note}</span>}
                </div>
              </div>
              <button
                onClick={() => alert("Chauffeur booking starting...")}
                className="premium-button px-6 py-3 text-xs shadow-none hover:shadow-lg transition-all"
              >
                {t('hire')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Qualifications Section */}
      <div className="bg-surface border border-border rounded-[2rem] p-8 sm:p-12 mt-20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-foreground mb-6">{t('standard.title')}</h2>
            <p className="text-muted leading-relaxed text-lg">
              {t('standard.subtitle')}
            </p>
            <ul className="grid sm:grid-cols-2 gap-y-4 gap-x-8 text-sm font-bold">
              <li className="flex items-center gap-3 text-foreground">
                <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-[10px]">✓</span>
                {t('standard.license')}
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-[10px]">✓</span>
                {t('standard.exp')}
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-[10px]">✓</span>
                {t('standard.verified')}
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-[10px]">✓</span>
                {t('standard.trained')}
              </li>
            </ul>
          </div>

          <div className="w-full lg:w-1/3 bg-card p-8 rounded-2xl border border-border text-center shadow-xl">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-emerald-500/20 text-white">
              🛡️
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{t('standard.safe.title')}</h3>
            <p className="text-sm text-muted">{t('standard.safe.description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
