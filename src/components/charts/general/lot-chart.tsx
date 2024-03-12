import { getAllLotOrderDateServer } from "@/services/lot/server";
import TemplateLineChart from "../template/line-chart";

export default async function LotChart() {
  const lots = await getAllLotOrderDateServer();
  const categories = lots?.map((v) => v.purchase_date);
  const series = [
    {
      name: "Qty",
      data: lots ? lots?.map((v) => v.purchase_quantity) : [],
    },
  ];

  return (
    <div className="border p-4 rounded-xl w-full border-primary xl:col-span-2 ">
      <p className="uppercase text-lg">Stock Quantity Movement: </p>
      {lots ? (
        <TemplateLineChart
          id="lots"
          titleYAxis="Qty"
          categories={categories}
          dataSeries={series ? series : []}
        />
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
}
