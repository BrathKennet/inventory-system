"use server";

import { supabase } from "@/config/supabase";
import { revalidatePath } from "next/cache";

export async function revalidateCategory() {
  revalidatePath("/categories", "page");
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
  const { count } = await supabase
    .from("categories")
    .select("*", { count: "exact", head: true })
    .ilike("name", `%${query}%`);

  return count == null ? 0 : Math.ceil(count / rows);
}

export async function getAllCategoryByRangeServer(
  currentPage: number,
  query: string,
  rows: number
) {
  const initialPosition = rows * (currentPage - 1);
  const lastPosition = rows * currentPage - 1;

  const { data: categories } = await supabase
    .rpc("get_all_categories_count_product")
    .ilike("name", `%${query}%`)
    .select("*")
    .range(initialPosition, lastPosition)
    .order("name");

  return categories;
}

export async function getAllCategoryServer() {
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");
  return categories;
}
