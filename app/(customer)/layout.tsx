"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

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
    { name: "My Bookings", href: "/dashboard", icon: "🎫" },
    { name: "New Booking", href: "/rentals", icon: "➕" },
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
          <Link href="/" className="flex items-center gap-3 decoration-none group">
            <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center shadow-md group-hover:bg-[var(--color-primary)] transition-all duration-300">
              <span className="text-white font-black text-lg italic tracking-tighter font-logo">Z</span>
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
                <span style={{ fontSize: "16px", opacity: isActive ? 1 : 0.6 }}>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Bottom */}
        <div style={{ padding: "16px", borderTop: "1px solid var(--card-border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", padding: "0 8px" }}>
            <div style={{ 
              width: "32px", 
              height: "32px", 
              borderRadius: "50%", 
              backgroundColor: "var(--color-primary)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "12px"
            }}>
              {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || "U"}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--foreground)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user?.user_metadata?.full_name || "Guest User"}
              </p>
              <p style={{ fontSize: "11px", color: "var(--muted)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user?.email || "customer@example.com"}
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full py-2.5 rounded-lg text-sm font-semibold text-[var(--muted)] hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between p-4 border-b border-[var(--card-border)] bg-white/80 backdrop-blur-md">
          <Link href="/" className="flex items-center gap-2 decoration-none group font-logo">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-sm italic tracking-tighter">Z</span>
            </div>
            <div className="flex flex-col -space-y-1">
              <div className="flex items-baseline leading-none">
                <span className="text-[14px] font-black tracking-tighter text-[var(--color-primary)]">ZY</span>
                <span className="text-[14px] font-black tracking-tighter text-[var(--foreground)]">TRAVO</span>
              </div>
              <span className="text-[6px] font-bold tracking-[0.4em] text-[var(--muted-light)] uppercase ml-0.5">TRVLS</span>
            </div>
          </Link>
          <button 
            onClick={handleSignOut} 
            className="text-[10px] font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 active:scale-95 transition-all"
          >
            Logout
          </button>
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
                <span style={{ fontSize: "16px" }}>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Main */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30">
          <div className="max-w-[1000px] mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
