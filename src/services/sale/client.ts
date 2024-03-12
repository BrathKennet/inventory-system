import { showToast } from "@/components/toast";
import { TypeToast, TypeTransaction } from "@/models/enum_models";
import { FormDeleteState, FormSaleState } from "@/models/state_forms";
import { FormSaleSchema, generateFormSelectSchema } from "@/models/zod_schema";
import {
  addSaleServer,
  deleteSaleServer,
  editSaleServer,
  revalidateSale,
} from "./server";
import { redirect } from "next/navigation";
import { updateStockLotServer } from "../lot/server";
import { addTransactionServer } from "../transaction/server";
import { getIdTransaction } from "@/utils/type-transaction";

export async function addSale(
  prevState: FormSaleState,
  formData: FormData
): Promise<FormSaleState> {
  const clientId = formData.get("clientId") as string;
  const saleDate = formData.get("saleDate") as string;

  const validatedFields = FormSaleSchema.safeParse({
    clientId,
    saleDate,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const totalSelect = formData.get("numberSelect") as string;

  const detail = [];
  let quantitySold = 0;
  let totalSold = 0;

  for (let i = 0; i < Number(totalSelect); i++) {
    const lotId = formData.get(`lotId${i}`) as string;
    const detailLot = formData.get(`detailLot${i}`) as string;
    const quantityId = formData.get(`quantityId${i}`) as string;
    const maxQuantity = Number(detailLot ? detailLot.split("|")[3] : 0);
    const FormSelectLotSchema = generateFormSelectSchema(maxQuantity);

    const validateFieldsSelect = FormSelectLotSchema.safeParse({
      lotId,
      quantityId,
    });

    if (!validateFieldsSelect.success) {
      return {
        errorsSelect: { [i]: validateFieldsSelect.error.flatten().fieldErrors },
      };
    }

    detail.push({
      id_lot: lotId,
      quantity: Number(quantityId),
      price_unit: Number(detailLot.split("|")[2]),
      subtotal: Number(quantityId) * Number(detailLot.split("|")[2]),
      name_product: detailLot.split("|")[1],
    });

    quantitySold += Number(quantityId);
    totalSold += Number(quantityId) * Number(detailLot.split("|")[2]);
  }

  const { data, errorMessage } = await addSaleServer(
    clientId,
    quantitySold,
    totalSold,
    new Date(saleDate),
    detail
  );

  if (!data || errorMessage) {
    return { message: errorMessage ? errorMessage : "An error occurred" };
  }

  for (let i = 0; i < Number(totalSelect); i++) {
    const lotId = formData.get(`lotId${i}`) as string;
    const detailLot = formData.get(`detailLot${i}`) as string;
    const maxQuantity = Number(detailLot ? detailLot.split("|")[3] : 0);
    const productId = detailLot ? detailLot.split("|")[4] : "";
    const productName = detailLot ? detailLot.split("|")[1] : "";
    const quantityId = Number(formData.get(`quantityId${i}`) as string);

    const result = await updateStockLotServer(lotId, maxQuantity - quantityId);

    if (!result.data || result.errorMessage) {
      return {
        message: result.errorMessage ? result.errorMessage : "An error occurred",
      };
    }

    const resultTransaction = await addTransactionServer(
      getIdTransaction(TypeTransaction.SOLD),
      Number(quantityId),
      new Date(saleDate),
      productId,
      productName
    );

    if (resultTransaction.errorMessage) {
      showToast("Error Added Transaction", TypeToast.ERROR);
    }
  }

  showToast("Added Sale", TypeToast.SUCCESS);

  await revalidateSale();
  redirect("/sales");
}

export async function editSale(
  prevState: FormSaleState,
  formData: FormData
): Promise<FormSaleState> {
  const id = formData.get("id") as string;
  const clientId = formData.get("clientId") as string;
  const saleDate = formData.get("saleDate") as string;

  const validatedFields = FormSaleSchema.safeParse({
    clientId,
    saleDate,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const totalSelect = formData.get("numberSelect") as string;

  const detail = [];
  let quantitySold = 0;
  let totalSold = 0;

  for (let i = 0; i < Number(totalSelect); i++) {
    const lotId = formData.get(`lotId${i}`) as string;
    const detailLot = formData.get(`detailLot${i}`) as string;
    const quantityId = formData.get(`quantityId${i}`) as string;
    const maxQuantity = Number(detailLot ? detailLot.split("|")[3] : 0);
    const FormSelectLotSchema = generateFormSelectSchema(maxQuantity);

    const validateFieldsSelect = FormSelectLotSchema.safeParse({
      lotId,
      quantityId,
    });

    if (!validateFieldsSelect.success) {
      return {
        errorsSelect: { [i]: validateFieldsSelect.error.flatten().fieldErrors },
      };
    }

    detail.push({
      id_lot: lotId,
      quantity: Number(quantityId),
      price_unit: Number(detailLot.split("|")[2]),
      subtotal: Number(quantityId) * Number(detailLot.split("|")[2]),
      name_product: detailLot.split("|")[1],
    });

    quantitySold += Number(quantityId);
    totalSold += Number(quantityId) * Number(detailLot.split("|")[2]);
  }

  const { data, errorMessage } = await editSaleServer(
    id,
    clientId,
    quantitySold,
    totalSold,
    new Date(saleDate),
    detail
  );

  if (!data || errorMessage) {
    return { message: errorMessage ? errorMessage : "An error occurred" };
  }

  for (let i = 0; i < Number(totalSelect); i++) {
    const lotId = formData.get(`lotId${i}`) as string;
    const detailLot = formData.get(`detailLot${i}`) as string;
    const maxQuantity = Number(detailLot ? detailLot.split("|")[3] : 0);
    const quantityId = Number(formData.get(`quantityId${i}`) as string);

    const result = await updateStockLotServer(lotId, maxQuantity - quantityId);

    if (!result.data || result.errorMessage) {
      return {
        message: result.errorMessage ? result.errorMessage : "An error occurred",
      };
    }
  }

  showToast("Edited Sale", TypeToast.SUCCESS);

  await revalidateSale();
  redirect("/sales");
}

export async function deleteSale(
  prevState: FormDeleteState,
  formData: FormData
): Promise<FormDeleteState> {
  const id = formData.get("id") as string;

  const { errorMessage } = await deleteSaleServer(id);

  if (errorMessage) {
    return { message: errorMessage ? errorMessage : "An error occurred" };
  }

  showToast("Deleted Sale", TypeToast.ERROR);

  await revalidateSale();
  redirect("/sales");
}
