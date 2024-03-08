import EditSaleForm from "@/components/forms/sale/edit-sale";
import Title from "@/components/title";
import { getAllClientServer } from "@/services/client/server";
import { getAllLotServer } from "@/services/lot/server";
import { getUniqueSaleServer } from "@/services/sale/server";
import { redirect } from "next/navigation";

export default async function EditSalePage({
  searchParams,
}: {
  searchParams?: {
    id?: string;
  };
}) {
  const id = searchParams?.id || "";
  const sale = await getUniqueSaleServer(id);
  if (sale == null) {
    redirect("/sales");
  }
  const clients = await getAllClientServer();
  const lots = await getAllLotServer();

  const listSelectInitial = sale.detail.map((d: any) => {
    const indexSelect = lots?.findIndex((v) => v.id === d.id_lot);
    if (lots && indexSelect != undefined && indexSelect !== -1) {
      return lots[indexSelect];
    }
  });

  return (
    <>
      <Title text="Sales / Edit" />
      <EditSaleForm
        sale={sale}
        clients={clients}
        lots={lots}
        listSelectInitial={listSelectInitial}
        detail={sale.detail}
      />
    </>
  );
}
