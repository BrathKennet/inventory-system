import EditClientForm from "@/components/forms/client/edit-client";
import Title from "@/components/title";
import { getUniqueClientServer } from "@/services/client/server";
import { redirect } from "next/navigation";

export default async function EditClientPage({
  searchParams,
}: {
  searchParams?: {
    id?: string;
  };
}) {
  const id = searchParams?.id || "";
  const client = await getUniqueClientServer(id);
  if (client == null) {
    redirect("/clients");
  }

  return (
    <>
      <Title text="Clients / Edit" />
      <EditClientForm client={client} />
    </>
  );
}
