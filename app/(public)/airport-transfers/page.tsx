"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import CustomSelect from "@/components/common/CustomSelect";
import DatePicker from "@/components/common/DatePicker";
import TimePicker from "@/components/common/TimePicker";

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
  const router = useRouter();
  const [direction, setDirection] = useState<"drop" | "pickup">("drop");
  const [loading, setLoading] = useState(true);
  const [selectedAirport, setSelectedAirport] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("sedan");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const airportOptions = AIRPORTS.map(ai => ({
    value: ai.code,
    label: `${ai.name} (${ai.code})`,
    description: `Distance: ${ai.dist}`
  }));

  const vehicleOptions = [
    { value: "sedan", label: "Sedan (4 Seats)", description: "Comfortable for 1-4 people" },
    { value: "suv", label: "SUV (6-7 Seats)", description: "Premium space for families" },
    { value: "luxury", label: "Luxury Car", description: "Premium, chauffeur-driven experience" },
  ];

  useEffect(() => {
    let mounted = true;

    async function checkUser() {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session && mounted) {
          router.push("/login?redirectTo=/airport-transfers");
          return;
        }

        const { data: { user }, error } = await supabase.auth.getUser();
        
        if ((error || !user) && mounted) {
          router.push("/login?redirectTo=/airport-transfers");
        } else if (mounted) {
          setLoading(false);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        if (mounted) {
          router.push("/login?redirectTo=/airport-transfers");
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
        <h2 className="text-xl font-black text-foreground tracking-tight">Securing your session...</h2>
        <p className="text-sm font-medium text-[var(--muted-light)] mt-2 uppercase tracking-widest">Preparing your transfer request</p>
      </div>
    );
  }

  return (
    <div className="py-4 sm:py-16 px-3 sm:px-12 max-w-7xl mx-auto w-full animate-fade-in-up">
      {/* Page Header */}
      <div className="mb-6 md:mb-16 text-center space-y-2 md:space-y-4">
        <h1 className="text-xl sm:text-3xl md:text-5xl font-black tracking-tight text-[var(--foreground)]">
          Hassle-Free <span className="text-[var(--color-primary)]">Airport Transfers</span>
        </h1>
        <p className="text-xs sm:text-base md:text-lg text-[var(--muted)] max-w-2xl mx-auto px-4 font-medium leading-relaxed">
          Punctual pick-ups and drop-offs to all major airports. We track your flight in real-time.
        </p>
      </div>

      <div className="grid xl:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Quick Booking Form */}
        <div className="card p-4 sm:p-10 shadow-2xl border-border/60 bg-card/60 backdrop-blur-xl group overflow-hidden">
          <div className="flex items-center gap-4 mb-5 md:mb-8">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
              <span className="text-xl md:text-2xl">🚗</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight">Book Transfer</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row bg-[var(--surface)] p-1 rounded-xl mb-5 md:mb-8 gap-1">
            <button 
              className={`flex-1 py-2.5 px-4 text-[11px] sm:text-sm font-black rounded-lg transition-all duration-300 ${direction === 'drop' ? 'bg-card shadow-lg text-[var(--foreground)]' : 'text-[var(--muted)] hover:text-[var(--foreground)]'}`}
              onClick={() => setDirection('drop')}
            >
              Drop to Airport 🛫
            </button>
            <button 
              className={`flex-1 py-2.5 px-4 text-[11px] sm:text-sm font-black rounded-lg transition-all duration-300 ${direction === 'pickup' ? 'bg-card shadow-lg text-[var(--foreground)]' : 'text-[var(--muted)] hover:text-[var(--foreground)]'}`}
              onClick={() => setDirection('pickup')}
            >
              Pick-up from Airport 🛬
            </button>
          </div>

          <form className="space-y-4 md:space-y-8" onSubmit={(e) => { e.preventDefault(); alert("Booking system coming soon!"); }}>
              <div className="space-y-1.5">
                <label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black text-[var(--muted-light)] ml-1">Select Airport</label>
                <CustomSelect
                  options={airportOptions}
                  value={selectedAirport}
                  onChange={setSelectedAirport}
                  placeholder="Choose an airport..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5">
                  <label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black text-[var(--muted-light)] ml-1">Travel Date</label>
                  <DatePicker
                    value={selectedDate}
                    onChange={setSelectedDate}
                    placeholder="Select date"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black text-[var(--muted-light)] ml-1">Pickup Time</label>
                  <TimePicker
                    value={selectedTime}
                    onChange={setSelectedTime}
                    placeholder="Select time"
                    required
                  />
                </div>
              </div>

              {direction === 'pickup' && (
                <div className="space-y-2 animate-fade-in-up">
                  <label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black text-[var(--muted-light)] ml-1">
                    Flight Number <span className="opacity-50">(Optional)</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="6E-1234" 
                    className="form-input h-12 md:h-14 bg-surface/30 border-border/50 focus:bg-card focus:border-primary transition-all text-sm font-medium" 
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black text-[var(--muted-light)] ml-1">Vehicle Preference</label>
                <CustomSelect
                  options={vehicleOptions}
                  value={selectedVehicle}
                  onChange={setSelectedVehicle}
                  placeholder="Select vehicle type..."
                />
              </div>


            <div className="pt-6">
              <button type="submit" className="premium-button w-full py-5 text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]">
                Proceed to Booking
              </button>
            </div>
          </form>
        </div>

        {/* Pricing & Info Section */}
        <div className="space-y-8 lg:space-y-12">
          {/* Pricing Table Card */}
          <div className="card p-0 overflow-hidden shadow-2xl border-border/60">
            <div className="p-5 sm:p-8 bg-surface/80 border-b border-border/60 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">📊</span>
                <h2 className="text-xl font-black tracking-tight text-foregroundcaps">Transparent Pricing</h2>
              </div>
              <p className="text-[10px] sm:text-sm text-[var(--muted)] font-medium">Pre-fixed rates. Zero surge pricing. Zero hidden fees.</p>
            </div>

            {/* Mobile List View (Hidden on Tablet/Desktop) */}
            <div className="block sm:hidden divide-y divide-border/40">
              {PRICING.map((p, i) => (
                <div key={i} className="p-4 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-xs font-black text-foreground">{p.route}</span>
                    <span className="text-[10px] font-bold text-primary shrink-0 bg-primary/10 px-2 py-0.5 rounded-full">One Way</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-medium text-[var(--muted)]">{p.vehicle}</span>
                    <div className="text-right">
                      <div className="text-sm font-black text-foreground">₹{p.oneWay}</div>
                      <div className="text-[9px] font-bold text-[var(--muted-light)]">Round: ₹{p.round}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View (Hidden on Mobile) */}
            <div className="hidden sm:block overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-sm" style={{ minWidth: "600px" }}>
                <thead className="bg-surface/50 text-[var(--muted-light)] uppercase text-[10px] font-black tracking-[0.2em] whitespace-nowrap">
                  <tr>
                    <th className="px-8 py-5 border-b border-border/40">Route</th>
                    <th className="px-8 py-5 border-b border-border/40">Vehicle</th>
                    <th className="px-8 py-5 border-b border-border/40 text-right">One Way</th>
                    <th className="px-8 py-5 border-b border-border/40 text-right">Round Trip</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 text-foreground font-medium">
                  {PRICING.map((p, i) => (
                    <tr key={i} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-8 py-5 group-hover:text-primary transition-colors">{p.route}</td>
                      <td className="px-8 py-5 text-[var(--muted)]">{p.vehicle}</td>
                      <td className="px-8 py-5 text-right font-black">₹{p.oneWay}</td>
                      <td className="px-8 py-5 text-right font-black">₹{p.round}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tips Card */}
          <div className="bg-card/40 backdrop-blur-xl border border-border/60 rounded-[2.5rem] p-8 sm:p-10 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="text-6xl">✨</span>
            </div>
            <div className="flex gap-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 shrink-0">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h4 className="text-xl font-black mb-3 tracking-tight text-foreground">Flight Delayed? No Problem.</h4>
                <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed font-medium">
                  For airport pick-ups, the first 60 minutes of waiting after your scheduled landing time are completely free. 
                  Our dispatch team monitors flight statuses in real time, so you never have to worry about delays.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
