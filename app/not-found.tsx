"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center animate-fade-in-up">
      <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center text-4xl mb-8 shadow-sm">
        🧭
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] mb-4">
        Page Not <span className="text-rose-500">Found</span>
      </h1>
      <p className="text-lg text-[var(--muted)] max-w-md mx-auto mb-10">
        The page you are looking for might have been moved, deleted, or never existed. Let's get you back on track.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="premium-button py-3 px-8 shadow-lg shadow-emerald-50">
          Go to Homepage
        </Link>
        <button 
          onClick={() => window.history.back()} 
          className="secondary-button py-3 px-8"
        >
          Go Back
        </button>
      </div>

      <div className="mt-16 pt-8 border-t border-[var(--card-border)] w-full max-w-sm">
        <p className="text-sm text-[var(--muted-light)] font-medium mb-4 uppercase tracking-widest">Need help?</p>
        <Link href="/contact" className="text-[var(--color-primary)] font-bold hover:underline">
          Contact Support →
        </Link>
      </div>
    </div>
  );
}
