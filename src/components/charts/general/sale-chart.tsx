import { getAllSaleServer } from "@/services/sale/server";
import TemplateLineChart from "../template/line-chart";

export default async function SaleChart() {
  const sales = await getAllSaleServer();
  const categories = sales?.map((v) => v.sale_date);
  const series = [
    {
      name: "Total Sold",
      data: sales ? sales?.map((v) => v.total_sold) : [],
    },
  ];

  return (
    <div className="border p-4 rounded-xl w-full border-primary xl:col-span-2 ">
      <p className="uppercase text-lg">Sales Movement: </p>
      {sales ? (
        <TemplateLineChart
          id="sales"
          titleYAxis="Total Sold"
          categories={categories}
          dataSeries={series}
        />
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
}
