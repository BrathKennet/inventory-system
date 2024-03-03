"use server";

import { supabase } from "@/config/supabase";
import { revalidatePath } from "next/cache";

export async function revalidateSupplier() {
  revalidatePath("/suppliers");
}

export async function addSupplierServer(
  name: string,
  address: string,
  phone: string,
  email: string
) {
  const { data, error } = await supabase
    .from("suppliers")
    .insert([{ name, address, phone, email }])
    .select();

  const errorMessage = error?.message;

  return { data, errorMessage };
}

export async function editSupplierServer(
  id: string,
  name: string,
  address: string,
  phone: string,
  email: string
) {
  const { data, error } = await supabase
    .from("suppliers")
    .update([{ name, address, phone, email }])
    .eq("id", id)
    .select();

  const errorMessage = error?.message;

  return { data, errorMessage };
}

export async function deleteSupplierServer(id: string) {
  const { error } = await supabase.from("suppliers").delete().eq("id", id);

  const errorMessage = error?.message;

  return { errorMessage };
}

export async function getCountSupplierServer(query: string, rows: number) {
  const { count } = await supabase
    .from("suppliers")
    .select("*", { count: "exact", head: true })
    .ilike("name", `%${query}%`);

  return count == null ? 0 : Math.ceil(count / rows);
}

export async function getAllSupplierServer(
  currentPage: number,
  query: string,
  rows: number
) {
  const initialPosition = rows * (currentPage - 1);
  const lastPosition = rows * currentPage - 1;

  const { data: suppliers } = await supabase
    .from("suppliers")
    .select("*")
    .ilike("name", `%${query}%`)
    .range(initialPosition, lastPosition)
    .order("name");

  return suppliers;
}

export async function getUniqueSupplierServer(id: string) {
  const { data } = await supabase
    .from("suppliers")
    .select("*")
    .eq("id", id)
    .single();

  return data;
}
