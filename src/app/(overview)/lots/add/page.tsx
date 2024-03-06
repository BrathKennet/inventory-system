import AddLotForm from "@/components/forms/lot/add-lot";
import Title from "@/components/title";
import { getAllProductServer } from "@/services/product/server";
import { getAllSupplierServer } from "@/services/supplier/server";

export default async function AddLotPage({
  searchParams,
}: {
  searchParams?: {
    idProduct?: string;
    idSupplier?: string;
  };
}) {
  const idProduct = searchParams?.idProduct;
  const idSupplier = searchParams?.idSupplier;
  const [products, suppliers] = await Promise.all([
    getAllProductServer(),
    getAllSupplierServer(),
  ]);

  return (
    <>
      <Title text="Lots / Add" />
      <AddLotForm
        products={products}
        suppliers={suppliers}
        idProduct={idProduct}
        idSupplier={idSupplier}
      />
    </>
  );
}