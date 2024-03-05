import EditProductForm from "@/components/forms/product/edit-product";
import Title from "@/components/title";
import { getAllCategoryServer } from "@/services/category/server";
import { getUniqueProductServer } from "@/services/product/server";
import { redirect } from "next/navigation";

export default async function EditProductPage({
  searchParams,
}: {
  searchParams?: {
    id?: string;
  };
}) {
  const id = searchParams?.id || "";
  const product = await getUniqueProductServer(id);

  if (product == null) {
    redirect("/products");
  }

  const categories = await getAllCategoryServer();

  return (
    <>
      <Title text="Suppliers / Edit" />
      <EditProductForm categories={categories} product={product} />
    </>
  );
}
