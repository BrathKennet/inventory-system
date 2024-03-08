import { FormDeleteState, FormPersonState } from "@/models/state_forms";
import { FormPersonSchema } from "@/models/zod_schema";
import { addClientServer, deleteClientServer, editClientServer, revalidateClient } from "./server";
import { showToast } from "@/components/toast";
import { TypeToast } from "@/models/enum_models";
import { redirect } from "next/navigation";

export async function addClient(
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

  const { errorMessage } = await addClientServer(name, address, phone, email);

  if (errorMessage) {
    console.log(errorMessage);
    return { message: errorMessage };
  }

  showToast("Added Client", TypeToast.SUCCESS);

  await revalidateClient();
  redirect("/clients");
}

export async function editClient(
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

  const { errorMessage } = await editClientServer(
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

  showToast("Edited Client", TypeToast.SUCCESS);

  await revalidateClient();
  redirect("/clients");
}

export async function deleteClient(
  prevState: FormDeleteState,
  formData: FormData
): Promise<FormDeleteState> {
  const id = formData.get("id") as string;

  const { errorMessage } = await deleteClientServer(id);

  if (errorMessage) {
    console.log(errorMessage);
    return { message: errorMessage };
  }

  showToast("Deleted Client", TypeToast.ERROR);

  await revalidateClient();
  redirect("/clients");
}
