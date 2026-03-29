"use client";

import { useActionState, useState, useEffect } from "react";
import { createBooking } from "@/lib/actions/booking";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface BookingFormProps {
  carId: string;
  carName: string;
  pricePerDay?: number;
}

export default function BookingForm({ carId, carName, pricePerDay = 2500 }: BookingFormProps) {
  const [state, action, isPending] = useActionState(createBooking, {
    error: "",
  });

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [daysCount, setDaysCount] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Check auth state
  useEffect(() => {
    async function checkUser() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoadingAuth(false);
    }
    checkUser();
  }, []);

  useEffect(() => {
    if (startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      
      if (end > start) {
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysCount(diffDays);
        setTotalPrice(diffDays * pricePerDay * 1.05); // Base + 5% GST
      } else {
        setDaysCount(0);
        setTotalPrice(0);
      }
    }
  }, [startTime, endTime, pricePerDay]);

  if (loadingAuth) {
    return (
      <div className="card p-12 flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Securing Connection...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <div className="card p-8 border-t-4 border-t-[var(--color-primary)] shadow-2xl">
        <div className="space-y-2 mb-8">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-black tracking-tight text-slate-800">
              Book this vehicle
            </h2>
            {!user && (
              <span className="bg-amber-100 text-amber-700 text-[10px] font-black uppercase px-2 py-1 rounded-md tracking-tighter">
                Guest Mode
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-slate-500">
            {user ? "Confirm your dates to finalize the booking." : "No account? No problem. Book as a guest now."}
          </p>
        </div>

        <form action={action} className="space-y-6">
          <input type="hidden" name="carId" value={carId} />
          
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">
              {user ? "Booking Agent" : "Full Name"}
            </label>
            <div className="relative">
              <input
                name="userName"
                type="text"
                defaultValue={user?.user_metadata?.full_name || ""}
                placeholder="Rajesh Kumar"
                className="form-input !pl-12"
                required
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">👤</span>
            </div>
          </div>

          {!user && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-fade-in-up">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    name="userEmail"
                    type="email"
                    placeholder="rajesh@example.com"
                    className="form-input !pl-12"
                    required
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">✉️</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    name="userPhone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="form-input !pl-12"
                    required
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">📞</span>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">
                Pickup Date & Time
              </label>
              <input
                name="startTime"
                type="datetime-local"
                className="form-input"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">
                Return Date & Time
              </label>
              <input
                name="endTime"
                type="datetime-local"
                className="form-input"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Pricing Summary */}
          {daysCount > 0 && (
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 animate-fade-in-up">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-emerald-800 font-medium">Daily Rate (x {daysCount} Days)</span>
                <span className="text-emerald-900 font-bold">₹{(daysCount * pricePerDay).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm mb-3 pb-3 border-b border-emerald-200/50">
                <span className="text-emerald-800 font-medium">GST & Fees (5%)</span>
                <span className="text-emerald-900 font-bold">₹{(totalPrice - (daysCount * pricePerDay)).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-base font-black text-emerald-950">Total Amount</span>
                <span className="text-xl font-black text-[var(--color-primary)]">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>
          )}

          {state?.error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-bold text-center animate-shake">
              ⚠️ {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full premium-button py-4 text-base font-bold shadow-[0_15px_30px_rgba(5,150,105,0.25)] flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
          >
            {isPending ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Checking Security...
              </>
            ) : (
              <>
                {user ? "Confirm Reservation" : "Book as Guest"} <span>→</span>
              </>
            )}
          </button>
          
          <p className="text-[11px] text-center text-slate-400 font-medium uppercase tracking-widest leading-relaxed">
            {user 
              ? "Your booking will appear in your dashboard instantly." 
              : "No login required. We will send details to your email."}
          </p>
        </form>
      </div>
    </div>
  );
}


