import { showToast } from "@/components/toast";
import { TypeToast, TypeTransaction } from "@/models/enum_models";
import { FormDeleteState, FormLotState } from "@/models/state_forms";
import { FormLotSchema } from "@/models/zod_schema";
import {
  addLotServer,
  deleteLotServer,
  editLotServer,
  revalidateLot,
  updateStockLotServer,
} from "./server";
import { redirect } from "next/navigation";
import { addTransactionServer } from "../transaction/server";
import { getIdTransaction } from "@/utils/type-transaction";
import { getUniqueProductServer } from "../product/server";

export async function addLot(
  prevState: FormLotState,
  formData: FormData
): Promise<FormLotState> {
  const productId = formData.get("productId") as string;
  const supplierId = formData.get("supplierId") as string;
  const purchaseQuantity = formData.get("purchaseQuantity") as string;
  const purchasePriceUnit = formData.get("purchasePriceUnit") as string;
  const salePriceUnit = formData.get("salePriceUnit") as string;
  const purchaseDate = formData.get("purchaseDate") as string;
  const expirationDate = formData.get("expirationDate") as string;

  const validatedFields = FormLotSchema.omit({
    stock: true,
  }).safeParse({
    productId,
    supplierId,
    purchaseQuantity,
    purchasePriceUnit,
    salePriceUnit,
    purchaseDate,
    expirationDate,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data, errorMessage } = await addLotServer(
    productId,
    supplierId,
    Number(purchaseQuantity),
    Number(purchasePriceUnit),
    Number(salePriceUnit),
    new Date(purchaseDate),
    new Date(expirationDate)
  );

  if (!data || errorMessage) {
    return { message: errorMessage ? errorMessage : "An error occurred" };
  }

  const product = await getUniqueProductServer(productId);

  const result = await addTransactionServer(
    getIdTransaction(TypeTransaction.ADD),
    Number(purchaseQuantity),
    new Date(purchaseDate),
    productId,
    product.name
  );

  showToast("Added Lot", TypeToast.SUCCESS);

  if (result.errorMessage) {
    showToast("Error Added Transaction", TypeToast.ERROR);
  }

  await revalidateLot();
  redirect("/lots");
}

export async function editLot(
  prevState: FormLotState,
  formData: FormData
): Promise<FormLotState> {
  const id = formData.get("id") as string;
  const productId = formData.get("productId") as string;
  const supplierId = formData.get("supplierId") as string;
  const stock = formData.get("stock") as string;
  const purchaseQuantity = formData.get("purchaseQuantity") as string;
  const purchasePriceUnit = formData.get("purchasePriceUnit") as string;
  const salePriceUnit = formData.get("salePriceUnit") as string;
  const purchaseDate = formData.get("purchaseDate") as string;
  const expirationDate = formData.get("expirationDate") as string;

  const validatedFields = FormLotSchema.safeParse({
    productId,
    supplierId,
    stock,
    purchaseQuantity,
    purchasePriceUnit,
    salePriceUnit,
    purchaseDate,
    expirationDate,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data, errorMessage } = await editLotServer(
    id,
    productId,
    supplierId,
    Number(stock),
    Number(purchaseQuantity),
    Number(purchasePriceUnit),
    Number(salePriceUnit),
    new Date(purchaseDate),
    new Date(expirationDate)
  );

  if (!data || errorMessage) {
    return { message: errorMessage ? errorMessage : "An error occurred" };
  }

  showToast("Edited Lot", TypeToast.SUCCESS);

  await revalidateLot();
  redirect("/lots");
}

export async function deleteLot(
  prevState: FormDeleteState,
  formData: FormData
): Promise<FormDeleteState> {
  const id = formData.get("id") as string;

  const { errorMessage } = await deleteLotServer(id);

  if (errorMessage) {
    return { message: errorMessage ? errorMessage : "An error occurred" };
  }

  showToast("Deleted Lot", TypeToast.ERROR);

  await revalidateLot();
  redirect("/lots");
}

export async function removeStockLot(
  prevState: FormDeleteState,
  formData: FormData
): Promise<FormDeleteState> {
  const id = formData.get("id") as string;
  const quantity = formData.get("stock") as string;
  const productId = formData.get("productId") as string;
  const productName = formData.get("productName") as string;

  const { data, errorMessage } = await updateStockLotServer(id, 0);

  if (!data || errorMessage) {
    return { message: errorMessage ? errorMessage : "An error occurred" };
  }

  const result = await addTransactionServer(
    getIdTransaction(TypeTransaction.REMOVE),
    Number(quantity),
    new Date(),
    productId,
    productName
  );

  showToast("Stock Empty", TypeToast.ERROR);

  if (result.errorMessage) {
    showToast("Error Added Transaction", TypeToast.ERROR);
  }

  await revalidateLot();
  redirect("/lots");
}
