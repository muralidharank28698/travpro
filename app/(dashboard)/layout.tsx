"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CURRENT_USER } from "@/lib/mock-data";

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
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Bookings", href: "/bookings", icon: <BookingsIcon /> },
    { name: "Fleet", href: "/cars", icon: <FleetIcon /> },
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
              <img
                src={CURRENT_USER.avatar}
                alt={CURRENT_USER.name}
                style={{ width: "36px", height: "36px", borderRadius: "8px", border: "1px solid var(--card-border)" }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {CURRENT_USER.name}
                </p>
                <p style={{ fontSize: "11px", color: "var(--muted-light)", margin: 0 }}>
                  {CURRENT_USER.role}
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push("/")}
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
            <span style={{ fontWeight: 700, color: "var(--foreground)" }}>Jayasree Travels</span>
          </div>
          <img
            src={CURRENT_USER.avatar}
            alt="User"
            style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid var(--card-border)" }}
          />
        </header>

        {/* Mobile Navigation */}
        <nav className="lg:hidden" style={{
          display: "flex",
          borderBottom: "1px solid var(--card-border)",
          backgroundColor: "white",
          padding: "0 16px",
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
                  borderBottom: isActive ? "2px solid var(--color-primary)" : "2px solid transparent",
                  marginBottom: "-1px",
                  color: isActive ? "var(--color-primary)" : "var(--muted)",
                  transition: "color 0.2s ease",
                }}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <main style={{ flex: 1, overflowY: "auto" }} className="custom-scrollbar">
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 32px" }} className="animate-fade-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
