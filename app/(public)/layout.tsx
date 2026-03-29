"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        
        <div className="hidden md:flex gap-4">
          <Link href="/login" className="secondary-button text-sm py-2 px-4">Log In</Link>
          <Link href="/register" className="premium-button text-sm py-2 px-4 shadow-md">Sign Up</Link>
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
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="secondary-button text-center py-3 text-base">Log In</Link>
              <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="premium-button text-center py-3 text-base">Sign Up</Link>
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
