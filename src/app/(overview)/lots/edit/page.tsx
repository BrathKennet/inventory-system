import EditLotForm from "@/components/forms/lot/edit-lot";
import Title from "@/components/title";
import { getUniqueLotServer } from "@/services/lot/server";
import { getAllProductServer } from "@/services/product/server";
import { getAllSupplierServer } from "@/services/supplier/server";
import { redirect } from "next/navigation";

export default async function EditLotPage({
  searchParams,
}: {
  searchParams?: {
    id?: string;
  };
}) {
  const id = searchParams?.id || "";
  const lot = await getUniqueLotServer(id);

  if (lot == null) {
    redirect("/lots");
  }

  const [products, suppliers] = await Promise.all([
    getAllProductServer(),
    getAllSupplierServer(),
  ]);

  return (
    <>
      <Title text="Lots / Add" />
      <EditLotForm products={products} suppliers={suppliers} lot={lot} />
    </>
  );
}
