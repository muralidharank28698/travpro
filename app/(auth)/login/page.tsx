"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw authError;
      }

      const userRole = data.user?.user_metadata?.role;

      // Smart redirection logic
      if (redirectTo) {
        router.push(redirectTo);
      } else if (userRole === "admin") {
        router.push("/bookings");
      } else {
        router.push("/dashboard");
      }

    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--background)]">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-emerald-50/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-emerald-50/10 rounded-full blur-3xl opacity-50" />
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
        <div className="card p-8 space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
              Welcome back
            </h1>
            <p className="text-sm text-[var(--muted)]">
              Sign in to manage your bookings and fleet
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[var(--foreground)]">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="form-input"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[var(--foreground)]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium text-center animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full premium-button py-3 mt-4"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="pt-4 text-center border-t border-[var(--card-border)]">
            <p className="text-sm text-[var(--muted)] mb-6">
              Don't have an account?{" "}
              <Link 
                href={redirectTo ? `/register?redirectTo=${redirectTo}` : "/register"} 
                className="text-[var(--color-primary)] font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>

            {/* Quick Login Cards */}
            <div className="space-y-4 pt-4 border-t border-[var(--card-border)] border-dashed">
              <p className="text-[10px] font-bold text-[var(--muted-light)] uppercase tracking-widest text-center">Quick Access (Dev Mode)</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEmail("admin@zytravo.com");
                    setPassword("admin123");
                  }}
                  className="flex flex-col items-center p-4 rounded-2xl border border-[var(--card-border)] hover:border-[var(--color-primary)] hover:bg-emerald-50/30 transition-all group active:scale-95"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-100/50 flex items-center justify-center text-emerald-600 mb-2 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all shadow-sm">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-[var(--foreground)]">Admin Role</span>
                  <span className="text-[10px] text-[var(--muted)] mt-1 truncate w-full">admin123</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setEmail("user@zytravo.com");
                    setPassword("user123");
                  }}
                  className="flex flex-col items-center p-4 rounded-2xl border border-[var(--card-border)] hover:border-[var(--color-primary)] hover:bg-emerald-50/30 transition-all group active:scale-95"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-100/50 flex items-center justify-center text-emerald-600 mb-2 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all shadow-sm">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-[var(--foreground)]">User Role</span>
                  <span className="text-[10px] text-[var(--muted)] mt-1 truncate w-full">user123</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

