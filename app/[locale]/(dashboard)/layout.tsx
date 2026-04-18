"use client";

import { Link, usePathname, useRouter } from "@/navigation";
import { ReactNode, useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTranslations } from 'next-intl';

const BookingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const FleetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = useTranslations('Dashboard');
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }: { data: { user: any } }) => {
      setUser(user);
    });
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  };

  const navItems = [
    { name: t('nav.bookings'), href: "/bookings", icon: <BookingsIcon /> },
    { name: t('nav.fleet'), href: "/cars", icon: <FleetIcon /> },
  ];

  return (
    <div className="min-h-screen flex bg-[var(--background)]">
      {/* Sidebar — desktop only */}
      <aside style={{
        width: "280px",
        height: "100vh",
        backgroundColor: "var(--card-bg)",
        borderRight: "1px solid var(--card-border)",
        position: "sticky",
        top: 0,
        flexShrink: 0,
      }} className="hidden lg:flex flex-col">
        {/* Brand */}
        <div style={{ padding: "24px", borderBottom: "1px solid var(--card-border)" }}>
          <Link href="/" className="flex items-center gap-3 decoration-none group">
            <div className="w-9 h-9 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center shadow-md group-hover:bg-[var(--color-primary)] transition-all duration-300">
              <span className="text-white dark:text-black font-black text-lg italic tracking-tighter font-logo">Z</span>
            </div>
            <div className="flex flex-col -space-y-1 font-logo">
              <div className="flex items-baseline leading-none">
                <span className="text-[18px] font-black tracking-tighter text-[var(--color-primary)]">ZY</span>
                <span className="text-[18px] font-black tracking-tighter text-[var(--foreground)]">TRAVO</span>
              </div>
              <span className="text-[8px] font-bold tracking-[0.4em] text-[var(--muted-light)] uppercase ml-0.5">TRVLS</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary font-bold shadow-sm"
                    : "text-[var(--muted)] hover:bg-surface hover:text-foreground"
                }`}
              >
                <span className={`text-[16px] flex items-center ${isActive ? 'opacity-100 text-primary' : 'opacity-60 text-[var(--muted-light)]'}`}>{item.icon}</span>
                {item.name}
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-sm" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div style={{ padding: "16px", borderTop: "1px solid var(--card-border)" }}>
          <div className="flex justify-between items-center mb-4 px-2">
            <span className="text-sm font-semibold text-[var(--muted)]">{t('nav.theme')}</span>
            <ThemeToggle />
          </div>
          <div className="card bg-surface/30 p-4 border border-border/40 transition-all hover:bg-surface/50 group/profile">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-black shadow-lg shadow-primary/20 transition-transform group-hover/profile:scale-105">
                {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-black text-[var(--foreground)] truncate group-hover/profile:text-primary transition-colors">
                  {user?.user_metadata?.full_name || user?.email || "User"}
                </p>
                <p className="text-[11px] font-bold text-[var(--muted)] truncate uppercase tracking-wider">
                  {user?.email === 'admin@zytravo.com' ? t('roles.manager') : t('roles.staff')}
                </p>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="w-full py-2.5 rounded-xl text-[13px] font-semibold text-red-500/80 hover:text-red-500 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/20 active:scale-95 transition-all duration-300 cursor-pointer text-center"
            >
              {t('nav.signout')}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between p-4 border-b border-[var(--card-border)] bg-background/80 backdrop-blur-md">
          <Link href="/" className="flex items-center gap-2 decoration-none group font-logo">
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center shadow-sm">
              <span className="text-white dark:text-black font-black text-sm italic tracking-tighter">Z</span>
            </div>
            <div className="flex flex-col -space-y-1">
              <div className="flex items-baseline leading-none">
                <span className="text-[14px] font-black tracking-tighter text-[var(--color-primary)]">ZY</span>
                <span className="text-[14px] font-black tracking-tighter text-[var(--foreground)]">TRAVO</span>
              </div>
              <span className="text-[6px] font-bold tracking-[0.4em] text-[var(--muted-light)] uppercase ml-0.5">TRVLS</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={handleSignOut}
              className="text-[10px] font-black text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white px-4 py-2 rounded-xl border border-red-500/20 active:scale-95 transition-all shadow-sm shadow-red-500/5"
            >
              {t('nav.signout')}
            </button>
          </div>
        </header>

        {/* Mobile Navigation */}
        <nav className="lg:hidden flex border-b border-border bg-background/50 backdrop-blur-sm px-4 overflow-x-auto no-scrollbar scroll-smooth">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-200 ${isActive
                    ? "text-[var(--color-primary)] border-[var(--color-primary)]"
                    : "text-[var(--muted)] border-transparent"
                  }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1 overflow-y-auto custom-scrollbar bg-background">
          <div className="max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
