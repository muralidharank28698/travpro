"use client";

import { useActionState, useState, useEffect } from "react";
import { createBooking } from "@/lib/actions/booking";
import { createClient } from "@/lib/supabase/client";

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

  // Still fetch user to pre-fill names
  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
    getUser();
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

  return (
    <div className="animate-fade-in-up">
      <div className="card p-8 border-t-4 border-t-[var(--color-primary)] shadow-2xl">
        <div className="space-y-2 mb-8">
          <h2 className="text-2xl font-black tracking-tight text-slate-800">
            Book this vehicle
          </h2>
          <p className="text-sm font-medium text-slate-500">
            Secure your rental with Zytravo Trvls in just a few clicks.
          </p>
        </div>

        <form action={action} className="space-y-6">
          <input type="hidden" name="carId" value={carId} />
          
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">
              Booking Agent / Name
            </label>
            <div className="relative">
              <input
                name="userName"
                type="text"
                defaultValue={user?.user_metadata?.full_name || ""}
                placeholder="Your Name"
                className="form-input !pl-12"
                required
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">👤</span>
            </div>
          </div>

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
                Confirm Reservation <span>→</span>
              </>
            )}
          </button>
          
          <p className="text-[11px] text-center text-slate-400 font-medium uppercase tracking-widest leading-relaxed">
            Your booking will appear in your dashboard instantly.
          </p>
        </form>
      </div>
    </div>
  );
}



