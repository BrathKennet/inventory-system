"use server";

import { supabase } from "@/config/supabase";
import { revalidatePath } from "next/cache";

export async function revalidateSale() {
  revalidatePath("/sales", "page");
}

export async function addSaleServer(
  clientId: string,
  quantitySold: number,
  totalSold: number,
  saleDate: Date,
  detail: any[]
) {
  const { data, error } = await supabase
    .from("sales")
    .insert([
      {
        id_client: clientId,
        quantity_sold: quantitySold,
        total_sold: totalSold,
        sale_date: saleDate,
        detail,
      },
    ])
    .select();

  const errorMessage = error?.message;

  return { data, errorMessage };
}

export async function editSaleServer(
  id: string,
  clientId: string,
  quantitySold: number,
  totalSold: number,
  saleDate: Date,
  detail: any[]
) {
  const { data, error } = await supabase
    .from("sales")
    .update([
      {
        id_client: clientId,
        quantity_sold: quantitySold,
        total_sold: totalSold,
        sale_date: saleDate,
        detail,
      },
    ])
    .eq("id", id)
    .select();

  const errorMessage = error?.message;

  return { data, errorMessage };
}

export async function deleteSaleServer(id: string) {
  const { error } = await supabase.from("sales").delete().eq("id", id);

  const errorMessage = error?.message;

  return { errorMessage };
}

export async function getCountSaleServer(query: string, rows: number) {
  const { data, error } = await supabase
    .rpc("count_sales", { query })
    .select("*")
    .single();

  return error ? 0 : Math.ceil(data.count / rows);
}

export async function getAllSaleByRangeServer(
  currentPage: number,
  query: string,
  rows: number
) {
  const initialPosition = rows * (currentPage - 1);
  const lastPosition = rows * currentPage - 1;

  const { data: suppliers } = await supabase
    .rpc("get_all_sales_clients")
    .ilike("name_client", `%${query}%`)
    .select("*")
    .range(initialPosition, lastPosition)
    .order("sale_date", { ascending: false });

  return suppliers;
}

export async function getAllSaleServer(
) {
  const { data: suppliers } = await supabase
    .rpc("get_all_sales_clients")
    .select("*")
    .order("sale_date");

  return suppliers;
}

export async function getUniqueSaleServer(id: string) {
  const { data } = await supabase
    .from("sales")
    .select("*")
    .eq("id", id)
    .single();

  return data;
}
