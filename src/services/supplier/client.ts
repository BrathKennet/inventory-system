import { FormSupplierState, FormDeleteState } from "@/models/state_forms";
import { FormCategorySchema, FormSupplierSchema } from "@/models/zod_schema";
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
  prevState: FormSupplierState,
  formData: FormData
): Promise<FormSupplierState> {
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;

  const validatedFields = FormSupplierSchema.safeParse({
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

  const { errorMessage } = await addSupplierServer(name, address, phone, email);

  if (errorMessage) {
    console.log(errorMessage);
    return { message: errorMessage };
  }

  showToast("Added Supplier", TypeToast.SUCCESS);

  await revalidateSupplier();
  redirect('/suppliers')
}

export async function editSupplier(
  prevState: FormSupplierState,
  formData: FormData
): Promise<FormSupplierState> {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;

  const validatedFields = FormCategorySchema.safeParse({
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

  const { errorMessage } = await editSupplierServer(
    id,
    name,
    address,
    phone,
    email
  );

  if (errorMessage) {
    console.log(errorMessage);
    return { message: errorMessage };
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
    console.log(errorMessage);
    return { message: errorMessage };
  }

  showToast("Deleted Supplier", TypeToast.ERROR);

  await revalidateSupplier();
}
