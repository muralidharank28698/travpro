"use client";

import { useState } from "react";
import GlassCard from "@/components/common/GlassCard";
import { Booking } from "@/lib/mock-data";
import { useAppSelector } from "@/lib/store";
import Link from "next/link";

const statusConfig: Record<string, { badgeBg: string; badgeColor: string; dotColor: string }> = {
  Confirmed: { badgeBg: "rgba(16, 185, 129, 0.1)", badgeColor: "#10B981", dotColor: "#10B981" },
  "In Progress": { badgeBg: "rgba(59, 130, 246, 0.1)", badgeColor: "#3B82F6", dotColor: "#3B82F6" },
  Completed: { badgeBg: "rgba(var(--muted-rgb), 0.1)", badgeColor: "var(--muted)", dotColor: "var(--muted-light)" },
  Cancelled: { badgeBg: "rgba(239, 68, 68, 0.1)", badgeColor: "#EF4444", dotColor: "#EF4444" },
};

export default function BookingsPage() {
  const MOCK_BOOKINGS = useAppSelector((state) => state.bookings.items);
  const [filterStatus, setFilterStatus] = useState<Booking["status"] | null>(null);

  const stats = {
    total: MOCK_BOOKINGS.length,
    confirmed: MOCK_BOOKINGS.filter((b) => b.status === "Confirmed").length,
    inProgress: MOCK_BOOKINGS.filter((b) => b.status === "In Progress").length,
    completed: MOCK_BOOKINGS.filter((b) => b.status === "Completed").length,
  };

  const filteredBookings = filterStatus 
    ? MOCK_BOOKINGS.filter((b) => b.status === filterStatus)
    : MOCK_BOOKINGS;

  const statCards = [
    { label: "Total Bookings", value: stats.total, color: "var(--foreground)", filter: null },
    { label: "Confirmed", value: stats.confirmed, color: "#059669", filter: "Confirmed" as const },
    { label: "In Progress", value: stats.inProgress, color: "#2563EB", filter: "In Progress" as const },
    { label: "Completed", value: stats.completed, color: "var(--muted)", filter: "Completed" as const },
  ];

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
        <button 
          onClick={() => alert("Exporting booking data...")}
          className="secondary-button" 
          style={{ fontSize: "14px", padding: "10px 20px" }}
        >
          Export Data
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const isActive = filterStatus === stat.filter;
          return (
            <div 
              key={stat.label} 
              onClick={() => setFilterStatus(stat.filter)}
              className={`card p-6 border transition-all duration-300 cursor-pointer group hover:-translate-y-1 ${
                isActive 
                  ? "bg-primary/10 border-primary ring-1 ring-primary/20 shadow-xl shadow-primary/5" 
                  : "bg-surface/40 dark:bg-card/40 border-border/60 hover:border-border hover:bg-surface/60 dark:hover:bg-card/60"
              }`}
            >
              <div className="flex flex-col">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-2 group-hover:text-foreground transition-colors">
                  {stat.label}
                </p>
                <p className="text-3xl font-black tracking-tighter" style={{ color: stat.color === 'var(--foreground)' ? 'var(--foreground)' : stat.color }}>
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bookings List */}
      <div className="card !p-0 overflow-hidden border border-border/60 bg-card/40 backdrop-blur-md shadow-2xl">
        {/* Table Header - Hidden on Mobile */}
        <div className="hidden lg:grid grid-cols-[1fr_1.2fr_1fr_0.8fr_0.8fr_0.7fr] gap-4 px-6 py-4 bg-surface/50 border-b border-border/40 text-[10px] font-black uppercase tracking-[0.2em] text-muted">
          <span>Booking</span>
          <span>Route</span>
          <span>Customer</span>
          <span>Date</span>
          <span>Amount</span>
          <span>Status</span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border/20">
          {filteredBookings.length === 0 ? (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-surface/50 border border-border/40 flex items-center justify-center mb-4">
                <span className="text-3xl transform -rotate-12">🔍</span>
              </div>
              <h3 className="text-sm font-black text-foreground">No bookings found</h3>
              <p className="text-xs text-muted mt-2">Try selecting a different filter.</p>
            </div>
          ) : (
            filteredBookings.map((booking, index) => {
              const config = statusConfig[booking.status] || statusConfig["Completed"];
              return (
                <div
                  key={booking.id}
                  className="lg:grid lg:grid-cols-[1fr_1.2fr_1fr_0.8fr_0.8fr_0.7fr] flex flex-col gap-4 lg:gap-4 p-5 lg:px-6 lg:py-6 hover:bg-primary/[0.03] transition-all animate-fade-in-up group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Booking Info */}
                  <div className="flex flex-col">
                    <p className="text-[15px] font-black text-foreground group-hover:text-primary transition-colors">
                      {booking.carName}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-mono font-bold text-muted bg-surface/80 border border-border/50 px-2 py-0.5 rounded tracking-wider uppercase">{booking.id}</span>
                      <span className="text-[10px] font-black text-muted-light px-2.5 py-0.5 border border-border/40 rounded shadow-sm bg-surface/30">
                        {booking.tripType}
                      </span>
                    </div>
                  </div>

                  {/* Route */}
                  <div className="flex items-center gap-3 bg-surface/30 lg:bg-transparent p-4 lg:p-0 rounded-2xl border border-border/40 lg:border-none">
                    <div className="flex flex-col items-center gap-0.5 opacity-40">
                      <div className="w-2 h-2 rounded-full border-2 border-primary" />
                      <div className="w-[2px] h-4 bg-border/40" />
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <p className="text-xs font-black text-foreground truncate">{booking.pickupLocation}</p>
                      <p className="text-[11px] font-bold text-muted truncate">{booking.dropoffLocation}</p>
                    </div>
                  </div>

                  {/* Mobile Grid Wrapper for Metadata */}
                  <div className="grid grid-cols-2 lg:contents gap-4">
                    {/* Customer */}
                    <div className="flex flex-col lg:justify-center">
                      <p className="text-[10px] font-bold lg:hidden text-[var(--muted-light)] uppercase tracking-wider mb-1">Customer</p>
                      <p className="text-xs font-bold text-[var(--foreground)]">{booking.customerName}</p>
                      <p className="text-[11px] text-[var(--muted)]">{booking.phone}</p>
                    </div>

                    {/* Date */}
                    <div className="flex flex-col lg:justify-center">
                      <p className="text-[10px] font-bold lg:hidden text-[var(--muted-light)] uppercase tracking-wider mb-1">Schedule</p>
                      <p className="text-xs font-semibold text-[var(--foreground)]">{booking.startDate}</p>
                      {booking.startDate !== booking.endDate && (
                        <p className="text-[11px] text-[var(--muted-light)]">to {booking.endDate}</p>
                      )}
                    </div>

                    {/* Amount */}
                    <div className="flex flex-col lg:justify-center pt-3 lg:pt-0 border-t border-border/20 lg:border-none">
                      <p className="text-[10px] font-black lg:hidden text-muted-light uppercase tracking-[0.2em] mb-1">Fare</p>
                      <p className="text-base lg:text-lg font-black text-foreground">₹{booking.amount.toLocaleString()}</p>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col lg:justify-center items-end lg:items-start pt-3 lg:pt-0 border-t border-border/20 lg:border-none">
                      <p className="text-[10px] font-black lg:hidden text-muted-light uppercase tracking-[0.2em] mb-1">Status</p>
                      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-black border border-border/10 shadow-sm" style={{ backgroundColor: config.badgeBg, color: config.badgeColor }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: config.dotColor }} />
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
