import { getAllProductCountQuantityServer } from "@/services/product/server";
import { getAllCategoryServer } from "@/services/category/server";
import ProductBar from "./product-bar";

export default async function ProductChart() {
  const products = await getAllProductCountQuantityServer();
  const categories = await getAllCategoryServer();

  return (
    <div className="border h-full p-4 rounded-xl w-full border-primary ">
      <p className="uppercase text-lg mb-2">Products: </p>
      {products &&
      categories &&
      products.length > 1 &&
      categories.length > 1 ? (
        <ProductBar categories={categories} products={products} />
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
}
