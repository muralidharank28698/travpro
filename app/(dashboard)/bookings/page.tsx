"use client";

import { useState } from "react";
import GlassCard from "@/components/common/GlassCard";
import { Booking } from "@/lib/mock-data";
import { useAppSelector } from "@/lib/store";
import Link from "next/link";

const statusConfig: Record<string, { badgeBg: string; badgeColor: string; dotColor: string }> = {
  Confirmed: { badgeBg: "#ECFDF5", badgeColor: "#059669", dotColor: "#10B981" },
  "In Progress": { badgeBg: "#EFF6FF", badgeColor: "#2563EB", dotColor: "#3B82F6" },
  Completed: { badgeBg: "#F1F5F9", badgeColor: "#64748B", dotColor: "#94A3B8" },
  Cancelled: { badgeBg: "#FEF2F2", badgeColor: "#DC2626", dotColor: "#EF4444" },
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const isActive = filterStatus === stat.filter;
          return (
            <div 
              key={stat.label} 
              onClick={() => setFilterStatus(stat.filter)}
              className="cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <GlassCard 
                className={`transition-all duration-200 ${
                  isActive 
                    ? "ring-2 ring-[var(--color-primary)] ring-offset-2 bg-white/80 shadow-md" 
                    : "hover:bg-white/50"
                }`}
              >
                <div className="flex flex-col">
                  <p className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl sm:text-3xl font-black" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                </div>
              </GlassCard>
            </div>
          );
        })}
      </div>

      {/* Bookings List */}
      <div className="card !p-0 overflow-hidden border-none shadow-sm ring-1 ring-slate-100">
        {/* Table Header - Hidden on Mobile */}
        <div className="hidden lg:grid grid-cols-[1fr_1.2fr_1fr_0.8fr_0.8fr_0.7fr] gap-4 px-6 py-3 bg-slate-50 border-b border-[var(--card-border)] text-[10px] font-black uppercase tracking-widest text-[var(--muted)]">
          <span>Booking</span>
          <span>Route</span>
          <span>Customer</span>
          <span>Date</span>
          <span>Amount</span>
          <span>Status</span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-100">
          {filteredBookings.length === 0 ? (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">No bookings found</h3>
              <p className="text-xs text-[var(--muted)] mt-1">Try selecting a different filter.</p>
            </div>
          ) : (
            filteredBookings.map((booking, index) => {
              const config = statusConfig[booking.status] || statusConfig["Completed"];
              return (
                <div
                  key={booking.id}
                  className="lg:grid lg:grid-cols-[1fr_1.2fr_1fr_0.8fr_0.8fr_0.7fr] flex flex-col gap-4 lg:gap-4 p-5 lg:px-6 lg:py-5 hover:bg-slate-50/80 transition-all animate-fade-in-up group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Booking Info */}
                  <div className="flex flex-col">
                    <p className="text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--color-primary)] transition-colors">
                      {booking.carName}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono text-[var(--muted-light)] bg-slate-100 px-1.5 py-0.5 rounded uppercase">{booking.id}</span>
                      <span className="text-[10px] font-bold text-[var(--muted)] px-2 py-0.5 bg-white border border-slate-100 rounded shadow-sm">
                        {booking.tripType}
                      </span>
                    </div>
                  </div>

                  {/* Route */}
                  <div className="flex items-center gap-3 bg-slate-50/50 lg:bg-transparent p-3 lg:p-0 rounded-xl border border-slate-100 lg:border-none">
                    <div className="flex flex-col items-center gap-0.5 opacity-60">
                      <div className="w-1.5 h-1.5 rounded-full border border-[var(--color-primary)]" />
                      <div className="w-px h-3 bg-slate-300" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <p className="text-xs font-semibold text-[var(--foreground)] truncate">{booking.pickupLocation}</p>
                      <p className="text-xs text-[var(--muted)] truncate">{booking.dropoffLocation}</p>
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
                    <div className="flex flex-col lg:justify-center pt-3 lg:pt-0 border-t border-slate-50 lg:border-none">
                      <p className="text-[10px] font-bold lg:hidden text-[var(--muted-light)] uppercase tracking-wider mb-1">Fare</p>
                      <p className="text-sm lg:text-base font-black text-[var(--foreground)]">₹{booking.amount.toLocaleString()}</p>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col lg:justify-center items-end lg:items-start pt-3 lg:pt-0 border-t border-slate-50 lg:border-none">
                      <p className="text-[10px] font-bold lg:hidden text-[var(--muted-light)] uppercase tracking-wider mb-1">Status</p>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold shadow-sm ring-1 ring-inset ring-black/5" style={{ backgroundColor: config.badgeBg, color: config.badgeColor }}>
                        <span className="w-1 h-1 rounded-full" style={{ backgroundColor: config.dotColor }} />
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
