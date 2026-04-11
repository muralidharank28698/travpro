"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function CustomerDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
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
    { name: "New Booking", href: "/rentals", icon: "➕" },
    { name: "My Bookings", href: "/dashboard", icon: "🎫" },
    { name: "Settings", href: "/dashboard/settings", icon: "⚙️" },
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
          <Link href="/" onClick={() => window.location.href = "/"} className="flex items-center gap-3 decoration-none group">
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
        <nav style={{ flex: 1, padding: "24px 16px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {navItems.map((item) => {
            const isActive = item.href === "/dashboard"
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  backgroundColor: isActive ? "var(--surface)" : "transparent",
                  color: isActive ? "var(--color-primary)" : "var(--muted)",
                }}
              >
                <span style={{ fontSize: "16px", opacity: isActive ? 1 : 0.6 }}>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Bottom */}
        <div style={{ padding: "16px", borderTop: "1px solid var(--card-border)" }}>
          <div className="flex justify-between items-center mb-4 px-2">
            <span className="text-sm font-semibold text-[var(--muted)]">Theme</span>
            <ThemeToggle />
          </div>
          <div className="card bg-surface/30 p-4 border border-border/40 transition-all hover:bg-surface/50 group/profile">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-black shadow-lg shadow-primary/20 transition-transform group-hover/profile:scale-105">
                {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-black text-[var(--foreground)] truncate group-hover/profile:text-primary transition-colors">
                  {user?.user_metadata?.full_name || "Guest User"}
                </p>
                <p className="text-[11px] font-bold text-[var(--muted)] truncate uppercase tracking-wider">
                  {user?.email?.includes('admin') ? 'Operator' : 'Customer Account'}
                </p>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="w-full py-2.5 rounded-xl text-[13px] font-semibold text-red-500/80 hover:text-red-500 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/20 active:scale-95 transition-all duration-300 cursor-pointer text-center"
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between p-4 border-b border-border bg-background/80 backdrop-blur-md">
          <Link href="/" onClick={() => window.location.href = "/"} className="flex items-center gap-2 decoration-none group font-logo">
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
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={handleSignOut}
              className="text-[10px] font-black text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white px-4 py-2 rounded-xl border border-red-500/20 active:scale-95 transition-all shadow-sm shadow-red-500/5"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Mobile Navigation */}
        <nav className="lg:hidden flex w-full bg-background/50 backdrop-blur-sm border-b border-border">
          {navItems.map((item) => {
            const isActive = item.href === "/dashboard"
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2 py-2.5 text-[10px] sm:text-xs font-semibold border-b-2 transition-all duration-200 text-center focus:outline-none ${isActive
                    ? "text-[var(--color-primary)] border-[var(--color-primary)]"
                    : "text-[var(--muted)] border-transparent"
                  }`}
              >
                <span className="text-[14px] sm:text-[16px]">{item.icon}</span>
                <span className="whitespace-nowrap">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Main */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-background">
          <div className="max-w-[1000px] mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
