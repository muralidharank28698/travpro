"use client";

import { useTransition } from "react";
import { cancelBooking } from "@/lib/actions/booking";

interface CancelBookingButtonProps {
  bookingId: string;
}

export default function CancelBookingButton({ bookingId }: CancelBookingButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      startTransition(async () => {
        const result = await cancelBooking(bookingId);
        if (result?.error) {
          alert(result.error);
        }
      });
    }
  };

  return (
    <button
      onClick={handleCancel}
      disabled={isPending}
      className={`p-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors ${
        isPending ? "opacity-50 cursor-not-allowed" : "opacity-0 group-hover:opacity-100"
      }`}
    >
      {isPending ? "..." : "Cancel"}
    </button>
  );
}
