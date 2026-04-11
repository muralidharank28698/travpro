"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, ChevronRight, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50/50">
      <div className="max-w-md w-full animate-fade-in-up">
        {/* Logo/Back link */}
        <Link 
          href="/login" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>

        <div className="card p-10 shadow-2xl border-emerald-50">
          {!isSubmitted ? (
            <div className="space-y-8">
              <div className="space-y-3">
                <h1 className="text-3xl font-black tracking-tight text-[var(--foreground)]">
                  Forgot <span className="text-[var(--color-primary)]">Password?</span>
                </h1>
                <p className="text-[var(--muted)] font-medium leading-relaxed">
                  Enter the email address associated with your account and we'll send you a recovery link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-black text-[var(--muted-light)]">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                    <input 
                      type="email" 
                      required 
                      placeholder="e.g. john@example.com"
                      className="form-input pl-12 h-14" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="premium-button w-full py-4 text-lg tracking-tight group"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send Reset Instructions
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </button>
              </form>

              <div className="text-center pt-4">
                <p className="text-sm text-[var(--muted)]">
                  Remember your password?{" "}
                  <Link href="/login" className="text-[var(--color-primary)] font-bold hover:underline">
                    Log In
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-8 py-4 animate-scale-in">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <div className="space-y-3">
                <h2 className="text-2xl font-black text-[var(--foreground)] tracking-tight">Check your email</h2>
                <p className="text-[var(--muted)] leading-relaxed font-medium">
                  We've sent password reset instructions to:<br/>
                  <span className="text-[var(--foreground)] font-bold">{email}</span>
                </p>
              </div>

              <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100/50 text-xs text-amber-800 leading-relaxed">
                Didn't receive the email? Check your spam folder or wait a few minutes before trying again.
              </div>

              <button 
                onClick={() => setIsSubmitted(false)}
                className="secondary-button w-full py-4"
              >
                Try a different email
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 text-center text-[var(--muted-light)] text-xs font-bold uppercase tracking-[0.2em]">
          Powered by Zytravo Trvls
        </div>
      </div>
    </div>
  );
}
