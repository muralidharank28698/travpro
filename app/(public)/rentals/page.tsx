"use client";

import Link from "next/link";
import { MOCK_CARS } from "@/lib/mock-data";

export default function RentalsPage() {
  // Let's create some standard packages for the UI based on the documentation
  const packages = [
    { name: "Basic", hours: 8, km: 80, badge: "City Run" },
    { name: "Standard", hours: 12, km: 120, badge: "Full Day" },
  ];

  return (
    <div className="py-12 px-6 sm:px-12 max-w-7xl mx-auto w-full animate-fade-in-up">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] mb-4">
          Self-Drive & Chauffeur-Driven <span className="text-[var(--color-primary)]">Car Rentals</span>
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
          Choose from our wide range of well-maintained hatchbacks, sedans, and SUVs for your daily city run or weekend outstation trip.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {MOCK_CARS.filter(c => c.type !== 'Tempo Traveller').map((car) => (
          <div key={car.id} className="card overflow-hidden group hover:translate-y-[-4px] transition-all duration-300">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={car.image} 
                alt={car.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="badge badge-info bg-white/90 backdrop-blur-sm text-[var(--color-primary)]">
                  {car.type}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[var(--foreground)]">{car.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-[var(--muted)] mt-1">
                    <span>{car.seats} Seats</span>
                    <span>•</span>
                    <span>{car.fuel}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-sm font-semibold">
                  ⭐ {car.rating}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-3 bg-[var(--surface)] rounded-xl">
                  <p className="text-xs text-[var(--muted-light)] font-medium mb-1 uppercase tracking-wider">8 Hrs / 80 Km</p>
                  <p className="font-semibold text-[var(--foreground)]">₹{(car.pricePerDay * 0.6).toLocaleString()} <span className="text-sm font-normal text-[var(--muted)]">/ trip</span></p>
                </div>
                <div className="p-3 bg-[var(--surface)] rounded-xl">
                  <p className="text-xs text-[var(--muted-light)] font-medium mb-1 uppercase tracking-wider">12 Hrs / 120 Km</p>
                  <p className="font-semibold text-[var(--foreground)]">₹{car.pricePerDay.toLocaleString()} <span className="text-sm font-normal text-[var(--muted)]">/ trip</span></p>
                </div>
              </div>

              <Link href={`/rentals/${car.id}`} className="premium-button w-full">
                Book {car.name}
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* Features Section */}
      <div className="mt-20 border-t border-[var(--card-border)] pt-16">
        <h2 className="text-2xl font-bold text-center mb-10">Why Rent With Jayasree Travels?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center text-[var(--muted)]">
          <div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">🛡️</div>
            <h3 className="font-bold text-[var(--foreground)] mb-2">Completely Sanitized</h3>
            <p className="text-sm">Every vehicle undergoes deep cleaning and sanitization before handover.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">💸</div>
            <h3 className="font-bold text-[var(--foreground)] mb-2">Transparent Pricing</h3>
            <p className="text-sm">No hidden costs. Pay exactly what you see including GST and base tolls.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">📍</div>
            <h3 className="font-bold text-[var(--foreground)] mb-2">24/7 Roadside Assist</h3>
            <p className="text-sm">GPS enabled tracking and full 24/7 support throughout your journey.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
