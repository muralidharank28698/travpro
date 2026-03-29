"use client";

import { useActionState } from "react";
import { createBooking } from "@/lib/actions/booking";
import Link from "next/link";

interface BookingFormProps {
  carId: string;
  carName: string;
}

export default function BookingForm({ carId, carName }: BookingFormProps) {
  const [state, action, isPending] = useActionState(createBooking, {
    error: "",
  });

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      {/* Back Link */}
      <Link
        href="/cars"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--color-primary)] transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Fleet
      </Link>

      <div className="card p-8 space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Book {carName}
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Fill in the details below to reserve this vehicle.
          </p>
        </div>

        <form action={action} className="space-y-5">
          <input type="hidden" name="carId" value={carId} />

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[var(--foreground)]">
              Your Name
            </label>
            <input
              name="userName"
              type="text"
              placeholder="e.g. Rajesh Kumar"
              className="form-input"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[var(--foreground)]">
                Start Time
              </label>
              <input
                name="startTime"
                type="datetime-local"
                className="form-input"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[var(--foreground)]">
                End Time
              </label>
              <input
                name="endTime"
                type="datetime-local"
                className="form-input"
                required
              />
            </div>
          </div>

          {state?.error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium text-center">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full premium-button disabled:opacity-50 disabled:cursor-not-allowed py-3.5"
          >
            {isPending ? "Checking availability..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}
