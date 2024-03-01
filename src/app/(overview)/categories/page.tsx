import AddCategoryForm from "@/components/forms/category/add-category";
import Pagination from "@/components/pagination";
import Search from "@/components/search";
import SelectRows from "@/components/select/select-rows";
import CategoryTable from "@/components/tables/category";
import Title from "@/components/title";
import { getCountCategoryServer } from "@/services/category/server";
import { Suspense } from "react";

export default async function Categories({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    rows?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const rows = Number(searchParams?.rows) || 10;
  const totalPages = await getCountCategoryServer(query, rows);

  return (
    <>
      <Title text="Categories" />
      <AddCategoryForm />
      <div className="flex flex-wrap justify-between">
        <Search placeholder="Search Category" />
        <SelectRows rows={rows} />
      </div>
      <Suspense fallback={<p>Loading</p>}>
        <CategoryTable query={query} currentPage={currentPage} rows={rows} />
      </Suspense>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
