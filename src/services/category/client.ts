import { FormCategoryState, FormDeleteState } from "@/models/state_forms";
import { FormCategorySchema } from "@/models/zod_schema";
import {
  addCategoryServer,
  deleteCategoryServer,
  editCategoryServer,
  revalidateCategory,
} from "./server";
import { TypeToast } from "@/models/enum_models";
import { showToast } from "@/components/toast";

export async function addCategory(
  prevState: FormCategoryState,
  formData: FormData
): Promise<FormCategoryState> {
  const name = formData.get("name") as string;

  const validatedFields = FormCategorySchema.safeParse({
    name,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { errorMessage } = await addCategoryServer(name);

  if (errorMessage) {
    console.log(errorMessage);
    return { message: errorMessage };
  }

  showToast("Added Category", TypeToast.SUCCESS);

  await revalidateCategory();
}

export async function editCategory(
  prevState: FormCategoryState,
  formData: FormData
): Promise<FormCategoryState> {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;

  const validatedFields = FormCategorySchema.safeParse({
    name,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { errorMessage } = await editCategoryServer(id, name);

  if (errorMessage) {
    console.log(errorMessage);
    return { message: errorMessage };
  }

  showToast("Edited Category", TypeToast.SUCCESS);

  await revalidateCategory();
}

export async function deleteCategory(
  prevState: FormDeleteState,
  formData: FormData
): Promise<FormDeleteState> {
  const id = formData.get("id") as string;

  const { errorMessage } = await deleteCategoryServer(id);

  if (errorMessage) {
    console.log(errorMessage);
    return { message: errorMessage };
  }

  showToast("Deleted Category", TypeToast.ERROR);

  await revalidateCategory();
}
