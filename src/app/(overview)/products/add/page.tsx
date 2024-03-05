import AddProductForm from "@/components/forms/product/add-product";
import Title from "@/components/title";
import { getAllCategoryServer } from "@/services/category/server";

export default async function AddProductPage({
  searchParams,
}: {
  searchParams?: {
    idCategory?: string;
  };
}) {
  const idCategory = searchParams?.idCategory;
  const categories = await getAllCategoryServer();

  return (
    <>
      <Title text="Products / Add" />
      <AddProductForm categories={categories} idCategory={idCategory} />
    </>
  );
}
