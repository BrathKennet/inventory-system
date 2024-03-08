"use server";

import { supabase } from "@/config/supabase";
import { revalidatePath } from "next/cache";

export async function revalidateClient() {
  revalidatePath("/clients", "page");
}

export async function addClientServer(
  name: string,
  address: string,
  phone: string,
  email: string
) {
  const { data, error } = await supabase
    .from("clients")
    .insert([{ name, address, phone, email }])
    .select();

  const errorMessage = error?.message;

  return { data, errorMessage };
}

export async function editClientServer(
  id: string,
  name: string,
  address: string,
  phone: string,
  email: string
) {
  const { data, error } = await supabase
    .from("clients")
    .update([{ name, address, phone, email }])
    .eq("id", id)
    .select();

  const errorMessage = error?.message;

  return { data, errorMessage };
}

export async function deleteClientServer(id: string) {
  const { error } = await supabase.from("clients").delete().eq("id", id);

  const errorMessage = error?.message;

  return { errorMessage };
}

export async function getCountClientServer(query: string, rows: number) {
  const { count } = await supabase
    .from("clients")
    .select("*", { count: "exact", head: true })
    .ilike("name", `%${query}%`);

  return count == null ? 0 : Math.ceil(count / rows);
}

export async function getAllClientByRangeServer(
  currentPage: number,
  query: string,
  rows: number
) {
  const initialPosition = rows * (currentPage - 1);
  const lastPosition = rows * currentPage - 1;

  const { data: clients } = await supabase
    .from("clients")
    .select("*")
    .ilike("name", `%${query}%`)
    .range(initialPosition, lastPosition)
    .order("name");

  return clients;
}

export async function getAllClientServer() {
  const { data: clients } = await supabase
    .from("clients")
    .select("*")
    .order("name");
  return clients;
}

export async function getUniqueClientServer(id: string) {
  const { data } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();

  return data;
}
