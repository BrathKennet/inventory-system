"use server";

import { supabase } from "@/config/supabase";

export async function signInWithPassword(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return error?.message;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  return error?.message;
}
