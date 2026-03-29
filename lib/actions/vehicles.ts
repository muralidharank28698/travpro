"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addVehicle(formData: FormData) {
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const capacity = Number(formData.get("capacity"));
  const price_per_day = Number(formData.get("price"));

  try {
    const supabase = await createClient();
    
    // Admin action: insert new vehicle
    const { error } = await supabase
      .from("vehicles")
      .insert({
        name,
        type,
        capacity,
        price_per_day,
        is_available: true,
      });

    if (error && process.env.NEXT_PUBLIC_MOCK_MODE !== 'true') {
      return { success: false, error: "Database insert failed." };
    }
    
    revalidatePath("/cars");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Unexpected error occurred." };
  }
}

export async function toggleVehicleStatus(vehicleId: string, currentStatus: boolean) {
  try {
    const supabase = await createClient();
    
    // Admin action: update vehicle availability
    const { error } = await supabase
      .from("vehicles")
      .update({ is_available: !currentStatus })
      .eq("id", vehicleId);

    if (error && process.env.NEXT_PUBLIC_MOCK_MODE !== 'true') {
      return { success: false, error: "Database update failed." };
    }
    
    revalidatePath("/cars");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Unexpected error occurred." };
  }
}
