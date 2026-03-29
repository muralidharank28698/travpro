"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

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
          <button
            onClick={() => {
                // In production, call supabase.auth.signOut()
                router.push("/")
            }}
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
          <button onClick={() => router.push("/")} className="text-xs font-bold text-red-600">Logout</button>
        </header>

        {/* Main */}
        <main style={{ flex: 1, overflowY: "auto" }} className="custom-scrollbar bg-[var(--background)]">
          <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "24px 32px" }} className="animate-fade-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
