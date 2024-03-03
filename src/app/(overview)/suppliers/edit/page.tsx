import EditSupplierForm from "@/components/forms/supplier/edit-supplier";
import Title from "@/components/title";
import { getUniqueSupplierServer } from "@/services/supplier/server";
import { redirect } from "next/navigation";

export default async function EditSupplierPage({
  searchParams,
}: {
  searchParams?: {
    id?: string;
  };
}) {
  const id = searchParams?.id || '';
  const supplier = await getUniqueSupplierServer(id);
  if (supplier == null) {
    redirect("/suppliers");
  }

  return (
    <>
      <Title text="Suppliers / Edit" />
      <EditSupplierForm supplier={supplier} />
    </>
  );
}
