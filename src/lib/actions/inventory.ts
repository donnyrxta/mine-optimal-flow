"use server";

import { supabase } from "@/integrations/supabase/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createInventoryItem(formData: FormData) {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const sku = formData.get("sku") as string;
  const currentStock = parseInt(formData.get("currentStock") as string);
  const minimumStock = parseInt(formData.get("minimumStock") as string);
  const maximumStock = parseInt(formData.get("maximumStock") as string);
  const unitCost = parseFloat(formData.get("unitCost") as string);
  const location = formData.get("location") as string;

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase
    .from("inventory_items")
    .insert({
      user_id: user.id,
      name,
      category,
      sku: sku || null,
      current_stock: currentStock || 0,
      minimum_stock: minimumStock || 0,
      maximum_stock: maximumStock || null,
      unit_cost: unitCost || null,
      location: location || null,
    });

  if (error) {
    throw new Error("Failed to create inventory item");
  }

  revalidatePath("/dashboard/inventory");
}

export async function updateInventoryItem(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const sku = formData.get("sku") as string;
  const currentStock = parseInt(formData.get("currentStock") as string);
  const minimumStock = parseInt(formData.get("minimumStock") as string);
  const maximumStock = parseInt(formData.get("maximumStock") as string);
  const unitCost = parseFloat(formData.get("unitCost") as string);
  const location = formData.get("location") as string;

  const { error } = await supabase
    .from("inventory_items")
    .update({
      name,
      category,
      sku: sku || null,
      current_stock: currentStock || 0,
      minimum_stock: minimumStock || 0,
      maximum_stock: maximumStock || null,
      unit_cost: unitCost || null,
      location: location || null,
    })
    .eq("id", id);

  if (error) {
    throw new Error("Failed to update inventory item");
  }

  revalidatePath("/dashboard/inventory");
}

export async function deleteInventoryItem(id: string) {
  const { error } = await supabase
    .from("inventory_items")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Failed to delete inventory item");
  }

  revalidatePath("/dashboard/inventory");
}

export async function getInventoryItems() {
  const { data, error } = await supabase
    .from("inventory_items")
    .select("*")
    .order("name");

  if (error) {
    throw new Error("Failed to fetch inventory items");
  }

  return data || [];
}