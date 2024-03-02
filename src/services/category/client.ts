import { FormCategoryState, FormDeleteState } from "@/models/state_forms";
import { FormCategorySchema } from "@/models/zod_schema";
import {
  addCategoryServer,
  deleteCategoryServer,
  editCategoryServer,
  revalidateCategory,
} from "./server";
/* import { showToast } from "@/utils/toast"; */
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

  const { data, errorMessage } = await addCategoryServer(name);

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
  const nameCategory = formData.get("name") as string;
  const idCategory = formData.get("id") as string;

  const validatedFields = FormCategorySchema.safeParse({
    nameCategory,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data, errorMessage } = await editCategoryServer(
    idCategory,
    nameCategory
  );

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
  const idCategory = formData.get("id") as string;

  const { errorMessage } = await deleteCategoryServer(idCategory);

  if (errorMessage) {
    console.log(errorMessage);
    return { message: errorMessage };
  }

  showToast("Deleted Category", TypeToast.ERROR);

  await revalidateCategory();
}
