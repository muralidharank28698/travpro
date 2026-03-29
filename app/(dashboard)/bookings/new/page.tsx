import { MOCK_CARS } from "@/lib/mock-data";
import BookingForm from "@/components/booking/BookingForm";
import { notFound } from "next/navigation";

export default async function NewBookingPage({
  searchParams,
}: {
  searchParams: Promise<{ carId: string }>;
}) {
  const { carId } = await searchParams;

  if (!carId) {
    notFound();
  }

  const car = MOCK_CARS.find((c) => c.id === carId);

  if (!car) {
    notFound();
  }

  return (
    <div className="py-8">
      <BookingForm carId={car.id} carName={car.name} />
    </div>
  );
}
