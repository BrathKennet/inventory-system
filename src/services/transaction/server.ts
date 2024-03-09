"use server";

import { supabase } from "@/config/supabase";
import { revalidatePath } from "next/cache";

export async function revalidateTransaction() {
  revalidatePath("/transactions", "page");
}

export async function addTransactionServer(
  typeId: number,
  quantity: number,
  transactionDate: Date,
  productId: string,
  nameProduct: string
) {
  const { data, error } = await supabase
    .from("transactions")
    .insert([
      {
        id_type: typeId,
        quantity,
        transaction_date: transactionDate,
        id_product: productId,
        name_product: nameProduct,
      },
    ])
    .select();

  const errorMessage = error?.message;

  return { data, errorMessage };
}

export async function deleteTransactionServer(id: string) {
  const { error } = await supabase.from("transactions").delete().eq("id", id);

  const errorMessage = error?.message;

  return { errorMessage };
}

export async function getCountTransactionServer(query: string, rows: number) {
  const { count } = await supabase
    .from("transactions")
    .select("*", { count: "exact", head: true })
    .ilike("name_product", `%${query}%`);

  return count == null ? 0 : Math.ceil(count / rows);
}

export async function getAllTransactionByRangeServer(
  currentPage: number,
  query: string,
  rows: number
) {
  const initialPosition = rows * (currentPage - 1);
  const lastPosition = rows * currentPage - 1;

  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .ilike("name_product", `%${query}%`)
    .range(initialPosition, lastPosition)
    .order("transaction_date", {ascending: false});

  return transactions;
}
