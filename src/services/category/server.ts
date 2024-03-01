"use server";

import { supabase } from "@/config/supabase";
import { revalidatePath } from "next/cache";

export async function revalidateCategory() {
  revalidatePath("/categories");
}

export async function addCategoryServer(name: string) {
  const { data, error } = await supabase
    .from("categories")
    .insert([{ name }])
    .select();

  const errorMessage = error?.message;

  return { data, errorMessage };
}

export async function editCategoryServer(id: string, name: string) {
  const { data, error } = await supabase
    .from("categories")
    .update([{ name }])
    .eq("id", id)
    .select();

  const errorMessage = error?.message;

  return { data, errorMessage };
}

export async function deleteCategoryServer(id: string) {
  const { error } = await supabase.from("categories").delete().eq("id", id);

  const errorMessage = error?.message;

  return { errorMessage };
}

export async function getCountCategoryServer(query: string, rows: number) {
  /* const quantity = 3; */

  const { count } = await supabase
    .from("categories")
    .select("*", { count: "exact", head: true })
    .ilike("name", `%${query}%`);

  return count == null ? 0 : Math.ceil(count / rows);
}

export async function getAllCategoryServer(
  currentPage: number,
  query: string,
  rows: number
) {
  /* const quantity = 3; */

  const initialPosition = rows * (currentPage - 1);
  const lastPosition = rows * currentPage - 1;

  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .ilike("name", `%${query}%`)
    .range(initialPosition, lastPosition)
    .order("name");

  return categories;
}
