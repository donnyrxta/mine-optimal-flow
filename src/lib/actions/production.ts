import { supabase } from "@/integrations/supabase/client";

export async function createProductionRecord(formData: FormData) {
  const date = formData.get("date") as string;
  const shift = formData.get("shift") as string;
  const materialType = formData.get("materialType") as string;
  const quantity = parseFloat(formData.get("quantity") as string);
  const quality = formData.get("quality") as string;
  const location = formData.get("location") as string;
  const notes = formData.get("notes") as string;

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("Not authenticated");
  }

  const { error } = await supabase
    .from("production_records")
    .insert({
      user_id: user.id,
      date,
      shift,
      material_type: materialType,
      quantity,
      quality,
      location,
      notes: notes || null,
    });

  if (error) {
    throw new Error("Failed to create production record");
  }
}

export async function updateProductionRecord(id: string, formData: FormData) {
  const date = formData.get("date") as string;
  const shift = formData.get("shift") as string;
  const materialType = formData.get("materialType") as string;
  const quantity = parseFloat(formData.get("quantity") as string);
  const quality = formData.get("quality") as string;
  const location = formData.get("location") as string;
  const notes = formData.get("notes") as string;

  const { error } = await supabase
    .from("production_records")
    .update({
      date,
      shift,
      material_type: materialType,
      quantity,
      quality,
      location,
      notes: notes || null,
    })
    .eq("id", id);

  if (error) {
    throw new Error("Failed to update production record");
  }
}

export async function deleteProductionRecord(id: string) {
  const { error } = await supabase
    .from("production_records")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Failed to delete production record");
  }
}

export async function getProductionRecords() {
  const { data, error } = await supabase
    .from("production_records")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch production records");
  }

  return data || [];
}