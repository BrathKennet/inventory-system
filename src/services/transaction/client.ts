import { FormDeleteState } from "@/models/state_forms";
import { deleteTransactionServer, revalidateTransaction } from "./server";
import { showToast } from "@/components/toast";
import { TypeToast } from "@/models/enum_models";
import { redirect } from "next/navigation";

export async function deleteTransaction(
  prevState: FormDeleteState,
  formData: FormData
): Promise<FormDeleteState> {
  const id = formData.get("id") as string;

  const { errorMessage } = await deleteTransactionServer(id);

  if (errorMessage) {
    return { message: errorMessage ? errorMessage : "An error occurred" };
  }

  showToast("Deleted Transaction", TypeToast.ERROR);

  await revalidateTransaction();
  redirect("/transactions");
}
