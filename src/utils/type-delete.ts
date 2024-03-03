import { TypeDeleteForm } from "@/models/enum_models";
import { FormDeleteState } from "@/models/state_forms";
import { deleteCategory } from "@/services/category/client";
import { deleteSupplier } from "@/services/supplier/client";

async function deleteDefaultError(
  prevState: FormDeleteState,
  formData: FormData
): Promise<FormDeleteState> {
  return { message: "An error occurred" };
}

export const getDelete = (v: TypeDeleteForm) => {
  switch (v) {
    case TypeDeleteForm.CATEGORY:
      return deleteCategory;
    case TypeDeleteForm.SUPPLIER:
      return deleteSupplier;
    default:
      return deleteDefaultError;
  }
};

