import LinkButton from "@/components/buttons/link";
import Pagination from "@/components/pagination";
import Search from "@/components/search";
import SelectRows from "@/components/select/select-rows";
import SaleTable from "@/components/tables/sale";
import Title from "@/components/title";
import { getCountSaleServer, getUniqueSaleServer } from "@/services/sale/server";
import { Suspense } from "react";

export default async function Sales({
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
  const totalPages = await getCountSaleServer(query, rows);

  return (
    <>
      <Title text="Sales" />
      <div className="my-10">
        <LinkButton href="/sales/add" text="Add Sale" />
      </div>
      <div className="flex flex-wrap justify-between">
        <Search placeholder="Search Client" />
        <SelectRows rows={rows} />
      </div>
      <Suspense fallback={<p>Loading</p>}>
        <SaleTable query={query} currentPage={currentPage} rows={rows} />
      </Suspense>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
