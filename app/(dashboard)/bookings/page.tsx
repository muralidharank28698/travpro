"use client";

import GlassCard from "@/components/common/GlassCard";
import { MOCK_BOOKINGS } from "@/lib/mock-data";
import Link from "next/link";

const statusConfig: Record<string, { badgeBg: string; badgeColor: string; dotColor: string }> = {
  Confirmed: { badgeBg: "#ECFDF5", badgeColor: "#059669", dotColor: "#10B981" },
  "In Progress": { badgeBg: "#EFF6FF", badgeColor: "#2563EB", dotColor: "#3B82F6" },
  Completed: { badgeBg: "#F1F5F9", badgeColor: "#64748B", dotColor: "#94A3B8" },
  Cancelled: { badgeBg: "#FEF2F2", badgeColor: "#DC2626", dotColor: "#EF4444" },
};

export default function BookingsPage() {
  const stats = {
    total: MOCK_BOOKINGS.length,
    confirmed: MOCK_BOOKINGS.filter((b) => b.status === "Confirmed").length,
    inProgress: MOCK_BOOKINGS.filter((b) => b.status === "In Progress").length,
    completed: MOCK_BOOKINGS.filter((b) => b.status === "Completed").length,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* Page Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--foreground)", margin: 0 }}>
            Bookings
          </h1>
          <p style={{ fontSize: "14px", color: "var(--muted)", marginTop: "4px" }}>
            Manage and track all your fleet reservations.
          </p>
        </div>
        <Link href="/cars" className="premium-button" style={{ fontSize: "14px", padding: "10px 20px" }}>
          + New Booking
        </Link>
      </div>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px" }}>
        {[
          { label: "Total Bookings", value: stats.total, color: "var(--foreground)" },
          { label: "Confirmed", value: stats.confirmed, color: "#059669" },
          { label: "In Progress", value: stats.inProgress, color: "#2563EB" },
          { label: "Completed", value: stats.completed, color: "var(--muted)" },
        ].map((stat) => (
          <GlassCard key={stat.label}>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
              {stat.label}
            </p>
            <p style={{ fontSize: "28px", fontWeight: 700, color: stat.color, margin: 0 }}>
              {stat.value}
            </p>
          </GlassCard>
        ))}
      </div>

      {/* Bookings List */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {/* Table Header */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr 1fr 0.8fr 0.8fr 0.7fr",
          gap: "16px",
          padding: "12px 24px",
          backgroundColor: "var(--surface)",
          borderBottom: "1px solid var(--card-border)",
          fontSize: "11px",
          fontWeight: 600,
          textTransform: "uppercase" as const,
          letterSpacing: "0.05em",
          color: "var(--muted)",
        }} className="hidden lg:!grid">
          <span>Booking</span>
          <span>Route</span>
          <span>Customer</span>
          <span>Date</span>
          <span>Amount</span>
          <span>Status</span>
        </div>

        {/* Rows */}
        {MOCK_BOOKINGS.map((booking, index) => {
          const config = statusConfig[booking.status] || statusConfig["Completed"];
          return (
            <div
              key={booking.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "12px",
                padding: "20px 24px",
                borderBottom: index < MOCK_BOOKINGS.length - 1 ? "1px solid var(--card-border)" : "none",
                transition: "background 0.15s ease",
                cursor: "default",
                animationDelay: `${index * 60}ms`,
              }}
              className="lg:!grid-cols-[1fr_1.2fr_1fr_0.8fr_0.8fr_0.7fr] animate-fade-in-up"
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F8FAFC"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              {/* Booking Info */}
              <div>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--foreground)", margin: 0 }}>
                  {booking.carName}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                  <span style={{ fontSize: "12px", fontFamily: "monospace", color: "var(--muted-light)" }}>{booking.id}</span>
                  <span style={{
                    fontSize: "10px",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    backgroundColor: "var(--surface)",
                    color: "var(--muted)",
                    fontWeight: 600,
                  }}>
                    {booking.tripType}
                  </span>
                </div>
              </div>

              {/* Route */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", border: "2px solid var(--color-primary)" }} />
                  <div style={{ width: "1px", height: "16px", backgroundColor: "var(--card-border)" }} />
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--color-primary)" }} />
                </div>
                <div>
                  <p style={{ fontSize: "14px", color: "var(--foreground)", margin: 0 }}>{booking.pickupLocation}</p>
                  <p style={{ fontSize: "14px", color: "var(--muted)", margin: 0 }}>{booking.dropoffLocation}</p>
                </div>
              </div>

              {/* Customer */}
              <div>
                <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--foreground)", margin: 0 }}>{booking.customerName}</p>
                <p style={{ fontSize: "12px", color: "var(--muted-light)", margin: 0, marginTop: "2px" }}>{booking.phone}</p>
              </div>

              {/* Date */}
              <div>
                <p style={{ fontSize: "14px", color: "var(--foreground)", margin: 0 }}>{booking.startDate}</p>
                {booking.startDate !== booking.endDate && (
                  <p style={{ fontSize: "12px", color: "var(--muted-light)", margin: 0, marginTop: "2px" }}>to {booking.endDate}</p>
                )}
              </div>

              {/* Amount */}
              <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--foreground)", margin: 0, alignSelf: "center" }}>
                ₹{booking.amount.toLocaleString()}
              </p>

              {/* Status */}
              <div style={{ alignSelf: "center" }}>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  fontSize: "12px",
                  fontWeight: 600,
                  backgroundColor: config.badgeBg,
                  color: config.badgeColor,
                }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: config.dotColor }} />
                  {booking.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
