"use client";

import Link from "next/link";
import { useState } from "react";

const AIRPORTS = [
  { code: "PNY", name: "Puducherry Airport", dist: "Local" },
  { code: "MAA", name: "Chennai International Airport", dist: "160 km" },
  { code: "BLR", name: "Bangalore International Airport", dist: "310 km" },
  { code: "CJB", name: "Coimbatore International Airport", dist: "260 km" },
  { code: "TRZ", name: "Tiruchirappalli Airport", dist: "200 km" },
];

const PRICING = [
  { route: "Puducherry - Chennai (MAA)", vehicle: "Sedan (4 Seats)", oneWay: 2800, round: 5200 },
  { route: "Puducherry - Chennai (MAA)", vehicle: "SUV (6 Seats)", oneWay: 3500, round: 6500 },
  { route: "Puducherry - Bangalore (BLR)", vehicle: "Sedan (4 Seats)", oneWay: 5500, round: 10000 },
  { route: "Puducherry - Bangalore (BLR)", vehicle: "SUV (6 Seats)", oneWay: 7000, round: 13000 },
  { route: "Puducherry - Trichy (TRZ)", vehicle: "Sedan (4 Seats)", oneWay: 3200, round: 6000 },
  { route: "Puducherry Local (PNY)", vehicle: "Sedan (4 Seats)", oneWay: 500, round: 900 },
];

export default function AirportTransfersPage() {
  const [direction, setDirection] = useState<"drop" | "pickup">("drop");

  return (
    <div className="py-12 px-6 sm:px-12 max-w-7xl mx-auto w-full animate-fade-in-up">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] mb-4">
          Hassle-Free <span className="text-[var(--color-primary)]">Airport Transfers</span>
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
          Punctual pick-ups and drop-offs to all major airports across South India. We track your flight in real-time, ensuring zero wait times.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Quick Booking Form */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-6">Book Transfer</h2>
          
          <div className="flex bg-[var(--surface)] p-1 rounded-xl mb-6">
            <button 
              className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all ${direction === 'drop' ? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-[var(--foreground)]' : 'text-[var(--muted)] hover:text-[var(--foreground)]'}`}
              onClick={() => setDirection('drop')}
            >
              Drop to Airport 🛫
            </button>
            <button 
              className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all ${direction === 'pickup' ? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-[var(--foreground)]' : 'text-[var(--muted)] hover:text-[var(--foreground)]'}`}
              onClick={() => setDirection('pickup')}
            >
              Pick-up from Airport 🛬
            </button>
          </div>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); window.location.href = '/login'; }}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--foreground)]">Select Airport</label>
              <select className="form-input text-[var(--foreground)] bg-white">
                <option value="">Choose an airport...</option>
                {AIRPORTS.map(ai => <option key={ai.code} value={ai.code}>{ai.name} ({ai.code})</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--foreground)]">Date</label>
                <input type="date" className="form-input bg-white text-[var(--foreground)]" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--foreground)]">Time</label>
                <input type="time" className="form-input bg-white text-[var(--foreground)]" required />
              </div>
            </div>

            {direction === 'pickup' && (
              <div className="space-y-2 animate-fade-in-up">
                <label className="text-sm font-semibold text-[var(--foreground)]">Flight Number <span className="text-[var(--muted-light)]">(Optional)</span></label>
                <input type="text" placeholder="e.g. 6E-1234" className="form-input bg-white text-[var(--foreground)]" />
                <p className="text-xs text-[var(--muted-light)]">We'll track your flight and adjust pickup time automatically if delayed.</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--foreground)]">Vehicle Preference</label>
              <select className="form-input text-[var(--foreground)] bg-white">
                <option value="sedan">Sedan (4 Seats)</option>
                <option value="suv">SUV (6-7 Seats)</option>
                <option value="luxury">Luxury Car</option>
              </select>
            </div>

            <div className="pt-4">
              <button type="submit" className="premium-button w-full py-3.5 text-base">
                Proceed to Booking
              </button>
            </div>
          </form>
        </div>

        {/* Pricing Info */}
        <div className="space-y-8">
          <div className="card p-0 overflow-hidden">
            <div className="p-6 bg-[var(--surface)] border-b border-[var(--card-border)]">
              <h2 className="text-xl font-bold">Transparent Pricing</h2>
              <p className="text-sm text-[var(--muted)] mt-1">Pre-fixed rates. Zero surge pricing. Zero hidden fees.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#F8FAFC] text-[var(--muted)] uppercase text-xs font-semibold tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Route</th>
                    <th className="px-6 py-4">Vehicle</th>
                    <th className="px-6 py-4">One Way</th>
                    <th className="px-6 py-4">Round Trip</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--card-border)] text-[var(--foreground)]">
                  {PRICING.map((p, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium">{p.route}</td>
                      <td className="px-6 py-4 text-[var(--muted)]">{p.vehicle}</td>
                      <td className="px-6 py-4 font-semibold">₹{p.oneWay}</td>
                      <td className="px-6 py-4 font-semibold">₹{p.round}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 text-emerald-900 shadow-sm">
            <div className="flex gap-4">
              <span className="text-2xl">💡</span>
              <div>
                <h4 className="font-bold mb-1">Flight Delayed? No Problem.</h4>
                <p className="text-sm text-emerald-800 leading-relaxed">
                  For airport pick-ups, the first 60 minutes of waiting after your scheduled landing time are completely free. Our dispatch team monitors flight statuses in real time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
