import LinkButton from "@/components/buttons/link";
import Pagination from "@/components/pagination";
import Search from "@/components/search";
import SelectRows from "@/components/select/select-rows";
import ProductTable from "@/components/tables/product";
import Title from "@/components/title";
import { getCountProductServer } from "@/services/product/server";
import { Suspense } from "react";

export default async function Products({
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
  const totalPages = await getCountProductServer(query, rows);

  return (
    <>
      <Title text="Products" />
      <div className="my-10">
        <LinkButton href="/products/add" text="Add Product" />
      </div>
      <div className="flex flex-wrap justify-between">
        <Search placeholder="Search Product" />
        <SelectRows rows={rows} />
      </div>
      <Suspense fallback={<p>Loading</p>}>
        <ProductTable query={query} currentPage={currentPage} rows={rows} />
      </Suspense>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
