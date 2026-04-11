"use client";

import Link from "next/link";
import { CheckCircle, ShieldCheck, Clock, CheckCircle2, HeartHandshake } from "lucide-react";

export default function AboutPage() {
  const coreValues = [
    { title: "Safety", description: "Safety of passengers is our top priority at all times", icon: ShieldCheck, color: "text-red-500", bg: "bg-red-50" },
    { title: "Reliability", description: "On-time pick-up and drop — we always keep our promises", icon: Clock, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Transparency", description: "Clear pricing, no hidden costs or last-minute surprises", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Comfort", description: "Clean, air-conditioned, well-maintained vehicles", icon: CheckCircle, color: "text-purple-500", bg: "bg-purple-50" },
    { title: "Customer First", description: "Every decision is made with the customer in mind", icon: HeartHandshake, color: "text-amber-500", bg: "bg-amber-50" }
  ];

  return (
    <div className="py-20 px-6 sm:px-12 max-w-5xl mx-auto w-full animate-fade-in-up">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] mb-4">
          About <span className="text-[var(--color-primary)]">Zytravo Trvls</span>
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
          Your trusted travel partner in Puducherry, delivering safe, reliable, and comfortable travel experiences.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="card p-8 space-y-6">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Our Vision</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            To be the most trusted and preferred travel partner in Puducherry and across South India, delivering world-class travel experiences with safety, comfort, and reliability.
          </p>
        </div>
        <div className="card p-8 space-y-6">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Our Mission</h2>
          <ul className="space-y-3 text-[var(--muted)]">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span>Provide safe and comfortable travel solutions for every journey.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span>Maintain a fleet of modern, well-maintained vehicles.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span>Offer transparent pricing with no hidden charges.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span>Deliver exceptional customer service at every touchpoint.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-[var(--foreground)] mb-12">Our Core Values</h2>
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
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8 text-center">Our Modern Fleet</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2">Hatchbacks & Sedans</h3>
            <p className="text-[var(--muted)] text-sm mb-2">Swift, i10, Dzire, Xcent (4 Pax)</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Comfort SUVs</h3>
            <p className="text-[var(--muted)] text-sm mb-2">Innova, Ertiga, Scorpio (6-7 Pax)</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Group Travel</h3>
            <p className="text-[var(--muted)] text-sm mb-2">Tempo Traveller (12-15 Pax) & Mini Bus</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link href="/contact" className="premium-button py-4 px-10 text-lg shadow-lg">
          Contact Us Today
        </Link>
      </div>
    </div>
  );
}
