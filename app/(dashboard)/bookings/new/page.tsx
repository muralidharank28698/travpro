"use client";

import { useAppSelector } from "@/lib/store";
import BookingForm from "@/components/booking/BookingForm";
import { use } from "react";

export default function NewBookingPage({
  searchParams,
}: {
  searchParams: Promise<{ carId: string }>;
}) {
  const { carId } = use(searchParams);

  if (!carId) {
    return <div>Car ID is required.</div>;
  }

  const MOCK_CARS = useAppSelector((state) => state.cars.items);
  const car = MOCK_CARS.find((c) => c.id === carId);

  if (!car) {
    return <div>Car not found.</div>;
  }

  return (
    <div className="py-8">
      <BookingForm carId={car.id} carName={car.name} />
    </div>
  );
}
