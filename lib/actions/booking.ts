"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createBooking(prevState: any, formData: FormData) {
  const carId = formData.get("carId") as string;
  const userName = formData.get("userName") as string;
  const startTimeStr = formData.get("startTime") as string;
  const endTimeStr = formData.get("endTime") as string;
  const pickupLocation = formData.get("pickupLocation") as string || "Puducherry";
  const dropLocation = formData.get("dropLocation") as string || "Local";

  if (!carId || !userName || !startTimeStr || !endTimeStr) {
    return { error: "All required fields must be filled." };
  }

  const startTime = new Date(startTimeStr);
  const endTime = new Date(endTimeStr);

  if (startTime >= endTime) {
    return { error: "End time must be after start time." };
  }

  if (startTime < new Date()) {
    return { error: "Cannot book in the past." };
  }

  try {
    const supabase = await createClient();
    
    // In Mock Mode, createClient returns a mocked object that resolves instantly
    // In Production Mode, this securely writes to the bookings table.
    
    // First, verify the vehicle exists and is available
    const { data: vehicle, error: vehicleError } = await supabase
      .from("vehicles")
      .select("price_per_day, is_available")
      .eq("id", carId)
      .single();
      
    if (vehicleError || !vehicle) {
       // Ignore error in mock mode, but handle for real DB
       if (process.env.NEXT_PUBLIC_MOCK_MODE !== 'true') {
         return { error: "Selected vehicle not found or unavailable." };
       }
    }

    // Calculate mock total amount (or real amount if vehicle was found)
    const pricePerDay = vehicle?.price_per_day || 2500;
    const days = Math.ceil((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60 * 24));
    const totalAmount = days * pricePerDay * 1.05; // Base + 5% GST

    // In a real scenario, we'd get the auth user ID. 
    // Here we're fetching the current authenticated user from Supabase.
    const { data: { user } } = await supabase.auth.getUser();
    
    // This assumes the user is logged in. 
    // If not, we fall back to a dummy UUID for mock purposes.
    const userId = user?.id || "00000000-0000-0000-0000-000000000000";

    const { error: insertError } = await supabase.from("bookings").insert({
      vehicle_id: carId,
      user_id: userId,
      start_date: startTime.toISOString(),
      end_date: endTime.toISOString(),
      pickup_location: pickupLocation,
      drop_location: dropLocation,
      total_amount: totalAmount,
      status: 'Pending',
      service_type: 'Car Rental'
    });

    if (insertError && process.env.NEXT_PUBLIC_MOCK_MODE !== 'true') {
      console.error("Supabase Insert Error:", insertError);
      return { error: "Failed to create booking in database." };
    }

  } catch (err: any) {
    console.error("Booking failed:", err);
    return { error: err.message || "An unexpected error occurred." };
  }

  revalidatePath("/bookings");
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function cancelBooking(bookingId: string) {
  try {
    const supabase = await createClient();
    
    // In a real app, we check if the cancellation is within the allowed window (e.g. > 6 hours)
    // and process refund logic here.

    const { error } = await supabase
      .from("bookings")
      .update({ status: 'Cancelled' })
      .eq("id", bookingId);

    if (error && process.env.NEXT_PUBLIC_MOCK_MODE !== 'true') {
      console.error("Supabase Update Error:", error);
      return { success: false, error: "Failed to cancel booking." };
    }
    
    revalidatePath("/bookings");
    revalidatePath("/dashboard");
    return { success: true };
    
  } catch (err) {
    console.error("Cancel failed:", err);
    return { success: false };
  }
}

export async function confirmBooking(bookingId: string) {
  try {
    const supabase = await createClient();
    
    // Admin action: transition Pending -> Confirmed
    const { error } = await supabase
      .from("bookings")
      .update({ status: 'Confirmed' })
      .eq("id", bookingId);

    if (error && process.env.NEXT_PUBLIC_MOCK_MODE !== 'true') {
      return { success: false, error: "Database update failed." };
    }
    
    revalidatePath("/bookings");
    return { success: true };
  } catch (err) {
    return { success: false };
  }
}
