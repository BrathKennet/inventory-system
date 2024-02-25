/* "use server"; */

import { FormAuthState } from "@/models/state_forms";
import { FormAuthSchema } from "@/utils/validation/zod_objects";
import { redirect } from "next/navigation";
import { signInWithPassword, signOut } from "./server";

export async function login(
  prevState: FormAuthState,
  formData: FormData
): Promise<FormAuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validatedFields = FormAuthSchema.safeParse({
    email,
    password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const error = await signInWithPassword(formData);

  if (error) {
    console.log(error);
    return { message: error };
  }

  redirect("/");
}

export async function logout(prevState: FormAuthState): Promise<FormAuthState> {
  const error = await signOut();
  if (error) {
    return { message: error };
  }
  redirect("/login");
}
