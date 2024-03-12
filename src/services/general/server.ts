"use server";

import { supabase } from "@/config/supabase";

export async function getTableTotals() {
  const { data, error } = await supabase
    .rpc("get_table_totals")
    .select('*')
    .single();

  const errorMessage = error?.message;

  return { data, errorMessage };
}
