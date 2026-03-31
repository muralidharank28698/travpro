"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!name || !email || !password || !phone) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            phone: phone,
          }
        }
      });

      if (error) {
        throw error;
      }

      setSuccess("Registration successful! Proceeding to login...");
      
      const loginUrl = redirectTo ? `/login?redirectTo=${redirectTo}` : "/login";
      setTimeout(() => router.push(loginUrl), 1500);

    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--background)]">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-emerald-50/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 w-[30%] h-[30%] bg-emerald-50/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <Link href="/" className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg decoration-none">
            <span className="text-white font-bold text-xl">Z</span>
          </Link>
          <span className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Zytravo Trvls
          </span>
        </div>

        {/* Form Card */}
        <div className="card p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-black tracking-tight text-[var(--foreground)]">
              Create an Account
            </h1>
            <p className="text-sm font-medium text-[var(--muted)]">
              Secure your rental with Zytravo Trvls in just a few clicks.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="form-input"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@zytravo.com"
                className="form-input"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="form-input"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
                required
                minLength={8}
              />
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-bold text-center animate-shake">
                ⚠️ {error}
              </div>
            )}
            
            {success && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm font-bold text-center">
                ✅ {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full premium-button py-4 mt-2 font-black shadow-lg shadow-emerald-600/20 active:scale-[0.98]"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="pt-4 text-center border-t border-[var(--card-border)]">
            <p className="text-sm font-medium text-[var(--muted)]">
              Already have an account?{" "}
              <Link 
                href={redirectTo ? `/login?redirectTo=${redirectTo}` : "/login"} 
                className="text-[var(--color-primary)] font-bold hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}

