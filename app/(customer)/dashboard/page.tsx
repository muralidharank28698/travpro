"use client";

import { MOCK_BOOKINGS } from "@/lib/mock-data";
import Link from "next/link";
import { useState } from "react";

export default function CustomerDashboardPage() {
  const [activeTab, setActiveTab] = useState<"Upcoming" | "Past">("Upcoming");

  // In a real app we'd fetch bookings for the current user
  const myBookings = MOCK_BOOKINGS;
  
  const upcoming = myBookings.filter(b => b.status === "Confirmed" || b.status === "In Progress");
  const past = myBookings.filter(b => b.status === "Completed" || b.status === "Cancelled");

  const displayBookings = activeTab === "Upcoming" ? upcoming : past;

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
          My Bookings
        </h1>
        <p className="text-[var(--muted)] mt-2 text-sm max-w-2xl">
          View your upcoming trips, track your driver, and download invoices for past journeys.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-[var(--surface)] p-1 rounded-xl w-fit">
        <button 
          className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'Upcoming' ? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-[var(--foreground)]' : 'text-[var(--muted)] hover:text-[var(--foreground)]'}`}
          onClick={() => setActiveTab("Upcoming")}
        >
          Upcoming ({upcoming.length})
        </button>
        <button 
          className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'Past' ? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-[var(--foreground)]' : 'text-[var(--muted)] hover:text-[var(--foreground)]'}`}
          onClick={() => setActiveTab("Past")}
        >
          Past ({past.length})
        </button>
      </div>

      {/* Bookings List */}
      <div className="space-y-6">
        {displayBookings.length === 0 ? (
          <div className="card p-12 text-center border-dashed border-2">
            <div className="text-4xl mb-4">🚗</div>
            <h3 className="text-lg font-bold text-[var(--foreground)]">No {activeTab.toLowerCase()} bookings found</h3>
            <p className="text-[var(--muted)] text-sm mt-2 mb-6">Looks like you don't have any trips scheduled.</p>
            <Link href="/rentals" className="premium-button text-sm px-6 py-2">
              Book a Ride
            </Link>
          </div>
        ) : (
          displayBookings.map((booking) => (
            <div key={booking.id} className="card p-0 overflow-hidden group">
              {/* Card Header Status Row */}
              <div className="p-4 bg-slate-50 border-b border-[var(--card-border)] flex justify-between items-center bg-gradient-to-r from-[var(--surface)] to-transparent">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${booking.status === 'Confirmed' ? 'bg-emerald-500' : booking.status === 'In Progress' ? 'bg-blue-500' : 'bg-slate-400'}`}></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">{booking.status}</span>
                </div>
                <span className="text-xs font-mono text-[var(--muted-light)]">ID: {booking.id}</span>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 justify-between">
                
                <div className="flex-1 space-y-6">
                  {/* Service Info */}
                  <div>
                    <span className="text-xs font-semibold text-[var(--color-primary)] px-2 py-1 rounded bg-[var(--surface)] uppercase tracking-widest mb-3 inline-block">
                      {booking.tripType}
                    </span>
                    <h2 className="text-xl font-bold text-[var(--foreground)]">{booking.carName}</h2>
                  </div>

                  {/* Route Timeline */}
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center mt-1">
                      <div className="w-3 h-3 rounded-full border-[3px] border-[var(--color-primary)] bg-white" />
                      <div className="w-0.5 h-12 bg-slate-200" />
                      <div className="w-3 h-3 rounded-full bg-[var(--color-primary)]" />
                    </div>
                    <div className="space-y-4 flex-1">
                      <div>
                        <p className="text-xs font-semibold text-[var(--muted)] uppercase mb-0.5">Pick-up</p>
                        <p className="font-medium text-sm text-[var(--foreground)]">{booking.pickupLocation}</p>
                        <p className="text-xs text-[var(--muted-light)] mt-0.5">{booking.startDate}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[var(--muted)] uppercase mb-0.5">Drop-off</p>
                        <p className="font-medium text-sm text-[var(--foreground)]">{booking.dropoffLocation}</p>
                        <p className="text-xs text-[var(--muted-light)] mt-0.5">{booking.endDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex flex-col justify-between items-start md:items-end border-t md:border-t-0 md:border-l border-[var(--card-border)] pt-6 md:pt-0 md:pl-8">
                  <div className="mb-6 md:mb-0">
                    <p className="text-xs text-[var(--muted)] font-semibold uppercase tracking-wider mb-1 md:text-right">Total Amount</p>
                    <p className="text-3xl font-bold text-[var(--foreground)]">₹{booking.amount.toLocaleString()}</p>
                    <p className="text-[10px] text-[var(--muted-light)] md:text-right mt-1">Includes GST & base tolls</p>
                  </div>

                  <div className="flex flex-col gap-3 w-full md:w-auto">
                    {activeTab === "Upcoming" && (
                      <button className="premium-button text-sm py-2 px-6 shadow-md w-full justify-center">
                        Track Driver
                      </button>
                    )}
                    {activeTab === "Upcoming" && (
                      <button className="secondary-button text-sm py-2 px-6 w-full justify-center text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-200">
                        Cancel Trip
                      </button>
                    )}
                    {activeTab === "Past" && (
                      <button className="secondary-button text-sm py-2 px-6 w-full justify-center">
                        Download Invoice
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
