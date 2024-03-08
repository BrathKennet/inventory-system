import { FormDeleteState, FormProductState } from "@/models/state_forms";
import { FormProductSchema } from "@/models/zod_schema";
import {
  addProductServer,
  deleteProductServer,
  editProductServer,
  revalidateProduct,
} from "./server";
import { showToast } from "@/components/toast";
import { TypeToast } from "@/models/enum_models";
import { redirect } from "next/navigation";

export async function addProduct(
  prevState: FormProductState,
  formData: FormData
): Promise<FormProductState> {
  const categoryId = formData.get("categoryId") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  const validatedFields = FormProductSchema.safeParse({
    categoryId,
    name,
    description,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { errorMessage } = await addProductServer(
    categoryId,
    name,
    description
  );

  if (errorMessage) {
    console.log(errorMessage);
    return { message: errorMessage };
  }

  showToast("Added Product", TypeToast.SUCCESS);

  await revalidateProduct();
  redirect("/products");
}

export async function editProduct(
  prevState: FormProductState,
  formData: FormData
): Promise<FormProductState> {
  const id = formData.get("id") as string;
  const categoryId = formData.get("categoryId") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  const validatedFields = FormProductSchema.safeParse({
    categoryId,
    name,
    description,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { errorMessage } = await editProductServer(
    id,
    categoryId,
    name,
    description
  );

  if (errorMessage) {
    console.log(errorMessage);
    return { message: errorMessage };
  }

  showToast("Edited Product", TypeToast.SUCCESS);

  await revalidateProduct();
  redirect("/products");
}

export async function deleteProduct(
  prevState: FormDeleteState,
  formData: FormData
): Promise<FormDeleteState> {
  const id = formData.get("id") as string;

  const { errorMessage } = await deleteProductServer(id);

  if (errorMessage) {
    console.log(errorMessage);
    return { message: errorMessage };
  }

  showToast("Deleted Product", TypeToast.ERROR);

  await revalidateProduct();
  redirect("/products");
}
