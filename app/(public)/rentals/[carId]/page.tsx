"use client";

import { useParams } from "next/navigation";
import { MOCK_CARS } from "@/lib/mock-data";
import BookingForm from "@/components/booking/BookingForm";
import Link from "next/link";

export default function CarDetailPage() {
  const params = useParams();
  const carId = params.carId as string;
  const car = MOCK_CARS.find((c) => c.id === carId);

  if (!car) {
    return (
      <div className="py-24 px-6 text-center animate-fade-in-up">
        <h1 className="text-3xl font-bold mb-4">Vehicle Not Found</h1>
        <p className="text-[var(--muted)] mb-8">The car you're looking for doesn't exist.</p>
        <Link href="/rentals" className="premium-button inline-flex items-center gap-2">
          ← Back to Rentals
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-6 sm:px-12 max-w-7xl mx-auto w-full animate-fade-in-up">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--muted)] mb-10 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
        <span>/</span>
        <Link href="/rentals" className="hover:text-[var(--color-primary)]">Car Rentals</Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-semibold">{car.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Car Details Left */}
        <div className="space-y-8">
          <div className="relative h-[400px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
            <img 
              src={car.image} 
              alt={car.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6">
              <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[var(--color-primary)] font-bold text-sm shadow-lg">
                {car.type}
              </span>
            </div>
          </div>

          <div className="card p-8 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-black tracking-tight text-[var(--foreground)]">{car.name}</h1>
                <div className="flex items-center gap-1.5 bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-xl text-sm font-bold border border-yellow-100">
                  ⭐ {car.rating}
                </div>
              </div>
              <p className="text-[17px] text-[var(--muted)] leading-relaxed">
                {car.description}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Seats", val: `${car.seats} People`, icon: "👥" },
                { label: "Fuel", val: car.fuel, icon: "⛽" },
                { label: "Transmission", val: car.transmission, icon: "⚙️" },
                { label: "Trips", val: car.trips, icon: "🛣️" },
              ].map((spec) => (
                <div key={spec.label} className="bg-[var(--surface)] p-4 rounded-2xl flex flex-col items-center text-center">
                  <span className="text-xl mb-1">{spec.icon}</span>
                  <span className="text-xs text-[var(--muted-light)] font-bold uppercase tracking-wider">{spec.label}</span>
                  <span className="text-sm font-bold text-[var(--foreground)]">{spec.val}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-[var(--card-border)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--muted-light)] font-bold uppercase tracking-widest">Starting from</p>
                  <p className="text-2xl font-black text-[var(--color-primary)]">
                    ₹{car.pricePerDay.toLocaleString()} <span className="text-sm font-normal text-[var(--muted)] italic">per day</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block">Free Cancellation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form Right */}
        <div className="sticky top-28">
          <BookingForm carId={car.id} carName={car.name} pricePerDay={car.pricePerDay} />
          
          {/* Trust Badge Below Form */}
          <div className="mt-8 flex items-center justify-center gap-8 text-[var(--muted-light)] grayscale opacity-60">
            <div className="flex items-center gap-2 font-bold text-xs">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              SECURE BOOKING
            </div>
            <div className="flex items-center gap-2 font-bold text-xs">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              INSTANT CONFIRM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
