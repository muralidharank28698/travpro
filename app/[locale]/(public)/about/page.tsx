"use client";

import { Link } from "@/navigation";
import { CheckCircle, ShieldCheck, Clock, CheckCircle2, HeartHandshake } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('About');
  
  const coreValues = [
    { title: t('values.safety'), description: t('values.safety_desc'), icon: ShieldCheck, color: "text-red-500", bg: "bg-red-50" },
    { title: t('values.reliability'), description: t('values.reliability_desc'), icon: Clock, color: "text-blue-500", bg: "bg-blue-50" },
    { title: t('values.transparency'), description: t('values.transparency_desc'), icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: t('values.comfort'), description: t('values.comfort_desc'), icon: CheckCircle, color: "text-purple-500", bg: "bg-purple-50" },
    { title: t('values.customer'), description: t('values.customer_desc'), icon: HeartHandshake, color: "text-amber-500", bg: "bg-amber-50" }
  ];

  return (
    <div className="py-20 px-6 sm:px-12 max-w-5xl mx-auto w-full animate-fade-in-up">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] mb-4">
          {t.rich('title', {
            span: (chunks) => <span className="text-[var(--color-primary)]">{chunks}</span>
          })}
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="card p-8 space-y-6">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">{t('vision.title')}</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            {t('vision.description')}
          </p>
        </div>
        <div className="card p-8 space-y-6">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">{t('mission.title')}</h2>
          <ul className="space-y-3 text-[var(--muted)]">
            {(t.raw('mission.list') as string[]).map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-[var(--foreground)] mb-12">{t('values.title')}</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {coreValues.map((value, idx) => (
            <div key={idx} className="card p-6 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
              <div className={`w-14 h-14 rounded-2xl ${value.bg} ${value.color} flex items-center justify-center mb-4`}>
                <value.icon className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg text-[var(--foreground)] mb-2">{value.title}</h3>
              <p className="text-sm text-[var(--muted)]">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-8 md:p-12 mb-12">
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8 text-center">{t('fleet.title')}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2">{t('fleet.hatchback')}</h3>
            <p className="text-[var(--muted)] text-sm mb-2">{t('fleet.hatchback_desc')}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">{t('fleet.suv')}</h3>
            <p className="text-[var(--muted)] text-sm mb-2">{t('fleet.suv_desc')}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">{t('fleet.group')}</h3>
            <p className="text-[var(--muted)] text-sm mb-2">{t('fleet.group_desc')}</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link href="/contact" className="premium-button py-4 px-10 text-lg shadow-lg">
          {t('contact')}
        </Link>
      </div>
    </div>
  );
}
