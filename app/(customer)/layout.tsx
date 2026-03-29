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
    <div style={{ minHeight: "100vh", display: "flex", background: "var(--background)" }}>
      {/* Sidebar — desktop only */}
      <aside style={{
        width: "280px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        borderRight: "1px solid var(--card-border)",
        position: "sticky",
        top: 0,
        flexShrink: 0,
      }} className="hidden lg:!flex">
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
              <span style={{ color: "white", fontWeight: 700, fontSize: "18px" }}>J</span>
            </div>
            <div>
              <h1 style={{ fontWeight: 700, fontSize: "16px", lineHeight: 1, color: "var(--foreground)", margin: 0 }}>
                Jayasree Travels
              </h1>
              <p style={{ fontSize: "11px", color: "var(--color-primary)", fontWeight: 600, marginTop: "4px" }}>
                Customer Portal
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
      <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        {/* Mobile Header */}
        <header className="lg:hidden" style={{
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--card-border)",
          backgroundColor: "white",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}>
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
              <span style={{ color: "white", fontWeight: 700, fontSize: "14px" }}>J</span>
            </div>
            <span style={{ fontWeight: 700, color: "var(--foreground)" }}>Customer Portal</span>
          </div>
          <button 
            onClick={handleSignOut} 
            className="px-3 py-1.5 rounded-md text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
          >
            Logout
          </button>
        </header>

        {/* Mobile Navigation */}
        <nav className="lg:hidden" style={{
          display: "flex",
          borderBottom: "1px solid var(--card-border)",
          backgroundColor: "white",
          padding: "0 16px",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 16px",
                  fontSize: "14px",
                  fontWeight: 500,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  borderBottom: isActive ? "2px solid var(--color-primary)" : "2px solid transparent",
                  marginBottom: "-1px",
                  color: isActive ? "var(--color-primary)" : "var(--muted)",
                  transition: "color 0.2s ease",
                }}
              >
                <span style={{ fontSize: "16px" }}>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Main */}
        <main style={{ flex: 1, overflowY: "auto" }} className="custom-scrollbar bg-[var(--background)]">
          <div style={{ maxWidth: "1000px", margin: "0 auto" }} className="p-4 md:p-6 lg:p-8 animate-fade-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
