import { getAllCategoryCountProductServer } from "@/services/category/server";
import TemplatePieChart from "../template/pie-chart";

export default async function CategoryChart() {
  const categories = await getAllCategoryCountProductServer();
  const labels = categories?.map((v) => v.name);
  const series = categories?.map((v) => v.product_count);

  return (
    <div className="border p-4 rounded-xl xl:w-full lg:w-[60%] sm:w-[80%] w-full border-primary ">
      <p className="uppercase text-lg">Categories: </p>
      {categories ? (
        <TemplatePieChart id="Categories" labels={labels} series={series} />
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
}
