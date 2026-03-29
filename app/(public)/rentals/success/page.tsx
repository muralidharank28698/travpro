"use client";

import Link from "next/link";

export default function GuestSuccessPage() {
  return (
    <div className="py-24 px-6 max-w-2xl mx-auto text-center animate-fade-in-up">
      <div className="w-24 h-24 bg-emerald-100 text-[3rem] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
        ✅
      </div>
      
      <h1 className="text-4xl font-black tracking-tight text-slate-800 mb-4">
        Booking Request <span className="text-[var(--color-primary)]">Received!</span>
      </h1>
      
      <p className="text-lg text-slate-600 mb-10 leading-relaxed">
        Thank you for choosing Zytravo Trvls. We've received your guest booking request and our team will contact you shortly for confirmation.
      </p>

      <div className="card p-8 border-2 border-dashed border-slate-200 bg-slate-50/50 mb-12">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">What's Next?</h2>
        <ul className="text-left space-y-4">
          <li className="flex gap-3 text-slate-700">
            <span className="text-emerald-600 font-bold">1.</span>
            <span>Check your email for a summary of your trip details.</span>
          </li>
          <li className="flex gap-3 text-slate-700">
            <span className="text-emerald-600 font-bold">2.</span>
            <span>Our executive will call you within 30 minutes to confirm vehicle availability.</span>
          </li>
          <li className="flex gap-3 text-slate-700">
            <span className="text-emerald-600 font-bold">3.</span>
            <span>Once confirmed, you'll receive the driver details 2 hours before pickup.</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/rentals" className="premium-button px-8">
          Browse More Cars
        </Link>
        <Link href="/login" className="px-8 py-3.5 rounded-xl font-bold border-2 border-slate-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all">
          Create Account to Track
        </Link>
      </div>

      <p className="mt-12 text-sm text-slate-400 font-medium">
        Need urgent help? Call us at <span className="text-slate-800 font-bold">+91 91591 55307</span>
      </p>
    </div>
  );
}
