import { FormPersonState, FormDeleteState } from "@/models/state_forms";
import { FormPersonSchema } from "@/models/zod_schema";
import {
  addSupplierServer,
  deleteSupplierServer,
  editSupplierServer,
  revalidateSupplier,
} from "./server";
import { TypeToast } from "@/models/enum_models";
import { showToast } from "@/components/toast";
import { redirect } from "next/navigation";

export async function addSupplier(
  prevState: FormPersonState,
  formData: FormData
): Promise<FormPersonState> {
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;

  const validatedFields = FormPersonSchema.safeParse({
    name,
    address,
    phone,
    email,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data, errorMessage } = await addSupplierServer(name, address, phone, email);

  if (!data || errorMessage) {
    return { message: errorMessage ? errorMessage : "An error occurred" };
  }

  showToast("Added Supplier", TypeToast.SUCCESS);

  await revalidateSupplier();
  redirect("/suppliers");
}

export async function editSupplier(
  prevState: FormPersonState,
  formData: FormData
): Promise<FormPersonState> {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;

  const validatedFields = FormPersonSchema.safeParse({
    name,
    address,
    phone,
    email,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data, errorMessage } = await editSupplierServer(
    id,
    name,
    address,
    phone,
    email
  );

  if (!data || errorMessage) {
    return { message: errorMessage ? errorMessage : "An error occurred" };
  }

  showToast("Edited Supplier", TypeToast.SUCCESS);

  await revalidateSupplier();
  redirect("/suppliers");
}

export async function deleteSupplier(
  prevState: FormDeleteState,
  formData: FormData
): Promise<FormDeleteState> {
  const id = formData.get("id") as string;

  const { errorMessage } = await deleteSupplierServer(id);

  if (errorMessage) {
    return { message: errorMessage ? errorMessage : "An error occurred" };
  }

  showToast("Deleted Supplier", TypeToast.ERROR);

  await revalidateSupplier();
  redirect("/suppliers");
}
