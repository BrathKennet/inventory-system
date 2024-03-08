import { TypeDeleteForm } from "@/models/enum_models";
import { FormDeleteState } from "@/models/state_forms";
import { deleteCategory } from "@/services/category/client";
import { deleteClient } from "@/services/client/client";
import { deleteLot } from "@/services/lot/client";
import { deleteProduct } from "@/services/product/client";
import { deleteSale } from "@/services/sale/client";
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
    case TypeDeleteForm.PRODUCT:
      return deleteProduct;
    case TypeDeleteForm.LOT:
      return deleteLot;
    case TypeDeleteForm.CLIENT:
      return deleteClient;
    case TypeDeleteForm.SALE:
      return deleteSale;
    default:
      return deleteDefaultError;
  }
};

