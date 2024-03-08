"use server";

import { supabase } from "@/config/supabase";
import { revalidatePath } from "next/cache";

export async function revalidateLot() {
  revalidatePath("/lots", "page");
}

export async function addLotServer(
  productId: string,
  supplierId: string,
  purchaseQuantity: number,
  purchasePriceUnit: number,
  salePriceUnit: number,
  purchaseDate: Date,
  expirationDate: Date
) {
  const { data, error } = await supabase
    .from("lots")
    .insert([
      {
        id_product: productId,
        id_supplier: supplierId,
        stock: purchaseQuantity,
        purchase_quantity: purchaseQuantity,
        purchase_price_unit: purchasePriceUnit,
        sale_price_unit: salePriceUnit,
        purchase_date: purchaseDate,
        expiration_date: expirationDate,
      },
    ])
    .select();

  const errorMessage = error?.message;

  return { data, errorMessage };
}

export async function editLotServer(
  id: string,
  productId: string,
  supplierId: string,
  stock: number,
  purchaseQuantity: number,
  purchasePriceUnit: number,
  salePriceUnit: number,
  purchaseDate: Date,
  expirationDate: Date
) {
  const { data, error } = await supabase
    .from("lots")
    .update([
      {
        id_product: productId,
        id_supplier: supplierId,
        stock: stock,
        purchase_quantity: purchaseQuantity,
        purchase_price_unit: purchasePriceUnit,
        sale_price_unit: salePriceUnit,
        purchase_date: purchaseDate,
        expiration_date: expirationDate,
      },
    ])
    .eq("id", id)
    .select();

  const errorMessage = error?.message;

  return { data, errorMessage };
}

export async function deleteLotServer(id: string) {
  const { error } = await supabase.from("lots").delete().eq("id", id);

  const errorMessage = error?.message;

  return { errorMessage };
}

export async function getCountLotServer(query: string, rows: number) {
  const { count } = await supabase
    .from("lots")
    .select("*", { count: "exact", head: true })
    .or(`name_product.ilike.%${query}%,name_supplier.ilike.%${query}%`);

  return count == null ? 0 : Math.ceil(count / rows);
}

export async function getAllLotByRangeServer(
  currentPage: number,
  query: string,
  rows: number
) {
  const initialPosition = rows * (currentPage - 1);
  const lastPosition = rows * currentPage - 1;

  const { data: lots } = await supabase
    .rpc("get_all_lots_products_suppliers")
    .or(`name_product.ilike.%${query}%,name_supplier.ilike.%${query}%`)
    .select("*")
    .range(initialPosition, lastPosition)
    .order("purchase_date");

  return lots;
}

export async function getAllLotServer() {
  const { data: lots } = await supabase
    .rpc("get_all_lots_products_suppliers")
    .select("*")
    .order("name_product");

  return lots;
}

export async function getUniqueLotServer(id: string) {
  const { data } = await supabase
    .from("lots")
    .select("*")
    .eq("id", id)
    .single();

  return data;
}

export async function updateStockLotServer(id: string, stock: number) {
  const { data, error } = await supabase
    .from("lots")
    .update([{ stock }])
    .eq("id", id)
    .select();

  const errorMessage = error?.message;

  return { data, errorMessage };
}
