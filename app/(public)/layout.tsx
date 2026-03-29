"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

export default function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: any } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh(); // Refresh to update server-side state if any
    router.push("/");
    setIsUserMenuOpen(false);
  };

  const navItems = [
    { name: "Car Rentals", href: "/rentals" },
    { name: "Tour Packages", href: "/tours" },
    { name: "Airport Transfers", href: "/airport-transfers" },
    { name: "Hire a Driver", href: "/driver-hire" },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b text-[var(--foreground)] border-[var(--card-border)] py-4 px-6 sm:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 decoration-none group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-[0_8px_16px_rgba(5,150,105,0.3)] group-hover:scale-105 transition-transform duration-300">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.28l1.08 3.11H5.78L6.85 7zM6 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm12 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[22px] font-black tracking-tighter text-[var(--foreground)] leading-none group-hover:text-[var(--color-primary)] transition-colors">JAYASREE</span>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--color-primary)] uppercase mt-0.5">Travels</span>
          </div>
        </Link>
        
        <nav className="hidden md:flex gap-6 font-medium text-sm text-[var(--muted)]">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`transition ${isActive ? "text-[var(--color-primary)]" : "hover:text-[var(--color-primary)]"}`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="hidden md:flex items-center">
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-50 transition-all border border-transparent hover:border-[var(--card-border)]"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-emerald-50 ring-offset-2">
                  {user.user_metadata?.full_name?.[0] || user.email?.[0] || 'U'}
                </div>
                <svg className={`w-4 h-4 text-[var(--muted)] transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[var(--card-border)] overflow-hidden animate-fade-in-up z-50">
                  <div className="p-4 border-b border-[var(--card-border)] bg-slate-50/50">
                    <p className="text-xs font-bold text-[var(--muted-light)] uppercase tracking-widest mb-1">Authenticated</p>
                    <p className="text-sm font-bold text-[var(--foreground)] truncate">
                      {user.user_metadata?.full_name || user.email}
                    </p>
                    <p className="text-[10px] text-[var(--muted)] truncate mt-0.5">{user.email}</p>
                  </div>
                  <div className="p-2">
                    {user.user_metadata?.role === 'admin' ? (
                      <Link 
                        href="/bookings" 
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--muted)] hover:text-[var(--color-primary)] hover:bg-emerald-50 transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Admin Panel
                      </Link>
                    ) : (
                      <Link 
                        href="/dashboard" 
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--muted)] hover:text-[var(--color-primary)] hover:bg-emerald-50 transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-4">
              <Link href="/login" className="secondary-button text-sm py-2 px-4">Log In</Link>
              <Link href="/register" className="premium-button text-sm py-2 px-4 shadow-md">Sign Up</Link>
            </div>
          )}
        </div>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden flex items-center p-2 text-[var(--foreground)]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden sticky top-[72px] z-40 bg-white border-b border-[var(--card-border)] shadow-lg animate-fade-in-up">
          <nav className="flex flex-col py-6 px-6 gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-bold transition ${isActive ? "text-[var(--color-primary)]" : "text-[var(--muted)] hover:text-[var(--color-primary)]"}`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="flex flex-col gap-3 mt-4 pt-6 border-t border-[var(--card-border)]">
              {user ? (
                <>
                  <div className="flex flex-col gap-1 mb-2 px-2">
                    <span className="text-[10px] font-bold text-[var(--muted-light)] uppercase tracking-[0.2em]">Logged in as</span>
                    <span className="text-sm font-bold text-[var(--foreground)]">{user.user_metadata?.full_name || user.email}</span>
                  </div>
                  {user.user_metadata?.role === 'admin' ? (
                    <Link href="/bookings" onClick={() => setIsMobileMenuOpen(false)} className="premium-button text-center py-3 text-base shadow-md font-bold">Admin Panel</Link>
                  ) : (
                    <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="secondary-button text-center py-3 text-base font-bold">My Dashboard</Link>
                  )}
                  <button 
                    onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }} 
                    className="bg-red-50 text-red-600 font-bold py-3 rounded-xl hover:bg-red-100 transition-all text-base border border-red-100 mt-2"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="secondary-button text-center py-3 text-base">Log In</Link>
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="premium-button text-center py-3 text-base">Sign Up</Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-[var(--card-border)] py-12 px-6 sm:px-12 text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-6">
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.28l1.08 3.11H5.78L6.85 7zM6 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm12 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[18px] font-black tracking-tighter text-white leading-none group-hover:text-[var(--color-primary)] transition-colors">JAYASREE</span>
              <span className="text-[9px] font-bold tracking-[0.25em] text-[var(--muted-light)] uppercase mt-0.5">Travels</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6 text-sm">
            <Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white transition">Support</Link>
          </div>
          <div className="text-sm max-w-[300px] md:max-w-none">
            © {new Date().getFullYear()} Jayasree Travels, Puducherry. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
