"use server";

import { supabase } from "@/config/supabase";
import { revalidatePath } from "next/cache";

export async function revalidateProduct() {
  revalidatePath("/products", "page");
}

export async function addProductServer(
  categoryId: string,
  name: string,
  description: string
) {
  const { data, error } = await supabase
    .from("products")
    .insert([{ id_category: categoryId, name, description }])
    .select();

  const errorMessage = error?.message;

  return { data, errorMessage };
}

export async function editProductServer(
  id: string,
  categoryId: string,
  name: string,
  description: string
) {
  const { data, error } = await supabase
    .from("products")
    .update([{ id_category: categoryId, name, description }])
    .eq("id", id)
    .select();

  const errorMessage = error?.message;

  return { data, errorMessage };
}

export async function deleteProductServer(id: string) {
  const { error } = await supabase.from("products").delete().eq("id", id);

  const errorMessage = error?.message;

  return { errorMessage };
}

export async function getCountProductServer(query: string, rows: number) {
  const { count } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .ilike("name", `%${query}%`);

  return count == null ? 0 : Math.ceil(count / rows);
}

export async function getAllProductByRangeServer(
  currentPage: number,
  query: string,
  rows: number
) {
  const initialPosition = rows * (currentPage - 1);
  const lastPosition = rows * currentPage - 1;

  const { data: products } = await supabase
    .rpc("get_all_products_categories_stock")
    .ilike("name", `%${query}%`)
    .select("*")
    .range(initialPosition, lastPosition)
    .order("name");

  return products;
}

export async function getAllProductServer() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("name");
  return products;
}

export async function getUniqueProductServer(id: string) {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  return data;
}
