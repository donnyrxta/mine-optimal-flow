"use server";

import { supabase } from "@/integrations/supabase/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createEquipment(formData: FormData) {
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const model = formData.get("model") as string;
  const serialNumber = formData.get("serialNumber") as string;
  const status = formData.get("status") as string;
  const location = formData.get("location") as string;
  const purchaseDate = formData.get("purchaseDate") as string;

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase
    .from("equipment")
    .insert({
      user_id: user.id,
      name,
      type,
      model: model || null,
      serial_number: serialNumber || null,
      status,
      location: location || null,
      purchase_date: purchaseDate || null,
    });

  if (error) {
    throw new Error("Failed to create equipment");
  }

  revalidatePath("/dashboard/equipment");
}

export async function updateEquipment(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const model = formData.get("model") as string;
  const serialNumber = formData.get("serialNumber") as string;
  const status = formData.get("status") as string;
  const location = formData.get("location") as string;
  const purchaseDate = formData.get("purchaseDate") as string;

  const { error } = await supabase
    .from("equipment")
    .update({
      name,
      type,
      model: model || null,
      serial_number: serialNumber || null,
      status,
      location: location || null,
      purchase_date: purchaseDate || null,
    })
    .eq("id", id);

  if (error) {
    throw new Error("Failed to update equipment");
  }

  revalidatePath("/dashboard/equipment");
}

export async function deleteEquipment(id: string) {
  const { error } = await supabase
    .from("equipment")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Failed to delete equipment");
  }

  revalidatePath("/dashboard/equipment");
}

export async function getEquipment() {
  const { data, error } = await supabase
    .from("equipment")
    .select("*")
    .order("name");

  if (error) {
    throw new Error("Failed to fetch equipment");
  }

  return data || [];
}