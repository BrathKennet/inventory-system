import AddSaleForm from "@/components/forms/sale/add-sale";
import Title from "@/components/title";
import { getAllClientServer } from "@/services/client/server";
import { getAllLotServer } from "@/services/lot/server";

export default async function AddSalePage({
  searchParams,
}: {
  searchParams?: {
    idClient?: string;
  };
}) {
  const idClient = searchParams?.idClient;
  const clients = await getAllClientServer();
  const lots = await getAllLotServer();

  return (
    <>
      <Title text="Sales / Add" />
      <AddSaleForm clients={clients} lots={lots} idClient={idClient} />
    </>
  );
}
