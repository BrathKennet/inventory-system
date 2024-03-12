import { getTableTotals } from "@/services/general/server";
import InfoCard from "./card";

export default async function InfoContainer() {
  const { data } = await getTableTotals();

  return (
    <div className="flex flex-wrap gap-x-3 gap-y-3 my-5 md:gap-x-12 md:gap-y-5 justify-center">
      <InfoCard title="Categories" quantity={data?.total_categories} />
      <InfoCard title="Products" quantity={data?.total_products} />
      <InfoCard title="Lots" quantity={data?.total_lots} />
      <InfoCard title="Suppliers" quantity={data?.total_suppliers} />
      <InfoCard title="Clients" quantity={data?.total_clients} />
      <InfoCard title="Sales" quantity={data?.total_sales} />
    </div>
  );
}
