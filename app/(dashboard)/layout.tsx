"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

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
    { name: "Bookings", href: "/bookings", icon: <BookingsIcon /> },
    { name: "Fleet", href: "/cars", icon: <FleetIcon /> },
  ];

  return (
    <div className="min-h-screen flex bg-[var(--background)]">
      {/* Sidebar — desktop only */}
      <aside style={{
        width: "280px",
        height: "100vh",
        backgroundColor: "white",
        borderRight: "1px solid var(--card-border)",
        position: "sticky",
        top: 0,
        flexShrink: 0,
      }} className="hidden lg:flex flex-col">
        {/* Brand */}
        <div style={{ padding: "24px", borderBottom: "1px solid var(--card-border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgb(37 99 235 / 0.3)",
            }}>
              <span style={{ color: "white", fontWeight: 700, fontSize: "18px" }}>Z</span>
            </div>
            <div>
              <h1 style={{ fontWeight: 700, fontSize: "16px", lineHeight: 1, color: "var(--foreground)", margin: 0 }}>
                Zytravo Trvls
              </h1>
              <p style={{ fontSize: "11px", color: "var(--muted-light)", fontWeight: 500, marginTop: "4px" }}>
                Fleet Management
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "24px 16px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
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
                  backgroundColor: isActive ? "#EFF6FF" : "transparent",
                  color: isActive ? "var(--color-primary)" : "var(--muted)",
                }}
              >
                <span style={{ color: isActive ? "var(--color-primary)" : "var(--muted-light)", display: "flex" }}>
                  {item.icon}
                </span>
                {item.name}
                {isActive && (
                  <div style={{
                    marginLeft: "auto",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-primary)",
                  }} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div style={{ padding: "16px", borderTop: "1px solid var(--card-border)" }}>
          <div className="card-elevated" style={{ borderRadius: "12px", padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ 
                width: "36px", 
                height: "36px", 
                borderRadius: "8px", 
                backgroundColor: "var(--color-primary)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "14px"
              }}>
                {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || "U"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user?.user_metadata?.full_name || user?.email || "User"}
                </p>
                <p style={{ fontSize: "11px", color: "var(--muted-light)", margin: 0 }}>
                  {user?.email === 'admin@zytravo.com' ? 'Fleet Manager' : 'Staff'}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--muted)",
                background: "transparent",
                border: "1px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s ease",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#DC2626";
                e.currentTarget.style.backgroundColor = "#FEF2F2";
                e.currentTarget.style.borderColor = "#FECACA";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--muted)";
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "transparent";
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between p-4 border-b border-[var(--card-border)] bg-white/80 backdrop-blur-md">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <span style={{ color: "white", fontWeight: 700, fontSize: "14px" }}>Z</span>
            </div>
            <span className="font-bold text-[var(--foreground)] truncate max-w-[120px] sm:max-w-none">Zytravo Trvls</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-[10px] shadow-sm">
              {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || "U"}
            </div>
            <button 
              onClick={handleSignOut}
              className="text-[10px] font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 active:scale-95 transition-all"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Mobile Navigation */}
        <nav className="lg:hidden flex border-b border-[var(--card-border)] bg-white/50 backdrop-blur-sm px-4 overflow-x-auto no-scrollbar scroll-smooth">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-200 ${
                  isActive 
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

        <main className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30">
          <div className="max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
