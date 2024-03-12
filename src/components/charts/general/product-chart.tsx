import { getAllProductCountQuantityServer } from "@/services/product/server";
import TemplateBarChart from "../template/bar-chart";
import { getAllCategoryServer } from "@/services/category/server";
import ProductBar from "./product-bar";

export default async function ProductChart() {
  const products = await getAllProductCountQuantityServer();
  const categories = await getAllCategoryServer();

  return (
    <div className="border overflow-y-auto p-4 rounded-xl w-full border-primary ">
      <p className="uppercase text-lg mb-2">Products: </p>
      {products ? (
        <ProductBar categories={categories} products={products} />
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
}
