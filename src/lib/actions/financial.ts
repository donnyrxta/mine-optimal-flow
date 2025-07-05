"use server";

import { supabase } from "@/integrations/supabase/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createFinancialTransaction(formData: FormData) {
  const type = formData.get("type") as string;
  const category = formData.get("category") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const description = formData.get("description") as string;
  const transactionDate = formData.get("transactionDate") as string;

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase
    .from("financial_transactions")
    .insert({
      user_id: user.id,
      type,
      category,
      amount,
      description,
      transaction_date: transactionDate,
    });

  if (error) {
    throw new Error("Failed to create financial transaction");
  }

  revalidatePath("/dashboard/financial");
}

export async function updateFinancialTransaction(id: string, formData: FormData) {
  const type = formData.get("type") as string;
  const category = formData.get("category") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const description = formData.get("description") as string;
  const transactionDate = formData.get("transactionDate") as string;

  const { error } = await supabase
    .from("financial_transactions")
    .update({
      type,
      category,
      amount,
      description,
      transaction_date: transactionDate,
    })
    .eq("id", id);

  if (error) {
    throw new Error("Failed to update financial transaction");
  }

  revalidatePath("/dashboard/financial");
}

export async function deleteFinancialTransaction(id: string) {
  const { error } = await supabase
    .from("financial_transactions")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Failed to delete financial transaction");
  }

  revalidatePath("/dashboard/financial");
}

export async function getFinancialTransactions() {
  const { data, error } = await supabase
    .from("financial_transactions")
    .select("*")
    .order("transaction_date", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch financial transactions");
  }

  return data || [];
}